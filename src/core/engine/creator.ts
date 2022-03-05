export {};// import { wbex } from "./windbomb";
// import { stringToText, instructionLikeToInstructionPacket } from "./convert";
// import { cps, lcn, npc, txt, v, itm, emy, bss } from "./strings";
// import { InstructionLike, InstructionPacket, TextLike } from "../../data/assembly/types";

// export const SPLIT = "split" as const;
// export const STEP = "step" as const;

// export type InstructionPacketWithExtend = InstructionPacket &{
//     extend: (extra: Partial<InstructionPacket>)=>InstructionPacket
// }

// export const addExtend = (instruction: InstructionPacket): InstructionPacketWithExtend => {
// 	const instructionWithExtend = instruction as InstructionPacketWithExtend;
// 	instructionWithExtend.extend = (extra)=>({...instruction, ...extra});
// 	return instructionWithExtend;
// };

// const mapKorokToEstimate = (korok: string):number =>{
// 	switch(korok){
// 		case "Acorn": return 5;
// 		case "Acorn Flying": return 5;
// 		case "Acorn in Log": return 5;
// 		case "Balloon": return 10;
// 		case "Basketball": return 5;
// 		case "Block Puzzle": return 10;
// 		case "Boulder Golf": return 5;
// 		case "Confetti": return 5;
// 		case "Flower Chase": return 10;
// 		case "Flower Count": return 8;
// 		case "Ice Block": return 8;
// 		case "Lift Rock": return 2;
// 		case "Lift Rock (Door)": return 3;
// 		case "Lift Rock (Tree)": return 5;
// 		case "Lift Rock Blocked": return 3;
// 		case "Lift Rock Blkd": return 3;
// 		case "Light Chase": return 5;
// 		case "Lily Pads": return 5;
// 		case "Match Tree": return 5;
// 		case "Match Cactus": return 5;
// 		case "Metal Box Circle": return 5;
// 		case "Offer Apple": return 5;
// 		case "Offer Banana": return 5;
// 		case "Offer Durian": return 5;
// 		case "Offer Egg": return 5;
// 		case "Offer Pepper": return 5;
// 		case "Race": return 15;
// 		case "Rock Circle": return 10;
// 		case "Shoot Emblem": return 5;
// 		case "Snowball Golf": return 5;
// 		case "Tree Stump": return 5;
// 		case "Well": return 5;
// 		default: return 5;
// 	}
// };

// export const Equipment = (text: TextLike, comment?: TextLike): InstructionPacketWithExtend => {
// 	return addExtend({
// 		icon: "equipment",
// 		text: itm(text),
// 		comment
// 	});
// };

// export const Chest = (text: TextLike, comment?: TextLike): InstructionPacketWithExtend => {
// 	return addExtend({
// 		icon: "chest",
// 		text: itm(text),
// 		comment
// 	});
// };

// export const ChestSpecial = (text: TextLike, comment?: TextLike): InstructionPacketWithExtend => {
// 	return addExtend({
// 		icon: "chest-special",
// 		text: itm(text),
// 		comment
// 	});
// };

// export const Shop = (text: TextLike, comment?: TextLike): InstructionPacketWithExtend => {
// 	return addExtend({
// 		icon: "shop",
// 		text: itm(text),
// 		comment
// 	});
// };

// export const Cook = (text: TextLike, comment?: TextLike): InstructionPacketWithExtend => {
// 	return addExtend({
// 		icon: "cook",
// 		text: itm(text),
// 		comment
// 	});
// };

// export const MakeMorning = (comment?: TextLike): InstructionPacketWithExtend => {
// 	return addExtend({
// 		icon: "make-morning",
// 		text: "Make Morning",
// 		comment
// 	});
// };

// export const MakeNoon = (comment?: TextLike): InstructionPacketWithExtend => {
// 	return addExtend({
// 		icon: "make-noon",
// 		text: "Make Noon",
// 		comment
// 	});
// };

