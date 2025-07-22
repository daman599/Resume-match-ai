'use client'

import useStore from "@/store";
import axios from "axios";
import Loader from "@/components/Loader";
import { useState, useEffect } from "react";

export default function Results() {

    const [loading, setLoading] = useState<boolean>(true);
    const parsedText = useStore((state) => (state.parsedText));

    async function APIcall() {
        const response = await axios.post("http://localhost:3000/api/ai-processing",
            { resumeText: parsedText }
        )
        console.log(response.data);
        setLoading(false);
    }

    useEffect(() => {
        APIcall();  
    }, [])

    if (loading) {
        return <Loader />
    }

    return (
        <div className="text-red-800">Results ............</div>
    );
}