document.addEventListener("DOMContentLoaded", function() {
    // Function to fetch the prefix from the server
    const fetchPrefix = () => {
        fetch('/get-prefix') // Fetch the prefix from the server
        .then(response => response.json())
        .then(data => {
            document.getElementById("prefix").value = data.prefix; // Set the prefix as the initial value
            document.getElementById("prefixLabel").textContent = `Prefix (${data.prefix})`; // Update the label text
        })
        .catch(error => console.error('Error fetching prefix:', error));
    };

    // Fetch prefix when the page loads
    fetchPrefix();

    // Add event listener for form submission
    document.getElementById("prefixForm").onsubmit = function(event) {
        event.preventDefault(); // Prevent default form submission
        const newPrefix = document.getElementById("prefix").value; // Get the value of the input field
        document.getElementById("prefixLabel").textContent = `Prefix (${newPrefix})`; // Update the label text
        // Add your logic for updating the prefix
    };

    // Add event listener for button click
    document.getElementById("prefixButton").onclick = function() {
        var newPrefix = document.getElementById("prefix").value;
        fetch('/update-prefix', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prefix: newPrefix })
        })
        .then(response => {
            if (response.ok) {
                alert('Prefix updated successfully!');
                document.getElementById("prefixLabel").textContent = `Prefix (${newPrefix})`; // Update the label text
            } else {
                throw new Error('Failed to update prefix');
            }
        })
        .catch(error => {
            console.error('Error updating prefix:', error);
        });
    };
});
