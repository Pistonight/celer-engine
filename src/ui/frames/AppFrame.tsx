import L, { LatLngBounds,  } from "leaflet";
import { useState } from "react";
import { MapContainer, TileLayer ,Marker, Popup} from "react-leaflet";
import TestImage from 'data/image/shrine.png';
import { MenuItem, MenuItemWithValue } from "../../components/MenuItem/MenuItem";
import { useAppRoot } from "ui/root";
import { useStyles } from "ui/styles";
import { MapDisplayMode } from "data/settings";
import "data/scripts";
import { DocLineComponent } from "ui/components/DocLineComponent";
import { StringType } from "data/assembly/text/type";
import { DocFrame } from "./DocFrame";
import { BannerType, RouteAssemblySection } from "data/assembly/types";
import { RouteEngine } from "core/engine";
import { Compiler } from "data/assembly/Compiler";
import { MapEngine } from "core/map";
import { MapComponent } from "ui/components/MapComponent/MapComponent";
import { useEngineService } from "ui/root/EngineService";


// const engine = new RouteEngine();
// const compiler = new Compiler();
// const mapengine = new MapEngine();

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

    
    // const computedRoute = compiler.compile(testScript as unknown as RouteScriptSection[]);
    // console.log(computedRoute);
    // const computedLines = engine.compute(computedRoute);
    // const [mapIcons, mapLines] = mapengine.compute(computedLines);
    // console.log(mapLines);
   
    const {metadata, docLines, mapIcons, mapLines} = useEngineService();
    let errorCount = 0;
    docLines.forEach(l=>{
      if(l.lineType === "DocLineBanner" && l.bannerType === BannerType.Error){
        errorCount++;
      }
    })
  
  return (
    <div className={styles.appFrame}>
      
      <DocFrame docLines={docLines} map={map}/>



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

    <div className={styles.contribution}>&nbsp;<div className={styles.menuItemValue}>celer-engine v1.0.0</div></div>
    </div>}
    <div className={styles.statusBar}>
    <div className={styles.statusMessage}>
        {metadata.Name}
      </div>
      <div className={styles.statusErrorString}>
      
      <span>{errorCount || "No"} Error{errorCount > 1 && "s"}</span>

      </div>
      <div className={styles.menuAnchor} onClick={(e)=>{setShowMenu(true);e.stopPropagation()}}>
      
        <span >Options</span>
      </div>
    </div>
    </div>
  </div>

      <div className={styles.mapFrame}>
      <MapContainer style={{height: "100%", backgroundColor:"black"}}center={[0, 0]} zoom={4} crs={L.CRS.Simple} minZoom={3} 
      attributionControl={false}
      zoomControl={false}
  maxZoom={7} maxBounds={new LatLngBounds([-32,-39.0625], [32,39.0625])}
  whenCreated={(map)=>{
    setMap(map);
    setTimeout(()=>{map.invalidateSize()}, 1000);
    // L.marker([0,0],{
    //   icon: L.icon({
    //     iconUrl: TestImage,
    //     iconSize: [32,32]
    //   })
    // } ).addTo(map);
    // L.marker([-10,10],{
    //   icon: L.icon({
    //     iconUrl: TestImage,
    //     iconSize: [32,32]
    //   })
    // } ).addTo(map);
    // L.polyline([[0,0], [10,10], [-10,10]], {
    //   color: "red"
    // }).arrowheads({
    //   fill: true,
    //   size: "16px",
      
    // }).addTo(map);
    // L.polyline([[-10,10], [20,-30], [0,10]]).arrowheads({
    //   fill: true,
    //   size: "16px"
    // }).addTo(map);
    
    }}>
      
  <TileLayer
    noWrap
    tileSize={256}
    errorTileUrl="celer/tiles/empty.png"
    url="celer/tiles/{z}/{x}_{y}.png"
  />
    {/* <Marker position={[0,0]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker> */}
  </MapContainer>
      </div>
      <MapComponent map={map} icons={mapIcons} lines={mapLines}></MapComponent>
      
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
  

  {/* <Marker position={[32, -39.0625]}>
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

