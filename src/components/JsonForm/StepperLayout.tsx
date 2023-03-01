import React from 'react';
import { MaterialLayoutRenderer } from '@jsonforms/material-renderers';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { withJsonFormsControlProps, withJsonFormsLayoutProps } from '@jsonforms/react';
import {
    JsonSchema,
    rankWith,
    Resolve,
    uiTypeIs
} from '@jsonforms/core';


interface TabPanelProps
{
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps)
{
    const {children, value, index, ...other} = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && children}
        </div>
    );
}

function a11yProps(index: number)
{
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function splitPascalCase(word) {
    const wordRe = /($[a-z])|[A-Z][^A-Z]+/g;
    const m = word.match(wordRe);
    return m!=null?m.join(" "):word;
}

const createCombinatorRenderInfos = (
    combinatorSubSchemas: { 0: string, 1: JsonSchema }[],
    rootSchema: JsonSchema
 ): {
    schema: JsonSchema;
    propertyKey: string,
    label: string;
}[] =>
    combinatorSubSchemas.map((subSchema) => {
        const schema = subSchema[1].$ref ? Resolve.schema(rootSchema, subSchema[1].$ref, rootSchema) : subSchema[1];
        return {
            schema,
            label: schema.title,
            propertyKey: subSchema[0]
        }
    });

const StepperLayoutRenderer = (props) => {
    console.log('props', props);


    const {rootSchema, schema, path, visible} = props;
    const renderInfos = createCombinatorRenderInfos(
        Object.entries(schema.properties),
        rootSchema,
    );
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                {renderInfos.map((oneOfRenderInfo, index) =>
                    <Tab
                        key={oneOfRenderInfo.label}
                        label={oneOfRenderInfo.label} {...a11yProps(index)}
                    />
                )}
            </Tabs>
            {
                renderInfos.map((renderInfo, index) =>
                    <TabPanel key={index} index={index} value={value}>
                        <MaterialLayoutRenderer {...props} visible={visible} elements={[
                            {
                                "type": "Control",
                                "scope": "#/properties/" + renderInfo.propertyKey
                            }
                        ]}/>
                    </TabPanel>
                )
            }
        </>
    );
};

export const StepperLayoutTester = rankWith(1000, uiTypeIs('Stepper'));
export default withJsonFormsControlProps(withJsonFormsLayoutProps(StepperLayoutRenderer));
