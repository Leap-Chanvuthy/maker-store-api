const {bucket} = require('../firebase/firebase-config');
const path = require('path');
const Product = require('../models/productModel');
const errorHandler = require('../utils/error');
const mongoose = require('mongoose');


const getProducts = (async(req , res , next) => {
    try {
        const page = parseInt(req.query.page) ||1;
        const limit = 10;
        const skip = (page - 1) * limit;

        const products = await Product.find().skip(skip).limit(limit);
        const totalItem = await Product.countDocuments();

        if (products.length > 0){
            res.status(200).json({
                message : 'success',
                products,
                currentPage : page,
                previous : Math.ceil(page - 1),
                next : Math.ceil (page + 1),
                totalPage : Math.ceil(totalItem / limit)
            });
        }else {
            res.status(400).json({message : "No products found"});
        }
    }
    catch (error){
        next (errorHandler(400 , error));
    }
});



const getProduct = async (req, res, next) => {
    try {
      const id = req.params.id; 
      const product = await Product.findOne({ _id: id });
  
      if (product) {
        res.status(200).json({
          message: 'Success',
          product
        });
      } else {
        res.status(404).json({
          message: 'No product found'
        });
      }
    } catch (error) {
      next(errorHandler(400, error.message));
    }
  };
  

// const createProducts = async (req, res, next) => {
//     try {
//       const { productName, productType, productQty, price, imagePath, description } = req.body;
  
//       if (!productName || !productType || !productQty || !price || !imagePath || !description) {
//         return next(errorHandler(400, 'Please fill in all required fields'));
//       }
  
//       const product = await Product.create({ productName, productType, productQty, price, imagePath, description });
  
//       res.status(201).json({
//         message: 'Product created successfully',
//         product
//       });
//     } catch (error) {
//       next(errorHandler(400, error.message));
//     }
// };


// const createProducts = async (req, res, next) => {
//   try {
//     const { productName, productType, productQty, price, description } = req.body;

//     if (!productName || !productType || !productQty || !price || !description) {
//       return next(errorHandler(400, 'Please fill in all required fields'));
//     }

//     // Check if file is provided
//     if (!req.file) {
//       return next(errorHandler(400, 'Image file is required'));
//     }

//     // Upload image to Firebase Storage
//     const blob = bucket.file(Date.now() + path.extname(req.file.originalname));
//     const blobStream = blob.createWriteStream({
//       resumable: false,
//       contentType: req.file.mimetype
//     });

//     blobStream.on('error', (err) => {
//       next(errorHandler(500, err.message));
//     });

//     blobStream.on('finish', async () => {
//       const imagePath = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      
//       // Create product with image URL
//       const product = await Product.create({
//         productName,
//         productType,
//         productQty,
//         price,
//         imagePath,
//         description
//       });

//       res.status(201).json({
//         message: 'Product created successfully',
//         product
//       });
//     });

//     blobStream.end(req.file.buffer);
//   } catch (error) {
//     next(errorHandler(400, error.message));
//   }
// };

//======

// const createProducts = async (req, res, next) => {
//   try {
//     const { productName, productType, productQty, price, description } = req.body;
//     const user_id = req.user.id;
//     console.log(user_id);

//     if (!productName || !productType || !productQty || !price || !description) {
//       return next(errorHandler(400, 'Please fill in all required fields'));
//     }

//     // Check if files are provided
//     if (!req.files || req.files.length === 0) {
//       return next(errorHandler(400, 'Image files are required'));
//     }

//     const imagePaths = [];

//     for (const file of req.files) {
//       // Generate a unique identifier for the product
//       const productId = new mongoose.Types.ObjectId();
//       const productFolder = `products/${productId}`;

//       // Upload image to Firebase Storage
//       const blob = bucket.file(`${productFolder}/${Date.now()}${path.extname(file.originalname)}`);
//       const blobStream = blob.createWriteStream({
//         resumable: false,
//         contentType: file.mimetype
//       });

//       blobStream.on('error', (err) => {
//         next(errorHandler(500, err.message));
//       });

//       await new Promise((resolve, reject) => {
//         blobStream.on('finish', async () => {
//           // Make the file public
//           await blob.makePublic();
//           const imagePath = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
//           imagePaths.push(imagePath);
//           resolve();
//         });
//         blobStream.end(file.buffer);
//       });
//     }

//     // Create product with image URLs
//     const product = await Product.create({
//       productName,
//       productType,
//       productQty,
//       price,
//       imagePaths, // Store all image URLs
//       description,
//       user_id
//     });

//     res.status(201).json({
//       message: 'Product created successfully',
//       product
//     });
//   } catch (error) {
//     next(errorHandler(400, error.message));
//   }
// };

const createProducts = async (req, res, next) => {
  try {
    const { productName, productType, productQty, price, description } = req.body;
    const user_id = req.user.id;
    console.log(user_id);

    if (!productName || !productType || !productQty || !price || !description) {
      return next(errorHandler(400, 'Please fill in all required fields'));
    }

    // Check if files are provided
    if (!req.files || req.files.length === 0) {
      return next(errorHandler(400, 'Image files are required'));
    }

    const images = [];

    for (const file of req.files) {
      // Generate a unique identifier for the image
      const imageId = new mongoose.Types.ObjectId();
      const productFolder = `products/${imageId}`;

      // Upload image to Firebase Storage
      const blob = bucket.file(`${productFolder}/${Date.now()}${path.extname(file.originalname)}`);
      const blobStream = blob.createWriteStream({
        resumable: false,
        contentType: file.mimetype
      });

      blobStream.on('error', (err) => {
        next(errorHandler(500, err.message));
      });

      await new Promise((resolve, reject) => {
        blobStream.on('finish', async () => {
          // Make the file public
          await blob.makePublic();
          const imagePath = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
          images.push({ imageId, imagePath });
          resolve();
        });
        blobStream.end(file.buffer);
      });
    }

    // Create product with image URLs
    const product = await Product.create({
      productName,
      productType,
      productQty,
      price,
      images, // Store all image information
      description,
      user_id
    });

    res.status(201).json({
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};




const deleteProduct = (async(req , res , next) => {
    try {
        const id = req.params.id;
        const productToDelete = await Product.findByIdAndDelete({_id : id});
        if (productToDelete){
            res.status(200).json({message : 'product deleted successfully'});
        }else {
            res.status(400).json({message : 'failed to delete product'});
        }
    }   
    catch (error){
        next(errorHandler(400 , error));
    }
});



const updateProduct = (async(req , res , next) => {
    try{
        const id = req.params.id;
        const { productName, productType, productQty, price, imagePath, description } = req.body;
        
        const productToUpdate = await Product.findById({_id : id});

        if (!productToUpdate){
            return res.status(400).json({message : 'product not found'});
        }

        productToUpdate.productName = productName;
        productToUpdate.productType = productType;
        productToUpdate.productQty = productQty;
        productToUpdate.price = price;
        productToUpdate.imagePath = imagePath;
        productToUpdate.description = description;

        const updated = await productToUpdate.save();

        res.status(200).json({message : 'success' , product : updated});

    }catch (error){
        next(errorHandler(400 , error));
    }


});
  


  

module.exports = {getProducts , getProduct , createProducts , deleteProduct , updateProduct};