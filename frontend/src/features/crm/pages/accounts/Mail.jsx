// Mail.jsx
import React from "react";

export default function Mail() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Top Controls */}
      <div className="flex justify-between items-center mb-6">
        <div className="space-x-2">
          <button className="px-4 py-2 bg-gray-100 rounded shadow text-sm">
            This Month
          </button>
          <button className="px-4 py-2 bg-gray-100 rounded shadow text-sm">
            Filter By: All
          </button>
        </div>
        <div className="space-x-2">
          <button className="px-3 py-2 border rounded bg-white shadow">📄</button>
          <button className="px-3 py-2 border rounded bg-white shadow">⬇️</button>
          <button className="px-3 py-2 border rounded bg-white shadow">🖨️</button>
          <button className="px-4 py-2 bg-green-500 text-white rounded shadow text-sm">
            Send Email
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white shadow rounded p-8">
        {/* Title */}
        <h2 className="text-center font-semibold text-lg">
          Customer Statement for Akshay Saini
        </h2>
        <p className="text-center text-sm text-gray-600">
          From 01 Sep 2025 To 30 Sep 2025
        </p>

        {/* Address & Account Summary */}
        <div className="flex justify-between mt-6">
          {/* Left Side */}
          <div>
            <p className="text-sm">To</p>
            <a href="/" className="text-blue-600 text-sm font-medium">
              Akshay Saini
            </a>
          </div>

          {/* Right Side */}
          <div className="text-right">
            <h3 className="font-semibold">Trisya Demo5</h3>
            <p className="text-sm text-gray-600">
              Haridwar Indiana 249402 <br /> U.S.A
            </p>
          </div>
        </div>

        {/* Statement of Accounts */}
        <div className="mt-6 border rounded">
          <div className="p-4 border-b flex justify-between items-center">
            <h4 className="font-bold">Statement of Accounts</h4>
            <span className="text-sm text-gray-600">
              01 Sep 2025 To 30 Sep 2025
            </span>
          </div>

          {/* Account Summary Table */}
          <table className="w-full text-sm border-collapse">
            <tbody>
              <tr className="bg-gray-100">
                <td className="p-2 font-semibold">Account Summary</td>
                <td></td>
              </tr>
              <tr>
                <td className="p-2">Opening Balance</td>
                <td className="p-2 text-right">$ 0.00</td>
              </tr>
              <tr>
                <td className="p-2">Invoiced Amount</td>
                <td className="p-2 text-right">$ 0.00</td>
              </tr>
              <tr>
                <td className="p-2">Amount Received</td>
                <td className="p-2 text-right">$ 0.00</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Balance Due</td>
                <td className="p-2 text-right font-semibold">$ 0.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Transaction Table */}
        <div className="mt-6">
          <table className="w-full border-collapse border text-sm">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Transactions</th>
                <th className="p-2 text-left">Details</th>
                <th className="p-2 text-left">Amount</th>
                <th className="p-2 text-left">Payments</th>
                <th className="p-2 text-left">Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">01 Sep 2025</td>
                <td className="p-2">***Opening Balance***</td>
                <td className="p-2"></td>
                <td className="p-2">0.00</td>
                <td className="p-2">0.00</td>
                <td className="p-2">0.00</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold" colSpan={5}>
                  Balance Due
                </td>
                <td className="p-2 font-semibold">$ 0.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
