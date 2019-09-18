const handleCreateProfile = async () => {
  const username = window.prompt('Public username?');
  const publicMessages = await window.DatArchive.create({
    title: `Chirper (Public) | ${username}`,
    description: 'The Archive that will be used for your public Chirper messages.',
    prompt: false,
    type: ['chirper-public']
  });
  await publicMessages.writeFile(
    '/profile.json',
    JSON.stringify({ username }),
    'utf8'
  );
  localStorage.publicMessagesUrl = publicMessages.url;
};

export default handleCreateProfile;
