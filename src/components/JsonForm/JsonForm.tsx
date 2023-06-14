import React from "react";
import { JsonForms } from "@jsonforms/react";
import { createAjv } from '@jsonforms/core';
import { materialCells, materialRenderers } from "@jsonforms/material-renderers";
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';


import SelectS3FileControl, { SelectS3FileControlTester, } from './controlls/SelectS3FileControl';
// import DebugControl, { DebugControlTester } from "./DebugControl";
import TabsLayoutRenderer, { TabsLayoutTester } from "./layout/TabsLayoutRenderer";
import MaterialOneOfRenderer, { materialOneOfControlTester } from "./complex/MaterialOneOfRenderer";
//import SelectLinearIconsControl, { SelectLinearIconsControlTester } from "./controlls/SelectLinearIconsControl";

import MaterialArrayLayoutRenderer, { materialArrayLayoutTester } from "./layout/MaterialArrayLayoutRenderer";
import MaterializedGroupLayoutRenderer, { materialGroupTester } from "./layout/MaterialGroupLayout";
//import MaterialOneOfEnumControl, { materialOneOfEnumControlTester } from "./controlls/MaterialOneOfEnumControl";
import MaterialEnumControl, { materialEnumControlTester } from "./controlls/MaterialEnumControl";

const renderers = [
    ...materialRenderers,
    // register custom renderers
    {
        tester: SelectS3FileControlTester,
        renderer: SelectS3FileControl,
    },
    {
        tester: TabsLayoutTester,
        renderer: TabsLayoutRenderer,
    },
    // {
    //     tester: SelectLinearIconsControlTester,
    //     renderer: SelectLinearIconsControl,
    // },
    {
        tester: materialArrayLayoutTester,
        renderer: MaterialArrayLayoutRenderer,
    },
    {
        tester: materialGroupTester,
        renderer: MaterializedGroupLayoutRenderer,
    },
    {
        tester: materialOneOfControlTester,
        renderer: MaterialOneOfRenderer,
    },
    {
        tester: materialEnumControlTester,
        renderer: MaterialEnumControl,
    },
    // {
    //     tester: DebugControlTester,
    //     renderer: DebugControl,
    // },
];


const theme = createTheme({
    components: {
        MuiTab: {
            styleOverrides: {
                root: {
                    textTransform: 'initial',
                    flexShrink: 1,
                    // wordBreak: "break-word"
                }
            }
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    marginBottom: '0.8em'
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
        MuiCard: {
            styleOverrides: {
                root: {
                    margin: '1.8em 0',
                },
            }
        },
        MuiCardHeader: {
            styleOverrides: {
                root: {
                    // backgroundColor: '#283273'
                }
            }
        },

        MuiTableCell: {
            styleOverrides: {
                root: {
                    wordBreak: 'break-word',
                    minWidth: '65px'
                }
            }
        },
        MuiInput: {
            styleOverrides: {
                root: {
                    maxWidth: '400px',
                }
            }
        },
        MuiInputLabel: {
            defaultProps: {
                shrink: true,
                // variant: 'filled'
            }
        },
        MuiPaper: {
            defaultProps: {
                elevation: 2
            }
        },
        MuiAccordion: {
            defaultProps: {
                disableGutters: true
            },
        },
        MuiAccordionSummary: {
            defaultProps: {
                sx: {
                    backgroundColor: '#f5f5f5'
                }
            },
            // styleOverrides: {
            //     root: {
            //         "&.Mui-expanded": {
            //             backgroundColor: "#ddd"
            //         }
            //     }
            // }
        }
    },
});


const JsonForm = (props: any) => {

    const handleDefaultsAjv = createAjv({useDefaults: true, verbose: true,});

    return <ThemeProvider theme={theme}>
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
    </ThemeProvider>
}

export default JsonForm;
