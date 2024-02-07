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
    /** @xstate-layout N4IgpgJg5mDOIC5QGUC2BDATgFwAQBkBLKAC2wCMBXAG3NlwGEB7AO20yeurEwGIBjTk0wA6fiXQsYAbQAMAXUSgADk1iFshVkpAAPRACYAbAZFGALLJMBWADQgAnolkBfF-bRY8RUhRp1GVnZObj5UJggwEQAqOUUkEFV1TW0E-QRjUwsrAztHRABGWVd3EE8cAmIyKlp6ZjYOLh5eVQB3Hhi4nSSNLRYddMyzSxt7Jwzitw8MCp9q-zqgxtDeckwwdABrWC6EnpT+tMMTYZy88YBmSamQFgi4HXLvKr9awIaQnm61XtTQdNkY2cbjcQA */
    context: {
      lightbulbRefs: [],
    },
    id: "Smart Lightbulbs Controller",
    entry: {
      type: "assignLightbulbs",
      params: {
        count: 100,
      },
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
      actions:
        | { type: "assignLightbulbs"; params: { count: number } }
        | { type: "forwardToLightbulbs" };
    },
  },
  {
    actions: {
      assignLightbulbs: assign({
        lightbulbRefs: ({ spawn }, params) => {
          const lightbulbRefs = Array.from({ length: params.count }, () =>
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
