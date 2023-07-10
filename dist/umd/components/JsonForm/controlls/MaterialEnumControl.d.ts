import React from 'react';
import { ControlProps, OwnPropsOfEnum, RankedTester } from '@jsonforms/core';
import { TranslateProps } from '@jsonforms/react';
import { WithOptionLabel } from '../mui-controls/MuiAutocomplete';
export declare const MaterialEnumControl: (props: ControlProps & OwnPropsOfEnum & WithOptionLabel & TranslateProps) => JSX.Element;
export declare const materialEnumControlTester: RankedTester;
declare const _default: React.ComponentType<import("@jsonforms/core").OwnPropsOfControl & OwnPropsOfEnum>;
export default _default;