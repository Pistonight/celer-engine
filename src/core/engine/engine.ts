import { addKorok, getMissingKoroks, hasKorok, KorokData, newData } from "./korok";
// import { instructionLikeToInstructionPacket, stringToText, textLikeToTextBlock } from "./convert";
// import { EngineError, EngineErrorStrings } from "./error";
// import { txt, lcn, npc} from "./strings";
// import { InstructionData, InstructionLike,TextBlock, Text, InstructionPacket, AbilityUsage, TextLike, RouteAssemblySection, RouteAssembly } from "../../data/assembly/types";
// import { Koroks } from "./library";
// import { EngineCommand, EngineCommands } from "./command";
// import { InstructionPacketWithExtend } from "./creator";
import { DocLine } from "core/route";
import { BannerType, RouteAssembly, RouteAssemblySection, SplitType } from "data/assembly/types";
import { StringType } from "data/assembly/text/type";

//Recharge time in seconds
const GALE_RECHARGE = 360;
const FURY_RECHARGE = 720;
const GALE_PLUS_RECHARGE = 120;
const FURY_PLUS_RECHARGE = 240;
// Default estimate for each step is 20 seconds
const STEP_ESTIMATE = 20;
const ROMAN_NUMERAL = ["","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV"];

const ShrineFormat = "{{KRK}} {{Text}} {{SRN}}"
const KorokFormat = "{{Seed}} {{ID}} {{Text}}"

export class RouteEngine{
	private sectionNumber = 0;
	private lineNumber = 0;
	private step = "1";
	private korokCount = 0;
	private korokSeed = 0;
	private shrineCount = 0;
	private memoryCount = 0;
	private towerCount = 0;
	private warpCount = 0;
	private talusCount = 0;
	private hinoxCount = 0;
	private moldugaCount = 0;
	// private gale = 0;
	// private fury = 0;
	
	// private galeRechargeTime = 0;
	// private furyRechargeTime = 0;
	// private enableGalePlus = false;
	// private enableFuryPlus = false;
	// private variables: {[key: string]:number} = {};

	// private korokData: KorokData = {};
	// private dupeKorok: string[] = [];

	private initialize(): void {
		this.sectionNumber = 1;
		this.lineNumber = 1;
		this.step = "1";
		this.korokCount = 0;
		this.korokSeed = 0;
		this.shrineCount = 0;
		this.towerCount = 0;
		this.warpCount = 0;
		this.memoryCount = 0;
		this.talusCount = 0;
		this.hinoxCount = 0;
		this.moldugaCount = 0;
		// this.gale = 3;
		// this.fury = 3;
		// this.galeRechargeTime = 0;
		// this.furyRechargeTime = 0;
		// this.enableGalePlus = false;
		// this.enableFuryPlus = false;
		
		// this.variables = {};
		// this.korokData = newData();
		// this.dupeKorok = [];
	}

	// private reportDebugInfo(location: string): void {
	// 	console.error({
	// 		line: this.lineNumber,
	// 		location,
	// 		snapshot: {...this}
	// 	});
	// }

	public compute(route: RouteAssemblySection[]): DocLine[] {
		this.initialize();
		const lines: DocLine[] = [];
		route.forEach(section=>this.computeSection(section, lines));
		return lines;
	}

	private computeSection(section: RouteAssemblySection, output: DocLine[]): void {
		if(section.name){
			output.push({
				lineType: "DocLineSection",
				sectionName: section.name,
				sectionNumber: this.sectionNumber
			});
			this.sectionNumber++;
		}
		section.route.forEach(line=>this.computeAssembly(line, output));
	}

