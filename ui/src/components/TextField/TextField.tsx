import React from "react";
import "./TextField.css";

interface TextFieldProps {
  value: any;
  setValue: (value: any) => void;
  label: string;
  type?: string;
  disabled?: boolean;
}

const TextField = ({ disabled = false, value, setValue, label, type = 'text' }: TextFieldProps) => {
  return (<div className="text-field-container"><label>{label}</label>
    <input type={type} onClick={(e) => e.stopPropagation()} onChange={(e) => setValue(e.target.value)} defaultValue={value} disabled={disabled} /></div>);
};
export default TextField;