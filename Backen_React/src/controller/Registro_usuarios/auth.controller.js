import { signup } from './Auth_Compo/signup.controller.js';
import { login } from './Auth_Compo/login.controller.js';
import { logout } from './Auth_Compo/logout.controller.js';
import { checkAuth, PermisosAutorisacion, debugAuth } from './Auth_Compo/utils.controller.js';
import { updateName, updatePassword } from './Auth_Compo/updateProfile.controller.js';


export {
  signup,
  login,
  logout,
  checkAuth,
  PermisosAutorisacion,
  debugAuth,
  updateName,
  updatePassword   
};