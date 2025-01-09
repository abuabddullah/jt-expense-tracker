"use client";

import { useState } from "react";
import {
  useGetLimitsQuery,
  useAddLimitMutation,
  useUpdateLimitMutation,
} from "@/lib/services/api";
import styles from "./SpendingLimits.module.css";

const categories = [
  "Groceries",
  "Transportation",
  "Healthcare",
  "Utility",
  "Charity",
  "Miscellaneous",
];

export default function SpendingLimits() {
  const [monthlyLimit, setMonthlyLimit] = useState("");
  const [categoryLimits, setCategoryLimits] = useState<Record<string, string>>(
    {}
  );

  const { data: limits } = useGetLimitsQuery();
  const [addLimit] = useAddLimitMutation();
  const [updateLimit] = useUpdateLimitMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Add or update monthly limit
    const monthlyLimitData = limits?.find(
      (limit) => limit.category === "Monthly"
    );
    if (monthlyLimitData) {
      await updateLimit({ ...monthlyLimitData, amount: Number(monthlyLimit) });
    } else {
      await addLimit({ category: "Monthly", amount: Number(monthlyLimit) });
    }

    // Add or update category limits
    for (const [category, amount] of Object.entries(categoryLimits)) {
      if (amount) {
        const limitData = limits?.find((limit) => limit.category === category);
        if (limitData) {
          await updateLimit({ ...limitData, amount: Number(amount) });
        } else {
          await addLimit({ category, amount: Number(amount) });
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Set Spending Limits</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label>Monthly Limit ($)</label>
          <input
            type="number"
            value={monthlyLimit}
            onChange={(e) => setMonthlyLimit(e.target.value)}
            placeholder="Enter monthly limit"
            required
          />
        </div>

        <h2 className={styles.subtitle}>Category Limits (Optional)</h2>

        {categories.map((category) => (
          <div key={category} className={styles.field}>
            <label>{category} ($)</label>
            <input
              type="number"
              value={categoryLimits[category] || ""}
              onChange={(e) =>
                setCategoryLimits({
                  ...categoryLimits,
                  [category]: e.target.value,
                })
              }
              placeholder={`Enter ${category.toLowerCase()} limit`}
            />
          </div>
        ))}

        <>
          {Object.values(categoryLimits).reduce(
            (sum, val) => sum + (Number(val) || 0),
            0
          ) > Number(monthlyLimit) &&
            monthlyLimit && (
              <p className={styles.error}>
                Category limits sum cannot exceed monthly limit
              </p>
            )}
          <button
            type="submit"
            className={styles.button}
            disabled={
              Object.values(categoryLimits).reduce(
                (sum, val) => sum + (Number(val) || 0),
                0
              ) > Number(monthlyLimit) && monthlyLimit !== ""
            }
          >
            Start Tracking Expenses
          </button>
        </>
      </form>
    </div>
  );
}
