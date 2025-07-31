import { NextRequest, NextResponse } from "next/server";
import PDFParser from "pdf2json";

type ParsedPDFtype = {
       Pages: {
              Texts: {
                     R: any[];
              }[];
       }[];
};
export async function POST(request: NextRequest) {
       const formData = await request.formData();
       const file = formData.get("resume") as File;

       const buffer = Buffer.from(await file.arrayBuffer());

       const pdfParser = new PDFParser();

       const parsedData: ParsedPDFtype = await new Promise((resolve, reject) => {

              pdfParser.parseBuffer(buffer);

              pdfParser.on("pdfParser_dataReady", (pdfData) => {
                     resolve(pdfData);
              });
              pdfParser.on("pdfParser_dataError", (errData) => {
                     reject(errData);
              });
       })

       const parsedText = parsedData.Pages.flatMap((p) => (
               p.Texts.map((t) => (
                    decodeURIComponent(t.R[0].T).replace(/\s+/g, " ")
               ))
       )).join(" ");

       return NextResponse.json({ parsedText : parsedText });
}
