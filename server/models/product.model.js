import mongoose, { disconnect } from "mongoose";

const productSchema = new mongoose.Schema({
 name:{
     type: String,
 },
 Image:{
    type:Array,
    default:[],

 },
 category:[
    {
       type:mongoose.Schema.Types.ObjectId,
         ref:'category'
    }
 ],
 subcategory:[
    {
       type:mongoose.Schema.Types.ObjectId,
         ref:'subCategory'
    }
 ],
 unit:{
    type:String,
    default:""
 },
 stock:{
type:Number,
default:null
 },
 price:{
    type:Number,
    default:null
 },
 diccount:{
    type:Number,
    default:null
 },
 description:{
    type:String,
    default:""
 },
 more_details:{
    type:Object,
    default:{}
 },
 pulish:{
    type:Boolean,
    default:true
 }

},{
    timestamps:true
})

const ProductModel=mongoose.model('product',productSchema);

export default ProductModel;