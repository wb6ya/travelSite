function searchCitiesResults() {
    fetch("./travel_recommendation_api.json")
        .then(res => res.json())
        .then(data => {
            const input = document.getElementById("input").value.trim().toLowerCase();
            const resultsContainer = document.querySelector(".rightHolder");
            resultsContainer.innerHTML = "";

            if (!input) {
                alert("Please enter a keyword");
                return;
            }

            // ✅ لو كتب temples
            if (input === "temples") {
                displayResults(data.temples);
                return;
            }

            // ✅ لو كتب beaches
            if (input === "beaches") {
                displayResults(data.beaches);
                return;
            }

            // ✅ لو كتب countries
            if (input === "countries") {
                // نعرض كل المدن داخل الدول
                let allCities = [];
                data.countries.forEach(country => {
                    allCities.push(...country.cities);
                });
                displayResults(allCities);
                return;
            }

            // ❗ لو كتب شيء ثاني (اسم مدينة مثلاً)
            let results = [];

            const keyword = input.toLowerCase();

            for (const section in data) {
                data[section].forEach(item => {

                    // لو العنصر فيه مدن (مثل الدول)
                    if (item.cities) {
                        item.cities.forEach(city => {
                            if (
                                city.name.toLowerCase().includes(keyword) ||
                                city.description.toLowerCase().includes(keyword)
                            ) {
                                results.push(city);
                            }
                        });
                    }

                    // لو العنصر نفسه فيه اسم ووصف (temples / beaches)
                });
            }

            console.log(results);

            if (results.length === 0) {
                resultsContainer.innerHTML = `<p style="color:white">No results found</p>`;
                return;
            }

            displayResults(results);
        });
}


// زر البحث
document.querySelector(".search-box button")
    .addEventListener("click", searchCitiesResults);

// زر المسح
document.querySelector(".search-box .clear")
    .addEventListener("click", () => {
        document.getElementById("input").value = "";
        document.querySelector(".rightHolder").innerHTML = "";
    });


// عرض النتائج
function displayResults(results) {
    const container = document.querySelector(".rightHolder");

    results.forEach(item => {
        const card = document.createElement("div");
        card.className = "recommendation-card";

        card.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
        `;

        container.appendChild(card);
    });
}
