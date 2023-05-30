const API_URL = 'http://ecodiet.cluster-ig3.igpolytech.fr';
// const API_URL = 'http://localhost:3000'

export async function getAllUsers() {
  const response = await fetch(`${API_URL}/users`);
  return await response.json();
}

export async function getAllMeals() {
  const response = await fetch(`${API_URL}/meals`);
  return await response.json();
}
 
export async function login(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });
  return await response.json();
}

export async function register(email, password) {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });
  return await response.json();
}