	private computeAssembly(data: RouteAssembly, output: DocLine[]): void {
		if(data.bannerType !== undefined){
			output.push({
				lineType: "DocLineBanner",
				text: data.text,
				bannerType: data.bannerType,
				showTriangle: !!data.bannerTriangle
			});
			return;
		}
		
		let step: string | undefined = undefined;
		if(data.isStep){
			step = this.step;
			this.incStep();
		}

		const common = {
			text: data.text,
			lineNumber: String(this.lineNumber),
			stepNumber: step,
			movements: data.movements || [],
			notes: data.notes
		}


		if(!data.icon){
			output.push({
				...common,
				lineType: "DocLineText",
			});
			this.lineNumber++;
			return;
		}

		// counter
		let counter = "";
		switch(data.splitType){
			case SplitType.Shrine:
				this.shrineCount++;
				counter = String(this.shrineCount);
				break;
			case SplitType.Tower:
				this.towerCount++;
				counter = ROMAN_NUMERAL[this.towerCount];
				break
			case SplitType.Korok:
				this.korokCount++;
				this.korokSeed++;
				counter = String(this.korokCount);
				break;
			case SplitType.Warp:
				this.warpCount++;
				counter = String(this.warpCount);
				break;
			case SplitType.Memory:
				this.memoryCount++;
				counter = ROMAN_NUMERAL[this.memoryCount];
				break;
			case SplitType.Hinox:
				this.hinoxCount++;
				counter = String(this.hinoxCount);
				break;
			case SplitType.Talus:
				this.talusCount++;
				counter = String(this.talusCount);
				break;
			case SplitType.Molduga:
				this.moldugaCount++;
				counter = String(this.moldugaCount);
				break;
		}


		output.push({
			...common,
			lineType: "DocLineTextWithIcon",
			icon: data.icon,
			comment: data.comment,
			
			counterValue: counter,
			splitType: data.splitType,
			mapLineColor: data.lineColor,
			hideIconOnMap: data.hideIconOnMap
		})
		
		this.lineNumber++;
	}

	// private computeInstructions(route: RouteAssemblySection[]):DocLine[] {
	// 	//Fill empty line after each split
	// 	const filledInput:InstructionPacket[] = [];
	// 	input.forEach((line, i)=>{
	// 		filledInput.push(line);
	// 		if(line.type==="split" && i < input.length - 1 && input[i+1].type !== "split"){
	// 			filledInput.push({text:""});
	// 		}
	// 	});
	// 	const output: InstructionData[] = [];
	// 	filledInput.forEach((_, i)=>this.processInstruction(filledInput, i, output));
	// 	const missingKoroks = getMissingKoroks(this.korokData);

	// 	if(this.dupeKorok.length !== 0){
	// 		const dupeKorokInstructions: InstructionLike[] = [
	// 			"Duplicate Koroks"
	// 		];
	// 		this.dupeKorok.forEach(id=>{
	// 			const korok = Koroks[id as keyof typeof Koroks] as InstructionPacketWithExtend; 
	// 			dupeKorokInstructions.push(korok.extend({comment: "Duplicated"}));
	// 		});

	// 		const mappedInstructions = dupeKorokInstructions.map(instructionLikeToInstructionPacket);
	// 		mappedInstructions.forEach((_, i)=>this.processInstruction(mappedInstructions, i, output));
	// 	}
		
	// 	if(missingKoroks.length !== 0){
	// 		const missingKorokInstructions: InstructionLike[] = [
	// 			"Missing Koroks"
	// 		];
	// 		missingKoroks.forEach(id=>{
	// 			const korok = Koroks[id as keyof typeof Koroks] as InstructionPacketWithExtend; 
	// 			missingKorokInstructions.push(korok.extend({comment: "Missing"}));
	// 		});

	// 		const mappedInstructions = missingKorokInstructions.map(instructionLikeToInstructionPacket);
	// 		mappedInstructions.forEach((_, i)=>this.processInstruction(mappedInstructions, i, output));
	// 	}

	// 	return output;
	// }

	// private processInstruction(input: InstructionPacket[], i:number, output: InstructionData[]) {
	// 	if(input[i].type === "section"){
	// 		// No need to process anything if it's a section title
	// 		output.push({
	// 			isSectionTitle: true,
	// 			isSplit: false,
	// 			isKorok: false,
	// 			isImportant: true,
	// 			text: textLikeToTextBlock(input[i].text),
	// 			variables: {},
	// 		});
	// 		this.step = "1";
	// 		this.noDetailYet = true;
	// 		this.noImageYet = true;
	// 	}else{
	// 		this.processNoneSectionTitle(input, i, output);
	// 	}
	// }
	// private processNoneSectionTitle(input: InstructionPacket[], i:number, output: InstructionData[]): void {
	// 	const data = input[i];
	// 	const debugEnable = this.hasCommand(EngineCommands.Debug, data.command);
	// 	if(this.hasCommand(EngineCommands.EnableFuryPlus, data.command)){
	// 		this.enableFuryPlus = true;
	// 	}
	// 	if(this.hasCommand(EngineCommands.EnableGalePlus, data.command)){
	// 		this.enableGalePlus = true;
	// 	}
	// 	// Process variable change before text
	// 	if(data.variableChange){
	// 		this.processVariableChange(data.variableChange);
	// 	}
	// 	if(debugEnable){
	// 		this.reportDebugInfo("Initial");
	// 	}
	// 	const error = new Set<EngineError>();
	// 	let furyText = "?";
	// 	let galeText = "?";
	// 	if(data.ability){
	// 		[galeText, furyText] = this.processAbilityUsage(data.ability, error);
	// 	}
	// 	if(debugEnable){
	// 		this.reportDebugInfo("After Ability Usage");
	// 	}

