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

            if (input === "temples") {
                displayResults(data.temples);
                return;
            }

            if (input === "beaches") {
                displayResults(data.beaches);
                return;
            }

            if (input === "countries") {
                let allCities = [];
                data.countries.forEach(country => {
                    allCities.push(...country.cities);
                });
                displayResults(allCities);
                return;
            }

            let results = [];

            const keyword = input.toLowerCase();

            for (const section in data) {
                data[section].forEach(item => {
                    console.log(Object.values(item.name).includes(keyword));
                    if (Object.values(item).some(value =>
                            String(value).toLowerCase().includes(keyword.toLowerCase())
                        )
                        ) {
                        results.push(item);
                        }

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


document.querySelector(".search-box button")
    .addEventListener("click", searchCitiesResults);

document.querySelector(".search-box .clear")
    .addEventListener("click", () => {
        document.getElementById("input").value = "";
        document.querySelector(".rightHolder").innerHTML = "";
    });


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

let xhr = new XMLHttpRequest();
xhr.open("GET", "./travel_recommendation_api.json", true);
xhr.send();
xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        console.log("travel_recommendation_api.json loaded successfully.");
        console.log(xhr.responseText);
        
    }
}