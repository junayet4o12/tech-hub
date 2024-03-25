// import React from 'react';

import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ProductCard from "./ProductCard";

const AllProducts = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: allProducts, isLoading: allProductsIsLoading } = useQuery({
        queryKey: [user, 'all Product'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allProducts')
            return res?.data
        }
    })
    if (allProductsIsLoading) {
        return <div className="flex justify-center items-center gap-5 mt-20">
            <div className="flex flex-col gap-4 w-52">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
            </div>
            <div className="flex flex-col gap-4 w-52">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
            </div>
        </div>
    }
    return (
        <div>
            <div className="px-10 sm:px-32 pt-4">
                <h2 className="text-3xl font-medium pt-5 pb-2 text-gray-600 uppercase">See All Products <br /> add by  <span className="text-4xl font-semibold text-primary">the Users</span></h2>
                <p className="text-base font-medium pb-7 max-w-2xl">Welcome to our user-curated All Products section, where you can explore an extensive range of items handpicked by our community, offering solutions for various preferences and requirements.</p>

            </div>
            <div className="flex flex-wrap justify-center items-center gap-5">
                {
                    allProducts.map(product => <ProductCard key={product?._id} product={product} />)
                }
            </div>
            {
                allProducts.length < 1 && <div className="text-secondary flex flex-col justify-center items-center"><span className="text-3xl font-bold text-primary">Oops!!</span>

                    There is no product added by users!!
                </div>
            }
        </div>
    );
};

export default AllProducts;