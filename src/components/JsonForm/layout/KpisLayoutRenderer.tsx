/*
  The MIT License

  Copyright (c) 2017-2019 EclipseSource Munich
  https://github.com/eclipsesource/jsonforms

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/
import React, { ComponentType, useCallback, useMemo, useState } from 'react'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'
import {
    Autocomplete,
    Badge,
    Box,
    Card,
    CardContent,
    CardHeader,
    Hidden,
    IconButton,
    TextField,
} from '@mui/material'
import {
    ArrayLayoutProps,
    composePaths,
    computeLabel,
    createDefaultValue,
    findUISchema,
    optionIs,
    RankedTester,
    rankWith,
    Resolve,
} from '@jsonforms/core'
import {
    JsonFormsDispatch,
    JsonFormsStateContext,
    withJsonFormsArrayLayoutProps,
    withJsonFormsContext,
} from '@jsonforms/react'
import { ArrayLayoutToolbar } from './ArrayToolbar'
import merge from 'lodash/merge'
import Typography from '@mui/material/Typography'
import { EnumOption } from '@jsonforms/core/src/util/renderer'

import Stack from '@mui/material/Stack'
import DeleteIcon from '@mui/icons-material/Delete'
import SettingsIcon from '@mui/icons-material/Settings'

interface KpiConfig {
    id: string
    name: string
    hidden: boolean
    configurations: []
}

export const KpisLayoutRenderer = ({ ...props }: MasterListItemProps) => {
    // console.log("props", props);

    const {
        uischemas,
        schema,
        uischema,
        path,
        errors,
        visible,
        label,
        required,
        removeItems,
        addItem,
        data,
        childData,
        renderers,
        cells,
        config,
        rootSchema,
    } = props

    const [selectedIndex, setSelectedIndex] = useState(undefined)
    const handleRemoveItem = useCallback(
        (p: string, value: any) => () => {
            removeItems(p, [value])()
            if (selectedIndex === value) {
                setSelectedIndex(undefined)
            } else if (selectedIndex > value) {
                setSelectedIndex(selectedIndex - 1)
            }
        },
        [removeItems, setSelectedIndex]
    )
    const handleCreateDefaultValue = useCallback(
        () => createDefaultValue(schema),
        [createDefaultValue]
    )
    const foundUISchema = useMemo(
        () =>
            findUISchema(
                uischemas,
                schema,
                uischema.scope,
                path,
                undefined,
                uischema,
                rootSchema
            ),
        [uischemas, schema, uischema.scope, path, uischema, rootSchema]
    )
    const appliedUiSchemaOptions = merge({}, config, uischema.options)
    const [selectedOption, setSelectedOption] =
        React.useState<EnumOption | null>(null)
    React.useEffect(() => {
        setSelectedOption(options[selectedIndex] ?? null)
    }, [selectedIndex, childData])

    const options: EnumOption[] = childData.map((d) => ({
        label: `${d.name}`,
        value: d.id,
    }))

    // console.log('selectedIndex', selectedIndex)

    return (
        <Hidden xsUp={!visible}>
            <ArrayLayoutToolbar
                label={computeLabel(
                    label,
                    required,
                    appliedUiSchemaOptions.hideRequiredAsterisk
                )}
                errors={errors}
                path={path}
                addItem={(path1, data1) => {
                    return () => {
                        console.log('data', data)
                        addItem(path, data1)
                        setSelectedIndex(data)
                    }
                }}
                createDefault={handleCreateDefaultValue}
            />
            <Stack spacing={4}>
                <Autocomplete
                    value={
                        options[selectedIndex] ? options[selectedIndex] : null
                    }
                    id="kpi-select"
                    multiple={false}
                    options={options}
                    // autoHighlight
                    // autoSelect
                    getOptionLabel={(option: EnumOption) => option.label}
                    onChange={(ev, newValue: EnumOption) => {
                        setSelectedIndex(
                            newValue !== null
                                ? childData.findIndex(
                                      (option) => option.id == newValue.value
                                  )
                                : undefined
                        )
                    }}
                    isOptionEqualToValue={(option, value) =>
                        option.value === value.value
                    }
                    renderOption={(props, option: EnumOption) => {
                        const kpiConf = childData.find(
                            (data) => data.id == option.value
                        )

                        let visibilityIcon = <VisibilityIcon />
                        if (kpiConf?.hidden)
                            visibilityIcon = <VisibilityOffIcon />

                        return (
                            <li {...props}>
                                <Box
                                    sx={{
                                        width: 30,
                                        height: 30,
                                        mr: '5px',
                                        ml: '-2px',
                                    }}
                                >
                                    {visibilityIcon}
                                </Box>
                                <Box
                                    sx={{
                                        width: 30,
                                        height: 30,
                                        mr: '15px',
                                        ml: '-2px',
                                    }}
                                >
                                    <Badge
                                        badgeContent={
                                            kpiConf?.configurations?.length ?? 0
                                        }
                                        showZero={true}
                                        color={
                                            kpiConf?.configurations?.length == 0
                                                ? 'default'
                                                : 'info'
                                        }
                                    >
                                        <SettingsIcon fontSize={'medium'} />
                                    </Badge>
                                </Box>

                                <div>
                                    <strong>
                                        {option.label ?? 'no title'}
                                    </strong>
                                    <br />
                                    {option.value ?? 'no id'}
                                </div>
                            </li>
                        )
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            sx={{
                                '.MuiInput-root': {
                                    maxWidth: '600px',
                                },
                            }}
                            variant={'standard'}
                            required={true}
                            // helperText={"sdsdsd"}
                            placeholder={'please chose a KPI Config first'}
                            label="KPI configs"
                            inputProps={{
                                ...params.inputProps,
                            }}
                        />
                    )}
                />
                <div>
                    {selectedIndex !== undefined ? (
                        <Card>
                            <CardHeader
                                title={
                                    selectedOption?.label ?? 'New Configuration'
                                }
                                subheader={selectedOption?.value ?? ''}
                                action={
                                    <IconButton
                                        onClick={(ev) => {
                                            handleRemoveItem(
                                                path,
                                                selectedIndex
                                            )()
                                        }}
                                        aria-label="settings"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            />
                            <CardContent>
                                <JsonFormsDispatch
                                    renderers={renderers}
                                    cells={cells}
                                    visible={visible}
                                    schema={schema}
                                    uischema={foundUISchema}
                                    path={composePaths(
                                        path,
                                        `${selectedIndex}`
                                    )}
                                />
                            </CardContent>
                        </Card>
                    ) : (
                        <Typography variant="h6">No Selection</Typography>
                    )}
                </div>
            </Stack>
        </Hidden>
    )
}

export const kpisLayoutTester: RankedTester = rankWith(
    140,
    optionIs('kpisLayout', true)
)

// export default withJsonFormsArrayLayoutProps(KpisLayoutRenderer);
// const KpisLayout = React.memo(KpisLayoutRenderer);

// ##############################################################################################################
// ##############################################################################################################

interface MasterListItemProps extends ArrayLayoutProps {
    childData: KpiConfig[]
}

export const withContextToListDetailItem =
    (
        Component: ComponentType<MasterListItemProps>
    ): ComponentType<MasterListItemProps> =>
    ({ ctx, props }: JsonFormsStateContext & MasterListItemProps) => {
        const childData = Resolve.data(ctx.core.data, props.path)
        return <Component {...props} childData={childData} />
    }

export default withJsonFormsArrayLayoutProps(
    withJsonFormsContext(withContextToListDetailItem(KpisLayoutRenderer))
)
