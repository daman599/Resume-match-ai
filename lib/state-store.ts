import { create } from 'zustand'

type JobType = {
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

type StateType = {
    parsedText : string,
    updateParsedText : (text : string) => void ,
    jobs : JobType[],
    updateJobs : (jobs :JobType[]) => void ,
}

const useStore = create<StateType>((set) => (
     {
        parsedText : "", 
        updateParsedText : (text) => set({ parsedText : text }),
        jobs : [],
        updateJobs :(jobs) => set({ jobs }),
     }
))

export default useStore;