export {};
// import { Text, TextLike, TextBlock, InstructionPacket, InstructionLike } from "../../data/assembly/types";

// export const stringToText = (str: string, colorClass?: string): Text => {
// 	return {
// 		colorClass: colorClass,
// 		content: str
// 	};
// };

// export const textToInstructionPacket = (text: TextLike): InstructionPacket => {
// 	return { text };
// };

// export const textLikeToTextBlock = (text: TextLike): TextBlock => {
// 	if(typeof text === "string"){
// 		return stringToText(text);
// 	}
// 	return text;
// };

// export const instructionLikeToInstructionPacket = (input?: InstructionLike): InstructionPacket =>{
// 	if(input === undefined){
// 		return {
// 			text: {
// 				content:""
// 			}
// 		};
// 	}
// 	if(typeof input !== "string" && "text" in input){
// 		return input as InstructionPacket;
// 	}
	
// 	return textToInstructionPacket(input);
// };