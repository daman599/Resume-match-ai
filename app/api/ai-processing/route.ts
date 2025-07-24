import { NextRequest, NextResponse } from "next/server";
import OpenAI from 'openai';
import mongoose from "mongoose";
import { Jobs } from "../jobs/route"

await mongoose.connect(process.env.MONGODB_URI!);

const groq = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: NextRequest) {
    
    const body = await req.json();
    const resumeText = body.resumeText;
    
    const res = await Jobs();
    const json = await res.json();
    const jobs = json.jobs;
    
    console.log(jobs);
    return NextResponse.json({ "done": "processing done" })
}