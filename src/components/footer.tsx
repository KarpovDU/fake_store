import { Box, Paper, Typography } from "@mui/material"
import { FaTelegram, FaGithub } from "react-icons/fa"
import { FaVk } from "react-icons/fa6"

export function Footer() {
  const telegram = "https://t.me/karpovdu"
  const vkontakte = "https://vk.com/yoshi_city"
  const github = "https://github.com/KarpovDU"

  return (
    <Paper sx={{ width: "100%", py: 5 }} square>
      <Box
        sx={{
          maxWidth: 1200,
          width: 1200,
          mx: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>Copyright © 2025 - Karpov Dmitry</Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <a target="_blank" href={telegram}>
            <FaTelegram color="#0088CC" size={30} />
          </a>
          <a target="_blank" href={vkontakte}>
            <FaVk color="#4C75A3" size={30} />
          </a>
          <a target="_blank" href={github}>
            <FaGithub color="black" size={30} />
          </a>
        </Box>
      </Box>
    </Paper>
  )
}
