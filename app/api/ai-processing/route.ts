import { NextRequest, NextResponse } from "next/server";
import { Groq } from 'groq-sdk';
import { FetchandCacheJobs } from "@/lib/fetch-jobs"
import { Job } from "@/lib/state-store";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {

  const body = await req.json();
  const resumeText = body.resumeText;

  try {
    const response = await FetchandCacheJobs();
    const latestJobs = response.latest_jobs;

    const completion = await groq.chat.completions.create({
      model: `llama-3.3-70b-versatile`,
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
      temperature: 0.3
    });

    const content: string | null = completion.choices[0]?.message?.content;
    const suitableJobs: Job[] = content ? JSON.parse(content) : [];
    return NextResponse.json({ suitableJobs });

  } catch (err: unknown) {
    console.error("AI processing failed:", err);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}