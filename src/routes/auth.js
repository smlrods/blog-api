import { Router } from "express";
import * as authController from '../controllers/authController';
import passport from "passport";

const router = Router();

router.post('/login', passport.authenticate('local', { session: false }), authController.login);

router.post('/signup', passport.authenticate('jwt', { session: false }), authController.signup);

export default router;
