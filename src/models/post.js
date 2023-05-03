import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
	content: { type: String, required: true },
	timestamp: { type: Date, required: true },
	published: { type: Boolean, default: false },
	author: { type: Schema.Types.ObjectId, required: true}
});

export default mongoose.model("Post", PostSchema);
