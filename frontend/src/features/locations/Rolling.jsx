import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { FaTrash } from "react-icons/fa";
import { Card } from "@/components/ui/card";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const YEARS = ["None", "2019", "2020", "2021", "2022", "2023", "2024", "2025"];

export default function Rolling12MonthYield({ getRolling }) {
  const [rollingData, setRollingData] = useState([]);

  const addRow = () => {
    setRollingData((prev) => [
      ...prev,
      {
        months: "",
        year: "",
        monthlyRevenue: "",
        numberOfAdvisor: "",
        numberOfClient: "",
        advisorMonthlyYield: "",
        clientMonthlyYield: "",
      },
    ]);
  };

  const deleteRow = (index) => {
    setRollingData((prev) => prev.filter((_, i) => i !== index));
  };

  // Update a field in a row
  const handleChange = (index, field, value) => {
    setRollingData((prev) =>
      prev.map((row, i) =>
        i === index
          ? {
              ...row,
              [field]: value,
              // auto-calculate yields if revenue/advisor/client
              ...(field === "monthlyRevenue" ||
              field === "numberOfAdvisor" ||
              field === "numberOfClient"
                ? calcYields({ ...row, [field]: value })
                : {}),
            }
          : row
      )
    );
  };

  // Calculate yields based on current row state
  const calcYields = (row) => {
    const revenue = parseFloat(row.monthlyRevenue) || 0;
    const advisorCount = parseInt(row.numberOfAdvisor) || 0;
    const clientCount = parseInt(row.numberOfClient) || 0;
    return {
      advisorMonthlyYield:
        advisorCount > 0 ? (revenue / advisorCount).toFixed(2) : "",
      clientMonthlyYield:
        clientCount > 0 ? (revenue / clientCount).toFixed(2) : "",
    };
  };

  // Optionally send data up
  React.useEffect(() => {
    if (typeof getRolling === "function") {
      getRolling({ RollingData: rollingData });
    }
  }, [rollingData, getRolling]);

  return (
    <div className="w-full rounded-2xl border shadow-sm p-4 mb-6">
      <h5 className="font-semibold text-lg mb-4">Rolling 12 Month Yield</h5>
      <div className="overflow-x-auto">
        <div className="max-h-80 overflow-y-auto">
          <table className="w-full min-w-[900px] text-sm border">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-center font-semibold border-r">#</th>
                <th className="p-2 text-center font-semibold border-r">
                  Actions
                </th>
                <th className="p-2 text-center font-semibold border-r">
                  Month
                </th>
                <th className="p-2 text-center font-semibold border-r">Year</th>
                <th className="p-2 text-center font-semibold border-r">
                  Monthly Revenue (CA$)
                </th>
                <th className="p-2 text-center font-semibold border-r">
                  # Advisors
                </th>
                <th className="p-2 text-center font-semibold border-r">
                  # Clients
                </th>
                <th className="p-2 text-center font-semibold border-r">
                  Advisor Yield (CA$)
                </th>
                <th className="p-2 text-center font-semibold">
                  Client Yield (CA$)
                </th>
              </tr>
            </thead>
            <tbody>
              {rollingData.length === 0 && (
                <tr>
                  <td colSpan={9} className="p-4 text-center text-gray-400">
                    No data. Click "Add Row" to begin.
                  </td>
                </tr>
              )}
              {rollingData.map((row, idx) => (
                <tr key={idx} className="border-b group transition">
                  <td className="text-center px-2 py-3">{idx + 1}</td>
                  <td className="text-center px-2 py-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => deleteRow(idx)}
                      className="text-red-600"
                      aria-label="Delete"
                      title="Delete row"
                      tabIndex={0}
                      style={{ minWidth: 36, minHeight: 36 }}
                    >
                      <FaTrash size={18} />
                    </Button>
                  </td>
                  <td className="px-2 py-3">
                    <Select
                      value={row.months}
                      onValueChange={(v) => handleChange(idx, "months", v)}
                    >
                      <SelectTrigger className="w-28 h-9 text-sm">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {MONTHS.map((m) => (
                          <SelectItem key={m} value={m}>
                            {m}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-2 py-3">
                    <Select
                      value={row.year}
                      onValueChange={(v) => handleChange(idx, "year", v)}
                    >
                      <SelectTrigger className="w-20 h-9 text-sm">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {YEARS.map((y) => (
                          <SelectItem key={y} value={y}>
                            {y}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-2 py-3">
                    <Input
                      type="number"
                      value={row.monthlyRevenue}
                      onChange={(e) =>
                        handleChange(idx, "monthlyRevenue", e.target.value)
                      }
                      className="w-32 h-9 text-sm"
                      min="0"
                    />
                  </td>
                  <td className="px-2 py-3">
                    <Input
                      type="number"
                      value={row.numberOfAdvisor}
                      onChange={(e) =>
                        handleChange(idx, "numberOfAdvisor", e.target.value)
                      }
                      className="w-24 h-9 text-sm"
                      min="0"
                    />
                  </td>
                  <td className="px-2 py-3">
                    <Input
                      type="number"
                      value={row.numberOfClient}
                      onChange={(e) =>
                        handleChange(idx, "numberOfClient", e.target.value)
                      }
                      className="w-24 h-9 text-sm"
                      min="0"
                    />
                  </td>
                  <td className="px-2 py-3">
                    <Input
                      type="number"
                      value={row.advisorMonthlyYield}
                      readOnly
                      disabled
                      className="w-32 h-9 text-sm bg-gray-100"
                      tabIndex={-1}
                    />
                  </td>
                  <td className="px-2 py-3">
                    <Input
                      type="number"
                      value={row.clientMonthlyYield}
                      readOnly
                      disabled
                      className="w-32 h-9 text-sm bg-gray-100"
                      tabIndex={-1}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex mt-2">
        <Button className="h-9 px-6" variant="outline" onClick={addRow}>
          + Add Row
        </Button>
      </div>
    </div>
  );
}
