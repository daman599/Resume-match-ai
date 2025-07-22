import { NextRequest, NextResponse } from "next/server";
import OpenAI from 'openai';

const groq = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: NextRequest) {

    const body = await req.json();
    const resumeText = body.resumeText;

    const completion = await groq.chat.completions.create({
        model: "llama3-70b-8192",
        messages: [
            {
                role: 'user',
                content: `
                 I will give you a parsed resume text. 
                 Your job:
                - Identify key skills, job roles, and industry from the resume.
                - Search for top 6 recent, remote-friendly job openings relevant to this skillset.
                - For each job, provide:
                - Job Title
                - Company Name
                - Direct Apply Link (reliable, working URL)
                If you can't find an exact match, suggest close alternatives. 

                Here is the resume text:
                ${resumeText}
                `
            },
        ],
    });

    console.log(completion.choices[0].message.content);

    return NextResponse.json({ "done": "processing done" })

}