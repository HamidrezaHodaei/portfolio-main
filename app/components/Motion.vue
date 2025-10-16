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
    <section class="relative w-full h-[80vh] bg-white z-10">
      <h1 class="text-[72px] tracking-normal uppercase font-normal pt-20 px-8">
        VIEW PROJECTS. SEE THE PROCESS. HIRE THE ARCHITECT.
      </h1>
    </section>

    <!-- Canyon Slider Section - بعد از Motion -->
    <section class="relative w-full h-screen z-20">
      <div class="slider-main">
        <div class="slider-container">
          <div 
            ref="slider" 
            class="canyon-slider"
            @wheel="handleWheel"
            @touchstart="handleTouchStart"
            @touchend="handleTouchEnd"
          >
            <div 
              v-for="(slide, index) in slides" 
              :key="index" 
              class="canyon-slide"
              :class="{ active: currentIndex === index }"
            >
              <div class="canyon-content">
                <div class="canyon-component">
                  <h3 class="canyon-intro">Explore</h3>
                  <h2 class="canyon-title">{{ slide.title }}</h2>
                  <p class="canyon-context">{{ slide.context }}</p>
                  <a href="#" class="canyon-btn" role="button">View Project</a>
                </div>
              </div>
              <div class="canyon-background">
                <img :src="slide.image" alt="" class="canyon-background-img" />
              </div>
            </div>
          </div>

          <div class="canyon-indicator">
            <div class="canyon-line">
              <span 
                class="canyon-bar" 
                :style="{ transform: `translate(0, ${currentIndex * 100}%)` }"
              >
                <span class="canyon-number" :style="{ opacity: numberOpacity }">
                  {{ String(currentIndex + 1).padStart(2, '0') }}
                </span>
              </span>
            </div>
          </div>

          <div class="canyon-control">
            <button 
              class="canyon-control-button prev" 
              :class="{ disabled: currentIndex === 0 }"
              :disabled="currentIndex === 0"
              @click="changeSlide(-1)"
              @mouseenter="buttonEffect"
              @mouseleave="buttonEffect"
            >
              <span class="canyon-hover"></span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20.75" height="11.692" viewBox="0 0 20.75 11.692">
                <path d="M175.9,229.889H165.288V235.3l-9.9-5.407,9.9-5.407v2.408" transform="translate(-155.149 -224.043)" fill="none" stroke="#fff" stroke-linejoin="bevel" stroke-width="1" fill-rule="evenodd" />
              </svg>
            </button>
            <button 
              class="canyon-control-button next" 
              :class="{ disabled: currentIndex === slides.length - 1 }"
              :disabled="currentIndex === slides.length - 1"
              @click="changeSlide(1)"
              @mouseenter="buttonEffect"
              @mouseleave="buttonEffect"
            >
              <span class="canyon-hover"></span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20.75" height="11.692" viewBox="0 0 20.75 11.692">
                <path d="M175.9,229.889H165.288V235.3l-9.9-5.407,9.9-5.407v2.408" transform="translate(175.899 235.735) rotate(180)" fill="none" stroke="#fff" stroke-linejoin="bevel" stroke-width="1" fill-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
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

// Slider data
const slides = [
  {
    title: 'Digital Innovation',
    context: 'Crafting exceptional digital experiences through cutting-edge design and technology. Where creativity meets functionality in perfect harmony.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1920&q=80'
  },
  {
    title: 'Creative Vision',
    context: 'Transforming bold ideas into stunning realities. We blend artistic vision with strategic thinking to create memorable brand experiences.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1920&q=80'
  },
  {
    title: 'Future Forward',
    context: 'Pioneering tomorrow\'s digital landscape today. Innovation-driven solutions that push boundaries and redefine industry standards.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&q=80'
  },
  {
    title: 'Design Excellence',
    context: 'Award-winning design that captivates and converts. Every pixel crafted with precision, every interaction designed with purpose.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1920&q=80'
  },
  {
    title: 'User Experience',
    context: 'Interface design that evokes emotions and engages users. Every detail crafted to create an unparalleled experience.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1920&q=80'
  }
]

