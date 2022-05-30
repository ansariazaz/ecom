import React, { useEffect } from 'react'
import { CgMouse } from "react-icons/cg"
import './home.css';
import { useDispatch } from 'react-redux';
import Product from './ProductCard.js'
import MetaData from '../layout/MetaData'
import { useSelector } from 'react-redux'
import Loader from '../layout/loader/Loader';
import { useAlert } from 'react-alert'
import { getProducts } from '../../Redux/features/productSlice';
const Home = () => {
  const { loading, data,error,message } = useSelector(state => state.products);
  const alert = useAlert();
  const dispatch = useDispatch();
  useEffect(() => {
    if(error){
      return alert.error(message)
    }
    dispatch(getProducts({keyword:"",currentPage:1,price:[0,10000]})) 
  }, [dispatch,error,alert,message])
  
  return (
    <>
      <MetaData title="ECOMMERCE" />
      {loading ? <Loader /> : (
        <>
          <div className='banner'>
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW </h1>
            <a href='#container'>
              <button>Scroll<CgMouse /></button>
            </a>
          </div>
          <h2 className='homeHeading'>Featured Product</h2>
          <div className='container' id='container'>
            {data?.products?.map(product => (
              <Product product={product}  />
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default Home