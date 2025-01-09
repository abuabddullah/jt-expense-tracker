"use client";

import {
  useAddExpenseMutation,
  useDeleteExpenseMutation,
  useGetExpensesQuery,
  useGetLimitsQuery,
} from "@/lib/services/api";
import { useContext, useState } from "react";
import { LimitContext } from "../page";
import EditExpenseForm from "./EditExpenseForm";
import styles from "./ExpenseTracker.module.css";

const categories = [
  "Groceries",
  "Transportation",
  "Healthcare",
  "Utility",
  "Charity",
  "Miscellaneous",
];

export default function ExpenseTracker() {
  const [newExpense, setNewExpense] = useState({
    amount: "",
    category: categories[0],
    purpose: "",
  });
  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);

  const { data: expenses, isLoading: expensesLoading } = useGetExpensesQuery();
  const { data: limits, isLoading: limitsLoading } = useGetLimitsQuery();
  const [addExpense] = useAddExpenseMutation();
  const [deleteExpense] = useDeleteExpenseMutation();
  const { setIsInitialized } = useContext(LimitContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addExpense({
      ...newExpense,
      amount: Number(newExpense.amount),
      date: new Date().toISOString(),
    });
    setNewExpense({ amount: "", category: categories[0], purpose: "" });
  };

  const handleResetHistory = async () => {
    if (expenses && limits) {
      const resetExpensesRes = await fetch("/api/expenses/reset", {
        method: "POST",
      });
      // Reset limits collection through API
      const resetLimitRes = await fetch("/api/limits/reset", {
        method: "POST",
      });

      if (resetExpensesRes.ok && resetLimitRes.ok) {
        setIsInitialized(false);
        window.location.reload();
      } else {
        alert("Failed to reset history");
      }
    }
  };

  const getDaysInCurrentMonth = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  };

  const getCurrentMonthDates = () => {
    const dates = [];
    const daysInMonth = getDaysInCurrentMonth();
    for (let i = 1; i <= daysInMonth; i++) {
      dates.push(i);
    }
    return dates;
  };

  const getExpenseForDateAndCategory = (date: number, category: string) => {
    const expense = expenses?.find((e) => {
      const expenseDate = new Date(e.date);
      return expenseDate.getDate() === date && e.category === category;
    });
    return expense ? `$${expense.amount.toFixed(2)}` : "-";
  };

  const calculateRemaining = (category: string) => {
    const limit = limits?.find((l) => l.category === category)?.amount || 0;
    const totalExpenses =
      expenses
        ?.filter((e) => e.category === category)
        .reduce((sum, e) => sum + Number(e.amount), 0) || 0;
    return (limit - totalExpenses).toFixed(2);
  };

  const groupExpensesByDate = () => {
    if (!expenses) return {};
    return expenses.reduce((groups: { [key: string]: any[] }, expense) => {
      const date = new Date(expense.date).toLocaleDateString();
      if (!groups[date]) groups[date] = [];
      groups[date].push(expense);
      return groups;
    }, {});
  };

  if (expensesLoading || limitsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Expense Tracker</h1>

      <button onClick={handleResetHistory} className={styles.resetButton}>
        Reset History
      </button>

      <div className={styles.grid}>
        <div className={styles.addExpense}>
          <h2>Add New Expense</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label>Amount ($)</label>
              <input
                type="number"
                value={newExpense.amount}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, amount: e.target.value })
                }
                placeholder="Enter amount"
                required
              />
            </div>

            <div className={styles.field}>
              <label>Category</label>
              <select
                value={newExpense.category}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, category: e.target.value })
                }
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
                value={newExpense.purpose}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, purpose: e.target.value })
                }
                placeholder="Enter purpose"
                required
              />
            </div>

            <button type="submit" className={styles.addButton}>
              Add Expense
            </button>
          </form>
        </div>

        <div className={styles.summary}>
          <div className={styles.monthlyOverview}>
            <h2>Monthly Overview</h2>
            <div className={styles.tableWrapper}>
              <table className={styles.overviewTable}>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Limit</th>
                    <th>Remaining</th>
                    {getCurrentMonthDates().map((date) => (
                      <th key={date}>{date}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((category) => (
                    <tr key={category}>
                      <td>{category}</td>
                      <td>
                        $
                        {limits?.find((l) => l.category === category)?.amount ||
                          0}
                      </td>
                      <td>${calculateRemaining(category)}</td>
                      {getCurrentMonthDates().map((date) => (
                        <td key={date}>
                          {getExpenseForDateAndCategory(date, category)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className={styles.dailySummary}>
            <h2>Daily Summary</h2>
            {Object.entries(groupExpensesByDate()).map(
              ([date, dayExpenses]) => (
                <div key={date} className={styles.dayGroup}>
                  <h3>
                    {date}{" "}
                    <span className={styles.dayTotal}>
                      ${dayExpenses.reduce((sum, e) => sum + e.amount, 0)}
                    </span>
                  </h3>
                  {dayExpenses.map((expense) => (
                    <div key={expense._id} className={styles.expense}>
                      <div className={styles.expenseCategory}>
                        {expense.category}
                      </div>
                      <div className={styles.expensePurpose}>
                        {expense.purpose}
                      </div>
                      <div className={styles.expenseAmount}>
                        ${expense.amount}
                      </div>
                      <div className={styles.expenseActions}>
                        <button
                          onClick={() => setEditingExpenseId(expense._id)}
                          className={styles.editButton}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteExpense(expense._id)}
                          className={styles.deleteButton}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {editingExpenseId && (
        <EditExpenseForm
          expenseId={editingExpenseId}
          onClose={() => setEditingExpenseId(null)}
        />
      )}
    </div>
  );
}
