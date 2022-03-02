import { TypedStringBlock, TypedStringSingle } from ".";
import { BannerType } from "..";
import { TypedString, StringType } from "./TypedString";

const FuncMap = {
    "item": StringType.Item
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
        if(header.bannerType){
            return {
                header,
                typedString: this.convertToTypedString(content)
            };
        }

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
        for(let i = 0; i<tokens.length;i++){
            const token = tokens[i];
            //Need at least 3 more tokens to process a function: . name ( )
            if(token === "." && i<tokens.length-3 && tokens[i+2] === "("){
                const funcName = tokens[i+1];
                if(funcName in FuncMap){
                    const type = FuncMap[funcName as keyof typeof FuncMap];
                    typeStack.push(currentType);
                    currentType = type;
                }else{
                    blocks.push(new TypedStringSingle({type: currentType, content: `.${funcName}(`}));
                }
                i = i+2;
            }else if(token === ")"){
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
