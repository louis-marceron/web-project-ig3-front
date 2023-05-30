// const API_URL = 'https://ecodiet.cluster-ig3.igpolytech.fr';
const API_URL = 'http://localhost:3000'

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
  console.log(`response: ${response}`);
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

export async function consumeMeal(mealId, userId) {
  const response = await fetch(`${API_URL}/users/${userId}/meal-consumptions`, {
    method: 'POST',
    body: JSON.stringify({ meal_id: mealId }),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });
  return await response.json();
}

export async function getMealConsumptions(userId) {
  const response = await fetch(`${API_URL}/users/${userId}/meal-consumptions`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });
  return await response.json();
}

export async function deleteAccount(userId) {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });
  return response;
}

// logout (no data in the post)
export async function logout() {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });
  return await response.json();
}

