import { RouteAssembly, SplitType } from "..";
import { StringType, TypedString, TypedStringSingle } from "../text";
import { CompilerPresetModule } from "./Module";

class SimpleModule implements CompilerPresetModule {
    private prefix: string;
    private suffix: string;
    private type: StringType;
    private icon: string;
    constructor(prefix: string, suffix: string, type: StringType, icon: string){
        this.prefix = prefix;
        this.suffix = suffix;
        this.type = type;
        this.icon = icon;
    }
    public compile(typedString: TypedString): RouteAssembly | undefined {
        const name = typedString.toString();
        if(!name.startsWith(this.prefix) || !name.endsWith(this.suffix)){
            return undefined;
        }
        return {
            text: new TypedStringSingle({
                content: name.substring(this.prefix.length, name.length-this.suffix.length),
                type: this.type
            }),
            icon: this.icon,
            splitType: SplitType.None
        }
    }

}

export const getSimpleModules = ()=>([
    new SimpleModule("_Chest<", ">", StringType.Item, "chest"),
    new SimpleModule("_Chest::Special<", ">", StringType.Item, "chest-special"),
    new SimpleModule("_Equipment::Weapon<", ">", StringType.Item, "equipment"),
    new SimpleModule("_Equipment::Bow<", ">", StringType.Item, "bow"),
    new SimpleModule("_Equipment::Shield<", ">", StringType.Item, "shield")
]);