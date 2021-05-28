import * as PIXI from "pixi.js";
import fit from "math-fit";
import gsap from "gsap";

import w1 from "../static/images/w1.png";
import w2 from "../static/images/w2.jpg";
import w3 from "../static/images/w3.png";
import w4 from "../static/images/w4.png";

import disp from "../static/images/disp.jpg";

//Load Images into Pixi

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
  backgroundColor: 0xffffff,
  // resizeTo: canvas,
  width: 1500,
  height: 300,
});

canvas.appendChild(app.view);

const images = [w1, w2, w3, w4];

//container general
const container = new PIXI.Container();
app.stage.addChild(container);

//calculating img size
const margin = 30;
let width = (canvas.offsetWidth - 2 * margin) / 3;
let height = canvas.offsetHeight;

//resize
// const resize = () => {
//   const parent = app.view.parentNode;
//   console.log(canvas.offsetWidth);

//   width = (canvas.offsetWidth - 2 * margin) / 3;
//   height = canvas.offsetHeight;

//   console.log(width);
// };

// window.addEventListener("resize", resize);

//slider variables
const thumbs = [];
const wholewidth = images.length * (width + margin);

//mousefunctions animatiions

const mouseOn = (e) => {
  const el = e.target.children[0].children[0];

  gsap.to(el.scale, {
    duration: 0.5,
    x: 1.2,
    y: 1.2,
  });
};

const mouseOut = (e) => {
  const el = e.currentTarget.children[0].children[0];

  gsap.to(el.scale, {
    duration: 0.5,
    x: 1,
    y: 1,
  });
};

//Use load image function

loadImages(images, (images) => {
  images.forEach((img, i) => {
    //textures
    let texture = PIXI.Texture.from(img);
    const sprite = new PIXI.Sprite(texture);

    //masking images
    let mask = new PIXI.Sprite(PIXI.Texture.WHITE);

    mask.width = width;
    mask.height = height;
    sprite.mask = mask;

    sprite.anchor.set(0.5);
    sprite.position.set(
      sprite.texture.orig.width / 2,
      sprite.texture.orig.height / 2
    );

    //fit-library calculating my image sizes
    let parent = {
      w: width,
      h: height,
    };

    let image = {
      w: sprite.texture.orig.width,
      h: sprite.texture.orig.height,
    };

    let cover = fit(image, parent);

    //container for sprites
    let containerSprite = new PIXI.Container();
    containerSprite.position.set(cover.left, cover.top);
    containerSprite.scale.set(cover.scale, cover.scale);

    //container for images
    let containerImg = new PIXI.Container();
    containerImg.x = (margin + width) * i;
    containerImg.y = height / 10;

    containerImg.interactive = true;
    containerImg.on("mouseover", mouseOn);
    containerImg.on("mouseout", mouseOut);

    //adding children to contianers
    containerSprite.addChild(sprite);
    containerImg.addChild(containerSprite);
    containerImg.addChild(mask);
    thumbs.push(containerImg);
    container.addChild(containerImg);

    //loop function
    const calcPos = (scr, pos) => {
      const temp =
        ((scr + pos + wholewidth + width + margin) % wholewidth) -
        width -
        margin;

      return temp;
    };

    //displacementShader
    const displacementSprite = PIXI.Sprite.from(disp);
    app.stage.addChild(displacementSprite);

    let imageDisp = {
      w: 800,
      h: 324,
    };

    let parentDisp = {
      w: canvas.offsetWidth,
      h: canvas.offsetHeight,
    };

    let coverDisp = fit(imageDisp, parentDisp);

    displacementSprite.position.set(coverDisp.left, coverDisp.top);
    displacementSprite.scale.set(coverDisp.scale, coverDisp.scale);

    const displacementFilter = new PIXI.filters.DisplacementFilter(
      displacementSprite
    );
    displacementFilter.scale.x = 75;

    displacementFilter.autoFit = false;

    container.filters = [displacementFilter];

    //rendering
    app.ticker.add(() => {
      app.renderer.render(container);

      //sliding animation
      let slidingTime = 0;
      slidingTime -= 0.25;
      thumbs.forEach((th) => {
        th.position.x = calcPos(slidingTime, th.position.x);
      });
    });
  });
});
