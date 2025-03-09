document.querySelector('.form2').addEventListener('submit', async (e) => {
  e.preventDefault();

  const submitButton = e.target.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.innerHTML;

  try {
      submitButton.disabled = true;
      submitButton.innerHTML = '<i class="fa-light fa-spinner fa-spin"></i> Sending...';

      const formData = new FormData(e.target);
      const response = await fetch('/api/submit', {
          method: 'POST',
          body: formData
      });

      const result = await response.json();

      if (result.success) {
          alert('Thank you for your message. We will contact you soon!');
          e.target.reset();
      } else {
          throw new Error(result.error || 'Failed to send message');
      }
  } catch (error) {
      alert('Sorry, there was an error sending your message. Please try again later.');
      console.error('Form submission error:', error);
  } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
  }
});