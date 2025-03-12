import mangoose from "mongoose";

const orderSchema = new mangoose.Schema({
    userId:{
        type: mangoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    orderId:{
        type: String,
        required: [true, "Order Id is required"],
        unique: true,
    },
    productId:{
        type: mangoose.Schema.Types.ObjectId,
        ref: 'product',
    },

    product_details:{
        name: String,
        Image : Array,
    },
    paymentId:{
        type: String,
        default:""

    },
    payment_Status:{
        type: String,
        default:""
    },
    delivery_address : {
        type : mangoose.Schema.Types.ObjectId,
        ref : 'address'
    },
    subTotalAmt : {
        type : Number,
        default : 0
    },
    totalAmt : {
        type : Number,
        default : 0
    },
    invoice_receipt : {
        type : String,
        default : ""
    }
},{
    timestamps:true
})

const OrderModel = mangoose.model('order',orderSchema);

export default OrderModel;