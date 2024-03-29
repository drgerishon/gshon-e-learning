import express from 'express';
import {
  registerUser,
  activateUser,
  loginUser,
  logoutUser,
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
router.get('/get-user', isAuthenticated, getUserInfo);
router.post('/social-auth', socialAuth);
router.put('/update-user-info',isAuthenticated, updateUserInfo)
router.put('/update-Password',isAuthenticated, updatePassword)
router.put('/update-user-avatar',isAuthenticated, updateProfilePicture)
router.get('/get-all-users',isAuthenticated,authorizeRoles("admin"), getAllUsers)
router.put('/update-user',isAuthenticated,authorizeRoles("admin"), updateUserRole)
router.delete('/delete-user/:id',isAuthenticated,authorizeRoles("admin"), deleteUser)








export default router;
