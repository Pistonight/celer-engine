import { TypedStringBlock, StringType } from "./text/type";

export class StringParser {
    public parseStringBlock(str: string): TypedStringBlock {
        return {
            content: str,
            type: StringType.Normal
        }
    }
}