import { NextResponse } from 'next/server'
import clientPromise from '@/lib/db'
import { ObjectId } from 'mongodb'

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise
    const db = client.db('expense-tracker')
    const { amount, category, purpose } = await request.json()

    const result = await db.collection('expenses').updateOne(
      { _id: new ObjectId(params.id) },
      { $set: { amount: Number(amount), category, purpose } }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: 'Expense not found' }, { status: 404 })
    }

    return NextResponse.json({ _id: params.id, amount, category, purpose })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update expense' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise
    const db = client.db('expense-tracker')

    const result = await db.collection('expenses').deleteOne({ _id: new ObjectId(params.id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: 'Expense not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, id: params.id })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete expense' }, { status: 500 })
  }
}

