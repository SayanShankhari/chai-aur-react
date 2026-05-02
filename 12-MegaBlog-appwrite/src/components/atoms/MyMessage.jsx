import { Snackbar, Alert } from '@mui/material';

function MyMessage () {
	return (
		<Snackbar
			open={open}
			autoHideDuration={6000}
			onClose={handleClose}
		>
			<Alert
				onClose={handleClose}
				severity="success"
				variant="filled"
				sx={ { width: '100%' } }
			>
				This is a success Alert inside a Snackbar!
			</Alert>
		</Snackbar>
	);
}

export default MyMessage;