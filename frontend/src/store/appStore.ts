import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { RoomWithServices } from 'domain/room';
import { UserBioData, UserMotivationLetter, UserServices } from 'domain/user';

type State = {
  activeFormId: number;
  ticketSelected: boolean;
  userBio: UserBioData | null;
  motivationLetter: UserMotivationLetter | null;
  selectedRoom: RoomWithServices | null,
  selectedServices: [UserServices];
  ticketsAreLoading: boolean;
  incrementFormId: () => void;
  setFormId: (id: number) => void;
  selectTicket: () => void;
  resetTicket: () => void;
  setUserBio: (userBio: UserBioData) => void;
  setMotivationLetter: (letter: UserMotivationLetter) => void;
  selectRoom: (roomId: RoomWithServices) => void;
}

export const useAppStore = create(persist<State>((set) => ({
  activeFormId: 0,
  ticketSelected: false,
  userBio: null,
  motivationLetter: null,
  selectedRoom: null,
  ticketsAreLoading: false,
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
}), {
  name: 'app-storage',
  storage: createJSONStorage(() => localStorage),
}));