	// 	const dataCommentRaw = data.comment && data.icon ? textLikeToTextBlock(data.comment) : undefined;
	// 	const dataTextRaw = textLikeToTextBlock(data.text);
	// 	const dataComment = this.applyAbilityTextBlock(dataCommentRaw, furyText, galeText, error);
	// 	const dataText = this.applyAbilityTextBlock(dataTextRaw, furyText, galeText, error);

	// 	// Process error suppression
	// 	const warnings: EngineError[] = [];
	// 	if(data.suppressError){
	// 		data.suppressError.forEach(suppressedError=>{
	// 			if(error.has(suppressedError)){
	// 				error["delete"](suppressedError);
	// 				warnings.push(suppressedError);
	// 			}
	// 		});
	// 	}

	// 	let lineNumberClassName = "";
	// 	let errorText = undefined;
	// 	let warningText = undefined;
	// 	if(error.size > 0){
	// 		lineNumberClassName = "indicator-color-error";
	// 		errorText = " ERROR: "+ Array.from(error).map(e=>EngineErrorStrings[e]).join(", ");
	// 	}else if(warnings.length > 0){
	// 		lineNumberClassName = "indicator-color-warning";
	// 		warningText = " WARNING: "+ warnings.map(e=>EngineErrorStrings[e]).join(", ");
	// 	}

	// 	const props: InstructionData = {
	// 		isSectionTitle: false,
	// 		isSplit: data.type === "split",
	// 		isKorok: !!data.korokCode,
	// 		isImportant: !!data.important,
	// 		splitPrefix: data.splitPrefix ? textLikeToTextBlock(data.splitPrefix) : undefined,
	// 		lineNumber: this.lineNumber,
	// 		lineNumberClassName,
	// 		text: dataText,
	// 		icon: data.icon,
	// 		comment: dataComment,
	// 		variables: {
	// 			...this.variables,
	// 			krk: this.korokCount,
	// 			seed: this.korokSeed,
	// 			srn: this.shrineCount,
	// 			fury: this.fury,
	// 			gale: this.gale
	// 		},
	// 		errors: errorText,
	// 		warnings: warningText
	// 	};

	// 	this.processStepOrSplit(data.type, props);
		
	// 	this.processAbilityRecharge(data.type === "step", data.timeOverride);
	// 	if(debugEnable){
	// 		this.reportDebugInfo("After Ability Recharge");
	// 	}

	// 	if(data.shrineChange){
	// 		this.processShrineChange(data.shrineChange, dataText, props);
	// 	}

	// 	if(data.korokChange){
	// 		this.processKorokChange(data.korokChange, dataText, props, data.korokCode);
	// 	}

	// 	if(data.memoryChange){
	// 		this.memoryCount+= data.memoryChange;
	// 		props.counterNumber = MEMORY_ROMAN[this.memoryCount];
	// 		props.counterClassName = "counter-color-memory";
	// 	}

	// 	if(data.bossType){
	// 		switch(data.bossType){
	// 			case "Talus":
	// 				this.talusCount++;
	// 				props.counterNumber  = String(this.talusCount);
	// 				props.counterClassName = "counter-color-boss";
	// 				break;
	// 			case "Hinox":
	// 				this.hinoxCount++;
	// 				props.counterNumber  = String(this.hinoxCount);
	// 				props.counterClassName = "counter-color-boss";
	// 				break;
	// 		}
	// 	}

