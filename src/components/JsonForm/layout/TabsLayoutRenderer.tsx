import React from 'react';
import {MaterialLayoutRenderer} from '@jsonforms/material-renderers';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {withJsonFormsControlProps, withJsonFormsLayoutProps} from '@jsonforms/react';
import {
  JsonSchema,
  rankWith,
  Resolve, UISchemaElement,
  uiTypeIs
} from '@jsonforms/core';

// import * as Muicon from "@mui/icons-material";
import DynamicFormIcon from '@mui/icons-material/DynamicForm';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CategoryIcon from '@mui/icons-material/Category';
import ScoreIcon from '@mui/icons-material/Score';
import InsightsIcon from '@mui/icons-material/Insights';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import SettingsIcon from '@mui/icons-material/Settings';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}


/*
 this is needed to avoid bix bundle size and slow startup with
 'import * as Muicon from "@mui/icons-material"'
 */
function getIcon(name) {
  switch (name) {
    case 'DynamicForm':
      return <DynamicFormIcon/>
    case 'Assessment':
      return <AssessmentIcon/>
    case 'Category':
      return <CategoryIcon/>
    case 'ScoreForm':
      return <ScoreIcon/>
    case 'Insights':
      return <InsightsIcon/>
    case 'ViewCarousel':
      return <ViewCarouselIcon/>
    case 'AspectRatio':
      return <AspectRatioIcon/>
    default:
      return <SettingsIcon/>
  }
}


function TabPanel(props: TabPanelProps) {
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

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function splitPascalCase(word) {
  const wordRe = /($[a-z])|[A-Z][^A-Z]+/g;
  const m = word.match(wordRe);
  return m != null ? m.join(" ") : word;
}

const createCombinatorRenderInfos = (
  combinatorSubSchemas: { 0: string, 1: JsonSchema }[],
  rootSchema: JsonSchema,
  uiSchema: any
): {
  schema: JsonSchema;
  propertyKey: string;
  label: string;
  uiSchema: any;
}[] =>
  combinatorSubSchemas.map((subSchema) => {
    const schema = subSchema[1].$ref ? Resolve.schema(rootSchema, subSchema[1].$ref, rootSchema) : subSchema[1];
    return {
      schema,
      label: schema.title,
      propertyKey: subSchema[0],
      uiSchema: uiSchema.elements.find((element) => element.scope == "#/properties/" + subSchema[0])
    }
  });

const TabsLayoutRenderer = (props) => {

  const {rootSchema, schema, path, visible, uischema} = props;
  const renderInfos = createCombinatorRenderInfos(
    Object.entries(schema.properties),
    rootSchema,
    uischema
  );
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs value={value} onChange={handleChange} aria-label="Root configuration" variant="scrollable" scrollButtons="auto">
        {renderInfos.map((oneOfRenderInfo, index) =>
          <Tab
            key={oneOfRenderInfo.label}
            label={oneOfRenderInfo.label} {...a11yProps(index)}
            icon={getIcon(oneOfRenderInfo.uiSchema?.icon)}
            iconPosition={"start"}
            title={oneOfRenderInfo.schema.description}
          />
        )}
      </Tabs>
      {
        renderInfos.map((renderInfo, index) =>
          <TabPanel key={index} index={index} value={value}>
            <h1>{renderInfo.label}</h1>
            <p>{renderInfo.schema.description}</p>
            <MaterialLayoutRenderer {...props} visible={visible} elements={[
              {
                ...renderInfo.uiSchema ?? {},
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

export const TabsLayoutTester = rankWith(1000, uiTypeIs('TabsLayout'));
export default withJsonFormsControlProps(withJsonFormsLayoutProps(TabsLayoutRenderer));
