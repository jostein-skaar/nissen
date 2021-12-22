var P=Object.defineProperty;var T=(i,t,o)=>t in i?P(i,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):i[t]=o;var r=(i,t,o)=>(T(i,typeof t!="symbol"?t+"":t,o),o);import{P as p,v as I}from"./vendor.65781a6a.js";const F=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))h(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&h(c)}).observe(document,{childList:!0,subtree:!0});function o(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerpolicy&&(a.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?a.credentials="include":s.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function h(s){if(s.ep)return;s.ep=!0;const a=o(s);fetch(s.href,a)}};F();function e(i){return i*globalThis.pixelRatio}class G extends p.Scene{constructor(){super("main-scene");r(this,"groundLayer");r(this,"bredde");r(this,"hoyde");r(this,"map");r(this,"helt");r(this,"presentsGroup");r(this,"enemyGroup");r(this,"hasJumpedTwice",!1);r(this,"timeSinceLastJump");r(this,"backgroundMountains");r(this,"backgroundSnow");r(this,"collectedPresents",0);r(this,"collectedPresentsText");r(this,"startInfoText");r(this,"paused",!1);r(this,"level")}init(t){this.bredde=this.game.scale.gameSize.width,this.hoyde=this.game.scale.gameSize.height,this.level=t.level,this.showStartInfo()}create(){var k;const t=e(32);this.map=this.make.tilemap({key:"map"});const o=this.map.addTilesetImage(`tiles-sprite@${e(1)}`,"tiles"),h=this.map.addTilesetImage(`presents-sprite@${e(1)}`,"presents"),s=this.map.addTilesetImage(`korona-sprite@${e(1)}`,"coronas");this.backgroundMountains=this.add.tileSprite(0,0,this.bredde,this.hoyde,"background-mountains").setOrigin(0,0).setScrollFactor(0).setScale(e(1)),this.backgroundSnow=this.add.tileSprite(0,0,this.bredde,this.hoyde,"background-snow").setOrigin(0,0).setScale(e(1)).setScrollFactor(0);const a=.5;var f=this.add.particles("snow").createEmitter({x:{min:0,max:this.map.widthInPixels*a+this.bredde/2},y:e(-10),lifespan:{min:2e4,max:6e4},speedY:{min:e(2),max:e(10)},speedX:{min:e(-10),max:e(10)},angle:{min:0,max:180},gravityY:e(1),scale:{min:.4,max:1},quantity:5,frequency:500,rotate:{start:0,end:180},frame:[0,1,2]});f.scrollFactorX=a,f.randomFrame=!0,console.log("this.map.widthInPixels",this.map.widthInPixels);const n=this.map.createLayer(this.level,[o,h,s]);n.setCollisionByProperty({collision:!0}),this.presentsGroup=this.physics.add.group({allowGravity:!1,immovable:!0}),this.enemyGroup=this.physics.add.group({allowGravity:!1,immovable:!0}),this.anims.create({key:"blink",frames:this.anims.generateFrameNumbers("corona",{frames:[0,1,0,1,0]}),frameRate:7,repeat:-1,delay:1500,repeatDelay:3e3});const S=(k=this.map.tilesets.find(l=>l.name.startsWith("presents-sprite")))==null?void 0:k.firstgid;for(let l=0;l<this.map.width;l++)for(let d=0;d<this.map.height;d++)if(n.hasTileAt(l,d)){const u=n.getTileAt(l,d);if(u.properties.present===!0)u.visible=!1,this.presentsGroup.create(l*t,d*t,"present",u.index-S).setOrigin(0,0);else if(u.properties.corona===!0){u.visible=!1;const x=this.physics.add.sprite(l*t,d*t,"corona").setOrigin(0,0);this.enemyGroup.add(x),x.play("blink",!0)}}this.helt=this.physics.add.sprite(0,0,"helt"),this.helt.setPosition(this.helt.width/2,this.hoyde-this.helt.height/2-t),this.helt.anims.create({key:"walk",frames:this.anims.generateFrameNumbers("helt",{frames:[1,0]}),frameRate:6,repeat:-1}),this.helt.anims.create({key:"stand",frames:this.anims.generateFrameNumbers("helt",{frames:[1]})}),this.helt.anims.create({key:"jump",frames:this.anims.generateFrameNumbers("helt",{frames:[0]})}),this.helt.setBounce(.1),this.input.on("pointerdown",()=>{this.helt.setVelocityY(e(-200))}),this.cameras.main.startFollow(this.helt),this.cameras.main.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels),this.physics.add.collider(this.helt,n),this.physics.add.overlap(this.helt,this.presentsGroup,(l,d)=>{d.disableBody(!0,!0),this.collectedPresents+=1,this.updateText()}),this.physics.add.overlap(this.helt,this.enemyGroup,(l,d)=>{this.lose()}),this.collectedPresentsText=this.add.text(e(16),e(16),"",{fontSize:`${e(24)}px`,color:"#000"}),this.collectedPresentsText.setScrollFactor(0,0),this.createStartInfoText(),this.helt.play("stand",!0),this.paused=!0,this.physics.pause()}update(){this.backgroundMountains.tilePositionX=this.cameras.main.scrollX*.2/e(1),this.backgroundSnow.tilePositionX=this.cameras.main.scrollX*.6/e(1),this.helt.setVelocityX(e(100)),this.paused||(this.helt.body.onFloor()&&!this.helt.body.onWall()?this.helt.play("walk",!0):this.helt.body.onFloor()?this.helt.play("stand",!0):this.helt.play("jump",!0)),this.helt.x>this.map.widthInPixels&&this.scene.restart({level:this.level}),this.helt.y>this.map.heightInPixels&&this.lose()}updateText(){this.collectedPresentsText.setText(`pakker: ${this.collectedPresents}`)}showStartInfo(){}createStartInfoText(){const t=`Stakkars nissen har falt
 av sleden og mista alle
pakkene. Kan du hjelpe
 ham \xE5 samle s\xE5 mange som
 mulig uten \xE5 f\xE5 korona?

Trykk her for \xE5 begynne.`;this.startInfoText=this.add.text(this.bredde/2,this.hoyde/2,t,{fontSize:`${e(20)}px`,color:"#000",align:"center",backgroundColor:"#ccc",padding:{x:10,y:10}}).setOrigin(.5,.5),this.input.once("pointerup",()=>{this.startGame()})}startGame(){this.startInfoText.visible=!1,this.collectedPresents=0,this.updateText(),this.physics.resume(),this.paused=!1}lose(){this.helt.setTint(16711680),this.scene.pause(),this.cameras.main.setBackgroundColor(12237498),this.cameras.main.setAlpha(.5),setTimeout(()=>{this.scene.restart({level:this.level})},2e3)}}class O extends p.Scene{constructor(){super({key:"preload-scene"})}preload(){console.log("preload-scene"),this.load.spritesheet("helt",`/assets/helt-sprite@${e(1)}.png`,{frameWidth:e(32),frameHeight:e(40),margin:1,spacing:2}),this.load.spritesheet("present",`/assets/presents-sprite@${e(1)}.png`,{frameWidth:e(32),frameHeight:e(32),margin:1,spacing:2}),this.load.spritesheet("corona",`/assets/korona-sprite@${e(1)}.png`,{frameWidth:e(32),frameHeight:e(32),margin:1,spacing:2}),this.load.image("tiles",`/assets/tiles-sprite@${e(1)}.png`),this.load.image("presents",`/assets/presents-sprite@${e(1)}.png`),this.load.image("coronas",`/assets/korona-sprite@${e(1)}.png`),this.load.image("background-mountains","/assets/background-mountains@1.png"),this.load.image("background-snow","/assets/background-snow@1.png"),this.load.spritesheet("snow",`/assets/snow-sprite@${e(1)}.png`,{frameWidth:e(16),frameHeight:e(16),margin:1,spacing:2}),this.load.tilemapTiledJSON("map",`assets/levels@${e(1)}.json`)}create(){this.scene.start("main-scene",{level:"level01"})}}function $(i,t,o,h,s,a){return{type:Phaser.AUTO,scene:[O,G],width:i*s,height:t*s,backgroundColor:8900331,autoFocus:!0,parent:"game",render:{},physics:{default:"arcade",arcade:{gravity:{y:300*s},debug:a}},scale:{mode:o,autoCenter:h,zoom:1/s}}}function E(i={}){const{immediate:t=!1,onNeedRefresh:o,onOfflineReady:h,onRegistered:s,onRegisterError:a}=i;let c;const f=async(n=!0)=>{};return"serviceWorker"in navigator&&(c=new I("/sw.js",{scope:"/"}),c.addEventListener("activated",n=>{n.isUpdate?window.location.reload():h==null||h()}),c.register({immediate:t}).then(n=>{s==null||s(n)}).catch(n=>{a==null||a(n)})),f}let v=!0;v=!1;let m=window.devicePixelRatio;m!==1&&m!==2&&m!==3&&(m=1);globalThis.pixelRatio=m;const y=640;let g=400,w=p.Scale.ScaleModes.NONE,b=p.Scale.Center.NO_CENTER;if(window.innerHeight<y){w=p.Scale.ScaleModes.FIT;const i=window.innerHeight/y;console.log("scaleRatio",i),g=Math.min(window.innerWidth/i,400)}else g=Math.min(window.innerWidth,400);g<window.innerWidth&&(b=p.Scale.Center.CENTER_BOTH);console.table({width:g,height:y,scaleModePhaser:w,centerModePhaser:b});const N=$(g,y,w,b,m,v);new p.Game(N);window.onload=()=>{console.log("onload: Let's wait a little more...");const i=document.querySelector("#loader"),t=document.querySelector("#preload"),o=document.querySelector("#game");i.style.display="none",t.style.display="none",o.style.display="block"};E();
