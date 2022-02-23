import { ReactNode } from "react";
import { useStyles } from "ui/styles";
import { Consumer } from "../../data/util/type";



export interface MenuItemProps {
    tooltip?: string;
    text: string;
    action: ()=>void;
}

export interface MenuItemWithValueProps extends MenuItemProps{
    value: string
}

export const MenuItem: React.FC<MenuItemProps> = ({tooltip, text, action})=>{
    const styles = useStyles();
    return <div title={tooltip} className={styles.menuItem} onClick={()=>{
        action()
    }}>{text}</div>;
};

export function MenuItemWithValue<V>({tooltip, text, value, action}: React.PropsWithChildren<MenuItemWithValueProps>): JSX.Element {
    const styles = useStyles();
    return <div title={tooltip} className={styles.menuItem} onClick={(e)=>{
        action();
        e.stopPropagation();
    }}>
        {text}
        <div className={styles.menuItemValue}>
            {value}
        </div>
    </div>;
}