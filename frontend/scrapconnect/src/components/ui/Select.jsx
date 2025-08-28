import React from "react";
export default function Select({ value, onChange, children, className }){
  return <select value={value} onChange={e=>onChange?.(e.target.value)} className={className}>{children}</select>;
}
