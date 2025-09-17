// GitHub API configuration
const GITHUB_API_BASE = 'https://api.github.com';
const ORG_NAME = 'shelfio';

// Language colors mapping
const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  Python: '#3572a5',
  Java: '#b07219',
  Go: '#00add8',
  Rust: '#dea584',
  PHP: '#4f5d95',
  Ruby: '#701516',
  'C++': '#f34b7d',
  C: '#555555',
  Shell: '#89e051',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#4fc08d',
  Swift: '#ffac45',
  Kotlin: '#f18e33',
  Dart: '#00b4ab',
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
  loadRepositories();
});

async function loadRepositories() {
  try {
    showLoading();
    const repos = await fetchAllRepositories();
    const sortedRepos = repos.sort(
      (a, b) => b.stargazers_count - a.stargazers_count,
    );

    hideLoading();
    displayStats(sortedRepos);
    displayRepositories(sortedRepos);
  } catch (error) {
    console.error('Error loading repositories:', error);
    showError();
  }
}

async function fetchAllRepositories() {
  let allRepos = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const response = await fetch(
      `${GITHUB_API_BASE}/orgs/${ORG_NAME}/repos?page=${page}&per_page=${perPage}&sort=stars&direction=desc`,
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();

    if (repos.length === 0) {
      break;
    }

    allRepos = allRepos.concat(repos);
    page++;

    // Break if we got less than perPage results (last page)
    if (repos.length < perPage) {
      break;
    }
  }

  return allRepos.filter((repo) => !repo.private && !repo.fork);
}

function displayStats(repos) {
  const totalRepos = repos.length;
  const totalStars = repos.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0,
  );
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

  document.getElementById('total-repos').textContent = totalRepos.toLocaleString();
  document.getElementById('total-stars').textContent = totalStars.toLocaleString();
  document.getElementById('total-forks').textContent = totalForks.toLocaleString();
  document.getElementById('stats-bar').style.display = 'flex';
}

function displayRepositories(repos) {
  const grid = document.getElementById('repositories-grid');
  grid.innerHTML = '';

  repos.forEach((repo) => {
    const repoCard = createRepositoryCard(repo);
    grid.appendChild(repoCard);
  });
}

function createRepositoryCard(repo) {
  const card = document.createElement('a');
  card.className =
    'group flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 text-left text-slate-900 shadow-sm ring-1 ring-transparent motion-safe:transition motion-reduce:transform-none hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40';
  card.href = repo.html_url;
  card.target = '_blank';
  card.rel = 'noopener noreferrer';

  const languageColor = repo.language
    ? LANGUAGE_COLORS[repo.language] || '#858585'
    : '#858585';
  const topics = repo.topics || [];
  const topicsHTML = topics
    .slice(0, 3)
    .map(
      (topic) =>
        `<span class="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">${topic}</span>`,
    )
    .join('');

  const description = repo.description || 'No description available';

  card.innerHTML = `
    <div class="flex items-start justify-between gap-4">
      <h2 class="text-lg font-semibold tracking-tight transition group-hover:text-brand">${repo.name}</h2>
      <div class="flex shrink-0 items-center gap-1 text-sm font-semibold text-slate-500">
        <span aria-hidden="true">⭐</span>
        <span>${repo.stargazers_count.toLocaleString()}</span>
      </div>
    </div>

    <p class="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
      ${description}
    </p>

    <div class="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
      ${
        repo.language
          ? `<div class="flex items-center gap-2 text-xs font-medium text-slate-500"><span class="h-2.5 w-2.5 rounded-full" style="background-color: ${languageColor}"></span><span>${repo.language}</span></div>`
          : ''
      }
      ${topicsHTML ? `<div class="flex flex-wrap gap-2">${topicsHTML}</div>` : ''}
    </div>

    <div class="mt-6 flex items-center justify-between text-xs font-medium text-slate-500">
      <div class="flex items-center gap-2">
        <span aria-hidden="true">📅</span>
        <span>Updated ${formatDate(repo.updated_at)}</span>
      </div>
      <div class="flex items-center gap-2">
        <span aria-hidden="true">🍴</span>
        <span>${repo.forks_count.toLocaleString()}</span>
      </div>
    </div>
  `;

  return card;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 7) {
    return `${diffDays}d ago`;
  } else if (diffDays < 30) {
    return `${Math.floor(diffDays / 7)}w ago`;
  } else if (diffDays < 365) {
    return `${Math.floor(diffDays / 30)}mo ago`;
  } else {
    return `${Math.floor(diffDays / 365)}y ago`;
  }
}

function showLoading() {
  document.getElementById('loading').style.display = 'flex';
  document.getElementById('error').style.display = 'none';
  document.getElementById('stats-bar').style.display = 'none';
}

function hideLoading() {
  document.getElementById('loading').style.display = 'none';
}

function showError() {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('error').style.display = 'block';
  document.getElementById('stats-bar').style.display = 'none';
}
