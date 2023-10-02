import React, { useState } from "react";
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

const TicketView = (props) => {
	const [followupModalShow, setFollowupModalShow] = useState(false);

	const handleclose = () => {
		setFollowupModalShow(!followupModalShow);
	};

	const columns = React.useMemo(() => [
		{
			field: "date",
			headerName: "Date",
			width: 250,
		},
		{
			field: "type",
			headerName: "Follow-up Type",
			width: 250,
		},
		{
			field: "problem",
			headerName: "Problem",
			width: 250,
		},
		{
			field: "remark",
			headerName: "Remark",
			width: 250,
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
										<div>DGSOFT123</div>
									</div>
								</Grid>
								<Grid item xs={12} sm={6}>
									<div className="view-detail">
										<div style={{ width: "30%" }}>
											<Typography>Date :</Typography>
										</div>
										<div>30-12-2090</div>
									</div>
								</Grid>
							</Grid>
							<Grid container sx={{ padding: "1%" }} spacing={1}>
								<Grid item xs={12} sm={6}>
									<div className="view-detail">
										<div style={{ width: "30%" }}>
											<Typography>Customer :</Typography>
										</div>
										<div>Jitendra Singh Prajapati</div>
									</div>
								</Grid>
								<Grid item xs={12} sm={6}>
									<div className="view-detail">
										<div style={{ width: "30%" }}>
											<Typography>Product :</Typography>
										</div>
										<div>CPU</div>
									</div>
								</Grid>
							</Grid>
							<Grid container sx={{ padding: "1%" }} spacing={1}>
								<Grid item xs={12} sm={6}>
									<div className="view-detail">
										<div style={{ width: "30%" }}>
											<Typography>Customer Type :</Typography>
										</div>
										<div>AMC</div>
									</div>
								</Grid>
								<Grid item xs={12} sm={6}>
									<div className="view-detail">
										<div style={{ width: "30%" }}>
											<Typography>Executive :</Typography>
										</div>
										<div>Jitendra Singh Prajapati</div>
									</div>
								</Grid>
							</Grid>
							<Grid container sx={{ padding: "1%" }} spacing={1}>
								<Grid item xs={12} sm={6}>
									<div className="view-detail">
										<div style={{ width: "30%" }}>
											<Typography>Problem :</Typography>
										</div>
										<div>DGSOFT123</div>
									</div>
								</Grid>
								<Grid item xs={12} sm={6}>
									<div className="view-detail">
										<div style={{ width: "30%" }}>
											<Typography>Remark :</Typography>
										</div>
										<div>----------------------</div>
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
								<IconButton aria-label="Save" color="inherit" type="submit">
									<SaveOutlinedIcon />
								</IconButton>,
							]}
						></CardHeader>
						<Divider />
						<CardContent>
							<DataGrid
								sx={{
									height: "calc(100vh - 180px)",
								}}
								columns={columns}
								rows={[]}
								components={{ Toolbar: GridToolbar }}
							/>
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
