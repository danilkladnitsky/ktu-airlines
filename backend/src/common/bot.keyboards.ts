import { Keyboard } from "vk-io";
import { BotEventType } from "./bot.events";

export const BotInviteKeyboard = Keyboard.builder()
  .textButton({
    label: "Подтверждаю",
    payload: { type: BotEventType.INVITATION, value: "accepted" },
    color: Keyboard.POSITIVE_COLOR
  }).row().textButton({
    label: "Отказываюсь",
    payload: { type: BotEventType.INVITATION, value: "declined" },
    color: Keyboard.NEGATIVE_COLOR
  }).oneTime();

export const BotDeclineKeyboard = Keyboard.builder().textButton({
  label: "Отказаться от участия",
  payload: { type: BotEventType.INVITATION, value: "declined" },
  color: Keyboard.NEGATIVE_COLOR
}).oneTime().inline();