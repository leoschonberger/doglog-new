
import RemoveDog from './RemoveDog';
import UpdateDog from './UpdateDog';
import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem, IconButton } from '@mui/material';

const DogActionsDropdown = ({ dogId, onDogRemoved, onDogUpdated }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
                style={{ color: 'black' }}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleMenuItemClick} style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ paddingRight: '10px' }}>
                        <UpdateDog dogId={dogId} onDogUpdated={onDogUpdated} />
                    </div>
                    <div>
                        <RemoveDog dogId={dogId} onDogRemoved={onDogRemoved} />
                    </div>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default DogActionsDropdown;