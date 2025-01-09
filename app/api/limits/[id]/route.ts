import { NextResponse } from 'next/server'
import clientPromise from '@/lib/db'
import { ObjectId } from 'mongodb'

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise
    const db = client.db('expense-tracker')
    const { category, amount } = await request.json()

    const result = await db.collection('limits').updateOne(
      { _id: new ObjectId(params.id) },
      { $set: { category, amount: Number(amount) } }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: 'Limit not found' }, { status: 404 })
    }

    return NextResponse.json({ _id: params.id, category, amount })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update limit' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise
    const db = client.db('expense-tracker')

    const result = await db.collection('limits').deleteOne({ _id: new ObjectId(params.id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: 'Limit not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, id: params.id })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete limit' }, { status: 500 })
  }
}

