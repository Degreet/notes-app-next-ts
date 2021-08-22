import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../db'

export default function Notes(req: NextApiRequest, res: NextApiResponse) {
  res.json({
    notes: db.notes,
  })
}