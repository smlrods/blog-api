import { Router } from "express";
import * as commentController from '../controllers/commentController';
import passport from "passport";

const router = Router();

// DELETE comment
router.delete('/:commentid', passport.authenticate('jwt', { session: false }), commentController.deleteComment);

export default router;
