<template>
  <div class="menu-wrapper">
    <!-- Hero Title with Flip Animation -->
    <h1 
      ref="heroTitle"
      class="hero-title"
    >
      h.hodaei<br>
      <div id="flip">
        <div><div>Creator</div></div>
        <div><div>Programmer</div></div>
        <div><div>Designer</div></div>
      </div>
      <span class="static-text">and DEVELOPER</span>
    </h1>

    <!-- Toggle Button - Fixed Position -->
    <div 
      ref="toggleBtn"
      @click="handleToggle"
      class="toggle-button"
    >
      <div 
        class="btn-outline btn-outline-1"
      ></div>
      <div 
        class="btn-outline btn-outline-2"
      ></div>
      
      <!-- Hamburger Icon -->
      <div class="icon-wrapper">
        <div class="hamburger-line hamburger-line-1"></div>
        <div class="hamburger-line hamburger-line-2"></div>
        <div class="hamburger-line hamburger-line-3"></div>
        
        <!-- Close Icon -->
        <div ref="closeIcon" class="close-icon">
          <div class="close-line-1"></div>
          <div class="close-line-2"></div>
        </div>
      </div>
    </div>

    <!-- Overlay SVG -->
    <div class="menu-overlay">
      <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" class="overlay-svg">
        <path 
          ref="menuPath"
          d="M0 2S175 1 500 1s500 1 500 1V0H0Z"
          fill="#0a0a0a"
        ></path>
      </svg>
    </div>

    <!-- Menu -->
    <div 
      ref="menu"
      class="menu-container"
    >
      <!-- Primary Menu -->
      <div class="primary-menu">
        <div 
          v-for="(item, index) in primaryMenu" 
          :key="item.id"
          class="menu-item-wrapper"
        >
          <NuxtLink 
            :to="item.link"
            class="menu-link primary-link"
            @click="handleToggle"
          >
            <span v-if="item.number" class="link-number">{{ item.number }}</span>
            <span>{{ item.text }}</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Secondary Menu -->
      <div class="secondary-menu">
        <!-- Top Links -->
        <div class="secondary-top">
          <div 
            v-for="item in secondaryMenuTop" 
            :key="item.id"
            class="menu-item-wrapper"
          >
            <NuxtLink 
              :to="item.link"
              class="menu-link secondary-link"
              @click="handleToggle"
            >
              {{ item.text }}
            </NuxtLink>
          </div>
        </div>
        
        <!-- Social Links -->
        <div class="secondary-bottom">
          <div class="menu-item-wrapper">
            <p class="menu-link connect-text">
              Connect with me
            </p>
          </div>
          
          <div 
            v-for="social in socialLinks" 
            :key="social.id"
            class="menu-item-wrapper"
          >
            <a 
              :href="social.link"
              target="_blank"
              rel="noopener noreferrer"
              class="menu-link social-link"
            >
              <span class="social-icon" v-html="social.icon"></span>
              <span>{{ social.text }}</span>
            </a>
          </div>

          <!-- Bottom Links -->
          <div 
            v-for="item in secondaryMenuBottom" 
            :key="item.id"
            class="menu-item-wrapper credits-wrapper"
          >
            <NuxtLink 
              :to="item.link"
              class="menu-link secondary-link"
              @click="handleToggle"
            >
              {{ item.text }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

// Refs
const toggleBtn = ref(null)
const menuPath = ref(null)
const closeIcon = ref(null)
const heroTitle = ref(null)
const menu = ref(null)
const isOpen = ref(false)
let tl = null

// Menu Data
const primaryMenu = [
  { id: 1, number: '', text: 'Home', link: '/' },
  { id: 2, number: '', text: 'Projects', link: '/projects' },
  { id: 3, number: '', text: 'About Me', link: '/about' },
]

const secondaryMenuTop = [
  { id: 1, text: 'Speaker', link: '/speaker' },
  { id: 2, text: 'Blog', link: '/blog' },
  { id: 3, text: 'Contact', link: '/contact' },
]

const socialLinks = [
  { 
    id: 1, 
    text: 'GitHub', 
    link: 'https://github.com/hamidrezahodaei',
    icon: `<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>`
  },
  { 
    id: 2, 
    text: 'LinkedIn', 
    link: 'https://linkedin.com/in/hodaeiihamiderza',
    icon: `<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>`
  },
  { 
    id: 3, 
    text: 'Email', 
    link: 'mailto:hodaeiihamidreza@gmail.com',
    icon: `<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/>
    </svg>`
  },
]

const secondaryMenuBottom = [
  { id: 1, text: 'Credits', link: '/credits' },
]

// Handle Toggle
const handleToggle = () => {
  if (!tl) return
  
  if (isOpen.value) {
    tl.reverse()
  } else {
    tl.play()
  }
  
  isOpen.value = !isOpen.value
}

onMounted(() => {
  // Create Timeline
  tl = gsap.timeline({ paused: true })
  
  const hamburgerLines = document.querySelectorAll('.hamburger-line')
  const menuLinks = document.querySelectorAll('.menu-link')
  const btnOutlines = document.querySelectorAll('.btn-outline')
  
  // Initial Settings
  gsap.set(menu.value, { visibility: 'hidden' })
  
  // SVG Path Values
  const startPath = "M0 502S175 272 500 272s500 230 500 230V0H0Z"
  const endPath = "M0 1005S175 1005 500 1005s500 0 500 0V0H0Z"
  
  // Build Animation
  tl.to(toggleBtn.value, {
    x: -40,
    y: 40,
    duration: 1.25,
    ease: "power4.inOut",
  }, 0)
  
  .to(btnOutlines, {
    width: '140px',
    height: '140px',
    borderColor: '#e2e2dc',
    duration: 1.25,
    ease: "power4.inOut",
  }, 0)
  
  .to(hamburgerLines, {
    opacity: 0,
    duration: 0.3,
    ease: "power1.out",
  }, 0)
  
  .to(closeIcon.value, {
    opacity: 1,
    duration: 0.3,
    ease: "power1.out",
  }, 0)
  
  .to(heroTitle.value, {
    opacity: 0,
    y: 20,
    duration: 0.5,
    ease: "power1.out"
  }, 0)
  
  .to(menuPath.value, {
    attr: { d: startPath },
    duration: 0.8,
    ease: "power2.in",
  }, 0.2)
  
  .to(menuPath.value, {
    attr: { d: endPath },
    duration: 0.4,
    ease: "power2.out",
  }, 1)
  
  .set(menu.value, { visibility: 'visible' }, 1.3)
  
  .to(menuLinks, {
    top: 0,
    duration: 1,
    ease: "power3.out",
    stagger: 0.08,
  }, 1.3)
})

onUnmounted(() => {
  if (tl) {
    tl.kill()
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

/* Global Styles */
.menu-wrapper {
  width: 100%;
  min-height: 100vh;
  background-color: #e5e3dc;
  color: #0a0a0a;
  position: relative;
  overflow: hidden;
}

/* Hero Title */
.hero-title {
  position: absolute;
  top: 50vh;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  text-align: center;
  font-size: clamp(2rem, 8vw, 6rem);
  font-family: 'Playfair Display', serif;
  font-weight: 900;
  text-transform: uppercase;
  z-index: 1;
  pointer-events: none;
  line-height: 1.4;
}

.static-text {
  display: inline-block;
  margin-left: 0.3em;
}

/* Flip Animation Styles */
#flip {
  height: 1.25em;
  overflow: hidden;
  display: inline-block;
  vertical-align: middle;
  line-height: 1.25;
  position: relative;
}

#flip > div {
  position: relative;
}

#flip > div > div {
  color: #fff;
  padding: 0.1em 0.4em;
  height: 1.2em;
  margin-bottom: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #0a0a0a;
  border-radius: 0.15em;
  box-shadow: 0 ;
  line-height: 1.2;
}

#flip > div:first-child {
  animation: show 15s ease-in-out infinite;
}

