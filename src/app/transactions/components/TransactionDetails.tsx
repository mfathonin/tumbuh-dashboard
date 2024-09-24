import React from "react";

interface TransactionDetailsProps {
  transactionId: string;
}

export function TransactionDetails({ transactionId }: TransactionDetailsProps) {
  // Fetch transaction details based on transactionId
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Transaction Details</h2>
      <p>Transaction ID: {transactionId}</p>
      {/* Add more transaction details here */}
    </div>
  );
}
