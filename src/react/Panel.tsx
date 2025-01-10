import classNames from "classnames";
import type { ReactNode } from "react";
import type React from "react";

export type PanelProps = {
  title?: ReactNode;
  titleClassName?: string;
  children?: ReactNode;
  footer?: ReactNode;
  footerClassName?: string;
  className?: string;
};

export default function Panel({ title, titleClassName, children, footer, footerClassName, className }: PanelProps) {
  return (
    <div className={classNames("border rounded border-indigo-300", className)}>
      <div className={classNames("px-4 py-2 border-b border-indigo-300 font-bold bg-indigo-300", titleClassName)}>
        {title}
      </div>
      <div className="px-4 py-2">{children}</div>
      {footer && <div className={classNames("px-4 py-2 border-t border-indigo-300", footerClassName)}>{footer}</div>}
    </div>
  );
}
