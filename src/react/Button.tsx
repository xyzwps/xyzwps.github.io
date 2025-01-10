import classNames from "classnames";
import type { Size } from "./Commons";

export type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  size?: Size | null | undefined;
};

export const buttonStyles = (className?: string, size?: Size) =>
  classNames(
    "border rounded outline-none",
    size === "sm" ? "px-2" : "px-4 py-2",
    "border-indigo-300",
    "hover:ring-2 hover:ring-indigo-200 hover:bg-indigo-50",
    "focus:ring-2 focus:ring-indigo-400 focus:bg-indigo-200",
    className,
  );

export default function Button({ size, className, ...props }: ButtonProps) {
  return <button className={buttonStyles(className, size)} {...props} />;
}
