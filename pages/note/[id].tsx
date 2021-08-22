import axios from 'axios'
import type { NextPage, NextPageContext } from 'next'
import { Note } from '../../interfaces/note'
import { MouseEventHandler, useCallback } from 'react'
import { SuccessResponse } from '../../interfaces/success-response'
import { useRouter } from 'next/router'

interface NoteResponse {
  note: Note
}

interface Props {
  note: Note
}

const NotePage: NextPage<Props> = ({ note }: Props) => {
  const router = useRouter()

  const removeHandler: MouseEventHandler = useCallback(async (): Promise<void> => {
    const res: SuccessResponse = await axios.delete(`/api/note/remove/${note.id}`)
    if (res.data.success) await router.push('/')
  }, [note, router])

  if (!note) {
    return <p>Не найдено</p>
  }

  return (
    <>
      <main>
        <h1>{note.title}</h1>
        <pre className="pre">
          {note.text}
        </pre>
        <button className="btn-danger" onClick={removeHandler}>Удалить</button>
      </main>
    </>
  )
}

NotePage.getInitialProps = async (ctx: NextPageContext): Promise<{ note: Note }> => {
  const { id } = ctx.query
  const res: { data: NoteResponse } = await axios.get(`http://localhost:3000/api/note/${id}`)
  return { note: res.data.note }
}

export default NotePage
