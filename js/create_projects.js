
$(document).ready(async () => {
    projects = await fetch_json();
    projects.projects.forEach(element => {
        let card = create_new_project_card(element);
        $("#projects-box").append(card);
        let modal = create_project_modal(element);
        $("#modals-box").append(modal);
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

function create_project_modal(project) {
    image_path = "../resources/" + project.image;
    skills = project.skills.map(skill => `<span class="project-tag">${skill}</span>`).join("");
    highlights = project.highlights.map(highlight => `<li class="d-flex gap-2 text-muted small">
                            <span class="stylized-blue mt-1" style="font-size:8px;">●</span>
                            ${highlight}
                        </li>`).join("");

    let modal = `
    <div class="modal fade" id=${"modal-" + project.id} tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content rounded-4 border-0 shadow">

            <div class="rounded-top-4 position-relative overflow-hidden d-flex align-items-center justify-content-center" style="height: 200px; background-color: #0a0a0a;">
                <img src=${image_path} class="w-100 h-100 object-fit-cover" alt="Escape Protocol VR" />
                <button type="button" class="btn-close btn-close-white position-absolute top-0 end-0 m-3"
                        data-bs-dismiss="modal"></button>
            </div>

            <div class="modal-body p-4 d-flex flex-column gap-3">
                <div class="d-flex justify-content-between align-items-start">
                    <div>
                        <div class="fw-bold fs-5">${project.name}</div>
                        <div class="text-muted small">${project.title}</div>
                    </div>
                    ${project.link && project.link.trim() !== "" ? `
                        <a href="${project.link}" target="_blank" rel="noopener noreferrer"
                           class="stylized-blue-background text-decoration-none rounded-5 px-3 py-1 small transition button-animation text-white d-flex align-items-center gap-1">
                            <i class="bi bi-box-arrow-up-right"></i> See more
                        </a>
                    ` : ""}
                </div>

                <hr class="my-1 opacity-25">

                <div class="text-muted small lh-lg">
                    ${project.description}
                </div>

                <div>
                    <div class="fw-bold small mb-2">Highlights</div>
                    <ul class="list-unstyled d-flex flex-column gap-2 mb-0">
                        ${highlights}
                    </ul>
                </div>

                <div class="d-flex flex-wrap gap-2">
                    ${skills}
                </div>
            </div>
        </div>
    </div>
    </div>`
    return modal;
}