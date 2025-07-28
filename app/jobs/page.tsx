'use client'

import useStore from "@/lib/state-store/store";
import axios from "axios";
import Loader from "@/components/helperComponents/Loader";
import { useState , useEffect } from "react";
import ErrorComponent from "@/components/helperComponents/Error";

export default function Jobs() {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const parsedText = useStore((state) => (state.parsedText));

    async function APIcall() {
    try{
        const response = await axios.post("/api/ai-processing",
          { resumeText: parsedText }
        )

        console.log(response.data.suitableJobs);

    }catch(err){
        console.log("error" ,err);
        setError(true);
    }finally{
        setLoading(false);
    }
    }

    useEffect(() => {
        if(parsedText){
          setLoading(true);
          APIcall();  
        }
    }, [])

    if (loading) {
        return <Loader>
            <p className="text-xl text-gray-400">Analyzing your resume. Please wait....</p>
        </Loader>
    }

    return (
    <>
      {error && <ErrorComponent/>}
    </>
    );
}