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
  /** @xstate-layout N4IgpgJg5mDOIC5QGUC2BDATgFwAQBkBLKAC2wCMBXAG3IDoB7AMyYGIAHBgdzEzuwZQo1MAG0ADAF1EoTrELZCDAHYyQAD0QBWcQEY6ADi0BOAMwB2LQBoQAT0QAmEwF9nNtFjxFSFGvRV0sNjoigDGrKgMEGD8gsJiUmpyCkqqSBqIpg4GdObGAGwGljb2CFpZdFqu7hg4BMRkVLSMynShtqEiEVExAkIiEtLpyYoqappl4lp04vlauuIALLr5q6vmJYjmpsaV1SAedd6Nfi1tHV3qQSEx6EzYvAAUC+LiAJSsh14Nvs0B7Z0EkNZAx5KM0qAJk5FnRdOZFos8is1qtjJsEOZdDCqm4DrVvj4mv5Wph0MoIAxUN1orF+kCkqCUmN0hMtPC6KZ8sYkSj1ujyg49rivvVCacAqTyZTWFdgg86HcHphnq93p98aKTn8SWSKahBgywalxogETDzHN8k5VTb8ujjIt8kKap5Nb9iRxuLxafEDcNGeCTQhTKZxLCtFbrHZHC5hRrju6WqxQgxqAw+KESGSYH6QUbmZDMg5zHQHMZkby+dGELpdKZsfsRQmiaxyJgwOgANawXMgEbGlmIXQGMPicwGXROdErEs43HKHrwdJNn5Ew1MiEZGtY6eCm1LAwT8rmPKN+Or8UsdeBwdlBa5BZmYrVlbTHEuo4X7XXgeFhAOWZYXhRFy0rNFq1MHRKlVBw60xOYnHyM9XWbcVWmuMIfwLLdOUFBZdAjKdqwRMN3zxFCv2Jc5ASwzcJnrXZ8MIqNSitQUyJXMVtToSU9VooNymmJwtAAgwQ3EyD0SMBs4worj6DbBhOzATd+2wiYVgcdEnFnVxXCAA */
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
