// import React from 'react';
import { useState } from 'react';
import productImg from '../../assets/addProduct.jpg'
import formBg from '../../assets/formbg.jpg'
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Button } from '@material-tailwind/react';
import Swal from 'sweetalert2';
const AddProduct = () => {
    const [productCategory, setProductCategory] = useState('');
    const [submitLoading, setSubmitLoading] = useState(false)
    const { user } = useAuth();
    const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm()

    // imgBB image hosting api link  st
    const imgHostingKey = import.meta.env.VITE_IMG_HOSTING_KEY;
    const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;
    // imgBB image hosting api link
    const handleCategory = (e) => {
        setProductCategory(e.target.value)
    }
    const axiosSecure = useAxiosSecure()
    const onSubmit = async (data) => {
        setSubmitLoading(true)
        const image = { image: data?.image[0] }

        const res = await axios.post(imgHostingApi, image, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        
        const imgUrl = res?.data?.data?.display_url
        const productName = data?.productName;
        const category = productCategory;
        const description = data?.description;
        const price = parseFloat(data?.price)
        const productDetails = {
            ownerEmail: user?.email,
            productName,
            category,
            imgUrl,
            description,
            price,
            time: new Date().getTime()
        }
        console.log(productDetails);
        axiosSecure.post('/addProduct', productDetails)
            .then(res => {
                if (res.statusText=='OK') {
                    Swal.fire({
                        icon: "success",
                        title: "Product Added successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    reset();
                    setProductCategory('')
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
                <h2 className="text-3xl font-medium pt-5 pb-2 text-gray-600 uppercase">Add a New Product <br /> to the  <span className="text-4xl font-semibold text-primary">Tech Hub</span></h2>
                <p className="text-base font-medium pb-7 max-w-2xl">Submit your innovation to the Tech Hub now. Share your product's details, and let the world see your creation. We can't wait to showcase your innovation!</p>

            </div>
            <div className="py-7 px-7 flex ">
                <div className='w-[50%]  justify-center hidden lg:block items-center' >
                    <div className='h-full flex justify-center items-center'>
                        <img className='w-[500px] h-[400px]  object-cover' src={productImg} alt="" />
                    </div>
                </div>
                <form style={{ backgroundImage: `url(${formBg})` }} onSubmit={handleSubmit(onSubmit)} className="bg-cover bg-center   rounded-md font-bold text-sm w-full max-w-[550px]   mx-auto flex flex-col gap-3 border-[1.5px] border-gray-400 shadow-xl shadow-[#bdb9b9]">
                    <div className='h-full w-full p-4 py-7 flex flex-col bg-[#ffffffb3] gap-5 rounded-md '>
                        <h2 className='text-4xl font-bold text-center py-5'>Add your product</h2>
                        <div className='flex gap-4 flex-col '>
                            <div className="relative h-11 w-full min-w-[200px]">
                                <input
                                    {...register("productName", { required: true })}
                                    required
                                    className="font-bold w-full   border-black h-full px-3  font-sans text-sm transition-all bg-transparent border rounded-md peer border-t-transparent text-black outline outline-0 placeholder-shown:border-[1.5px] placeholder-shown:border-blue-black placeholder-shown:border-black focus:border-2 focus:border-black focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-black"
                                    placeholder=" "
                                />
                                <label className="font-bold before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-black before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-black after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-black peer-placeholder-shown:after:border-black peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-black peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-black peer-disabled:text-transparent peer-disabled:before:border-black peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                    <span className='font-bold'>Product Name</span>
                                </label>
                            </div>
                            <div className="relative h-11   w-full min-w-[200px]">
                                <select required value={productCategory} onChange={handleCategory}
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
                            <input  {...register("image", { required: true })} type='file' required
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
                                className="font-bold w-full   border-black h-full px-3 py-3 font-sans text-sm transition-all bg-transparent border rounded-md peer border-t-transparent text-black outline outline-0 placeholder-shown:border-[1.5px] placeholder-shown:border-blue-black placeholder-shown:border-black focus:border-2 focus:border-black focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-black"
                                placeholder=" "
                            ></textarea>
                            <label className="font-bold before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-black before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-black after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-black peer-placeholder-shown:after:border-black peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-black peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-black peer-disabled:text-transparent peer-disabled:before:border-black peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                <span className='font-bold'> Description</span>
                            </label>
                        </div>
                        <div className='text-center'>
                            {
                                submitLoading ? <Button className='bg-primary w-[140px] h-12 mx-auto capitalize' loading={true}>Submitting</Button> : <button className='btn btn-neutral bg-primary/90 hover:bg-primary text-sm font-bold  text-white border-none w-[140px] h-10'>Submit</button>
                            }


                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;