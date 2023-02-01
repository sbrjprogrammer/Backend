const { response } = require("express")
const productSchema= require("../models/productSchema")
const ErrorHander = require("../utils/errorHander")
const asyncErrorHandler = require("../middleware/catchAsyncError")
const Apifeatures = require("../utils/Apifeatures")
const catchAsyncError = require("../middleware/catchAsyncError")


exports.getProduct= asyncErrorHandler(async(req,res)=>{
    const resultPerPage = 8;
    const productsCount = await productSchema.countDocuments();
const apifeatures = new Apifeatures(productSchema.find(),req.query)

.search()
.filter().pagination(resultPerPage)    
const product = await apifeatures.query;
res.status(200).json({
    success:true,
    product,
    productsCount
})
})

// admin route
exports.createproduct = asyncErrorHandler (async(req,res)=>{
    req.body.user = req.user.id
const product = await productSchema.create(req.body)
res.status(201).json({
    success:true,
    product
})
})

exports.updateProduct= asyncErrorHandler(async(req,res,next)=>{
    let product = await productSchema.findById(req.params.id)
        if(!product){
            return next(new ErrorHander("product not found",404))
        }

        product = await productSchema.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
            useFindAndModify:true
        })

        res.status(200).json({
            success:true,
            product
        })
    

})

exports.deleteProduct=asyncErrorHandler(async(req,res)=>{
    const product = await productSchema.findById(req.params.id)

    
    if(!product){
        return next(new ErrorHander("product not found",404))

    }
     await product.remove()
     res.status(200).json({
        success:true,
        message:"product deleted suceesfully"
     })

})






exports.getSingleProduct =asyncErrorHandler(async(req,res,next)=>{
    const product =  await productSchema.findById(req.params.id)
    if(!product){
        return next(new ErrorHander("product not found",404))
       
    }

    res.status(200).json({
        success:true,
        product
    })
})


// Create New Review or Update the review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
  
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
  
    const product = await productSchema.findById(productId);
  
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
  
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
  
    let avg = 0;
  
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    product.ratings = avg / product.reviews.length;
  
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
  });


  
// Get All Reviews of a product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await productSchema.findById(req.query.id);
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  });
  
  // Delete Review
  exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
  
    let avg = 0;
  
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    let ratings = 0;
  
    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }
  
    const numOfReviews = reviews.length;
  
    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
    });
  });
  