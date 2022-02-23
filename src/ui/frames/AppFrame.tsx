import L, { LatLngBounds } from "leaflet";
import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import TestImage from 'data/image/shrine.png';
import { MenuItem, MenuItemWithValue } from "../../components/MenuItem/MenuItem";
import { useAppRoot } from "ui/root";
import { useStyles } from "ui/styles";
import { MapDisplayMode } from "data/settings";
import "data/scripts";
import { DocLineComponent } from "ui/components/DocLineComponent";
import { DocLine, SplitType } from "core/route";
import { StringType } from "data/assembly/text/type";
import { DocFrame } from "./DocFrame";
import { BannerType, RouteAssemblySection } from "data/assembly/types";
import { RouteEngine } from "core/engine";


const engine = new RouteEngine();

export interface AppFrameProps  {
    // appStyle: AppClassNames & AppStyle,
    // mapDisplayMode: MapDisplayMode,
    // setMapDisplayMode: Consumer<MapDisplayMode>,
    // mapCallback: Consumer<LeafletMap>

};
export const AppFrame: React.FC<AppFrameProps> = ()=>{
  const {map, setMap, mapDisplayMode, setMapDisplayMode, theme, setTheme} = useAppRoot();
  const styles = useStyles();
    const [showMenu, setShowMenu] = useState(false);
  
    const testRoute: RouteAssemblySection[] = [
      {
        name: "Plateau",
        route: [
          {
            text: {content: "SOR Clip", type: StringType.Normal}
          },
          {
            text: {content: "No need to get TOD", type: StringType.Normal},
            bannerType: BannerType.Notes,
            bannerTriangle: true
          },
          {
            text: {content: "Potlid", type: StringType.Item},
            icon: "equipment",
            comment: {content: "Best shield", type: StringType.Normal},
          }
        ]
      }
    ];
    const computedLines = engine.compute(testRoute);
   
  const testdoclines:DocLine[] = [
    {lineType: "DocLineSection", sectionName: "Plateau 1", sectionNumber: 1},
    {
      lineType: "DocLineText",
      lineNumber: "123",
      text: {content:"something", type: StringType.Normal},
      notes: {content:"test test", type: StringType.Normal}
    },
    {
      lineType: "DocLineText",
      lineNumber: "123",
      text: {content:"something", type: StringType.Normal},
      notes: {content:"test test", type: StringType.Normal}
    },
    {
      lineType: "DocLineText",
      lineNumber: "123",
      stepNumber: "1",
      text: {content:"something", type: StringType.Normal},
      notes: {content:"test test", type: StringType.Normal}
    },
    {
      lineType: "DocLineTextWithIcon",
      lineNumber: "123",
      stepNumber: "2",
      text:  {content:"something", type: StringType.Normal},
      coord: {x: 0 ,y: 0,z:0},
      comment: {content:"comment", type: StringType.Normal},
      counterValue: "0",
      splitType: SplitType.None,
      icon: TestImage
    },
    {
      lineType: "DocLineTextWithIcon",
      lineNumber: "123",
      stepNumber: "2",
      text:  {content:"something", type: StringType.Normal},
      coord: {x: 0 ,y: 0,z:0},
      comment: {content:"comment", type: StringType.Normal},
      counterValue: "0",
      splitType: SplitType.None,
      icon: TestImage
    },
    {
      lineType: "DocLineTextWithIcon",
      lineNumber: "123",
      stepNumber: "2",
      text:  {content:"something", type: StringType.Normal},
      coord: {x: 0 ,y: 0,z:0},
      comment: {content:"comment", type: StringType.Normal},
      counterValue: "0",
      splitType: SplitType.None,
      icon: TestImage
    },
    {lineType: "DocLineSection", sectionName: "Rupee Printing", sectionNumber: 2},
    {
      lineType: "DocLineTextWithIcon",
      lineNumber: "1234",
      stepNumber: "2",
      text:  {content:"something", type: StringType.Normal},
      coord: {x: 0 ,y: 0,z:0},
      notes:{content:"notes", type: StringType.Normal},
      comment: {content:"comment", type: StringType.Normal},
      counterValue: "0",
      splitType: SplitType.None,
      icon: TestImage
    },
    {
      lineType: "DocLineTextWithIcon",
      lineNumber: "1234",
      stepNumber: "2",
      text: {content:"something", type: StringType.Normal},
      coord: {x: 0 ,y: 0,z:0},
      notes:{content:"notes", type: StringType.Normal},
      comment: {content:"comment", type: StringType.Normal},
      counterValue: "0",
      splitType: SplitType.Shrine,
      icon: TestImage
    },
    {
      lineType: "DocLineTextWithIcon",
      lineNumber: "1234",
      stepNumber: "2",
      text:{content:"something", type: StringType.Normal},
      coord: {x: 0 ,y: 0,z:0},
      notes:{content:"notes", type: StringType.Normal},
      comment: {content:"comment", type: StringType.Normal},
      counterValue: "0",
      splitType: SplitType.Hinox,
      icon: TestImage
    },
    {
      lineType: "DocLineTextWithIcon",
      lineNumber: "1234",
      stepNumber: "2",
      text: {content:"something", type: StringType.Normal},
      coord: {x: 0 ,y: 0,z:0},
      notes:{content:"notes", type: StringType.Normal},
      comment: {content:"comment", type: StringType.Normal},
      counterValue: "0",
      splitType: SplitType.Korok,
      icon: TestImage
    },
    {
      lineType: "DocLineTextWithIcon",
      lineNumber: "1234",
      stepNumber: "2",
      text: {content:"something", type: StringType.Normal},
      coord: {x: 0 ,y: 0,z:0},
      notes:{content:"notes", type: StringType.Normal},
      comment: {content:"comment", type: StringType.Normal},
      counterValue: "XIII",
      splitType: SplitType.Memory,
      icon: TestImage
    },
    {
      lineType: "DocLineTextWithIcon",
      lineNumber: "1234",
      stepNumber: "2",
      text: {content:"something", type: StringType.Normal},
      coord: {x: 0 ,y: 0,z:0},
      notes:{content:"notes", type: StringType.Normal},
      comment: {content:"comment", type: StringType.Normal},
      counterValue: "XIII",
      splitType: SplitType.Memory,
      icon: TestImage
    },
     {lineType: "DocLineBanner",
    bannerType: BannerType.Error, 
    text: {content: "ERROR: Fury might not be back (Recharge time is 240 seconds, estimated time is 200 seconds) long long long long long long long", type: StringType.Normal},
     showTriangle: true},
    {lineType: "DocLineBanner",
    bannerType: BannerType.Warning, 
    text: {content: "ERROR: Fury might not be back (Recharge time is 240 seconds, estimated time is 200 seconds) long long long long long long long", type: StringType.Normal},

    showTriangle: true},

    {
      lineType: "DocLineTextWithIcon",
      lineNumber: "1234",
      stepNumber: "2",
      text: {content:"something", type: StringType.Normal},
      coord: {x: 0 ,y: 0,z:0},
      notes:{content:"notes", type: StringType.Normal},
      comment: {content:"comment", type: StringType.Normal},
      counterValue: "XIII",
      splitType: SplitType.Talus,
      icon: TestImage
    },
    {
      lineType: "DocLineTextWithIcon",
      lineNumber: "1234",
      stepNumber: "2",
      text: {content:"something", type: StringType.Normal},
      coord: {x: 0 ,y: 0,z:0},
      notes:{content:"notes", type: StringType.Normal},
      comment: {content:"comment", type: StringType.Normal},
      counterValue: "XIV",
      splitType: SplitType.Tower,
      icon: TestImage
    },
    {
      lineType: "DocLineTextWithIcon",
      lineNumber: "1234",
      stepNumber: "2",
      text: {content:"something", type: StringType.Normal},
      coord: {x: 0 ,y: 0,z:0},
      notes:{content:"notes", type: StringType.Normal},
      comment: {content:"comment", type: StringType.Normal},
      counterValue: "XIV",
      splitType: SplitType.Warp,
      icon: TestImage
    },
     {lineType: "DocLineBanner",
    bannerType: BannerType.Error, 
    text: {content: "ERROR: Fury might not be back (Recharge time is 240 seconds, estimated time is 200 seconds) long long long long long long long", type: StringType.Normal}
, 
    showTriangle: false},

 {
      lineType: "DocLineTextWithIcon",
      lineNumber: "1234",
      stepNumber: "2",
      text: {content:"something", type: StringType.Normal},
      coord: {x: 0 ,y: 0,z:0},
      notes:{content:"notes", type: StringType.Normal},
      comment: {content:"comment", type: StringType.Normal},
      counterValue: "",
      splitType: SplitType.UserDefined,
      icon: TestImage
    },
    {
      lineType: "DocLineTextWithIcon",
      lineNumber: "1234",
      stepNumber: "2",
      text: {content:"something", type: StringType.Normal},
      coord: {x: 0 ,y: 0,z:0},
      notes:{content:"notes", type: StringType.Normal},
      comment: {content:"comment", type: StringType.Normal},
      counterValue: "3",
      splitType: SplitType.Molduga,
      icon: TestImage
    },
  ]
  
  return (
    <div className={styles.appFrame}>
      
      <DocFrame docLines={computedLines}/>



      <div className={styles.statusBarFrame}
  style={{ zIndex:showMenu?99999:-1}}
  onClick={()=>setShowMenu(false)} >
    <div className={styles.menuOverlayFrame}style={showMenu?{ height: "auto" } : undefined}>
    {showMenu && <div className={styles.menu}>
        {/* <MenuItemWithValue value={"Compass"} setValueBasedOnCurrent={function (t: string): void {
                          throw new Error("Function not implemented.");
                      } } style={appStyle} text={"Direction Mode: "} />
                              <MenuItemWithValue value={"Important Only"} setValueBasedOnCurrent={function (t: string): void {
                          throw new Error("Function not implemented.");
                      } } style={appStyle} text={"Display Lines: "} />
                <MenuItemWithValue value={"Errors + Warnings"} setValueBasedOnCurrent={function (t: string): void {
                          throw new Error("Function not implemented.");
                      } } style={appStyle} text={"Display Error: "} />
                                      <MenuItemWithValue value={"Default"} setValueBasedOnCurrent={function (t: string): void {
                          throw new Error("Function not implemented.");
                      } } style={appStyle} text={"Theme: "} /> */}
                                                                                  <MenuItemWithValue value={theme.name} action={function (): void {
                          setTheme(theme.next());
                      } } text={"Theme: "} />
                                                            <MenuItemWithValue value={mapDisplayMode.name} action={function (): void {
                          setMapDisplayMode(mapDisplayMode.next());
                          if(map){
                            setTimeout(()=>map.invalidateSize(), 400);
                          }
                      } } text={"Map Size: "} />
    {/* <hr /> */}
    {/* <MenuItem style={appStyle} text="Split Settings..." action={function (): void {
                          console.log(1);
                      } }/>
                      <MenuItem style={appStyle} text="Download Livesplit Splits" action={function (): void {
                          console.log(1);
                      } }/>
    <hr />
    <MenuItem style={appStyle} text="Route Detail..." action={function (): void {
                          console.log(1);
                      } }/>
                                                            <MenuItemWithValue value={"Enabled"} setValueBasedOnCurrent={function (t: string): void {
                          throw new Error("Function not implemented.");
                      } } style={appStyle} text={"Route Custom Theme: "} /> */}

    <div className={styles.contribution}>&nbsp;<div className={styles.menuItemValue}>celer-engine v0.0.0</div></div>
    </div>}
    <div className={styles.statusBar}>
    <div className={styles.statusMessage}>
        Prototype
      </div>
      <div className={styles.statusErrorString}>
      
      <span>0 Error</span>

      </div>
      <div className={styles.menuAnchor} onClick={(e)=>{setShowMenu(true);e.stopPropagation()}}>
      
        <span >Options</span>
      </div>
    </div>
    </div>
  </div>

      <div className={styles.mapFrame}>
          {(()=>(
      <MapContainer style={{height: "100%", backgroundColor:"black"}}center={[0, 0]} zoom={4} crs={L.CRS.Simple} minZoom={3} 
      attributionControl={false}
      zoomControl={false}
  maxZoom={7} maxBounds={new LatLngBounds([-32,-39.0625], [32,39.0625])}
  whenCreated={(map)=>{
    setMap(map);
    setTimeout(()=>{map.invalidateSize()}, 1000);
    }}>
      
  <TileLayer
    noWrap
    tileSize={256}
    errorTileUrl="tiles/empty.png"
    url="tiles/{z}/{x}_{y}.png"
  />
  </MapContainer>))()
}
      </div>
      
      {/* <div style={{position: "fixed", backgroundColor: "rgba(0,0,0,0.5)", width: "100vw", height: "100vh", zIndex:99999}}>
      <div style={{margin: "calc( ( 100vw - 30em ) / 2 )", height: "100%"}}>
        <div style={{backgroundColor: "white", width: "30em", maxWidth: "100%",position: "absolute", top: "50%", transform: "translate(0,-50%)", padding:"10px"}}>
          <h3 style={{margin: 0, textAlign: "center"}}>About</h3>
          <hr></hr>
          <p>celer-engine v0.0.0 by iTNTPiston<br></br><a href="">Source on GitHub</a></p>
          
          <hr></hr>
          <div style={{textAlign: "right"}}><span style={{cursor: "pointer", marginLeft: "10px", marginRight: "10px", padding:"3px 10px", border: "1px solid black"}}>Close</span></div>
        </div>
      </div>
      </div> */}
  
  {/* <Marker position={[-32, -39.0625]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
  <Marker position={[32, -39.0625]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
  <Marker position={[-32, 39.0625]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
  <Marker position={[32, 39.0625]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker> */}


    </div>
  );
};

