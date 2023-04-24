import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { RoomWithServices } from 'domain/room';
import { getPermissions, signIn, uploadPhoto, User, UserBioData, UserMotivationLetter, UserServices, VKPermissions } from 'domain/user';

type State = {
  activeFormId: number;
  ticketSelected: boolean;
  userBio: UserBioData | null;
  motivationLetter: UserMotivationLetter | null;
  selectedRoom: RoomWithServices | null,
  selectedServices: [UserServices];
  ticketsAreLoading: boolean;
  vkPermissions: VKPermissions | null;
  vkPermissionsLoading: boolean;
  uploadedThumbnail: string | null;
  formIsSending: boolean;
  incrementFormId: () => void;
  setFormId: (id: number) => void;
  selectTicket: () => void;
  resetTicket: () => void;
  setUserBio: (userBio: UserBioData) => void;
  setMotivationLetter: (letter: UserMotivationLetter) => void;
  selectRoom: (roomId: RoomWithServices) => void;
  checkPermissions: () => void;
  signIn: () => void;
  uploadUserThumbnail: (file: File) => void;
}

export const useAppStore = create(persist<State>((set, state) => ({
  activeFormId: 0,
  ticketSelected: false,
  userBio: null,
  motivationLetter: null,
  selectedRoom: null,
  ticketsAreLoading: false,
  vkPermissions: null,
  vkPermissionsLoading: false,
  uploadedThumbnail: null,
  formIsSending: false,
  selectedServices: ['bed_sheets'],
  incrementFormId: () => set(state => ({
    activeFormId: state.activeFormId + 1,
  })),
  resetTicket: () => set({ ticketSelected: false }),
  selectTicket: async () => {
    set(() => ({ ticketsAreLoading: true }));

    setTimeout(() => {
      set(() => ({ ticketSelected: true, ticketsAreLoading: false }));
    }, 2000);

  },
  uploadUserThumbnail: async (file: File) => {
    const { result } = await uploadPhoto(file);

    if (!result?.url) {
      return;
    }

    set({ uploadedThumbnail: result.url });
  },
  setFormId: (id: number) => set({ activeFormId: id }),
  setUserBio: (userBio) => set({ userBio }),
  setMotivationLetter: (letter) => set({ motivationLetter: letter }),
  selectRoom: (selectedRoom) => set(() => ({ selectedRoom })),
  checkPermissions: async () => {
    const { userBio } = state();

    set({ vkPermissionsLoading: true });

    if (!userBio?.vkLink) {
      return;
    }

    const { result } = await getPermissions(userBio.vkLink);

    set({ vkPermissions: result, vkPermissionsLoading: false });

  },
  signIn: async () => {
    set({ formIsSending: true });
    const { motivationLetter, userBio, selectedRoom } = state();

    const user: User = {
      motivationLetter,
      selectedServices: selectedRoom?.services || {},
      ...userBio,
    };

    await signIn(user);
    set({ formIsSending: false });

  },
}), {
  name: 'app-storage',
  storage: createJSONStorage(() => localStorage),
}));
