import React from 'react';
import {
	AppBar,
	Box,
	FormGroup,
	Toolbar,
	Typography,
	IconButton,
	Switch,
	FormControlLabel,
	MenuItem,
	Menu,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Routes, Route, Link } from 'react-router-dom';

export default function MenuBar() {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<Toolbar>
					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						JS Cycle
					</Typography>
					<div>
						<IconButton
							size='large'
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleMenu}
							color='inherit'>
							<MenuIcon />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorEl)}
							onClose={handleClose}>
							<MenuItem>
								<Link to='/'>Home</Link>
							</MenuItem>
							<MenuItem>
								<Link to='/EditProgram'>Make a new program</Link>
							</MenuItem>
						</Menu>
					</div>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
