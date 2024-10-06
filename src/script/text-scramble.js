// document.addEventListener("DOMContentLoaded", function () {
//     gsap.registerPlugin(ScrambleTextPlugin);
//
//     const elements = document.getElementsByClassName('scramble');
//
//     for (const el of elements) {
//         const timeline = gsap.timeline({defaults: {duration: 2, ease: "none"}});
//
//         el.addEventListener('mouseenter', () => {
//             timeline.to(
//                 ".x",
//                 {
//                     scrambleText: {
//                         text: "Even apply a custom class to the text.",
//                         chars: "lowerCase",
//                         speed: 0.3,
//                         newClass: "orange",
//                         revealDelay: 0.5,
//                         tweenLength: false
//                     }
//                 }
//             )
//
//             // GSDevTools.create({animation: timeline, minimal: true});
//         });
//     }
// });
