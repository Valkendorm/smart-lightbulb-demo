import { useActor, useSelector } from "@xstate/react";
import { useReducer } from "react";
import { Link } from "react-router-dom";
import { ActorRefFrom } from "xstate";
import { ControlPanel } from "../components/ControlPanel";
import { ControlPanelItem } from "../components/ControlPanelItem";
import { colorChangerMachine } from "../lib/colorChanger/colorChanger.machine";
import { smartLightbulbMachine } from "../lib/smartLightbulb/smartLightbulb.v3.machine";
import { smartLightbulbsControllerMachine } from "../lib/smartLightbulbsController/smartLightbulbsController.machine";

function Lightbulb({
  actorRef,
}: {
  actorRef: ActorRefFrom<typeof smartLightbulbMachine>;
}) {
  const [open, toggleOpen] = useReducer((state) => !state, false);
  const color = useSelector(actorRef, (snapshot) =>
    snapshot.matches("on") ? snapshot.context.color : undefined
  );
  const tags = useSelector(actorRef, (snapshot) => snapshot.tags);
  const isPoweredOn = useSelector(actorRef, (snapshot) =>
    snapshot.matches("on")
  );
  const isBroken = useSelector(actorRef, (snapshot) =>
    snapshot.matches("broken")
  );
  const canChangeColor = useSelector(actorRef, (snapshot) =>
    snapshot.can({ type: "color.change", color: snapshot.context.color })
  );

  return (
    <div className="lightbulb-container">
      <div
        className={["lightbulb", "interactive", "fast", ...tags].join(" ")}
        style={{ backgroundColor: color }}
        onClick={toggleOpen}
      >
        {isBroken && <span>💥</span>}
      </div>
      <dialog open={open}>
        <ControlPanelItem label="Power">
          <button onClick={() => actorRef.send({ type: "power.toggle" })}>
            Power {isPoweredOn ? "Off" : "On"}
          </button>
        </ControlPanelItem>
        <ControlPanelItem label="Color">
          <input
            disabled={!canChangeColor}
            type="color"
            value={color}
            onChange={(event) =>
              actorRef.send({ type: "color.change", color: event.target.value })
            }
          />
        </ControlPanelItem>
        <ControlPanelItem label="Mode">
          <button onClick={() => actorRef.send({ type: "mode.toggle" })}>
            Toggle
          </button>
        </ControlPanelItem>
        <ControlPanelItem label="Usage">
          <button onClick={() => actorRef.send({ type: "breaks" })}>
            Breaks
          </button>
        </ControlPanelItem>
        <ControlPanelItem label="State">
          <pre>{JSON.stringify(actorRef.getSnapshot().value)}</pre>
        </ControlPanelItem>
        <hr />
        <div className="footer">
          <button onClick={toggleOpen}>Close</button>
        </div>
      </dialog>
    </div>
  );
}

function ColorPicker({ onChange }: { onChange: (color: string) => void }) {
  const [state, send] = useActor(
    colorChangerMachine.provide({
      actions: {
        onColorChange: ({ context }) => onChange(context.color),
      },
    })
  );

  return (
    <input
      defaultValue={state.context.color}
      type="color"
      onChange={(event) =>
        send({ type: "color.change", color: event.target.value })
      }
    />
  );
}

export function SmartLightbulbV4Demo() {
  const [state, send] = useActor(smartLightbulbsControllerMachine);

  return (
    <div className="demo-page">
      <ControlPanel>
        <ControlPanelItem label="Power">
          <button onClick={() => send({ type: "power.toggle" })}>
            Toggle power
          </button>
        </ControlPanelItem>
        <ControlPanelItem label="Color">
          <ColorPicker
            onChange={(color) => send({ type: "color.change", color })}
          />
        </ControlPanelItem>
        <ControlPanelItem label="Mode">
          <button onClick={() => send({ type: "mode.toggle" })}>
            Toggle mode
          </button>
        </ControlPanelItem>
        <ControlPanelItem label="Usage">
          <button onClick={() => send({ type: "breaks" })}>Break bulbs</button>
        </ControlPanelItem>
      </ControlPanel>
      <div className="grid">
        {state.context.lightbulbRefs.map((actorRef, index) => (
          <Lightbulb actorRef={actorRef} key={index} />
        ))}
      </div>
      <div className="embed">
        <iframe
          title="Smart Lightbulbs Controller statechart"
          src="https://stately.ai/registry/editor/embed/4930e058-cdd2-411a-b414-0cb922713a48?mode=design&machineId=8dda3992-8f0e-499d-afea-ce034e05c79e"
        />
        <p>
          For individual lightbulbs flow, look at the{" "}
          <Link to="/random-colors">previous demo</Link>.
        </p>
      </div>
    </div>
  );
}
