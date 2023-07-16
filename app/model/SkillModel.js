import mongoose from "mongoose";

 const skillSchema = new mongoose.Schema({
    fa_title : {type : String , require:true } ,
    en_title : { type : String , require:true} 
 }) ; 

 const skillModel = mongoose.model("Skill" , skillSchema) ;

 export default skillModel ;