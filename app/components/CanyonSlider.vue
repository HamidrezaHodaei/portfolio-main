<template>
  <div class="main">
    <div class="container">
      <div 
        ref="slider" 
        class="slider"
        @wheel="handleWheel"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
      >
        <div 
          v-for="(slide, index) in slides" 
          :key="index" 
          class="slide"
          :class="{ active: currentIndex === index }"
        >
          <div class="content">
            <div class="custom-component">
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

      <div class="indicator">
        <div class="line">
          <span 
            class="bar" 
            :style="{ transform: `translate(0, ${currentIndex * 100}%)` }"
          >
            <span class="number" :style="{ opacity: numberOpacity }">
              {{ String(currentIndex + 1).padStart(2, '0') }}
            </span>
          </span>
        </div>
      </div>

      <div class="control">
        <button 
          class="control-button prev" 
          :class="{ disabled: currentIndex === 0 }"
          :disabled="currentIndex === 0"
          @click="changeSlide(-1)"
          @mouseenter="buttonEffect"
          @mouseleave="buttonEffect"
        >
          <span class="hover"></span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20.75" height="11.692" viewBox="0 0 20.75 11.692">
            <path d="M175.9,229.889H165.288V235.3l-9.9-5.407,9.9-5.407v2.408" transform="translate(-155.149 -224.043)" fill="none" stroke="#fff" stroke-linejoin="bevel" stroke-width="1" fill-rule="evenodd" />
          </svg>
        </button>
        <button 
          class="control-button next" 
          :class="{ disabled: currentIndex === slides.length - 1 }"
          :disabled="currentIndex === slides.length - 1"
          @click="changeSlide(1)"
          @mouseenter="buttonEffect"
          @mouseleave="buttonEffect"
        >
          <span class="hover"></span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20.75" height="11.692" viewBox="0 0 20.75 11.692">
            <path d="M175.9,229.889H165.288V235.3l-9.9-5.407,9.9-5.407v2.408" transform="translate(175.899 235.735) rotate(180)" fill="none" stroke="#fff" stroke-linejoin="bevel" stroke-width="1" fill-rule="evenodd" />
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

const slider = ref(null)
const currentIndex = ref(0)
const numberOpacity = ref(0)

const touchStart = ref(0)
const timeout = ref(null)
const indicatorTimeout = ref(null)

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
  const hover = e.currentTarget.querySelector('.hover')
  if (!hover) return
  
  const x = (e.offsetX / e.currentTarget.clientHeight) * 100
  const y = (e.offsetY / e.currentTarget.clientHeight) * 100
  const clampedX = Math.max(0, Math.min(100, x))
  const clampedY = Math.max(0, Math.min(100, y))
  
  hover.style.transformOrigin = `${clampedX}% ${clampedY}%`
}

onMounted(() => {
  showIndicator()
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
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
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
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.custom-component {
  color: #fff;
  font-size: inherit;
  width: 100%;
}

.custom-component .intro {
  font-size: 1.75rem;
  font-weight: 300;
  margin-bottom: 12px;
}

.custom-component .title {
  font-size: 5rem;
  font-weight: 800;
  text-transform: uppercase;
  line-height: 1.1;
  margin-bottom: 24px;
}

.custom-component .context {
  margin-bottom: 40px;
  max-width: 600px;
  font-size: 1.1rem;
}

.custom-component .btn {
  display: inline-block;
  padding: 1.2em 2.5em;
  background-color: #fff;
  color: #000;
  text-transform: uppercase;
  font-weight: 800;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.custom-component .btn:hover {
  background-color: #f0f0f0;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(255, 255, 255, 0.2);
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

.slide {
  flex: 1 0 100%;
  position: relative;
  min-height: 100vh;
}

.slide::before {
  content: '';
  position: absolute;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%);
  width: 100%;
  height: 100%;
  z-index: 1;
}

.background {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  top: 0;
  left: 0;
}

.background-img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  top: 0;
  left: 0;
  filter: grayscale(100%) brightness(0.6) contrast(1.3);
}

.content {
  position: absolute;
  display: block;
  padding: 0;
  height: 100%;
  width: 100%;
  z-index: 2;
}

.content .custom-component {
  position: absolute;
  width: 55%;
  max-width: 800px;
  top: 50%;
  left: 50%;
  transform: translate(-200%, -50%);
  opacity: 0;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease;
}

.slide.active .content .custom-component {
  transform: translate(-50%, -50%);
  opacity: 1;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 1.2s ease;
}

.control {
  position: absolute;
  bottom: 3em;
  left: 3em;
  z-index: 10;
}

.control-button {
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
}

.control-button.next {
  margin-left: 1em;
}

.control-button svg {
  position: relative;
  overflow: visible;
  width: 100%;
}

.control-button svg path {
  stroke: rgba(255, 255, 255, 0.9);
  stroke-width: 1.5px;
  transition: stroke 0.3s ease;
}

.control-button.disabled {
  opacity: 0.15;
  cursor: not-allowed;
}

.control-button.disabled .hover {
  display: none;
}

.control-button:not(.disabled) {
  cursor: pointer;
  opacity: 0.8;
}

.control-button:not(.disabled) .hover {
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

.control-button:not(.disabled):hover {
  opacity: 1;
}

.control-button:not(.disabled):hover path {
  stroke: rgba(0, 0, 0, 0.8);
}

.control-button:not(.disabled):hover .hover {
  transform: translate(-50%, -50%) scale(1, 1);
}

.indicator {
  position: absolute;
  display: block;
  right: 4em;
  top: 50%;
  height: 35%;
  transform: translateY(-50%);
  z-index: 10;
}

.indicator .line {
  position: relative;
  width: 2px;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
}

.indicator .line .bar {
  position: absolute;
  background: #fff;
  top: 0;
  width: 100%;
  height: 20%;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.indicator .line .bar .number {
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

@media (max-width: 1024px) {
  .custom-component .title {
    font-size: 3.5rem;
  }
  
  .content .custom-component {
    width: 70%;
  }
  
  .indicator {
    right: 2em;
  }
  
  .control {
    bottom: 2em;
    left: 2em;
  }
}

@media (max-width: 768px) {
  .custom-component .intro {
    font-size: 1.25rem;
  }
  
  .custom-component .title {
    font-size: 2.5rem;
  }
  
  .custom-component .context {
    font-size: 1rem;
  }
  
  .content .custom-component {
    width: 85%;
  }
  
  .indicator {
    display: none;
  }
  
  .control {
    bottom: 1.5em;
    right: 50%;
    transform: translateX(50%);
  }
}
</style>