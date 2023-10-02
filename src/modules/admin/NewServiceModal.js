import React, { useEffect, useState } from "react";
import PropTypes, { element } from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {
	DialogContent,
	TextField,
	FormControlLabel,
	Checkbox,
	Typography,
	Divider,
} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
	useCreateServiceMutation,
	useUpdateServiceDetailMutation,
	useGetServiceByIdQuery,
	useGetAllServiceQuery,
} from "../../services/admin";
import { useDispatch } from "react-redux";
import { SET_LOADING, SET_SNACKBAR } from "../auth/authSlice";

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

export default function NewServiceModal(props) {
	const dispatch = useDispatch();
	const { show, onHide, isEdit, closeEdit, serviceId } = props;
	const [serviceDetail, setServiceDetail] = React.useState({});
	const [createService] = useCreateServiceMutation();
	const [updateServiceDetail] = useUpdateServiceDetailMutation();
	const { handleSubmit, control, setValue } = useForm({
		defaultValues: {
			name: "",
			description: "",
			service_provided: [
				{
					name: "",
					description: "",
				},
			],
		},
		values: serviceDetail,
	});
	const { data, error, isLoading } = useGetServiceByIdQuery(serviceId);
	const { refetch } = useGetAllServiceQuery();
	const serviceTypes = [
		{ name: "ON-SITE", value: "ON-SITE" },
		{ name: "ONLINE", value: "ONLINE" },
		{ name: "PICK & DROP", value: "PICK & DROP" },
	];

	const onSubmit = async (data) => {
		let response, message;
		data.service_type = JSON.stringify(data.service_type || ["test"]);
		if (isEdit) {
			dispatch(SET_LOADING({ data: true }));
			response = await updateServiceDetail(data);
			message = "Service Update Successfully !";
		} else {
			dispatch(SET_LOADING({ data: true }));
			response = await createService(data);
			message = "Service Created Successfully !";
		}
		if (response?.data?.success) {
			dispatch(SET_LOADING({ data: false }));
			dispatch(
				SET_SNACKBAR({
					open: true,
					message: message,
					variant: "success",
				})
			);
			refetch();
			onHide();
		} else {
			dispatch(SET_LOADING({ data: false }));
			dispatch(
				SET_SNACKBAR({
					open: true,
					message: "Technical Error",
					variant: "error",
				})
			);
		}
	};

	const { fields, append, remove } = useFieldArray({
		control,
		name: "service_provided",
	});

	useEffect(() => {
		if (isEdit && !isLoading && data?.data?.serviceDetail) {
			setServiceDetail(data?.data?.serviceDetail);
		}
	}, [isLoading, data]);

	return (
		<div>
			<BootstrapDialog
				aria-labelledby="customized-dialog-title"
				open={show}
				scroll="body"
				maxWidth="lg"
				fullWidth
			>
				<BootstrapDialogTitle id="customized-dialog-title" onClose={onHide}>
					Create Service
				</BootstrapDialogTitle>
				<form onSubmit={handleSubmit(onSubmit)}>
					<DialogContent dividers>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={12}>
								<Controller
									name="name"
									control={control}
									render={({
										field: { onChange, value, name },
										fieldState: { error },
									}) => (
										<TextField
											id="name"
											size="small"
											fullWidth
											autoFocus
											label="Service Name"
											value={value}
											InputLabelProps={{
												shrink: true,
											}}
											variant="outlined"
											error={!!error}
											helperText={error?.message}
											onChange={onChange}
										/>
									)}
									rules={{
										required: {
											value: true,
											message: "Service Name is required.",
										},
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={12}>
								<Controller
									name="description"
									control={control}
									rules={{
										required: {
											value: true,
											message: "Service Description is required.",
										},
									}}
									render={({
										field: { onChange, value },
										fieldState: { error },
									}) => (
										<TextField
											size="small"
											fullWidth
											id="description"
											InputLabelProps={{
												shrink: true,
											}}
											label="Service Description"
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
						<Divider sx={{ paddingTop: "1%" }}>
							<Typography variant="h6" display="block" gutterBottom>
								Service Provides
							</Typography>
						</Divider>
						{fields.map(({ id }, index) => (
							<Grid container sx={{ paddingTop: "1%" }} spacing={2} key={id}>
								<Grid item xs={3} sm={3}>
									<Controller
										name={`service_provided[${index}].name`}
										control={control}
										render={({ field, fieldState: { error } }) => (
											<TextField
												size="small"
												fullWidth
												label="Name"
												{...field}
												variant="outlined"
												error={!!error}
												helperText={error?.message}
											/>
										)}
										rules={{
											required: {
												value: true,
												message: "Service Provides Name is required.",
											},
										}}
									/>
								</Grid>
								<Grid item xs={4} sm={4}>
									<Controller
										name={`service_provided[${index}].description`}
										control={control}
										render={({ field, fieldState: { error } }) => (
											<TextField
												size="small"
												fullWidth
												label="Description"
												{...field}
												variant="outlined"
												error={!!error}
												helperText={error?.message}
											/>
										)}
										rules={{
											required: {
												value: true,
												message: "Service Provides Description is required.",
											},
										}}
									/>
								</Grid>
								<Grid item xs={4} sm={4}>
									{serviceTypes.map((element, i) => (
										<Controller
											name={`service_provided[${index}].serviceType.${element.value}`}
											control={control}
											defaultValue={false}
											render={({ field }) => (
												<FormControlLabel
													{...field}
													control={<Checkbox checked={field.value} />}
													label={element.name}
												/>
											)}
										/>
									))}
								</Grid>
								<Grid item xs={1} sm={1}>
									{fields.length !== 1 ? (
										<IconButton
											aria-label="delete"
											color="error"
											onClick={() => remove(index)}
											size="small"
										>
											<DeleteIcon />
										</IconButton>
									) : (
										""
									)}
									{fields.length === index + 1 ? (
										<IconButton
											aria-label="add"
											color="primary"
											onClick={() =>
												append({ name: "", description: "", serviceType: "" })
											}
											size="small"
										>
											<AddCircleIcon />
										</IconButton>
									) : (
										""
									)}{" "}
								</Grid>
							</Grid>
						))}
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
