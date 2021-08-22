import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../db'
import { Note } from '../../../../interfaces/note'

export default function RemoveNote(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') return

  const { id } = req.query
  const note: Note | undefined = db.notes.find((n) => n.id === id)

  if (!note) {
    return res.json({
      success: false,
      msg: 'Not found'
    })
  }

  const idx = db.notes.indexOf(note)
  if (idx < 0) return
  db.notes.splice(idx, 1)

  res.json({
    success: true,
    note,
  })
}