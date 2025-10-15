<template>
  <div class="main">
    <div class="container">
      <div 
        ref="normalSlider" 
        class="slider normal"
        @wheel="handleWheel($event, 'normal')"
        @touchstart="handleTouchStart($event, 'normal')"
        @touchend="handleTouchEnd($event, 'normal')"
      >
        <div 
          v-for="(slide, index) in slides" 
          :key="index" 
          class="slide"
          :class="{ active: normalIndex === index }"
        >
          <div class="content">
            <div class="custom-component component normal">
              <h3 class="intro">Explore</h3>
              <h2 class="title">{{ slide.title }}</h2>
              <p class="context">{{ slide.context }}</p>
              <a href="#" class="btn" role="button">View Project</a>
            </div>
          </div>
          <div class="background">
            <img :src="slide.image" alt="" class="background-img" />
          </div>
        </div>
      </div>

      <div class="indicator normal">
        <div class="line">
          <span 
            class="bar" 
            :style="{ transform: `translate(0, ${normalIndex * 100}%)` }"
            @mouseenter="showIndicator('normal')"
            @mouseleave="showIndicator('normal')"
          >
            <span class="number" :style="{ opacity: normalNumberOpacity }">
              {{ String(normalIndex + 1).padStart(2, '0') }}
            </span>
          </span>
        </div>
      </div>

      <div class="control normal">
        <button 
          class="control-button prev" 
          :class="{ disabled: normalIndex === 0 }"
          :disabled="normalIndex === 0"
          @click="changeSlide('normal', -1)"
          @mouseenter="buttonEffect"
          @mouseleave="buttonEffect"
        >
          <span class="hover"></span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20.75" height="11.692" viewBox="0 0 20.75 11.692">
            <path id="path_arrow_prev" d="M175.9,229.889H165.288V235.3l-9.9-5.407,9.9-5.407v2.408" transform="translate(-155.149 -224.043)" fill="none" stroke="#fff" stroke-linejoin="bevel" stroke-width="1" fill-rule="evenodd" />
          </svg>
        </button>
        <button 
          class="control-button next" 
          :class="{ disabled: normalIndex === slides.length - 1 }"
          :disabled="normalIndex === slides.length - 1"
          @click="changeSlide('normal', 1)"
          @mouseenter="buttonEffect"
          @mouseleave="buttonEffect"
        >
          <span class="hover"></span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20.75" height="11.692" viewBox="0 0 20.75 11.692">
            <path id="path_arrow_next" d="M175.9,229.889H165.288V235.3l-9.9-5.407,9.9-5.407v2.408" transform="translate(175.899 235.735) rotate(180)" fill="none" stroke="#fff" stroke-linejoin="bevel" stroke-width="1" fill-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>

    <div class="container mini">
      <div 
        ref="miniSlider" 
        class="slider horizontal"
        @wheel="handleWheel($event, 'mini')"
        @touchstart="handleTouchStart($event, 'mini')"
        @touchend="handleTouchEnd($event, 'mini')"
      >
        <div 
          v-for="(slide, index) in slides" 
          :key="index" 
          class="slide"
          :class="{ active: miniIndex === index }"
        >
          <div class="content">
            <div class="custom-component component">
              <h3 class="intro">Explore</h3>
              <h2 class="title">{{ slide.title }}</h2>
              <p class="context">{{ slide.context }}</p>
              <a href="#" class="btn" role="button">View Project</a>
            </div>
          </div>
          <div class="background">
            <img :src="slide.image" alt="" class="background-img" />
          </div>
        </div>
      </div>

      <div class="indicator horizontal">
        <div class="line">
          <span 
            class="bar" 
            :style="{ transform: `translate(${miniIndex * 100}%, 0)` }"
          ></span>
        </div>
      </div>

      <div class="control">
        <button 
          class="control-button prev" 
          :class="{ disabled: miniIndex === 0 }"
          :disabled="miniIndex === 0"
          @click="changeSlide('mini', -1)"
          @mouseenter="buttonEffect"
          @mouseleave="buttonEffect"
        >
          <span class="hover"></span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20.75" height="11.692" viewBox="0 0 20.75 11.692">
            <path id="path_arrow_prev" d="M175.9,229.889H165.288V235.3l-9.9-5.407,9.9-5.407v2.408" transform="translate(-155.149 -224.043)" fill="none" stroke="#fff" stroke-linejoin="bevel" stroke-width="1" fill-rule="evenodd" />
          </svg>
        </button>
        <button 
          class="control-button next" 
          :class="{ disabled: miniIndex === slides.length - 1 }"
          :disabled="miniIndex === slides.length - 1"
          @click="changeSlide('mini', 1)"
          @mouseenter="buttonEffect"
          @mouseleave="buttonEffect"
        >
          <span class="hover"></span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20.75" height="11.692" viewBox="0 0 20.75 11.692">
            <path id="path_arrow_next" d="M175.9,229.889H165.288V235.3l-9.9-5.407,9.9-5.407v2.408" transform="translate(175.899 235.735) rotate(180)" fill="none" stroke="#fff" stroke-linejoin="bevel" stroke-width="1" fill-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const slides = [
  {
    title: 'Digital Innovation',
    context: 'Crafting exceptional digital experiences through cutting-edge design and technology. Where creativity meets functionality in perfect harmony.',
    image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=1600&q=80'
  },
  {
    title: 'Creative Vision',
    context: 'Transforming bold ideas into stunning realities. We blend artistic vision with strategic thinking to create memorable brand experiences.',
    image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1600&q=80'
  },
  {
    title: 'Future Forward',
    context: 'Pioneering tomorrow\'s digital landscape today. Innovation-driven solutions that push boundaries and redefine industry standards.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80'
  },
  {
    title: 'Design Excellence',
    context: 'Award-winning design that captivates and converts. Every pixel crafted with precision, every interaction designed with purpose.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&q=80'
  }
]

