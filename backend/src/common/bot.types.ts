export enum BotEvents {
  SEND_MESSAGE = 'messages.send',
  PIN_MESSAGE = 'messages.pin',
  CHECK_IF_USER_IS_MEMBER = 'groups.isMember',
  GET_GROUP_MEMBERS = 'groups.getMembers',
  GET_VK_PROFILE = 'users.get',
  GET_CURRENT_GROUP = 'groups.getById',
  MESSAGES_ARE_ALLOWED = 'messages.isMessagesFromGroupAllowed',
}

export type PinMessageResponse = {
  id: Id;
  text: string;
};

export type ProfileFields = 'photo_50' | 'city';

// API functions
export type BotSendMessage = {
  user: Id | string;
  message: string;
  keyboard?: string;
};

export type VkProfileRequest = {
  user_ids: (string | number)[];
  fields?: string;
};

export type PinMessageRequest = {
  message_id: Id;
};

export type UserMembershipRequest = {
  user_id: Id;
  group_id: Id;
};

export type VkProfileResponse = {
  id: Id;
  first_name: string;
  last_name: string;
  is_closed: boolean;
};

export type VkGroupResponse = {
  id: Id;
};

export type MessageAllowedRequest = {
  user_id: Id;
};

export type MessagesAllowedResponse = {
  is_allowed: boolean;
};
