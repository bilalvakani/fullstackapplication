import mangoose from 'mongoose';

const subcategorySchema = new mangoose.Schema({
    name :{
        type: String,
        default:""
    },
    image:{
        type: String,
        default:""
    },
    category:[
        {
            type:mangoose.Schema.Types.ObjectId,
            ref:'category'
        }
    ]
},{
    timestamps:true
})
const SubCategoryModel=mangoose.model('subCategory',subcategorySchema);

export default SubCategoryModel;