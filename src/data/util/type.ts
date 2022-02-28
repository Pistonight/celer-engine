export type Consumer<T> = (t:T)=>void;
export type Supplier<T> = ()=>T;
export type MapOf<T> = {[key: string]: T};
export type ReadonlyMapOf<T> = {readonly [key: string]: T};