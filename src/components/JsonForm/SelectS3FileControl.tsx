/*
  The MIT License

  Copyright (c) 2018-2019 EclipseSource Munich
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
import React from 'react';
import {
    ControlProps, EnumCellProps,
    OwnPropsOfEnum,
    RankedTester,
    rankWith,
    schemaMatches, WithClassname
} from '@jsonforms/core';

// import { MaterialInputControl } from './MaterialInputControl';
import { TranslateProps, withJsonFormsControlProps, withTranslateProps } from '@jsonforms/react';
import { MaterialInputControl, MuiSelect } from "@jsonforms/material-renderers";


export const SelectS3FileControl = (props: ControlProps & EnumCellProps & WithClassname & TranslateProps) => {

    // console.log('props', props);

    let props_new: ControlProps & EnumCellProps & TranslateProps = {
        options: props.config.s3Files.map(file => ({label: file, value: file})),
        ...props
    }
    // console.log('props_new', props_new);

    return <MaterialInputControl
                {...props_new}
                input={MuiSelect}
            />
};

export const SelectS3FileControlTester: RankedTester = rankWith(
    20,
    schemaMatches(schema => schema.title == "Additionallogourl")
);

export default withJsonFormsControlProps(withTranslateProps(SelectS3FileControl));
