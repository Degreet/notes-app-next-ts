import { Note } from './interfaces/note'

export interface Db {
  notes: Note[]
}

export const db: Db = {
  notes: [
    {
      id: "1",
      title: "Заголовок",
      text: "Текст",
      dateCreate: Date.now(),
    },
  ]
}