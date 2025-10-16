<template>
  <div class="menu-wrapper">
    <!-- Toggle Button - Fixed Position -->
    <button 
      ref="toggleBtn"
      @click="handleToggle"
      class="toggle-button"
      :aria-label="isOpen ? 'Close menu' : 'Open menu'"
      :aria-expanded="isOpen"
      type="button"
    >
      <div class="btn-outline btn-outline-1" aria-hidden="true"></div>
      <div class="btn-outline btn-outline-2" aria-hidden="true"></div>
      
      <!-- Hamburger Icon -->
      <div class="icon-wrapper" aria-hidden="true">
        <div class="hamburger-line hamburger-line-1"></div>
        <div class="hamburger-line hamburger-line-2"></div>
        <div class="hamburger-line hamburger-line-3"></div>
        
        <!-- Close Icon -->
        <div ref="closeIcon" class="close-icon">
          <div class="close-line-1"></div>
          <div class="close-line-2"></div>
        </div>
      </div>
    </button>

    <!-- Overlay SVG -->
    <div class="menu-overlay" :class="{ 'is-active': isOpen }">
      <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" class="overlay-svg">
        <path 
          ref="menuPath"
          d="M0 2S175 1 500 1s500 1 500 1V0H0Z"
          fill="#0a0a0a"
        ></path>
      </svg>
    </div>

    <!-- Menu -->
    <nav 
      ref="menu"
      class="menu-container"
      :class="{ 'is-visible': isOpen }"
      role="navigation"
      aria-label="Main navigation"
    >
      <!-- Primary Menu -->
      <div class="primary-menu">
        <div 
          v-for="(item, index) in primaryMenu" 
          :key="item.id"
          class="menu-item-wrapper"
          :style="{ '--item-index': index }"
        >
          <NuxtLink 
            :to="item.link"
            class="menu-link primary-link hover-effect-text"
            @click="handleToggle"
            tabindex="0"
          >
            <span v-if="item.number" class="link-number">{{ item.number }}</span>
            <span class="text-main">{{ item.text }}</span>
            <span class="text-hover" aria-hidden="true">{{ item.text }}</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Secondary Menu -->
      <div class="secondary-menu">
        <!-- Top Links -->
        <div class="secondary-top">
          <div 
            v-for="(item, index) in secondaryMenuTop" 
            :key="item.id"
            class="menu-item-wrapper"
            :style="{ '--item-index': index + 3 }"
          >
            <NuxtLink 
              :to="item.link"
              class="menu-link secondary-link"
              @click="handleToggle"
              tabindex="0"
            >
              {{ item.text }}
            </NuxtLink>
          </div>
        </div>
        
        <!-- Social Links -->
        <div class="secondary-bottom">
          <div class="menu-item-wrapper" :style="{ '--item-index': 6 }">
            <p class="menu-link connect-text">
              Connect with me
            </p>
          </div>
          
          <div 
            v-for="(social, index) in socialLinks" 
            :key="social.id"
            class="menu-item-wrapper"
            :style="{ '--item-index': index + 7 }"
          >
            <a 
              :href="social.link"
              target="_blank"
              rel="noopener noreferrer"
              class="menu-link social-link"
              :aria-label="`Visit ${social.text}`"
              tabindex="0"
            >
              <span class="social-icon" v-html="social.icon" aria-hidden="true"></span>
              <span>{{ social.text }}</span>
            </a>
          </div>

          <!-- Bottom Links -->
          <div 
            v-for="(item, index) in secondaryMenuBottom" 
            :key="item.id"
            class="menu-item-wrapper credits-wrapper"
            :style="{ '--item-index': index + 10 }"
          >
            <NuxtLink 
              :to="item.link"
              class="menu-link secondary-link credits-link"
              @click="handleToggle"
              tabindex="0"
            >
              {{ item.text }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { gsap } from 'gsap'

// Refs
const toggleBtn = ref(null)
const menuPath = ref(null)
const closeIcon = ref(null)
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
  { id: 3, text: 'Form', link: '/form' },
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
    link: 'https://linkedin.com/in/hamidrezahoaei',
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
  { id: 1, text: '© 2025 Hamidreza Hodaei. All rights reserved.', link: '#' },
]

