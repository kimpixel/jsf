import React from "react";
import { JsonForms } from "@jsonforms/react";
import { createAjv } from '@jsonforms/core';
import { materialCells, materialRenderers } from "@jsonforms/material-renderers";
import CssBaseline from '@mui/material/CssBaseline';

import SelectS3FileControl, { SelectS3FileControlTester, } from './SelectS3FileControl';
import DebugControl, { DebugControlTester } from "./DebugControl";

const renderers = [
    ...materialRenderers,
    // register custom renderers
    {
        tester: SelectS3FileControlTester,
        renderer: SelectS3FileControl,
    },
    {
        tester: DebugControlTester,
        renderer: DebugControl,
    },
];


const JsonForm = (props: any) => {

    const handleDefaultsAjv = createAjv({useDefaults: true, verbose: true, });

    return <React.Fragment>
        <CssBaseline/>
        <JsonForms
            config={props.config}
            schema={props.schema}
            uischema={props.uischema}
            data={props.data}
            renderers={renderers}
            cells={materialCells}
            onChange={props.onChange}
            ajv={handleDefaultsAjv}
        />
    </React.Fragment>;
}

export default JsonForm;
