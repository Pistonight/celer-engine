import { ComputeStyleInputs } from "ui/styles";
import { MenuItemStyle } from "../components/MenuItem/MenuItem.Style";

export const deprecatedStyles = ({sizes, colors}: ComputeStyleInputs) => {
    //route doc effective area:
    //760px : hide line number, collapse notes to single line
    //hidden map: 760px
    //narrow map: 760/0.7 = 1085
    //half map: 760/0.5 = 1520
    //wide map: 760/0.4 = 1900
    //
    //500px : notes only show ..., auto = banner style notes
    //hidden map: 500px
    //narrow map: 500/0.7 = 714
    //half map: 500/0.5 = 1000
    //wide map: 500/0.4 = 1250



    //map
    //auto: wide if possible, then half, then narrow, while route doc still >760px.
    //wide if >1900 (full route doc, wide map)
    //half if >1520 (full route doc, half map)
    //narrow if >1085 (full route doc, narrow map)
    //narrow if >714 (mid route doc, narrow map)
    //hidden if <714 (mid route doc, no map)
    //then shrink route doc until 500px
    //if narrow map cannot keep route doc >=500px, hide map
    
    return {
        appFrame: {
            fontSize: sizes.font,
        },
        mapFrame: {
            display: sizes.map === "0px" ? "none" : "block",
            width: sizes.map,
            height:"100vh", 
            float: "right" ,
            boxSizing:"border-box",
            overflow:"hidden"
        },
        statusBarFrame:{
            position: "fixed", 
            width: `calc( 100vw - ${sizes.map} )`, 
            height: "100vh"
        },
        menuOverlayFrame:{
            position: "fixed", 
            bottom: "0", 
            right: `${sizes.map}`, 
            width: `calc( 100vw - ${sizes.map} )`,
        },
        statusBar: {
            position: "fixed", 
            bottom: "0", 
            width: `calc( 100vw - ${sizes.map} )`,
            right: `${sizes.map}`, 
             boxSizing:"border-box",
              height: sizes.statusBar,
              borderTop: "1px solid black", 
              backgroundColor: colors.statusBar
        },
        menu: {
            backgroundColor: colors.menuBackground,
            boxSizing:"border-box",
            border:`1px solid ${colors.menuBorder}`,
            padding: "2px",
            marginLeft:"calc( 100% - 20em )",//TODO
            marginRight: "3px",
            marginBottom:`calc( 4px + ${sizes.statusBar} )`
        },

        contribution: {
            padding: "5px", 
            fontSize: "10pt",
            color: colors.subText
        },
        menuAnchor: {
            cursor: "pointer",
            position: "absolute",
            boxSizing:"border-box", 
            right: "0px",
             textAlign: 
             "right", width: sizes.menuAnchor, padding: "5px", backgroundColor: colors.statusBar,
             hover:{
                 backgroundColor: colors.menuAnchorHover
             }
        },
        statusMessage: {
            width: `calc( 100% - ${sizes.menuErrorString} - ${sizes.menuAnchor} )`, 
            boxSizing:"border-box", float: "left", overflow: "hidden", textOverflow: "ellipsis",
             whiteSpace: "nowrap", padding: "5px", backgroundColor: colors.statusBar
        },
        statusErrorString: {
            position: "absolute",boxSizing:"border-box", right: sizes.menuAnchor, textAlign: "right", width: sizes.menuErrorString, padding: "5px", backgroundColor: colors.statusBar
        }
    } as const;
}

// export const getStyleComponentAndClass = (style: AppStyle, color: AppColors): [JSX.Element, AppClassNames]=>{
//     const computedStyle = computeAppStyles(style, color);
//     const [classNames, styleString] = mergeStyleClass(computedStyle);

//     const Styles = <Helmet>
//         <style>{styleString}</style>
//     </Helmet>;
//     return [Styles, classNames];
// }



