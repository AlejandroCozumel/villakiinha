export async function onRequestPost({ request }) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const emailBody = `
      New Contact Form Submission:
      Name: ${data.name}
      Email: ${data.email}
      Phone: ${data.phone}
      Subject: ${data.subject}
      Message: ${data.message}
    `;

    await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: 'alejandroo14@gmail.com' }],
          },
        ],
        from: {
          email: 'noreply@villakiinha.com',
          name: 'Villa KiinHa Contact Form'
        },
        subject: 'New Contact Form Submission',
        content: [
          {
            type: 'text/plain',
            value: emailBody,
          },
        ],
      }),
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ success: false }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}