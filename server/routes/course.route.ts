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
  getAllCourses,
  deleteCourse,
  generateVideoUrl,
} from '../controllers/course.controller';
import { updateAccessToken } from '../controllers/user.controller';

const router = express.Router();

router.post(
  '/create-course',
  updateAccessToken,
  isAuthenticated,
  authorizeRoles('admin'),
  uploadCourse
);
router.put(
  '/edit-course/:id',
  updateAccessToken,
  isAuthenticated,
  authorizeRoles('admin'),
  editCourse
);
router.get('/get-course/:id', getSingleCourse);
router.get('/get-all-course',getCourses);
router.get('/get-course-content/:id',updateAccessToken, isAuthenticated, getCourseByUser);
router.put('/add-question',updateAccessToken, isAuthenticated, addQuestion);
router.put('/add-answer',updateAccessToken, isAuthenticated, addAnswer);
router.put('/add-review/:id', updateAccessToken, isAuthenticated, addReview);
router.put(
  '/add-reply',
  updateAccessToken,
  isAuthenticated,
  authorizeRoles('admin'),
  addReplyToReveiew
);
router.get(
  '/get-all-courses',
  updateAccessToken,
  isAuthenticated,
  authorizeRoles('admin'),
  getAllCourses
);
router.delete(
  '/delete-course/:id',
  updateAccessToken,
  isAuthenticated,
  authorizeRoles('admin'),
  deleteCourse
);
router.post('/getVdoCipherOtp', generateVideoUrl);

export default router;
