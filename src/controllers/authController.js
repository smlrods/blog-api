import asyncHandler from "express-async-handler";
import models from "../models";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import 'dotenv/config';

const User = models.User;

const signup = [
  // Validate and sanitize
  body("username", "Username must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "Password must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
          next(err);
        }

        const user = new User({
          username: req.body.username,
          password: hashedPassword
        });

        await user.save();
        res.sendStatus(201);
      })
    } 
  })
];

const login = asyncHandler(async (req, res) => {
  // Generate a JWT and send it to the client
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

export {
  signup,
  login
}
