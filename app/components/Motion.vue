<!-- pages/Motion.vue -->
<template>
  <div class="w-full h-auto font-sans">
    <!-- Info Section -->
    <section class="w-screen h-[150vh] bg-black text-white">
      <div class="header-rows">
        <div class="w-full h-[250px] px-8 flex justify-start items-center">
          <h1 class="uppercase text-[120px] md:text-[200px] font-normal tracking-[-4px]">Motion</h1>
        </div>
        <div ref="stillsRow" class="w-full h-[250px] px-8 flex justify-end items-center">
          <h1 class="uppercase text-[120px] md:text-[200px] font-normal tracking-[-4px]">Stills</h1>
        </div>
      </div>
    </section>

    <!-- Header Info Section -->
    <section 
      ref="headerInfo"
      class="relative w-full h-screen flex flex-col justify-between bg-black text-white"
    >
      <p ref="scrollText" class="scroll-text-container p-4 font-serif text-[36px] md:text-[52px] font-light">
        <span class="scroll-line">Bridging the gap between design and functionality.</span>
        <span class="scroll-line">I build platforms where every scroll, click,</span>
        <span class="scroll-line">and interaction is a precisely engineered</span>
        <span class="scroll-line">visual event, from initial concept to deployment.</span>
      </p>

      <!-- Tech Logos Slider -->
      <div class="w-full h-[250px] p-4 overflow-hidden relative">
        <div class="slide-track">
          <div 
            v-for="(logo, index) in [...techLogos, ...techLogos]" 
            :key="`logo-${index}`"
            class="slide"
          >
            <img :src="logo.src" :alt="logo.alt" />
          </div>
        </div>
      </div>
    </section>

    <!-- Whitespace Section -->
    <section ref="whitespace" class="relative w-full h-[300vh] bg-black -z-10"></section>

    <!-- Pinned Section -->
    <section ref="pinned" class="absolute top-[250px] w-full h-[250vh] z-[2]">
      <div ref="revealer" class="absolute left-[35%] -translate-x-1/2 mt-[325px] w-[120px] h-[120px]">
        <div 
          ref="revealer1"
          class="absolute top-0 left-0 w-full h-full bg-white"
          style="clip-path: polygon(45% 0%, 55% 0%, 55% 100%, 45% 100%)"
        ></div>
        <div 
          ref="revealer2"
          class="absolute top-0 left-0 w-full h-full bg-white rotate-90"
          style="clip-path: polygon(45% 0%, 55% 0%, 55% 100%, 45% 100%)"
        ></div>
      </div>
    </section>

    <!-- Website Content Section -->
    <section class="relative w-full h-[150vh] bg-white z-10">
      <h1 class="text-[72px] tracking-normal uppercase font-normal pt-20 px-8">
        VIEW PROJECTS. SEE THE PROCESS. HIRE THE ARCHITECT.
      </h1>
    </section>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

// Props for images
const props = defineProps({
  techLogos: {
    type: Array,
    default: () => [
      { src: '/javascript-logo_svgstack_com_28641760561703.svg', alt: 'JavaScript' },
      { src: '/Go-Logo_w.svg', alt: 'Golang' },
      { src: '/tailwindcss-logo_svgstack_com_31451760560460.svg', alt: 'Tailwind CSS' },
      { src: '/typescript-logo_svgstack_com_31481760561615.svg', alt: 'TypeScript' },
       { src: '/gsap-logo_svgstack_com_28451760560231.svg', alt: 'GSAP' },
      { src: '/nuxtjs-logo_svgstack_com_28941760561699.svg', alt: 'Nuxt.js' },
      { src: '/python-logo_svgstack_com_29121760561744.svg', alt: 'Python' },
      { src: '/vue-js-logo_svgstack_com_31551760561693.svg', alt: 'vue' },
    ]
  }
})

const pinned = ref(null)
const headerInfo = ref(null)
const whitespace = ref(null)
const revealer = ref(null)
const revealer1 = ref(null)
const revealer2 = ref(null)
const stillsRow = ref(null)
const scrollText = ref(null)

let lenis = null
let scrollTriggers = []

