import './style.css';

import Phaser from 'phaser';
import { createGameConfig } from './game/config';
import { registerSW } from 'virtual:pwa-register';

let isDebug = true;

if (import.meta.env.PROD) {
  isDebug = false;
}

// iPad har faktisk størrelse på 768x1004 (når statuslinja er truket bort).
// Ratio må derfor være over 768/1004=0,76494... for å få full skjerm her. Velger 0,8.
// Når iPad er i Safari er det enda verre: 768x954. 768/954=0,80503... Det får så være.

let pixelRatio = window.devicePixelRatio;
if (pixelRatio !== 1 && pixelRatio !== 2 && pixelRatio !== 3) {
  pixelRatio = 1;
}
pixelRatio = 1;

declare global {
  var pixelRatio: number;
}
globalThis.pixelRatio = pixelRatio;

// Height should always be 640px. This is from the tilemap.
const height = 640;
// Width is not that important, but shouldn't be to wide.
let width = 400;

// TODO: Should fit if iPad...

let scaleModePhaser = Phaser.Scale.ScaleModes.NONE;
let centerModePhaser = Phaser.Scale.Center.NO_CENTER;
if (window.innerHeight < height) {
  scaleModePhaser = Phaser.Scale.ScaleModes.FIT;
  const scaleRatio = window.innerHeight / height;
  console.log('scaleRatio', scaleRatio);
  // Compensate scale ratio to be able to fill width of screen when FIT is used.
  width = Math.min(window.innerWidth / scaleRatio, 400);
} else {
  width = Math.min(window.innerWidth, 400);
}

if (width < window.innerWidth) {
  centerModePhaser = Phaser.Scale.Center.CENTER_BOTH;
}

console.table({ width, height, scaleModePhaser, centerModePhaser });

const gameConfig = createGameConfig(width, height, scaleModePhaser, centerModePhaser, pixelRatio, isDebug);
new Phaser.Game(gameConfig);

window.onload = () => {
  console.log("onload: Let's wait a little more...");
  const loader = document.querySelector<HTMLDivElement>('#loader')!;
  const preload = document.querySelector<HTMLDivElement>('#preload')!;
  const game = document.querySelector<HTMLDivElement>('#game')!;

  loader.style.display = 'none';
  preload.style.display = 'none';
  game.style.display = 'block';

  // preload.style.display = 'block';
  // game.style.opacity = '0';
  // game.style.display = 'block';

  // setTimeout(() => {
  //   loader.style.display = 'none';
  //   preload.style.display = 'none';
  //   game.style.opacity = '1';
  // }, 500);//
};

registerSW();
