export type TypedString = {
    type: StringType,
    content: string
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

export type TypedStringBlock = TypedString | TypedString[];
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