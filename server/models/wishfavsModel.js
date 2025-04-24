import mongoose from "mongoose";

const wishfavsSchema=new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        require:true
    },
    store:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Store",
        require:true
    },
    note:{
        type:String,
    }
},{
    timestamps:true
});

const WishFavs = mongoose.models.WishFavs ||  mongoose.model('WishFavs', wishfavsSchema);
export default WishFavs;