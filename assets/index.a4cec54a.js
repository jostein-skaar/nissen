var p=Object.defineProperty;var m=(i,e,a)=>e in i?p(i,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):i[e]=a;var r=(i,e,a)=>(m(i,typeof e!="symbol"?e+"":e,a),a);import{P as h}from"./vendor.3fc30302.js";const u=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function a(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=a(t);fetch(t.href,o)}};u();function s(i){return i*globalThis.pixelRatio}class g extends h.Scene{constructor(){super("main-scene");r(this,"groundLayer");r(this,"bredde");r(this,"hoyde");r(this,"map");r(this,"helt");r(this,"presentsGroup");r(this,"hasJumpedTwice",!1);r(this,"timeSinceLastJump");r(this,"backgroundMountains");r(this,"backgroundSnow")}init(){this.bredde=this.game.scale.gameSize.width,this.hoyde=this.game.scale.gameSize.height}create(){this.map=this.make.tilemap({key:"map"});const e=this.map.addTilesetImage(`tiles-sprite@${s(1)}`,"tiles"),a=this.map.addTilesetImage(`presents-sprite@${s(1)}`,"presents"),n=this.map.addTilesetImage(`korona-sprite@${s(1)}`,"coronas");this.backgroundMountains=this.add.tileSprite(0,0,this.bredde,this.hoyde,"background",0).setOrigin(0,0).setScrollFactor(0),this.backgroundSnow=this.add.tileSprite(0,0,this.bredde,this.hoyde,"background",1).setOrigin(0,0).setScrollFactor(0);const t=this.map.createLayer("level03",[e,a,n]);t.setCollisionByProperty({collision:!0}),this.presentsGroup=this.physics.add.group({allowGravity:!1,immovable:!0}),this.helt=this.physics.add.sprite(s(32/2),this.hoyde-s(40/2+32+100),"helt"),this.helt.anims.create({key:"walk",frames:this.anims.generateFrameNumbers("helt",{frames:[1,0]}),frameRate:6,repeat:-1}),this.helt.anims.create({key:"stand",frames:this.anims.generateFrameNumbers("helt",{frames:[1]})}),this.helt.anims.create({key:"jump",frames:this.anims.generateFrameNumbers("helt",{frames:[0]})}),this.helt.setBounce(.1),this.input.on("pointerdown",()=>{console.log("hopp")}),this.cameras.main.startFollow(this.helt),this.cameras.main.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels),this.physics.add.collider(this.helt,t)}update(e){this.backgroundMountains.tilePositionX=this.cameras.main.scrollX*.2,this.backgroundSnow.tilePositionX=this.cameras.main.scrollX*.6,this.input.activePointer.isDown&&(this.helt.body.blocked.down||this.helt.body.touching.down)&&console.log("Klar for hoppings?",this.helt.body.touching),this.input.activePointer.isDown&&(this.helt.body.blocked.down||this.helt.body.touching.down||this.hasJumpedTwice)?(this.helt.setVelocityY(s(-200)),(!this.timeSinceLastJump||e-this.timeSinceLastJump>300)&&(this.hasJumpedTwice?(console.log("update2",this.hasJumpedTwice,e),this.hasJumpedTwice=!1):(console.log("update3",this.hasJumpedTwice,e),this.hasJumpedTwice=!0,this.timeSinceLastJump=e))):this.helt.setVelocityX(s(100)),this.helt.body.onFloor()&&!this.helt.body.onWall()?this.helt.play("walk",!0):this.helt.body.onFloor()?this.helt.play("stand",!0):this.helt.play("jump",!0),this.helt.x>this.map.widthInPixels&&this.scene.restart()}}class f extends h.Scene{constructor(){super({key:"preload-scene"})}preload(){console.log("preload-scene"),this.load.spritesheet("helt",`/assets/helt-sprite@${s(1)}.png`,{frameWidth:s(32),frameHeight:s(40),margin:1,spacing:2}),this.load.image("tiles",`/assets/tiles-sprite@${s(1)}.png`),this.load.image("presents",`/assets/presents-sprite@${s(1)}.png`),this.load.image("coronas",`/assets/korona-sprite@${s(1)}.png`),this.load.spritesheet("background",`/assets/background-sprite@${s(1)}.png`,{frameWidth:s(800),frameHeight:s(640),margin:1,spacing:2}),this.load.spritesheet("snow",`/assets/snow-sprite@${s(1)}.png`,{frameWidth:s(16),frameHeight:s(16),margin:1,spacing:2}),this.load.tilemapTiledJSON("map",`assets/levels@${s(1)}.json`)}create(){this.scene.start("main-scene")}}function y(i,e,a,n,t){return{type:Phaser.AUTO,scene:[f,g],width:i*n,height:e*n,backgroundColor:8900331,autoFocus:!0,render:{},physics:{default:"arcade",arcade:{gravity:{y:300*n},debug:t}},scale:{mode:a,autoCenter:Phaser.Scale.Center.CENTER_BOTH,zoom:1/n}}}let d=!0;d=!1;let l=window.devicePixelRatio;l!==1&&l!==2&&l!==3&&(l=1);globalThis.pixelRatio=l;const b=y(400,640,h.Scale.ScaleModes.NONE,l,d);new h.Game(b);window.onload=()=>{const i=document.querySelector("#loader");i.style.display="none"};
