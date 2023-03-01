import React, { useMemo } from 'react';
import { EnumCellProps, WithClassname } from '@jsonforms/core';

import { MenuItem, Select, Avatar, Box } from '@mui/material';
import merge from 'lodash/merge';
import { TranslateProps } from '@jsonforms/react';
import { i18nDefaults } from "@jsonforms/material-renderers";


export const MuiIconSelect = React.memo((props: EnumCellProps & WithClassname & TranslateProps) => {
  const {
    data,
    className,
    id,
    enabled,
    schema,
    uischema,
    path,
    handleChange,
    options,
    config,
    t
  } = props;
  const appliedUiSchemaOptions = merge({}, config, uischema.options);
  const noneOptionLabel = useMemo(() => t('enum.none', i18nDefaults['enum.none'], { schema, uischema, path}), [t, schema, uischema, path]);


  return (
    <Select
      className={className}
      id={id}
      disabled={!enabled}
      autoFocus={appliedUiSchemaOptions.focus}
      value={data !== undefined ? data : ''}
      onChange={ev =>handleChange(path, ev.target.value || undefined)}
      fullWidth={true}
      variant={'standard'}
      renderValue={(value) =>
          <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
            <img alt={value} height="32" width="32" src={`https://unpkg.com/@icon/linearicons/icons/${value}.svg`} />
            {value}
          </Box>}
    >
      {[<MenuItem value={''} key='jsonforms.enum.none'><em>{noneOptionLabel}</em></MenuItem>].concat(
        options.map(optionValue => (
            <MenuItem sx={{gap: '15px'}} value={optionValue.value} key={optionValue.value}>
              <img alt={optionValue.label} height="32" width="32" src={`https://unpkg.com/@icon/linearicons/icons/${optionValue.label}.svg`} /> {optionValue.label}
            </MenuItem>
        ))
      )}
    </Select>
  );
});
