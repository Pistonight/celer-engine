import { StringParser } from "../StringParser";
import { RouteAssembly, SplitType } from "../types";
import { CompilerPresetModule } from "./Module";

class CustomModule implements CompilerPresetModule {
    public recognizes(_: string): boolean {
        return true;
    }
    public compile(name: string, parser: StringParser): RouteAssembly {
        return {
           text: parser.parseStringBlock(name),
           splitType: SplitType.None
        }
    }

}

export default new CustomModule();