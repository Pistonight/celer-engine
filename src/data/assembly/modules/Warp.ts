import { BannerType, SplitType } from "..";
import { StringParser } from "../StringParser";
import { RouteAssembly } from "../types";
import { CompilerPresetModule } from "./Module";
import ShrineModule from "./Shrine";
import TowerModule from "./Tower";

const PREFIX = "_TravelMedallion<";
const SUFFIX = ">";
class WarpModule implements CompilerPresetModule {
    public recognizes(name: string): boolean {
        return name.startsWith("_Warp::");
    }
    public compile(name: string, parser: StringParser): RouteAssembly {
        name = name.replace("_Warp::", "_");
        let module;
        if (ShrineModule.recognizes(name)){
            module = ShrineModule.compile(name, parser);
        }else if(TowerModule.recognizes(name)){
            module = TowerModule.compile(name, parser);
        }

        if(module){
            module.splitType = SplitType.Warp;
            module.icon = "warp";
            module.hideIconOnMap = true;
            if(module.movements){
                module.movements[0].isWarp = true;
            }
        }else{
            switch(name){
                case "_TechLab::Hateno":
                    module = {
                        text: parser.parseStringBlock("Hateno Tech Lab"),
                        icon: "warp",
                        splitType: SplitType.Warp,
                        movements: [{
                            to: {x: 3777.71, z: 2127.36},
                            isAway: false,
                            isWarp: true,
                        }]
                    };
                    break;
                case "_TechLab::Akkala":
                    module = {
                        text: parser.parseStringBlock("Akkala Tech Lab"),
                        icon: "warp",
                        splitType: SplitType.Warp,
                        movements: [{
                            to: {x: 4522.01, z: -3166.63},
                            isAway: false,
                            isWarp: true,
                        }]
                    };
                    break;
            }
            if(!module && name.startsWith(PREFIX) && name.endsWith(SUFFIX)){
                name = name.substring(PREFIX.length, name.length-SUFFIX.length);
                const parts = name.split(",");
                const x = Number(parts[0]);
                const z = Number(parts[1]);
                module = {
                    text: parser.parseStringBlock("Travel Medallion"),
                    icon: "warp",
                    splitType: SplitType.Warp,
                    movements: [{
                        to: {x, z},
                        isAway: false,
                        isWarp: true,
                    }]
                };
            }else{
                module = {
                    text: parser.parseStringBlock("Invalid Warp"),
                    bannerType: BannerType.Error,
                    splitType: SplitType.None
                } as RouteAssembly;
            }
        }

        return module;
    }
}


export default new WarpModule();