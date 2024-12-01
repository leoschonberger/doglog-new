// TODO Still need to update this to be for dogs not pins

// RemoveDog.jsx
// Form component that allows users to remove pins by title

import { Button } from '@mui/material';
import React, { useState } from 'react';
import { removePin } from '../services/pinService';
import { useAuth } from '../components/AuthContext';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';


const RemoveDog = ({ pinId, onPinRemoved }) => {
    // Authenticate user
    const { user } = useAuth();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmRemove = async () => {
        handleClose();
        await handleRemovePin();
    };

    // // Function to handle the removal of the pin
    const handleRemovePin = async () => {
        try {
            // Call the removePin service with the user's ID and the pinId
            await removePin(user.id, pinId);
            console.log('Pin removed successfully');
            onPinRemoved();
        
        // Log the error
        } catch (error) {
            console.error('Error removing pin:', error);
        }
    };

    return (
        <div>
            <Button onClick={handleClickOpen} variant="contained" color="black" size="small">
                <DeleteIcon />
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this pin?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            This action cannot be undone.
                        </DialogContentText>
                    </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConfirmRemove} variant="contained">Delete Pin</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default RemoveDog;