const normalSlider = ref(null)
const miniSlider = ref(null)
const normalIndex = ref(0)
const miniIndex = ref(0)
const normalNumberOpacity = ref(0)
const miniNumberOpacity = ref(0)

const touchStart = ref({ normal: 0, mini: 0 })
const timeouts = ref({ normal: null, mini: null })
const indicatorTimeouts = ref({ normal: null, mini: null })

const changeSlide = (type, direction) => {
  const isNormal = type === 'normal'
  const currentIndex = isNormal ? normalIndex : miniIndex
  const newIndex = Math.max(0, Math.min(slides.length - 1, currentIndex.value + direction))
  
  if (isNormal) {
    normalIndex.value = newIndex
  } else {
    miniIndex.value = newIndex
  }
  
  scroll(type)
}

const scroll = (type) => {
  const isNormal = type === 'normal'
  const slider = isNormal ? normalSlider.value : miniSlider.value
  const index = isNormal ? normalIndex.value : miniIndex.value
  const isHorizontal = type === 'mini'
  
  if (timeouts.value[type]) {
    clearTimeout(timeouts.value[type])
  }
  
  timeouts.value[type] = setTimeout(() => {
    const scrollAmount = isHorizontal ? slider.clientWidth * index : slider.clientHeight * index
    
    if (isHorizontal) {
      slider.scrollTo({ left: scrollAmount, behavior: 'smooth' })
    } else {
      slider.scrollTo({ top: scrollAmount, behavior: 'smooth' })
    }
    
    if (isNormal) {
      showIndicator('normal')
    }
  }, 100)
}

const handleWheel = (e, type) => {
  const isNormal = type === 'normal'
  const currentIndex = isNormal ? normalIndex.value : miniIndex.value
  
  if ((currentIndex <= 0 && e.deltaY < 0) || (currentIndex >= slides.length - 1 && e.deltaY > 0)) {
    return
  }
  
  if (e.deltaY > 0) {
    changeSlide(type, 1)
  } else if (e.deltaY < 0) {
    changeSlide(type, -1)
  }
}

