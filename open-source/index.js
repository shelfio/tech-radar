// GitHub API configuration
const GITHUB_API_BASE = 'https://api.github.com';
const ORG_NAME = 'shelfio';

// Language colors mapping
const LANGUAGE_COLORS = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#2b7489',
    'Python': '#3572a5',
    'Java': '#b07219',
    'Go': '#00add8',
    'Rust': '#dea584',
    'PHP': '#4f5d95',
    'Ruby': '#701516',
    'C++': '#f34b7d',
    'C': '#555555',
    'Shell': '#89e051',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Vue': '#4fc08d',
    'Swift': '#ffac45',
    'Kotlin': '#f18e33',
    'Dart': '#00b4ab'
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadRepositories();
});

async function loadRepositories() {
    try {
        showLoading();
        const repos = await fetchAllRepositories();
        const sortedRepos = repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
        
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
        const response = await fetch(`${GITHUB_API_BASE}/orgs/${ORG_NAME}/repos?page=${page}&per_page=${perPage}&sort=stars&direction=desc`);
        
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
    
    return allRepos.filter(repo => !repo.private && !repo.fork);
}

function displayStats(repos) {
    const totalRepos = repos.length;
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
    
    document.getElementById('total-repos').textContent = totalRepos.toLocaleString();
    document.getElementById('total-stars').textContent = totalStars.toLocaleString();
    document.getElementById('total-forks').textContent = totalForks.toLocaleString();
    document.getElementById('stats-bar').style.display = 'flex';
}

function displayRepositories(repos) {
    const grid = document.getElementById('repositories-grid');
    grid.innerHTML = '';
    
    repos.forEach(repo => {
        const repoCard = createRepositoryCard(repo);
        grid.appendChild(repoCard);
    });
}

function createRepositoryCard(repo) {
    const card = document.createElement('div');
    card.className = 'repo-card';
    card.onclick = () => window.open(repo.html_url, '_blank');
    
    const languageColor = repo.language ? LANGUAGE_COLORS[repo.language] || '#858585' : '#858585';
    const topics = repo.topics || [];
    const topicsHTML = topics.slice(0, 3).map(topic => 
        `<span class="topic-tag">${topic}</span>`
    ).join('');
    
    const description = repo.description || 'No description available';
    
    card.innerHTML = `
        <div class="repo-header">
            <a href="${repo.html_url}" class="repo-name" target="_blank" onclick="event.stopPropagation()">${repo.name}</a>
            <div class="star-count">
                <span class="star-icon">⭐</span>
                <span>${repo.stargazers_count.toLocaleString()}</span>
            </div>
        </div>
        
        <div class="repo-description">${description}</div>
        
        <div class="repo-meta">
            ${repo.language ? `
                <div class="language-badge">
                    <div class="language-dot" style="background-color: ${languageColor}"></div>
                    <span>${repo.language}</span>
                </div>
            ` : ''}
            
            ${topicsHTML ? `<div class="topics">${topicsHTML}</div>` : ''}
        </div>
        
        <div class="repo-stats">
            <div class="repo-stat">
                <span>📅</span>
                <span>Updated ${formatDate(repo.updated_at)}</span>
            </div>
            <div class="fork-count-corner">
                <span>🍴</span>
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