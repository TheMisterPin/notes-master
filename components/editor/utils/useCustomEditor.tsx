'use client'

import { PartialBlock } from '@blocknote/core'
import { useCreateBlockNote } from '@blocknote/react'
import '@blocknote/mantine/style.css'
import { useEdgeStore } from '@/lib/edgestore'
import { BlockNoteSchema, defaultStyleSpecs } from '@blocknote/core'
import '@blocknote/core/fonts/inter.css'
import { Font } from '@/components/editorPlugins/Font'

// Define a schema for the editor, including custom styles
const schema = BlockNoteSchema.create({
  styleSpecs: {
    ...defaultStyleSpecs,
    font: Font // Custom font style
  }
})

/**
 * Custom hook to create and return a configured BlockNote editor instance.
 * @param initialContent - Initial content as a JSON string to load into the editor.
 * @returns A configured BlockNote editor instance.
 */


function useCustomEditor(initialContent?: string) {
  const { edgestore } = useEdgeStore()

  // Handler for uploading files
  const handleUpload = async (file: File) => {
    try {
      const response = await edgestore.publicFiles.upload({ file })
      return response.url
    } catch (error) {
      console.error('Failed to upload file:', error)
      return '' // Return a fallback or handle the error appropriately
    }
  }

  // Create the editor with the custom schema and configuration
  const editor = useCreateBlockNote({
    schema,
    initialContent: initialContent ? (JSON.parse(initialContent) as PartialBlock[]) : undefined,
    uploadFile: handleUpload
  })

  return editor
}

export default useCustomEditor
