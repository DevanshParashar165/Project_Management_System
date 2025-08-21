import mongoose, { Schema } from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import crypto from "crypto"

const userSchema = new Schema({
    avatar : {
        type : {
            url : String,
            localPath : String
        },
        default : {
            url : `https://placehold.co/600x400`,
            localPath : ""
        }
    },
    usename : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        index : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true
    },
    fullname : {
        type : String,
        trim : true
    },
    password : {
        type : String,
        required : [true, "Password is required"]
    },
    isEmailVerified : {
        type : Boolean,
        default : false
    },
    refreshToken : {
        type : String,
        required : true
    },
    forgotPasswordToken : {
        type : String
    },
    forgotPasswordExpiry : {
        type : Date
    },
    emailVerificationToken : {
        type : String
    },
    emailVerificationExpiry : {
        type : Date
    },
}
,
{
    timestamps : true
})

userSchema.pre("save" , async function (next){
    if(!this.isModified("password")){
      return next()
    } 
    this.password = await bcrypt.hash(this.password,10)
    next()
})

userSchema.method.isPasswordCorrect = async function (password) {
   return await bcrypt.compare(password,this.password)
}

userSchema.method.generateAccessToken = function(){
    jwt.sign(
        {
        _id : this.id,
        email : this.email,
        usename : this.username
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn : ACCESS_TOKEN_EXPIRY
    }
    )
}

userSchema.method.generateRefreshToken = function(){
    jwt.sign(
        {
        _id : this.id,
        email : this.email,
        usename : this.username
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn : REFRESH_TOKEN_EXPIRY
    }
    )
}

userSchema.method.generateTemporaryToken = function(){
    const unhashedToken = crypto.randomBytes(20).toString("hex")

    const hashedToken = crypto.createHash("sha256")
                              .update(unhashedToken)
                              .digest("hex")

    const tokenExpiry = Date.now() + (20*60*1000) // added 20 minutes                         
}

export const User =  mongoose.model("User",userSchema)