@keyframes show {
  0% {
    margin-top: -2.5em;
  }
  10% {
    margin-top: -2.5em;
  }
  20% {
    margin-top: -1.25em;
  }
  45% {
    margin-top: -1.25em;
  }
  55% {
    margin-top: 0em;
  }
  95% {
    margin-top: 0em;
  }
  100% {
    margin-top: -2.5em;
  }
}

/* Toggle Button - Always Fixed */
.toggle-button {
  position: fixed !important;
  top: 2rem;
  right: 2rem;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  cursor: pointer;
}

.btn-outline {
  position: absolute;
  width: 100px;
  height: 100px;
  border: 1px solid #0a0a0a;
  pointer-events: none;
}

.btn-outline-1 {
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  animation: morph 4s linear infinite;
}

.btn-outline-2 {
  border-radius: 53% 47% 43% 57% / 51% 39% 61% 49%;
}

@keyframes morph {
  0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
}

/* Icon Wrapper */
.icon-wrapper {
  position: relative;
  width: 24px;
  height: 24px;
  z-index: 101;
  pointer-events: none;
}

.hamburger-line {
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: #0a0a0a;
  left: 0;
}

.hamburger-line-1 {
  top: 6px;
}

.hamburger-line-2 {
  top: 50%;
  transform: translateY(-50%);
}

