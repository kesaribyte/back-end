import mongoose,{schema} from "mongoose";

const userSechema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        lowwercase : true,
        trim: true,
        index: true,
    },

    email:{
        type: String,
        required: true,
        unique: true,
        lowwercase : true,
        trim: true,
        
    },

    fullname:{
        type: String,
        required: true,
        lowwercase : true,
        trim: true,
        index: true,
    },

    avatar:{
        type:String, // we use cloudinary url
        required:true,
    },

    coverimg:{
        type: String,

    },

    watchistory:[
        {
            type: Schema.types.objectId,
            ref: "video"
        }
    ],

    password:{
        type: String,
        required:[true, 'password is required'],
    },

    refreshtoken:{
        type: String,
    },


},{timestmap: true})

export const User = mongoose.model("User", userSechema)