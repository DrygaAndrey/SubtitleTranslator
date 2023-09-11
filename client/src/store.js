import { create } from 'zustand';
import { devtools } from 'zustand/middleware'

const useStore = create(devtools((set) => ({
  file: null,
  loading: false,
  setLoading: (boolean) => set({ loading: boolean }),
  setFile: (newFile) => set({ file: newFile }),
})));

export default useStore;