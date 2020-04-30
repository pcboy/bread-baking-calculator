import React from "react";
import { Button } from "@material-ui/core";
import { calculatorStore } from "../../stores/CalculatorStore";

export const AddButton = ({ onClick, children }) => (
  <Button variant="outlined" color="primary" size="small" onClick={onClick}>
    {children}
  </Button>
);

export const sanitizedString = (e) => {
  const value = e.target.value != "" ? e.target.value : "";
  return value;
};

export const sanitizedNumber = (e) => {
  const value = e.target.value != "" ? parseInt(e.target.value) : 0;
  return value;
};

export const handleChangeNumber = (e, key) => {
  const value = e.target.value != "" ? parseInt(e.target.value) : 0;
  calculatorStore[key] = value;
};

export const stripHTML = (htmlString) => {
  return htmlString
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&gt;/g, ">")
    .replace(/<br>/g, " ")
    .replace(/&lt;/g, "<");
};
