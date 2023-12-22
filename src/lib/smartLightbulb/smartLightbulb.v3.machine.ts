import { assertEvent, assign, setup } from "xstate";
import { getNextHexColor, getRandomHexColor } from "../utils/colors";

export const smartLightbulbMachine = setup({
  types: {} as {
    events:
      | { type: "color.change"; color: string }
      | { type: "breaks" }
      | { type: "power.toggle" }
      | { type: "mode.toggle" };
    context: { color: string };
  },
  actions: {
    assignColor: assign({
      color: ({ event }) => {
        assertEvent(event, "color.change");
        return event.color;
      },
    }),
    assignNextColor: assign({
      color: ({ context }) => getNextHexColor(context.color),
    }),
    assignRandomColor: assign({
      color: ({ context }) => getRandomHexColor(context.color),
    }),
  },
}).createMachine({
  id: "Smart Lightbulb",
  context: {
    color: "#ff0000",
  },
  initial: "off",
  states: {
    off: {
      on: {
        "power.toggle": {
          target: "on",
        },
      },
    },
    on: {
      initial: "static",
      states: {
        static: {
          on: {
            "mode.toggle": {
              target: "cycle",
            },
          },
        },
        cycle: {
          after: {
            "1000": {
              target: "#Smart Lightbulb.on.cycle",
              actions: [
                {
                  type: "assignNextColor",
                },
              ],
              meta: {},
              reenter: true,
            },
          },
          on: {
            "mode.toggle": {
              target: "random",
            },
          },
        },
        random: {
          after: {
            "1000": {
              target: "#Smart Lightbulb.on.random",
              actions: [
                {
                  type: "assignRandomColor",
                },
              ],
              reenter: true,
            },
          },
          on: {
            "mode.toggle": {
              target: "static",
            },
          },
        },
      },
      on: {
        "power.toggle": {
          target: "off",
        },
        "color.change": {
          actions: {
            type: "assignColor",
          },
        },
      },
    },
    broken: {
      type: "final",
    },
  },
  on: {
    breaks: {
      target: ".broken",
    },
  },
});
