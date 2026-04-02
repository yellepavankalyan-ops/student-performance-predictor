async function predict() {
    let name = document.getElementById("name").value;
    let roll = document.getElementById("roll").value;
    let marks = document.getElementById("marks").value;
    let attendance = document.getElementById("attendance").value;
    let cgpa = document.getElementById("cgpa").value;

    // Validation (important)
    if (!name || !roll || !marks || !attendance || !cgpa) {
        alert("Please fill all fields");
        return;
    }

    try {
        let response = await fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                roll: roll,
                marks: Number(marks),
                attendance: Number(attendance),
                cgpa: Number(cgpa)
            })
        });

        let data = await response.json();

        // Show only improvement suggestions (as you wanted)
        document.getElementById("result").innerText =
            "💡 What to Improve:\n" + data.suggestions.join(", ");

    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong!");
    }
}

// Navigate to records page
function goToRecords() {
    window.location.href = "records.html";
}