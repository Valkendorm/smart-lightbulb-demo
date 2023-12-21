import { useActor, useSelector } from "@xstate/react";
import { ActorRefFrom } from "xstate";
import { smartLightbulbMachine } from "../lib/smartLightbulb/smartLightbulb.v3.machine";
import { smartLightbulbsControllerMachine } from "../lib/smartLightbulbsController/smartLightbulbsController.machine";
import { ControlPanel } from "../components/ControlPanel";
import { ControlPanelItem } from "../components/ControlPanelItem";

function Lightbulb({
  actorRef,
}: {
  actorRef: ActorRefFrom<typeof smartLightbulbMachine>;
}) {
  const color = useSelector(actorRef, (snapshot) =>
    snapshot.matches("on") ? snapshot.context.color : undefined
  );
  const tags = useSelector(actorRef, (snapshot) => snapshot.tags);
  const isBroken = useSelector(actorRef, (snapshot) =>
    snapshot.matches("broken")
  );
  const canChangeColor = useSelector(actorRef, (snapshot) =>
    snapshot.can({ type: "color.change", color: snapshot.context.color })
  );

  return (
    <div className="lightbulb-container">
      <div
        className={["lightbulb", "fast", ...tags].join(" ")}
        style={{ backgroundColor: color }}
        onClick={() => actorRef.send({ type: "mode.toggle" })}
        onDoubleClick={() => actorRef.send({ type: "power.toggle" })}
      >
        {isBroken && <span>💥</span>}
      </div>
      <input
        type="color"
        value={color}
        disabled={!canChangeColor}
        onChange={(event) =>
          actorRef.send({ type: "color.change", color: event.target.value })
        }
      />
      <input
        type="radio"
        checked={false}
        onChange={() => actorRef.send({ type: "breaks" })}
      />
      <pre>{JSON.stringify(actorRef.getSnapshot().value)}</pre>
    </div>
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
          <input
            type="color"
            onChange={(event) =>
              send({ type: "color.change", color: event.target.value })
            }
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
      </div>
    </div>
  );
}
