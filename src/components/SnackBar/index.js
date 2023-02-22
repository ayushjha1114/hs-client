import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { SET_SNACKBAR } from "../../modules/auth/authSlice";

const SnackBar = () => {
  const dispatch = useDispatch();
  const snackBar = useSelector((state) => state.auth.snackBar);

  const { open, message, variant } = snackBar;
  const handleClose = () => {
    dispatch(SET_SNACKBAR({ open: false }));
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity={variant}
          sx={{ width: "100%" }}
        >
          {message}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default SnackBar;
