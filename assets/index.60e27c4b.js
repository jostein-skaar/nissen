var g=Object.defineProperty;var f=(i,t,o)=>t in i?g(i,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):i[t]=o;var n=(i,t,o)=>(f(i,typeof t!="symbol"?t+"":t,o),o);import{P as c}from"./vendor.3fc30302.js";const y=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function o(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerpolicy&&(a.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?a.credentials="include":s.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(s){if(s.ep)return;s.ep=!0;const a=o(s);fetch(s.href,a)}};y();function e(i){return i*globalThis.pixelRatio}class w extends c.Scene{constructor(){super("main-scene");n(this,"groundLayer");n(this,"bredde");n(this,"hoyde");n(this,"map");n(this,"helt");n(this,"presentsGroup");n(this,"hasJumpedTwice",!1);n(this,"timeSinceLastJump");n(this,"backgroundMountains");n(this,"backgroundSnow")}init(){this.bredde=this.game.scale.gameSize.width,this.hoyde=this.game.scale.gameSize.height}create(){this.map=this.make.tilemap({key:"map"});const t=this.map.addTilesetImage(`tiles-sprite@${e(1)}`,"tiles"),o=this.map.addTilesetImage(`presents-sprite@${e(1)}`,"presents"),r=this.map.addTilesetImage(`korona-sprite@${e(1)}`,"coronas");this.backgroundMountains=this.add.tileSprite(0,0,this.bredde,this.hoyde,"background-mountains",0).setOrigin(0,0).setScrollFactor(0).setScale(e(1)),this.backgroundSnow=this.add.tileSprite(0,0,this.bredde,this.hoyde,"background-snow",1).setOrigin(0,0).setScale(e(1)).setScrollFactor(0);const s=.5;var l=this.add.particles("snow").createEmitter({x:{min:0,max:this.map.widthInPixels*s+this.bredde/2},y:e(-10),lifespan:{min:2e4,max:6e4},speedY:{min:e(2),max:e(10)},speedX:{min:e(-10),max:e(10)},angle:{min:0,max:180},gravityY:e(1),scale:{min:.4,max:1},quantity:5,frequency:500,rotate:{start:0,end:180},frame:[0,1,2]});l.scrollFactorX=s,l.randomFrame=!0,console.log("this.map.widthInPixels",this.map.widthInPixels);const d=this.map.createLayer("level01",[t,o,r]);d.setCollisionByProperty({collision:!0}),this.presentsGroup=this.physics.add.group({allowGravity:!1,immovable:!0});const p=d.getTileAt(1,0);console.log("tile",p);const u=e(32);this.helt=this.physics.add.sprite(0,0,"helt"),this.helt.setPosition(this.helt.width/2,this.hoyde-this.helt.height/2-u*2),this.helt.anims.create({key:"walk",frames:this.anims.generateFrameNumbers("helt",{frames:[1,0]}),frameRate:6,repeat:-1}),this.helt.anims.create({key:"stand",frames:this.anims.generateFrameNumbers("helt",{frames:[1]})}),this.helt.anims.create({key:"jump",frames:this.anims.generateFrameNumbers("helt",{frames:[0]})}),this.helt.setBounce(.1),this.input.on("pointerdown",()=>{console.log("hopp")}),this.cameras.main.startFollow(this.helt),this.cameras.main.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels),this.physics.add.collider(this.helt,d)}update(t){this.backgroundMountains.tilePositionX=this.cameras.main.scrollX*.2/e(1),this.backgroundSnow.tilePositionX=this.cameras.main.scrollX*.6/e(1),this.input.activePointer.isDown&&(this.helt.body.blocked.down||this.helt.body.touching.down)&&console.log("Klar for hoppings?",this.helt.body.touching),this.input.activePointer.isDown&&(this.helt.body.blocked.down||this.helt.body.touching.down||this.hasJumpedTwice)?(this.helt.setVelocityY(e(-200)),(!this.timeSinceLastJump||t-this.timeSinceLastJump>300)&&(this.hasJumpedTwice?(console.log("update2",this.hasJumpedTwice,t),this.hasJumpedTwice=!1):(console.log("update3",this.hasJumpedTwice,t),this.hasJumpedTwice=!0,this.timeSinceLastJump=t))):this.helt.setVelocityX(e(100)),this.helt.body.onFloor()&&!this.helt.body.onWall()?this.helt.play("walk",!0):this.helt.body.onFloor()?this.helt.play("stand",!0):this.helt.play("jump",!0),this.helt.x>this.map.widthInPixels&&this.scene.restart()}}class b extends c.Scene{constructor(){super({key:"preload-scene"})}preload(){console.log("preload-scene"),this.load.spritesheet("helt",`/assets/helt-sprite@${e(1)}.png`,{frameWidth:e(32),frameHeight:e(40),margin:1,spacing:2}),this.load.image("tiles",`/assets/tiles-sprite@${e(1)}.png`),this.load.image("presents",`/assets/presents-sprite@${e(1)}.png`),this.load.image("coronas",`/assets/korona-sprite@${e(1)}.png`),this.load.image("background-mountains","/assets/background-mountains@1.png"),this.load.image("background-snow","/assets/background-snow@1.png"),this.load.spritesheet("snow",`/assets/snow-sprite@${e(1)}.png`,{frameWidth:e(16),frameHeight:e(16),margin:1,spacing:2}),this.load.tilemapTiledJSON("map",`assets/levels@${e(1)}.json`)}create(){this.scene.start("main-scene")}}function S(i,t,o,r,s){return{type:Phaser.AUTO,scene:[b,w],width:i*r,height:t*r,backgroundColor:8900331,autoFocus:!0,parent:"game",render:{},physics:{default:"arcade",arcade:{gravity:{y:300*r},debug:s}},scale:{mode:o,autoCenter:Phaser.Scale.Center.CENTER_BOTH,zoom:1/r}}}let m=!0;m=!1;let h=window.devicePixelRatio;h!==1&&h!==2&&h!==3&&(h=1);globalThis.pixelRatio=h;const k=S(400,640,c.Scale.ScaleModes.NONE,h,m);new c.Game(k);window.onload=()=>{console.log("onload: Let's wait a little more...");const i=document.querySelector("#loader"),t=document.querySelector("#preload"),o=document.querySelector("#game");i.style.display="none",t.style.display="none",o.style.display="block"};
