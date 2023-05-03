import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	email: { type: String, required: true },
	comment: { type: String, required: true },
	timestamp: { type: Date, required: true },
	post: { type: Schema.Types.ObjectId }
});

export default mongoose.model("Comment", CommentSchema);
