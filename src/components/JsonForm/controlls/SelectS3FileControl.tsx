import React from 'react'
import {
  ControlProps,
  EnumCellProps,
  EnumOption,
  optionIs,
  RankedTester,
  rankWith,
  WithClassname,
} from '@jsonforms/core'
import prettyBytes from 'pretty-bytes'

import {
  TranslateProps,
  withJsonFormsControlProps,
  withTranslateProps,
} from '@jsonforms/react'
import { MaterialInputControl } from '@jsonforms/material-renderers'
import { MuiS3FileSelect } from '../mui-controls/MuiS3FileSelect'
import { parentSchemaMatches } from '../testers/ParentSchemaMatches'
import * as path from 'path'

interface S3File {
  Key: string
  LastModified: string
  ETag: string
  Size: number
}
interface S3FileStorage {
  Contents: S3File[]
  Name: string
  KeyCount: number
}

export const SelectS3FileControl = (
  props: ControlProps & EnumCellProps & WithClassname & TranslateProps
) => {
  // console.log('props', props)

  const s3FileStorage: S3FileStorage = props.config.s3Files
  let options: EnumOption[] = s3FileStorage?.Contents.map((file) => ({
    label: `${path.basename(file.Key)} (${prettyBytes(file.Size)})`,
    value: {
      key: file.Key,
      file: `https://${s3FileStorage?.Name}.s3.eu-central-1.amazonaws.com/${file.Key}`,
    },
  }))

  if (props.uischema.options.keyFilter) {
    options = options.filter((file) =>
      file.value.key.match(`^${props.uischema.options.keyFilter}`)
    )
  }

  const props_new: ControlProps & EnumCellProps & TranslateProps = {
    ...props,
    options: options,
    description: props.uischema.options.keyFilter
      ? `File must be located under: "${props.uischema.options.keyFilter}"`
      : '',
  }
  return <MaterialInputControl {...props_new} input={MuiS3FileSelect} />
}

export const SelectS3FileControlTester: RankedTester = rankWith(
  100,
  optionIs('selectFile', true)
)

export default withJsonFormsControlProps(
  withTranslateProps(SelectS3FileControl)
)
