const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
 
const sendEmail = require("../utils/sendEmail");
 
const registerUser = async(req, res) =>{
 
    try{
 
    const{email, password, role} = req.body;
 
    if(!email || !password || !role){
        return res.status(400).json({
            message: "please fill all the fields"
        })
    }
 
    const user = await User.findOne({where:{email: email}});
 
    if(user){
        return res.status(400).json({
            message:`${email} already exists`
        });
    }
 
    //hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);
 
    //create verificationToken
    const verificationToken = crypto.randomBytes(32).toString("hex");
 
    //set expiry date for 1 hour
    const verificationTokenExpires = new Date(Date.now()+ 1 * 60 * 60 * 1000);
 
    const createUser = await User.create({
        email,
        password : hashedPassword,
        role,
        verificationToken,
        verificationTokenExpires
    });
 
    const verificationLink = `http://localhost:3000/api/user/verify-email?token=${verificationToken}`
 
    await sendEmail(
        email,
        "verify your email",
        `
            <p>verify your email by clicking thee button below</p>
            <a ahref=${verificationLink}>click here to verify</a>
        `
    )
 
    return res.status(200).json({
        message: "user registered woah", createUser
    });
 
}catch(error){
    return res.status(400).json({
        message:"something went wrong",
        error: error.message
    })
}
}
 
 
module.exports = registerUser;