onMounted(() => {
  // Initialize Lenis
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
  })

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)

  // Register ScrollTrigger
  gsap.registerPlugin(ScrollTrigger)

  // افکت اسکرول برای هر خط متن
  const lines = gsap.utils.toArray('.scroll-line')
  lines.forEach(line => {
    scrollTriggers.push(
      ScrollTrigger.create({
        trigger: line,
        start: 'top 80%',
        end: 'top 20%',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress * 100
          gsap.to(line, {
            backgroundSize: `${progress}%`,
            ease: 'none',
            duration: 0,
          })
        },
      })
    )
  })

  // Pin the pinned section
  scrollTriggers.push(
    ScrollTrigger.create({
      trigger: pinned.value,
      start: 'top top',
      endTrigger: whitespace.value,
      end: 'bottom top',
      pin: true,
      pinSpacing: false,
    })
  )

  // Pin the header info section
  scrollTriggers.push(
    ScrollTrigger.create({
      trigger: headerInfo.value,
      start: 'top top',
      endTrigger: whitespace.value,
      end: 'bottom top',
      pin: true,
      pinSpacing: false,
    })
  )

  // Hide revealer before start
  gsap.set(revealer.value, { opacity: 0 })

  // Rotate revealer, start at Stills row
  scrollTriggers.push(
    ScrollTrigger.create({
      trigger: stillsRow.value,
      start: 'top center',
      endTrigger: headerInfo.value,
      end: 'bottom bottom',
      onEnter: () => gsap.to(revealer.value, { opacity: 1, duration: 0.2 }),
      onLeaveBack: () => gsap.to(revealer.value, { opacity: 0, duration: 0.2 }),
      onUpdate: (self) => {
        const rotation = self.progress * 360
        gsap.to(revealer.value, { rotation: rotation })
      },
    })
  )

  // Expand revealer clip-path, start at Stills row
  scrollTriggers.push(
    ScrollTrigger.create({
      trigger: stillsRow.value,
      start: 'top center',
      endTrigger: headerInfo.value,
      end: 'bottom bottom',
      onUpdate: (self) => {
        const progress = self.progress
        const clipPath = `polygon(
          ${45 - 45 * progress}% ${0 + 0 * progress}%,
          ${55 + 45 * progress}% ${0 + 0 * progress}%,
          ${55 + 45 * progress}% ${100 - 0 * progress}%,
          ${45 - 45 * progress}% ${100 - 0 * progress}%
        )`

        gsap.to([revealer1.value, revealer2.value], {
          clipPath: clipPath,
          ease: 'none',
          duration: 0,
        })
      },
    })
  )

  // Scale revealer
  scrollTriggers.push(
    ScrollTrigger.create({
      trigger: whitespace.value,
      start: 'top 50%',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        const scale = 1 + 20 * self.progress
        gsap.to(revealer.value, {
          scale: scale,
          ease: 'none',
          duration: 0,
        })
      },
    })
  )
})

onBeforeUnmount(() => {
  scrollTriggers.forEach(trigger => trigger.kill())
  scrollTriggers = []
  
  if (lenis) {
    lenis.destroy()
    lenis = null
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

.font-serif {
  font-family: Georgia, 'Times New Roman', Times, serif;
}

/* افکت اسکرول متن - سطر به سطر */
.scroll-text-container {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.scroll-line {
  display: block;
  color: rgba(255, 255, 255, 0.3);
  background: linear-gradient(to right, #ffffff, #ffffff) no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  background-size: 0%;
  transition: background-size cubic-bezier(0.1, 0.5, 0.5, 1) 0.5s;
}

/* Tech Logos Slider Styles */
.slide-track {
  display: flex;
  width: calc(180px * 16);
  animation: scroll 40s linear infinite;
}

.slide-track:hover {
  animation-play-state: paused;
}

.slide {
  height: 250px;
  width: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide img {
  height: 100px;
  width: auto;
  max-width: 100%;
  object-fit: contain;
  filter: grayscale(100%) brightness(1.5) drop-shadow(0 4px 8px rgba(255, 255, 255, 0.2));
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide:hover img {
  filter: grayscale(0%) brightness(1) drop-shadow(0 8px 16px rgba(255, 255, 255, 0.3));
  transform: scale(1.15) rotate(2deg) translateY(-5px);
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-180px * 8));
  }
}

/* Responsive */
@media (max-width: 768px) {
  .slide-track {
    width: calc(140px * 16);
    animation: scroll 30s linear infinite;
  }
  
  .slide {
    height: 250px;
    width: 140px;
    padding: 10px;
  }
  
  .slide img {
    height: 80px;
  }
  
  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-140px * 8));
    }
  }
}

@media (max-width: 480px) {
  .slide-track {
    width: calc(120px * 16);
    animation: scroll 25s linear infinite;
  }
  
  .slide {
    height: 250px;
    width: 120px;
    padding: 8px;
  }
  
  .slide img {
    height: 70px;
  }
  
  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-120px * 8));
    }
  }
}
</style>

<style>
/* استایل‌های گلوبال Lenis */
html.lenis,
html.lenis body {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}

.lenis.lenis-stopped {
  overflow: hidden;
}

.lenis.lenis-smooth iframe {
  pointer-events: none;
}
</style>