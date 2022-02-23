export {};// import { gale, txt } from "./strings";
// import { TextBlock, TextLike} from "../../data/assembly/types";

// export const wb = (directionModeFn: (direction: string)=>TextBlock): (windbombInstructionsString: string)=>TextBlock => {
// 	return (wbInstStr)=>wbex(directionModeFn)(wbInstStr)[1];
// };

// export const wbex = (directionModeFn: (direction: string)=>TextBlock): (windbombInstructionsString: string)=>[number, TextBlock] => {
// 	return (wbInstStr)=>{
// 		const parts = wbInstStr.split("+").map(str=>str.trim());
// 		const output:TextLike[] = [];
// 		parts.forEach((windbomb, i)=>{
// 			if(windbomb.trim() === "GALE"){
// 				output.push(gale());
// 			}else{
// 				const spaceIndex = windbomb.indexOf(" ");
// 				if(spaceIndex >= 0){
// 					const direction = windbomb.substring(0, spaceIndex);
// 					if (direction === "SQ"){
// 						output.push("SQ");
// 					}else{
// 						output.push(directionModeFn(direction));
// 					}
// 					output.push(windbomb.substring(spaceIndex));
// 				}else{
// 					if (windbomb === "SQ"){
// 						output.push("SQ");
// 					}else{
// 						output.push(directionModeFn(windbomb));
// 					}
// 				}
// 			}
// 			if(i<parts.length - 1){
// 				output.push(" + ");
// 			}
// 		});
// 		return [parts.length, txt(...output)];
// 	};
// };