import { Router } from "express";
import * as postController from '../controllers/postController';
import * as commentController from '../controllers/commentController';

const router = Router();

// Get all posts
router.get('/', postController.getPosts);

// Create a post
router.post('/', postController.createPost);

// Get a post
router.get('/:postid', postController.getPost);

// Delete a post
router.delete('/:postid', postController.deletePost);

// Update a post
router.put('/:postid', postController.updatePost);

// Get post comments
router.get('/:postid/comments', commentController.getComments);

export default router;
