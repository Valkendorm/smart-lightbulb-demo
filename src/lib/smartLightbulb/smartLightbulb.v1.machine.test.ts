import { test } from "vitest";
import {
  ActorRefFrom,
  EventFrom,
  StateValueFrom,
  createActor,
  matchesState,
} from "xstate";
import { smartLightbulbMachine } from "./smartLightbulb.v1.machine";
import { getRandomHexColor } from "../utils/colors";

// Test paths for `Smart Lightbulb v1`
// https://stately.ai/registry/editor/4930e058-cdd2-411a-b414-0cb922713a48?machineId=0b612396-911a-4757-a08f-639bc160912d

type System = {
  actor: ActorRefFrom<typeof smartLightbulbMachine>;
};
type Event = EventFrom<typeof smartLightbulbMachine>;
type State = { value: StateValueFrom<typeof smartLightbulbMachine> };

// Start the system under test (`sys`) with the given input (optional)
async function start(/* input */) {
  const sys: System = {
    actor: createActor(smartLightbulbMachine).start(),
  };
  return sys;
}

// Assert that the system under test (`sys`) is in the correct state
async function assertState(sys: System, state: State) {
  const snapshot = sys.actor.getSnapshot();
  if (!matchesState(snapshot.value, state.value)) {
    throw new Error(`Expected ${state.value}, received ${snapshot.value}`);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function executeEvent(sys: System, event: Event, _state: State) {
  // execute the event on the system under test
  switch (event.type) {
    case "breaks": {
      // Execute the action that results in
      // the "breaks" event occurring
      sys.actor.send({ type: "breaks" });
      break;
    }

    case "toggle": {
      // Execute the action that results in
      // the "toggle" event occurring
      sys.actor.send({ type: "toggle" });
      break;
    }

    case "color.change": {
      // Execute the action that results in
      // the "color.change" event occurring
      sys.actor.send({ type: "color.change", color: event.color });
      break;
    }

    default: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      throw new Error(`Unhandled event: ${event.type}`);
    }
  }
}

test("Reaches state Smart Lightbulb v1.off", async () => {
  const sys = await start();

  await assertState(sys, { value: "off" });

  await executeEvent(sys, { type: "toggle" }, { value: "on" });

  await assertState(sys, { value: "on" });

  await executeEvent(sys, { type: "toggle" }, { value: "off" });

  await assertState(sys, { value: "off" });
});

test("Reaches state Smart Lightbulb v1.broken", async () => {
  const sys = await start();

  await assertState(sys, { value: "off" });

  await executeEvent(sys, { type: "toggle" }, { value: "on" });

  await assertState(sys, { value: "on" });

  await executeEvent(sys, { type: "breaks" }, { value: "broken" });

  await assertState(sys, { value: "broken" });
});

test("Reaches state Smart Lightbulb v1.on", async () => {
  const sys = await start();

  await assertState(sys, { value: "off" });

  await executeEvent(sys, { type: "toggle" }, { value: "on" });

  await assertState(sys, { value: "on" });

  await executeEvent(
    sys,
    { type: "color.change", color: getRandomHexColor("#000000") },
    { value: "on" }
  );

  await assertState(sys, { value: "on" });
});

test("Reaches state Smart Lightbulb v1.broken", async () => {
  const sys = await start();

  await assertState(sys, { value: "off" });

  await executeEvent(sys, { type: "breaks" }, { value: "broken" });

  await assertState(sys, { value: "broken" });

  await executeEvent(sys, { type: "breaks" }, { value: "broken" });

  await assertState(sys, { value: "broken" });
});
