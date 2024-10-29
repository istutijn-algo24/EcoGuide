document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form submission

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries()); // Get form data

    // Send a POST request to the registration endpoint
    const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.success) {
        alert(result.message);
        window.location.href = 'page1.html'; // Navigate to page1.html on success
    } else {
        alert(result.message); // Show error message
    }
});
