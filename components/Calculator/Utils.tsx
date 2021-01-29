import * as React from "react";
import Button from "@material-ui/core/Button";
import { ContentEditableEvent } from "react-contenteditable";

export interface AddButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  "data-testid"?: string;
}

export const AddButton: React.FC<AddButtonProps> = ({
  onClick,
  children,
  "data-testid": dataTestId,
}: AddButtonProps) => (
  <Button
    data-testid={dataTestId}
    variant="outlined"
    color="primary"
    size="small"
    onClick={onClick}
  >
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
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
): number => {
  const value = e.target.value != "" ? parseFloat(e.target.value) : 0;
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
