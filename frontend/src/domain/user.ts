import { fetchApi, FetchResponse, GET_VK_PERMISSIONS, USER_IS_SUBSCRIBED } from 'shared/api';

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
  thumbnailUrl: string;
}

export type UserMotivationLetter = {
  about_baggage: string;
  about_cocktail: string;
  about_vacation: string;
  about_plane: string;
}

export type VKPermissions = {
  isMember: boolean;
  canReceiveMessages: boolean;
}

export async function getPermissions(vkLink: VKLink)
  : Promise<FetchResponse<VKPermissions>> {
  return await fetchApi(GET_VK_PERMISSIONS(vkLink));
}
