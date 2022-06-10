
export interface IUser {
  userName?: string;
  role?: string;
}

const getUser = (): IUser|null => {
  const userData = localStorage.getItem("user");
  if (userData)
      return JSON.parse(userData);
  else return null;
};
  
const setUser = (user: IUser) => {
  const userJson = JSON.stringify(user);
  localStorage.setItem("user", userJson);
};
  
const removeUser = () => {
  localStorage.removeItem("user");
};
  
const TokenService = {
  getUser,
  setUser,
  removeUser,
};
  
export default TokenService;