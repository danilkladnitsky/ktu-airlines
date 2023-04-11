export const BotInviteKeyboard = {
  "buttons": [
    [
      {
        "action": {
          "type": "text",
          "label": "Подтвердить",
          "payload": "{\"status\": \"accept\"}"
        },
        "color": "positive"
      },
      {
        "action": {
          "type": "text",
          "label": "Отказаться",
          "payload": "{\"status\": \"decline\"}"
        },
        "color": "negative"
      }
    ]
  ],
  "inline": true
}