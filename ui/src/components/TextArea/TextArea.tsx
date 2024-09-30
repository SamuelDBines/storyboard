import React from "react";
import "./TextArea.css";

interface TextAreaProps {
  value: any;
  setValue: (value: any) => void;
  disabled: boolean;
  label: string;
  rows?: number;
}

const TextArea = ({ disabled, value, setValue, label, rows }: TextAreaProps) => {
  return (<div className="text-field-container"><label>{label}</label>
    <textarea onClick={(e) => e.stopPropagation()} onChange={(e) => setValue(e.target.value)} defaultValue={value} disabled={disabled} rows={rows} /></div>);
};
export default TextArea;