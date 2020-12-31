import * as React from "react";
import { Button } from "@material-ui/core";
import { calculatorStore } from "../../stores/CalculatorStore";
import { ContentEditableEvent } from "react-contenteditable";

export type AddButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
};

export const AddButton = ({ onClick, children }: AddButtonProps) => (
  <Button variant="outlined" color="primary" size="small" onClick={onClick}>
    {children}
  </Button>
);

export const sanitizedString = (
  e:
    | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    | ContentEditableEvent
): string => {
  const value = e.target.value != "" ? e.target.value : "";
  return value;
};

export const sanitizedNumber = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
): number => {
  const value = e.target.value != "" ? parseFloat(e.target.value) : 0;
  return value;
};

export const handleChangeNumber = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  key: string
): number => {
  const value = e.target.value != "" ? parseFloat(e.target.value) : 0;
  calculatorStore.changeAttribute(key, value);
  return value;
};

export const stripHTML = (htmlString: string): string => {
  return (
    htmlString &&
    htmlString
      .replace(/&amp;/g, "&")
      .replace(/&nbsp;/g, " ")
      .replace(/&gt;/g, ">")
      .replace(/<br>/g, " ")
      .replace(/&lt;/g, "<")
  );
};