const handleTouchStart = (e, type) => {
  const isHorizontal = type === 'mini'
  touchStart.value[type] = isHorizontal ? e.touches[0].clientX : e.touches[0].clientY
}

const handleTouchEnd = (e, type) => {
  const isNormal = type === 'normal'
  const isHorizontal = type === 'mini'
  const currentIndex = isNormal ? normalIndex.value : miniIndex.value
  const touchEnd = isHorizontal ? e.changedTouches[0].clientX : e.changedTouches[0].clientY
  const touchStartVal = touchStart.value[type]
  
  if ((currentIndex <= 0 && touchEnd > touchStartVal) || 
      (currentIndex >= slides.length - 1 && touchEnd < touchStartVal)) {
    return
  }
  
  const remainder = Math.abs(touchStartVal - touchEnd)
  if (remainder > 100) {
    if (touchEnd > touchStartVal) {
      changeSlide(type, -1)
    } else if (touchEnd < touchStartVal) {
      changeSlide(type, 1)
    }
  }
}

const showIndicator = (type) => {
  if (type === 'normal') {
    normalNumberOpacity.value = 0.75
    
    if (indicatorTimeouts.value.normal) {
      clearTimeout(indicatorTimeouts.value.normal)
    }
    
    indicatorTimeouts.value.normal = setTimeout(() => {
      normalNumberOpacity.value = 0
    }, 3000)
  }
}

const buttonEffect = (e) => {
  const hover = e.currentTarget.querySelector('.hover')
  if (!hover) return
  
  const x = (e.offsetX / e.currentTarget.clientHeight) * 100
  const y = (e.offsetY / e.currentTarget.clientHeight) * 100
  const clampedX = Math.max(0, Math.min(100, x))
  const clampedY = Math.max(0, Math.min(100, y))
  
  hover.style.transformOrigin = `${clampedX}% ${clampedY}%`
}

onMounted(() => {
  showIndicator('normal')
})
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.main {
  font-family: "Lato", sans-serif;
  font-size: 95%;
  color: #fff;
  background: #000;
  max-width: 1620px;
  height: 100vh;
  min-height: 600px;
  margin: auto;
  display: flex;
  flex-flow: row;
  gap: 2em;
  justify-content: space-around;
  align-items: center;
}

p {
  line-height: 28px;
  letter-spacing: 0.75px;
}

a {
  color: inherit;
  text-decoration: none;
}

.container {
  position: relative;
  min-height: 600px;
  max-height: 750px;
  height: inherit;
  flex: 1 0 75%;
  margin: auto;
  border-radius: 1.5em;
  overflow: hidden;
  box-shadow: -42px 32px 65px -2px rgba(0, 0, 0, 0.8);
  z-index: 1;
}

.container.mini {
  flex: 1 0 20%;
  z-index: 0;
}

.custom-component {
  color: #fff;
  font-size: inherit;
  width: 100%;
}

.custom-component .intro {
  font-size: 1.5rem;
  font-weight: 300;
  margin-bottom: 8px;
}

.custom-component .title {
  font-size: 3rem;
  font-weight: 800;
  text-transform: uppercase;
  line-height: 1;
  margin-bottom: 16px;
}

.custom-component .context {
  margin-bottom: 32px;
}

.custom-component .btn {
  display: inline-block;
  padding: 1em 2em;
  background-color: #fff;
  color: #000;
  text-transform: uppercase;
  font-weight: 800;
}

.custom-component.normal .intro {
  font-size: 1.75rem;
}

.custom-component.normal .title {
  font-size: 5rem;
}

.slider {
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  scroll-behavior: smooth;
  overscroll-behavior: contain;
}

.slider::-webkit-scrollbar {
  display: none;
}

