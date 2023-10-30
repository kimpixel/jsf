import React, { ComponentType } from "react";
interface MasterListItemProps {
    childData: {
        id: string;
        name: string;
        hidden: boolean;
    };
}
export declare const withContextToListDetailItem: (Component: ComponentType<MasterListItemProps>) => ComponentType<MasterListItemProps>;
declare const _default: React.ComponentType<any>;
export default _default;
