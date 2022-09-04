// grabs the canvas and the 2d canvas api
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

// sets the canvas size
canvas.width = 1024
canvas.height = 576

// adds the canvas background to the hmtl
ctx.fillStyle = 'white'
ctx.fillRect(0, 0, canvas.width, canvas.height)

// draws the pixel map into the canvas
const image = new Image()
image.src = './images/pokeclone-map.png'
image.onload = () => {
  ctx.drawImage(image, -50, -180)
}
