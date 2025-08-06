import { Box } from "@mui/material"

export const InfoRow = ({ first, second }: { first: string; second: string }) => {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
        <Box>{first}</Box>
        <Box sx={{ display: "flex", alignItems: "flex-start", flex: 1 }}>
          <Box
            sx={{
              height: "90%",
              width: "100%",
              borderBottomColor: "grey",
              borderBottomWidth: "1px",
              borderBottomStyle: "dotted",
            }}
          />
        </Box>
        <Box>{second}</Box>
      </Box>
    </>
  )
}
