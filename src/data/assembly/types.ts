import { TypedString } from "./text";
import { MapOf } from "data/util";

export type RouteAssemblySection = {
	name?: string,
	route: RouteAssembly[]
}

export type RouteAssembly = { //RouteAssembly
	// Main text
	text: TypedString,
	// Banner mode. If not undefined, text is treated as a banner and everything else is ignored
	bannerType?: BannerType,
	bannerTriangle?: boolean,
	// Icon and comment to make a 2-line instruction
	icon?: string,
	comment?: TypedString,
	// Detailed Notes
	notes?: TypedString,
	// isStep
	isStep?: boolean,

	splitType: SplitType,
	//korokCode?: string,
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
	movements?: Movement[],
	lineColor?: string,
	hideIconOnMap?: boolean,
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

export type Movement = {
    to: Coord;// target of the movement
    isWarp: boolean; // if true, do not draw a line for this movement
    isAway: boolean; // if true, do not advance current position to target
}

export type Coord = {x: number, z: number}


export enum SplitType {
    None,
    Shrine, //1 - 120
    Tower, //I - XV
    Warp, // 1-??
    Memory, // I - XIII
    Korok, //1 - 900
    Hinox, //1-40
    Talus, //1-40
    Molduga, //1-4
    UserDefined
}

