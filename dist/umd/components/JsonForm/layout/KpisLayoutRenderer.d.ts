import React, { ComponentType } from 'react';
import { ArrayLayoutProps, RankedTester } from '@jsonforms/core';
interface KpiConfig {
    id: string;
    name: string;
    hidden: boolean;
    configurations: [];
}
export declare const KpisLayoutRenderer: ({ ...props }: MasterListItemProps) => JSX.Element;
export declare const kpisLayoutTester: RankedTester;
interface MasterListItemProps extends ArrayLayoutProps {
    childData: KpiConfig[];
}
export declare const withContextToListDetailItem: (Component: ComponentType<MasterListItemProps>) => ComponentType<MasterListItemProps>;
declare const _default: React.ComponentType<import("@jsonforms/core").OwnPropsOfControl>;
export default _default;
