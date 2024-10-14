import { create } from 'zustand'

interface UiStore {
  isDrawerOpen: boolean
  isObjectiveInvalidPanelVisible: boolean
  dialogTitle: string
  dialogDescription: string
  dialogStatus: 'success' | 'warning' | 'info' | 'error'
  dialogVisible: boolean
  error: string | null
  toggleDrawer: () => void
  openDrawer: () => void
  closeDrawer: () => void
  toggleObjectiveInvalidPanel: () => void
  openObjectiveInvalidPanel: () => void
  closeObjectiveInvalidPanel: () => void
  showDialog: (title: string, description: string, status: 'success' | 'warning' | 'info' | 'error') => void
  hideDialog: () => void
}

export const useUiStore = create<UiStore>((set) => ({
  isDrawerOpen: false,
  isObjectiveInvalidPanelVisible: false,
  dialogVisible: false,
  dialogTitle: 'Error', // Default title
  dialogDescription: 'An unexpected error occurred.', // Default description
  dialogStatus: 'error', // Default status
  error: null, // No error by default
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
  toggleObjectiveInvalidPanel: () => set((state) => ({ isObjectiveInvalidPanelVisible: !state.isObjectiveInvalidPanelVisible })),
  openObjectiveInvalidPanel: () => set({ isObjectiveInvalidPanelVisible: true }),
  closeObjectiveInvalidPanel: () => set({ isObjectiveInvalidPanelVisible: false }),
  
  // Method to show dialog with custom title, description, and status
  showDialog: (title, description, status) => set({
    dialogTitle: title,
    dialogDescription: description,
    dialogStatus: status,
    dialogVisible: true
  }),

  // Method to hide the dialog
  hideDialog: () => set({
    dialogTitle: '',
    dialogDescription: '',
    dialogStatus: 'info',
    dialogVisible: false,
    error: null
  })
}))
