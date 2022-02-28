// Tower::Name
// 15 towers
import { MapOf } from "data/util";
import { StringParser } from "../StringParser";
import { RouteAssembly, SplitType } from "../types";
import { CompilerPresetModule } from "./Module";

class TowerModule implements CompilerPresetModule {
    private map: MapOf<(parser: StringParser) => RouteAssembly> = {};
    
    constructor(){
       
        this.addTower("Great Plateau", [-560.03, 177.64, 1694.86]);
        this.addTower("Central", [-788.64, 197.64, 442.03]);
        this.addTower("Lake", [-31.82, 280.48, 2961.60]);
        this.addTower("Dueling Peaks", [1016.78, 184.01, 1714.08]);
        this.addTower("Faron", [1331.20, 269.93, 3273.72]);
        this.addTower("Hateno", [2735.50, 336.18, 2133.50]);
        this.addTower("Lanayru", [2258.00, 310.92, -109.00]);
        this.addTower("Eldin", [2174.15, 508.73, -1556.78]);
        this.addTower("Woodland", [883.88, 350.22, -1605.71]);
        this.addTower("Akkala", [3308.00, 593.78, -1500.10]);
        this.addTower("Tabantha", [-3613.75, 445.04, -990.16]);
        this.addTower("Gerudo", [-3666.00, 470.98, 1828.60]);
        this.addTower("Wasteland", [-2306.84, 530.18, 2437.32]);
        this.addTower("Hebra", [-2173.00, 529.18, -2034.00]);
        this.addTower("Ridgeland", [-1755.30, 328.58, -774.30]);

    }

    public recognizes(name: string): boolean {
        return name in this.map;
    }
    public compile(name: string, parser: StringParser): RouteAssembly {
        return this.map[name](parser);
    }

    private addTower(name: string,  coord: [number, number, number] = [0,0,0]): void{
        const compactName = "_Tower::"+name.replaceAll("'", "").replaceAll(" ", "");
        this.map[compactName] = (parser) => ({
            text: parser.parseStringBlock(name+ " Tower"),
            icon: "tower",
            splitType: SplitType.Tower,
            movements: [{
                to: {x: coord[0], z: coord[2]},
                isAway: false,
                isWarp: false,
                
            }]
        });
    }
}

export default new TowerModule();