import { NextResponse } from 'next/server'
import clientPromise from '@/lib/db'

export async function POST() {
  try {
    const client = await clientPromise
    const db = client.db('expense-tracker')
    
    // Delete all documents from the limits collection
    await db.collection('limits').deleteMany({})
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to reset limits' }, { status: 500 })
  }
}

