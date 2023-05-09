import models from '../models';
import { body, validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';
import jwt from "jsonwebtoken";
import 'dotenv/config';
import { ExtractJwt } from 'passport-jwt';

const Post = models.Post;

// GET METHOD
const getPosts = async (req, res) => {
  const tokenExtractor = ExtractJwt.fromAuthHeaderAsBearerToken();
  const token = tokenExtractor(req);

  if (!token) {
    const posts = await Post.find({ published: true }, "-published").exec();
    return res.json(posts);
  }

  // verify the token
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.sendStatus(401);
    }

    // if the token is valid
    const posts = await Post.find().exec();
    res.json(posts);
  })
};

// POST METHOD
const createPost = [
  body("title", "Title must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("content", "Content must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  asyncHandler(async (req, res) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      timestamp: Date(),
      author: req.user.id
    });

    // Save post to DB
    await post.save();

    res.sendStatus(201);
  })
];

// GET METHOD
const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postid).exec();

  // Post not found
  if (!post) return res.sendStatus(404);

  res.json(post);
});

// DELETE METHOD
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.postid);
  if (!post) return res.sendStatus(404);
  res.status(204).send('successfully deleted post');
});

// PUT METHOD
const updatePost = [
  body("title", "Title must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("content", "Content must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("published", "Published must be a boolean")
    .trim()
    .isBoolean()
    .escape(),
  asyncHandler(async (req, res) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const post = await Post.findById(req.params.id);
      if (post) {
        return res.status(400).json({ errors: errors.array() });
      }
      return res.sendStatus(404);
    }

    const editedpost = new Post({
      title: req.body.title,
      content: req.body.content,
      published: req.body.published,
      _id: req.params.postid
    });

    // Save post to DB
    const post = await Post.findByIdAndUpdate(req.params.postid, editedpost, {});

    if (!post) return res.sendStatus(404);

    res.status(204).send('post successfully updated');
  })
];

export {
  getPosts,
  createPost,
  getPost,
  deletePost,
  updatePost
};
