import mangoose from 'mongoose';

const cartProductSchema = new mangoose.Schema({
    productId:{
        type: mangoose.Schema.Types.ObjectId,
        ref: 'product',
    },
    quanity:{
        type: Number,
        default:1
    },
    userId:{
        type: mangoose.Schema.Types.ObjectId,
        ref: 'User',
    },
},{
    timestamps:true
})

const CartProductModel=mangoose.model('cartProduct',cartProductSchema);

export default CartProductModel;