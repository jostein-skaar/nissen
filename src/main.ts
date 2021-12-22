import './style.css';

import Phaser from 'phaser';
import { createGameConfig } from './game/config';

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
// pixelRatio = 1;

declare global {
  var pixelRatio: number;
}
globalThis.pixelRatio = pixelRatio;

const gameConfig = createGameConfig(400, 640, Phaser.Scale.ScaleModes.NONE, pixelRatio, isDebug);
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
  // }, 500);
};
