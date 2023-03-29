export const getUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')

  let users = await response.json()

  return users;
}