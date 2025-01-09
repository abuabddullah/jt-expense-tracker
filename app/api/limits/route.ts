import { NextResponse } from 'next/server'
import clientPromise from '@/lib/db'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('expense-tracker')
    
    const limits = await db.collection('limits').find({}).toArray()
    
    return NextResponse.json(limits)
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch limits' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise
    const db = client.db('expense-tracker')
    const { category, amount } = await request.json()

    const result = await db.collection('limits').insertOne({
      category,
      amount: Number(amount),
    })

    return NextResponse.json({ _id: result.insertedId, category, amount })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to add limit' }, { status: 500 })
  }
}

