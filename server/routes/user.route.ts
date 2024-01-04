import express from 'express';
import {
  registerUser,
  activateUser,
  loginUser,
  logoutUser,
  updateAccessToken,
  getUserInfo,
  socialAuth,
  updateUserInfo,
  updatePassword,
  updateProfilePicture,
  getAllUsers,
  updateUserRole,
  deleteUser,
} from '../controllers/user.controller';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';

const router = express.Router();

router.post('/registration', registerUser);
router.post('/activate-user', activateUser);
router.post('/login', loginUser);
router.get('/logout', isAuthenticated, logoutUser);
router.get('/refreshtoken', updateAccessToken);
router.get('/get-user',updateAccessToken, isAuthenticated, getUserInfo);
router.post('/social-auth', socialAuth);
router.put('/update-user-info',updateAccessToken,isAuthenticated, updateUserInfo)
router.put('/update-Password',updateAccessToken,isAuthenticated, updatePassword)
router.put('/update-user-avatar',updateAccessToken,isAuthenticated, updateProfilePicture)
router.get('/get-all-users',updateAccessToken,isAuthenticated,authorizeRoles("admin"), getAllUsers)
router.put('/update-user',updateAccessToken,isAuthenticated,authorizeRoles("admin"), updateUserRole)
router.delete('/delete-user/:id',isAuthenticated,authorizeRoles("admin"), deleteUser)








export default router;
