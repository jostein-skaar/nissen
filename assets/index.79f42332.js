var m=Object.defineProperty;var p=(a,t,o)=>t in a?m(a,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):a[t]=o;var r=(a,t,o)=>(p(a,typeof t!="symbol"?t+"":t,o),o);import{P as c}from"./vendor.3fc30302.js";const u=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function o(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerpolicy&&(i.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?i.credentials="include":s.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=o(s);fetch(s.href,i)}};u();function e(a){return a*globalThis.pixelRatio}class g extends c.Scene{constructor(){super("main-scene");r(this,"groundLayer");r(this,"bredde");r(this,"hoyde");r(this,"map");r(this,"helt");r(this,"presentsGroup");r(this,"hasJumpedTwice",!1);r(this,"timeSinceLastJump");r(this,"backgroundMountains");r(this,"backgroundSnow")}init(){this.bredde=this.game.scale.gameSize.width,this.hoyde=this.game.scale.gameSize.height}create(){this.map=this.make.tilemap({key:"map"});const t=this.map.addTilesetImage(`tiles-sprite@${e(1)}`,"tiles"),o=this.map.addTilesetImage(`presents-sprite@${e(1)}`,"presents"),n=this.map.addTilesetImage(`korona-sprite@${e(1)}`,"coronas");this.backgroundMountains=this.add.tileSprite(0,0,this.bredde,this.hoyde,"background",0).setOrigin(0,0).setScrollFactor(0),this.backgroundSnow=this.add.tileSprite(0,0,this.bredde,this.hoyde,"background",1).setOrigin(0,0).setScrollFactor(0);var i=this.add.particles("snow").createEmitter({x:{min:e(-10),max:this.bredde+e(10)},y:e(-10),lifespan:{min:2e4,max:6e4},speedY:{min:e(2),max:e(10)},speedX:{min:e(-10),max:e(10)},angle:{min:0,max:180},gravityY:e(1),scale:{min:.4,max:1},quantity:e(5),frequency:1e3,rotate:{start:0,end:180},frame:[0,1,2]});i.scrollFactorX=0,i.randomFrame=!0;const l=this.map.createLayer("level03",[t,o,n]);l.setCollisionByProperty({collision:!0}),this.presentsGroup=this.physics.add.group({allowGravity:!1,immovable:!0}),this.helt=this.physics.add.sprite(e(32/2),this.hoyde-e(40/2+32+100),"helt"),this.helt.anims.create({key:"walk",frames:this.anims.generateFrameNumbers("helt",{frames:[1,0]}),frameRate:6,repeat:-1}),this.helt.anims.create({key:"stand",frames:this.anims.generateFrameNumbers("helt",{frames:[1]})}),this.helt.anims.create({key:"jump",frames:this.anims.generateFrameNumbers("helt",{frames:[0]})}),this.helt.setBounce(.1),this.input.on("pointerdown",()=>{console.log("hopp")}),this.cameras.main.startFollow(this.helt),this.cameras.main.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels),this.physics.add.collider(this.helt,l)}update(t){this.backgroundMountains.tilePositionX=this.cameras.main.scrollX*.2,this.backgroundSnow.tilePositionX=this.cameras.main.scrollX*.6,this.input.activePointer.isDown&&(this.helt.body.blocked.down||this.helt.body.touching.down)&&console.log("Klar for hoppings?",this.helt.body.touching),this.input.activePointer.isDown&&(this.helt.body.blocked.down||this.helt.body.touching.down||this.hasJumpedTwice)?(this.helt.setVelocityY(e(-200)),(!this.timeSinceLastJump||t-this.timeSinceLastJump>300)&&(this.hasJumpedTwice?(console.log("update2",this.hasJumpedTwice,t),this.hasJumpedTwice=!1):(console.log("update3",this.hasJumpedTwice,t),this.hasJumpedTwice=!0,this.timeSinceLastJump=t))):this.helt.setVelocityX(e(100)),this.helt.body.onFloor()&&!this.helt.body.onWall()?this.helt.play("walk",!0):this.helt.body.onFloor()?this.helt.play("stand",!0):this.helt.play("jump",!0),this.helt.x>this.map.widthInPixels&&this.scene.restart()}}class f extends c.Scene{constructor(){super({key:"preload-scene"})}preload(){console.log("preload-scene"),this.load.spritesheet("helt",`/assets/helt-sprite@${e(1)}.png`,{frameWidth:e(32),frameHeight:e(40),margin:1,spacing:2}),this.load.image("tiles",`/assets/tiles-sprite@${e(1)}.png`),this.load.image("presents",`/assets/presents-sprite@${e(1)}.png`),this.load.image("coronas",`/assets/korona-sprite@${e(1)}.png`),this.load.spritesheet("background",`/assets/background-sprite@${e(1)}.png`,{frameWidth:e(800),frameHeight:e(640),margin:1,spacing:2}),this.load.spritesheet("snow",`/assets/snow-sprite@${e(1)}.png`,{frameWidth:e(16),frameHeight:e(16),margin:1,spacing:2}),this.load.tilemapTiledJSON("map",`assets/levels@${e(1)}.json`)}create(){this.scene.start("main-scene")}}function y(a,t,o,n,s){return{type:Phaser.AUTO,scene:[f,g],width:a*n,height:t*n,backgroundColor:8900331,autoFocus:!0,render:{},physics:{default:"arcade",arcade:{gravity:{y:300*n},debug:s}},scale:{mode:o,autoCenter:Phaser.Scale.Center.CENTER_BOTH,zoom:1/n}}}let d=!0;d=!1;let h=window.devicePixelRatio;h!==1&&h!==2&&h!==3&&(h=1);globalThis.pixelRatio=h;const b=y(400,640,c.Scale.ScaleModes.NONE,h,d);new c.Game(b);window.onload=()=>{const a=document.querySelector("#loader");a.style.display="none"};
