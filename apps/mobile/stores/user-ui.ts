import { create } from 'zustand'

interface UiStore {
  isDrawerOpen: boolean
  isValidationPanelVisible: boolean
  toggleDrawer: () => void
  openDrawer: () => void
  closeDrawer: () => void
  toggleValidationPanel: () => void
  openValidationPanel: () => void
  closeValidationPanel: () => void
}

export const useUiStore = create<UiStore>((set) => ({
  isDrawerOpen: false,
  isValidationPanelVisible: false,
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
  toggleValidationPanel: () => set((state) => ({ isValidationPanelVisible: !state.isValidationPanelVisible })),
  openValidationPanel: () => set({ isValidationPanelVisible: true }),
  closeValidationPanel: () => set({ isValidationPanelVisible: false })
}))
