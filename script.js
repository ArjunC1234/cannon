//render cannon animation frames
function HANDLER () {
  this.animation = {
    asset : {}, //animation frames go here
    add(name, paths, replace = false) { //adds an asset to the asset object
      if (replace == false){
        if (this.asset.hasOwnProperty(name)) {
          console.log("`AssetName` is taken. Please use another name or toggle `replace` parameter to `true`") //checks if key is taken
          return
        }
      }
      let construct = [] //animation constructor
      if (Array.isArray(paths)) { //checks whether an array of file paths is provided
        for (var i = 0; i < paths.length; i++) {
          let asset = new Image()
          asset.src = paths[i]
          construct.push(asset)
        }
      } else {
        let asset = new Image()
        asset.src = paths
        construct.push(asset)
      }
      this.asset[name] = construct //declares key value pair
    },
    get(name, frame=0) {
      if (frame == "all") {
        return this.asset[name]
      } else {
        return this.asset[name][frame]
      }
    },
  }
  this.collision = {
    touching (rect1, rect2) { //touching collision detection
      let aLeftOfB = ( rect1.x1 + rect1.width ) < rect2.x1
      let aRightOfB = rect1.x1 > ( rect2.x1 + rect2.width )
      let aAboveB = ( rect1.y1 + rect1.height ) < rect2.y1
      let aBelowB = rect1.y1 > (rect2.y1 + rect2.height)
      return !( aLeftOfB || aRightOfB || aAboveB || aBelowB )
    }
  }
}
var handler = new HANDLER() //game handler

// Prerenderering Assets
// ------------------------------------------------------------
handler.animation.add("cannon", [
    "./assets/cannon/steel_cannon1.png",
    "./assets/cannon/steel_cannon2.png",
    "./assets/cannon/steel_cannon3.png",
    "./assets/cannon/steel_cannon4.png",
    "./assets/cannon/steel_cannon5.png",
    "./assets/cannon/steel_cannon6.png",
    "./assets/cannon/steel_cannon7.png",
    "./assets/cannon/steel_cannon0.png"
  ])
handler.animation.add("tnt", [
  "./assets/tnt/tnt_0.png",
  "./assets/tnt/tnt_1.png",
  "./assets/tnt/tnt_2.png",
  "./assets/tnt/tnt_3.png",
  "./assets/tnt/tnt_4.png",
  "./assets/tnt/tnt_5.png"
])
handler.animation.add("grassbg", [
  "./assets/grass/sprite_0.png",
  "./assets/grass/sprite_1.png",
  "./assets/grass/sprite_2.png",
  "./assets/grass/sprite_3.png",
  "./assets/grass/sprite_4.png",
  "./assets/grass/sprite_5.png"
])
handler.animation.add("explosion", [
  "./assets/explosion/tile000.png",
  "./assets/explosion/tile001.png",
  "./assets/explosion/tile002.png",
  "./assets/explosion/tile003.png",
  "./assets/explosion/tile004.png",
  "./assets/explosion/tile005.png",
  "./assets/explosion/tile006.png",
  "./assets/explosion/tile007.png",
  "./assets/explosion/tile008.png",
  "./assets/explosion/tile009.png",
  "./assets/explosion/tile010.png",
  "./assets/explosion/tile011.png"
])
handler.animation.add("waterbg", [
  "./assets/water/water_0.png",
  "./assets/water/water_1.png",
  "./assets/water/water_2.png",
  "./assets/water/water_3.png",
  "./assets/water/water_4.png",
])
handler.animation.add("block", "./assets/block.png")
handler.animation.add("bullet", "./assets/bullet.png")
handler.animation.add("logo", "./assets/logo.png")
handler.animation.add("crosshair", ["./assets/crosshair.png", "./assets/crosshairV1.png", "./assets/crosshairNOOUTLINE.png"])
// ------------------------------------------------------------

