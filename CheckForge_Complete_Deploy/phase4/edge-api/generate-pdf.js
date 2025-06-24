
export async function POST(request) {
  const body = await request.json();

  // Generate PDF content
  const pdfContent = `Check #: ${body.checkNumber}\nAmount: $${body.amount}\nPayee: ${body.payee}`;

  return new Response(pdfContent, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=check-${body.checkNumber}.pdf`
    }
  });
}
