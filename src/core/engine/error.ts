export type EngineError = 
    "GaleRecharge" |
    "GaleCount" |
    "GaleText" |
    "FuryRecharge" |
    "FuryCount" |
    "FuryText"

export const EngineErrorStrings = {
	"GaleRecharge": "Gale might not be back",
	"GaleCount": "Not enough gale",
	"GaleText": "Invalid gale",
	"FuryRecharge": "Fury might not be back",
	"FuryCount": "Not enough fury",
	"FuryText": "Invalid fury"
};