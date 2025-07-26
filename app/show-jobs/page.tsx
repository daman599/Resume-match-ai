'use client'

import useStore from "@/lib/state-store/store";
import axios from "axios";
import Loader from "@/components/helperComponents/Loader";
import { useState , useEffect } from "react";

export default function Jobs() {

    const [loading, setLoading] = useState<boolean>(true);

    const parsedText = useStore((state) => (state.parsedText));

    async function APIcall() {
        try{
        const response = await axios.post("/api/ai-processing",
            { resumeText: parsedText }
        )
        setLoading(false);
    }catch(err){
        console.log("error" ,err)
    }
    }

    useEffect(() => {
        APIcall();  
    }, [])

    if (loading) {
        return <Loader>
            <p className="text-xl text-gray-400">Analyzing your resume. Please wait....</p>
        </Loader>
    }

    return (
    <>
     <div>hi therreeee</div>
    </>
    );
}