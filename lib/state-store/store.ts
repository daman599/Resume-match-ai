import { create } from 'zustand'

type StateType = {
    parsedText : string,
    updateParsedText : (text : string) => void 
}

const useStore = create<StateType>((set) => (
     {
        parsedText : "", 
        updateParsedText : (text) => set({ parsedText : text })
     }
))

export default useStore;