import { useState } from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { FormSubHeading } from "./CustomFormComponents";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

function LabelValueColumn({ labels = [], values = [] }) {
    const [editingIndex, setEditingIndex] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    return (
        <div className="w-1/2 flex">
            <div className="w-1/4 flex flex-col items-start pr-2">
                {labels.map((label, idx) => (
                    // <Label key={idx} className="text-muted-foreground mb-4 text-right">
                    //     {label}
                    // </Label>
                    <span key={idx} readOnly={true} className="mb-2 h-9 text-base flex justify-center items-center text-muted-foreground ring-0" >{label}</span>
                ))}
            </div>
            {/* <div className="w-2/4 pl-4">
                {values.map((value, idx) => (
                    <Input key={idx} className="mb-2" value={value} />
                ))}
            </div> */}
            <div className="w-2/4 pl-4 flex flex-col">
                {values.map((value, idx) => {
                    const isHovered = hoveredIndex === idx;
                    const isEditing = editingIndex === idx;

                    return (
                        <Input
                            key={idx}
                            value={value}
                            onChange={(e) => onChange(idx, e.target.value)}
                            onMouseEnter={() => setHoveredIndex(idx)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onFocus={() => setEditingIndex(idx)}
                            onBlur={() => setEditingIndex(null)}
                            className={`
                                mb-2 h-9 text-base 
                                border 
                                transition-all 
                                ${isHovered || isEditing ? "border-input ring-1 ring-ring" : "border-transparent"}
                                focus:border-input focus:ring-1 focus:ring-ring 
                                focus:outline-none
                                bg-transparent
                            `}
                        />
                    );
                })}
            </div>

        </div>
    );
}

function EditableField({ value, onChange,name, className = "",component: Comp = Input,readOnly=false }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    return (
        <Comp name={name}
            value={value?value:"N/A"}
            readOnly={readOnly}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => onChange(e)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsEditing(true)}
            onBlur={() => setIsEditing(false)}
            className={`
                mb-2 h-9 text-base bg-transparent transition-all
                border 
                ${isHovered && !readOnly || isEditing ? "border-input ring-1 ring-ring" : "border-transparent"}
                ${!readOnly &&  "border-slate-100 ring-1 ring-ring"}
                focus:border-input focus:ring-1 focus:ring-ring focus:outline-none
                ${className}
            `}
        />
    );
}

function EditableSelectField({ value, onChange, options = [], className = "", name,readOnly=false }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`mb-2 transition-all w-full ${className}`}
    >
      <Select 
        value={value}
        onValueChange={(val)=>onChange({ target: { name: name, value:val }, preventDefault: () => { } })}
        onOpenChange={(open) => setIsEditing(open)}
      >
        <SelectTrigger
          className={`
            h-9 text-sm bg-transparent w-full
            border ${isHovered && !readOnly|| isEditing ? "border-input ring-1 ring-ring" : "border-transparent"}
             ${!readOnly &&  "border-slate-100 ring-1 ring-ring"}
            focus:border-input focus:ring-1 focus:ring-ring focus:outline-none
          `}
        >
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt, idx) => (
            <SelectItem key={idx} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}



function DetailsViewCard({
    heading,
    firstPartKeys = [],
    firstPartValues = [],
    secondPartKeys = [],
    secondPartValues = [],
    className = "",
    asChild = false,
    ...props
}) {
    const Comp = asChild ? Slot : Card;

    const shouldRenderFirst = firstPartKeys.length > 0 && firstPartValues.length > 0;
    const shouldRenderSecond = secondPartKeys.length > 0 && secondPartValues.length > 0;

    return (
        <Comp className={`shadow-background gap-4 mt-5 px-5 py-4 ${className}`} {...props}>
            {heading && <FormSubHeading className="text-primary">{heading}</FormSubHeading>}

            {heading == "Description" ? <>
                <Textarea readOnly className="w-[100%]" value={firstPartValues[0]} />
            </> : <div className="flex gap-3.5">
                {shouldRenderFirst && (
                    <LabelValueColumn labels={firstPartKeys} values={firstPartValues} />
                )}
                {shouldRenderSecond && (
                    <LabelValueColumn labels={secondPartKeys} values={secondPartValues} />
                )}
            </div>}
        </Comp>
    );
}


export { DetailsViewCard,EditableField,EditableSelectField }
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import { useState } from "react";

// function EditableField({ label, value, onChange }) {
//     const [isHovered, setIsHovered] = useState(false);
//     const [isEditing, setIsEditing] = useState(false);

//     return (
//         <div
//             className="mb-4 w-full"
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => {
//                 setIsHovered(false);
//                 setIsEditing(false);
//             }}
//         >
//             <Label className="text-muted-foreground block mb-1">{label}</Label>
//             {isHovered || isEditing ? (
//                 <Input
//                     className="w-full"
//                     value={value}
//                     onChange={(e) => onChange(e.target.value)}
//                     onFocus={() => setIsEditing(true)}
//                     onBlur={() => setIsEditing(false)}
//                 />
//             ) : (
//                 <span className="text-sm text-foreground">{value}</span>
//             )}
//         </div>
//     );
// }

// function LabelValueColumn({ labels = [], values = [], onChange = () => {} }) {
//     return (
//         <div className="w-1/2 flex">
//             <div className="w-full flex flex-col pr-2">
//                 {labels.map((label, idx) => (
//                     <EditableField
//                         key={idx}
//                         label={label}
//                         value={values[idx]}
//                         onChange={(newValue) => onChange(idx, newValue)}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// }

// function DetailsViewCard({
//     heading,
//     firstPartKeys = [],
//     firstPartValues = [],
//     setFirstPartValues = () => {},
//     secondPartKeys = [],
//     secondPartValues = [],
//     setSecondPartValues = () => {},
//     className = "",
//     asChild = false,
//     ...props
// }) {
//     const Comp = asChild ? Slot : Card;

//     const shouldRenderFirst = firstPartKeys.length > 0 && firstPartValues.length > 0;
//     const shouldRenderSecond = secondPartKeys.length > 0 && secondPartValues.length > 0;

//     const handleFirstPartChange = (idx, newValue) => {
//         const updated = [...firstPartValues];
//         updated[idx] = newValue;
//         setFirstPartValues(updated);
//     };

//     const handleSecondPartChange = (idx, newValue) => {
//         const updated = [...secondPartValues];
//         updated[idx] = newValue;
//         setSecondPartValues(updated);
//     };

//     return (
//         <Comp className={`shadow-background gap-4 mt-5 px-5 py-4 ${className}`} {...props}>
//             {heading && <FormSubHeading className="text-primary">{heading}</FormSubHeading>}
//             {heading === "Description" ? (
//                 <Textarea className="w-full" value={firstPartValues[0]} onChange={(e) => handleFirstPartChange(0, e.target.value)} />
//             ) : (
//                 <div className="flex gap-3.5">
//                     {shouldRenderFirst && (
//                         <LabelValueColumn
//                             labels={firstPartKeys}
//                             values={firstPartValues}
//                             onChange={handleFirstPartChange}
//                         />
//                     )}
//                     {shouldRenderSecond && (
//                         <LabelValueColumn
//                             labels={secondPartKeys}
//                             values={secondPartValues}
//                             onChange={handleSecondPartChange}
//                         />
//                     )}
//                 </div>
//             )}
//         </Comp>
//     );
// }

// export { DetailsViewCard }
