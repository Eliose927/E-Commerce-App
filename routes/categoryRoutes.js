import express from 'express'
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js'
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from '../controllers/categoryController.js'

const router = express.Router()
//create category
router.post('/create-category', requireSignIn, isAdmin, createCategoryController);

//get all cat
router.get('/get-category', categoryController);

//delete
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController);

//single cat
router.get('/single-category/:slug', singleCategoryController)
//update categry
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController)
export default router

