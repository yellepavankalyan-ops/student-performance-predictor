async function loadData() {
    try {
        let res = await fetch("http://127.0.0.1:5000/get_records");
        let data = await res.json();

        console.log("DATA FROM API:", data); // 🔥 DEBUG

        let container = document.getElementById("cards-container");

        if (data.length === 0) {
            container.innerHTML = "<h2>No data found ⚠️</h2>";
            return;
        }

        data.forEach(item => {
            let card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <h3>${item.name || "No Name"} (${item.roll || "-"})</h3>
                <p>📊 Marks: ${item.marks}</p>
                <p>📅 Attendance: ${item.attendance}%</p>
                <p>🎓 CGPA: ${item.cgpa}</p>
                <p class="suggestions">💡 ${(item.suggestions || []).join(", ")}</p>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error("ERROR:", error);
        document.getElementById("cards-container").innerHTML =
            "<h2>Error loading data ❌</h2>";
    }
}

loadData();