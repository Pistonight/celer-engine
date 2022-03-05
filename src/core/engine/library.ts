export {};
// import { cps, gale, rne, txt, ingredient} from "./strings";
// import { wb } from "./windbomb";
// import { addExtend, Ingredient, InstructionPacketWithExtend, Tower, Shrine, Korok, ShrineBlessing, ShrineDLC, ShrineDoubleSword, ShrineSword, Memory } from "./creator";
// import {  TextLike } from "../../data/assembly/types";

// const towerHelper = (name: string): (comment?: TextLike)=>InstructionPacketWithExtend => {
// 	return (comment)=>Tower(name, comment);
// };


// export const Memories = {
// 	"LanayruRoad": Memory("Lanayru Road"),
// 	"SacredGrounds": Memory("Sacred Grounds"),
// 	"LakeKolomo": Memory("Lake Kolomo"),
// 	"AncientColumns": Memory("Ancient Columns"),
// 	"KaraKaraBazaar": Memory("Kara Kara Bazaar"),
// 	"EldinCanyon": Memory("Eldin Canyon"),
// 	"IrchPlain": Memory("Irch Plain"),
// 	"WestNecluda": Memory("West Necluda"),
// 	"HyruleCastle": Memory("Hyrule Castle"),
// 	"SpringOfPower": Memory("Spring of Power"),
// 	"SanidinPark": Memory("Sanidin Park"),
// 	"HyruleField": Memory("Hyrule Field"),
// 	"AshSwamp": Memory("Ash Swamp"),
// };

// const ingredientHelper = (name: string, total: number): (count: number, comment?: TextLike) => InstructionPacketWithExtend=>{
// 	const variableName = name.replaceAll(" ", "");
// 	return (count, comment)=>addExtend({
// 		variableChange: { [variableName]: count },
// 		...Ingredient(txt(String(count), " ", name), ingredient(variableName, total), comment)
// 	});
// };

// export const Materials = {
// 	SilentPrincess: ingredientHelper("Silent Princess", 19),
// 	HeartyBass: ingredientHelper("Hearty Bass", 15),
// 	Beetle: ingredientHelper("Beetle", 15),
// 	Tail: ingredientHelper("Tail", 45),
// 	Honey: ingredientHelper("Honey", 16),
// 	Rushroom: ingredientHelper("Rushroom", 55),
// 	Dinraal: ingredientHelper("Dinraal", 8),
// };



