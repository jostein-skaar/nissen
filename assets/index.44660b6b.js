var S=Object.defineProperty;var T=(a,t,o)=>t in a?S(a,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):a[t]=o;var i=(a,t,o)=>(T(a,typeof t!="symbol"?t+"":t,o),o);import{P as d,r as v}from"./vendor.ba9c2c96.js";const F=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))c(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&c(n)}).observe(document,{childList:!0,subtree:!0});function o(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(s){if(s.ep)return;s.ep=!0;const r=o(s);fetch(s.href,r)}};F();function e(a){return a*globalThis.pixelRatio}class I extends d.Scene{constructor(){super("main-scene");i(this,"groundLayer");i(this,"bredde");i(this,"hoyde");i(this,"map");i(this,"helt");i(this,"presentsGroup");i(this,"enemyGroup");i(this,"hasJumpedTwice");i(this,"backgroundMountains");i(this,"backgroundSnow");i(this,"collectedPresents",0);i(this,"collectedPresentsText");i(this,"startInfoText");i(this,"paused",!1);i(this,"level");i(this,"useParallax",!1)}init(t){this.bredde=this.game.scale.gameSize.width,this.hoyde=this.game.scale.gameSize.height,this.level=t.level,this.showStartInfo()}create(){var x;const t=e(32);this.map=this.make.tilemap({key:"map"});const o=this.map.addTilesetImage(`tiles-sprite@${e(1)}`,"tiles");this.useParallax&&(this.backgroundMountains=this.add.tileSprite(0,0,this.bredde,this.hoyde,"background-mountains").setOrigin(0,0).setScale(e(1)).setScrollFactor(0),this.backgroundSnow=this.add.tileSprite(0,0,this.bredde,this.hoyde,"background-snow").setOrigin(0,0).setScale(e(1)).setScrollFactor(0));const c=.5;var r=this.add.particles("snow").createEmitter({x:{min:0,max:this.map.widthInPixels*c+this.bredde/2},y:e(-10),lifespan:{min:2e4,max:6e4},speedY:{min:e(2),max:e(10)},speedX:{min:e(-10),max:e(10)},angle:{min:0,max:180},gravityY:e(1),scale:{min:.4,max:1},quantity:5,frequency:500,rotate:{start:0,end:180},frame:[0,1,2]});r.scrollFactorX=c,r.randomFrame=!0,console.log("this.map.widthInPixels",this.map.widthInPixels);const n=this.map.createLayer(this.level,[o]);n.setCollisionByProperty({collision:!0}),this.presentsGroup=this.physics.add.group({allowGravity:!1,immovable:!0}),this.enemyGroup=this.physics.add.group({allowGravity:!1,immovable:!0}),this.anims.create({key:"blink",frames:this.anims.generateFrameNumbers("corona",{frames:[0,1,0,1,0]}),frameRate:7,repeat:-1,delay:1500,repeatDelay:3e3});const P=(x=this.map.tilesets.find(l=>l.name.startsWith("presents-sprite")))==null?void 0:x.firstgid;for(let l=0;l<this.map.width;l++)for(let h=0;h<this.map.height;h++)if(n.hasTileAt(l,h)){const p=n.getTileAt(l,h);if(p.properties.present===!0)p.visible=!1,this.presentsGroup.create(l*t,h*t,"present",p.index-P).setOrigin(0,0);else if(p.properties.corona===!0){p.visible=!1;const b=this.physics.add.sprite(l*t,h*t,"corona").setOrigin(0,0).setSize(e(20),e(20));this.enemyGroup.add(b),b.play("blink",!0)}}this.helt=this.physics.add.sprite(0,0,"helt"),this.helt.setPosition(this.helt.width/2,this.hoyde-this.helt.height/2-t),this.helt.anims.create({key:"walk",frames:this.anims.generateFrameNumbers("helt",{frames:[1,2]}),frameRate:6}),this.helt.anims.create({key:"stand",frames:this.anims.generateFrameNumbers("helt",{frames:[0]})}),this.helt.anims.create({key:"jump",frames:this.anims.generateFrameNumbers("helt",{frames:[3,4]}),frameRate:9}),this.input.on("pointerdown",()=>{this.helt.body.onFloor()?(this.helt.setVelocityY(e(-200)),this.hasJumpedTwice=!1,console.log("HOPP: onFloor()")):this.hasJumpedTwice===!1?(this.helt.setVelocityY(e(-200)),this.hasJumpedTwice=!0,console.log("HOPP: hasJumpedTwice === false")):console.log("HOPP: else")}),this.cameras.main.startFollow(this.helt),this.cameras.main.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels),this.physics.add.collider(this.helt,n),this.physics.add.overlap(this.helt,this.presentsGroup,(l,h)=>{h.disableBody(!0,!0),this.collectedPresents+=1,this.updateText()}),this.physics.add.overlap(this.helt,this.enemyGroup,(l,h)=>{this.lose()}),this.collectedPresentsText=this.add.text(e(16),e(16),"",{fontSize:`${e(24)}px`,color:"#000"}),this.collectedPresentsText.setScrollFactor(0,0),this.createStartInfoText(),this.helt.play("stand",!0),this.paused=!0,this.physics.pause()}update(){this.useParallax&&(this.backgroundMountains.tilePositionX=this.cameras.main.scrollX*.2/e(1),this.backgroundSnow.tilePositionX=this.cameras.main.scrollX*.6/e(1)),this.helt.setVelocityX(e(100)),this.paused||(this.helt.body.onFloor()&&!this.helt.body.onWall()?this.helt.play("walk",!0):this.helt.body.onFloor()?this.helt.play("stand",!0):this.helt.play("jump",!0)),this.helt.x>this.map.widthInPixels&&this.scene.restart({level:this.level}),this.helt.y>this.map.heightInPixels&&this.lose()}updateText(){this.collectedPresentsText.setText(`pakker: ${this.collectedPresents}`)}showStartInfo(){}createStartInfoText(){const t=`Stakkars nissen har falt
 av sleden og mista alle
pakkene. Kan du hjelpe
 ham \xE5 samle s\xE5 mange som
 mulig uten \xE5 f\xE5 korona?

Trykk her for \xE5 begynne.`;this.startInfoText=this.add.text(this.bredde/2,this.hoyde/2,t,{fontSize:`${e(20)}px`,color:"#000",align:"center",backgroundColor:"#ccc",padding:{x:10,y:10}}).setOrigin(.5,.5),this.input.once("pointerup",()=>{this.startGame()})}startGame(){this.startInfoText.visible=!1,this.hasJumpedTwice=!1,this.collectedPresents=0,this.updateText(),this.physics.resume(),this.paused=!1}lose(){this.helt.setTint(16711680),this.scene.pause(),this.cameras.main.setBackgroundColor(12237498),this.cameras.main.setAlpha(.5),setTimeout(()=>{this.scene.restart({level:this.level})},2e3)}}class O extends d.Scene{constructor(){super({key:"preload-scene"});i(this,"useParallax",!1)}preload(){console.log("preload-scene"),this.load.spritesheet("helt",`/assets/helt-sprite@${e(1)}.png`,{frameWidth:e(32),frameHeight:e(40),margin:1,spacing:2}),this.load.spritesheet("present",`/assets/presents-sprite@${e(1)}.png`,{frameWidth:e(32),frameHeight:e(32),margin:1,spacing:2}),this.load.spritesheet("corona",`/assets/korona-sprite@${e(1)}.png`,{frameWidth:e(32),frameHeight:e(32),margin:1,spacing:2}),this.load.image("tiles",`/assets/tiles-sprite@${e(1)}.png`),this.load.image("presents",`/assets/presents-sprite@${e(1)}.png`),this.load.image("coronas",`/assets/korona-sprite@${e(1)}.png`),this.useParallax&&(this.load.image("background-mountains","/assets/background-mountains@1.png"),this.load.image("background-snow","/assets/background-snow@1.png")),this.load.spritesheet("snow",`/assets/snow-sprite@${e(1)}.png`,{frameWidth:e(16),frameHeight:e(16),margin:1,spacing:2}),this.load.tilemapTiledJSON("map",`assets/levels@${e(1)}.json`)}create(){this.scene.start("main-scene",{level:"level01"})}}function G(a,t,o,c,s,r){return{type:Phaser.AUTO,scene:[O,I],width:a*s,height:t*s,backgroundColor:8900331,autoFocus:!0,parent:"game",render:{roundPixels:!0},physics:{default:"arcade",arcade:{gravity:{y:300*s},debug:r}},scale:{mode:o,autoCenter:c,zoom:1/s}}}v(window);let k=!0;k=!1;let m=window.devicePixelRatio;m!==1&&m!==2&&m!==3&&(m=1);globalThis.pixelRatio=m;const f=640,g=640;let u=f,y=d.Scale.ScaleModes.NONE,w=d.Scale.Center.NO_CENTER;if(window.innerHeight<g){y=d.Scale.ScaleModes.FIT;const a=window.innerHeight/g;console.log("scaleRatio",a),u=Math.min(window.innerWidth/a,f)}else u=Math.min(window.innerWidth,f);u<window.innerWidth&&(w=d.Scale.Center.CENTER_BOTH);console.table({width:u,height:g,scaleModePhaser:y,centerModePhaser:w});const C=G(u,g,y,w,m,k);new d.Game(C);window.onload=()=>{console.log("onload: Let's wait a little more...");const a=document.querySelector("#loader"),t=document.querySelector("#preload"),o=document.querySelector("#game");a.style.display="none",t.style.display="none",o.style.display="block"};