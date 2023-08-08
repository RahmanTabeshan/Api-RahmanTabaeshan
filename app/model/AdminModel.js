import mongoose from "mongoose";


const adminSchema = new mongoose.Schema({
    Name : {type:String , require:true} ,
    UserName : {type:String , require : true } ,
    Mobile: {type:Number , require:true} ,
    Password : {type:String , require : true } , 
    Status : {type : String , default : "در انتظار تایید"} ,
    Status_Code  : {type:Number , default : 50} ,
    Role : {type : String , defult : "مدیر"}
})

const adminModel = mongoose.model("Admin" , adminSchema) ;

export default adminModel ;