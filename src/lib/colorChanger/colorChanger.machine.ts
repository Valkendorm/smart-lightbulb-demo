import { assign, createMachine } from "xstate";

export const colorChangerMachine = createMachine(
  {
    context: ({ input }) => ({
      color: input?.color || "#000000",
    }),
    id: "Color Changer",
    initial: "idle",
    states: {
      idle: {
        on: {
          "color.change": {
            target: "throttling",
            actions: [
              {
                type: "queueColorChange",
              },
              {
                type: "onColorChange",
              },
            ],
          },
        },
      },
      throttling: {
        after: {
          "1000": {
            target: "#Color Changer.idle",
            actions: [
              {
                type: "onColorChange",
              },
            ],
            meta: {},
          },
        },
        on: {
          "color.change": {
            actions: {
              type: "queueColorChange",
            },
          },
        },
      },
    },
    types: {
      input: {} as { color?: string },
      events: {} as { type: "color.change"; color: string },
      context: {} as { color: string },
    },
  },
  {
    actions: {
      queueColorChange: assign({ color: ({ event }) => event.color }),
    },
  }
);
