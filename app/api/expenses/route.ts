import { NextResponse } from 'next/server'
import clientPromise from '@/lib/db'
import { ObjectId } from 'mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('expense-tracker')
    
    const expenses = await db.collection('expenses').find({}).toArray()
    
    return NextResponse.json(expenses)
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch expenses' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise
    const db = client.db('expense-tracker')
    const { amount, category, purpose } = await request.json()

    const result = await db.collection('expenses').insertOne({
      amount: Number(amount),
      category,
      purpose,
      date: new Date().toISOString(),
    })

    return NextResponse.json({ _id: result.insertedId, amount, category, purpose, date: new Date().toISOString() })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to add expense' }, { status: 500 })
  }
}

