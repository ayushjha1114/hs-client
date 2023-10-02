import React, { useEffect, useState } from "react";
import PropTypes, { element } from "prop-types";
import { styled } from "@mui/material/styles";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	FormControlLabel,
	Checkbox,
	Typography,
	Grid,
	Button,
	DialogActions,
	IconButton,
	FormHelperText,
	FormControl,
	FormLabel,
	FormGroup,
	InputLabel,
	Select,
	MenuItem,
} from "@mui/material";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { SET_LOADING, SET_SNACKBAR } from "../auth/authSlice";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	"& .MuiDialogContent-root": {
		padding: theme.spacing(2),
	},
	"& .MuiDialogActions-root": {
		padding: theme.spacing(1),
	},
}));

function BootstrapDialogTitle(props) {
	const { children, onClose, ...other } = props;

	return (
		<DialogTitle sx={{ m: 0, p: 2 }} {...other}>
			{children}
			{onClose ? (
				<IconButton
					aria-label="close"
					onClick={onClose}
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</DialogTitle>
	);
}

BootstrapDialogTitle.propTypes = {
	children: PropTypes.node,
	onClose: PropTypes.func.isRequired,
};

export default function AddFollowUpModal(props) {
	const { show, onHide } = props;
	const location = useLocation();
	const { handleSubmit, control, setValue } = useForm({});
	const [id, setId] = useState(location?.state?.id);
	const followUpTypes = [
		{ name: "Diagnose in process", value: "Diagnose in process" },
		{ name: "Pending for spare", value: "Pending for spare" },
		{ name: "Under Observation", value: "Under Observation" },
		{ name: "Pending for quote", value: "Pending for quote" },
		{ name: "Pending for approval", value: "Pending for approval" },
		{
			name: "Pending for installation of Part",
			value: "Pending for installation of Part",
		},
		{ name: "Pending for dilevery", value: "Pending for dilevery" },
		{ name: "Hold", value: "Hold" },
		{ name: "Quote approved", value: "Quote approved" },
		{ name: "Pending for pickup", value: "Pending for pickup" },
		{ name: "As it is return", value: "As it is return" },
		{ name: "Escallation", value: "Escallation" },
	];

	const onSubmit = async (data) => {
		console.log(data);
	};

	return (
		<div>
			<BootstrapDialog
				aria-labelledby="customized-dialog-title"
				open={show}
				scroll="body"
				maxWidth="md"
				fullWidth
			>
				<BootstrapDialogTitle id="customized-dialog-title" onClose={onHide}>
					Add Follow-up
				</BootstrapDialogTitle>
				<form onSubmit={handleSubmit(onSubmit)}>
					<DialogContent dividers>
						<Grid container sx={{ paddingTop: "1%" }} spacing={2}>
							<Grid item xs={12} sm={4}>
								<Controller
									name="type"
									control={control}
									rules={{
										required: {
											value: true,
											message: "Follow up Type is required.",
										},
									}}
									render={({
										field: { onChange, value },
										fieldState: { error },
									}) => (
										<FormControl size="small" fullWidth error={!!error}>
											<InputLabel id="demo-simple-select-label">
												Follow-Up Type
											</InputLabel>
											<Select
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												value={value}
												label="followUpType"
												onChange={onChange}
												error={!!error}
											>
												{followUpTypes.map((type) => (
													<MenuItem key={type.value} value={type.value}>
														{type.name}
													</MenuItem>
												))}
											</Select>
											<FormHelperText>{error?.message}</FormHelperText>
										</FormControl>
									)}
								/>
							</Grid>
							<Grid item xs={12} sm={4}>
								<Controller
									name="problem"
									id="problem"
									control={control}
									rules={{
										required: {
											value: true,
											message: "Problem is required.",
										},
									}}
									render={({
										field: { onChange, value },
										fieldState: { error },
									}) => (
										<TextField
											size="small"
											fullWidth
											id="problem"
											InputLabelProps={{
												shrink: true,
											}}
											label="Problem"
											multiline
											error={!!error}
											helperText={error?.message}
											rows={2}
											value={value}
											onChange={onChange}
										/>
									)}
								/>
							</Grid>
							<Grid item xs={12} sm={4}>
								<Controller
									name="remark"
									id="remark"
									control={control}
									rules={{
										required: {
											value: true,
											message: "Remark is required.",
										},
									}}
									render={({
										field: { onChange, value },
										fieldState: { error },
									}) => (
										<TextField
											size="small"
											fullWidth
											id="remark"
											InputLabelProps={{
												shrink: true,
											}}
											label="Remark"
											multiline
											error={!!error}
											helperText={error?.message}
											rows={2}
											value={value}
											onChange={onChange}
										/>
									)}
								/>
							</Grid>
						</Grid>
					</DialogContent>
					<DialogActions>
						<Button autoFocus variant="contained" type="submit">
							Save
						</Button>
					</DialogActions>
				</form>
			</BootstrapDialog>
		</div>
	);
}
