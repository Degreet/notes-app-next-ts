import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../db'

export default function Note(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const note = db.notes.find((n) => n.id === id)

  res.json({
    note,
  })
}