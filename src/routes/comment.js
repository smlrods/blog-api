import { Router } from "express";
import * as commentController from '../controllers/commentController';

const router = Router();

// CREATE Comment
router.post('/', commentController.createComment);

// DELETE comment
router.delete('/:commentid', commentController.deleteComment);

export default router;
