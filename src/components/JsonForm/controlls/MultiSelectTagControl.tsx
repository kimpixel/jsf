import React from "react";
import {
  ControlProps,
  EnumCellProps,
  optionIs,
  RankedTester,
  rankWith,
  WithClassname,
} from "@jsonforms/core";

import {
  TranslateProps,
  withJsonFormsControlProps,
  withTranslateProps,
} from "@jsonforms/react";
import {
  MuiAutocompleteTags,
  WithTagSpecific,
} from "../mui-controls/MuiAutocompleteTags";

export const MultiSelectTagControl = (
  props: ControlProps & EnumCellProps & WithClassname & TranslateProps,
) => {
  const { data, errors } = props;
  const isValid = errors.length === 0;

  let props_new: ControlProps &
    EnumCellProps &
    TranslateProps &
    WithTagSpecific = {
    ...props,
    options: data?.map((option) => ({ label: option, value: option })) ?? [],
    data: data,
    isValid,
    freeSolo: true,
  };

  return <MuiAutocompleteTags {...props_new} />;
};

export const MultiSelectTagControlTester: RankedTester = rankWith(
  100,
  optionIs("multiSelectTag", true),
);

export default withJsonFormsControlProps(
  withTranslateProps(MultiSelectTagControl),
);
