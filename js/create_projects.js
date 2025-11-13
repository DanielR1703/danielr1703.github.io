
$(document).ready(async () => {
    projects = await fetch_json();
    projects.projects.forEach(element => {
        let card = create_project_card(element);
        $("#projects-box").append(card);
    });
})

async function fetch_json() {
    let response = await fetch("../resources/projects.json");
    return response.json();
}

function create_project_card(project) {
    image_path = "../resources/" + project.image;
    let card = `
    <div class="project-card border border-2 rounded-4 p-4 shadow-sm d-flex flex-column align-items-center">
        <h5 class="fw-bold mb-2 stylized-blue">${project.title}</h5>
        <p class="text-muted mb-3">${project.description}</p>
        <img src="${image_path}" alt="${project.title} Image" class="mb-3 rounded-3 border border-3" style="width: 80%; height:10rem; object-fit: cover;">
        <a href="${project.link}" class="main-button stylized-blue-background p-2 rounded-3 fw-bold text-center text-decoration-none" style="width: 50%;"
            target="_blank">View More</a>
    </div>
    `;
    return card;
}