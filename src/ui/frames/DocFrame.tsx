import { DocLine } from "core/route";
import { LocalStorageWrapper } from "data/settings";
import React, { useEffect, useState } from "react";
import { DocLineComponent } from "ui/components";
import { useStyles } from "ui/styles";

export interface DocFrameProps {
    docLines: DocLine[],
}

const SCROLL_POS_KEY="DocFrameScrollPos";
const docFrameRef = React.createRef<HTMLDivElement>();

export const DocFrame: React.FC<DocFrameProps> = ({docLines})=>{
    const [scrollPos, setScrollPos] = useState<number>(LocalStorageWrapper.load<number>(SCROLL_POS_KEY, 0));
    useEffect(()=>{
        setTimeout(() => {
            const docFrame = docFrameRef.current;
            if(docFrame){      
                docFrame.scrollTop = scrollPos;
            }
        },200);
        
    }, []);
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
        <div ref={docFrameRef} className={styles.docFrame} onScroll={(e)=>{
            const pos = (e.target as any).scrollTop || 0;
            if(Math.abs(pos - scrollPos) >= 100){
                setScrollPos(pos);
                LocalStorageWrapper.store(SCROLL_POS_KEY, pos);
            }
        }}>
            {components}
        </div>
    );
}

// class ErrorBoundary extends React.Component<DocFrameProps> {
//     constructor(props: DocFrameProps) {
//       super(props);
//       this.state = { hasError: false };
//     }
  
//     static getDerivedStateFromError() {
//       // Update state so the next render will show the fallback UI.
//       return { hasError: true };
//     }
  
//     render() {
//       if (this.state.hasError) {
//         // You can render any custom fallback UI
//         return <h1>Something went wrong.</h1>;
//       }
  
//       return this.props.children; 
//     }
//   }