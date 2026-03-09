function login(){

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if(username === "admin" && password === "admin123"){
        window.location.href = "home.html";
    }
    
    else if(username === "" || password === ""){
    alert("Please fill in all fields");
}
    else{
        alert("Please enter the correct username or password");
    }

}

const API_URL = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

let allIssues = [];

async function loadIssues() {

    const res = await fetch(API_URL);
    const data = await res.json();

    allIssues = data.data;

    displayIssues(allIssues);
}

loadIssues();

function displayIssues(issues) {

    const container = document.getElementById("issue-container");
    container.innerHTML = "";

    document.querySelector("#issue-count h2").innerText = issues.length + " Issues";

    issues.forEach(issue => {

        const card = document.createElement("div");

        card.className = "bg-white rounded-xl shadow-sm text-center cursor-pointer";

        card.innerHTML = `
        <div class="p-4">

            <div class="flex items-start justify-between">

                <span class="text-xs font-semibold px-3 py-1 rounded-full bg-red-100 text-red-500">
                    ${issue.priority}
                </span>

                <span class="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-600">
                    ${issue.status}
                </span>

            </div>

            <h2 class="mt-3 font-semibold text-gray-800 text-lg">
                ${issue.title}
            </h2>

            <p class="text-sm text-gray-500 mt-1">
                ${issue.description}
            </p>

            <div class="flex gap-2 mt-4">
                <span class="text-xs font-medium bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
                    ${issue.label}
                </span>
            </div>
        </div>

        <div class="border-t px-4 py-3 text-sm text-gray-500">
            <p>#${issue.id} by <span class="text-gray-700 font-medium">${issue.author}</span></p>
            <p>${issue.createdAt}</p>
        </div>
        `;

        card.addEventListener("click", () => showIssue(issue.id));

        container.appendChild(card);

    });
}

function filterIssues(type) {

    if (type === "all") {
        displayIssues(allIssues);
        return;
    }

    const filtered = allIssues.filter(issue => issue.status.toLowerCase() === type);

    displayIssues(filtered);
}

document.getElementById("search-input").addEventListener("input", async function(){

    const text = this.value;

    if(text === ""){
        displayIssues(allIssues);
        return;
    }

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`);
    const data = await res.json();

    displayIssues(data.data);
});

async function showIssue(id){

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const data = await res.json();

    const issue = data.data;

    alert(`
Title: ${issue.title}
Description: ${issue.description}
Status: ${issue.status}
Author: ${issue.author}
Priority: ${issue.priority}
Label: ${issue.label}
    `);
}