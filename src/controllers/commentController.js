import models from '../models';
import { body, validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';

const Comment = models.Comment;

// GET METHOD
const getComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ post: req.params.postid });

  // Comments not found
  if (!comments) return res.sendStatus(404); 

  res.json(comments);
});

// POST METHOD
const createComment = [
  body("email", "Email must be specified")
    .trim()
    .isLength({ min: 1 })
    .isEmail()
    .withMessage("Email must be valid")
    .escape(),
  body("name", "Name must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("comment", "Comment must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  asyncHandler(async (req, res) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const comment = new Comment({
      email: req.body.email,
      name: req.body.name,
      comment: req.body.comment,
      timestamp: Date(),
      post: req.params.postid 
    });

    // Save comment to DB
    await comment.save();

    res.sendStatus(201);
  })
];

const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findByIdAndDelete(req.params.commentid);
  if (!comment) return res.sendStatus(404);
  res.status(200).send('successfully deleted comment');
});

export {
  getComments,
  createComment,
  deleteComment
};
