import React from "react";
export function Checkbox({ checked, onChange, id }){
  return <input id={id} type="checkbox" checked={!!checked} onChange={e=>onChange?.(e.target.checked)} className="h-4 w-4 rounded border" />;
}
