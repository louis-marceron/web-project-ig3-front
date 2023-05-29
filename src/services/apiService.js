const API_URL = 'http://ecodiet.cluster-ig3.igpolytech.fr';

export async function getAllUsers() {
  const response = await fetch(`${API_URL}/api/users`);
  return await response.json();
}
