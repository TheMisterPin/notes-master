'use client'
import '@blocknote/core/fonts/inter.css'
import '@blocknote/mantine/style.css'
import {
  useComponentsContext,
} from '@blocknote/react'

import { Text } from 'lucide-react'
import { Font } from './Font'
import useCustomEditor from '../editor/utils/useCustomEditor'


function FontButton() {
  const Components = useComponentsContext()!
  const editor = useCustomEditor()
  
  return (
    <Components.FormattingToolbar.Button
      label='Set Font'
      mainTooltip={'Set Font'}
      icon={<Text />}
      onClick={() => {
        const fontName = prompt('Enter a font name') || 'Comic Sans MS'

        editor.addStyles({
          font: fontName
        })
      }}
    />
  )
}

export default FontButton