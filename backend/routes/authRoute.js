import  express from "express";
import{loginController, registerController,testController,forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController} from '../controllers/authController.js'
//import { requireSignIn } from "../middlewares/authMiddleware.js";
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';


//routing object
const router=express.Router()

//routing
//Register
router.post('/register',registerController)

//Login ||Method:Post

router.post("/login",loginController)

//forgot Password
router.post("/forgot-password",forgotPasswordController)

//test route dummy
 router.get("/test",requireSignIn,isAdmin,testController)

 //protected user  route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
  });

  // protected route for Admin
  router.get('/admin-auth', requireSignIn,isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
  });

  //update Profile
router.put('/profile',requireSignIn,updateProfileController)


//orders
router.get('/orders',requireSignIn,getOrdersController)


//get all orders
router.get("/all-orders",isAdmin,requireSignIn,getAllOrdersController)

router.put("/order-status/:orderId",requireSignIn,isAdmin,orderStatusController)
export default router;