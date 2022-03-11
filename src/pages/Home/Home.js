import React from 'react'
import GifSection from '../../components/GifSection/GifSection'
import IframeInsta from '../../components/IframeInsta/IframeInsta'
import ItemListContainer from '../ItemListContainer/ItemListContainer'
import Footer from '../../components/Footer/Footer'
import CopyRight from '../../components/CopyRight/CopyRight'

export default function Home() {
    return (
        <>
            <GifSection />
            <ItemListContainer /> 
            <IframeInsta />    
            <Footer />
            <CopyRight />  
        </>
    )
}
