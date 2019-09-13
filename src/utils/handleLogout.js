const handleLogout = (setIsLoggedIn, setPublicMessages, setProfile) => {
  localStorage.clear();
  setPublicMessages(undefined);
  setProfile(undefined);
  setIsLoggedIn(false);
};

export default handleLogout;
