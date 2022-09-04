// grabs the canvas and the 2d canvas api
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

// sets the canvas size
canvas.width = 1024
canvas.height = 576

// adds the canvas background to the hmtl
ctx.fillStyle = 'white'
ctx.fillRect(0, 0, canvas.width, canvas.height)

// refs the map image
const image = new Image()
image.src = './images/pokeclone-map.png'

// ref the player sprite
const playerImage = new Image()
playerImage.src = './images/playerDown.png'

image.onload = () => {
  // draws the map on the canvas
  ctx.drawImage(image, -15, -220)

  // draws the player sprite and cropes the sprite sheet
  ctx.drawImage(
    playerImage,
    // cropping (x start, y start, x to, y to )
    0,
    0,
    playerImage.width / 4,
    playerImage.height,
    // location placement of the sprite
    canvas.width / 2 - playerImage.width / 4 / 2,
    canvas.height / 2 - playerImage.height / 2,
    // image size after crop
    playerImage.width / 4,
    playerImage.height
  )
}
