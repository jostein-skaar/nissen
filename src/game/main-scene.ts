import Phaser from 'phaser';
import { fiksForPikselratio } from '../fiks-for-pikselratio';

export class MainScene extends Phaser.Scene {
  groundLayer: any;
  bredde!: number;
  hoyde!: number;
  map!: Phaser.Tilemaps.Tilemap;
  helt!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  presentsGroup!: Phaser.Physics.Arcade.Group;
  enemyGroup!: Phaser.Physics.Arcade.Group;
  hasJumpedTwice: boolean | undefined;
  backgroundMountains!: Phaser.GameObjects.TileSprite;
  backgroundSnow!: Phaser.GameObjects.TileSprite;
  collectedPresents = 0;
  collectedPresentsText!: Phaser.GameObjects.Text;
  startInfoText!: Phaser.GameObjects.Text;
  paused: boolean = false;
  level!: string;
  useParallax = false;

  constructor() {
    super('main-scene');
  }

  init(data: any): void {
    this.bredde = this.game.scale.gameSize.width;
    this.hoyde = this.game.scale.gameSize.height;
    this.level = data.level;
  }

  create(): void {
    const tilesSize = fiksForPikselratio(32);

    this.map = this.make.tilemap({ key: 'map' });
    const tiles = this.map.addTilesetImage(`tiles-sprite@${fiksForPikselratio(1)}`, 'tiles');

    if (this.useParallax) {
      this.backgroundMountains = this.add
        .tileSprite(0, 0, this.bredde, this.hoyde, 'background-mountains')
        .setOrigin(0, 0)
        .setScale(fiksForPikselratio(1))
        .setScrollFactor(0);
      this.backgroundSnow = this.add
        .tileSprite(0, 0, this.bredde, this.hoyde, 'background-snow')
        .setOrigin(0, 0)
        .setScale(fiksForPikselratio(1))
        .setScrollFactor(0);
    }

    const snowScrollFactor = 0.5;
    const particles = this.add.particles('snow');
    var emitter = particles.createEmitter({
      x: { min: 0, max: this.map.widthInPixels * snowScrollFactor + this.bredde / 2 },
      y: fiksForPikselratio(-10),
      lifespan: { min: 20000, max: 60000 },
      speedY: { min: fiksForPikselratio(2), max: fiksForPikselratio(10) },
      speedX: { min: fiksForPikselratio(-10), max: fiksForPikselratio(10) },
      angle: { min: 0, max: 180 },
      gravityY: fiksForPikselratio(1),
      scale: { min: 0.4, max: 1 },
      quantity: 5,
      frequency: 500,
      rotate: { start: 0, end: 180 },
      frame: [0, 1, 2],
    });
    emitter.scrollFactorX = snowScrollFactor;
    emitter.randomFrame = true;
    console.log('this.map.widthInPixels', this.map.widthInPixels);

    const platformLayer = this.map.createLayer(this.level, [tiles]);
    platformLayer.setCollisionByProperty({ collision: true });

    this.presentsGroup = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });

    this.enemyGroup = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });

    this.anims.create({
      key: 'blink',
      frames: this.anims.generateFrameNumbers('corona', { frames: [0, 1, 0, 1, 0] }),
      frameRate: 7,
      repeat: -1,
      delay: 1500,
      repeatDelay: 3000,
    });

    const presentsFirstGid = this.map.tilesets.find((x) => x.name.startsWith('presents-sprite'))?.firstgid!;
    for (let x = 0; x < this.map.width; x++) {
      for (let y = 0; y < this.map.height; y++) {
        if (platformLayer.hasTileAt(x, y)) {
          const t = platformLayer.getTileAt(x, y);
          if (t.properties.present === true) {
            t.visible = false;
            this.presentsGroup.create(x * tilesSize, y * tilesSize, 'present', t.index - presentsFirstGid).setOrigin(0, 0);
          } else if (t.properties.corona === true) {
            t.visible = false;
            const corona = this.physics.add
              .sprite(x * tilesSize, y * tilesSize, 'corona')
              .setOrigin(0, 0)
              .setSize(fiksForPikselratio(20), fiksForPikselratio(20));
            this.enemyGroup.add(corona);
            corona.play('blink', true);
          }
        }
      }
    }

    this.helt = this.physics.add.sprite(0, 0, 'helt');
    this.helt.setPosition(this.helt.width / 2, this.hoyde - this.helt.height / 2 - tilesSize);

    this.helt.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('helt', { frames: [1, 2] }),
      frameRate: 6,
    });
    this.helt.anims.create({
      key: 'stand',
      frames: this.anims.generateFrameNumbers('helt', { frames: [0] }),
    });
    this.helt.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('helt', { frames: [3, 4] }),
      frameRate: 9,
    });

    // this.helt.anims.play('walk', true);
    // this.helt.setBounce(0);
    this.paused = true;
    this.physics.pause();
    this.input.once('pointerup', () => {
      this.paused = false;
      this.physics.resume();
    });

    this.input.on('pointerdown', () => {
      // console.log(this.helt.body.onFloor(), this.helt.body.touching.down, this.hasJumpedTwice === false);
      if (this.helt.body.onFloor()) {
        // || this.helt.body.touching.down) {
        this.helt.setVelocityY(fiksForPikselratio(-200));
        this.hasJumpedTwice = false;
        console.log('HOPP: onFloor()');
      } else if (this.hasJumpedTwice === false) {
        this.helt.setVelocityY(fiksForPikselratio(-200));
        this.hasJumpedTwice = true;
        console.log('HOPP: hasJumpedTwice === false');
      } else {
        console.log('HOPP: else');
      }
    });

    this.cameras.main.startFollow(this.helt);
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    this.physics.add.collider(this.helt, platformLayer);

    this.physics.add.overlap(this.helt, this.presentsGroup, (_helt, present) => {
      //@ts-ignore
      present.disableBody(true, true);
      this.collectedPresents += 1;
      this.updateText();

      // this.hasJumpedTwice = false;
    });

    this.physics.add.overlap(this.helt, this.enemyGroup, (_helt, _enemy) => {
      this.lose();
    });

    this.collectedPresentsText = this.add.text(fiksForPikselratio(16), fiksForPikselratio(16), '', {
      fontSize: `${fiksForPikselratio(24)}px`,
      color: '#000',
    });
    this.collectedPresentsText.setScrollFactor(0, 0);
  }

  update(): void {
    // Because we use background@1-versions (pixelRatio=1), we need to compensate the scrolling.
    if (this.useParallax) {
      this.backgroundMountains.tilePositionX = (this.cameras.main.scrollX * 0.2) / fiksForPikselratio(1);
      this.backgroundSnow.tilePositionX = (this.cameras.main.scrollX * 0.6) / fiksForPikselratio(1);
    }

    // if (this.input.activePointer.isDown && (this.helt.body.blocked.down || this.helt.body.touching.down)) {
    //   this.helt.setVelocityY(fiksForPikselratio(-200));
    //   console.log('satt hopp');
    // } else {
    //   this.helt.setVelocityX(fiksForPikselratio(100));
    //   if (this.helt.body.blocked.down || this.helt.body.touching.down) {
    //     console.log('har landa');
    //   }
    // }

    // TODO: Problem når hoppa og landa. Kan ikke dobelthoppe neste gang.
    // if (this.input.activePointer.isDown && (this.helt.body.blocked.down || this.helt.body.touching.down || this.hasJumpedTwice)) {
    //   this.helt.setVelocityY(fiksForPikselratio(-200));
    //   // 400 ms er for å sikre at man er ferdig å klikke første gang.
    //   // Lavt tall her gjør at man må tappe spesielt fort på en touch skjerm.
    //   if (this.timeSinceLastJump && time - this.timeSinceLastJump > 4000) {
    //     this.hasJumpedTwice = false;
    //     this.timeSinceLastJump = undefined;
    //   } else if (!this.timeSinceLastJump || time - this.timeSinceLastJump > 400) {
    //     if (this.hasJumpedTwice) {
    //       console.log('update2', this.hasJumpedTwice, time);
    //       this.hasJumpedTwice = false;
    //     } else {
    //       console.log('update3', this.hasJumpedTwice, time);
    //       this.hasJumpedTwice = true;
    //       this.timeSinceLastJump = time;
    //     }
    //   }
    // } //else {
    //   this.helt.setVelocityX(fiksForPikselratio(100));
    // }

    this.helt.setVelocityX(fiksForPikselratio(100));

    // Animasjoner.
    if (!this.paused) {
      if (this.helt.body.onFloor() && !this.helt.body.onWall()) {
        this.helt.play('walk', true);
      } else if (!this.helt.body.onFloor()) {
        this.helt.play('jump', true);
      } else {
        this.helt.play('stand', true);
      }
      if (this.helt.body.onFloor()) {
        this.hasJumpedTwice = undefined;
      }
    }
    if (this.helt.x > this.map.widthInPixels) {
      this.scene.restart({ level: this.level });
    }

    if (this.helt.y > this.map.heightInPixels) {
      this.lose();
    }
  }

  private updateText() {
    this.collectedPresentsText.setText(`pakker: ${this.collectedPresents}`);
  }

  private lose() {
    this.scene.pause();
    this.helt.setTint(0xff0000);
    this.cameras.main.setBackgroundColor(0xbababa);
    this.cameras.main.setAlpha(0.5);

    this.scene.launch('lost-scene', { resultat: this.collectedPresents, level: this.level });

    // const goToHomeTimeout = setTimeout(() => {
    //   // this.scene.restart({ level: this.level });
    //   const home = document.querySelector<HTMLDivElement>('#home')!;
    //   const game = document.querySelector<HTMLDivElement>('#game')!;
    //   home.style.display = 'block';
    //   game.style.display = 'none';
    // }, 3000);

    // setTimeout(() => {
    //   this.input.once('pointerdown', () => {
    //     console.log('Want to try level again');
    //     clearTimeout(goToHomeTimeout);
    //     this.scene.start('main-scene', { level: this.level });
    //   });
    // }, 500);
  }
}
