import { useActor } from "@xstate/react";
import { smartLightbulbMachine } from "../lib/smartLightbulb/smartLightbulb.v3.machine";
import { ControlPanel } from "../components/ControlPanel";
import { ControlPanelItem } from "../components/ControlPanelItem";
import { inspector } from "../lib/utils/inspector";

export function SmartLightbulbV3Demo() {
  const [state, send] = useActor(smartLightbulbMachine, {
    inspect: inspector.inspect,
  });
  const backgroundColor = state.matches("on") ? state.context.color : undefined;

  return (
    <div className="demo-page">
      <ControlPanel>
        <ControlPanelItem label="Power">
          <button
            onClick={() => send({ type: "power.toggle" })}
            disabled={!state.can({ type: "power.toggle" })}
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
          <pre>{state.context.color}</pre>
        </ControlPanelItem>
        <ControlPanelItem label="Mode">
          <button
            onClick={() => send({ type: "mode.toggle" })}
            disabled={!state.can({ type: "mode.toggle" })}
          >
            Toggle mode
          </button>
        </ControlPanelItem>
        <ControlPanelItem label="Usage">
          <button
            onClick={() => send({ type: "breaks" })}
            disabled={!state.can({ type: "breaks" })}
          >
            Breaks
          </button>
        </ControlPanelItem>
        <ControlPanelItem label="State">
          <pre>{JSON.stringify(state.value)}</pre>
        </ControlPanelItem>
      </ControlPanel>
      <div className="lightbulb-container">
        <div className="lightbulb fast" style={{ backgroundColor }}>
          {state.matches("broken") && <span>💥</span>}
        </div>
      </div>
      <div className="embed">
        <iframe
          title="Smart Lightbulb statechart"
          src="https://stately.ai/registry/editor/embed/4930e058-cdd2-411a-b414-0cb922713a48?machineId=24735b2e-e307-42b7-a243-0c7bca007c23&mode=Design"
        />
      </div>
    </div>
  );
}
