import { TypedStringBlock, TypedStringSingle } from ".";
import { BannerType } from "..";
import { TypedString, StringType } from "./TypedString";

const FuncMap = {
    "item": StringType.Item,
    "loc": StringType.Location,
    "npc": StringType.Npc,
    "rune": StringType.Rune,
    "boss": StringType.Boss,
    "enemy": StringType.Enemy,
    "dir": StringType.Direction,
    "link": StringType.Link,
    "v": StringType.Variable,
    "!!": StringType.Important,
    "gale": StringType.Gale,
    "fury": StringType.Fury,
    "code": StringType.Code
};


class StringParser {
    public convertToTypedString(str: string): TypedString {
        return new TypedStringSingle({
            content: str,
            type: StringType.Normal
        });
    }

    public parseStringBlockSimple(str: string): TypedString {
        return this.parseStringBlock(str).typedString;
    }

    public parseStringBlock(str: string): StringParseData {
        const [ content, header ] = this.parseStringHeader(str);

        const typedString = this.parseStringFunctions(content);
        return {
            header,
            typedString
        }
    }

    private parseStringHeader(str: string): [string, StringHeader]{
        const isStep = str.startsWith("+");
        if(isStep){
            str = str.substring(1).trimStart();
        }
        const bannerError = str.startsWith("(!=)");
        const bannerWarning = str.startsWith("(?=)");
        const bannerTriangle = str.startsWith("(^=)");
        const bannerNormal = str.startsWith("(==)");
        
        if(bannerError || bannerWarning || bannerTriangle || bannerNormal){
            str = str.substring(4).trimStart();
        }

        let banner: Partial<StringHeader> = {};
        if(bannerError){
            banner = {
                bannerType: BannerType.Error,
            };
        }else if(bannerWarning){
            banner = {
                bannerType: BannerType.Warning,
            };
        }else if(bannerTriangle){
            banner = {
                bannerType: BannerType.Notes,
                bannerTriangle: true
            };
        }else if(bannerNormal){
            banner = {
                bannerType: BannerType.Notes,
            };
        }
        return [str, {isStep, ...banner}];
    }

    private parseStringFunctions(str: string): TypedString{
        // Ensure string is not empty
        if(str === ""){
            return this.convertToTypedString("");
        }
        // Text => NormalText TextStar
        // Text => FunctionText TextStar
        // TextStar => NormalText TextStar | epsilon
        // TextStar => FunctionText TextStar
        // FunctionText = . <identifier> ( TextStar )
        // NormalText => <identifier>

        // Tokenize first
        const tokens: string[] = [];
        const regex = /[\.\(\)]/;
        let j = str.search(regex);
        while(j !== -1){
            if(j!==0){
                //Prevent empty tokens
                tokens.push(str.substring(0, j));
            }
            
            tokens.push(str[j]);
            str = str.substring(j+1);
            j = str.search(regex);
        }
        if(str !== ""){
            tokens.push(str);
        }

        const typeStack: StringType[] = [];
        const blocks: TypedString[] = [];
        let currentType = StringType.Normal;
        let escaping = false;
        for(let i = 0; i<tokens.length;i++){
            const token = tokens[i];
            
            
            if(token === "." && i<tokens.length-1 && tokens[i+1] === "("){
                // .( for escaping ..)
                if(escaping){
                    blocks.push(new TypedStringSingle({type: currentType, content: token}));
                    continue;
                }
                escaping = true;
                i = i + 1;
            }else if(token === "." && i<tokens.length-2 && tokens[i+1] === "." && tokens[i+2] === ")"){
                //  ..) to end escaping
                if(!escaping){
                    blocks.push(new TypedStringSingle({type: currentType, content: token}));
                    continue;
                }
                escaping = false;
                i = i + 2;
            }else if(token === "." && i<tokens.length-3 && tokens[i+2] === "("){
                //Need at least 3 more tokens to process a function: . name ( )
                if(escaping){
                    blocks.push(new TypedStringSingle({type: currentType, content: token}));
                    continue;
                }
                const funcName = tokens[i+1];
                if(funcName in FuncMap){
                    const type = FuncMap[funcName as keyof typeof FuncMap];
                    typeStack.push(currentType);
                    currentType = type;
                }else{
                    blocks.push(new TypedStringSingle({type: currentType, content: `.${funcName}(`}));
                }
                i = i + 2;
            }else if(token === ")"){
                if(escaping){
                    blocks.push(new TypedStringSingle({type: currentType, content: token}));
                    continue;
                }
                if(typeStack.length > 0){
                    currentType = typeStack.pop()!;
                }else{
                    blocks.push(new TypedStringSingle({type: currentType, content: ")"}));
                }
            }else{
                blocks.push(new TypedStringSingle({type: currentType, content: token}));
            }

        }

        // Small optimization
        // At least one block since empty string case is already handled
        if(blocks.length === 1) {
            return blocks[0];
        }else{
            return new TypedStringBlock(blocks);
        }
    }

}

type StringHeader = {
    isStep: boolean,
    bannerType?: BannerType,
    bannerTriangle?: boolean,
}

type StringParseData = {
    header: StringHeader,
    typedString: TypedString
}

export default new StringParser();
