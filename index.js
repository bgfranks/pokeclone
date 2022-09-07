// grabs the canvas and the 2d canvas api
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

// sets the canvas size
canvas.width = 1024
canvas.height = 576

// refs the map image
const image = new Image()
image.src = './images/pokeclone-map.png'

// refs the foreground image
const foregroundImage = new Image()
foregroundImage.src = './images/pokeclone-foreground.png'

// ref the player sprite
const playerImage = new Image()
playerImage.src = './images/playerDown.png'

// creates the offset for the map positioning
const offset = {
  x: -15,
  y: -230,
}

// empty array to store collisions map
const collisionsMap = []

// creates a 2d array by slicing the collision array
// 70 = the number of tiles in the row of the map
// the nested array is each row of the map
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, 70 + i))
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

// stores the background image
const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: image,
})

const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: foregroundImage,
})

// stores the player sprite
const player = new Sprite({
  position: {
    x: canvas.width / 2 - 192 / 4 / 2,
    y: canvas.height / 2 - 68 / 2,
  },
  image: playerImage,
  frames: {
    max: 4,
  },
})

console.log(player.frames.max)

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

// array that stores the moveable objects in the game
const moveables = [background, foreground, ...boundaries]

// function that calculates if the first arg is colliding with the second arg
function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  )
}

// animation loop
function animate() {
  let moving = true
  // creates an infite callback animate loop
  window.requestAnimationFrame(animate)

  // draws the map on the canvas
  background.draw()

  // draws out the collision boundary blocks
  boundaries.forEach((boundary) => {
    boundary.draw()
  })

  // draws the player
  player.draw()

  // draws the foreground of the map
  foreground.draw()

  player.moving = false

  if (keys.w.pressed && lastKeyPressed === 'w') {
    player.moving = true
    // loops through the boundaries to check for collision when moving up
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]

      // adds 3 to see the collision coming to spot the play before stepping on the block
      // 3 stands for the player movement
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: { x: boundary.position.x, y: boundary.position.y + 3 },
          },
        })
      ) {
        moving = false
        break
      }
    }
    if (moving)
      moveables.forEach((moveable) => {
        moveable.position.y += 3
      })
  } else if (keys.a.pressed && lastKeyPressed === 'a') {
    player.moving = true

    // loops through the boundaries to check for collision when moving up
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]

      // adds 3 to see the collision coming to spot the play before stepping on the block
      // 3 stands for the player movement
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: { x: boundary.position.x + 3, y: boundary.position.y },
          },
        })
      ) {
        moving = false
        break
      }
    }
    if (moving)
      moveables.forEach((moveable) => {
        moveable.position.x += 3
      })
  } else if (keys.d.pressed && lastKeyPressed === 'd') {
    player.moving = true

    // loops through the boundaries to check for collision when moving up
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]

      // adds 3 to see the collision coming to spot the play before stepping on the block
      // 3 stands for the player movement
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: { x: boundary.position.x - 3, y: boundary.position.y },
          },
        })
      ) {
        moving = false
        break
      }
    }
    if (moving)
      moveables.forEach((moveable) => {
        moveable.position.x -= 3
      })
  } else if (keys.s.pressed && lastKeyPressed === 's') {
    player.moving = true

    // loops through the boundaries to check for collision when moving up
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]

      // adds 3 to see the collision coming to spot the play before stepping on the block
      // 3 stands for the player movement
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: { x: boundary.position.x, y: boundary.position.y - 3 },
          },
        })
      ) {
        moving = false
        break
      }
    }
    if (moving)
      moveables.forEach((moveable) => {
        moveable.position.y -= 3
      })
  }
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
