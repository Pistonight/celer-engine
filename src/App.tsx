import React, { useState } from 'react';
import logo from './logo.svg';
import TestImage from './img/shrine.png';
import { parse, stringify } from 'yaml'
import { ImageOverlay, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L, { imageOverlay, LatLngBounds } from 'leaflet';
import { AppFrame } from './ui/frames/AppFrame';
import { DefaultColors } from './ui/styles/Colors';
import {  Map as LeafletMap} from 'leaflet';


class AppRoot extends React.Component {
  constructor(props: {}){
    super(props);
    //Set initial state

    
  }

  // componentDidMount(){
  //   const settings = settingsStorage.read(this.state.settings);
  //   this.setState({settings},()=>{
  //     setTimeout(()=>map.invalidateSize(), 400);
  //   });
  // }

  // private setMapDisplayMode(mode: MapDisplayMode) {
  //   this.setState({settings:{...this.state.settings, mapDisplayMode: mode}}, ()=>{
  //     settingsStorage.save(this.state.settings);
  //     setTimeout(()=>map.invalidateSize(), 400);
  //   });
  // }
//   const testString = `
  


// Project:
//   Name: 1EX
//   Description: 
//   Author: 
//   URL: 
//   Entry Point: main.yaml
//   Change Log: 
//   Custom Style:
//   Config:
//     Default Split Prefix: "-"

// main:
// - Plateau 1:
//   - ~SOR Clip, Get TOD # Generic text step
//   - <Equipment>: [Potlid, what]
//     notes      : something
//                  does that work?
//   - Do quests in kakariko:
//     - todo
//     - a lot of things
//   -
//     - text: something
//       split: true
//       icon: override icon
//       comment: override comment
// 	    image?: string,
// 	    // Variable Changes
// 	    shrineChange?: number,
// 	    korokChange?: number, // adding = add total and seeds, subtracting = remove seed (hestu)
// 	    memoryChange?: number,
// 	    variableChange?: {[key: string]:number},
// 	// Champion Ability Usage
// 	    ability?: AbilityUsage,
// 	// Override the time this step takes, for calculating ability recharge
// 	    timeOverride?: number,
// 	// Type is either none, step, split or section (section ignores other options)
// 	type?: "step" | "split" | "section",
// 	// Only for splits, the text to prepend to the split name when generating livesplit file
// 	    splitPrefix?: TextLike,
// 	// Korok Code to check korok completion
// 	    korokCode?: string,
// 	// Boss type to check boss completion
// 	    bossType?: string,
// 	// Force show in important mode
// 	    important?: boolean,
// 	// Suppress error type
// 	    suppressError?: EngineError[],
// 	// Engine command
// 	    command?: EngineCommand[],

//     - <Korok>: N53
//   `;

  // const object = parse(testString);
  // console.log(testString);
  // console.log(object);
render(): JSX.Element {
//   const styles:AppStyle = {
//     appFontSize: "14pt",
//     mapSize: "50vw",
//     statusBarSize: "2em",
//     menuAnchorSize: "8em",
//     errorStringSize: "8em"
// }
//   switch(this.state.settings.mapDisplayMode){
//     case MapDisplayMode.Wide:
//       styles.mapSize = "60%";
//       break;
//     case MapDisplayMode.Narrow:
//       styles.mapSize = "30%";
//       break;
//     case MapDisplayMode.Hidden:
//       styles.mapSize = "0px";
//       break;
//   }
// const [Styles, appclasses] = getStyleComponentAndClass(styles, DefaultColors);


        return <div/>;
  
    }
}

export default AppRoot;
