import express from 'express'
import { registerController, loginController, testController, forgotPasswordController, updateProfileController } from '../controllers/authController.js'
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js';
//router obj
const router = express.Router()

//routing
//register

router.post('/register', registerController);

//Login
router.post('/login', loginController);
//ForgotPassword
router.post('/forgot-password', forgotPasswordController);

router.get('/test', requireSignIn, isAdmin, testController);



//protected route auth
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true })
});
//protected  admin route auth
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true })
});

//update
router.put('/profile', requireSignIn, updateProfileController)



export default router

