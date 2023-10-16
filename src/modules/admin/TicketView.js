import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
	Card,
	CardHeader,
	Divider,
	Typography,
	Grid,
	CardContent,
	IconButton,
} from "@mui/material";
import UserLayout from "../../layout/User";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import AddFollowUpModal from "./AddFollowUpModal";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetTicketDetailByIdQuery } from "../../services/admin";
import moment from "moment";
import { SET_LOADING, SET_SNACKBAR } from "../auth/authSlice";

const TicketView = (props) => {
	const dispatch = useDispatch();
	const [followupModalShow, setFollowupModalShow] = useState(false);
	const location = useLocation();
	const [id, setId] = useState(location?.state?.id);
	const [detail, setDetail] = useState();

	const handleclose = () => {
		setFollowupModalShow(!followupModalShow);
	};
	const { data, error, isLoading } = useGetTicketDetailByIdQuery(id);

	useEffect(() => {
		if (isLoading) {
			dispatch(SET_LOADING({ data: true }));
		} else if (error) {
			dispatch(SET_LOADING({ data: false }));
			dispatch(
				SET_SNACKBAR({
					open: true,
					message: "Technical Error",
					variant: "error",
				})
			);
		} else if (data) {
			console.log("🚀 ~ file: TicketView.js:47 ~ useEffect ~ data:", data);
			setDetail(data?.data?.ticket);
			dispatch(SET_LOADING({ data: false }));
		}
	}, [data, isLoading, error]);

	const columns = React.useMemo(() => [
		{
			field: "date",
			headerName: "Date",
			renderCell: (params) => {
				return moment(params.row.createdAt).format("DD/MM/YYYY");
			},
			flex: 1,
		},
		{
			field: "type",
			headerName: "Follow-up Type",
			flex: 1,
		},
		{
			field: "problem",
			headerName: "Problem",
			flex: 1,
		},
		{
			field: "remark",
			headerName: "Remark",
			flex: 1,
		},
		{
			field: "engineer",
			headerName: "Engineer",
			flex: 1,
			renderCell: (params) => {
				return params.row?.extra_field?.engineer?.label
					? params.row?.extra_field?.engineer?.label
					: "";
			},
		},
		{
			field: "quoteAmount",
			headerName: "Amount Quote",
			flex: 1,
			renderCell: (params) => {
				return params.row?.extra_field?.quote_amount
					? params.row?.extra_field?.quote_amount
					: "";
			},
		},
		{
			field: "sparePartDetail",
			headerName: "Spare Part Detail",
			flex: 1,
			renderCell: (params) => {
				return params.row?.extra_field?.spare_part_detail
					? params.row?.extra_field?.spare_part_detail
					: "";
			},
		},
	]);

	return (
		<>
			<UserLayout>
				<Card
					sx={{
						margin: "4% 0%",
						padding: "20px 10px",
						borderRadius: "8px",
						height: "auto",
					}}
				>
					<CardHeader title="Ticket Details"></CardHeader>
					<Divider />
					<Card
						sx={{
							margin: "1% 0%",
							borderRadius: "8px",
							height: "auto",
						}}
					>
						<CardHeader
							title="Details"
							sx={{ backgroundColor: "#1976d2", color: "white" }}
						></CardHeader>
						<Divider />
						<CardContent>
							<Grid container sx={{ padding: "1%" }} spacing={1}>
								<Grid item xs={12} sm={6}>
									<div className="view-detail">
										<div style={{ width: "30%" }}>
											<Typography>Ticket Number :</Typography>
										</div>
										<div>{detail?.ticket_number}</div>
									</div>
								</Grid>
								<Grid item xs={12} sm={6}>
									<div className="view-detail">
										<div style={{ width: "30%" }}>
											<Typography>Date :</Typography>
										</div>
										<div>{detail?.date}</div>
									</div>
								</Grid>
							</Grid>
							<Grid container sx={{ padding: "1%" }} spacing={1}>
								<Grid item xs={12} sm={6}>
									<div className="view-detail">
										<div style={{ width: "30%" }}>
											<Typography>Customer :</Typography>
										</div>
										<div>{detail?.customer}</div>
									</div>
								</Grid>
								<Grid item xs={12} sm={6}>
									<div className="view-detail">
										<div style={{ width: "30%" }}>
											<Typography>Product :</Typography>
										</div>
										<div>{detail?.parent_service}</div>
									</div>
								</Grid>
							</Grid>
							<Grid container sx={{ padding: "1%" }} spacing={1}>
								<Grid item xs={12} sm={6}>
									<div className="view-detail">
										<div style={{ width: "30%" }}>
											<Typography>Customer Type :</Typography>
										</div>
										<div>
											{detail?.customer_plan ? detail?.customer_plan : "Normal"}
										</div>
									</div>
								</Grid>
								<Grid item xs={12} sm={6}>
									<div className="view-detail">
										<div style={{ width: "30%" }}>
											<Typography>Executive :</Typography>
										</div>
										<div>{detail?.engineer}</div>
									</div>
								</Grid>
							</Grid>
							<Grid container sx={{ padding: "1%" }} spacing={1}>
								<Grid item xs={12} sm={6}>
									<div className="view-detail">
										<div style={{ width: "30%" }}>
											<Typography>Problem :</Typography>
										</div>
										<div>{detail?.service_provided}</div>
									</div>
								</Grid>
								<Grid item xs={12} sm={6}>
									<div className="view-detail">
										<div style={{ width: "30%" }}>
											<Typography>Remark :</Typography>
										</div>
										<div>{detail?.remark}</div>
									</div>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
					<Card
						sx={{
							margin: "1% 0%",
							borderRadius: "8px",
							height: "auto",
						}}
					>
						<CardHeader
							title="Follow up"
							sx={{ backgroundColor: "#1976d2", color: "white" }}
							action={[
								<IconButton
									aria-label="add"
									color="inherit"
									onClick={() => setFollowupModalShow(true)}
								>
									<AddBoxOutlinedIcon />
								</IconButton>,
							]}
						></CardHeader>
						<Divider />
						<CardContent>
							{data ? (
								<>
									<DataGrid
										sx={{
											height: "calc(100vh - 180px)",
										}}
										columns={columns}
										rows={data?.data?.ticket?.follow_ups}
										components={{ Toolbar: GridToolbar }}
									/>
								</>
							) : (
								""
							)}
						</CardContent>
					</Card>
				</Card>
			</UserLayout>
			{followupModalShow ? (
				<AddFollowUpModal show={followupModalShow} onHide={handleclose} />
			) : (
				""
			)}
		</>
	);
};
export default TicketView;
