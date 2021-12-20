import Phaser from 'phaser';
import { fiksForPikselratio } from '../fiks-for-pikselratio';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'preload-scene' });
  }

  preload() {
    console.log('preload-scene');

    this.load.spritesheet('helt', `/assets/helt-sprite@${fiksForPikselratio(1)}.png`, {
      frameWidth: fiksForPikselratio(32),
      frameHeight: fiksForPikselratio(40),
      margin: 1,
      spacing: 2,
    });

    this.load.image('tiles', `/assets/tiles-sprite@${fiksForPikselratio(1)}.png`);
    this.load.image('presents', `/assets/presents-sprite@${fiksForPikselratio(1)}.png`);
    this.load.image('background', `/assets/background-sprite@${fiksForPikselratio(1)}.png`);

    this.load.spritesheet('snow', `/assets/snow-sprite@${fiksForPikselratio(1)}.png`, {
      frameWidth: fiksForPikselratio(16),
      frameHeight: fiksForPikselratio(16),
      margin: 1,
      spacing: 2,
    });

    this.load.tilemapTiledJSON('map', `assets/levels@${fiksForPikselratio(1)}.json`);
  }

  create() {
    this.scene.start('main-scene');
  }
}
