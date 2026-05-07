const mongoose=require('mongoose')
const UserSchema=new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    role:{ type: String, enum: ["SUPER_ADMIN", "ADMIN", "USER"] },
    orgId:{type:mongoose.Schema.Types.ObjectId}
})
const UserModel= mongoose.model('User',UserSchema)
module.exports=UserModel