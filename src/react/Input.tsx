import classNames from "classnames";
import type React from "react";
import type { Size } from "./Commons";
import type { DetailedHTMLProps, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

const inputStyles = (className?: string, size?: Size, noborder?: boolean) =>
  classNames(
    noborder || "border",
    "rounded outline-none",
    size === "sm" ? "px-2" : "px-4 py-2",
    "border-indigo-300",
    "hover:ring-2 hover:ring-indigo-200 hover:bg-indigo-50",
    "focus:ring-2 focus:ring-indigo-400 focus:bg-white",
    className,
  );

export type InputProps = Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "size"> & {
  size?: Size | null | undefined;
  noborder?: boolean | null | undefined;
};

export default function Input({ className, size, noborder, ...props }: InputProps) {
  return <input className={inputStyles(className, size, noborder)} {...props} />;
}

export type TextAreaProps = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & {
  size?: Size | null | undefined;
  noborder?: boolean | null | undefined;
};

export function TextArea({ className, size, noborder, ...props }: TextAreaProps) {
  return <textarea className={inputStyles(className, size, noborder)} {...props} />;
}
