import * as PIXI from "pixi.js";

import w1 from "../static/images/w1.png";
import w2 from "../static/images/w2.jpg";
import w3 from "../static/images/w3.png";
import w4 from "../static/images/w4.png";

function loadImages(paths, whenLoaded) {
  var imgs = [];
  paths.forEach(function (path) {
    var img = new Image();
    img.onload = function () {
      imgs.push(img);
      if (imgs.length == paths.length) whenLoaded(imgs);
    };
    img.src = path;
  });
}

const canvas = document.querySelector(".work__modal__slider");

const app = new PIXI.Application({
  backgroundColor: 0x1099bb,
  view: canvas,
  autoResize: true,
  resizeTo: canvas,
});

const container = new PIXI.Container();
app.stage.addChild(container);

const images = [w1, w2, w3, w4];

loadImages(images, (images) => {
  const loadedImages = images;
  console.log(images);
});

const texture = PIXI.Texture.from(w1);
const sprite = new PIXI.Sprite(texture);
let containerImg = new PIXI.Container();

sprite.width = 100;
sprite.height = 100;

containerImg.x = 10;
containerImg.y = 10;

containerImg.addChild(sprite);
container.addChild(containerImg);

// app.ticker.add(() => {
//   app.renderer.render(container, rt);
// });
