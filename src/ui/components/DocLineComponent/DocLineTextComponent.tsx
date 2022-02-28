import clsx from "clsx";
import { DocLineText, DocLineTextWithIcon } from "core/route";
import { useStyles } from "ui/styles";
import { TypedStringComponent } from "../TypedStringComponent";
import Icons from "data/image";
import { MapOf } from "data/util";
import { gameCoordToMapCoord } from "core/map";
import { SplitType } from "data/assembly";
import { isEmptyString } from "data/assembly/text/type";

export interface DocLineTextProps{
    docLine: DocLineText,
    map?: L.Map,
    altLineColor?: boolean,
    altNotesColor?: boolean,
}

export interface DocLineTextWithIconProps{
    docLine: DocLineTextWithIcon,
    map?: L.Map,
    altLineColor?: boolean,
    altNotesColor?: boolean,
}

const centerMapToLine = (docLine: DocLineText | DocLineTextWithIcon, map?: L.Map): void => {
    if(map){
        const movements = docLine.movements;
        if(movements.length > 0){
            const coord = movements[0].to;
            map.flyTo(gameCoordToMapCoord(coord));
        }
    }
}

const LineNumber: React.FC<DocLineTextProps> = ({map, docLine})=>{
    const {lineNumber} = docLine;
    const styles = useStyles();
    return (
        <div className={styles.lineNumber} onClick={()=>centerMapToLine(docLine, map)}>
            <span className="code">{lineNumber}</span>
        </div>
    );
}

const LineNumberWithIcon: React.FC<DocLineTextWithIconProps> = ({map, docLine})=>{
    const {lineNumber} = docLine;
    const styles = useStyles();
    return (
        <div className={clsx(styles.lineNumber, styles.lineNumberWithIcon)} onClick={()=>centerMapToLine(docLine, map)}>
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
            <TypedStringComponent content={notes} variables={{}} />   
        </div>
    );
}

export const DocLineTextComponent: React.FC<DocLineTextProps> = ({map, docLine,altLineColor,altNotesColor})=> {
    const {text} = docLine;
    const styles = useStyles();
    
    return (
        <div className={clsx(styles.lineContainer, altLineColor && styles.lineContainerAlt)}>
            <LineNumber map={map} docLine={docLine} />
            <NoCounter />
            <StepNumber docLine={docLine} />
            <span className={clsx(styles.instruction, styles.instructionDefaultColor)}>
                <TypedStringComponent content={text} variables={{}} />{"\u200b"}
            </span>
            <Notes docLine={docLine} altNotesColor={altNotesColor} />
        </div>
    );
};

export const DocLineTextWithIconComponent: React.FC<DocLineTextWithIconProps> = ({map, docLine,altLineColor,altNotesColor})=> {
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
            <LineNumberWithIcon map={map} docLine={docLine} />
            <Counter docLine={docLine} />
            <StepNumberWithIcon docLine={docLine}/>
            <div className={clsx(styles.instruction, styles.instructionWithIcon, textStyleName)}>
                <div className={styles.icon}>
                    <img width={"100%"} height={"auto"} src={(Icons as unknown as MapOf<string>)[icon]}/>
                </div>
                <div className={styles.iconSideText}>
                    <TypedStringComponent content={text} variables={{}} />
                    <div className={clsx(styles.commentFont, styles.commentColor)}>
                        {comment && <TypedStringComponent content={comment} variables={{}} />}{"\u200b"}
                    </div>
                </div>
            </div>
            <Notes docLine={docLine} altNotesColor={altNotesColor} />
        </div>
    );
};
