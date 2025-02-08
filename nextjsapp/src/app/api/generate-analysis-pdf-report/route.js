import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { NextResponse } from "next/server";


export const maxDuration = 50; 


export async function POST(req) {

  try {

    const { htmlContent } = await req.json();

    const browser = await puppeteer.launch({
      executablePath: await chromium.executablePath(),
      args: chromium.args,
      headless: chromium.headless,
    });

    const page = await browser.newPage();

    await page.setContent(htmlContent, { waitUntil: "load" });


    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });


    await browser.close();


    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="certificate.pdf"',
      },
    });

  } catch (error) {

    console.error("Error generating PDF:", error);

    return new NextResponse(JSON.stringify({ error: "Failed to generate PDF" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });

  }
  
}
