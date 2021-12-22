var u=Object.defineProperty;var g=(a,e,i)=>e in a?u(a,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):a[e]=i;var l=(a,e,i)=>(g(a,typeof e!="symbol"?e+"":e,i),i);import{P as c}from"./vendor.3fc30302.js";const y=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function i(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=i(s);fetch(s.href,o)}};y();function t(a){return a*globalThis.pixelRatio}class f extends c.Scene{constructor(){super("main-scene");l(this,"groundLayer");l(this,"bredde");l(this,"hoyde");l(this,"map");l(this,"helt");l(this,"presentsGroup");l(this,"hasJumpedTwice",!1);l(this,"timeSinceLastJump")}init(){this.bredde=this.game.scale.gameSize.width,this.hoyde=this.game.scale.gameSize.height}create(){this.map=this.make.tilemap({key:"map"});const e=this.map.addTilesetImage(`tiles-sprite@${t(1)}`,"tiles"),i=this.map.addTilesetImage(`presents-sprite@${t(1)}`,"presents"),r=this.map.addTilesetImage(`korona-sprite@${t(1)}`,"coronas"),s=.5;var n=this.add.particles("snow").createEmitter({x:{min:0,max:this.map.widthInPixels*s+this.bredde/2},y:t(-10),lifespan:{min:2e4,max:6e4},speedY:{min:t(2),max:t(10)},speedX:{min:t(-10),max:t(10)},angle:{min:0,max:180},gravityY:t(1),scale:{min:.4,max:1},quantity:5,frequency:500,rotate:{start:0,end:180},frame:[0,1,2]});n.scrollFactorX=s,n.randomFrame=!0,console.log("this.map.widthInPixels",this.map.widthInPixels);const d=this.map.createLayer("level01",[e,i,r]);d.setCollisionByProperty({collision:!0}),this.presentsGroup=this.physics.add.group({allowGravity:!1,immovable:!0});const p=t(32);this.helt=this.physics.add.sprite(0,0,"helt"),this.helt.setPosition(this.helt.width/2,this.hoyde-this.helt.height/2-p*2),this.helt.anims.create({key:"walk",frames:this.anims.generateFrameNumbers("helt",{frames:[1,0]}),frameRate:6,repeat:-1}),this.helt.anims.create({key:"stand",frames:this.anims.generateFrameNumbers("helt",{frames:[1]})}),this.helt.anims.create({key:"jump",frames:this.anims.generateFrameNumbers("helt",{frames:[0]})}),this.helt.setBounce(.1),this.input.on("pointerdown",()=>{console.log("hopp")}),this.cameras.main.startFollow(this.helt),this.cameras.main.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels),this.physics.add.collider(this.helt,d)}update(e){this.input.activePointer.isDown&&(this.helt.body.blocked.down||this.helt.body.touching.down)&&console.log("Klar for hoppings?",this.helt.body.touching),this.input.activePointer.isDown&&(this.helt.body.blocked.down||this.helt.body.touching.down||this.hasJumpedTwice)?(this.helt.setVelocityY(t(-200)),(!this.timeSinceLastJump||e-this.timeSinceLastJump>300)&&(this.hasJumpedTwice?(console.log("update2",this.hasJumpedTwice,e),this.hasJumpedTwice=!1):(console.log("update3",this.hasJumpedTwice,e),this.hasJumpedTwice=!0,this.timeSinceLastJump=e))):this.helt.setVelocityX(t(100)),this.helt.body.onFloor()&&!this.helt.body.onWall()?this.helt.play("walk",!0):this.helt.body.onFloor()?this.helt.play("stand",!0):this.helt.play("jump",!0),this.helt.x>this.map.widthInPixels&&this.scene.restart()}}class w extends c.Scene{constructor(){super({key:"preload-scene"})}preload(){console.log("preload-scene"),this.load.spritesheet("helt",`/assets/helt-sprite@${t(1)}.png`,{frameWidth:t(32),frameHeight:t(40),margin:1,spacing:2}),this.load.image("tiles",`/assets/tiles-sprite@${t(1)}.png`),this.load.image("presents",`/assets/presents-sprite@${t(1)}.png`),this.load.image("coronas",`/assets/korona-sprite@${t(1)}.png`),this.load.spritesheet("snow",`/assets/snow-sprite@${t(1)}.png`,{frameWidth:t(16),frameHeight:t(16),margin:1,spacing:2}),this.load.tilemapTiledJSON("map",`assets/levels@${t(1)}.json`)}create(){this.scene.start("main-scene")}}function b(a,e,i,r,s){return{type:Phaser.AUTO,scene:[w,f],width:a*r,height:e*r,backgroundColor:8900331,autoFocus:!0,parent:"game",render:{},physics:{default:"arcade",arcade:{gravity:{y:300*r},debug:s}},scale:{mode:i,autoCenter:Phaser.Scale.Center.CENTER_BOTH,zoom:1/r}}}let m=!0;m=!1;let h=window.devicePixelRatio;h!==1&&h!==2&&h!==3&&(h=1);globalThis.pixelRatio=h;const S=b(400,640,c.Scale.ScaleModes.NONE,h,m);new c.Game(S);window.onload=()=>{console.log("onload: Let's wait a little more...");const a=document.querySelector("#loader"),e=document.querySelector("#preload"),i=document.querySelector("#game");e.style.display="block",i.style.opacity="0",i.style.display="block",setTimeout(()=>{a.style.display="none",e.style.display="none",i.style.opacity="1"},500)};