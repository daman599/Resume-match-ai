import JobModel from "@/db";
import axios from "axios";
import { NextResponse } from "next/server";

const app_id = process.env.APP_ID;
const app_key = process.env.APP_KEY;

export async function Jobs(){

    const response = await axios.get("https://api.adzuna.com/v1/api/jobs/in/search/1",{
     params :{
        app_id: app_id,
        app_key: app_key,
        results_per_page: 30,
        sort_by: "date",
        }
    })

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
    
    return NextResponse.json({jobs:"jobs 1234567890"});

}