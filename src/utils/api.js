// 👉 Backend correto para users/cards do projeto Around:
const API_BASE = "https://around-api.pt-br.tripleten-services.com/v1";

// ⚠️ Token de coorte (NÃO é Bearer/JWT). Se preferir, jogue em .env:
// VITE_AROUND_TOKEN=seu-token
const COHORT_TOKEN =
  import.meta?.env?.VITE_AROUND_TOKEN || "cd3a47d2-0aad-4373-8a79-7c01789ac927";

// Mantido apenas por compatibilidade com imports existentes.
// Aqui NÃO usamos JWT, então isso não faz nada.
export const setAuthToken = () => {};

const handle = async (res) => {
  if (res.ok) return res.json();
  const text = await res.text();
  throw new Error(`${res.status} ${res.statusText} - ${text}`);
};

// Headers padrão exigidos pela Around API
const defaultHeaders = {
  authorization: COHORT_TOKEN, // <- token fixo de coorte (sem "Bearer")
  "Content-Type": "application/json",
  Accept: "application/json",
};

const api = {
  getUserInfo() {
    return fetch(`${API_BASE}/users/me`, {
      headers: defaultHeaders,
    }).then(handle);
  },

  getInitialCards() {
    return fetch(`${API_BASE}/cards`, {
      headers: defaultHeaders,
    }).then(handle);
  },

  editUserInfo(name, about) {
    return fetch(`${API_BASE}/users/me`, {
      method: "PATCH",
      headers: defaultHeaders,
      body: JSON.stringify({ name, about }),
    }).then(handle);
  },

  profilePhotoUpdate(avatar) {
    return fetch(`${API_BASE}/users/me/avatar`, {
      method: "PATCH",
      headers: defaultHeaders,
      body: JSON.stringify({ avatar }),
    }).then(handle);
  },

  changeLikeCardStatus(cardId, like) {
    return fetch(`${API_BASE}/cards/${cardId}/likes`, {
      method: like ? "PUT" : "DELETE",
      headers: defaultHeaders,
    }).then(handle);
  },

  deleteCard(cardId) {
    return fetch(`${API_BASE}/cards/${cardId}`, {
      method: "DELETE",
      headers: defaultHeaders,
    }).then(handle);
  },

  addNewCard(name, link) {
    return fetch(`${API_BASE}/cards`, {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify({ name, link }),
    }).then(handle);
  },
};

export default api;
