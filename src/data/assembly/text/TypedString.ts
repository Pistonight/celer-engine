import { Consumer } from "data/util";

type TypedStringData = {
    type: StringType,
    content: string
}

export interface TypedString {
    isEmpty(): boolean;
    toString(): string;
    forEach(action: Consumer<TypedStringData>): void;
    map<T>(func: (data: TypedStringData)=>T): T[];
    applyType(type: StringType): TypedString;
}

export class TypedStringSingle implements TypedString {
    private type: StringType;
    private content: string;
    constructor(data: TypedStringData){
        this.type = data.type;
        this.content = data.content;
    }

    public isEmpty(): boolean {
        return this.type !== StringType.Fury && this.type !== StringType.Gale;
    }

    public toString(): string {
        return this.content;
    }

    public forEach(action: Consumer<TypedStringData>): void {
        action({
            type: this.type,
            content: this.content
        });
    }

    public map<T>(func: (data: TypedStringData)=>T): T[] {
        return [func({
            type: this.type,
            content: this.content
        })];
    }

    public applyType(type: StringType): TypedString {
        if(this.type === StringType.Normal){
            return new TypedStringSingle({type, content: this.content});
        }
        return this;
    }
}

export class TypedStringBlock implements TypedString {
    private content: TypedString[];
    constructor(content: TypedString[]){
        this.content = content;
    }

    public isEmpty(): boolean {
        for(let i = 0; i<this.content.length;i++){
            if(!this.content[i].isEmpty()){
                return false;
            }
        }
        return true;
    }

    public toString(): string {
        return this.content.map(c=>c.toString()).join("");
    }

    public forEach(action: Consumer<TypedStringData>): void {
        this.content.forEach(c=>c.forEach(action));
    }

    public map<T>(func: (data: TypedStringData)=>T): T[] {
        return this.content.reduce((acc, c)=>{
            acc.push.apply(acc, c.map(func));
            return acc;
        }, [] as T[]);
    }

    public applyType(type: StringType): TypedString {
        const newContent = this.content.map(c=>c.applyType(type));
        return new TypedStringBlock(newContent);
    }
}

export enum StringType {
    Normal,
    Item,
    Location,
    Npc,
    Rune,
    Boss,
    Enemy,
    Direction,
    Link,
    Variable,
    Important,
    Gale,
    Fury
}

//export type TypedStringLike = string | TypedStringBlock;
// export const txt = (...t: TextLike[]):TextBlock => textHelper(t);
// export const itm = (...t: TextLike[]):TextBlock => textHelper(t, "color-item");
// export const lcn = (...t: TextLike[]):TextBlock => textHelper(t, "color-location");
// export const npc = (...t: TextLike[]):TextBlock => textHelper(t, "color-npc");
// export const rne = (...t: TextLike[]):TextBlock => textHelper(t, "color-rune");
// export const bss = (...t: TextLike[]):TextBlock => textHelper(t, "color-boss");
// export const emy = (...t: TextLike[]):TextBlock => textHelper(t, "color-enemy");
// export const cps = (t: string):TextBlock => textHelper([t], "color-direction-compass");
// export const clk = (t: string):TextBlock => textHelper([t], "color-direction-clock");
// export const lnk = (t: string):TextBlock => textHelper([t], "color-link");
// export const sm = (...t: TextLike[]):TextBlock => textHelper(t, "color-sm");
// export const bg = (...t: TextLike[]):TextBlock => textHelper(t, "color-bg");
// export const v = (t: string):TextBlock => textHelper([t], "color-variable");
// export const important= (...t: TextLike[]):TextBlock => textHelper(t, "color-important");
// export const gale = ():TextBlock => textHelper([""], "color-gale");
// export const fury = ():TextBlock => textHelper([""], "color-fury");