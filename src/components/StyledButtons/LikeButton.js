import { Button } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'

const LikeButton = ({ incrementLikes, isUserAllowedToLike, like }) => {
  const buttonStyle = {
    backgroundColor: '#F9F9F9',
    margin: '0 10px', // Add space between buttons
  }

  const likeButtonStyle = {
    ...buttonStyle,
    width: '120px', // Increase the width of the like button
    color: '#4778F9', // Set text color to #4778F9
  }

  const iconStyle = {
    color: 'red', // Set heart icon color to red
  }

  const likesTextStyle = {
    color: '#000', // Set text color to black
  }

  return (
    <>
      <Button
        variant='contained'
        style={likeButtonStyle}
        onClick={incrementLikes}
        disabled={!isUserAllowedToLike}
        startIcon={<FavoriteIcon style={iconStyle} />}
      >
        <span style={likesTextStyle}>{like} Likes</span>
      </Button>
    </>
  )
}

export default LikeButton
