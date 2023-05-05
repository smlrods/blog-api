import { Router } from "express";
import * as postController from '../controllers/postController';
import * as commentController from '../controllers/commentController';
import passport from "passport";

const router = Router();

// Get all posts
router.get('/', postController.getPosts);

// Create a post
router.post('/', passport.authenticate('jwt', { session: false }), postController.createPost);

// Get a post
router.get('/:postid', postController.getPost);

// Delete a post
router.delete('/:postid', passport.authenticate('jwt', { session: false }), postController.deletePost);

// Update a post
router.put('/:postid', passport.authenticate('jwt', { session: false }), postController.updatePost);

// Get post comments
router.get('/:postid/comments', commentController.getComments);

// Create post comments
router.post('/:postid/comments', commentController.createComment);

export default router;
