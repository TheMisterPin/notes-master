import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import DocumentList from './document-list'
import { Id } from '@/convex/_generated/dataModel'

interface DocumentTreeProps {
  parentDocumentId?: Id<'documents'>
  onDrop?: (id: Id<'documents'>, parentDocument: Id<'documents'>) => void
}

const DocumentTree = ({ parentDocumentId, onDrop }: DocumentTreeProps) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <DocumentList parentDocumentId={parentDocumentId} onDrop={onDrop} />
    </DndProvider>
  )
}

export default DocumentTree
