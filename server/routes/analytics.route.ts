import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { getCoursesAnalytics, getUserAnalytics, getOrdersAnalytics } from "../controllers/analytics.controller";

const analyticRouter = express.Router()

analyticRouter.get('/get-user-analytics', isAuthenticated, authorizeRoles("admin"), getUserAnalytics)
analyticRouter.get('/get-courses-analytics', isAuthenticated, authorizeRoles("admin"), getCoursesAnalytics)
analyticRouter.get('/get-orders-analytics', isAuthenticated, authorizeRoles("admin"), getOrdersAnalytics)





export default analyticRouter