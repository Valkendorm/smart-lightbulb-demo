import { useActor } from "@xstate/react";
import { smartLightbulbMachine } from "../lib/smartLightbulb/smartLightbulb.v1.machine";
import { ControlPanel } from "../components/ControlPanel";
import { ControlPanelItem } from "../components/ControlPanelItem";
import { inspector } from "../lib/utils/inspector";

export function SmartLightbulbV1Demo() {
  const [state, send] = useActor(smartLightbulbMachine, {
    inspect: inspector.inspect,
  });
  const backgroundColor = state.matches("on") ? state.context.color : undefined;

  return (
    <div className="demo-page">
      <ControlPanel>
        <ControlPanelItem label="Power">
          <button
            onClick={() => send({ type: "toggle" })}
            disabled={!state.can({ type: "toggle" })}
          >
            Turn {state.matches("on") ? "Off" : "On"}
          </button>
        </ControlPanelItem>
        <ControlPanelItem label="Color">
          <input
            type="color"
            disabled={
              !state.can({ type: "color.change", color: state.context.color })
            }
            value={state.context.color}
            onChange={(event) =>
              send({ type: "color.change", color: event.target.value })
            }
          />
        </ControlPanelItem>
        <ControlPanelItem label="Usage">
          <button
            onClick={() => send({ type: "breaks" })}
            disabled={!state.can({ type: "breaks" })}
          >
            Breaks
          </button>
        </ControlPanelItem>
      </ControlPanel>
      <div className="lightbulb-container">
        <div className="lightbulb" style={{ backgroundColor }}>
          {state.matches("broken") && <span>💥</span>}
        </div>
      </div>
      <div className="embed">
        <iframe
          title="Smart Lightbulb Controller statechart"
          src="https://stately.ai/registry/editor/embed/4930e058-cdd2-411a-b414-0cb922713a48?machineId=0b612396-911a-4757-a08f-639bc160912d"
        />
      </div>
    </div>
  );
}
