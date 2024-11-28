export function setCurrentSession(token: string) {
  const session = {
    token: token,
    expires: Date.now() + 86400000, //one day 24 hours
  };
  localStorage.setItem('token', JSON.stringify(session));
}

export function getCurrentSession() {
  const session = localStorage.getItem('token');

  if (session === null) return null;

  const sessionData = JSON.parse(session);

  if (Date.now() > sessionData.expires) {
    localStorage.removeItem('token');
    return null;
  }

  return sessionData.token;
}

export function clearSession() {
  const session = localStorage.getItem('token');

  if (session === null) return;

  localStorage.removeItem('token');
}
