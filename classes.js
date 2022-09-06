// sprite constructor
class Sprite {
  constructor({ position, velocity, image, frames = { max: 1 } }) {
    this.position = position
    this.image = image
    this.frames = frames

    // calculates the image width and heigh after it as loaded
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max
      this.height = this.image.height
    }
  }

  draw() {
    // handles drawing the image and cropping if needed
    ctx.drawImage(
      this.image,
      // cropping (x start, y start, x to, y to )
      0,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      // image placement
      this.position.x,
      this.position.y,
      // image size after crop
      this.image.width / this.frames.max,
      this.image.height
    )
  }
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
    ctx.fillStyle = 'rgba(255,0, 0, 0)'
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}
