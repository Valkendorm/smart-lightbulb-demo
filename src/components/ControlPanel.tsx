import React from "react";
import "./ControlPanel.css";

export function ControlPanel({ children }: React.PropsWithChildren) {
  return <div className="control-panel">{children}</div>;
}
