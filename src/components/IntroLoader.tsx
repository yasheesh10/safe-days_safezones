import { useEffect } from "react";
import anime from "animejs";
import { Shield } from "lucide-react";

import elephanta from "../assets/elephantacaves.jpg";
import gangaAarti from "../assets/ganga-aarti.jpg";
import gateway from "../assets/Gateway-of-India.jpg";
import goldenTemple from "../assets/golden-temple.jpg";
import shivaji from "../assets/Shivajimaharaj.jpg";
import taj from "../assets/Tajmahal.jpg";
import ellora from "../assets/ellora-caves.jpg";


const images = [
  gangaAarti,
  goldenTemple,
  shivaji,
  ellora,
];

images.forEach((img) => {
  const image = new Image();
  image.src = img;
});

export default function IntroLoader({
  onFinish,
}: {
  onFinish: () => void;
}) {
  useEffect(() => {
    const timeline = anime.timeline({
      easing: "easeInOutQuad",
      complete: () => {
        setTimeout(() => {
          onFinish();
        }, 800);
      },
    });

    timeline
.add({
  targets: ".intro-image",
  opacity: [0, 1],
  scale: [1.2, 1],
  translateX: [40, 0],
  duration: 900,
  delay: anime.stagger(350),
})
.add({
  targets: ".intro-image",
  opacity: [1, 0],
  scale: [1, 1.08],
  duration: 500,
  delay: anime.stagger(350),
})
      .add({
        targets: ".lock-icon",
        scale: [0.5, 1.2, 1],
        opacity: [0, 1],
        duration: 1200,
      })
      .add({
        targets: ".lock-ring",
        scale: [1, 2],
        opacity: [0.6, 0],
        duration: 1500,
      });
  }, []);

  return (
    <div className="fixed inset-0 bg-[#020617] flex items-center justify-center overflow-hidden z-[9999]">

      {/* Monument Images */}
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          className="intro-image absolute inset-0 w-full h-full object-cover opacity-0 brightness-75"
        />
      ))}

      {/* Dark cinematic overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Lock Animation */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-screen px-4 text-center">

        <div className="lock-icon opacity-0 text-cyan-300">
          <Shield size={100} strokeWidth={1.5} />
        </div>
<h1
  className="
  mt-6
  text-3xl sm:text-4xl md:text-5xl
  font-bold
  uppercase
  text-center
  leading-tight
  px-4
  break-words
  "
>
  <span className="text-white tracking-[0.18em] sm:tracking-[0.3em]">
    Tourist
  </span>

  <br />

  <span className="
  bg-gradient-to-r
  from-cyan-400
  via-blue-400
  to-purple-500
  bg-clip-text
  text-transparent
  tracking-[0.18em] sm:tracking-[0.3em]
  ">
    Safety
  </span>

  <span className="text-white tracking-[0.18em] sm:tracking-[0.3em]">
    {" "}System
  </span>
</h1>

<p className="
mt-3
text-white/60
tracking-[0.15em]
sm:tracking-[0.25em]
text-xs sm:text-sm
uppercase
text-center
px-4
leading-relaxed">
  Secure • Protect • Travel Safe
</p>


      </div>
    </div>
  );
}