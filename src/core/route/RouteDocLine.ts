
import { BannerType, Movement, SplitType, TypedString } from "data/assembly";

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
    text: TypedString;
    showTriangle: boolean;
}

export interface DocLineText {
    lineType: "DocLineText";
    lineNumber: string,
    
    stepNumber?: string,
    
    text: TypedString,
    notes?: TypedString,

    movements: Movement[];
    mapLineColor?: string;
    
}

export interface DocLineTextWithIcon extends Omit<DocLineText, "lineType"> {
    lineType: "DocLineTextWithIcon";

    
    splitType: SplitType;
    comment?: TypedString;
    icon: string;
    counterValue: string;

    hideIconOnMap?: boolean;
}