var mousePos = {x : -1000, y : -1000}// variable for storing mouse position
var backgrounditer = 0
const crosshair = {
  ugly : {
    image : handler.animation.get("crosshair", 0),
    rect : new Rect(mousePos.x-16, mousePos.y-16, 32, 32),
    update() {
      this.rect.x1 = mousePos.x-this.rect.width/2
      this.rect.y1 = mousePos.y-this.rect.height/2
    }
  },
  crshr : {
    image : handler.animation.get("crosshair", 1),
    rect : new Rect(mousePos.x-21.75, mousePos.y-21.75, 43.5, 43.5),
    update() {
      this.rect.x1 = mousePos.x-this.rect.width/2
      this.rect.y1 = mousePos.y-this.rect.height/2
    }
  },
  outlineless : {
    image : handler.animation.get("crosshair", 2),
    rect : new Rect(mousePos.x-15.75, mousePos.y-15.75, 31.5, 31.5),
    update() {
      this.rect.x1 = mousePos.x-this.rect.width/2
      this.rect.y1 = mousePos.y-this.rect.height/2
    }
  }
}
cursorDisplay = true
var player = {
  crosshair : crosshair.outlineless,
  money : 0
}
//Block Class
function Block(rect) {
	this.image = handler.animation.get("tnt")
  this.explosionImage
	this.rect = rect
  this.hp = 100
  this.blockiter = 1
  this.tntani
  this.explosionani
  this.explosioniter = 0
  this.dying = false;
  this.collisionmove = function (vector) {
    let vec = [vector[0]*0.5, vector[1]*0.5]
    setTimeout(function (rect) {
      rect.x1 += vec[0]/1
      rect.y1 += vec[1]/1
    }, 10, arg0 = this.rect)
    setTimeout(function (rect) {
      rect.x1 += vec[0]/1
      rect.y1 += vec[1]/1
    }, 20, arg0 = this.rect)
    setTimeout(function (rect) {
      rect.x1 += vec[0]/1
      rect.y1 += vec[1]/1
    }, 30, arg0 = this.rect)
    setTimeout(function (rect) {
      rect.x1 += vec[0]/1
      rect.y1 += vec[1]/1
    }, 40, arg0 = this.rect)
    setTimeout(function (rect) {
      rect.x1 += vec[0]/2
      rect.y1 += vec[1]/2
    }, 50, arg0 = this.rect)
    setTimeout(function (rect) {
      rect.x1 += vec[0]/2
      rect.y1 += vec[1]/2
    }, 60, arg0 = this.rect)
    setTimeout(function (rect) {
      rect.x1 += vec[0]/2
      rect.y1 += vec[1]/2
    }, 70, arg0 = this.rect)
    setTimeout(function (rect) {
      rect.x1 += vec[0]/3
      rect.y1 += vec[1]/3
    }, 80, arg0 = this.rect)
    setTimeout(function (rect) {
      rect.x1 += vec[0]/3
      rect.y1 += vec[1]/3
    }, 90, arg0 = this.rect)
    setTimeout(function (rect) {
      rect.x1 += vec[0]/3
      rect.y1 += vec[1]/3
    }, 100, arg0 = this.rect)
    setTimeout(function (rect) {
      rect.x1 += vec[0]/4
      rect.y1 += vec[1]/4
    }, 110, arg0 = this.rect)
    setTimeout(function (rect) {
      rect.x1 += vec[0]/4
      rect.y1 += vec[1]/4
    }, 120, arg0 = this.rect)
    setTimeout(function (rect) {
      rect.x1 += vec[0]/5
      rect.y1 += vec[1]/5
    }, 130, arg0 = this.rect)
    setTimeout(function (rect) {
      rect.x1 += vec[0]/5
      rect.y1 += vec[1]/5
    }, 140, arg0 = this.rect)
  }
  this.death = function (index) {
    this.dying = true
    var explodingSFX = new Howl({ //declare cannon sound effect with Howl Module
          src: ['./assets/explosion.mp3'],
          volume: 1
        })
    explodingSFX.play()
    this.tntani = setInterval(function(tnt) {
      tnt.image = handler.animation.get("tnt", tnt.blockiter)
      tnt.blockiter++
      if (tnt.blockiter >= handler.animation.get("tnt", "all").length) {
        clearInterval(tnt.tntani)
      }
    }, 50, arg0 = this)
    this.explosionani = setInterval(function(tnt, index) {
      tnt.explosioniter++
      if (tnt.explosioniter >= handler.animation.get("explosion", "all").length) {
        clearBlock(tnt, index)
      }
    }, 60, arg0 = this, arg1 = index)
  }
}
setInterval(function () {
  backgrounditer++
  if (backgrounditer >= handler.animation.get("waterbg", "all").length) {
    backgrounditer = 0
  }
}, 200)
function clearBlock(block, index) {
  clearInterval(block.explosionani)
  blocks.splice(index, 1)
}
// Rect Class
function Rect(x1, y1, width, height) {
	this.x1 = x1
	this.y1 = y1
	this.height = height
	this.width = width
	this.x2 = x1 + width
	this.y2 = y1 + height
}

