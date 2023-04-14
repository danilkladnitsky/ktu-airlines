export enum BotEventType {
    INVITATION = "invitation",
    FEEDBACK = "feedback",
}

export type BotMessageState = InvitationState;

export type InvitationState = {
    type: BotEventType.INVITATION,
    value: "accepted" | "declined"
}

export type FeedbackState = {
    type: BotEventType.FEEDBACK,
    value: "full" | "short"
}