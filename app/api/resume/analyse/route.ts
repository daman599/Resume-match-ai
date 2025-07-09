import { NextRequest } from "next/server";

export function POST(req:NextRequest){
  console.log(req);
  return Response.json({data:"hi there"});
}