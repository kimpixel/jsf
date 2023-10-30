import React, { ReactNode } from "react";
import { ControlProps, EnumCellProps, EnumOption, WithClassname } from "@jsonforms/core";
import { AutocompleteRenderOptionState, FilterOptionsState } from "@mui/material";
export interface WithOptionLabel {
    getOptionLabel?(option: EnumOption): string;
    renderOption?(props: React.HTMLAttributes<HTMLLIElement>, option: EnumOption, state: AutocompleteRenderOptionState): ReactNode;
    filterOptions?(options: EnumOption[], state: FilterOptionsState<EnumOption>): EnumOption[];
}
export interface WithTagSpecific {
    freeSolo?: boolean;
    placeholder?: string;
}
export declare const MuiAutocompleteTags: (props: ControlProps & EnumCellProps & WithClassname & WithOptionLabel & WithTagSpecific) => JSX.Element;
