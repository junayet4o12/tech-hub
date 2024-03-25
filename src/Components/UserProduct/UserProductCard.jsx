/* eslint-disable react/prop-types */
// import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const UserProductCard = ({ product, userProductRefetch }) => {
    const { user } = useAuth();
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const handleDelete = () => {
        axiosSecure.delete(`/deleteProduct/${product?._id}`)
            .then(res => {
                if (res.statusText == 'OK') {
                    Swal.fire({
                        icon: "success",
                        title: "Product Added successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    userProductRefetch()
                }
            })
            .catch(err => {
                console.log(err?.message);
            })
    }
    return (
        <Card className="w-96">
            <CardHeader shadow={false} floated={false} className="h-96">
                <img
                    src={product?.imgUrl}
                    alt="card-image"
                    className="h-full w-full object-cover"
                />
            </CardHeader>
            <CardBody>
                <div className="mb-2 flex items-center justify-between">
                    <Typography color="blue-gray" className="font-medium">
                        {product?.productName}
                    </Typography>
                    <Typography color="blue-gray" className="font-medium">
                        ${product?.price}
                    </Typography>
                </div>
                <textarea
                    disabled
                    value={product?.description}
                    className="font-normal opacity-75 w-full h-40 text-sm"
                ></textarea>
            </CardBody>
            <CardFooter className="pt-0 flex gap-10">
                <Button
                    onClick={() => navigate(`/updateProduct/${product?._id}`)}
                    ripple={false}
                    fullWidth={true}
                    className="bg-secondary/90 text-white shadow-none hover:scale-105 hover:bg-secondary hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                >
                    Update
                </Button>
                <Button
                    onClick={handleDelete}
                    ripple={false}
                    fullWidth={true}
                    className="bg-primary/90 text-white shadow-none hover:scale-105 hover:bg-primary hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                >
                    Delete
                </Button>
            </CardFooter>
        </Card>
    );
};

export default UserProductCard;