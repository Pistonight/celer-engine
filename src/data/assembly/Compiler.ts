import { RouteScriptExtend, RouteSection, RouteStep, switchModule, switchSection, switchStep, TARGET_VERSION} from "data/compile";
import { findPair } from "yaml/dist/nodes/YAMLMap";
import { Movement, SplitType } from ".";
import ChestModule from "./modules/Chest";
import ChestSpecialModule from "./modules/ChestSpecial";
import CustomModule from "./modules/Custom";
import EquipmentModule from "./modules/Equipment";
import KorokModule from "./modules/Korok";
import ShrineModule from "./modules/Shrine";
import TowerModule from "./modules/Tower";
import WarpModule from "./modules/Warp";
import { StringParser } from "./StringParser";
import { StringType, TypedStringBlock } from "./text/type";
import { BannerType, RouteAssembly, RouteAssemblySection } from "./types";

export class Compiler {
    private stringParser = new StringParser();
    private modules = [
        KorokModule,
        ShrineModule,
        TowerModule,
        WarpModule,
        EquipmentModule,
        ChestModule,
        ChestSpecialModule,
        CustomModule
    ]

    public compile(version: string, sections: RouteSection[]): RouteAssemblySection[] {
        const compiled = this.compileSections(sections);
        if(version !== TARGET_VERSION){
            compiled.splice(0, 0, {
                route: [{
                    text: this.parseStringBlock("Compiler Version Mismatch Warning: The compiler version is "+TARGET_VERSION+", but the loaded route was compiled under version "+version+". Please consider upgrading to the latest compiler at https://github.com/iTNTPiston/celer-compiler if you see any unexpected issues."),
                    bannerTriangle: false,
                    bannerType: BannerType.Warning ,
                    splitType: SplitType.None
                }]
            })
        }
        //put 20 empty lines at the end
        const emptyLines = []
        for(let i = 0; i<20;i++){
            emptyLines.push({
                text: {content: " ", type: StringType.Normal},
                splitType: SplitType.None
            });
        }
        compiled.push({route: emptyLines});
        return compiled;
    }

    private compileSections(sections: RouteSection[]): RouteAssemblySection[] {
        if(Array.isArray(sections)){
            return sections.map(this.compileSection.bind(this));
        }
        
        return [{
            route: [
                this.makeCompilerError("Not a valid route object: " + JSON.stringify(sections))
            ]
        }];
    }

    private compileSection(section: RouteSection): RouteAssemblySection{
        const sectionErrorHandler = (s: string)=>({
            route: [
                this.makeCompilerError("Error when compiling section, caused by: " + s)
            ]
        });
        return switchSection(section,
            (name, module)=>{
                return switchModule(module,
                    (stringModule)=>{
                        return {
                            name,
                            route: [this.compileStep(stringModule)]
                        };
                    }, (preset, extend)=>{
                        return {
                            name,
                            route: [this.compileStep({[preset]: extend})]
                        };
                    }, (arrayModule)=>{
                        return {
                            name,
                            route: arrayModule.map(m=>this.compileStep(m))
                        };
                    },sectionErrorHandler);
            },sectionErrorHandler);
    }

    private compileStep(step: RouteStep): RouteAssembly{
        return switchStep(step, 
            (stringStep)=>{
                if(stringStep.startsWith("_")){
                    const stepAssembly = this.compilePresetExtend(stringStep, {});
                    if(stepAssembly) {
                        return stepAssembly;
                    }
                }
                return this.compileStepString(stringStep.trim());
            },(preset, extend)=>{
                const stepAssembly = this.compilePresetExtend(preset, extend);
                if(stepAssembly) {
                    return stepAssembly;
                }
                return this.makeCompilerError("Unknown step preset: " + JSON.stringify(preset));
            },(errorString)=>{
                return this.makeCompilerError("Error when compiling step, caused by " + errorString);
            })
    }

    private compileStepString(stepString: string): RouteAssembly{
        const isStep = stepString.startsWith("+");
        if(isStep){
            stepString = stepString.substring(1).trimStart();
        }
        // Attempt to parse preset
        for(let i = 0;i<this.modules.length;i++){
            if(this.modules[i].recognizes(stepString)){
                const stepAssembly = this.modules[i].compile(stepString, this.stringParser);
                if(isStep){
                    stepAssembly.isStep = true;
                }
                return stepAssembly;
            }
        }

        const isBanner = stepString.startsWith("(==)") || stepString.startsWith("(!=)") || stepString.startsWith("(^=)");
        const bannerTriangle = stepString.startsWith("(^=)");
        const bannerError = stepString.startsWith("(!=)");
        if(isBanner){
            stepString = stepString.substring(4).trimStart();
            return {
                text: this.parseStringBlock(stepString),
                bannerTriangle: bannerTriangle,
                bannerType: bannerError? BannerType.Error: BannerType.Notes,
                splitType: SplitType.None
            }
        }
        return {
            text: this.parseStringBlock(stepString),
            isStep,
            splitType: SplitType.None
        }
    }

    private compilePresetExtend(preset:string, extend: RouteScriptExtend): RouteAssembly | undefined{
        const isStep = preset.startsWith("+");
        if(isStep){
            preset = preset.substring(1).trimStart();
        }
        for(let i = 0;i<this.modules.length;i++){
            if(this.modules[i].recognizes(preset)){
                const stepAssembly = this.modules[i].compile(preset, this.stringParser);
                this.applyExtend(stepAssembly, extend);
                if(isStep){
                    stepAssembly.isStep = true;
                }
                return stepAssembly;
            }
        }
        return undefined;
    }

    private applyExtend(data: RouteAssembly, extend: RouteScriptExtend): void {
        if(extend.text){
            data.text = this.parseStringBlock(extend.text);
        }

        if(extend.comment){
            data.comment = this.parseStringBlock(extend.comment);
        }

        if(extend.icon){
            data.icon = extend.icon;
        }

        if(extend.notes){
            data.notes =  this.parseStringBlock(extend.notes);
        }

        if(extend["line-color"]){
            data.lineColor = extend["line-color"];
        }
        if(extend.movements && Array.isArray(extend.movements)){
            const movements = extend.movements.map(this.processExtendMovement.bind(this)).filter(m=>m);
            data.movements = movements as Movement[];
        }else if(extend.coord && Array.isArray(extend.coord) && extend.coord.length >= 2){
            const x = extend.coord[0];
            let z = extend.coord[1];
            if(extend.coord.length === 3){
                z = extend.coord[2];
            }
            data.movements = [{
                to: {x, z},
                isWarp: false,
                isAway: false,
            }]
        }
    }

    private processExtendMovement(movement: {to?: number[], warp?: boolean, away?: boolean}): Movement | undefined {
        if(!movement.to || !Array.isArray(movement.to) || movement.to.length < 2){
            return undefined;
        }
        const x = movement.to[0];
            let z = movement.to[1];
            if(movement.to.length === 3){
                z = movement.to[2];
            }
        return {
            to: {x, z},
            isAway: !!movement.away,
            isWarp: !!movement.warp
        }
    }

    private makeCompilerError(error: string): RouteAssembly {
        return  {
            text: this.parseStringBlock("Compile Error: "+error),
            bannerTriangle: false,
            bannerType: BannerType.Error,
            splitType: SplitType.None
        };
    }

    private parseStringBlock(str: string): TypedStringBlock {
        return this.stringParser.parseStringBlock(str);
    }

}

