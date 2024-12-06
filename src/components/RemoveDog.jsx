/*
RemoveDog.jsx

Component associated with DogActionsDropdown. Represents the form shown when a user initiates the removal of a dogs
from the DogActionsDropdown component. Handles the deletion of a dog in the database with confirmation from user.
*/

import { Button } from '@mui/material';
import React, { useState } from 'react';
import { removePin } from '../services/pinService';
import { useAuth } from '../components/AuthContext';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { removeDog } from '../services/dogService';


const RemoveDog = ({ dogId, onDogRemoved }) => {
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
        await handleRemoveDog();
    };

    // // Function to handle the removal of the pin
    const handleRemoveDog = async () => {
        try {
            // Call the removePin service with the user's ID and the pinId
            await removeDog(user.id, dogId);
            console.log('Dog removed successfully');
            onDogRemoved();
        
        // Log the error
        } catch (error) {
            console.error('Error removing dog:', error);
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
                <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this dog?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            This action cannot be undone.
                        </DialogContentText>
                    </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConfirmRemove} variant="contained">Delete Dog</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default RemoveDog;