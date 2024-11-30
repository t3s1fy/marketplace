import React from "react";
import "./Checkbox.css";

export const Checkbox = ({ isChecked, onChange, children }) => {
  return (
    <label className="checkbox-wrapper">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => onChange((prev) => !prev)}
        className="checkbox-element"
      />
      <p>{children}</p>
    </label>
  );
};
