import { fetchApi, FetchResponse, GET_VK_PERMISSIONS, SIGN_IN } from 'shared/api';

export type UserServices = 'bed_sheets' | 'vegan_menu';

export type User = UserBioData & {
  motivationLetter: UserMotivationLetter;
  selectedServices: [UserServices];
}

export type UserBioData = {
  firstName: string;
  lastName: string;
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

export async function signIn(user: User)
  : Promise<FetchResponse<VKPermissions>> {

  const { motivationLetter, isuNumber, selectedServices, ...restProps } = user;

  const payload = {
    ...restProps,
    isuNumber: +isuNumber,
    selectedServices: (selectedServices || []).join(','),
    motivationLetter: Object.entries(([title, content]: [string, string]) => `${title}: ${content}`).join('\n'),
  };

  return await fetchApi(SIGN_IN(), JSON.stringify(payload));
}