// export const MakeNight = (comment?: TextLike): InstructionPacketWithExtend => {
// 	return addExtend({
// 		icon: "make-night",
// 		text: "Make Night",
// 		comment
// 	});
// };

// export const SnapElite = (text: TextLike): InstructionPacketWithExtend => {
// 	return addExtend({
// 		icon: "snap",
// 		text: emy(text),
// 		comment: "SNAP Elite"
// 	});
// };

// export const SnapQuest = (text: TextLike): InstructionPacketWithExtend => {
// 	return addExtend({
// 		icon: "snap",
// 		text: npc(text),
// 		comment: "SNAP Quest"
// 	});
// };

// export const Discover = (location: TextLike): InstructionPacketWithExtend => {
// 	return addExtend({
// 		icon: "location",
// 		text: lcn(location),
// 		comment: "DISCOVER"
// 	});
// };

// export const Item = (text: TextLike, comment?: TextLike): InstructionPacketWithExtend => {
// 	return addExtend({
// 		icon: "item",
// 		text: itm(text),
// 		comment
// 	});
// };

// export const Npc = (text: TextLike, comment?: TextLike): InstructionPacketWithExtend => {
// 	return addExtend({
// 		icon: "npc",
// 		text: npc(text),
// 		comment
// 	});
// };

// export const Ingredient = (text: TextLike, material: TextLike, comment?: TextLike): InstructionPacketWithExtend => {
// 	return addExtend({
// 		icon: "item",
// 		text: itm(text),
// 		comment: txt(material, " ", comment ?? ""),
// 	});
// };

// export const setImportant = (... inst: InstructionLike[]): InstructionLike[] => {
// 	return inst.map(i=>({
// 		...instructionLikeToInstructionPacket(i),
// 		important: true
// 	}));
// };

// const WB_STEP_ESTIMATE = 15;

// export const WindbombStepCps = (movement: string): InstructionPacketWithExtend => {
// 	const [wbCount, textBlock] = wbex(cps)(movement);
// 	return addExtend({
// 		type: STEP,
// 		text: textBlock,
// 		timeOverride: WB_STEP_ESTIMATE * wbCount
// 	}); 
// };

// export const Boss = (type:string, comment?: TextLike):InstructionPacketWithExtend => {
// 	return  addExtend({
// 		icon: bossTypeToIcon(type),
// 		text: bss(type),
// 		comment,
// 		bossType: bossTypeToCounter(type)
// 	});
// };

// const bossTypeToIcon = (type:string):string => {
// 	switch(type){
// 		case "Red Hinox": return "hinox-red";
// 		case "Blue Hinox": return "hinox-blue";
// 		case "Black Hinox": return "hinox-black";
// 		case "Stalnox": return "hinox-stal";
// 		case "Molduga": return "molduga";
// 		case "Stone Talus": return "talus";
// 		case "Rare Talus": return "talus-rare";
// 		case "Luminous Talus": return "talus-luminous";
// 		case "Igneo Talus": return "talus-igneo";
// 		case "Frost Talus": return "talus-frost";
// 		case "Molduking":
// 		case "Igneo Talus Titan":
// 			return "bossdlc";
// 		default: return "";
// 	}
// };

// const bossTypeToCounter = (type:string):string => {
// 	switch(type){
// 		case "Red Hinox": 
// 		case "Blue Hinox": 
// 		case "Black Hinox": 
// 		case "Stalnox": 
// 			return "Hinox";
// 		case "Stone Talus": 
// 		case "Rare Talus": 
// 		case "Luminous Talus": 
// 		case "Igneo Talus": 
// 		case "Frost Talus": 
// 			return "Talus";
// 		default: return "";
// 	}
// };

// export const Memory = (location: string):InstructionPacketWithExtend => {
// 	const name = memoryLocationToName(location);
// 	const icon = location === "Ash Swamp" ? "memory-final" : "memory";
// 	return addExtend({
// 		icon,
// 		text: lcn(location),
// 		comment: name,
// 		memoryChange: 1,
// 		type: SPLIT
// 	});
// };


// };