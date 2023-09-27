import * as React from "react";
import Popover from "@mui/material/Popover";
import { Grid, Typography } from "@mui/material";

export const Popup = ({ title, text, open, anchorEl, handleClose, position }: any) => {
  const darkGreen = "#0c3a25";
  const lightGreen = "#dff0d8";
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}

    >
      <Grid container sx={{ width: "315px", padding: '1.4rem 1.4rem' }} borderRadius="12px">
        <Typography
          variant="h4"
          mb="1.3rem"
          bgcolor={lightGreen}
          color={darkGreen}
          sx={{
            mixBlendMode: "multiply",
            opacity: "0,6",
            fontFamily: "Clash Grotesk",
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: "24px",
            lineHeight: "108%",
            flex: "none",
            order: "0",
            flexGrow: "0",
          }}
        >
          {title}
        </Typography>
        <Typography
          color="#666666"
          sx={{
            lineHeight: "150%",
          }}
        >
          {text}
        </Typography>
      </Grid>
    </Popover>
  );
};
