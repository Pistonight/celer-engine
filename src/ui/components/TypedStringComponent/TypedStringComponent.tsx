import { StringType, TypedString } from "data/assembly";
import { MapOf } from "data/util";

export interface TypedStringComponentProps {
    content: TypedString;
    variables: MapOf<number>;
}
export const TypedStringComponent: React.FC<TypedStringComponentProps> = ({content, variables})=>{
    let i = 0;
    //console.log(content);
    return <>
        {content.map(({content, type})=>(
            <TypeStringRender key={i++} content={content} type={type} variables={variables}/>
        ))}
    </>
};

interface TypedStringRenderProps {
    content: string,
    type: StringType,
    variables: MapOf<number>;
}

const TypeStringRender: React.FC<TypedStringRenderProps> = ({content, type, variables})=>{
    return <span>{content}</span>
}