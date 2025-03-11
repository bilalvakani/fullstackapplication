import mongoose from "mongoose";

const addresSchema = new mangoose.Schema({
    address_line :{
        type: String,
        default:""

    },
    city :{
        type: String,
        default:""
    },
    state:{
        type: String,
        default:""
    },
    pincode:{
        type: String,
    },
    country:{
        type: String,

    },
    mobile:{
        type: Number,
        default:null
    },
},{
   timestamps:true
})

const AddressModel=mongoose.model('address',addresSchema);

export default AddressModel;