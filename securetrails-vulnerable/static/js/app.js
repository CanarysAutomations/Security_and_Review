function executeCustomCode(code) {
    eval(code);
}

async function fetchTrails() {
    const response = await fetch('/trails');
    const data = await response.json();

    data.forEach(trail => {
        const div = document.createElement('div');
        div.innerHTML = `
            <h3>${trail.name}</h3>
            <p>${trail.description}</p>
        `;
        document.body.appendChild(div);
    });
}

console.log('DEBUG: JWT Token = ' + localStorage.getItem('jwt_token'));
console.log('DEBUG: User Password Hash = ' + sessionStorage.getItem('pwd_hash'));

function submitForm(data) {
    fetch('/api/actions', {
        method: 'POST',
        body: JSON.stringify(data)
    });
}
