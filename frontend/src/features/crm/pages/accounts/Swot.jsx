import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { X, CheckCircle, AlertCircle, TrendingUp, AlertTriangle } from "lucide-react";

function SmartAnalysis() {
  const CATEGORY_ICONS = {
    strengths: <CheckCircle className="text-white mr-2" size={20} />,
    weaknesses: <AlertCircle className="text-white mr-2" size={20} />,
    opportunities: <TrendingUp className="text-white mr-2" size={20} />,
    threats: <AlertTriangle className="text-white mr-2" size={20} />,
  };
  

  const [swot, setSwot] = useState({
    strengths: [{ text: "", checked: false }],
    weaknesses: [{ text: "", checked: false }],
    opportunities: [{ text: "", checked: false }],
    threats: [{ text: "", checked: false }],
  });

  const handleSwotChange = (category, index, value) => {
    let newData = [...swot[category]];
    newData[index].text = value;
    if (index === newData.length - 1 && value.trim() !== "") {
      newData.push({ text: "", checked: false });
    }
    if (value.trim() === "" && index !== newData.length - 1) {
      newData.splice(index, 1);
    }
    setSwot({ ...swot, [category]: newData });
  };

//   const handleCheckboxChange = (category, index) => {
//     let newData = [...swot[category]];
//     newData[index].checked = !newData[index].checked;
//     setSwot({ ...swot, [category]: newData });
//   };

  const handleDelete = (category, index) => {
    let newData = [...swot[category]];
    newData.splice(index, 1);
    setSwot({ ...swot, [category]: newData });
  };

  const autoResize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const renderCategory = (title, category, gradient, focusColor) => (
    <div className="rounded-xl shadow-lg overflow-hidden flex flex-col  transition-transform bg-white" >
      <div
        className="flex items-center py-3 px-4 font-bold text-white text-lg"
        style={{ background: gradient }}>
        {CATEGORY_ICONS[category]}
        {title}
      </div>
      {swot[category].map((item, i) => (
        <div
          key={i}
          className="flex items-start gap-1 bg-white px-3 py-2 border-b border-gray-200"
        >
          <Checkbox
            // checked={item.checked}
            // onCheckedChange={() => handleCheckboxChange(category, i)}
            className="mt-2 border border-gray dark:border-black"
          />
          <textarea
            value={item.text}
            onChange={(e) => {
              handleSwotChange(category, i, e.target.value);
              autoResize(e);
            }}
            placeholder={`Add ${title.toLowerCase()}...`}
            rows={1}
            className={`w-full rounded px-2 py-1 text-sm text-black  focus:outline-none dark:bg-black dark:text-white resize-none overflow-hidden ${
              item.checked ? "line-through text-gray-400" : ""
            }`}
            style={{
              borderColor: focusColor,
              outlineColor: focusColor,
            }}
          />
          {/* {item.text && (
            <button
              onClick={() => handleDelete(category, i)}
              className="text-red-500 hover:text-red-700 mt-2"
            >
              <X size={16} />
            </button>
          )} */}
        </div>
      ))}
    </div>
  );

return (
  <Card className=" bg-gray-50 dark:bg-[#0F172B] p-3">
    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">SWOT Analysis</h2>
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-1 ">
      {renderCategory(
        "Strengths",
        "strengths",
        "#007bff"
        
      )}
      {renderCategory(
        "Weaknesses",
        "weaknesses",
        "#17a2b8"
      )}
      {renderCategory(
        "Opportunities",
        "opportunities",
        "#28a745"
      )}
      {renderCategory(
        "Threats",
        "threats",
        "#fd7e14"
      )}
    </div>
  </Card>
);

}

export default SmartAnalysis;