import axios from 'axios'
import type { NextPage } from 'next'
import { Note } from '../interfaces/note'
import classes from '../styles/Home.module.scss'
import Link from 'next/link'

interface NotesResponse {
  notes: Note[]
}

interface Props extends NotesResponse {
}

const Home: NextPage<Props> = ({ notes }: Props) => {
  return (
    <>
      <main>
        <h1><Link href="/note/add"><a>Заметки</a></Link></h1>
        <ul className={classes.notesList}>
          {notes && notes.length ? notes.map((note: Note) => (
            <li key={note.id}>
              <Link href={`/note/[id]`} as={`/note/${note.id}`}><a>{note.title}</a></Link>
            </li>
          )) : <p>Нет заметок</p>}
        </ul>
      </main>
    </>
  )
}

Home.getInitialProps = async (): Promise<{ notes: Note[] }> => {
  const res: { data: NotesResponse } = await axios.get(`${process.env.API_URL}/notes`)
  return { notes: res.data.notes }
}

export default Home
