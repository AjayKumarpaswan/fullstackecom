import  express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import { braintreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFiltersController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController } from './../controllers/productController.js';
import formidable from 'express-formidable'
const router=express.Router()

//routes
router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController)

//get all products

router.get('/get-product',getProductController)

//get single product
router.get('/get-product/:slug',getSingleProductController)

//get Photo
router.get('/product-photo/:pid',productPhotoController)


//delete product
router.delete('/delete-product/:pid',deleteProductController)


//update Product

router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController)

//filter Product

router.post('/product-filters',productFiltersController)


//product count
router.get('/product-count',productCountController)

//product per page

router.get('/product-list/:page',productListController)

//search product

router.get('/search/:keyword',searchProductController)

//similar product
router.get('/related-product/:pid/:cid',relatedProductController)

//categorywise router product
router.get('/product-category/:slug',productCategoryController)

//payment gateway
//token
router.get('/braintree/token',braintreeTokenController)

//payments
router.post('/braintree/payment',requireSignIn,braintreePaymentController)
export default router