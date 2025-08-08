
import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(req) {
  try {
    const { htmlContent } = await req.json();

    // Launch Puppeteer in headless mode
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] }); 
    const page = await browser.newPage();

    // Set HTML content
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    // await page.setContent(`
    //   <!DOCTYPE html>
    //   <html>
    //     <head>
    //       <style>
    //         @import url('https://fonts.googleapis.com/css2?family=Parisienne&display=swap');
    //         .cursive-font {
    //           font-family: 'Parisienne', cursive;
    //           font-weight: 400;
    //           font-style: normal;
    //         }
    //       </style>
    //     </head>
    //     <body>
    //       ${htmlContent}
    //     </body>
    //   </html>
    // `, { waitUntil: 'networkidle0' });
    

    // Inject the external CSS (pdfStyle.css) into the page
    await page.addStyleTag({ path: 'public/css/invoicePuppetStyle.css' }); 


    // Generate the PDF buffer
  const pdfBuffer = await page.pdf({ 
    format: 'A4', 
    printBackground: true,
    margin: { top: '20mm', right: '10mm', bottom: '20mm', left: '10mm' },
    displayHeaderFooter: true,
    headerTemplate: '<div style="font-size:10px; padding: 10px; text-align: center;">Header Content</div>',
    footerTemplate: '<div style="font-size:10px; padding: 10px; text-align: center;">Footer Content</div>',
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