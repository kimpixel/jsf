import { hasType, isControl, JsonSchema, resolveSchema, Tester, TesterContext, UISchemaElement } from "@jsonforms/core";
import isEmpty from "lodash/isEmpty";

export const parentSchemaMatches = (
    predicate: (schema: JsonSchema, rootSchema: JsonSchema) => boolean
): Tester => (uischema: UISchemaElement, schema: JsonSchema, context: TesterContext): boolean => {

    if (isEmpty(uischema) || !isControl(uischema)) {
        return false;
    }
    if (isEmpty(schema)) {
        return false;
    }
    const schemaPath = uischema.scope;
    if (isEmpty(schemaPath)) {
        return false;
    }
    let currentDataSchema = schema;
    if (hasType(schema, 'object')) {
        currentDataSchema = resolveSchema(schema, schemaPath, context?.rootSchema);
    }
    if (currentDataSchema === undefined) {
        return false;
    }

    return predicate(schema, currentDataSchema);
};
