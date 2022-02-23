export type EngineCommand = 
    "EnableGale+" |
    "EnableFury+" |
    "Debug"

export const EngineCommands: {[key: string]: EngineCommand} = {
	"EnableGalePlus": "EnableGale+",
	"EnableFuryPlus": "EnableFury+",
	"Debug" : "Debug"
};