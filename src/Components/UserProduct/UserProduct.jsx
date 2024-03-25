// import React from 'react';

import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import UserProductCard from "./UserProductCard";
import { useNavigate } from "react-router-dom";

const UserProduct = () => {
    const { user } = useAuth();
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure();
    const { data: yourProducts, isLoading: yourProductsIsLoading, refetch: userProductRefetch } = useQuery({
        queryKey: [user, 'all Product'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/userProducts/${user?.email}`)
            return res?.data
        }
    })
    if (yourProductsIsLoading) {
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
                <h2 className="text-3xl font-medium pt-5 pb-2 text-gray-600 uppercase">See All Products <br /> add by  <span className="text-4xl font-semibold text-primary">You</span></h2>
                <p className="text-base font-medium pb-7 max-w-2xl">Dive into our curated All Products section, meticulously chosen by our team to ensure quality, variety, and relevance, offering solutions for every aspect of your life.</p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-5">
                    {
                        yourProducts.map(product=> <UserProductCard key={product?._id} product={product} userProductRefetch={userProductRefetch}/>)
                    }
                    {
                        yourProducts.length <1 && <div className="text-secondary flex flex-col justify-center items-center"><span className="text-3xl font-bold text-primary">Oops!!</span>
                              
                            You do not add any product yet!!
                            <button onClick={()=> navigate('/addProduct')} className="bg-secondary/90 text-white px-2 py-1 rounded transition-all duration-300 hover:bg-secondary my-4">+ Add Product</button>
                        </div>
                    }
                </div>
        </div>
    );
};

export default UserProduct;