.slider {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.slider.horizontal {
  flex-flow: row nowrap;
}

.slide {
  flex: 1 0 100%;
  position: relative;
}

.slide::before {
  content: '';
  position: absolute;
  background: linear-gradient(0deg, rgba(0, 0, 0, 1) -10%, transparent 80%);
  width: 100%;
  height: 100%;
  z-index: 0;
}

.background {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
  top: 0;
  left: 0;
}

.background-img {
  position: absolute;
  width: auto;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  filter: grayscale(100%) contrast(1.2);
}

.content {
  position: relative;
  width: auto;
  height: 100%;
  display: flex;
  align-items: flex-end;
  padding: 2em;
  z-index: 1;
}

.content .component {
  position: relative;
  opacity: 0;
  transform: translate(0, 0);
  transition: transform 0.3s linear, opacity 0.5s ease;
}

.slide.active .content .component {
  transition: transform 0.3s linear, opacity 2s ease;
  opacity: 1;
  transform: translate(0, 0%);
}

.slider.normal .slide .background .background-img {
  width: 120%;
  height: auto;
}

.slider.normal .slide .content {
  position: absolute;
  display: block;
  padding: 0;
  height: 100%;
  width: 50%;
}

.slider.normal .slide .content .component {
  width: 65%;
  top: 50%;
  left: 50%;
  transform: translate(-200%, -50%);
  transition: transform 0.5s linear, opacity 2s ease;
}

.slider.normal .slide.active::before {
  opacity: 1;
  transition: transform 0.3s linear, opacity 1s ease;
}

.slider.normal .slide.active .content .component {
  transform: translate(-50%, -50%);
}

.control {
  position: absolute;
  bottom: 0;
  z-index: 1;
  padding: 2em;
  right: 0;
}

.control-button {
  position: relative;
  display: inline-block;
  padding: 0.25em;
  background: none;
  width: 24px;
  height: 24px;
  border: none;
  outline: none;
  opacity: 0.25;
  transition: opacity 0.3s ease;
}

.control-button.next {
  margin-left: 0.5em;
}

.control-button svg {
  position: relative;
  overflow: visible;
  width: 100%;
}

.control-button svg path {
  stroke: rgba(255, 255, 255, 0.75);
  stroke-width: 1.5px;
  transition: stroke 0.3s ease;
}

.control-button.disabled .hover {
  display: none;
}

.control-button:not(.disabled) {
  cursor: pointer;
  opacity: 0.75;
}

.control-button:not(.disabled) .hover {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  background: rgba(255, 255, 255, 0.75);
  transform-origin: center center;
  transform: translate(-50%, -50%) scale(0, 0);
  transition: transform 0.3s ease;
}

.control-button:not(.disabled):hover path {
  stroke: rgba(0, 0, 0, 0.75);
}

.control-button:not(.disabled):hover .hover {
  transform: translate(-50%, -50%) scale(1, 1);
}

.control.normal {
  padding: 0 3em 3em 0;
}

.control.normal .control-button {
  width: 32px;
  height: 32px;
}

.control.normal .control-button.next {
  margin-left: 0.75em;
}

.control.normal .control-button:not(.disabled) .hover {
  width: 3em;
  height: 3em;
}

.indicator {
  position: absolute;
  display: none;
  right: 3em;
  top: 50%;
  height: 40%;
  transform: translateY(-50%);
}

.indicator .line {
  position: relative;
  width: 2px;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
}

.indicator .line .bar {
  position: absolute;
  background: #fff;
  top: 0;
  width: 100%;
  transition: transform 0.5s ease;
}

.indicator .line .bar .number {
  position: absolute;
  color: #fff;
  top: 50%;
  transform: translateY(-50%);
  right: 1em;
  font-size: 1.15rem;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.indicator.horizontal {
  top: unset;
  right: unset;
  left: 0;
  bottom: 0;
  height: auto;
  width: 100%;
  transform: unset;
}

.indicator.horizontal .line {
  width: 100%;
  height: 2px;
}

.indicator.horizontal .line .bar {
  left: 0;
  top: unset;
  transform: translate(0, 0);
  height: 100%;
}

.indicator.horizontal .line .bar .number {
  display: none;
}

.indicator.normal {
  display: block;
}
</style>