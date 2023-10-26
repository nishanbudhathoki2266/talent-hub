const getIsLoggedIn = () => {
  const currentUser = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("currentUser"));
  if (currentUser) return true;
  return false;
};

export default getIsLoggedIn;
