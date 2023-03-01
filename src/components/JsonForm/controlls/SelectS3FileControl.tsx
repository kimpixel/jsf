import React from 'react';
import { ControlProps, EnumCellProps, RankedTester, rankWith, WithClassname } from '@jsonforms/core';
import prettyBytes from 'pretty-bytes';

import { TranslateProps, withJsonFormsControlProps, withTranslateProps } from '@jsonforms/react';
import { MaterialInputControl } from "@jsonforms/material-renderers";
import { MuiS3FileSelect } from "../mui-controls/MuiS3FileSelect";
import { parentSchemaMatches } from "../testers/ParentSchemaMatches";
import * as path from "path";


export const SelectS3FileControl = (props: ControlProps & EnumCellProps & WithClassname & TranslateProps) => {

    let props_new: ControlProps & EnumCellProps & TranslateProps = {
        options: props.config.s3Files?.Contents
            .map(file => ({
                    label: `${path.basename(file.Key)} (${prettyBytes(file.Size)})`,
                    value: {
                        key: file.Key,
                        file: `https://${props.config.s3Files.Name}.s3.eu-central-1.amazonaws.com/${file.Key}`
                    }
                })
            ),
        ...props
    }
    return <MaterialInputControl
                {...props_new}
                input={MuiS3FileSelect}
            />
};



export const SelectS3FileControlTester: RankedTester = rankWith(
    20,
    parentSchemaMatches((schema, currentDataSchema) => {
        return (schema.title == "CustomerSpecificIcon" && currentDataSchema.title == "Url")
            || (schema.title == "AceReportIntro" && currentDataSchema.title == "Additionallogourl");
    })
);

export default withJsonFormsControlProps(withTranslateProps(SelectS3FileControl));
