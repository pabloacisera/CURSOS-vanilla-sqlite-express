document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('register-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        try {
            const name = e.target.querySelector('#name').value;
            const email = e.target.querySelector('#email').value;
            const password = e.target.querySelector('#password').value;

            console.log("Submitting data:", { name, email, password });

            const response = await fetch('http://localhost:6767/api/register_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password })
            });

            console.log("Response status:", response.status); // Log response status

            if (!response.ok) {
                const errorText = await response.text(); // Retrieve the error text
                throw new Error(`Error en la respuesta: ${response.status} ${response.statusText} - ${errorText}`);
            }

            const data = await response.json();
            console.log("Datos de frontend", data);
            window.location.href = "/pages/login/login.html";
        } catch (error) {
            console.error('Error al comunicarse con el backend:', error);
            document.querySelector('.error').classList.remove('oculto'); // Show error message on the page
        }
    });
});

