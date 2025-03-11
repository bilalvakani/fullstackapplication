import mangoose from 'mongoose';

const categorySchema = new mangoose.Schema({
    name:{
        type : String,
        default : ''
    },
    Image:{
        type : String,
        default : ''
    },
},{
    timestamps:true
});

const CategoryModel=mangoose.model('category',categorySchema);

export default CategoryModel;