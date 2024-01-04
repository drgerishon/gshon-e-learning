import express from "express";
import { getNotifications, updateNotification } from "../controllers/notification.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { updateAccessToken } from "../controllers/user.controller";
const router = express.Router()

router.get('/get-all-notifications',updateAccessToken, isAuthenticated,authorizeRoles("admin"), getNotifications)
router.put('/update-notification/:id',updateAccessToken,isAuthenticated,authorizeRoles("admin"), getNotifications)

export default router