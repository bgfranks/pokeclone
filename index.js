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

// sprite constructor
class Sprite {
  constructor({ position, velocity, image }) {
    this.position = position
    this.image = image
  }

  draw() {
    // draws the sprite class position
    ctx.drawImage(this.image, this.position.x, this.position.y)
  }
}

const background = new Sprite({
  position: {
    x: -15,
    y: -220,
  },
  image: image,
})

// stores key pressed
const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
}

// animation loop
function animate() {
  // creates an infite callback animate loop
  window.requestAnimationFrame(animate)

  // draws the map on the canvas
  background.draw()

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

  if (keys.w.pressed) background.position.y += 3
  else if (keys.a.pressed) background.position.x += 3
  else if (keys.d.pressed) background.position.x -= 3
  else if (keys.s.pressed) background.position.y -= 3
}

animate()

// listens for the keydown on wasd
window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = true
      break
    case 'a':
      keys.a.pressed = true
      break
    case 's':
      keys.s.pressed = true
      break
    case 'd':
      keys.d.pressed = true
      break
  }
})

// listens for the keyup on wasd
window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
    case 's':
      keys.s.pressed = false
      break
    case 'd':
      keys.d.pressed = false
      break
  }
})
