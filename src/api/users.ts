import { User } from "../types/api/User";

export const getUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  let users: User[] = (await response.json()) as User[];

  return users;
};
