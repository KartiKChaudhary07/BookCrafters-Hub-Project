import token, { STORAGE_TOKEN_NAME } from "../utils/token";

export const logout = (gotoPageUrl = "/", logoutAll = false) => {
  if (logoutAll) token.removeAll();
  else token.remove();
  window.location.href = gotoPageUrl;
  token.setIsLoggedOut();
};

export const checkLocalStorageLoggedInStatus = async () => {
  const token = await localStorage.getItem(STORAGE_TOKEN_NAME);
  return token ? true : false;
};

export const setTokenAndRedirect = async (data) => {
  if (data && data.accessToken) {
    await token.save(data);
    // access(data.currentAuthority);
  }

  if (data && data.redirectUrl) {
    // redirectTo(data.redirectUrl);
    window.location = data.redirectUrl;
  }
};
