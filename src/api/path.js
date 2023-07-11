



const routes = {
  chat: "/api/chat/all",
  createUser: "/api/user/create",
  loginUser: "/api/user/login",
  authUser: "/api/user/me",
  searchUser: (name) => `/api/user?search=${name}`,
  createChat: "/api/chat/create",
  createGroup: "/api/chat/create/group",
  renameGroup: "/api/chat/rename",
  addUserToGroup: "/api/chat/add/user",
  deleteUserFromGroup: "/api/chat/delete/user"
}


export const API = {
  routes
}