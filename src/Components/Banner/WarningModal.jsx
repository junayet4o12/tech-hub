/* eslint-disable react/prop-types */
// import React from 'react';

import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const WarningModal = ({open,setOpen}) => {
    const navigate = useNavigate()
    const handleClose = () => {
        setOpen(false)
    }
    return (
        <Dialog
        open={open}
        size={'xs'}
        handler={open}
        
      >
        <DialogHeader className="text-primary/90">You're not logged in yet!!</DialogHeader>
        <DialogBody>
        Please log in to our webpage using your credentials to access the product addition feature. Your contribution is invaluable to us, and we appreciate your effort in enriching our platform. Thank you for your cooperation and support.
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleClose}
            className="mr-1"
          >
            <span>Later</span>
          </Button>
          <Button
          onClick={()=> navigate('/login')}
            className="bg-secondary"
          >
            <span>Log in</span>
          </Button>
        </DialogFooter>
      </Dialog>
    );
};

export default WarningModal;