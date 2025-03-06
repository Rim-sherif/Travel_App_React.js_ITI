import React from 'react'
import notFoundImg from "../../assets/404.jpg";
import Footer from '../Footer/Footer';

export default function Notfound() {
  return (
    <div>
        <img className='w-[35%] mx-auto' src={notFoundImg} alt="" />
        <Footer />
    </div>
  )
}
