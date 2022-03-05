import KorokModule from "./Korok";
import ShrineModule from "./Shrine";
import TowerModule from "./Tower";
import WarpModule from "./Warp";
import { getSimpleModules } from "./Simple";
import CustomModule from "./Custom";
import MemoryModule from "./Memory";
import BossModule from "./Boss";

export const getModules = ()=>([
    KorokModule,
    ShrineModule,
    TowerModule,
    WarpModule,
    MemoryModule,
    BossModule,
    ...getSimpleModules(),
    CustomModule
]);

export * from "./Module";