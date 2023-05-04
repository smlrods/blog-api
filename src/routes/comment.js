import { Router } from "express";
import * as commentController from '../controllers/commentController';

const router = Router();

// DELETE comment
router.delete('/:commentid', commentController.deleteComment);

export default router;
