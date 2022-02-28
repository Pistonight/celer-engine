// Equipment<NAME>
// expands to
//  text: .item(NAME)
//  icon: equipment
import { StringParser } from "../StringParser";
import { RouteAssembly, SplitType } from "../types";
import { CompilerPresetModule } from "./Module";

const PREFIX = "_Equipment<";
const SUFFIX = ">";
class EquipmentModule implements CompilerPresetModule {
    public recognizes(name: string): boolean {
        return name.startsWith(PREFIX) && name.endsWith(SUFFIX);
    }
    public compile(name: string, parser: StringParser): RouteAssembly {
        return {
            text: parser.parseStringBlock(`${name.substring(PREFIX.length, name.length-SUFFIX.length)}`),
            icon: "equipment",
            splitType: SplitType.None
        }
    }

}

export default new EquipmentModule();