// import { chromium } from 'playwright';
// import { NextResponse } from 'next/server';

// export async function POST(req) {
//   try {
//     const { htmlContent } = await req.json();

//     const browser = await chromium.launch();
//     const page = await browser.newPage();

//     await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

//     // 🔑 This is the method you asked about.
//     // It directly loads the CSS file from the specified path.
//     await page.addStyleTag({ path: 'public/css/invoicePuppetStyle.css' });

//     const pdfBuffer = await page.pdf({
//       format: 'A4',
//       printBackground: true,
//       margin: { top: '20mm', right: '10mm', bottom: '20mm', left: '10mm' },
//     });

//     await browser.close();

//     return new Response(pdfBuffer, {
//       headers: {
//         'Content-Type': 'application/pdf',
//         'Content-Disposition': 'attachment; filename=invoices.pdf',
//       },
//     });

//   } catch (error) {
//     console.error("Error generating PDF:", error);
//     return new Response(JSON.stringify({ error: "PDF generation failed" }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }



import { chromium } from 'playwright';

export async function POST(req) {
  try {
    const { htmlContent } = await req.json();

    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    await page.addStyleTag({ path: 'public/css/invoicePuppetStyle.css' });

    // Generate the PDF buffer with header and footer templates
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20mm', right: '10mm', bottom: '20mm', left: '10mm' },
      displayHeaderFooter: true, // This is essential to enable the templates
      headerTemplate: `
        <div style="font-size: 10px; padding: 10px; text-align: center; width: 100%;">
          <span>Your Custom Header</span>
        </div>
      `,
      footerTemplate: `
        <div style="font-size: 10px; padding: 10px; text-align: center; width: 100%;">
          <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
        </div>
      `,
    });

    await browser.close();

    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=invoices.pdf',
      },
    });

  } catch (error) {
    console.error("Error generating PDF:", error);
    return new Response(JSON.stringify({ error: "PDF generation failed" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}