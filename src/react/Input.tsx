import classNames from "classnames";
import type React from "react";
import type { Size, Varient } from "./Commons";
import type { DetailedHTMLProps, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

const inputStyles = (className?: string, size?: Size, noborder?: boolean, varient?: Varient) =>
  classNames(
    noborder || "border",
    "rounded outline-none",
    size === "sm" ? "px-2" : "px-4 py-2",
    varient === "error" ? "border-red-300" : "border-indigo-300",
    varient === "error" ? "bg-red-50" : null,
    "hover:ring-2",
    varient === "error" ? "hover:ring-red-200" : "hover:ring-indigo-200",
    varient === "error" ? "hover:bg-red-50" : "hover:bg-indigo-50",
    "focus:ring-2 focus:bg-white",
    varient === "error" ? "focus:ring-red-400" : "focus:ring-indigo-400",
    className,
  );

export type InputProps = Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "size"> & {
  size?: Size | null | undefined;
  noborder?: boolean | null | undefined;
  varient?: Varient;
};

export default function Input({ className, size, noborder, varient, ...props }: InputProps) {
  return <input className={inputStyles(className, size, noborder, varient)} {...props} />;
}

export type TextAreaProps = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & {
  size?: Size | null | undefined;
  noborder?: boolean | null | undefined;
};

export function TextArea({ className, size, noborder, ...props }: TextAreaProps) {
  return <textarea className={inputStyles(className, size, noborder)} {...props} />;
}
