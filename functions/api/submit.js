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

    const mailResponse = await fetch(
      "https://api.mailchannels.net/tx/v1/send",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: "reservations@villakiinha.com" }],
            },
          ],
          from: {
            email: "noreply@villakiinha.com",
            name: "Villa KiinHa Contact Form",
          },
          subject: "New Contact Form Submission",
          content: [
            {
              type: "text/plain",
              value: emailBody,
            },
          ],
        }),
      }
    );

    if (!mailResponse.ok) {
      const errorText = await mailResponse.text();
      console.error("MailChannels error:", errorText);
      throw new Error(`Failed to send email: ${errorText}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
