export const TOKEN_KEY = "@airbnb-Token";
export const TOKEN_KEY2 = "@airbnb-Token2";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
  
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_KEY2);
};

export const get_id_establishment = () => {
  localStorage.getItem(TOKEN_KEY2)
}

export const id_establishment = id_establishment => {
  localStorage.setItem(TOKEN_KEY2, id_establishment);
  
};

export const isId_estab = () => localStorage.getItem(TOKEN_KEY2)