import { NextRequest, NextResponse } from "next/server";
import { Groq } from 'groq-sdk';
import mongoose from "mongoose";
import { FetchandCacheJobs } from "../../../lib/fetch-jobs"

await mongoose.connect(process.env.MONGODB_URI!);

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {

    const body = await req.json();
    const resumeText = body.resumeText;

    const object = await FetchandCacheJobs();
    const latestJobs = object.latest_jobs;
    
    try{

    const completion = await groq.chat.completions.create({
      model: `gemma2-9b-it`,
      messages: [
      {
        role: 'user',
        content: `
       You are an intelligent job-matching assistant.

       I will provide you with:
       1. A candidate's resume as plain text.
       2. A list of job openings, each as an object in a JSON array.

       ### Your task:
       Analyze the resume to understand the candidate's:
       - Skills
       - Experience
       - Education
       - Job roles they are suited for

       Then evaluate each job in the list to determine if it matches the candidate’s profile.

       ### Output format:
       Return ONLY the job objects from the list that are **relevant and well-suited** for the candidate.
       Do not include any explanation or additional text.
       Respond in **strict JSON format** — an array of matching job objects.

       ---

       ### Candidate Resume:
       ${resumeText}

       ---

       ### Job Listings:
       ${JSON.stringify(latestJobs)}

       ---

       Now, return only the matching jobs in a clean JSON array.
         `
      }
      ],
      temperature: 0.3 ,
      max_completion_tokens: 1024,
      top_p: 1,
      stop: null
    });
    
     const content:string | null = completion.choices[0]?.message?.content;
     const suitableJobs:object[] = content ? JSON.parse(content) : [];
     return NextResponse.json({ suitableJobs: suitableJobs});

    }catch(err:any){
      return NextResponse.json(
        {error : "Something went wrong"},
        {status : 500}
      );
    }
}