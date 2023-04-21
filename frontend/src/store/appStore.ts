import { create } from 'zustand';

type State = {
    activeFormId: number;
    ticketSelected: boolean;
    incrementFormId: () => void;
    selectTicket: () => void;
}

export const useAppStore = create<State>((set) => ({
  activeFormId: 0,
  ticketSelected: false,
  incrementFormId: () => set(state => ({
    activeFormId: state.activeFormId + 1,
  })),
  selectTicket: () => set(() => ({ ticketSelected: true })),
}));