// Cannon Class
function Cannon(rect) {
	this.image = handler.animation.get("cannon", handler.animation.get("cannon", "all").length-1)
	this.bullets = []
  this.caniter = 0
	this.rect = rect
  this.degrees = 0
  this.animation //animation interval
	this.addBullet = function(degrees, xdiffer, ydiffer) { // adds a bullet to the bullets list embedded in cannon object
    let diffX = mousePos.x - (this.rect.x1 + this.rect.width / 2);
    let diffY = mousePos.y - (this.rect.y1 + (this.rect.height * (3/4)));
    let angle = Math.atan2(diffY, diffX);
    let x = (this.rect.x1 + this.rect.width / 2) + Math.cos(angle) * 50
    let y = (this.rect.y1 + (this.rect.height - (this.rect.height/4))) + Math.sin(angle) * 50

		this.bullets.push(new Bullet(new Rect(x-12.5, y-12.5, 25, 25), degrees, xdiffer, ydiffer)) //pushes bullet to the list
    if (this.caniter != 0) {
      clearInterval(this.animation) //clear interval if there is a current animation
      this.caniter = 0      
    }
    this.animation = setInterval(this.anifunc, 30, arg0=this) //start animation
	}
  this.anifunc = function (cannon) { //animation function
    cannon.image = handler.animation.get("cannon", frame=cannon.caniter) //iterate through frames in handler animation frames
    cannon.caniter++
    if (cannon.caniter>=handler.animation.get("cannon", frame="all").length) {
      //clear interval
      cannon.caniter = 0
      clearInterval(cannon.animation)
    }
  }

}

// Bullet Class
function Bullet(rect, degrees, hori, verti) {
	this.rect = rect
	this.image = handler.animation.get("bullet")
	this.degrees = degrees
	var tan = Math.atan2(verti, hori); //calculate vector
	this.vector = [Math.cos(tan) * -4, Math.sin(tan) * -4]
}

// canvas settings
var canvas = document.getElementById("game")
var ctx = canvas.getContext("2d", { alpha: false })
canvas.width = 960
canvas.height = 540
canvas.oncontextmenu = () => false; //prevents default right click functionality

var gameLoop = setInterval(loop, 10) //game interval
var grassmap = []
for (var i = 0; i < canvas.height; i+=80) {
  grassmap.push([])
  for (var y = 0; y < canvas.width; y+=80) {
    grassmap[i/80].push(handler.animation.get("grassbg", "all")[Math.floor(Math.random() * handler.animation.get("grassbg", "all").length)])
  }
}
//report the mouse position when cursor moves
canvas.addEventListener("mousemove", function(evt) {
	mousePos = getMousePos(canvas, evt);
  player.crosshair.update()
}, false);


//shooting key inputs
var mouseheld = false //whether mouse is held
var shoot = true //whether shooting cooldown has finished
canvas.addEventListener("mousedown", function(evt) {
  if (evt.button == 1 || evt.which == 1) {
    mouseheld = true
  }
}, false);

