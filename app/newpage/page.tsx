'use client'

import useStore from "@/lib/state-store";
import axios from "axios";
import { useEffect } from "react";

export default function Pageee(){
    const parsedText = useStore((state) => (state.parsedText));
    
    async function call(){
        const response = await axios.post("/api/resume-optimize",{resumeText:parsedText});
        console.log(response);
    }
    useEffect(()=>{
      call();
    },[])

    return (
        <p>hi there</p>
    );
}