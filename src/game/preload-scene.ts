import Phaser from 'phaser';
import { fiksForPikselratio } from '../fiks-for-pikselratio';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'preload-scene' });
  }
  useParallax = false;
  level!: string;

  init(data: any): void {
    this.level = data.level;
  }

  preload() {
    console.log('preload-scene');

    this.load.spritesheet('helt', `/assets/helt-sprite@${fiksForPikselratio(1)}.png?v={VERSJON}`, {
      frameWidth: fiksForPikselratio(32),
      frameHeight: fiksForPikselratio(40),
      margin: 1,
      spacing: 2,
    });

    this.load.spritesheet('present', `/assets/presents-sprite@${fiksForPikselratio(1)}.png?v={VERSJON}`, {
      frameWidth: fiksForPikselratio(32),
      frameHeight: fiksForPikselratio(32),
      margin: 1,
      spacing: 2,
    });

    this.load.spritesheet('corona', `/assets/korona-sprite@${fiksForPikselratio(1)}.png?v={VERSJON}`, {
      frameWidth: fiksForPikselratio(32),
      frameHeight: fiksForPikselratio(32),
      margin: 1,
      spacing: 2,
    });

    this.load.image('tiles', `/assets/tiles-sprite@${fiksForPikselratio(1)}.png?v={VERSJON}`);
    this.load.image('presents', `/assets/presents-sprite@${fiksForPikselratio(1)}.png?v={VERSJON}`);
    this.load.image('coronas', `/assets/korona-sprite@${fiksForPikselratio(1)}.png?v={VERSJON}`);

    if (this.useParallax) {
      this.load.image('background-mountains', `/assets/background-mountains@1.png?v={VERSJON}`);
      this.load.image('background-snow', `/assets/background-snow@1.png?v={VERSJON}`);
    }

    // this.load.spritesheet('background', `/assets/background-sprite@${fiksForPikselratio(1)}.png`, {
    //   frameWidth: fiksForPikselratio(800),
    //   frameHeight: fiksForPikselratio(640),
    //   margin: 1,
    //   spacing: 2,
    // });

    this.load.spritesheet('snow', `/assets/snow-sprite@${fiksForPikselratio(1)}.png?v={VERSJON}`, {
      frameWidth: fiksForPikselratio(16),
      frameHeight: fiksForPikselratio(16),
      margin: 1,
      spacing: 2,
    });

    this.load.tilemapTiledJSON('map', `assets/levels@${fiksForPikselratio(1)}.json?v={VERSJON}`);
  }
}