	// 	if(data.notes){
	// 		props.notes = textLikeToTextBlock(data.notes);
	// 		let extra = 0;
	// 		if(data.icon){
	// 			extra++;
	// 		}
	// 		let j = i+1;
	// 		if(data.type === "split"){
	// 			props.notesRowSpan = 1 + extra;
	// 		}else{
	// 			for(;j<input.length;j++){
	// 				if(input[j].type === "section" || input[j].type === "split" || input[j].notes){
	// 					break;
	// 				}
	// 				if(input[j].icon){
	// 					extra++;
	// 				}
	// 			}
	// 			props.notesRowSpan = j - i + extra;
	// 		}
	// 		if(j >= input.length || !(input[j].notes || input[j].type === "section")){
	// 			props.notesClass = "detail-box detail-box-bottom-border";
	// 		}else{
	// 			props.notesClass = "detail-box";
	// 		}
	// 		props.hasNotes = true;
	// 		this.noDetailYet = false;
	// 	}else if(this.noDetailYet){
	// 		props.notes = stringToText("");
	// 		props.notesRowSpan = 1;
	// 		if(data.icon){
	// 			props.notesEmptySecondRow = true;
	// 		}
	// 	}

	// 	if(data.image){
	// 		props.hasImage = true;
	// 		props.image = data.image;
	// 		let extra = 0;
	// 		if(data.icon){
	// 			extra++;
	// 		}
	// 		let j = i+1;
	// 		for(;j<input.length;j++){
	// 			if(input[j].type === "section" || input[j].image){
	// 				break;
	// 			}
	// 			if(input[j].icon){
	// 				extra++;
	// 			}
	// 		}
	// 		props.imageRowSpan = j - i + extra;
	// 		this.noImageYet = false;
	// 	}else if(this.noImageYet){
	// 		props.imageRowSpan = 1;
	// 		if(data.icon){
	// 			props.imageEmptySecondRow = true;
	// 		}
	// 	}

	// 	output.push(props);
	// 	this.lineNumber++;
	// 	if(data.icon){
	// 		this.lineNumber++;
	// 	}
	// }

	// private processVariableChange(variableChange: {[key: string]: number}): void {
	// 	for(const key in variableChange){
	// 		if(!(key in this.variables)){
	// 			this.variables[key] = 0;
	// 		}
	// 		this.variables[key]+=variableChange[key];
	// 	}
		
	// }

	// private processAbilityUsage(ability: AbilityUsage, error: Set<EngineError>): [string, string]{
	// 	const galeRecharge = this.enableGalePlus ? GALE_PLUS_RECHARGE : GALE_RECHARGE;
	// 	const furyRecharge = this.enableFuryPlus ? FURY_PLUS_RECHARGE : FURY_RECHARGE;
	// 	let galeText = "?";
	// 	let furyText = "?";
		
	// 	if(ability.gale){
	// 		if(this.gale === 0){
	// 			if(ability.gale && this.galeRechargeTime < galeRecharge){
	// 				error.add("GaleRecharge");
	// 			}
	// 			this.galeRechargeTime = 0;
	// 			this.gale = 3;
	// 		}
	// 		if(ability.gale > this.gale){
	// 			error.add("GaleCount");
	// 		}else{
	// 			galeText = this.getAbilityChangeText(this.gale, ability.gale);
	// 			this.gale -= ability.gale;
	// 			if(this.gale === 0){
	// 				this.galeRechargeTime = 0;
	// 			}
	// 		}
	// 	}
	// 	if(ability.fury){
	// 		if(this.fury === 0){
	// 			if(ability.fury && this.furyRechargeTime < furyRecharge){
	// 				error.add("FuryRecharge");
	// 			}
	// 			this.furyRechargeTime = 0;
	// 			this.fury = 3;
	// 		}
	// 		if(ability.fury > this.fury){
	// 			error.add("FuryCount");
	// 		}else{
	// 			furyText = this.getAbilityChangeText(this.fury, ability.fury);
	// 			this.fury -= ability.fury;
	// 			if(this.fury === 0){
	// 				this.furyRechargeTime = 0;
	// 			}
	// 		}
	// 	}

	// 	return [galeText, furyText];

	// }

	// private processStepOrSplit(type: "step" | "split" | undefined | string, props: InstructionData): void{
	// 	if(type === "step"){
	// 		props.stepNumber = this.step;
	// 		this.incStep();
	// 		props.stepperClassName="indicator-color-step";
			
	// 	}else if(type === "split"){
	// 		this.step = "1";
	// 		props.stepperClassName="indicator-color-split";
	// 		this.noDetailYet = true;
	// 	}else{
	// 		props.stepperClassName="indicator-color-none";
	// 	}
	// }

