import React from 'react'
import {
  computeLabel,
  ControlProps,
  EnumCellProps,
  optionIs,
  RankedTester,
  rankWith,
  WithClassname,
} from '@jsonforms/core'

import {
  TranslateProps,
  withJsonFormsControlProps,
  withTranslateProps,
} from '@jsonforms/react'

import { FormControl, Hidden, InputLabel } from '@mui/material'

import {
  diffSourcePluginHooks,
  MDXEditor,
  SingleChoiceToggleGroup,
  BlockTypeSelect,
  CreateLink,
  MdastImportVisitor,
  MDXEditorMethods,
  realmPlugin,
  system,
  BoldItalicUnderlineToggles,
  // DiffSourceToggleWrapper,
  InsertThematicBreak,
  ListsToggle,
  UndoRedo,
  diffSourcePlugin,
  headingsPlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from '@mdxeditor/editor'

import RichTextIcon from './rich_text.svg.js'
import SourceIcon from './markdown.svg.js'
import styles from './ui.module.css.js'

import { $createParagraphNode, $createTextNode, ElementNode } from 'lexical'

// import '@mdxeditor/editor/style.css'
import './style.css'
import './content.css'

const catchAllVisitor: MdastImportVisitor<any> = {
  testNode: () => true,
  visitNode: ({ mdastNode, actions, lexicalParent }) => {
    const paragraph = $createParagraphNode()
    paragraph.append($createTextNode(mdastNode.children[0].value))
    ;(lexicalParent as ElementNode).append(paragraph)
  },
}

const [catchAllPlugin] = realmPlugin({
  id: 'catchAll',
  systemSpec: system(() => ({})),
  init: (realm) => {
    realm.pubKey('addImportVisitor', catchAllVisitor)
  },
})

export const DiffSourceToggleWrapper: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [viewMode] = diffSourcePluginHooks.useEmitterValues('viewMode')
  const changeViewMode = diffSourcePluginHooks.usePublisher('viewMode')

  return (
    <>
      {viewMode === 'rich-text' ? (
        children
      ) : viewMode === 'diff' ? (
        <span className={styles.toolbarTitleMode}>Diff mode</span>
      ) : (
        <span className={styles.toolbarTitleMode}>Source mode</span>
      )}

      <div style={{ marginLeft: 'auto', pointerEvents: 'auto', opacity: 1 }}>
        <SingleChoiceToggleGroup
          className={styles.diffSourceToggle}
          value={viewMode}
          items={[
            {
              title: 'Rich text',
              contents: <RichTextIcon />,
              value: 'rich-text',
            },
            { title: 'Source', contents: <SourceIcon />, value: 'source' },
          ]}
          onChange={(value) => changeViewMode(value || 'rich-text')}
        />
      </div>
    </>
  )
}

export const MarkDownControl = (
  props: ControlProps & EnumCellProps & WithClassname & TranslateProps
) => {
  // console.log('props', props)

  const {
    label,
    path,
    handleChange,
    id,
    config,
    data,
    errors,
    required,
    visible,
  } = props
  const isValid = errors.length === 0

  const ref = React.useRef<MDXEditorMethods>(null)
  return (
    <Hidden xsUp={!visible}>
      <FormControl id={id} variant={'standard'} fullWidth={true}>
        <InputLabel
          htmlFor={id + '-input'}
          error={!isValid}
          required={required}
        >
          {label}
        </InputLabel>
        <MDXEditor
          plugins={[
            headingsPlugin({ allowedHeadingLevels: [2, 3, 4] }),
            listsPlugin({}),
            // quotePlugin(),
            thematicBreakPlugin(),
            linkPlugin({}),
            diffSourcePlugin({
              diffMarkdown: data,
              viewMode: 'rich-text',
            }),
            linkDialogPlugin(),
            markdownShortcutPlugin(),
            toolbarPlugin({
              toolbarContents: () => (
                <>
                  <DiffSourceToggleWrapper>
                    <BlockTypeSelect />
                    <ListsToggle />
                    <BoldItalicUnderlineToggles />
                    <CreateLink />
                    <InsertThematicBreak />
                    <UndoRedo />
                  </DiffSourceToggleWrapper>
                </>
              ),
            }),
            catchAllPlugin(),
          ]}
          ref={ref}
          markdown={data ?? ''}
          contentEditableClassName="prose"
          onChange={(markdown) => handleChange(path, markdown)}
        />
      </FormControl>
    </Hidden>
  )
}

export const MarkDownControlTester: RankedTester = rankWith(
  100,
  optionIs('markDown', true)
)

export default withJsonFormsControlProps(withTranslateProps(MarkDownControl))
