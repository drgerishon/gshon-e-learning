import express from 'express'
import { createOrder, getAllOrders } from "../controllers/order.controller";
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { updateAccessToken } from '../controllers/user.controller';
const router = express.Router()

router.post("/create-order",updateAccessToken,isAuthenticated, createOrder)
router.get("/get-all-orders",updateAccessToken, isAuthenticated, authorizeRoles("admin"), getAllOrders)



export default router