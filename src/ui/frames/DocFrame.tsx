import { DocLine } from "core/route";
import React from "react";
import { DocLineComponent } from "ui/components";
import { useStyles } from "ui/styles";

export interface DocFrameProps {
    map?: L.Map,
    docLines: DocLine[],
}

export const DocFrame: React.FC<DocFrameProps> = ({map, docLines})=>{
    const styles = useStyles();
    let altLineColor = false;
    let altNoteColor = false;
    const components:JSX.Element[] = [];
    docLines.forEach((docLine, i)=>{
        components.push(<DocLineComponent map={map} docLine={docLine} key={i} altLineColor={altLineColor} altNotesColor={altNoteColor} />);
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