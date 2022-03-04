import clsx from "clsx";
import { DocLineText, DocLineTextWithIcon } from "core/route";
import { useStyles } from "ui/styles";
import { TypedStringComponent } from "../TypedStringComponent";
import Icons from "data/image";
import { MapOf } from "data/util";
import { MapCore } from "core/map";
import { SplitType } from "data/assembly";
import { useAppRoot } from "ui/root";

export interface DocLineTextProps{
    docLine: DocLineText,
    altLineColor?: boolean,
    altNotesColor?: boolean,
}

export interface DocLineTextWithIconProps{
    docLine: DocLineTextWithIcon,
    altLineColor?: boolean,
    altNotesColor?: boolean,
}

const centerMapToLine = (docLine: DocLineText | DocLineTextWithIcon, mapCore: MapCore): void => {
    const movements = docLine.movements;
    if(movements.length > 0){
        const coord = movements[0].to;
        mapCore.centerMap(coord);
    }
    
}

const LineNumber: React.FC<DocLineTextProps> = ({docLine})=>{
    const {lineNumber} = docLine;
    const styles = useStyles();
    const {mapCore} = useAppRoot();
    return (
        <div className={styles.lineNumber} onClick={()=>centerMapToLine(docLine, mapCore)}>
            <span className="code">{lineNumber}</span>
        </div>
    );
}

const LineNumberWithIcon: React.FC<DocLineTextWithIconProps> = ({docLine})=>{
    const {lineNumber} = docLine;
    const styles = useStyles();
    const {mapCore} = useAppRoot();
    return (
        <div className={clsx(styles.lineNumber, styles.lineNumberWithIcon)} onClick={()=>centerMapToLine(docLine, mapCore)}>
            <span className="code">{lineNumber}</span>
            <div className={styles.commentFont}>&nbsp;</div>
        </div>
    );
}

const Counter: React.FC<DocLineTextWithIconProps> = ({docLine})=>{
    const {counterValue, splitType} = docLine;
    const styles = useStyles();
    if(splitType === SplitType.None || splitType === SplitType.UserDefined){
        return (
            <div className={clsx(styles.counterNumber, styles.counterNumberContainer, styles.counterTypeNone)}>
                <span className="code">{splitType === SplitType.None ? "." : "SPLT" }</span>
                <div className={styles.commentFont}>&nbsp;</div>
            </div>
        );
    }
    let counterStyleName = styles.counterTypeNone;
    switch(splitType){
        case SplitType.Shrine:
            counterStyleName = styles.counterShrineColor;
            break;
        case SplitType.Tower:
            counterStyleName = styles.counterTowerColor;
            break;
        case SplitType.Warp:
            counterStyleName = styles.counterWarpColor;
            break;
        case SplitType.Memory:
            counterStyleName = styles.counterMemoryColor;
            break;
        case SplitType.Korok:
            counterStyleName = styles.counterKorokColor;
            break;
        case SplitType.Hinox:
            counterStyleName = styles.counterHinoxColor;
            break;
        case SplitType.Talus:
            counterStyleName = styles.counterTalusColor;
            break;
        case SplitType.Molduga:
            counterStyleName = styles.counterMoldugaColor;
            break;
    }
    return (
        <div className={styles.counterNumberContainer}>
            <div className={clsx(styles.counterNumber, counterStyleName, counterStyleName !== styles.counterTypeNone && styles.counterBorder)}>
                <span className="code">{counterValue}</span>
            </div>
        </div>
    );
}

const NoCounter: React.FC = ()=>{
    const styles = useStyles();
    return (
        <div className={clsx(styles.counterNumber, styles.counterTypeNone)}>
           <span className="code">.</span>
        </div>
    );
}

const StepNumber: React.FC<DocLineTextProps> = ({docLine})=>{
    const {stepNumber} = docLine;
    const styles = useStyles();
    return (
        <div className={styles.stepNumber}>
            {stepNumber ? <span className="code">{stepNumber}</span> : <span className="code">&nbsp;</span>}        
        </div>
    );
}

const StepNumberWithIcon: React.FC<DocLineTextWithIconProps> = ({docLine})=>{
    const {stepNumber} = docLine;
    const styles = useStyles();
    return (
        <div className={styles.stepNumber}>
            {stepNumber ? <span className="code">{stepNumber}</span> : <span className="code">&nbsp;</span>} 
            <div className={styles.commentFont}>&nbsp;</div>
        </div>
    );
}

const Notes: React.FC<DocLineTextProps | DocLineTextWithIconProps> = ({docLine, altNotesColor})=>{
    const {notes} = docLine;
    const styles = useStyles();
    if(!notes){
        return null;
    }
    
    return  (
        <div className={clsx(styles.notes, altNotesColor && styles.notesAlt)}>
            <TypedStringComponent content={notes} variables={{}} isNotes/>   
        </div>
    );
}

export const DocLineTextComponent: React.FC<DocLineTextProps> = ({docLine,altLineColor,altNotesColor})=> {
    const {text} = docLine;
    const styles = useStyles();
    
    return (
        <div className={clsx(styles.lineContainer, altLineColor && styles.lineContainerAlt)}>
            <LineNumber docLine={docLine} />
            <NoCounter />
            <StepNumber docLine={docLine} />
            <span className={clsx(styles.instruction, styles.instructionDefaultColor)}>
                <TypedStringComponent content={text} variables={{}} isNotes={false}/>{"\u200b"}
            </span>
            <Notes docLine={docLine} altNotesColor={altNotesColor} />
        </div>
    );
};

export const DocLineTextWithIconComponent: React.FC<DocLineTextWithIconProps> = ({docLine,altLineColor,altNotesColor})=> {
    const {text, icon, comment, splitType} = docLine;
    const styles = useStyles();
    
    let textStyleName = styles.instructionDefaultColor;
    switch(splitType){
        case SplitType.Shrine:
            textStyleName = styles.instructionShrineColor;
            break;
        case SplitType.Tower:
            textStyleName = styles.instructionTowerColor;
            break;
        case SplitType.Warp:
            textStyleName = styles.instructionWarpColor;
            break;
        case SplitType.Memory:
            textStyleName = styles.instructionMemoryColor;
            break;
        case SplitType.Korok:
            textStyleName = styles.instructionKorokColor;
            break;
        case SplitType.Hinox:
            textStyleName = styles.instructionHinoxColor;
            break;
        case SplitType.Talus:
            textStyleName = styles.instructionTalusColor;
            break;
        case SplitType.Molduga:
            textStyleName = styles.instructionMoldugaColor;
            break;
    }
    return (
        <div className={clsx(styles.lineContainer, altLineColor && styles.lineContainerAlt)}>
            <LineNumberWithIcon docLine={docLine} />
            <Counter docLine={docLine} />
            <StepNumberWithIcon docLine={docLine}/>
            <div className={clsx(styles.instruction, styles.instructionWithIcon, textStyleName)}>
                <div className={styles.icon}>
                    <img width={"100%"} height={"auto"} src={(Icons as unknown as MapOf<string>)[icon]}/>
                </div>
                <div className={styles.iconSideText}>
                    <TypedStringComponent content={text} variables={{}} isNotes={false}/>
                    <div className={clsx(styles.commentFont, styles.commentColor)}>
                        {comment && <TypedStringComponent content={comment} variables={{}} isNotes={false}/>}{"\u200b"}
                    </div>
                </div>
            </div>
            <Notes docLine={docLine} altNotesColor={altNotesColor} />
        </div>
    );
};
