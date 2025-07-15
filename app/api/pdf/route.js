import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(req) {
  try {
    const { htmlContent } = await req.json();

    const browser = await puppeteer.launch({ 
      headless: true, 
      args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });
    
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({ 
      format: 'A4',
      printBackground: true,
      margin: { top: '50mm', right: '30mm', bottom: '120mm', left: '30mm' },
      displayHeaderFooter: false,
      preferCSSPageSize: true
    });

    await browser.close();

    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=invoice.pdf',
      },
    });

  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json({ error: "PDF generation failed" }, { status: 500 });
  }
}