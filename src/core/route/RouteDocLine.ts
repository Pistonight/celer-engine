import { TypedStringBlock } from "data/assembly/text/type";
import { BannerType, Movement, SplitType } from "data/assembly/types";

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

    movements: Movement[];
    mapLineColor?: string;
    
}

export interface DocLineTextWithIcon extends Omit<DocLineText, "lineType"> {
    lineType: "DocLineTextWithIcon";

    
    splitType: SplitType;
    comment?: TypedStringBlock;
    icon: string;
    counterValue: string;

    hideIconOnMap?: boolean;
}


