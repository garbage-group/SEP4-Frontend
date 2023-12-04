const apiUrl = "https://jsonplaceholder.typicode.com/";

// function for fetching user list
function fetchUserInfo() {
  return fetch(`${apiUrl}users`).then((res) => res.json());
}

export { fetchUserInfo };
