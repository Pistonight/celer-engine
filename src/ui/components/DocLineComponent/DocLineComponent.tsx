import { DocLine } from "core/route";
import { DocLineBannerComponent } from "./DocLineBannerComponent";
import { DocLineSectionComponent } from "./DocLineSectionComponent";
import { DocLineTextComponent, DocLineTextWithIconComponent } from "./DocLineTextComponent";
export interface DocLineProps{
    docLine: DocLine,
    map?: L.Map,
    altLineColor?: boolean,
    altNotesColor?: boolean,
}

export const DocLineComponent: React.FC<DocLineProps> = ({map, docLine, altLineColor, altNotesColor})=> {
    const lineType = docLine.lineType;
    switch(lineType){
        case "DocLineSection":
            return <DocLineSectionComponent docLine={docLine} />;
        case "DocLineBanner":
            return <DocLineBannerComponent docLine={docLine} />;
        case "DocLineText":
            return <DocLineTextComponent map={map} docLine={docLine} altLineColor={altLineColor} altNotesColor={altNotesColor}/>;
        case "DocLineTextWithIcon":
            return <DocLineTextWithIconComponent map={map} docLine={docLine} altLineColor={altLineColor} altNotesColor={altNotesColor}/>;
    }
};