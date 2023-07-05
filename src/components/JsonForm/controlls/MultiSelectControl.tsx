import React from 'react';
import {
  and,
  ControlProps,
  EnumCellProps,
  isBooleanControl, optionIs,
  RankedTester,
  rankWith,
  WithClassname
} from '@jsonforms/core';

import {TranslateProps, withJsonFormsControlProps, withTranslateProps} from '@jsonforms/react';
import {MaterialInputControl} from "@jsonforms/material-renderers";
import {MuiMultiSelect} from "../mui-controls/MuiMultiSelect";
import {JsonSchema7} from "@jsonforms/core/src/models/jsonSchema7";


export const MultiSelectControl = (props: ControlProps & EnumCellProps & WithClassname & TranslateProps) => {

  let props_new: ControlProps & EnumCellProps & TranslateProps = {
    options: (props.schema.items as JsonSchema7).anyOf.map(value => ({
      label: value.enum.at(0),
      value: value.enum.at(0)
    })),

    ...props
  }

  return <MaterialInputControl
    {...props_new}
    input={MuiMultiSelect}
  />
};

export const MultiSelectControlTester: RankedTester = rankWith(
  100,
  optionIs('multiSelect', true)
);

export default withJsonFormsControlProps(withTranslateProps(MultiSelectControl));
