
$(document).ready(async () => {
    projects = await fetch_json();
    projects.projects.forEach(element => {
        let card = create_new_project_card(element);
        $("#projects-box").append(card);
    });
})

async function fetch_json() {
    let response = await fetch("../resources/new_projects.json");
    return response.json();
}

function create_new_project_card(project) {
    image_path = "../resources/" + project.image;

    skills = project.skills.map(skill => `<span class="project-tag">${skill}</span>`).join("");

    let card = `
            <div class="col-12 col-md-6 col-lg-4">
            <div class="h-100 rounded-4 shadow-sm overflow-hidden border project-card"
                 data-bs-toggle="modal" data-bs-target=${"#modal-" + project.id} style="cursor: pointer;">
                <div class="project-thumb position-relative overflow-hidden bg-black">
                    <img src="${image_path}" class="w-100 h-100 object-fit-cover" alt="Escape Protocol VR" />
                </div>
                <div class="p-4 d-flex flex-column gap-2">
                    <div class="d-flex justify-content-between align-items-start gap-2">
                        <div class="fw-bold">${project.name}</div>
                    </div>
                    <div class="text-muted small">${project.short_description}</div>
                    <div class="d-flex flex-wrap gap-2 mt-1">
                        ${skills}
                    </div>
                </div>
            </div>
        </div>`;

    return card;
}