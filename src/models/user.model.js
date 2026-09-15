import mongoose,{schema} from "mongoose";
import  Jwt  from "jsonwebtoken";
import bcrypt from "bcrypt"




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


},
{
    timestmap: true
}


)
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}




export const User = mongoose.model("User", userSechema)