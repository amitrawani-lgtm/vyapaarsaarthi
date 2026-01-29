import {User} from "../models/User.js"
import {Product} from "../models/Product.js";

export const productController = async(req,res)=>{
    let {name,price,stock,category} = req.body;
    const newProduct = new Product({
        name : name,
        price : price,
        stock : stock,
        category : category,
        user : req.user._id,
    })
    let savedProduct = await newProduct.save();
    res.send("saved");
}

export const getProductController= async(req,res)=>{
   const products = await Product.find({user : req.user._id});
   res.send(products);
}