import { TypedString, TypedStringBlock } from "data/assembly/text/type";
import { MapOf } from "data/util";

export interface TypedStringComponentProps {
    content: TypedStringBlock;
    variables: MapOf<number>
}
export const TypedStringComponent: React.FC<TypedStringComponentProps> = ({content, variables})=>{
    if(!Array.isArray(content)){
        return <TypedStringRender content={content} variables={variables} />;
    }
    return <>{content.map((str, i)=><TypedStringRender content={str} variables={variables} key={i}/>)}</>;
};

interface TypedStringProps {
    content: TypedString;
    variables: MapOf<number>
}

const TypedStringRender: React.FC<TypedStringProps> =({content, variables})=>{
    return <span>{content.content}</span>
}