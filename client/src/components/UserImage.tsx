import { Box } from "@mui/material"

interface UserImageProps {
  image?: string;
  size?: string;
}
const UserImage = ({ image, size = "60px" }: UserImageProps) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`${import.meta.env.VITE_APP_ORIGIN}/assets/${image}`}
      />
    </Box>
  )
}

export default UserImage
