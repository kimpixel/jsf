import React, { ReactNode } from 'react';
import { ControlProps, EnumOption, OwnPropsOfEnum, RankedTester } from '@jsonforms/core';
import { TranslateProps } from '@jsonforms/react';
import { AutocompleteRenderOptionState, FilterOptionsState } from "@mui/material";
export interface WithOptionLabel {
    getOptionLabel?(option: EnumOption): string;
    renderOption?(props: React.HTMLAttributes<HTMLLIElement>, option: EnumOption, state: AutocompleteRenderOptionState): ReactNode;
    filterOptions?(options: EnumOption[], state: FilterOptionsState<EnumOption>): EnumOption[];
}
export declare const MaterialOneOfEnumControl: (props: ControlProps & OwnPropsOfEnum & WithOptionLabel & TranslateProps) => JSX.Element;
export declare const materialOneOfEnumControlTester: RankedTester;
declare const _default: React.ComponentType<import("@jsonforms/core").OwnPropsOfControl & OwnPropsOfEnum>;
export default _default;
