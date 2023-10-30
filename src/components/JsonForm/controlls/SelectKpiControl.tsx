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

export const SelectKpiControl = (
  props: ControlProps & EnumCellProps & WithClassname & TranslateProps,
) => {
  const { config, data, errors } = props;
  const isValid = errors.length === 0;

  let props_new: ControlProps &
    EnumCellProps &
    TranslateProps &
    WithTagSpecific = {
    ...props,
    options: config.kpis.map((kpi) => ({ label: kpi.name, value: kpi.id })),
    data: data,
  };

  return <MuiAutocompleteTags {...props_new} isValid={isValid} />;
};

export const SelectKpiControlTester: RankedTester = rankWith(
  100,
  optionIs("selectKpi", true),
);

export default withJsonFormsControlProps(withTranslateProps(SelectKpiControl));
