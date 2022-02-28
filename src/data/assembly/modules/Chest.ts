// Chest<NAME>
// expands to
//  text: .item(NAME)
//  icon: chest
import { SplitType } from "..";
import { StringParser } from "../StringParser";
import { RouteAssembly } from "../types";
import { CompilerPresetModule } from "./Module";

const PREFIX = "_Chest<";
const SUFFIX = ">";
class ChestModule implements CompilerPresetModule {
    public recognizes(name: string): boolean {
        return name.startsWith(PREFIX) && name.endsWith(SUFFIX);
    }
    public compile(name: string, parser: StringParser): RouteAssembly {
        return {
            text: parser.parseStringBlock(`${name.substring(PREFIX.length, name.length-SUFFIX.length)}`),
            icon: "chest",
            splitType: SplitType.None
        }
    }

}

export default new ChestModule();