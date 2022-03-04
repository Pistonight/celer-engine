import { MapCore } from "core/map";
import { MapDisplayMode, MapDisplayModes, MapDisplayModeStorage, Theme, Themes, ThemeStorage } from "data/settings";
import { Consumer, EmptyObject } from "data/util";
import React, { useContext } from "react";
import { AppColors, StyleProvider } from "ui/styles";
import { DefaultColors, ThemeColorMap } from "ui/styles/Colors";
import { EngineService } from "./EngineService";

/*
 * Root component for the app. Also acts as a provider for global states
 */

type AppRootContextState = {
    
    mapDisplayMode: MapDisplayMode,
    setMapDisplayMode: Consumer<MapDisplayMode>,
    
    theme: Theme,
    setTheme: Consumer<Theme>,

    mapCore: MapCore,
}

interface AppRootProps {}

interface AppRootState {
    mapDisplayMode: MapDisplayMode,
    theme: Theme,
    mapCore: MapCore,
}


const initialState: AppRootState ={
    mapDisplayMode: MapDisplayModeStorage.load(),
    theme: ThemeStorage.load(),
    mapCore: new MapCore()
};

const AppRootContext = React.createContext<AppRootContextState>(EmptyObject());

export class AppRoot extends React.Component<AppRootProps, AppRootState> {
    constructor(props: AppRootProps){
        super(props);
        this.state = initialState;
    }

    private setMapDisplayMode(mode: MapDisplayMode) {
        MapDisplayModeStorage.save(mode);
        this.setState({
            mapDisplayMode: mode
        });
    }

    private setTheme(theme: Theme) {
        ThemeStorage.save(theme);
        this.setState({
            theme
        });
    }

    public render(): JSX.Element {

        const appColors = ThemeColorMap[this.state.theme.name] ?? DefaultColors;

        return <AppRootContext.Provider value={{
            mapDisplayMode: this.state.mapDisplayMode,
            mapCore: this.state.mapCore,
            theme: this.state.theme,
            setMapDisplayMode: this.setMapDisplayMode.bind(this),
            setTheme: this.setTheme.bind(this),
        }}>
            <StyleProvider mapDisplayMode={this.state.mapDisplayMode} appColors={appColors}>
                <EngineService mapCore={this.state.mapCore}>
                    {this.props.children}
                </EngineService>
            </StyleProvider>
        </AppRootContext.Provider>
    }
}

export const useAppRoot = ()=>useContext(AppRootContext);