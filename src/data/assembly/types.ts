import { TypedStringBlock } from "data/assembly/text/type";
import { MapOf } from "data/util";

export type RouteAssemblySection = {
	name?: string,
	route: RouteAssembly[]
}

export type RouteAssembly = { //RouteAssembly
	// Main text
	text: TypedStringBlock,
	// Banner mode. If not undefined, text is treated as a banner and everything else is ignored
	bannerType?: BannerType,
	bannerTriangle?: boolean,
	// Icon and comment to make a 2-line instruction
	icon?: string,
	comment?: TypedStringBlock,
	// Detailed Notes
	//notes?: TypedStringBlock,

	//isStep: boolean,
	//isShrine: boolean,
	//isMemory: boolean,
	//isTower: boolean,
	//isWarp: boolean,
	//korokCode?: string,
	//bossType: BossType,
	//spendSeed: number,

	// Variable Changes
	//variableChange?: MapOf<number>,
	// Champion Ability Usage
	//gale?: number,
	//fury?: number
	// Override the time this step takes, for calculating ability recharge
	//timeOverride?: number,
	// Force show in important mode
	//important?: boolean,
	// // Suppress error type
	// suppressError?: EngineError[],
	// // Engine command
	// command?: EngineCommand[],
}

export enum BannerType {
    Notes,
    Warning,
    Error
}

export enum BossType {
	None,
	Hinox,
	Talus,
	Molduga
}

enum BossTypeExtended {
	None,
	RedHinox,
	BlueHinox,
	BlackHinox,
	StoneTalus,
	LuminousTalus,
	RareTalus,
	IgneoTalus,
	FrostTalus,
	Molduga
}

// export type InstructionLike = TextLike | InstructionPacket | undefined;

// export type InstructionData = {
// 	// If is section title, display as section title
// 	isSectionTitle: boolean,
// 	// Used to calculate if something should show in split-only view
// 	isSplit: boolean,
// 	// Used to calculate if something should be hidden in important-only view
// 	isKorok: boolean,
// 	isImportant: boolean,

// 	splitPrefix?: TextBlock,
// 	// Line number column
//     lineNumber?: number,
// 	lineNumberClassName?: string,
// 	// Counter (boss, korok, shrine, memory)
//     counterNumber?: string,
// 	// Counter type
//     counterClassName?: string,
// 	// Step number
//     stepNumber?: string,
// 	// Main text
// 	text: TextBlock,
// 	icon?: string,
//     comment?: TextBlock,
// 	// A little colored square to indicate step/split
// 	stepperClassName?: string,

//     // Note column
// 	hasNotes?: boolean,
//     notes?:TextBlock,
// 	notesClass?:string, // used to display borders
//     notesRowSpan?: number,
// 	notesEmptySecondRow?: boolean, // For 2-line blocks without notes
// 	// Image
// 	hasImage?: boolean,
//     image?:string,
//     imageRowSpan?: number,
// 	imageEmptySecondRow?: boolean, // For 2-line blocks without images
// 	// Variables
//     variables: {[key: string]:number},
// 	// Errors. If errors are suppressed they become warnings
// 	errors?: string,
// 	warnings?: string,
// }

export type AbilityUsage = {
	fury?: number,
	gale?: number,
}

export type ChangeData = {
	version: string,
	date: string,
	changes: (string | string[])[],
}

// Type helpers
// export const useInstructionLike = <T>(instructionFunction: (input: Instruction)=>T):(input?: InstructionLike)=>T => {
// 	return input =>instructionFunction(instructionLikeToInstruction(input));
// };

// export const useMultiText= <T>(instructionFunction: (input?: InstructionLike)=>T):(input?: InstructionLike, ...moreInput: TextLike[])=>T => {
// 	return (input, ...moreInput)=>{
// 		if(isInstruction(input) || moreInput.length === 0){
// 			return instructionFunction(instructionLikeToInstruction(input));
// 		}
// 		//If there is multiple inputs, cat the texts
// 		const text = txt(input as TextLike, ...moreInput);
// 		return instructionFunction(instructionLikeToInstruction(text));
// 	};
    
// };

