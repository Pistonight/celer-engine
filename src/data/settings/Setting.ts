import { MapOf } from "data/util";

export interface SettingItem<T> {
    // Name of the setting to be displayed
    name: string,
    // The next value to cycle to when user clicks it
    next: ()=>T
}



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
        localStorage.setItem(this.key, item.name);
    }
    public load(): T {
        const name = localStorage.getItem(this.key);
        if(!name){
            return this.defaultItem;
        }
        const values = Object.values(this.map) as T[];
            for(let i =0;i<values.length;i++){
            if (values[i].name == name){
                return values[i];
            }
        }
        return this.defaultItem;
    }
}