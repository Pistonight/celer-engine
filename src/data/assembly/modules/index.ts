import KorokModule from "./Korok";
import ShrineModule from "./Shrine";
import TowerModule from "./Tower";
import WarpModule from "./Warp";
import { getSimpleModules } from "./Simple";
import CustomModule from "./Custom";

export const getModules = ()=>([
    KorokModule,
    ShrineModule,
    TowerModule,
    WarpModule,
    ...getSimpleModules(),
    CustomModule
]);

export * from "./Module";