"use client";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
}

interface TransactionListProps {
  selectedTransaction?: string | null;
}

export function TransactionList({ selectedTransaction }: TransactionListProps) {
  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      date: "2024-01-01",
      description: "Groceries",
      amount: -100,
      category: "Food",
    },
    {
      id: "2",
      date: "2024-01-02",
      description: "Restaurant",
      amount: -50,
      category: "Food",
    },
    {
      id: "3",
      date: "2024-01-03",
      description: "Gas",
      amount: -30,
      category: "Transport",
    },
    {
      id: "4",
      date: "2024-01-04",
      description: "Salary",
      amount: 2000,
      category: "Income",
    },
    {
      id: "5",
      date: "2024-01-05",
      description: "Groceries",
      amount: -150,
      category: "Food",
    },
    // Add some dummy transactions here
  ]);
  const router = useRouter();

  if (transactions.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <div className="p-4">
          <Input placeholder="Search transactions..." />
        </div>
        <div className="divide-y">
          {transactions.map((transaction) => (
            <Link
              key={transaction.id}
              href={`/transactions/${transaction.id}`}
              className={`block p-4 cursor-pointer ${
                selectedTransaction === transaction.id ? "bg-muted" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                router.push(`/transactions/${transaction.id}`);
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {transaction.date}
                  </p>
                </div>
                <p
                  className={`font-medium ${
                    transaction.amount < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  ${Math.abs(transaction.amount).toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
