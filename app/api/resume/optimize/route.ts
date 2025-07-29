import { NextRequest, NextResponse } from "next/server";
import { Groq } from 'groq-sdk';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {

    const body = await req.json();
    const resumeText = body.resumeText;

    const completion = await groq.chat.completions.create({
        model: `llama-3.3-70b-versatile`,
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

            Just return your suggestions as a **JSON array of strings**. No extra commentary or explanation — only the array.

            ---

            Resume:
            ${resumeText}
            `
            }
        ],
        temperature: 0.3,
    })

    console.log(completion.choices[0].message.content);

    return NextResponse.json({ hello: 1 });
}