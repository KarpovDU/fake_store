import { Box, Paper, Typography } from "@mui/material"
import StarIcon from "@mui/icons-material/Star"
import { format } from "date-fns"

import type { Product } from "../types"

export const Review = ({ review }: { review: Product["reviews"][0] }) => {
  return (
    <Paper sx={{ padding: 1, display: "flex", flexDirection: "column", gap: 1, flex: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography sx={{ color: theme => theme.palette.primary.main }}>{review.reviewerName}</Typography>
          <Typography fontSize={10} sx={{ color: theme => theme.palette.grey[600] }}>
            {review.reviewerEmail}
          </Typography>
        </Box>
      </Box>
      <Typography sx={{ flexGrow: "1" }}>{review.comment}</Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <StarIcon fontSize="small" color="warning" />
          <Typography>{review.rating}</Typography>
        </Box>
        <Typography fontSize={10} sx={{ color: theme => theme.palette.grey[600] }}>
          {format(new Date(review.date), "dd.MM.yy")}
        </Typography>
      </Box>
    </Paper>
  )
}
