import React,{useState,useEffect} from 'react'
import Layout from './../components/Layouts/Layout';
import useCategory from '../hooks/useCategory';
import { Link } from 'react-router-dom';
const Categories = () => {
    const categories=useCategory()
  return (
    <Layout title={'All Categories'}>
      <div className='container'>
       <div className='row'>
        {categories?.map((c)=>(
           <div className='col-md-6 mt-5 mb-3 gx-3 gy-3' key={c._id}>
        <Link className='btn btn-primary' to={`/category/${c.slug}`}>{c.name}</Link>
         </div>
            
            ))}
           

          {/* <div className='col-md-6'></div> */}


       </div>

      </div>
    </Layout>
  )
}

export default Categories
