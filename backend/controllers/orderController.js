const Order = require("../models/orderModels")
const Product = require('../models/productModel')
const ErrorHander = require('../utils/errorHander')
const catchAsyncError = require('../middleware/catchAsyncError');

//create new Order
exports.newOrder = catchAsyncError(async(req,res,next)=>{

    const {shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice} = req.body;

    const order = await Order.create({
     shippingInfo,
     orderItems,
     paymentInfo,
     itemsPrice,
     taxPrice,
     shippingPrice,
     totalPrice,
     paidAt:Date.now(),
     user:req.user._id
    })

    res.status(201).json({
        success:true,
        order,
    })
})

//get single order
exports.getSingleOrder = catchAsyncError(async(req,res,next)=>{
 
    const order = await Order.findById(req.params.id).populate("user","name email");

    if(!order){
        return next(new ErrorHander("order not found with this id",404))
    }

    res.status(200).json({
        success:true,
        order,
    })
})

//get logged in user order
exports.myOrders = catchAsyncError(async(req,res,next)=>{
 
    const orders = await Order.find({user:req.user._id})


    res.status(200).json({
        success:true,
        orders,
    })
})


//get all orders -- Admin
exports.getAllOrders = catchAsyncError(async(req,res,next)=>{
 
    const orders = await Order.find();
    let totalAmount = 0;

     orders.forEach(order=>{
         totalAmount += order.totalPrice
     })
    res.status(200).json({
        success:true,
        orders,
        totalAmount,
    })
})

//update order status -- Admin
exports.updateOrder = catchAsyncError(async(req,res,next)=>{
 
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHander("order not found with this id",404))
    }
     if(order.orderStatus ==="Delivered"){
         return next(new ErrorHander("you have already delivered this order",400))
     }
     order.orderItems.forEach(async(order)=>{
         await updateStock(order.product,order.quantity)
     })
     order.orderStatus = req.body.status
     if(req.body.status ==="Delivered"){
         order.deliveredAt = Date.now()
     }

     await order.save({validateBeforeSave:false})
      res.status(200).json({
        success:true,
    })
})

async function updateStock(id,quantity){
    const product = await Product.findById(id)

    product.stock = product.stock - quantity ;

    await product.save({validateBeforeSave:false})
} 

//delete order -- Admin
exports.deleteOrder = catchAsyncError(async(req,res,next)=>{
 
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHander("order not found with this id",404))
    }

    await order.remove()

    res.status(200).json({
        success:true,
        
    })
})