canvas.addEventListener("mouseout", function() {
  cursorDisplay = false
})
canvas.addEventListener("mouseover", function() {
  cursorDisplay = true
})
canvas.addEventListener("mouseup", function(evt) {
  if (evt.button == 1 || evt.which == 1) {
    mouseheld = false
  }
}, false);


//replaces default right click functionality with the functionality to place a cannon
canvas.addEventListener('contextmenu', function(evt) {
  evt.preventDefault()
  cannons.push(new Cannon(new Rect(mousePos.x-24, mousePos.y-54.75, 48, 109.5)))
}, false)


//Get Mouse Position
function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}


//Cannon Recoil Animation
function cannonRecoil (cannon) {
  let bulletVector = cannon.bullets[cannon.bullets.length-1].vector
  let recoilVector = [-(bulletVector[0]), -(bulletVector[1])]
  setTimeout(function () { //1st frame
    cannon.rect.y1 += 2*recoilVector[1]
    cannon.rect.x1 += 2*recoilVector[0]
  }, 20)
  setTimeout(function () { //2nd frame
    cannon.rect.y1 += 2*recoilVector[1]
    cannon.rect.x1 += 2*recoilVector[0]
  }, 40)
  setTimeout(function () { //3rd frame
    cannon.rect.y1 -= recoilVector[1]
    cannon.rect.x1 -= recoilVector[0]
  }, 60)
  setTimeout(function () { //4th frame
    cannon.rect.y1 -= recoilVector[1]
    cannon.rect.x1 -= recoilVector[0]
  }, 80)
  setTimeout(function () { //5th frame
    cannon.rect.y1 -= recoilVector[1]
    cannon.rect.x1 -= recoilVector[0]
  }, 100)
  setTimeout(function () { //6th frame
    cannon.rect.y1 -= recoilVector[1]
    cannon.rect.x1 -= recoilVector[0]
  }, 120)
}




//math for calculating the angle of the cannon (:
function rotCan() {
  for (var i = 0; i < cannons.length; i++) {
    cannon = cannons[i]
  	xDiffer = ((cannon.rect.x1 + cannon.rect.x2) / 2 - mousePos.x)
  	yDiffer = ((cannon.rect.y1 + (cannon.rect.height * (3/4))) - mousePos.y)
  	cannon.degrees = Math.atan2(yDiffer, xDiffer) - (90 * (Math.PI / 180))
  }
	//if (degrees > 180)    
}

//checks for collision between bullet and falling blocks. (includes hp reduction, block death, etc.)
function bulletCollision () {
  for (var i = 0; i < cannons.length; i++) {
  	//cannon drawing
    cannon = cannons[i]
    for (var x = cannon.bullets.length - 1; x > -1; x--) { //cycles through blocks and cannons
      for (var y = blocks.length - 1; y > -1; y--) {
        var b = new Rect(cannon.bullets[x].rect.x1 + 5, cannon.bullets[x].rect.y1 + 5, cannon.bullets[x].rect.width - 10, cannon.bullets[x].rect.height-10) //cannon bullet rect
        
        var r = blocks[y].rect //block rect
        if (handler.collision.touching(b, r) && blocks[y].blockiter == 1 && blocks[y].dying == false) { //check if block and cannon bullet are touching
          blocks[y].collisionmove(cannon.bullets[x].vector)
          var cannonXY = {
            x : cannon.rect.x1 + cannon.rect.width/2,
            y : cannon.rect.y1 + (cannon.rect.height * 3/4)
          } //coordinates of the center of rotation of the cannon
          var blockXY = {
            x : blocks[y].rect.x1 + blocks[y].rect.width/2,
            y : blocks[y].rect.y1 + blocks[y].rect.height/2
          } //coordinates of center of block
          let d = Math.round(Math.sqrt((cannonXY.x - blockXY.x)**2 + (cannonXY.y - blockXY.y)**2)) //distance betweeen cannon and block
          if (d >= 400) {
            d = 350
          }
          blocks[y].hp -= 100 - d / 4
          cannon.bullets.splice(x, 1)//kills bullet and block after collision (block only if hp is below 0)
          if (blocks[y].hp <= 0) {
            blocks[y].death(y)
          }
        }
      }
    }
  }
}

