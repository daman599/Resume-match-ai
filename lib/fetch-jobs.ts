import JobModel from "@/lib/db-schema";
import axios from "axios";
import { redis } from "@/lib/cache-redis";

const app_id = process.env.APP_ID;
const app_key = process.env.APP_KEY;

export async function FetchandCacheJobs(){
    const cacheKey : string = "latest_jobs";
    const cache : unknown = await redis.get(cacheKey);
    
    if(cache){
        return {latest_jobs:cache};
    }

    const response = await axios.get("https://api.adzuna.com/v1/api/jobs/in/search/1",{
     params :{
        app_id: app_id,
        app_key: app_key,
        results_per_page: 20,
        sort_by: "date",
        }
    })

    const results = response.data.results;

    await Promise.all(results.map(async (job:any) => {
        const existing = await JobModel.findOne({jobId : job.id});

        if(!existing){
        await JobModel.create({
            jobId : job.id,
            title : job.title,
            company : job.company.display_name,
            location : job.location.area.join(", "),
            jobCategory : job.category.label,
            redirect_url : job.redirect_url,
            description : job.description,
        })
       }
    }))

    const jobs = await JobModel.find();
    await redis.set("latest_jobs",jobs,{ex: 7200});

    return {latest_jobs:jobs};
}