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
  /** @xstate-layout N4IgpgJg5mDOIC5QGUC2BDATgFwAQBkBLKAC2wCMBXAG3IDoB7AMyYGJsGopqwBtABgC6iUAAcGsQtkIMAdiJAAPRABYArAE46agIxqAbACY1AGhABPRMY0BfG2bRY8RUhRr057Ttz5CF4yWk5BWUEAGYw-jo9I1MLK007BwwcAmIyKlpGWVYAYwZqBkw6XJJ0WRgBYSQQAKkZeRrQwwAOFWj+DTCAdjjLBHUw7SSQR1SXDPdWckwwdABrWCr-CXrgpsQdFqj+bpadYzN+nX1u4ZHZBgg4BTHndLdaFcCGkM2dFSPNwxG7tNdMh4WM81o1QKEwiohi0wpoen1Nvo1Odkk5-pMsusxKsgmClFZInQVPxYl9wsSUaMUvcAe46DMGPMwHi6ri3ggToYycYzmo7HYgA */
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

      description: `Lightbulb is powered on and emits light.`
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
