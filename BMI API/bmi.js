// Function to handle the BMI calculation
function calculateBMI() {
    // Get the values from the input fields
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;

    // Check if weight and height are provided and are valid
    if (weight && height) {
        // Make the GET request to the Flask API
        fetch(`http://127.0.0.1:5000/calculate?w=${weight}&h=${height}`)
            .then(response => response.json())
            .then(data => {
                // Display the result or error
                if (data.result) {
                    document.getElementById('result').innerHTML = `Your BMI is: ${data.result}`;
                    const final = document.getElementById('conc');
                    const healthSuggestions = document.getElementById('healthSuggestions'); // Add this line

                    // Fetch the health suggestions from the JSON file
                    fetch('bmi.json')
                        .then(response => response.json())
                        .then(suggestionsData => {
                            let category = '';
                            if (data.result < 18.5) {
                                category = 'underweight';
                                final.innerHTML = 'Underweight';
                                final.style.color = 'yellow';
                            } else if (data.result >= 18.5 && data.result < 24.9) {
                                category = 'normal';
                                final.innerHTML = 'Normal Weight';
                                final.style.color = 'rgb(30,243,30)';
                            } else {
                                category = 'overweight';
                                final.innerHTML = 'Overweight';
                                final.style.color = 'red';
                            }

                            // Update the health suggestions
                            healthSuggestions.innerHTML = `
                                <strong>${suggestionsData[category].title}</strong>
                                
                                <ul>
                                    ${suggestionsData[category].suggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
                                </ul>
                            `;
                        })
                        .catch(error => {
                            console.error("Error loading health suggestions:", error);
                        });
                } else if (data.error) {
                    document.getElementById('result').innerHTML = `Error: ${data.error}`;
                }
            })
            .catch(error => {
                // Handle any network errors
                document.getElementById('result').innerHTML = `Error: ${error.message}`;
            });
    } else {
        document.getElementById('result').innerHTML = 'Please enter both weight and height.';
    }
}
