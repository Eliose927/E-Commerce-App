import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import { braintreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productListController, productPhotoController, productsFiltersController, relatedProductController, searchProductController, updateProductController } from '../controllers/productController.js'
import formidable from 'express-formidable'
const router = express.Router()

//routes

router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

router.get('/get-product/:slug', getSingleProductController)

router.get('/product-photo/:pid', productPhotoController)

router.delete('/delete-product/:pid', deleteProductController)

router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController)

//get products
router.get('/get-product', getProductController)

//count prod
router.get('/product-count', productCountController)

//Filter Product
router.post('/product-filters', productsFiltersController)

//search prod
router.get('/search/:keyword', searchProductController)


//prod per page
router.get('/product-list/:page', productListController)


//similar products
router.get('/related-product/:pid/:cid', relatedProductController)

//category wise prod rote
router.get('/product-category/:slug', productCategoryController)


//paymment
//token
router.get('/braintree/token', braintreeTokenController)


//payment
router.post('/braintree/payment', requireSignIn, braintreePaymentController)

export default router