import { create } from 'zustand';

import { UserBioData } from 'domain/user';

type State = {
  activeFormId: number;
  ticketSelected: boolean;
  userBio: UserBioData | null;
  incrementFormId: () => void;
  setFormId: (id: number) => void;
  selectTicket: () => void;
  setUserBio: (userBio: UserBioData) => void;
}

export const useAppStore = create<State>((set) => ({
  activeFormId: 0,
  ticketSelected: false,
  userBio: null,
  incrementFormId: () => set(state => ({
    activeFormId: state.activeFormId + 1,
  })),
  selectTicket: () => set(() => ({ ticketSelected: true })),
  setFormId: (id: number) => set({ activeFormId: id }),
  setUserBio: (userBio) => set({ userBio }),
}));
