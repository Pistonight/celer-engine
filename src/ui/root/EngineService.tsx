// The EngineService component retrieves route data and send it to the children via context

import { RouteEngine } from "core/engine";
import { exampleRouteScript } from "core/example/routescript";
import { MapEngine, MapIcon, MapLine } from "core/map";
import { DocLine, DocLineBanner } from "core/route";
import { BannerType } from "data/assembly";
import { Compiler } from "data/assembly/Compiler";
import { StringType } from "data/assembly/text/type";
import { RouteScript, TARGET_VERSION } from "data/compile";
import { getRouteScriptAsync, getServiceConfig } from "data/service";
import { EmptyObject } from "data/util";
import React, { useContext } from "react";

interface EngineContextState {
    metadata: RouteScript["Project"];
    docLines: DocLine[];
    mapIcons: MapIcon[];
    mapLines: MapLine[];
}

const EngineContext = React.createContext<EngineContextState>(EmptyObject());

interface EngineServiceProps {

}

interface EngineServiceState extends EngineContextState{
    isReady: boolean,
    reloadHandle?: NodeJS.Timer,
}

const compiler = new Compiler();
const routeEngine = new RouteEngine();
const mapEngine = new MapEngine();
const placeholderLines = routeEngine.compute(compiler.compile(TARGET_VERSION, ["(==) Loading Route..."]));
const placeholderMetadata = {
    Name: "",
    Authors: [],
    Url: "",
    Version: "Unknown",
    Description: ""
};

export class EngineService extends React.Component<EngineServiceProps, EngineServiceState> {
    constructor(props: EngineServiceProps){
        super(props);
        this.state = {
            metadata: placeholderMetadata,
            isReady: false,
            docLines: [],
            mapIcons: [],
            mapLines: []
        }
    }

    public componentDidMount(): void {
        this.loadRoute();
    }

    private loadRoute(): void {
        if(this.state.reloadHandle){
            clearInterval(this.state.reloadHandle);
        }
        const config = getServiceConfig();
       // console.log(config);
        if(config.error){
            const errorLines: DocLine[] = [{
                lineType: "DocLineBanner",
                bannerType: BannerType.Error,
                text: {
                    content: config.error,
                    type: StringType.Normal
                },
                showTriangle: false
            }];
            this.setState({
                isReady: true,
                docLines: errorLines
            });
            return;
        }
        if(config.scriptUrl){
            this.loadRouteScriptAsync(config.scriptUrl);
            return;
        }
        if(config.devConfig){
            // load from local dev server
            const url = "http://localhost:"+config.devConfig.devPort;
            this.loadRouteScriptAsync(url);
            const handle = setInterval(()=>{
                this.loadRouteScriptAsync(url)
            }, config.devConfig.refreshInterval);
            this.setState({
                reloadHandle: handle
            });
            return;
        }

        // Internal
        switch(config.id){
            case "RouteScript":
                const routeScript = exampleRouteScript as unknown as RouteScript;
                this.setRouteScript(routeScript);
                return;
        }
    }

    private async loadRouteScriptAsync(url: string): Promise<void> {
        const routeScript = await getRouteScriptAsync(url);
        this.setRouteScript(routeScript);
    }


    private setRouteScript(routeScript: RouteScript) {
        const metadata = routeScript.Project;
        this.setDocLines(routeEngine.compute(compiler.compile(routeScript.compilerVersion, routeScript.Route)), metadata);
    }

    private setDocLines(docLines: DocLine[], metadata: EngineContextState["metadata"]): void {
        const [mapIcons, mapLines] = mapEngine.compute(docLines);
        this.setState({
            isReady: true,
            metadata,
            docLines,
            mapIcons,
            mapLines
        });
        if(metadata.Name){
            document.title = `${metadata.Name} - Celer`;
        }
    }

    public render(): JSX.Element {

        const ready = this.state.isReady;
        return <EngineContext.Provider value={{
            metadata: ready ? this.state.metadata : placeholderMetadata,
            docLines: ready ? this.state.docLines : placeholderLines,
            mapIcons: ready ? this.state.mapIcons : [],
            mapLines: ready ? this.state.mapLines : []
        }}>
            
                {this.props.children}

        </EngineContext.Provider>
    }
}

export const useEngineService = ()=>useContext(EngineContext);