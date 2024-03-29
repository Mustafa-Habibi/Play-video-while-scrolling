import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Elements
const video = document.querySelector(".video");
video.pause();

gsap.registerPlugin(ScrollTrigger);

// Video animation
let accelAmount = 0.5;
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
  scrub: true,
  onUpdate: (progress) => {
    scrollPosition = progress.progress * video.duration;
  },
  onEnter: startSetInterval,
  onLeave: () => clearInterval(myInterval),
  onEnterBack: startSetInterval,
  onLeaveBack: () => clearInterval(myInterval),
  markers: true,
});