// Handle body scroll lock
watch(isOpen, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

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

// Handle Escape key
const handleEscape = (e) => {
  if (e.key === 'Escape' && isOpen.value) {
    handleToggle()
  }
}

onMounted(() => {
  // Add keyboard listener
  window.addEventListener('keydown', handleEscape)
  
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
  // Cleanup
  window.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
  
  if (tl) {
    tl.kill()
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

/* Menu Wrapper */
.menu-wrapper {
  position: relative;
  z-index: 9000;
}

/* Toggle Button - Always Fixed */
.toggle-button {
  position: fixed;
  top: 2rem;
  right: 2rem;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  cursor: pointer;
  background: transparent;
  border: none;
  padding: 0;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.3s ease;
}

.toggle-button:active {
  transform: scale(0.95);
}

.toggle-button:focus-visible {
  outline: 2px solid #ffffff;
  outline-offset: 8px;
}

.btn-outline {
  position: absolute;
  width: 100px;
  height: 100px;
  border: 1px solid #ffffff;
  pointer-events: none;
  will-change: width, height, border-color;
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
  background-color: #ffffff;
  left: 0;
  transition: background-color 0.3s ease;
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
  z-index: 9900;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.menu-overlay.is-active {
  opacity: 1;
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
  z-index: 9950;
  visibility: hidden;
  padding: clamp(80px, 10vh, 120px) clamp(20px, 5vw, 80px);
  gap: clamp(20px, 5vw, 80px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.menu-container.is-visible {
  pointer-events: auto;
}

/* Primary Menu */
.primary-menu {
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
}

.menu-item-wrapper {
  overflow: hidden;
  margin-bottom: clamp(0.5rem, 2vw, 1rem);
}

.menu-link {
  position: relative;
  top: 150px;
  display: block;
  text-decoration: none;
  transition: opacity 0.3s ease, transform 0.3s ease;
  will-change: top;
}

.menu-link:hover {
  opacity: 0.7;
}

.menu-link:focus-visible {
  outline: 2px solid #e2e2dc;
  outline-offset: 4px;
  opacity: 1;
}

.primary-link {
  text-transform: uppercase;
  font-size: clamp(2rem, 8vw, 6rem);
  font-weight: 800;
  line-height: 1.1;
  font-family: 'Playfair Display', serif;
  color: #e2e2dc;
  word-break: break-word;
}

/* Hover Effect for Primary Links */
.hover-effect-text {
  position: relative;
  display: flex;
  align-items: center;
}

.text-main,
.text-hover {
  transition: all cubic-bezier(.1,.5,.5,1) 0.4s;
}

.text-hover {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  color: #0a0a0a;
  clip-path: polygon(0 50%, 100% 50%, 100% 50%, 0 50%);
  transform-origin: center;
  display: flex;
  align-items: center;
  padding-left: 0;
}

.link-number ~ .text-hover {
  padding-left: calc(0.25em * 4 + 1.5rem);
}

.hover-effect-text:hover .text-hover,
.hover-effect-text:focus-visible .text-hover {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
}

.link-number {
  font-size: 0.25em;
  opacity: 0.5;
  margin-right: clamp(0.75rem, 2vw, 1.5rem);
  font-family: 'Inter', sans-serif;
}

/* Secondary Menu */
.secondary-menu {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
}

.secondary-top,
.secondary-bottom {
  display: flex;
  flex-direction: column;
}

.secondary-link {
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.9rem, 1.5vw, 1.25rem);
  font-weight: 300;
  color: #e2e2dc;
  margin-bottom: 0.5rem;
  word-break: break-word;
}

.connect-text {
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.75rem, 1.2vw, 1rem);
  font-weight: 300;
  color: #e2e2dc;
  opacity: 0.6;
  margin-bottom: 0.75rem;
}

/* Social Links */
.social-link {
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.9rem, 1.5vw, 1.25rem);
  font-weight: 300;
  color: #e2e2dc;
  display: flex;
  align-items: center;
  gap: clamp(0.5rem, 1vw, 0.75rem);
  margin-bottom: 0.75rem;
}

.social-icon {
  width: clamp(20px, 3vw, 24px);
  height: clamp(20px, 3vw, 24px);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  color: #e2e2dc;
  flex-shrink: 0;
}

.social-link:hover .social-icon,
.social-link:focus-visible .social-icon {
  transform: scale(1.15) rotate(5deg);
}

.credits-wrapper {
  margin-top: clamp(1rem, 2vw, 1.5rem);
}

.credits-link {
  font-size: clamp(0.7rem, 1.2vw, 0.9rem);
  opacity: 0.7;
}

/* ============================= */
/* Responsive Design */
/* ============================= */
@media (max-width: 1024px) {
  .toggle-button {
    width: 80px;
    height: 80px;
    top: 1.5rem;
    right: 1.5rem;
  }
  
  .btn-outline {
    width: 80px;
    height: 80px;
  }
  
  .icon-wrapper {
    width: 20px;
    height: 20px;
  }
}

@media (max-width: 768px) {
  .menu-container {
    flex-direction: column;
    padding: 100px 6vw 40px;
    gap: clamp(30px, 8vw, 60px);
  }
  
  .primary-menu {
    justify-content: flex-start;
  }
  
  .secondary-menu {
    justify-content: flex-start;
    gap: clamp(20px, 5vw, 40px);
  }
  
  .toggle-button {
    width: 70px;
    height: 70px;
    top: 1.25rem;
    right: 1.25rem;
  }
  
  .btn-outline {
    width: 70px;
    height: 70px;
  }
}

@media (max-width: 480px) {
  .menu-container {
    padding: 90px 5vw 30px;
  }
  
  .toggle-button {
    width: 60px;
    height: 60px;
    top: 1rem;
    right: 1rem;
  }
  
  .btn-outline {
    width: 60px;
    height: 60px;
  }
  
  .icon-wrapper {
    width: 18px;
    height: 18px;
  }
  
  .hamburger-line {
    height: 1.5px;
  }
  
  .close-icon {
    width: 18px;
    height: 18px;
  }
  
  .close-line-1,
  .close-line-2 {
    height: 1.5px;
  }
}

/* ============================= */
/* Reduced Motion */
/* ============================= */
@media (prefers-reduced-motion: reduce) {
  .btn-outline-1 {
    animation: none;
  }
  
  * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}

/* ============================= */
/* Print Styles */
/* ============================= */
@media print {
  .menu-wrapper {
    display: none;
  }
}
</style>