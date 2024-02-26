/*Makes Cat jump*/
import {
    incrementCustomProperty,
    setCustomProperty,
    getCustomProperty,
  } from "./updateCustomProperty.js"

const catElem = document.querySelector("[data-cat]")
const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
const CAT_FRAME_COUNT = 2 
const FRAME_TIME = 100

let isJumping
let catFrame
let currentFrameTime
let yVelocity

export function setupCat() {
    isJumping = false
    catFrame = 0
    currentFrameTime = 0
    yVelocity = 0
    setCustomProperty(catElem, "--bottom", 0)
    document.removeEventListener("keydown", onJump) 
    document.addEventListener("keydown", onJump)
}
  
export function updateCat(delta, speedScale) {
    handleRun(delta, speedScale)
    handleJump(delta)
  }
/*  
export function getCatRect() {
    return dinoElem.getBoundingClientRect()
  }
  
export function setCatLose() {
    dinoElem.src = "imgs/cat-lose.png"
  }*/

function handleRun(delta, speedScale) {
    if (isJumping) {
      catElem.src = `imgs/cutecat.png`
      return
    }

    if (currentFrameTime >= FRAME_TIME) { 
      catFrame = (catFrame + 1) % CAT_FRAME_COUNT /*updates frame*/
      catElem.src = `imgs/cat-run-${catFrame}.png` 
      currentFrameTime -= FRAME_TIME /*reset frame*/
    }
    currentFrameTime += delta * speedScale /*animation gets faster*/
  }
  
function handleJump(delta) {
    if (!isJumping) return
  
    incrementCustomProperty(catElem, "--bottom", yVelocity * delta)
  
    if (getCustomProperty(catElem, "--bottom") <= 0) {
      setCustomProperty(catElem, "--bottom", 0)
      isJumping = false
    }
    yVelocity -= GRAVITY * delta
}
  
  function onJump(e) { /*Envent listener to make jump */
    if (e.code !== "Space" || isJumping) return
  
    yVelocity = JUMP_SPEED
    isJumping = true
  }
