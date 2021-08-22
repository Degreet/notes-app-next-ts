import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../db'
import { Note } from '../../../interfaces/note'

export default function AddNote(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return

  const { title, text } = req.body
  const note: Note = {
    id: Math.floor(Math.random() * 100000).toString(),
    title,
    text,
    dateCreate: Date.now(),
  }

  db.notes.unshift(note)

  res.json({
    success: true,
    note,
  })
}