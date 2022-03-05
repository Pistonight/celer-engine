import { MapOf } from "data/util";
import { LocalStorageWrapper } from "./LocalStorageWrapper";

export interface SettingItem<T> {
    // Name of the setting to be displayed
    name: string,
    // The next value to cycle to when user clicks it
    next: ()=>T
}

const withSettingPrefix = (key: string)=>"Setting."+key;

export class SettingStorage<T extends SettingItem<T>>{
    private key: string;
    private map: MapOf<T>;
    private defaultItem: T;

    constructor(key: string, map: MapOf<T>, defaultItem: T){
        this.key = key;
        this.map = map;
        this.defaultItem = defaultItem;
    }
    public save(item: T) {
        LocalStorageWrapper.store(withSettingPrefix(this.key), item.name);
    }
    public load(): T {
        return LocalStorageWrapper.load(withSettingPrefix(this.key), this.defaultItem, (name)=>{
            const values = Object.values(this.map) as T[];
            for(let i =0;i<values.length;i++){
                if (values[i].name === name){
                    return values[i];
                }
            }
            return this.defaultItem;
        });
    }
}