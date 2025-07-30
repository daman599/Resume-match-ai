import { NextRequest, NextResponse } from "next/server";
import { Groq } from 'groq-sdk';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {

    const body = await req.json();
    const resumeText = body.resumeText;
    
    try{
    const completion = await groq.chat.completions.create({
        model: `llama-3.1-8b-instant`,
        messages: [
            {
                role: 'user',
                content: `
            You're a trusted and experienced mentor who wants to help someone you care about succeed in their job search.

            You’ve reviewed many resumes and understand what recruiters and hiring managers look for. Now, you're going to review this candidate's resume and give them **honest, specific, and actionable feedback** — not to criticize, but to help them grow and improve.

            Read the entire resume carefully, and then share improvement suggestions that:
            - Are based only on the actual content of this resume — don’t use general or repeated advice.
            - Highlight opportunities to improve formatting, wording, clarity, achievements, or structure.
            - Help the resume stand out and increase chances of getting shortlisted.
            - Sound supportive and constructive — like a mentor who really wants them to succeed.
            - Are written in simple, easy-to-follow language.

            Just return your suggestions as a proper **JSON array of strings**. No extra commentary or explanation — only the array.

            ---

            Resume:
            
            ${resumeText}
            `
            }
        ],
        temperature: 0.3,
    })

    const response:string | null= completion.choices[0]?.message?.content;
    const tips:string[] = response ? JSON.parse(response) : [];
    return NextResponse.json({ tips : tips });

   }catch(err:any){
    return NextResponse.json(
        {error : "Something went wrong"},
        {status : 500}
    )
   }
}