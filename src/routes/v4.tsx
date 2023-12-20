import { useActor, useSelector } from "@xstate/react";
import { ActorRefFrom } from "xstate";
import { smartLightbulbMachine } from "../lib/smartLightbulb/smartLightbulb.v3.machine";
import { smartLightbulbsControllerMachine } from "../lib/smartLightbulbsController/smartLightbulbsController.machine";

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
    <>
      <div className="controls">
        <h3>Power</h3>
        <button onClick={() => send({ type: "power.toggle" })}>
          Toggle power
        </button>
        <h3>Color</h3>
        <input
          type="color"
          onChange={(event) =>
            send({ type: "color.change", color: event.target.value })
          }
        />
        <h3>Mode</h3>
        <button onClick={() => send({ type: "mode.toggle" })}>
          Toggle mode
        </button>
        <h3>Usage</h3>
        <button onClick={() => send({ type: "breaks" })}>Break bulbs</button>
      </div>
      <div className="grid">
        {state.context.lightbulbRefs.map((actorRef, index) => (
          <Lightbulb actorRef={actorRef} key={index} />
        ))}
      </div>
    </>
  );
}
