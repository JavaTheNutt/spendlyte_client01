import { fetchIdToken } from '../app/service/auth/authService';

export const fetchHeaders = async () => {
  console.log('request made to fetch headers');
  const authString = await createAuthString();
  if (!authString.success) return authString;
  authString.data = {
    Authorization: authString.data
  };
  return authString;
};

const createAuthString = async () => {
  const token = await fetchToken();
  if (!token.success) return token;
  token.data = `Bearer ${token.data}`;
  return token;
};

const fetchToken = async () => {
  let count = 0;
  const guard = 20;
  while (true) {
    console.log('attempting to fetch token, attempt', count + 1);
    const token = await fetchIdToken();
    console.log('fetch succeeded?', token.success);
    if (token.success) return token;
    count++;
    if (count >= guard) return { success: false, msg: 'token fetch failed' };
    // fixme: find some way to have the store notify the this when login occurs
    await new Promise(resolve => setTimeout(() => resolve(), 50));
  }
};
