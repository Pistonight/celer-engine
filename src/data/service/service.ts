import { RouteScript } from "data/compile";
import queryString from "query-string";
import axios from "axios";

export interface ServiceConfig {
    scriptUrl?: string,
    id: string,
    devConfig?: {
        devPort: number,
        refreshInterval: number,
    },
    error?: string,
}

const getStringConfig = (config: string | (string|null)[] | null): string | null => {
    if(Array.isArray(config)){
        return null;
    }
    return config;
}

export const getServiceConfig = ():ServiceConfig => {
    const parsedQueryString = queryString.parse(window.location.search);
    const id = parsedQueryString["Id"];

    // internal mode: engine will load internal example route
    if(parsedQueryString["Internal"]){

        return {
            id: getStringConfig(id) ?? "RouteScript"
        };
    }
    // dev mode: load from local
    if(parsedQueryString["DevPort"]){
        const refreshInterval = Number(parsedQueryString["RefreshInterval"]) || 5000;
        return {
            id: "",
            devConfig:{
                devPort: Number(parsedQueryString["DevPort"]),
                refreshInterval
            }
        };
    }
    if(parsedQueryString["Service"]){
        const service = getStringConfig(parsedQueryString["Service"]);
        if(service === "pastebin"){
            return {
                scriptUrl: `https://thingproxy.freeboard.io/fetch/https://pastebin.com/raw/${id}`,
                id: String(id)
            }
        }
    }

    // Error
    return {
        id: "",
        error: "Service Error: Cannot load route script. Please check if your URL is correct"
    };
}

export const getRouteScriptAsync = async (url: string): Promise<RouteScript> => {
    const response = await axios.get(url);
    //console.log(response);

    return response.data;
}