import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Elements
const videoWrapper = document.querySelector(".video-wrapper");
const videoPinned = document.querySelector(".video-pinned");
const video = document.querySelector(".video");

gsap.registerPlugin(ScrollTrigger);

// Video animation
let accelAmount = 0.25;
let scrollPosition = 0;
let delay = 0;
let myInterval = null;

const startSetInterval = function () {
  myInterval = setInterval(() => {
    delay += (scrollPosition - delay) * accelAmount;
    console.log(scrollPosition, delay);

    video.currentTime = delay;
  }, 33);
};

// Gsap animation
ScrollTrigger.create({
  trigger: ".video-wrapper",
  start: "start start",
  end: "bottom bottom",
  pin: videoPinned,
  scrub: true,
  onUpdate: (progress) => {
    scrollPosition = progress.progress * video.duration;
    // video.currentTime = scrollPosition;
  },
  onEnter: startSetInterval,
  onLeave: () => clearInterval(myInterval),
  onEnterBack: startSetInterval,
  onLeaveBack: () => clearInterval(myInterval),
  markers: true,
});
