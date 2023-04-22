import { fetchApi, FetchResponse, USER_IS_SUBSCRIBED } from 'shared/api';

export type UserServices = 'bed_sheets' | 'vegan_menu';

export type User = UserBioData & {
  motivationLetter: UserMotivationLetter;
  selectedServices: [UserServices];
}

export type UserBioData = {
  firstName: string;
  secondName: string;
  isuNumber: ISUNumber;
  groupName: GroupName;
  phoneNumber: PhoneNumber;
  vkLink: VKLink;
}

export type UserMotivationLetter = {
  about_baggage: string;
  about_cocktail: string;
  about_vacation: string;
  about_plane: string;
}

export function isSubscribed(user: User): Promise<FetchResponse<boolean>> {
  return fetchApi<boolean>(USER_IS_SUBSCRIBED(user.vkLink));
}

export function canReceiveMessages(user: User): Promise<boolean> {
  return new Promise<boolean>((resolve) => resolve(true));
}
