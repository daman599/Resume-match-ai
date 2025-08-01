import { create } from 'zustand'

interface Job {
    _id: string,
    jobId: string,
    title: string,
    location: string,
    company: string,
    jobCategory: string,
    redirect_url: string,
    description: string,
    createdAt: string,
    __v: number,
}

interface StateType {
    parsedText : string,
    updateParsedText : (text : string) => void ,
    jobs : Job[],
    updateJobs : (jobs :Job[]) => void ,
    tips : string[],
    updateTips : ( tips :string[]) => void ,
}

const useStore = create<StateType>((set) => (
     {
        parsedText : "", 
        updateParsedText : (text) => set({ parsedText : text }),
        jobs : [],
        updateJobs :(jobs) => set({ jobs }),
        tips : [],
        updateTips : (tips) => set({ tips }),
     }
))

export default useStore;