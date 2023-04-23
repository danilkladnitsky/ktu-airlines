import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { RoomWithServices } from 'domain/room';
import { getPermissions, UserBioData, UserMotivationLetter, UserServices, VKPermissions } from 'domain/user';

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
  incrementFormId: () => void;
  setFormId: (id: number) => void;
  selectTicket: () => void;
  resetTicket: () => void;
  setUserBio: (userBio: UserBioData) => void;
  setMotivationLetter: (letter: UserMotivationLetter) => void;
  selectRoom: (roomId: RoomWithServices) => void;
  checkPermissions: () => void;
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
}), {
  name: 'app-storage',
  storage: createJSONStorage(() => localStorage),
}));
