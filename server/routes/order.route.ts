import express from 'express'
import { createOrder, getAllOrders, newPayment, sendStripePublishableKey } from "../controllers/order.controller";
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
const router = express.Router()

router.post("/create-order",isAuthenticated, createOrder)
router.get("/get-all-orders", isAuthenticated, authorizeRoles("admin"), getAllOrders)

router.get("/payment/stripepublishablekey", sendStripePublishableKey)
router.post("/payment", isAuthenticated, newPayment)

export default router