.hamburger-line-3 {
  bottom: 6px;
}

.close-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  transform: translate(-50%, -50%);
  opacity: 0;
  pointer-events: none;
}

.close-line-1,
.close-line-2 {
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: #e2e2dc;
  top: 50%;
  left: 0;
}

.close-line-1 {
  transform: rotate(45deg);
}

.close-line-2 {
  transform: rotate(-45deg);
}

/* Overlay SVG */
.menu-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 50;
  pointer-events: none;
}

.overlay-svg {
  width: 100%;
  height: 100%;
}

/* Menu Container */
.menu-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 60;
  visibility: hidden;
  padding: 10vh 5vw;
  gap: 5vw;
}

@media (max-width: 768px) {
  .menu-container {
    flex-direction: column;
    padding: 15vh 8vw;
  }
  
  .static-text {
    display: block;
    margin-left: 0;
    margin-top: 0.5rem;
  }
}

/* Primary Menu */
.primary-menu {
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media (max-width: 768px) {
  .primary-menu {
    margin-bottom: 4rem;
  }
}

.menu-item-wrapper {
  overflow: hidden;
  margin-bottom: 1rem;
}

.menu-link {
  position: relative;
  top: 150px;
  display: block;
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.menu-link:hover {
  opacity: 0.6;
}

.primary-link {
  text-transform: uppercase;
  font-size: clamp(2.5rem, 8vw, 6rem);
  font-weight: 800;
  line-height: 1;
  font-family: 'Playfair Display', serif;
  color: #e2e2dc;
}

.link-number {
  font-size: 0.25em;
  opacity: 0.5;
  margin-right: 1.5rem;
  font-family: 'Inter', sans-serif;
}

/* Secondary Menu */
.secondary-menu {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.secondary-link {
  font-family: 'Inter', sans-serif;
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  font-weight: 300;
  color: #e2e2dc;
  margin-bottom: 0.5rem;
}

.connect-text {
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.875rem, 1.2vw, 1rem);
  font-weight: 300;
  color: #e2e2dc;
  opacity: 0.6;
  margin-bottom: 0.75rem;
}

/* Social Links */
.social-link {
  font-family: 'Inter', sans-serif;
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  font-weight: 300;
  color: #e2e2dc;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.social-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  color: #e2e2dc;
}

.social-link:hover .social-icon {
  transform: scale(1.1);
}

.credits-wrapper {
  margin-top: 1.5rem;
}
</style>