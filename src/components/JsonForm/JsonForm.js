import React from "react";


import {JsonForms} from "@jsonforms/react";
import {
  materialRenderers,
  materialCells
} from "@jsonforms/material-renderers";



const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 1
    },
    done: {
      type: 'boolean'
    },
    due_date: {
      type: 'string',
      format: 'date'
    },
    recurrence: {
      type: 'string',
      enum: ['Never', 'Daily', 'Weekly', 'Monthly']
    }
  },
  required: ['name', 'due_date']
};
const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      label: false,
      scope: '#/properties/done'
    },
    {
      type: 'Control',
      scope: '#/properties/name'
    },
    {
      type: 'HorizontalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/due_date'
        },
        {
          type: 'Control',
          scope: '#/properties/recurrence'
        }
      ]
    }
  ]
};
const initialData = {};

const JsonForm = (props) => {
  return <JsonForms
    schema={schema}
    uischema={uischema}
    data={initialData}
    renderers={materialRenderers}
    cells={materialCells}
    onChange={(data) => console.log(data)}
  />;
}

export default JsonForm;
