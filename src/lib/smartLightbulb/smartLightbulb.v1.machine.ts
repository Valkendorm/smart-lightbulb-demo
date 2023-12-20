import { assertEvent, assign, setup } from "xstate";

export const smartLightbulbMachine = setup({
  types: {} as {
    events:
      | { type: "color.change"; color: string }
      | { type: "breaks" }
      | { type: "toggle" };
    context: { color: string };
  },
  actions: {
    assignColor: assign({
      color: ({ event }) => {
        assertEvent(event, "color.change");
        return event.color;
      },
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
        toggle: {
          target: "on",
        },
      },
    },
    on: {
      on: {
        toggle: {
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