//updates location of blocks based on speed
function updateBlocks () {
  for (var x = 0; x < blocks.length; x++) {
		blocks[x].rect.y1 += 1
    if (blocks[x].rect.y1 >= canvas.height + 100) {
      blocks.splice(x,1)
      x--
    }
	}
}

//updates location of bullets based on relative vector
function updateBullets () {
  for (var i = 0; i < cannons.length; i++) {
    cannon = cannons[i]
  	//bullet vector shit idk and im too lazy to know
  	for (var x = 0; x < cannon.bullets.length; x++) {
      cannon.bullets[x].rect.x1 += cannon.bullets[x].vector[0]
  	  cannon.bullets[x].rect.y1 += cannon.bullets[x].vector[1]
  		if (cannon.bullets[x].rect.x1 >= canvas.width + 75 || cannon.bullets[x].rect.x1 <= -75 || cannon.bullets[x].rect.y1 >= canvas.height + 75 || cannon.bullets[x].rect.y1 <= -75) { //checks if bullet is outside canvas and deletes is for efficiency
  			cannon.bullets.splice(x, 1)
  			x--
  		}
  	}
  }
}
var cooldownTimer = 0
var cooldownTime = 30
var cooldownWidth = 0
var startTimer = false
var debugbullets = 0
var debugblocks = 0
//shooting the cannon
function shotCheck() {
  if (mouseheld) {
    if (shoot == true && cannons.length > 0) {
      for (var i = 0; i < cannons.length; i++) {
        cannon = cannons[i]
        xdiffer = ((cannon.rect.x1 + cannon.rect.x2) / 2 - mousePos.x)
        ydiffer = ((cannon.rect.y1 + (cannon.rect.height * (3/4))) - mousePos.y)
        cannon.addBullet(cannon.degrees, xdiffer, ydiffer) //adds bullet
        cannonRecoil(cannon) //trigger recoil
      }
      var sound = new Howl({ //declare cannon sound effect with Howl Module
          src: ['./assets/cannon.mp3'],
          volume: 0.2
        })
      sound.play() //play the sound
      shoot = false
      startTimer = true
    }
  }
}

