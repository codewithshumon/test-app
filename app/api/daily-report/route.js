import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(req) {
  try {
    const { htmlContent } = await req.json();

    // Launch Puppeteer in headless mode
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] }); 
    const page = await browser.newPage();

    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Parisienne&display=swap');
            .cursive-font {
              font-family: 'Parisienne', cursive;
              font-weight: 400;
              font-size: 1rem;
              font-style: normal;
              text-shadow: 0.2px 0 0 rgba(0, 0, 0, 0.5), 0 0.2px 0 rgba(0, 0, 0, 0.5);
            }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `, { waitUntil: 'networkidle0' });
    // text-shadow: 0.2px 0 0 rgba(0, 0, 0, 0.5), 0 0.2px 0 rgba(0, 0, 0, 0.5);

    // Inject the external CSS (pdfStyle.css) into the page
    await page.addStyleTag({ path: 'public/css/dailyReportStyle.css' }); 

    // You can also inject the CSS by URL if it's hosted online
    // await page.addStyleTag({ url: 'https://example.com/path/to/pdfStyle.css' });

    // Generate the PDF buffer
    const pdfBuffer = await page.pdf({ 
      format: 'A4', 
      printBackground: true, // Ensure backgrounds are printed as well
      margin: { top: '10mm', right: '10mm', bottom: '20mm', left: '10mm' },
    });

    await browser.close();

    // Return the PDF as a response
    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=invoices.pdf',
      },
    });

  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json({ error: "PDF generation failed" }, { status: 500 });
  }
}
