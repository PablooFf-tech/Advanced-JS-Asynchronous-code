//RESUELVE TUS EJERCICIOS AQUI

// Dog API

// 1
async function getAllBreeds() {
    const res = await fetch('https://dog.ceo/api/breeds/list/all');
    const data = await res.json();
    return Object.keys(data.message);
}

// 2
async function getRandomDog() {
    const res = await fetch('https://dog.ceo/api/breed/komondor/images/random');
    const data = await res.json();
    return data.message;
}

// 3
async function getAllImagesByBreed() {
    const res = await fetch('https://dog.ceo/api/breed/komondor/images');
    const data = await res.json();
    return data.message;
}

// 4
async function getAllImagesByBreed2(breed) {
    const res = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const data = await res.json();
    return data.message;
}

// GitHub API (I)

// 5
async function getGitHubUserProfile(username) {
    const res = await fetch(`https://api.github.com/users/${username}`);
    return await res.json();
}

// 6
async function printGithubUserProfile(username) {
    const user = await getGitHubUserProfile(username);
    const img = user.avatar_url;
    const name = user.name;

    const container = document.createElement('div');
    container.innerHTML = `<img src="${img}" alt="${name}"><h2>${name}</h2>`;
    document.body.appendChild(container);

    return { img, name };
}

// 7
async function getAndPrintGitHubUserProfile(username) {
    const user = await getGitHubUserProfile(username);
    return `<section>
    <img src="${user.avatar_url}" alt="${user.name}">
    <h1>${user.name}</h1>
    <p>Public repos: ${user.public_repos}</p>
</section>`;
}

// 8
document.addEventListener('DOMContentLoaded', () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Usuario de GitHub';

    const button = document.createElement('button');
    button.textContent = 'Buscar';

    const result = document.createElement('div');

    button.addEventListener('click', async () => {
        const username = input.value.trim();
        if (!username) return;
        result.innerHTML = await getAndPrintGitHubUserProfile(username);
    });

    document.body.prepend(input, button, result);
});

// GitHub API (II)

// 9
async function fetchGithubUsers(userNames) {
    const promises = userNames.map(name =>
        fetch(`https://api.github.com/users/${name}`).then(res => res.json())
    );
    const users = await Promise.all(promises);

    users.forEach(user => {
        console.log(user.html_url);
        console.log(user.name);
    });

    return users;
}