//draws all sprites as of 8/4/22 including blocks, bullets, and the cannon
function draw() {
  /*
  for (i = 0; i < canvas.width; i+=150) {
    for (t = 0; t < canvas.height; t+=150) {
      ctx.drawImage(handler.animation.get("waterbg", backgrounditer), i, t, 150, 150)
    }
  }
  */
  for (var i = 0; i < grassmap.length; i++) {
    for (var y = 0; y < grassmap[i].length; y++) {
      ctx.drawImage(grassmap[i][y], y*80, i*80, 80, 80)
    }
  }
  for (var x = 0; x < blocks.length; x++) { //draw all the blocks
    ctx.drawImage(blocks[x].image, blocks[x].rect.x1, blocks[x].rect.y1, blocks[x].rect.width, blocks[x].rect.height)
    ctx.fillStyle = "gray"
    if (blocks[x].hp > 0) {
      ctx.fillRect(blocks[x].rect.x1, blocks[x].rect.y1 + blocks[x].rect.height + 5, blocks[x].rect.width, 7)
      if (blocks[x].hp > 66) {
        ctx.fillStyle = "rgb(120,190,33)"
      }
      if (blocks[x].hp > 33 && blocks[x].hp <= 66) {
        ctx.fillStyle = "yellow"
      }
      if (blocks[x].hp <= 33) {
        ctx.fillStyle = "red"
      }
      ctx.fillRect(blocks[x].rect.x1, blocks[x].rect.y1 + blocks[x].rect.height + 5, blocks[x].hp*(blocks[x].rect.width/100), 7)
      ctx.strokeStyle="black"
      ctx.lineWidth=1
      ctx.strokeRect(blocks[x].rect.x1, blocks[x].rect.y1 + blocks[x].rect.height + 5, blocks[x].rect.width, 7)
    }
    try {
      if (blocks[x].dying == true) {
        let tnt = blocks[x]
        ctx.drawImage(handler.animation.get("explosion", tnt.explosioniter), tnt.rect.x1-((96-tnt.rect.width)/2), tnt.rect.y1-((96-tnt.rect.height)/2), 96, 96)
      }
    }
    catch (err) {
      console.log() //hehe another bug im too lazy to fix
    }
	}
  for (var i = 0; i < cannons.length; i++) { //draw bullets
  	for (var x = 0; x < cannons[i].bullets.length; x++) {
  		ctx.drawImage(cannons[i].bullets[x].image, cannons[i].bullets[x].rect.x1, cannons[i].bullets[x].rect.y1)
    }
  }
  for (var i = 0; i < cannons.length; i++) {//draw cannon
  	//cannon drawing
    //rotate canvas and translate in order to rotate cannon image
    cannon = cannons[i]
  	ctx.save()
  	ctx.translate(cannon.rect.x1 + cannon.rect.width / 2, cannon.rect.y1 + (cannon.rect.height - (cannon.rect.height/4)));
  	ctx.rotate(cannon.degrees);
  	ctx.translate(-cannon.rect.x1 - cannon.rect.width / 2, -cannon.rect.y1 - (cannon.rect.height - (cannon.rect.height/4)));
  	ctx.drawImage(cannon.image, cannon.rect.x1, cannon.rect.y1, cannon.rect.width, cannon.rect.height)
  	ctx.restore()
  }
  ctx.drawImage(handler.animation.get("logo"), 0, 10, 135, 55)
  //ctx.globalAlpha = 0.85;
  if (cursorDisplay == true) {
    ctx.drawImage(player.crosshair.image, player.crosshair.rect.x1, player.crosshair.rect.y1, player.crosshair.rect.width, player.crosshair.rect.height)
    //ctx.globalAlpha = 1.0;
    if (cooldownTimer != 0) {
      cooldownWidth = cooldownTimer/(cooldownTime/player.crosshair.rect.width)
      ctx.fillStyle = "darkgray"
      ctx.fillRect(player.crosshair.rect.x1, player.crosshair.rect.y1 + player.crosshair.rect.height + 3, player.crosshair.rect.width, 3)
      ctx.fillStyle = "white"
      ctx.fillRect(player.crosshair.rect.x1, player.crosshair.rect.y1 + player.crosshair.rect.height + 3, cooldownWidth, 3)
    }
  }
}


//wind is used to create randomized sidewards momentum. use commented code in bullet vector to activate
var wind = [0, 0, 0, 0, 0.3, 0.3, 0.3, 0.5, 0.5, 0.7]

//sprite container lists
var cannons = []
var blocks = []
var bulletdel = []

var music = new Howl({ //declare cannon sound effect with Howl Module
          src: ['./assets/music.mp3'],
          volume: 0.9,
          loop: true
        })

music.play()
//game loop
function loop() {
  ctx.strokeStyle = "red" //sets color of text/outlined shapes
  ctx.lineWidth = 10 //width of outlined shapes and text
  ctx.fillStyle = "cyan" //color of filled shapes
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  bulletCollision() //checks for collision between bullet and falling blocks. (includes hp reduction, block death, etc.)
  updateBlocks() //updates location of blocks based on speed
  updateBullets() //updates location of bullets based on relative vector
  shotCheck() //shooting the cannon
  rotCan() //math for calculating the angle of the cannon (:
  draw() //draws all sprites as of 8/4/22 including blocks, bullets, and the cannon
  if (startTimer == true) {
    cooldownTimer++
    if (cooldownTimer >= cooldownTime) {
      cooldownTimer = 0
      shoot = true
      startTimer = false
    }
  }
}

//spawns new blocks
var blockInterval = setInterval(function() {
  if (cannons.length > 0) {
    blocks.push(new Block(new Rect(Math.floor(Math.random() * ((canvas.width - 64) + 1)), -100, 64, 64)))
  }
}, 5000)