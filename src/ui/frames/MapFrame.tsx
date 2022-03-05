import L, { LatLngBounds } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import { useAppRoot } from "ui/root";
import { useStyles } from "ui/styles";

type MapFrameProps = {

}

export const MapFrame: React.FC<MapFrameProps> = ()=>{
    const { mapCore } = useAppRoot();
    const styles = useStyles();
    return (
        <div className={styles.mapFrame}>
            <MapContainer 
                style={{height: "100%", backgroundColor:"black"}}
                center={[0, 0]} 
                zoom={4} 
                crs={L.CRS.Simple} 
                minZoom={3} 
                attributionControl={false}
                zoomControl={false}
                maxZoom={7} maxBounds={new LatLngBounds([-32,-39.0625], [32,39.0625])}
                whenCreated={(map)=>{   
                mapCore.setMap(map);
            }}>
        
                <TileLayer
                    noWrap
                    tileSize={256}
                    errorTileUrl="celer/tiles/empty.png"
                    url="celer/tiles/{z}/{x}_{y}.png"
                />
            </MapContainer>
        </div>
    )
}