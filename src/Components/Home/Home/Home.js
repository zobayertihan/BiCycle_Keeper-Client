import React, { useState } from 'react';
import AdvertisedItems from '../AdvertisedItems/AdvertisedItems';
import Banner from '../Banner/Banner';
import ProductCatagories from '../ProductCatagories/ProductCatagories';

const Home = () => {

    return (
        <div>
            <Banner></Banner>
            <AdvertisedItems></AdvertisedItems>
            <ProductCatagories></ProductCatagories>
            <h1>Extra Section</h1>

        </div>
    );
};

export default Home;