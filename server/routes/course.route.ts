import express from 'express';

import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import {
  uploadCourse,
  editCourse,
  getSingleCourse,
  getCourses,
  getCourseByUser,
  addQuestion,
  addAnswer,
  addReview,
  addReplyToReveiew,
  getAllCourses
} from '../controllers/course.controller';

const router = express.Router();

router.post(
  '/create-course',
  isAuthenticated,
  authorizeRoles('admin'),
  uploadCourse
);
router.put(
  '/edit-course/:id',
  isAuthenticated,
  authorizeRoles('admin'),
  editCourse
);
router.get('/get-course/:id', getSingleCourse);
router.get('/get-all-course', getCourses);
router.get('/get-course-content/:id', isAuthenticated, getCourseByUser);
router.put('/add-question', isAuthenticated, addQuestion);
router.put('/add-answer', isAuthenticated, addAnswer);
router.put('/add-review/:id', isAuthenticated, addReview);
router.put('/add-reply', isAuthenticated,authorizeRoles("admin"), addReplyToReveiew);
router.get('/get-all-courses', isAuthenticated,authorizeRoles("admin"), getAllCourses);





export default router;
