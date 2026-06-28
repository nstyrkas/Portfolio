// Renders the systems (skills) grid from data/systems.json
async function renderSystems() {
  const container = document.getElementById('systems-grid');
  if (!container) return;

  try {
    const res = await fetch('https://github.com/nstyrkas/Portfolio/blob/main/data/systems.json');
    if (!res.ok) throw new Error('Failed to load systems.json');
    const modules = await res.json();

    container.innerHTML = modules.map(mod => `
      <div class="system-module">
        <div class="module-head">
          <span class="module-id">${mod.id}</span>
          <span class="module-status ${mod.status === 'building' ? 'building' : ''}">
            ${mod.status === 'building' ? 'Building' : 'Active'}
          </span>
        </div>
        <h3>${mod.title}</h3>
        <p>${mod.description}</p>
      </div>
    `).join('');
  } catch (err) {
    container.innerHTML = `<p class="load-note">Couldn't load systems data: ${err.message}</p>`;
  }
}

// Renders the projects list from data/projects.json
async function renderProjects() {
  const container = document.getElementById('projects-list');
  if (!container) return;

  try {
    const res = await fetch('https://github.com/nstyrkas/Portfolio/blob/main/data/projects.json');
    if (!res.ok) throw new Error('Failed to load projects.json');
    const projects = await res.json();

    container.innerHTML = projects.map(p => `
      <div class="project">
        <div class="project-head">
          <h3>${p.title}</h3>
          <span class="project-tag ${p.status === 'progress' ? 'progress' : ''}">${p.tag}</span>
        </div>
        <div class="project-body">
          <p>${p.description}</p>
          <div class="stack">
            ${p.stack.map(s => `<span>${s}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('');
  } catch (err) {
    container.innerHTML = `<p class="load-note">Couldn't load projects data: ${err.message}</p>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderSystems();
  renderProjects();
});
