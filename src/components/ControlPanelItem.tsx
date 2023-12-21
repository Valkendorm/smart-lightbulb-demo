import React from "react";
import "./ControlPanelItem.css";

type ControlPanelItemProps = React.PropsWithChildren<{ label: string }>;

export function ControlPanelItem({ label, children }: ControlPanelItemProps) {
  return (
    <div className="control-panel-item">
      <label>{label}</label>
      {children}
    </div>
  );
}
