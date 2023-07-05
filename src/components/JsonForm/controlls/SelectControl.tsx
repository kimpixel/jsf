import React from 'react';
import {
  ControlProps,
  EnumCellProps,
  optionIs,
  RankedTester,
  rankWith,
  WithClassname
} from '@jsonforms/core';

import {TranslateProps, withJsonFormsControlProps, withTranslateProps} from '@jsonforms/react';
import {MaterialInputControl, MuiSelect} from "@jsonforms/material-renderers";
import {JsonSchema7} from "@jsonforms/core/src/models/jsonSchema7";


export const SelectControl = (props: ControlProps & EnumCellProps & WithClassname & TranslateProps) => {

  console.log('propsxx', props);

  let props_new: ControlProps & EnumCellProps & TranslateProps = {
    options: props.schema.anyOf.map(value => ({
      label: value.enum.at(0),
      value: value.enum.at(0)
    })),

    ...props
  }

  return <MaterialInputControl
    {...props_new}
    input={MuiSelect}
  />
};

export const SelectControlTester: RankedTester = rankWith(
  100,
  optionIs('select', true)
);

export default withJsonFormsControlProps(withTranslateProps(SelectControl));
