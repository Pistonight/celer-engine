import { ReadonlyMapOf } from "data/util";
import { SettingItem, SettingStorage} from "./Setting";

export interface Theme extends SettingItem<Theme> {}

export const Themes = <ReadonlyMapOf<Theme>>{
    Default: {
        name: "Default",
        next: ()=>Themes.Granatus
    },
    Granatus: {
        name: "Granatus",
        next: ()=>Themes.Default
    },
};

export const ThemeStorage = new SettingStorage("Theme", Themes, Themes.Default);