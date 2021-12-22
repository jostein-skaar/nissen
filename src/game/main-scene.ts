import Phaser from 'phaser';
import { fiksForPikselratio } from '../fiks-for-pikselratio';

export class MainScene extends Phaser.Scene {
  groundLayer: any;
  bredde!: number;
  hoyde!: number;
  map!: Phaser.Tilemaps.Tilemap;
  helt!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  presentsGroup!: Phaser.Physics.Arcade.Group;
  hasJumpedTwice = false;
  timeSinceLastJump: number | undefined = undefined;
  backgroundMountains!: Phaser.GameObjects.TileSprite;
  backgroundSnow!: Phaser.GameObjects.TileSprite;

  constructor() {
    super('main-scene');
  }

  init(): void {
    this.bredde = this.game.scale.gameSize.width;
    this.hoyde = this.game.scale.gameSize.height;
    // this.innstillinger = spillressursinfo(this.bredde, this.hoyde);
  }

  create(): void {
    this.map = this.make.tilemap({ key: 'map' });
    const tiles = this.map.addTilesetImage(`tiles-sprite@${fiksForPikselratio(1)}`, 'tiles');
    const presents = this.map.addTilesetImage(`presents-sprite@${fiksForPikselratio(1)}`, 'presents');
    const coronas = this.map.addTilesetImage(`korona-sprite@${fiksForPikselratio(1)}`, 'coronas');

    this.backgroundMountains = this.add
      .tileSprite(0, 0, this.bredde, this.hoyde, 'background-mountains', 0)
      .setOrigin(0, 0)
      .setScrollFactor(0);
    this.backgroundSnow = this.add.tileSprite(0, 0, this.bredde, this.hoyde, 'background-snow', 1).setOrigin(0, 0).setScrollFactor(0);

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

    const platformLayer = this.map.createLayer('level01', [tiles, presents, coronas]);
    platformLayer.setCollisionByProperty({ collision: true });

    this.presentsGroup = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });

    // const t = platformLayer.getTileAt(1, 0);
    // t.visible = false;
    // // platformLayer

    // console.log('tile', t);

    // this.groundLayer = map.createLayer('Level01', tiles);
    // map.createLayer('Foreground', tiles);
    const tilesSize = fiksForPikselratio(32);

    this.helt = this.physics.add.sprite(0, 0, 'helt');
    this.helt.setPosition(this.helt.width / 2, this.hoyde - this.helt.height / 2 - tilesSize * 2);

    this.helt.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('helt', { frames: [1, 0] }),
      frameRate: 6,
      repeat: -1,
    });
    this.helt.anims.create({
      key: 'stand',
      frames: this.anims.generateFrameNumbers('helt', { frames: [1] }),
    });
    this.helt.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('helt', { frames: [0] }),
    });
    // this.helt.anims.play('walk', true);
    this.helt.setBounce(0.1);

    this.input.on('pointerdown', () => {
      console.log('hopp');
    });

    this.cameras.main.startFollow(this.helt);
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    this.physics.add.collider(this.helt, platformLayer);
  }

  update(time: number): void {
    this.backgroundMountains.tilePositionX = this.cameras.main.scrollX * 0.2;
    this.backgroundSnow.tilePositionX = this.cameras.main.scrollX * 0.6;

    if (this.input.activePointer.isDown && (this.helt.body.blocked.down || this.helt.body.touching.down)) {
      console.log('Klar for hoppings?', this.helt.body.touching);
    }

    // TODO: Problem når hoppa og landa. Kan ikke dobelthoppe neste gang.
    if (this.input.activePointer.isDown && (this.helt.body.blocked.down || this.helt.body.touching.down || this.hasJumpedTwice)) {
      this.helt.setVelocityY(fiksForPikselratio(-200));
      // 300 ms er for å sikre at man er ferdig å klikke første gang.
      // Lavt tall her gjør at man må tappe spesielt fort på en touch skjerm.
      if (!this.timeSinceLastJump || time - this.timeSinceLastJump > 300) {
        if (this.hasJumpedTwice) {
          console.log('update2', this.hasJumpedTwice, time);
          this.hasJumpedTwice = false;
        } else {
          console.log('update3', this.hasJumpedTwice, time);
          this.hasJumpedTwice = true;
          this.timeSinceLastJump = time;
        }
      }
    } else {
      this.helt.setVelocityX(fiksForPikselratio(100));
    }

    // Animasjoner.
    if (this.helt.body.onFloor() && !this.helt.body.onWall()) {
      this.helt.play('walk', true);
    } else if (!this.helt.body.onFloor()) {
      this.helt.play('jump', true);
    } else {
      this.helt.play('stand', true);
    }

    if (this.helt.x > this.map.widthInPixels) {
      this.scene.restart();
    }
  }
}
