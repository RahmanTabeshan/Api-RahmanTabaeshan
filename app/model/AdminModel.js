import mongoose from "mongoose";


const adminSchema = new mongoose.Schema({
    UserName : {type:String , require : true } ,
    Password : {type:String , require : true } , 
    Status : {type : String , default : "در انتظار تایید"} ,
    Status_Code  : {type:Number , default : 50} ,
    Role : {type : String , defult : "مدیر"}
})

const adminModel = mongoose.model("Admin" , adminSchema) ;

export default adminModel ;