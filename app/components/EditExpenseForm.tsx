'use client'

import { useState, useEffect } from 'react'
import { useUpdateExpenseMutation, useGetExpensesQuery } from '@/lib/services/api'
import styles from './EditExpenseForm.module.css'

interface EditExpenseFormProps {
  expenseId: string
  onClose: () => void
}

const categories = ['Groceries', 'Transportation', 'Healthcare', 'Utility', 'Charity', 'Miscellaneous']

export default function EditExpenseForm({ expenseId, onClose }: EditExpenseFormProps) {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    purpose: '',
  })

  const { data: expenses } = useGetExpensesQuery()
  const [updateExpense] = useUpdateExpenseMutation()

  useEffect(() => {
    const expense = expenses?.find(e => e._id === expenseId)
    if (expense) {
      setFormData({
        amount: expense.amount.toString(),
        category: expense.category,
        purpose: expense.purpose,
      })
    }
  }, [expenseId, expenses])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await updateExpense({
      _id: expenseId,
      amount: Number(formData.amount),
      category: formData.category,
      purpose: formData.purpose,
      date: new Date().toISOString(),
    })
    onClose()
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Edit Expense</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>Amount ($)</label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            />
          </div>

          <div className={styles.field}>
            <label>Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label>Purpose</label>
            <input
              type="text"
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              required
            />
          </div>

          <div className={styles.buttons}>
            <button type="submit" className={styles.saveButton}>
              Save Changes
            </button>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

