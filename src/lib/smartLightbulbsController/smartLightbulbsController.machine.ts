import {
  ActorRefFrom,
  EventFrom,
  assign,
  createMachine,
  enqueueActions,
  sendTo,
} from "xstate";
import { smartLightbulbMachine } from "../smartLightbulb/smartLightbulb.v3.machine";

export const smartLightbulbsControllerMachine = createMachine(
  {
    context: {
      lightbulbRefs: [],
    },
    id: "Smart Lightbulbs Controller",
    entry: {
      type: "assignLightbulbs",
    },
    on: {
      "color.change": {
        actions: {
          type: "forwardToLightbulbs",
        },
      },
      "mode.*": {
        actions: {
          type: "forwardToLightbulbs",
        },
      },
      "power.*": {
        actions: {
          type: "forwardToLightbulbs",
        },
      },
      breaks: {
        actions: {
          type: "forwardToLightbulbs",
        },
      },
    },
    types: {} as {
      events: EventFrom<typeof smartLightbulbMachine>;
      context: {
        lightbulbRefs: ActorRefFrom<typeof smartLightbulbMachine>[];
      };
      actions: { type: "assignLightbulbs" } | { type: "forwardToLightbulbs" };
    },
  },
  {
    actions: {
      assignLightbulbs: assign({
        lightbulbRefs: ({ spawn }) => {
          const lightbulbRefs = Array.from({ length: 100 }, () =>
            spawn(smartLightbulbMachine)
          );
          return lightbulbRefs;
        },
      }),
      forwardToLightbulbs: enqueueActions(({ context, event, enqueue }) => {
        context.lightbulbRefs.forEach((actorRef) =>
          enqueue(sendTo(actorRef, event))
        );
      }),
    },
  }
);
