import React from "react";
import {JsonForms} from "@jsonforms/react";
import {createAjv, JsonSchema4} from '@jsonforms/core';
import {
    materialRenderers,
    materialCells
} from "@jsonforms/material-renderers";
import CssBaseline from '@mui/material/CssBaseline';
// import { JsonFormsInitStateProps, JsonFormsReactProps } from "@jsonforms/react/src/JsonForms";


import MaterialNumberControl, {
    materialNumberControlTester,
} from './MaterialNumberControl';
//
const renderers = [
    ...materialRenderers,
    // register custom renderers
    // { tester: ratingControlTester, renderer: RatingControl },
    {
        tester: materialNumberControlTester,
        renderer: MaterialNumberControl,
    },
];


const JsonForm = (props: any) => {

    const handleDefaultsAjv = createAjv({useDefaults: true});


    return <React.Fragment>
        <CssBaseline/>
        <JsonForms
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
