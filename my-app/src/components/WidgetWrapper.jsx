import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material";

const WidgetWrapper = ({ children }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", justifyContent: "center", m: "2rem" }}>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          backgroundColor: theme.palette.neutral.light,
          boxShadow: `3px 3px 5px ${theme.palette.neutral.dark},-3px -3px 5px ${theme.palette.neutral.dark}`,
        }}
      >
        {children}
      </Paper>
    </Box>
  );
};

export default WidgetWrapper;
