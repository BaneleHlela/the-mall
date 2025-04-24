import mongoose from "mongoose";

export const validateMongoDBId = (id) => {
    const isValid = mongoose.Schema.Types.ObjectId.isValid(id);
    if (!isValid) throw new Error("This id is not valid")
}