import { useActor } from "@xstate/react";
import { smartLightbulbMachine } from "../lib/smartLightbulb/smartLightbulb.v3.machine";

export function SmartLightbulbV3Demo() {
  const [state, send] = useActor(smartLightbulbMachine);
  const backgroundColor = state.matches("on") ? state.context.color : undefined;

  return (
    <div className="container horizontal">
      <div className="controls">
        <h3>Power</h3>
        <button
          onClick={() => send({ type: "power.toggle" })}
          disabled={!state.can({ type: "power.toggle" })}
        >
          Turn {state.matches("on") ? "Off" : "On"}
        </button>
        <h3>Color</h3>
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
        <h3>Mode</h3>
        <button
          onClick={() => send({ type: "mode.toggle" })}
          disabled={!state.can({ type: "mode.toggle" })}
        >
          Toggle mode
        </button>
        <h3>Usage</h3>
        <button
          onClick={() => send({ type: "breaks" })}
          disabled={!state.can({ type: "breaks" })}
        >
          Breaks
        </button>
        <hr style={{ marginTop: 24 }} />
        <h3>Super Debug</h3>
        <pre>{JSON.stringify(state.value)}</pre>
      </div>
      <div className="lightbulb-container">
        <div className="lightbulb fast" style={{ backgroundColor }}>
          {state.matches("broken") && <span>💥</span>}
        </div>
      </div>
    </div>
  );
}
