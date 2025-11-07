import styled from "@emotion/styled"
import { Button, Box, Paper, Typography } from "@mui/material"

export const DataGridContainer = styled("div")(() => ({
  // width: "fit-content",
  // margin: "0 auto",
}))

export const PageContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: "calc(100vh - 200px)",
  padding: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}))

export const HeaderBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  background:
    theme.palette.mode === "dark"
      ? "linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)"
      : "linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(217, 119, 6, 0.02) 100%)",
  border: `1px solid ${
    theme.palette.mode === "dark"
      ? "rgba(251, 191, 36, 0.2)"
      : "rgba(245, 158, 11, 0.2)"
  }`,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 4px 12px rgba(251, 191, 36, 0.1)"
      : "0 4px 12px rgba(245, 158, 11, 0.1)",
}))

export const DataGridWrapper = styled(Paper)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(2),
  background: theme.palette.background.paper,
  border: `1px solid ${
    theme.palette.mode === "dark"
      ? "rgba(251, 191, 36, 0.15)"
      : "rgba(245, 158, 11, 0.15)"
  }`,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 8px 24px rgba(0, 0, 0, 0.3)"
      : "0 8px 24px rgba(0, 0, 0, 0.08)",
  "& .MuiDataGrid-root": {
    border: "none",
  },
  "& .MuiDataGrid-virtualScroller": {
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "8px",
      height: "8px",
    },
    "&::-webkit-scrollbar-track": {
      background:
        theme.palette.mode === "dark"
          ? "rgba(251, 191, 36, 0.05)"
          : "rgba(245, 158, 11, 0.05)",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
      background:
        theme.palette.mode === "dark"
          ? "rgba(251, 191, 36, 0.3)"
          : "rgba(245, 158, 11, 0.3)",
      borderRadius: "4px",
      "&:hover": {
        background:
          theme.palette.mode === "dark"
            ? "rgba(251, 191, 36, 0.5)"
            : "rgba(245, 158, 11, 0.5)",
      },
    },
  },
  "& .MuiDataGrid-cell": {
    borderBottom: `1px solid ${
      theme.palette.mode === "dark"
        ? "rgba(251, 191, 36, 0.1)"
        : "rgba(245, 158, 11, 0.1)"
    }`,
  },
  "& .MuiDataGrid-columnHeaders": {
    borderBottom: `2px solid ${
      theme.palette.mode === "dark"
        ? "rgba(251, 191, 36, 0.3)"
        : "rgba(245, 158, 11, 0.3)"
    }`,
    fontWeight: 700,
  },
  "& .MuiDataGrid-footerContainer": {
    borderTop: `2px solid ${
      theme.palette.mode === "dark"
        ? "rgba(251, 191, 36, 0.2)"
        : "rgba(245, 158, 11, 0.2)"
    }`,
  },
}))

export const EmptyStateBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "400px",
  padding: theme.spacing(4),
}))

export const EmptyStateText = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: 600,
  color: theme.palette.text.secondary,
  textAlign: "center",
}))

export const FilterContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  width: "100%",
}))

export const ProductImage = styled("img")({
  width: "100%",
  height: "100px",
  objectFit: "cover",
  borderRadius: "8px",
})
