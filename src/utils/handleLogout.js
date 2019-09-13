const handleLogout = (setIsLoggedIn, setPublicMessages) => {
  localStorage.clear();
  setPublicMessages(undefined);
  setIsLoggedIn(false);
};

export default handleLogout;