const pinned = ref(null)
const headerInfo = ref(null)
const whitespace = ref(null)
const revealer = ref(null)
const revealer1 = ref(null)
const revealer2 = ref(null)
const stillsRow = ref(null)
const scrollText = ref(null)

// Slider refs
const slider = ref(null)
const currentIndex = ref(0)
const numberOpacity = ref(0)
const touchStart = ref(0)
const timeout = ref(null)
const indicatorTimeout = ref(null)

let lenis = null
let scrollTriggers = []

// Slider functions
const changeSlide = (direction) => {
  const newIndex = Math.max(0, Math.min(slides.length - 1, currentIndex.value + direction))
  currentIndex.value = newIndex
  scroll()
}

const scroll = () => {
  if (timeout.value) {
    clearTimeout(timeout.value)
  }
  
  timeout.value = setTimeout(() => {
    const scrollAmount = slider.value.clientHeight * currentIndex.value
    slider.value.scrollTo({ top: scrollAmount, behavior: 'smooth' })
    showIndicator()
  }, 100)
}

const handleWheel = (e) => {
  e.stopPropagation()
  if ((currentIndex.value <= 0 && e.deltaY < 0) || (currentIndex.value >= slides.length - 1 && e.deltaY > 0)) {
    return
  }
  
  if (e.deltaY > 0) {
    changeSlide(1)
  } else if (e.deltaY < 0) {
    changeSlide(-1)
  }
}

const handleTouchStart = (e) => {
  touchStart.value = e.touches[0].clientY
}

const handleTouchEnd = (e) => {
  const touchEnd = e.changedTouches[0].clientY
  const touchStartVal = touchStart.value
  
  if ((currentIndex.value <= 0 && touchEnd > touchStartVal) || 
      (currentIndex.value >= slides.length - 1 && touchEnd < touchStartVal)) {
    return
  }
  
  const remainder = Math.abs(touchStartVal - touchEnd)
  if (remainder > 100) {
    if (touchEnd > touchStartVal) {
      changeSlide(-1)
    } else if (touchEnd < touchStartVal) {
      changeSlide(1)
    }
  }
}

const showIndicator = () => {
  numberOpacity.value = 0.75
  
  if (indicatorTimeout.value) {
    clearTimeout(indicatorTimeout.value)
  }
  
  indicatorTimeout.value = setTimeout(() => {
    numberOpacity.value = 0
  }, 3000)
}

const buttonEffect = (e) => {
  const hover = e.currentTarget.querySelector('.canyon-hover')
  if (!hover) return
  
  const x = (e.offsetX / e.currentTarget.clientHeight) * 100
  const y = (e.offsetY / e.currentTarget.clientHeight) * 100
  const clampedX = Math.max(0, Math.min(100, x))
  const clampedY = Math.max(0, Math.min(100, y))
  
  hover.style.transformOrigin = `${clampedX}% ${clampedY}%`
}

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

  // Initialize slider indicator
  showIndicator()
})

