import { StringParser } from "../StringParser";
import { RouteAssembly } from "../types";

// modules are for recognizing step objects
export interface CompilerPresetModule {
    recognizes(name: string): boolean;
    compile(name: string, parser: StringParser): RouteAssembly;
}