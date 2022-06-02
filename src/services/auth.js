export const baseUrl = 'https://cliente.quantaeng.com.br/instaltecapi/';

export const isAuthenticated = () => sessionStorage.getItem('token_usuario');

export const getToken = () => sessionStorage.getItem('token_usuario');

export const login = (token) => {
  sessionStorage.setItem('token_usuario', token);
  document.location.reload(true);
};

export const logout = () => {
  sessionStorage.removeItem('token_usuario');
  document.location.replace('/');
};
