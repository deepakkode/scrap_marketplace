import React from "react";
import { cn } from "../../utils/cn";
export default function Button({ as:Comp='button', className, children, disabled, ...props }){
  return <Comp className={cn('inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50', className)} disabled={disabled} {...props}>{children}</Comp>;
}
