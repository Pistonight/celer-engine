import { DocLine } from "core/route";
import { DocLineComponent } from "ui/components";
import { useStyles } from "ui/styles";

export interface DocFrameProps {
    docLines: DocLine[],
}

export const DocFrame: React.FC<DocFrameProps> = ({docLines})=>{
    const styles = useStyles();
    let altLineColor = false;
    let altNoteColor = false;
    const components:JSX.Element[] = [];
    docLines.forEach((docLine, i)=>{
        components.push(<DocLineComponent docLine={docLine} key={i} altLineColor={altLineColor} altNotesColor={altNoteColor} />);
        if(docLine.lineType === "DocLineText" || docLine.lineType === "DocLineTextWithIcon"){
            altLineColor = !altLineColor;
            if(docLine.notes){
                altNoteColor = !altNoteColor;
            }
        }
    });
    return (
        <div className={styles.docFrame}>
            {components}
        </div>
    );
}