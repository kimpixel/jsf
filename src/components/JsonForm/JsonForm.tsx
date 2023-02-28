import React from "react";
import { JsonForms } from "@jsonforms/react";
import { createAjv } from '@jsonforms/core';
import { materialCells, materialRenderers } from "@jsonforms/material-renderers";
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';


import SelectS3FileControl, { SelectS3FileControlTester, } from './SelectS3FileControl';
// import DebugControl, { DebugControlTester } from "./DebugControl";
import StepperLayoutRenderer, { StepperLayoutTester } from "./StepperLayout";

const renderers = [
    ...materialRenderers,
    // register custom renderers
    {
        tester: SelectS3FileControlTester,
        renderer: SelectS3FileControl,
    },
    {
        tester: StepperLayoutTester,
        renderer: StepperLayoutRenderer,
    },
    // {
    //     tester: DebugControlTester,
    //     renderer: DebugControl,
    // },
];


/**
 * Customize form so each control has more space
 */
const theme = createTheme({
    components: {
        MuiTab: {
            styleOverrides: {
                root: {
                    textTransform: 'initial',
                    flexShrink: 1,
                    wordBreak: "break-all"
                }
            }
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    margin: '0.8em 0',
                },
            }
        },
    },
});


const JsonForm = (props: any) => {

    const handleDefaultsAjv = createAjv({useDefaults: true, verbose: true, });

    return <ThemeProvider theme={theme}>
        <CssBaseline />
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
    </ThemeProvider>
}

export default JsonForm;
