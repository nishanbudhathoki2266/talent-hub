const setCookie = (name, value) => {
  // Setting cookie expire time to 10 years, can be set accordingly -> just setting it for 10 years becuase found somewhere that the login in firebase is permanent
  // So, trying to sync it up with the logged in state
  const expires = "expires=Tue, 01-Jan-2034 00:00:00 GMT";
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

export default setCookie;
