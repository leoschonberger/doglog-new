// PinsActionDropdown.jsx

/*
 * This file represents the PinActionsDropdown component which provides a dropdown menu for
 * updating and removing pins.
 * 
 * Group Name: Doo Doo Data
 * 
 * Authors:
 * - Sterling Miller
 * 
 * Component: PinActionsDropdown
 * Description: This component provides a dropdown menu displaying options to update and remove pins.
 *              Uses the UpdatePin and RemovePin components.
 * Created by: Sterling Miller
 * Last updated by: Sterling Miller
 * Last updated on: 2024-11-20
 */

import RemovePin from './RemovePin';
import UpdatePin from './UpdatePin';
import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem, IconButton } from '@mui/material';

const PinActionsDropdown = ({ pinId, onPinRemoved, onPinUpdated }) => {
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
                style={{ color: 'white' }}
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
                        <UpdatePin pinId={pinId} onPinUpdated={onPinUpdated} />
                    </div>
                    <div>
                        <RemovePin pinId={pinId} onPinRemoved={onPinRemoved} />
                    </div>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default PinActionsDropdown;