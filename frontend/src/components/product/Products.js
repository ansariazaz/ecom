import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../Redux/features/productSlice';
import ProductCard from '../home/ProductCard';
import Loader from '../layout/loader/Loader';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import './products.css'
import MetaData from '../layout/MetaData'
const categories = [
  "Laptop","Footwear","Bottom","Tops","Attire","Camera","Smartphones","Shoping"
]
const Products = () => {
  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1)
  const [price, setPrice] = useState([0, 10000])
  const [category, setCategory] = useState("")
  const [ratings, setRatings] = useState(0)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts({ keyword, currentPage,price,category,ratings }))
  }, [dispatch, keyword, currentPage,price,category,ratings])
  const { data, loading, resultPerPage } = useSelector(state => state.products);
  const { products, productsCount} = data
  console.log(data, loading, resultPerPage, productsCount)
  const setCurrentPageNo = (e) => {
    console.log(e)
    setCurrentPage(e)
  }
  const priceHandler = (e, newPrice) => {
    setPrice(newPrice)
  }
  return (
    <>
      {loading ? <Loader /> : (
        <>
        <MetaData title="PRODUCTS -- ECOMMERCE"/>
          <h2 className='productsHeading'>Products</h2>
          <div className='products'>
            {products && products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <div className='filterBox'>
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay='auto'
              aria-labelledby='range-slider'
              min={0}
              max={10000}
            />
            <Typography>Categories</Typography>
            <ul className='categoryBox'>
             {categories.map((category)=>(
               <li 
               className='category-link'
               key={category}
               onClick={()=>setCategory(category)}
               >{category}</li>
             ))}
            </ul>
            <fieldset>
            <Typography component="legend">Ratings Above</Typography>
            <Slider
              value={ratings}
              onChange={(e,newRating)=>{setRatings(newRating)}}
              aria-labelledby='continuous-slider'
              valueLabelDisplay='auto'
              min={0}
              max={5}
              />
            </fieldset>
          </div>
          {resultPerPage < productsCount && (
            <div className='paginationBox'>
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText='Last'
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </>)}
    </>
  )
}

export default Products