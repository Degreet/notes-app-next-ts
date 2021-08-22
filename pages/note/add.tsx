import axios from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import classes from '../../styles/AddNote.module.scss'
import { ChangeEvent, ChangeEventHandler, useCallback, useState } from 'react'

interface Props {
}

const AddNotePage: NextPage<Props> = () => {
  const router = useRouter()
  const [state, setState] = useState({
    title: '',
    text: '',
  })

  const changeHandler: ChangeEventHandler = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setState((prev) => (
      {
        ...prev,
        [e.target.name]: e.target.value
      }
    ))
  }, [setState])

  const submitHandler = useCallback(async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res: { data: { success?: boolean } } = await axios.post('/api/note/add', state)
      if (res.data.success) await router.push('/')
    } catch {}
  }, [state, router])

  return (
    <>
      <main>
        <h1>Новая заметка</h1>
        <form onSubmit={submitHandler} className={classes.addNote__form}>
          <input
            name="title"
            type="text"
            placeholder="Название"
            onChange={changeHandler}
            value={state.title}
          />
          <textarea
            name="text"
            placeholder="Текст"
            onChange={changeHandler}
            value={state.text}
            rows={20}
          />
          <button className="btn-success">Добавить</button>
        </form>
      </main>
    </>
  )
}

export default AddNotePage
