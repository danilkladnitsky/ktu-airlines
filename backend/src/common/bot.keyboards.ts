import { BotEventType } from "./bot.events";

export const BotInviteKeyboard = {
  "buttons": [
    [
      {
        "action": {
          "type": "text",
          "label": "Подтвердить",
          "payload": { type: BotEventType.INVITATION, value: "accepted" }
        },
        "color": "positive"
      },
      {
        "action": {
          "type": "text",
          "label": "Отказаться",
          "payload": { type: BotEventType.INVITATION, value: "declined" }
        },
        "color": "negative"
      }
    ]
  ],
  "inline": true
}