	// private processAbilityRecharge(isStep: boolean, timeOverride?: number): void {
	// 	let time = 0;
	// 	if(timeOverride){
	// 		time = timeOverride;
	// 	}else if(isStep){
	// 		time = STEP_ESTIMATE;
	// 	}
	// 	if(this.gale === 0){
	// 		this.galeRechargeTime += time;
	// 	}
	// 	if(this.fury === 0){
	// 		this.furyRechargeTime += time;
	// 	}
	// }

	// private processShrineChange(shrineChange: number, text: TextLike, props: InstructionData): void{
	// 	this.shrineCount += shrineChange;
	// 	if(this.korokCount===0){
	// 		props.text = txt(lcn(`${this.shrineCount} `),text);
	// 	}else{
	// 		props.text = txt(lcn(`${this.shrineCount}.${this.getKorokCountLastTwoDigits()} `), text);
	// 	}
	// 	props.counterNumber = String(this.shrineCount);
	// 	props.counterClassName = "counter-color-shrine";
	// }

	// private processKorokChange(korokChange: number, text: TextLike, props: InstructionData, korokCode?: string): void{
	// 	if(korokCode){
	// 		if(hasKorok(this.korokData, korokCode)){
	// 			this.dupeKorok.push(korokCode);
	// 		}else{
	// 			addKorok(this.korokData, korokCode);
	// 		}
	// 	}
	// 	if(korokChange > 0){
	// 		this.korokCount += korokChange;
	// 		this.korokSeed += korokChange;
	// 		props.text = txt(npc(`${this.getKorokSeedLastTwoDigits()} `),text);
	// 		props.counterNumber = String(this.korokCount);
	// 		props.counterClassName = "counter-color-korok";
	// 	}else{
	// 		this.korokSeed += korokChange;//Hestu only takes seed, not total count
	// 		props.text = txt(npc(`${this.getKorokSeedLastTwoDigits()} `),text);
	// 	}
	// }

	private incStep():void {
		if(this.step === "Z"){
			this.step = "0";
		}else if(this.step === "9"){
			this.step = "A";
		}else{
			this.step = String.fromCharCode(this.step.charCodeAt(0)+1);
		}
	}

	// private hasCommand(find: EngineCommand, commands?: EngineCommand[]): boolean {
	// 	if(!commands){
	// 		return false;
	// 	}
	// 	return commands.filter(e=>e===find).length>0;
	// }

	// private getKorokCountLastTwoDigits(): string {
	// 	return this.getLastTwoDigits(this.korokCount);
	// }

	// private getKorokSeedLastTwoDigits(): string {
	// 	return this.getLastTwoDigits(this.korokSeed);
	// }

	// private getLastTwoDigits(value: number): string {
	// 	if(value<10){
	// 		return String(value);
	// 	}
	// 	const mod100 = value % 100;
	// 	if(mod100 < 10){
	// 		return "0" + mod100;
	// 	}
	// 	return String(mod100);
	// }

	// private getAbilityChangeText(current: number, use: number): string{
	// 	if(current === 3){
	// 		if(use === 1){
	// 			return "1";
	// 		}
	// 		return `1-${use}`;
	// 	}
	// 	if(current === 2){
	// 		if(use === 1){
	// 			return "2";
	// 		}
	// 		return "2-3";
	// 	}
	// 	return "3";
	// }

	// private applyAbilityTextBlock(textBlock: TextBlock | undefined, furyText: string, galeText: string, errorOut: Set<EngineError>): TextBlock {
	// 	if(!textBlock){
	// 		return [];
	// 	}
	// 	if(Array.isArray(textBlock)){
	// 		return textBlock.map(t=>this.applyAbilityText(t, furyText, galeText, errorOut));
	// 	}
	// 	return this.applyAbilityText(textBlock, furyText, galeText, errorOut);
	// }

	// private applyAbilityText(text: Text, furyText: string, galeText: string, errorOut: Set<EngineError>): Text {
	// 	if(text.colorClass === "color-fury"){
	// 		if(furyText==="?"){
	// 			errorOut.add("FuryText");
	// 		}
	// 		return {
	// 			...text,
	// 			content: "FURY "+furyText
	// 		};
	// 	}else if(text.colorClass === "color-gale"){
	// 		if(galeText==="?"){
	// 			errorOut.add("GaleText");
	// 		}
	// 		return {
	// 			...text,
	// 			content: "GALE "+galeText
	// 		};
	// 	}
	// 	return text;
	// }
}
