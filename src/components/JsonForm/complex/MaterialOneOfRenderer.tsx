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
import React, { useCallback, useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'

import {
  CombinatorRendererProps,
  createCombinatorRenderInfos,
  createDefaultValue,
  isOneOfControl,
  JsonSchema,
  OwnPropsOfControl,
  RankedTester,
  rankWith,
} from '@jsonforms/core'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Hidden,
  MenuItem,
  Select,
  Tab,
  Tabs,
} from '@mui/material'
import {
  JsonFormsDispatch,
  TranslateProps,
  withJsonFormsOneOfProps,
} from '@jsonforms/react'
// import CombinatorProperties from "@jsonforms/material-renderers";
import CombinatorProperties from './CombinatorProperties'

export interface OwnOneOfProps extends OwnPropsOfControl {
  indexOfFittingSchema?: number
}

export const MaterialOneOfRenderer = ({
  handleChange,
  schema,
  path,
  renderers,
  cells,
  rootSchema,
  id,
  visible,
  indexOfFittingSchema,
  uischema,
  uischemas,
  data,
  label,
  t,
}: CombinatorRendererProps & TranslateProps) => {
  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<boolean | number>(
    indexOfFittingSchema || false
  )

  useEffect(() => {
    if (indexOfFittingSchema === undefined) {
      return
    }
    setSelectedIndex(indexOfFittingSchema)
  })

  const [newSelectedIndex, setNewSelectedIndex] = useState(0)
  const handleClose = useCallback(() => setOpen(false), [setOpen])
  const cancel = useCallback(() => {
    setOpen(false)
  }, [setOpen])
  const oneOfRenderInfos = createCombinatorRenderInfos(
    (schema as JsonSchema).oneOf,
    rootSchema,
    'oneOf',
    uischema,
    path,
    uischemas
  )

  const openNewTab = (newIndex: number) => {
    let value = {}

    if (newIndex === -1) {
      value = undefined
      handleChange(path, value)
      setSelectedIndex(false)
      return
    }

    const localSchema = oneOfRenderInfos[newIndex].schema
    if (localSchema.type == 'object') {
      value = Object.fromEntries(
        Object.entries(localSchema.properties)
          .map(([key, property]) => [key, property.default])
          .filter((property) => property[1])
      )
    } else {
      value = createDefaultValue(localSchema)
    }

    handleChange(path, value)
    setSelectedIndex(newIndex)
  }

  const confirm = useCallback(() => {
    openNewTab(newSelectedIndex)
    setOpen(false)
  }, [handleChange, createDefaultValue, newSelectedIndex])

  const handleTabChange = useCallback(
    (_event: any, newOneOfIndex: number) => {
      // console.log('newOneOfIndex', newOneOfIndex)
      setNewSelectedIndex(newOneOfIndex)
      if (isEmpty(data)) {
        openNewTab(newOneOfIndex)
      } else {
        setOpen(true)
      }
    },
    [setOpen, setSelectedIndex, data]
  )

  const handleSelectChange = useCallback(
    (event) => {
      let index = event.target.value
      if (index) setNewSelectedIndex(index)
      if (isEmpty(data)) {
        openNewTab(index)
      } else {
        setOpen(true)
      }
    },
    [setOpen, setSelectedIndex, data]
  )

  // const noneOptionLabel = useMemo(
  //   () => t('enum.none', i18nDefaults['enum.none'], { schema, uischema, path }),
  //   [t, schema, uischema, path]
  // )
  const noneOptionLabel = 'Select Type'

  return (
    <Hidden xsUp={!visible}>
      <CombinatorProperties
        schema={schema}
        combinatorKeyword={'oneOf'}
        path={path}
      />

      {/*<Select*/}
      {/*  autoFocus={true}*/}
      {/*  value={selectedIndex === false ? '-1' : selectedIndex}*/}
      {/*  onChange={handleSelectChange}*/}
      {/*  fullWidth={true}*/}
      {/*  defaultValue={-1}*/}
      {/*  variant={'standard'}*/}
      {/*>*/}
      {/*  {[*/}
      {/*    <MenuItem value={-1} key="jsonforms.enum.none">*/}
      {/*      <em>{noneOptionLabel}</em>*/}
      {/*    </MenuItem>,*/}
      {/*  ].concat(*/}
      {/*    oneOfRenderInfos.map((optionValue, index) => (*/}
      {/*      <MenuItem value={index} key={optionValue.label}>*/}
      {/*        {optionValue.label}*/}
      {/*      </MenuItem>*/}
      {/*    ))*/}
      {/*  )}*/}
      {/*</Select>*/}

      <Tabs value={selectedIndex} onChange={handleTabChange}>
        {oneOfRenderInfos.map((oneOfRenderInfo) => (
          <Tab key={oneOfRenderInfo.label} label={oneOfRenderInfo.label} />
        ))}
      </Tabs>

      {oneOfRenderInfos.map((oneOfRenderInfo, oneOfIndex) => {
        return (
          selectedIndex === oneOfIndex && (
            <JsonFormsDispatch
              key={oneOfIndex}
              schema={oneOfRenderInfo.schema}
              uischema={oneOfRenderInfo.uischema}
              path={path}
              renderers={renderers}
              cells={cells}
            />
          )
        )
      })}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Clear form?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your data will be cleared if you navigate away from this tab. Do you
            want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancel} color="primary">
            No
          </Button>
          <Button
            onClick={confirm}
            color="primary"
            autoFocus
            id={`oneOf-${id}-confirm-yes`}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Hidden>
  )
}

export const materialOneOfControlTester: RankedTester = rankWith(
  30,
  isOneOfControl
)

export default withJsonFormsOneOfProps(MaterialOneOfRenderer)
