// import md5 from 'crypto-js/md5';

export const PLAYER_LOGIN = 'PLAYER_LOGIN';

export const playerLogin = (payload) => ({
  type: PLAYER_LOGIN,
  payload,
});

const saveToken = (gameToken) => {
  // const token = JSON.stringify(gameToken);
  localStorage.setItem('token', gameToken);
};

export async function fetchToken() {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  console.log(response);
  const data = await response.json();
  console.log(data.token);
  saveToken(data.token);
}