onBeforeUnmount(() => {
  scrollTriggers.forEach(trigger => trigger.kill())
  scrollTriggers = []
  
  if (lenis) {
    lenis.destroy()
    lenis = null
  }
  
  if (timeout.value) {
    clearTimeout(timeout.value)
  }
  if (indicatorTimeout.value) {
    clearTimeout(indicatorTimeout.value)
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

/* Canyon Slider Styles */
.slider-main {
  font-family: "Lato", sans-serif;
  font-size: 95%;
  color: #fff;
  background: #000;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.slider-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.canyon-component {
  color: #fff;
  font-size: inherit;
  width: 100%;
}

.canyon-intro {
  font-size: 1.75rem;
  font-weight: 300;
  margin-bottom: 12px;
}

.canyon-title {
  font-size: 5rem;
  font-weight: 800;
  text-transform: uppercase;
  line-height: 1.1;
  margin-bottom: 24px;
}

.canyon-context {
  margin-bottom: 40px;
  max-width: 600px;
  font-size: 1.1rem;
  line-height: 28px;
  letter-spacing: 0.75px;
}

.canyon-btn {
  display: inline-block;
  padding: 1.2em 2.5em;
  background-color: #fff;
  color: #000;
  text-transform: uppercase;
  font-weight: 800;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  text-decoration: none;
}

.canyon-btn:hover {
  background-color: #f0f0f0;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(255, 255, 255, 0.2);
}

.canyon-slider {
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  scroll-behavior: smooth;
  overscroll-behavior: contain;
}

.canyon-slider::-webkit-scrollbar {
  display: none;
}

.canyon-slider {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.canyon-slide {
  flex: 1 0 100%;
  position: relative;
  min-height: 100vh;
}

.canyon-slide::before {
  content: '';
  position: absolute;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%);
  width: 100%;
  height: 100%;
  z-index: 1;
}

.canyon-background {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  top: 0;
  left: 0;
}

.canyon-background-img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  top: 0;
  left: 0;
  filter: grayscale(100%) brightness(0.6) contrast(1.3);
}

.canyon-content {
  position: absolute;
  display: block;
  padding: 0;
  height: 100%;
  width: 100%;
  z-index: 2;
}

.canyon-content .canyon-component {
  position: absolute;
  width: 55%;
  max-width: 800px;
  top: 50%;
  left: 50%;
  transform: translate(-200%, -50%);
  opacity: 0;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease;
}

.canyon-slide.active .canyon-content .canyon-component {
  transform: translate(-50%, -50%);
  opacity: 1;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 1.2s ease;
}

.canyon-control {
  position: absolute;
  bottom: 3em;
  left: 3em;
  z-index: 10;
}

.canyon-control-button {
  position: relative;
  display: inline-block;
  padding: 0.25em;
  background: none;
  width: 40px;
  height: 40px;
  border: none;
  outline: none;
  opacity: 0.3;
  transition: opacity 0.3s ease;
  cursor: pointer;
}

.canyon-control-button.next {
  margin-left: 1em;
}

.canyon-control-button svg {
  position: relative;
  overflow: visible;
  width: 100%;
}

.canyon-control-button svg path {
  stroke: rgba(255, 255, 255, 0.9);
  stroke-width: 1.5px;
  transition: stroke 0.3s ease;
}

.canyon-control-button.disabled {
  opacity: 0.15;
  cursor: not-allowed;
}

.canyon-control-button.disabled .canyon-hover {
  display: none;
}

.canyon-control-button:not(.disabled) {
  cursor: pointer;
  opacity: 0.8;
}

.canyon-control-button:not(.disabled) .canyon-hover {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  width: 3.5em;
  height: 3.5em;
  background: rgba(255, 255, 255, 0.9);
  transform-origin: center center;
  transform: translate(-50%, -50%) scale(0, 0);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.canyon-control-button:not(.disabled):hover {
  opacity: 1;
}

.canyon-control-button:not(.disabled):hover path {
  stroke: rgba(0, 0, 0, 0.8);
}

.canyon-control-button:not(.disabled):hover .canyon-hover {
  transform: translate(-50%, -50%) scale(1, 1);
}

.canyon-indicator {
  position: absolute;
  display: block;
  right: 4em;
  top: 50%;
  height: 35%;
  transform: translateY(-50%);
  z-index: 10;
}

.canyon-line {
  position: relative;
  width: 2px;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
}

.canyon-bar {
  position: absolute;
  background: #fff;
  top: 0;
  width: 100%;
  height: 20%;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.canyon-number {
  position: absolute;
  color: #fff;
  top: 50%;
  transform: translateY(-50%);
  right: 1.5em;
  font-size: 1.25rem;
  font-weight: 600;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

/* Responsive */
@media (max-width: 1024px) {
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
  
  .canyon-title {
    font-size: 3.5rem;
  }
  
  .canyon-content .canyon-component {
    width: 70%;
  }
  
  .canyon-indicator {
    right: 2em;
  }
  
  .canyon-control {
    bottom: 2em;
    left: 2em;
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

@media (max-width: 768px) {
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
  
  .canyon-intro {
    font-size: 1.25rem;
  }
  
  .canyon-title {
    font-size: 2.5rem;
  }
  
  .canyon-context {
    font-size: 1rem;
  }
  
  .canyon-content .canyon-component {
    width: 85%;
  }
  
  .canyon-indicator {
    display: none;
  }
  
  .canyon-control {
    bottom: 1.5em;
    right: 50%;
    transform: translateX(50%);
    left: auto;
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