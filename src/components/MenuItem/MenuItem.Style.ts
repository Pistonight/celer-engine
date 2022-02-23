import { ComputeStyleInputs } from "ui/styles";

export const MenuItemStyle =({colors}: ComputeStyleInputs)=>( <const>{
        menuItem: {
            padding: "5px",
            cursor: "pointer",
            hover: {
                backgroundColor: colors.menuHover
            }
        },
        menuItemValue: {
            float: "right",
        },
});

