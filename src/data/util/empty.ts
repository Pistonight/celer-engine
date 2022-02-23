// Empty implementations
export const EmptyConsumer= ()=>(<T>(t:T):void => {
    console.error(t);
    throw new Error("Empty Impl called");
});

export const EmptyObject = <T>()=>({} as unknown as T);