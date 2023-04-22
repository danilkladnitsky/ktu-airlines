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
  incrementFormId: () => void;
  setFormId: (id: number) => void;
  selectTicket: () => void;
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
  selectedServices: ['bed_sheets'],
  incrementFormId: () => set(state => ({
    activeFormId: state.activeFormId + 1,
  })),
  selectTicket: () => set(() => ({ ticketSelected: true })),
  setFormId: (id: number) => set({ activeFormId: id }),
  setUserBio: (userBio) => set({ userBio }),
  setMotivationLetter: (letter) => set({ motivationLetter: letter }),
  selectRoom: (selectedRoom) => set(() => ({ selectedRoom })),
}), {
  name: 'app-storage',
  storage: createJSONStorage(() => localStorage),
}));
