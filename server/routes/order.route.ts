import express from 'express'
import { createOrder, getAllOrders } from "../controllers/order.controller";
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
const router = express.Router()

router.post("/create-order",isAuthenticated, createOrder)
router.get("/get-all-orders", isAuthenticated, authorizeRoles("admin"), getAllOrders)



export default router