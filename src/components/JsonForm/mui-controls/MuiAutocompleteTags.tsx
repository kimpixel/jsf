/*
  The MIT License

  Copyright (c) 2017-2020 EclipseSource Munich
  https://github.com/eclipsesource/jsonforms

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/
import React, { ReactNode } from "react";
import {
  ControlProps,
  EnumCellProps,
  EnumOption,
  isDescriptionHidden,
  WithClassname,
} from "@jsonforms/core";

import {
  Autocomplete,
  AutocompleteRenderOptionState,
  FilterOptionsState,
  FormHelperText,
  Hidden,
  TextField,
  Chip,
} from "@mui/material";
import merge from "lodash/merge";
import { useFocus } from "@jsonforms/material-renderers";

// import { useFocus } from '../util/focus';

export interface WithOptionLabel {
  getOptionLabel?(option: EnumOption): string;
  renderOption?(
    props: React.HTMLAttributes<HTMLLIElement>,
    option: EnumOption,
    state: AutocompleteRenderOptionState,
  ): ReactNode;
  filterOptions?(
    options: EnumOption[],
    state: FilterOptionsState<EnumOption>,
  ): EnumOption[];
}

export interface WithTagSpecific {
  freeSolo?: boolean;
  placeholder?: string;
}

export const MuiAutocompleteTags = (
  props: ControlProps &
    EnumCellProps &
    WithClassname &
    WithOptionLabel &
    WithTagSpecific,
) => {
  const {
    description,
    errors,
    visible,
    required,
    label,
    data,
    className,
    id,
    enabled,
    uischema,
    path,
    handleChange,
    options,
    config,
    getOptionLabel,
    renderOption,
    filterOptions,
    isValid,
    placeholder,
    freeSolo,
  } = props;
  const appliedUiSchemaOptions = merge({}, config, uischema.options);
  const [focused, onFocus, onBlur] = useFocus();

  const showDescription = !isDescriptionHidden(
    visible,
    description,
    focused,
    appliedUiSchemaOptions.showUnfocusedDescription,
  );

  const firstFormHelperText = showDescription
    ? description
    : !isValid
    ? errors
    : null;
  const secondFormHelperText = showDescription && !isValid ? errors : null;

  // todo: remove ts-ignore / resolve types
  return (
    <Hidden xsUp={!visible}>
      <Autocomplete
        multiple={true}
        freeSolo={freeSolo}
        className={className}
        id={id}
        disabled={!enabled}
        filterSelectedOptions
        value={data}
        // defaultValue={data}

        // @ts-ignore
        onChange={(_event: any, newValue: EnumOption[] | null) => {
          newValue = newValue.map((v) => (typeof v === "string" ? v : v.value));
          handleChange(path, newValue);
        }}
        isOptionEqualToValue={(option, value) => {
          return option.value === value;
        }}
        // options={options.map((option) => option.label)}
        options={options}
        getOptionLabel={(option) => {
          // console.log("option", option);
          return typeof option === "string" ? option : option?.label;
        }}
        autoComplete
        autoHighlight
        autoSelect
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip
              label={options.find((o) => o.value === option)?.label}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => {
          return (
            <TextField
              className={"tag-list"}
              label={label}
              variant={"standard"}
              type="text"
              inputProps={params.inputProps}
              inputRef={params.InputProps.ref}
              autoFocus={appliedUiSchemaOptions.focus}
              disabled={!enabled}
              {...params}
              id={id + "-input"}
              required={
                required && !appliedUiSchemaOptions.hideRequiredAsterisk
              }
              error={!isValid}
              fullWidth={true}
              InputLabelProps={data ? { shrink: true } : undefined}
              onFocus={onFocus}
              onBlur={onBlur}
              focused={focused}
              placeholder={placeholder}
            />
          );
        }}
        renderOption={renderOption}
        filterOptions={filterOptions}
      />
      <FormHelperText error={!isValid && !showDescription}>
        {firstFormHelperText}
      </FormHelperText>
      <FormHelperText error={!isValid}>{secondFormHelperText}</FormHelperText>
    </Hidden>
  );
};
