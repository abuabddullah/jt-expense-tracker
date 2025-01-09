"use client";

import { useGetLimitsQuery } from "@/lib/services/api";
import { useEffect, useState } from "react";
import ExpenseTracker from "./components/ExpenseTracker";
import SpendingLimits from "./components/SpendingLimits";
import "./globals.css";
import { createContext } from "react";

export const LimitContext = createContext<any>(null);

export default function Home() {
  const { data: limits, isLoading } = useGetLimitsQuery();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (limits && limits.length > 0) {
      setIsInitialized(true);
    }
  }, [limits]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <LimitContext.Provider value={{ isInitialized, setIsInitialized, limits }}>
      <main>{!isInitialized ? <SpendingLimits /> : <ExpenseTracker />}</main>
    </LimitContext.Provider>
  );
}
