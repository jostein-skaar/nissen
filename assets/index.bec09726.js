var N=Object.defineProperty;var R=(o,t,a)=>t in o?N(o,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):o[t]=a;var s=(o,t,a)=>(R(o,typeof t!="symbol"?t+"":t,a),a);import{P as d,r as $}from"./vendor.ba9c2c96.js";const J=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const h of l.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&n(h)}).observe(document,{childList:!0,subtree:!0});function a(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerpolicy&&(l.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?l.credentials="include":i.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function n(i){if(i.ep)return;i.ep=!0;const l=a(i);fetch(i.href,l)}};J();function e(o){return o*globalThis.pixelRatio}class G extends Phaser.Scene{constructor(){super({key:"lost-scene"});s(this,"bredde");s(this,"hoyde");s(this,"forrigeResultat");s(this,"level")}init(t){this.bredde=this.game.scale.gameSize.width,this.hoyde=this.game.scale.gameSize.height,this.forrigeResultat=t.resultat,this.level=t.level}create(){const t=`Du klarte ${this.forrigeResultat}
Trykk for \xE5 pr\xF8ve igjen
(Vent for \xE5 g\xE5 til meny)`;this.add.text(this.bredde/2,this.hoyde/2,t,{fontFamily:"arial",fontSize:`${e(20)}px`,color:"#fff",align:"center",backgroundColor:"#b3000c",padding:{x:e(15),y:e(15)}}).setOrigin(.5,.5);const a=setTimeout(()=>{this.scene.stop();const n=document.querySelector("#home"),i=document.querySelector("#game");n.style.display="block",i.style.display="none"},5e3);setTimeout(()=>{this.input.once("pointerdown",()=>{clearTimeout(a),this.scene.start("main-scene",{level:this.level})})},500)}}class I extends d.Scene{constructor(){super("main-scene");s(this,"groundLayer");s(this,"bredde");s(this,"hoyde");s(this,"map");s(this,"helt");s(this,"presentsGroup");s(this,"enemyGroup");s(this,"hasJumpedTwice");s(this,"backgroundMountains");s(this,"backgroundSnow");s(this,"collectedPresents",0);s(this,"collectedPresentsBest",0);s(this,"collectedPresentsText");s(this,"isPaused",!1);s(this,"isDead",!1);s(this,"level");s(this,"useParallax",!1);s(this,"countdownText")}init(t){this.bredde=this.game.scale.gameSize.width,this.hoyde=this.game.scale.gameSize.height,this.level=t.level;const a=localStorage.getItem(`nissen-best-score-${this.level}`);this.collectedPresentsBest=a===null?0:+a}create(){var b;const t=e(32);this.map=this.make.tilemap({key:"map"});const a=this.map.addTilesetImage(`tiles-sprite@${e(1)}`,"tiles");this.useParallax&&(this.backgroundMountains=this.add.tileSprite(0,0,this.bredde,this.hoyde,"background-mountains").setOrigin(0,0).setScale(e(1)).setScrollFactor(0),this.backgroundSnow=this.add.tileSprite(0,0,this.bredde,this.hoyde,"background-snow").setOrigin(0,0).setScale(e(1)).setScrollFactor(0));const n=.5;var l=this.add.particles("snow").createEmitter({x:{min:0,max:this.map.widthInPixels*n+this.bredde/2},y:e(-10),lifespan:{min:2e4,max:6e4},speedY:{min:e(2),max:e(10)},speedX:{min:e(-10),max:e(10)},angle:{min:0,max:180},gravityY:e(1),scale:{min:.4,max:1},quantity:5,frequency:500,rotate:{start:0,end:180},frame:[0,1,2]});l.scrollFactorX=n,l.randomFrame=!0,console.log("this.map.widthInPixels",this.map.widthInPixels);const h=this.map.createLayer(this.level,[a]);h.setCollisionByProperty({collision:!0}),this.presentsGroup=this.physics.add.group({allowGravity:!1,immovable:!0}),this.enemyGroup=this.physics.add.group({allowGravity:!1,immovable:!0}),this.anims.create({key:"blink",frames:this.anims.generateFrameNumbers("corona",{frames:[0,1,0,1,0]}),frameRate:7,repeat:-1,delay:1500,repeatDelay:3e3});const E=(b=this.map.tilesets.find(r=>r.name.startsWith("presents-sprite")))==null?void 0:b.firstgid;for(let r=0;r<this.map.width;r++)for(let c=0;c<this.map.height;c++)if(h.hasTileAt(r,c)){const p=h.getTileAt(r,c);if(p.properties.present===!0)p.visible=!1,this.presentsGroup.create(r*t,c*t,"present",p.index-E).setOrigin(0,0);else if(p.properties.corona===!0){p.visible=!1;const P=this.physics.add.sprite(r*t,c*t,"corona").setOrigin(0,0).setSize(e(20),e(20));this.enemyGroup.add(P),P.play("blink",!0)}}this.helt=this.physics.add.sprite(0,0,"helt"),this.helt.setPosition(this.helt.width/2,this.hoyde-this.helt.height/2-t),this.helt.anims.create({key:"walk",frames:this.anims.generateFrameNumbers("helt",{frames:[1,2]}),frameRate:6}),this.helt.anims.create({key:"stand",frames:this.anims.generateFrameNumbers("helt",{frames:[0]})}),this.helt.anims.create({key:"jump",frames:this.anims.generateFrameNumbers("helt",{frames:[3,4]}),frameRate:9}),this.input.on("pointerdown",()=>{this.helt.body.onFloor()?(this.helt.setVelocityY(e(-200)),this.hasJumpedTwice=!1,console.log("HOPP: onFloor()")):this.hasJumpedTwice===!1?(this.helt.setVelocityY(e(-200)),this.hasJumpedTwice=!0,console.log("HOPP: hasJumpedTwice === false")):console.log("HOPP: else")}),this.cameras.main.startFollow(this.helt),this.cameras.main.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels),this.physics.add.collider(this.helt,h),this.physics.add.overlap(this.helt,this.presentsGroup,(r,c)=>{c.disableBody(!0,!0),this.collectedPresents+=1,this.updateText()}),this.physics.add.overlap(this.helt,this.enemyGroup,(r,c)=>{this.lose()}),this.collectedPresentsText=this.add.text(e(16),e(16),"",{fontSize:`${e(24)}px`,color:"#000"}),this.collectedPresentsText.setScrollFactor(0,0),this.countdownText=this.add.text(this.bredde/2,this.hoyde/2,"",{fontSize:`${e(200)}px`,color:"#b3000c",fontStyle:"bold"}).setOrigin(.5,.5),this.tweens.add({targets:this.countdownText,scale:1.4,ease:"Power0",duration:250,yoyo:!0,repeat:-1});let u=3;this.countdownText.setText(u.toString());const F=setInterval(()=>{u--,this.countdownText.setText(u.toString()),console.log(u),u<=0&&(this.countdownText.setVisible(!1),this.startGame(),clearInterval(F))},1e3);this.collectedPresents=0,this.isDead=!1,this.updateText(),this.isPaused=!0,this.physics.pause()}update(){this.useParallax&&(this.backgroundMountains.tilePositionX=this.cameras.main.scrollX*.2/e(1),this.backgroundSnow.tilePositionX=this.cameras.main.scrollX*.6/e(1)),this.helt.setVelocityX(e(100)),this.isPaused||(this.helt.body.onFloor()&&!this.helt.body.onWall()?this.helt.play("walk",!0):this.helt.body.onFloor()?this.helt.play("stand",!0):this.helt.play("jump",!0),this.helt.body.onFloor()&&(this.hasJumpedTwice=void 0)),this.helt.x>this.map.widthInPixels&&this.lose(),this.helt.y>this.map.heightInPixels&&this.lose()}updateText(){let t=`Pakker: ${this.collectedPresents}`;this.collectedPresentsBest>0&&(t+=`
Rekord: ${this.collectedPresentsBest}`),this.collectedPresentsText.setText(t)}startGame(){this.isPaused=!1,this.physics.resume()}lose(){this.isDead||(this.isDead=!0,this.scene.pause(),this.helt.setTint(16711680),this.cameras.main.setBackgroundColor(12237498),this.cameras.main.setAlpha(.5),this.collectedPresentsBest=Math.max(this.collectedPresents,this.collectedPresentsBest),localStorage.setItem(`nissen-best-score-${this.level}`,this.collectedPresentsBest.toString()),console.log({resultat:this.collectedPresents,level:this.level}),this.scene.launch("lost-scene",{resultat:this.collectedPresents,level:this.level}))}}class V extends d.Scene{constructor(){super({key:"preload-scene"});s(this,"useParallax",!1);s(this,"level")}init(t){this.level=t.level}preload(){console.log("preload-scene"),this.load.spritesheet("helt",`/assets/helt-sprite@${e(1)}.png?v=0.69`,{frameWidth:e(32),frameHeight:e(40),margin:1,spacing:2}),this.load.spritesheet("present",`/assets/presents-sprite@${e(1)}.png?v=0.69`,{frameWidth:e(32),frameHeight:e(32),margin:1,spacing:2}),this.load.spritesheet("corona",`/assets/korona-sprite@${e(1)}.png?v=0.69`,{frameWidth:e(32),frameHeight:e(32),margin:1,spacing:2}),this.load.image("tiles",`/assets/tiles-sprite@${e(1)}.png?v=0.69`),this.load.image("presents",`/assets/presents-sprite@${e(1)}.png?v=0.69`),this.load.image("coronas",`/assets/korona-sprite@${e(1)}.png?v=0.69`),this.useParallax&&(this.load.image("background-mountains","/assets/background-mountains@1.png?v=0.69"),this.load.image("background-snow","/assets/background-snow@1.png?v=0.69")),this.load.spritesheet("snow",`/assets/snow-sprite@${e(1)}.png?v=0.69`,{frameWidth:e(16),frameHeight:e(16),margin:1,spacing:2}),this.load.tilemapTiledJSON("map",`assets/levels@${e(1)}.json?v=0.69`)}}function C(o,t,a,n,i,l){return{type:Phaser.AUTO,scene:[V,I,G],width:o*i,height:t*i,backgroundColor:8900331,autoFocus:!0,parent:"game",render:{antialias:!0},physics:{default:"arcade",arcade:{gravity:{y:300*i},debug:l}},scale:{mode:a,autoCenter:n,zoom:1/i}}}$(window);let x=!0;x=!1;let m=window.devicePixelRatio;m!==1&&m!==2&&m!==3&&(m=1);globalThis.pixelRatio=m;const y=640,f=640;let g=y,w=d.Scale.ScaleModes.NONE,S=d.Scale.Center.NO_CENTER;if(window.innerHeight<f){w=d.Scale.ScaleModes.FIT;const o=window.innerHeight/f;console.log("scaleRatio",o),g=Math.min(window.innerWidth/o,y)}else g=Math.min(window.innerWidth,y);g<window.innerWidth&&(S=d.Scale.Center.CENTER_BOTH);console.table({width:g,height:f,scaleModePhaser:w,centerModePhaser:S});const L=C(g,f,w,S,m,x),q=new d.Game(L);var k;(k=document.querySelector(".start-level-jostein"))==null||k.addEventListener("click",()=>{v("level-jostein")});var T;(T=document.querySelector(".start-level-aron"))==null||T.addEventListener("click",()=>{v("level-aron")});var O;(O=document.querySelector(".start-level-else"))==null||O.addEventListener("click",()=>{v("level-else")});function v(o){q.scene.start("main-scene",{level:o});const t=document.querySelector("#home"),a=document.querySelector("#game");t.style.display="none",a.style.display="block"}window.onload=()=>{console.log("onload: Let's wait a little more...");const o=document.querySelector("#loader"),t=document.querySelector("#home"),a=document.querySelector("#game");o.style.display="none",t.style.display="block",a.style.display="none"};
