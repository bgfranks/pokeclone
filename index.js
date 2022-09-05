// grabs the canvas and the 2d canvas api
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

// sets the canvas size
canvas.width = 1024
canvas.height = 576

// refs the map image
const image = new Image()
image.src = './images/pokeclone-map.png'

// ref the player sprite
const playerImage = new Image()
playerImage.src = './images/playerDown.png'

// creates the offset for the map positioning
const offset = {
  x: -15,
  y: -220,
}

// empty array to store collisions map
const collisionsMap = []

// creates a 2d array by slicing the collision array
// 70 = the number of tiles in the row of the map
// the nested array is each row of the map
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, 70 + i))
}

// boundary constructor
class Boundary {
  static width = 48
  static height = 48
  constructor({ position, width, height }) {
    this.position = position
    this.width = 48
    this.height = 48
  }

  draw() {
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

// stores the boundaries block
const boundaries = []

// loops through the row intially then loops through the nested array
// i is the index of the main array and j is the for the nested array index
// creates a new boundary based on if the data was 1025
// 1025 is where a boundary block was placed in tiled
collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025) {
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      )
    }
  })
})
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
    x: offset.x,
    y: offset.y,
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

  // draws out the collision boundary blocks
  boundaries.forEach((boundary) => {
    boundary.draw()
  })

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

  if (keys.w.pressed && lastKeyPressed === 'w') background.position.y += 3
  else if (keys.a.pressed && lastKeyPressed === 'a') background.position.x += 3
  else if (keys.d.pressed && lastKeyPressed === 'd') background.position.x -= 3
  else if (keys.s.pressed && lastKeyPressed === 's') background.position.y -= 3
}

animate()

// stores the last key pressed
let lastKeyPressed = ''

// listens for the keydown on wasd
window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = true
      lastKeyPressed = 'w'
      break
    case 'a':
      keys.a.pressed = true
      lastKeyPressed = 'a'
      break
    case 's':
      keys.s.pressed = true
      lastKeyPressed = 's'
      break
    case 'd':
      keys.d.pressed = true
      lastKeyPressed = 'd'
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
