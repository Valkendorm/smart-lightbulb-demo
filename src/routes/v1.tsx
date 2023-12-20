import { useActor } from "@xstate/react";
import { smartLightbulbMachine } from "../lib/smartLightbulb/smartLightbulb.v1.machine";

export function SmartLightbulbV1Demo() {
  const [state, send] = useActor(smartLightbulbMachine);
  const backgroundColor = state.matches("on") ? state.context.color : undefined;

  return (
    <div className="container horizontal">
      <div className="controls">
        <h3>Power</h3>
        <button
          onClick={() => send({ type: "toggle" })}
          disabled={!state.can({ type: "toggle" })}
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
        <h3>Usage</h3>
        <button
          onClick={() => send({ type: "breaks" })}
          disabled={!state.can({ type: "breaks" })}
        >
          Breaks
        </button>
      </div>
      <div className="lightbulb-container">
        <div className="lightbulb" style={{ backgroundColor }}>
          {state.matches("broken") && <span>💥</span>}
        </div>
      </div>
    </div>
  );
}
