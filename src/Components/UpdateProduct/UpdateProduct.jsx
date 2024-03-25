// import React from 'react';
import { useState } from 'react';
import productImg from '../../assets/addProduct.jpg'
import formBg from '../../assets/formbg.jpg'
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Button } from '@material-tailwind/react';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
const UpdateProduct = () => {
    const [productCategory, setProductCategory] = useState('');
    const [submitLoading, setSubmitLoading] = useState(false)
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const { id } = useParams();
    const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm()

    // imgBB image hosting api link  st
    const imgHostingKey = import.meta.env.VITE_IMG_HOSTING_KEY;
    const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;
    // imgBB image hosting api link
    const { data: singleProduct, isLoading: singleProductLoading, refetch } = useQuery({
        queryKey: [user, id],
        queryFn: async () => {
            const res = await axiosSecure.get(`singleProduct/${id}`)
            return res?.data
        }
    })
    if (singleProductLoading) {
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
    console.log(singleProduct?.productName);
    const onSubmit = async (data) => {
        setSubmitLoading(true)
        const image = { image: data?.image[0] }
        let imgUrl = singleProduct?.imgUrl
        if (data?.image[0]) {
            const res = await axios.post(imgHostingApi, image, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })

            imgUrl = res?.data?.data?.display_url
        }
        const productName = data?.productName;
        const category = data?.category;
        const description = data?.description;
        const price = parseFloat(data?.price)
        const productDetails = {
            productName,
            category,
            imgUrl,
            description,
            price
        }
        console.log(productDetails);
        axiosSecure.put(`/updateProduct/${id}`, productDetails)
            .then(res => {
                console.log(res);
                if (res.statusText == 'OK') {
                    Swal.fire({
                        icon: "success",
                        title: "Product Added successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch()
                }
                setSubmitLoading(false)
            })
            .catch(err => {
                console.log(err?.message);
                setSubmitLoading(false)
            })
    }
    return (
        <div>
            <div className="px-10 sm:px-32 pt-4">
                <h2 className="text-3xl font-medium pt-5 pb-2 text-gray-600 uppercase">Update the data of product<br />Add by   <span className="text-4xl font-semibold text-primary">you </span></h2>
                <p className="text-base font-medium pb-7 max-w-2xl">Easily modify product details, prices, and descriptions. Keep your inventory current and accurate with simple, intuitive updates. Streamline your e-commerce operations effortlessly.</p>

            </div>
            <div className="py-7 px-7 flex ">
                <div className='w-[50%]  justify-center hidden lg:block items-center' >
                    <div className='h-full flex justify-center items-center'>
                        <img className='w-[500px] h-[400px]  object-cover' src={productImg} alt="" />
                    </div>
                </div>
                <form style={{ backgroundImage: `url(${formBg})` }} onSubmit={handleSubmit(onSubmit)} className="bg-cover bg-center   rounded-md font-bold text-sm w-full max-w-[550px]   mx-auto flex flex-col gap-3 border-[1.5px] border-gray-400 shadow-xl shadow-[#bdb9b9]">
                    <div className='h-full w-full p-4 py-7 flex flex-col bg-[#ffffffb3] gap-5 rounded-md '>
                        <h2 className='text-4xl font-bold text-center py-5'>Update product</h2>
                        <div className='flex gap-4 flex-col '>
                            <div className="relative h-11 w-full min-w-[200px]">
                                <input
                                    {...register("productName", { required: true })}
                                    required
                                    defaultValue={singleProduct?.productName}
                                    className="font-bold w-full   border-black h-full px-3  font-sans text-sm transition-all bg-transparent border rounded-md peer border-t-transparent text-black outline outline-0 placeholder-shown:border-[1.5px] placeholder-shown:border-blue-black placeholder-shown:border-black focus:border-2 focus:border-black focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-black"
                                    placeholder=" "
                                />
                                <label className="font-bold before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-black before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-black after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-black peer-placeholder-shown:after:border-black peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-black peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-black peer-disabled:text-transparent peer-disabled:before:border-black peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                    <span className='font-bold'>Product Name</span>
                                </label>
                            </div>
                            <div className="relative h-11   w-full min-w-[200px]">
                                <select required
                                    {...register("category", { required: true })}
                                    defaultValue={singleProduct?.category}
                                    className="font-bold w-full cursor-pointer   border-black h-full px-3  font-sans text-sm transition-all bg-transparent border rounded-md peer  border-t-transparent text-black outline outline-0 placeholder-shown:border-[1.5px] placeholder-shown:border-blue-black placeholder-shown:border-black focus:border-2 focus:border-black focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-black"

                                >

                                    <option value="" disabled>Select category</option>
                                    <option>Smart Phone</option>
                                    <option>Television</option>
                                    <option>Desktop</option>
                                    <option>Laptop</option>
                                    <option>Light</option>
                                    <option>Networking Switch</option>
                                    <option>Wireless Access Point</option>
                                    <option>Webcam</option>
                                    <option>Scanner</option>
                                    <option>Microphone</option>
                                    <option>Graphics Tablet</option>
                                    <option>E-reader</option>
                                    <option>Portable Charger/Power Bank</option>
                                    <option>Robot Vacuum Cleaner</option>
                                    <option>Electric Toothbrush</option>
                                    <option>Smart Thermostat</option>
                                    <option>Electric Scooter</option>
                                    <option>Electric Bike</option>
                                </select>
                                <label className="font-bold before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-black before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-black after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-black peer-placeholder-shown:after:border-black peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-black peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-black peer-disabled:text-transparent peer-disabled:before:border-black peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                    <span className='font-bold'>Select Category</span>
                                </label>
                            </div>
                        </div>
                        <div className="relative h-11 w-full min-w-[200px]">
                            <input  {...register("image")} type='file'
                                className="font-bold  w-full   border-black py-2 h-full px-3  font-sans text-sm transition-all bg-transparent border rounded-md peer border-t-transparent text-black outline outline-0 placeholder-shown:border-[1.5px] placeholder-shown:border-blue-black placeholder-shown:border-black focus:border-2 focus:border-black focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-black"
                                placeholder=" "
                            />
                            <label className="font-bold before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-black before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-black after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-black peer-placeholder-shown:after:border-black peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-black peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-black peer-disabled:text-transparent peer-disabled:before:border-black peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                <span className='font-bold'>Select Img</span>
                            </label>
                        </div>
                        <div className="relative h-11 w-full min-w-[200px]">
                            <input
                                {...register("price", { required: true })}
                                type='number'
                                defaultValue={singleProduct?.price}
                                required
                                className="font-bold w-full   border-black h-full px-3  font-sans text-sm transition-all bg-transparent border rounded-md peer border-t-transparent text-black outline outline-0 placeholder-shown:border-[1.5px] placeholder-shown:border-blue-black placeholder-shown:border-black focus:border-2 focus:border-black focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-black"
                                placeholder=" "
                            />
                            <label className="font-bold before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-black before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-black after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-black peer-placeholder-shown:after:border-black peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-black peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-black peer-disabled:text-transparent peer-disabled:before:border-black peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                <span className='font-bold'>Price (USD$)</span>
                            </label>
                        </div>
                        <div className="relative h-[170px] w-full min-w-[200px]">
                            <textarea  {...register("description", { required: true })} required
                                defaultValue={singleProduct?.description}
                                className="font-bold w-full   border-black h-full px-3 py-3 font-sans text-sm transition-all bg-transparent border rounded-md peer border-t-transparent text-black outline outline-0 placeholder-shown:border-[1.5px] placeholder-shown:border-blue-black placeholder-shown:border-black focus:border-2 focus:border-black focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-black"
                                placeholder=" "
                            ></textarea>
                            <label className="font-bold before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-black before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-black after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-black peer-placeholder-shown:after:border-black peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-black peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-black peer-disabled:text-transparent peer-disabled:before:border-black peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                <span className='font-bold'> Description</span>
                            </label>
                        </div>
                        <div className='text-center'>
                            {
                                submitLoading ? <Button className='bg-primary w-[140px] h-12 mx-auto capitalize' loading={true}>Updating</Button> : <button className='btn btn-neutral bg-primary/90 hover:bg-primary text-sm font-bold  text-white border-none w-[140px] h-10'>Update</button>
                            }


                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProduct;