import { Metadata } from "next";
import { TransactionList } from "@/app/transactions/components/TransactionList";
import { TransactionDetails } from "@/app/transactions/components/TransactionDetails";

export const metadata: Metadata = {
  title: "Transaction Details",
  description: "View details of a specific transaction",
};

export default function TransactionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="flex h-full">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <TransactionList selectedTransaction={params.id} />
      </div>
      <div className="border-l w-1/3 p-8 pt-6">
        <TransactionDetails transactionId={params.id} />
      </div>
    </div>
  );
}
