import React, { useEffect } from 'react'
import Carousel from 'react-mui-carousel-artemm'
import './productDetails.css'
import ReactStars from 'react-rating-stars-component'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProductDetails } from '../../Redux/features/productDetailSlice'
import ReviewCard from './ReviewCard.js'
import Loader from '../layout/loader/Loader'
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData'
const ProductDetails = () => {
    const { id } = useParams()
    const alert = useAlert()
    const dispatch = useDispatch();
    const data = useSelector(state => state.productDetails)
    const product = data?.data?.product;
    const {loading,error,message} = data;
    useEffect(() => {
        if(error){
            return alert.error(message)
        }
        dispatch(getProductDetails(id))
    }, [dispatch, id,error,alert,message])
    const options = {
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        value:product?.ratings,
        isHalf:true,
        size:window.innerWidth < 600 ? 20:24,
    }
    return (
        <>
          {loading ? <Loader/>:(
              <>
              <MetaData title={`${product?.name}--ECOMMERCE`}/>
              <div className='ProductDetails'>
                <div className='imgCont'>
                    <div className='img'>
                    <Carousel>
                        {product?.images && product.images?.map((item, i) => (
                            <img src={item.url} alt={`${i} Slide`} className='CarouselImage' key={item.url} />
                        ))}
                    </Carousel>
                    </div> 
                </div>
                <div>
                    <div className='detailsBlock-1'>
                        <h2>{product?.name}</h2>
                        <p>Product# {product?._id}</p>
                    </div>
                    <div className='detailsBlock-2'>
                        <ReactStars {...options} />
                        <span>({product?.numOfReviews} Reviews)</span>
                    </div>
                    <div className='detailsBlock-3'>
                        <h1>₹{product?.price}</h1>
                        <div className='detailsBlock-3-1'>
                            <div className='detailsBlock-3-1-1'>
                                <button>-</button>
                                <input defaultValue="1" type="text" />
                                <button>+</button>
                            </div>
                            <button>Add to Cart</button>
                        </div>
                        <p>
                          Status:
                          <b className={product?.Stock <1 ? "redColor":"greenColor"}>{product?.Stock<1?"Out of Stock":"In Stock"}</b>  
                        </p>
                    </div>
                    <div  className='detailsBlock-4'>
                      Description : <p>{product?.description}</p>
                    </div>
                    <button className='submitReview'>Submit Review</button>
                </div>
            </div>
            <h3 className='reviewsHeading'>REVIEWS</h3>
            {product?.reviews && product?.reviews[0]?(
              <div className='reviews'>
               {product?.reviews && product?.reviews.map((review,i)=>(
                   <ReviewCard review={review} key={i}/>
               ))}
              </div>
            ):(
            <p className='noReviews'>No Reviews Yet.</p>
            )}
              </>
          )}
        </>
    )
}

export default ProductDetails