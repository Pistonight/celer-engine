import { TypedStringBlock } from "data/assembly/text/type";
import { BannerType } from "data/assembly/types";

export type DocLine = 
    DocLineSection |
    DocLineBanner |
    DocLineText |
    DocLineTextWithIcon;

export interface DocLineSection {
    lineType: "DocLineSection";
    sectionNumber: number;
    sectionName: string;
}

export interface DocLineBanner {
    lineType: "DocLineBanner";
    bannerType: BannerType;
    text: TypedStringBlock;
    showTriangle: boolean;
}

export interface DocLineText {
    lineType: "DocLineText";
    lineNumber: string,
    
    stepNumber?: string,
    
    text: TypedStringBlock,
    notes?: TypedStringBlock,
}

export interface DocLineTextWithIcon extends Omit<DocLineText, "lineType"> {
    lineType: "DocLineTextWithIcon";

    coord: Coord;
    splitType: SplitType;
    comment?: TypedStringBlock;
    icon: string;
    counterValue: string;
}



export enum SplitType {
    None,
    Shrine, //1 - 120
    Tower, //I - XV
    Warp, // 1-??
    Memory, // I - XIII
    Korok, //1 - 900
    Hinox, //1-40
    Talus, //1-40
    Molduga, //1-4
    UserDefined
}

export type Coord = {x: number, y: number, z: number}