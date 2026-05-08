const mongoose=require('mongoose')
const UserSchema=new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    role:{ type: String, enum: ["SUPER_ADMIN", "ADMIN", "USER"] },
    orgId:{type:mongoose.Schema.Types.ObjectId}
})
UserSchema.index({ key: 1, orgId: 1 }, { unique: true });
const UserModel= mongoose.model('User',UserSchema)
module.exports=UserModel