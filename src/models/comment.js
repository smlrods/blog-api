import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	email: { type: String, required: true },
  name: { type: String, required: true },
	comment: { type: String, required: true },
	timestamp: { type: Date, required: true },
	post: { type: Schema.Types.ObjectId, ref: "Post", required: true }
});

export default mongoose.model("Comment", CommentSchema);
