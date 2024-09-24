import { Metadata } from "next";
import { TransactionList } from "@/app/transactions/components/TransactionList";

export const metadata: Metadata = {
  title: "Transactions",
  description: "View and manage your transactions",
};

export default function TransactionsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h1 className="text-3xl font-bold">Transactions</h1>
      <TransactionList />
    </div>
  );
}
