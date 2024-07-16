'use client'

import { useTheme } from 'next-themes'
import {  PartialBlock } from '@blocknote/core'
import { BlockNoteView } from '@blocknote/mantine'
import '@blocknote/mantine/style.css'
import { useEdgeStore } from '@/lib/edgestore'
import { BlockNoteSchema, defaultStyleSpecs } from '@blocknote/core'
import '@blocknote/core/fonts/inter.css'
import '@blocknote/mantine/style.css'
import {
  BasicTextStyleButton,
  BlockTypeSelect,
  ColorStyleButton,
  CreateLinkButton,
  FileCaptionButton,
  FileReplaceButton,
  FormattingToolbar,
  FormattingToolbarController,
  NestBlockButton,
  TextAlignButton,
  UnnestBlockButton,
  useBlockNoteEditor,
  useComponentsContext,
  useCreateBlockNote
} from '@blocknote/react'
import { RiText } from 'react-icons/ri'

import { Font } from './editorPlugins/Font'
interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
};
// Our schema with style specs, which contain the configs and implementations for styles
// that we want our editor to use.
const schema = BlockNoteSchema.create({
  styleSpecs: {
    // Adds all default styles.
    ...defaultStyleSpecs,
    // Adds the Font style.
    font: Font,
  },
});
 
// Formatting Toolbar button to set the font style.
const SetFontStyleButton = () => {
  const editor = useBlockNoteEditor<
    typeof schema.blockSchema,
    typeof schema.inlineContentSchema,
    typeof schema.styleSchema
  >();
 
  const Components = useComponentsContext()!;
 
  return (
    <Components.FormattingToolbar.Button
      label="Set Font"
      mainTooltip={"Set Font"}
      icon={<RiText />}
      onClick={() => {
        const fontName = prompt("Enter a font name") || "Comic Sans MS";
 
        editor.addStyles({
          font: fontName,
        });
      }}
    />
  );
};

const Editor = ({
  onChange,
  initialContent,
  editable
}: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({ 
      file
    });

    return response.url;
  }

  const editor = useCreateBlockNote({
    initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
    uploadFile: handleUpload,
    schema
  });

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
        editable={editable}
        onChange={() => {
          onChange(JSON.stringify(editor.document, null, 2))
        }}
        formattingToolbar={false}
      >
        {/* Replaces the default Formatting Toolbar. */}
        <FormattingToolbarController
          formattingToolbar={() => (
            <FormattingToolbar>
              <BlockTypeSelect key={'blockTypeSelect'} />

              <FileCaptionButton key={'fileCaptionButton'} />
              <FileReplaceButton key={'replaceFileButton'} />

              <BasicTextStyleButton basicTextStyle={'bold'} key={'boldStyleButton'} />
              <BasicTextStyleButton basicTextStyle={'italic'} key={'italicStyleButton'} />
              <BasicTextStyleButton basicTextStyle={'underline'} key={'underlineStyleButton'} />
              <BasicTextStyleButton basicTextStyle={'strike'} key={'strikeStyleButton'} />
              {/* Adds SetFontStyleButton */}
              <SetFontStyleButton />

              <TextAlignButton textAlignment={'left'} key={'textAlignLeftButton'} />
              <TextAlignButton textAlignment={'center'} key={'textAlignCenterButton'} />
              <TextAlignButton textAlignment={'right'} key={'textAlignRightButton'} />

              <ColorStyleButton key={'colorStyleButton'} />

              <NestBlockButton key={'nestBlockButton'} />
              <UnnestBlockButton key={'unnestBlockButton'} />

              <CreateLinkButton key={'createLinkButton'} />
            </FormattingToolbar>
          )}
        />
      </BlockNoteView>
    </div>
  )
}

export default Editor;