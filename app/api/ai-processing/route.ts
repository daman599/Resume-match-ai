import { NextRequest, NextResponse } from "next/server";
import OpenAI from 'openai';
import mongoose from "mongoose";
import axios from "axios";
import JobModel from "@/db";

await mongoose.connect(process.env.MONGODB_URI!);

const groq = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

const app_id = process.env.APP_ID;
const app_key = process.env.APP_KEY;

export async function POST(req: NextRequest) {

    const URL = `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${app_id}&app_key=${app_key}&results_per_page=20&sort_by=date`
    const response = await axios.get(URL);
    const results = response.data.results;

    results.map(async (job:any) => {
        const existing = await JobModel.findOne({jobId : job.id});
        if(!existing){
        await JobModel.create({
            jobId:job.id,
            title:job.title,
            company:job.company.display_name,
            location:job.location.area.join(", "),
            jobCategory: job.category.label,
            redirect_url:job.redirect_url,
            description:job.description,
            datePosted: new Date(job.created),
        })
       }
    })
    const body = await req.json();
    const resumeText = body.resumeText;

    return NextResponse.json({ "done": "processing done" })

}