import Keycloak from 'keycloak-js';

 


const keycloakConfig = {
url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
 
};
let keycloak = null;
const initKeycloak = () =>
  new Promise((resolve, reject) => {
    if (keycloak) {
      resolve(keycloak);
      return;
    }
    keycloak = new Keycloak(keycloakConfig);
    keycloak.init({
      onLoad: 'login-required',
      checkLoginIframe: false,
    }).then(authenticated => {
      if (authenticated) {
        setInterval(() => {
          keycloak.updateToken(70).catch(() => {
            console.warn('Token refresh failed; logging out');
            keycloak.logout();
          });
        }, 6000);
        resolve(keycloak);
      } else {
        reject('Keycloak authentication failed');
      }
    }).catch(reject);
  });
const getToken = () => (keycloak ? keycloak.token : null);
const isAuthenticated = () => !!(keycloak && keycloak.token);
const logout = () => keycloak && keycloak.logout();
const getKeycloakInstance = () => keycloak;
export { initKeycloak, getToken, isAuthenticated, logout, getKeycloakInstance };