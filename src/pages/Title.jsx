import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

export const Title = (props) => {
  return (
    <Typography variant="h5" color="primary">
      {props.children}
    </Typography>
  );
};

Title.propTypes = {
  children: PropTypes.node,
};
