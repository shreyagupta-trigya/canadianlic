import React, { useState, useEffect } from "react";
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

const YEARS = [
  "None",
  "2019", "2020", "2021", "2022", "2023", "2024", "2025"
];

export default function AnnualPerformanceTrack({ getAnnualPerformance }) {
  const [annualPerformance, setAnnualPerformance] = useState([]);

  // Add a new row
  const addRow = () => {
    setAnnualPerformance((prev) => [
      ...prev,
      {
        year: "",
        noOfAdvisorsAtEnd: "",
        noOfClientAtYearEnd: "",
        annualRevenue: "",
        advisorAnnualRevenueYield: "",
        clientAnnualYield: "",
      },
    ]);
  };

  // Delete a row
  const deleteRow = (index) => {
    setAnnualPerformance((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle input/select change and auto-calculate yields
  const handleChange = (idx, field, value) => {
    setAnnualPerformance(prev =>
      prev.map((row, i) =>
        i === idx
          ? {
              ...row,
              [field]: value,
              ...(field === "annualRevenue" || field === "noOfAdvisorsAtEnd" || field === "noOfClientAtYearEnd"
                ? calcYields({ ...row, [field]: value })
                : {})
            }
          : row
      )
    );
  };

  // Auto-calculate yield fields
  const calcYields = (row) => {
    const revenue = parseFloat(row.annualRevenue) || 0;
    const advisors = parseInt(row.noOfAdvisorsAtEnd) || 0;
    const clients = parseInt(row.noOfClientAtYearEnd) || 0;
    return {
      advisorAnnualRevenueYield: advisors > 0 ? (revenue / advisors).toFixed(2) : "",
      clientAnnualYield: clients > 0 ? (revenue / clients).toFixed(2) : "",
    };
  };

  // Optionally report data to parent
  useEffect(() => {
    if (typeof getAnnualPerformance === "function") {
      getAnnualPerformance({ AnnualPerformance: annualPerformance });
    }
  }, [annualPerformance, getAnnualPerformance]);

  return (
    <div className="w-full rounded-2xl border shadow-sm p-4 mb-6">
    <h5 className="font-semibold text-lg mb-4">Annual Performance Track</h5>
    <div className="overflow-x-auto">
      <div className="max-h-80 overflow-y-auto">
        <table className="w-full min-w-[900px] text-sm border">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-center font-semibold border-r">#</th>
              <th className="p-2 text-center font-semibold border-r">Actions</th>
              <th className="p-2 text-center font-semibold border-r">Year</th>
              <th className="p-2 text-center font-semibold border-r">Number of Advisors at Year End</th>
              <th className="p-2 text-center font-semibold border-r">No. of Clients at Year End</th>
              <th className="p-2 text-center font-semibold border-r">Annual Revenue (CA$)</th>
              <th className="p-2 text-center font-semibold border-r">Advisor Annual Revenue Yield (CA$)</th>
              <th className="p-2 text-center font-semibold">Client Annual Revenue Yield (CA$)</th>
            </tr>
          </thead>
          <tbody>
            {annualPerformance.length === 0 && (
              <tr>
                <td colSpan={8} className="p-4 text-center text-gray-400">
                  No data. Click "Add Row" to begin.
                </td>
              </tr>
            )}
            {annualPerformance.map((row, idx) => (
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
                    value={row.year}
                    onValueChange={v => handleChange(idx, "year", v)}
                  >
                    <SelectTrigger className="w-24 h-9 text-sm">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {YEARS.map(y => (
                        <SelectItem key={y} value={y}>{y}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-2 py-3">
                  <Input
                    type="number"
                    value={row.noOfAdvisorsAtEnd}
                    onChange={e => handleChange(idx, "noOfAdvisorsAtEnd", e.target.value)}
                    className="w-28 h-9 text-sm"
                    min="0"
                  />
                </td>
                <td className="px-2 py-3">
                  <Input
                    type="number"
                    value={row.noOfClientAtYearEnd}
                    onChange={e => handleChange(idx, "noOfClientAtYearEnd", e.target.value)}
                    className="w-28 h-9 text-sm"
                    min="0"
                  />
                </td>
                <td className="px-2 py-3">
                  <Input
                    type="number"
                    value={row.annualRevenue}
                    onChange={e => handleChange(idx, "annualRevenue", e.target.value)}
                    className="w-32 h-9 text-sm"
                    min="0"
                  />
                </td>
                <td className="px-2 py-3">
                  <Input
                    type="number"
                    value={row.advisorAnnualRevenueYield}
                    readOnly
                    disabled
                    className="w-32 h-9 text-sm bg-gray-100"
                    tabIndex={-1}
                  />
                </td>
                <td className="px-2 py-3">
                  <Input
                    type="number"
                    value={row.clientAnnualYield}
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
