<template>
  <div class="flex flex-col lg:flex-row min-h-screen overflow-hidden relative z-30 bg-white">
    <!-- Left Section (Black) -->
    <div class="w-full lg:w-[35%] bg-black text-white flex flex-col justify-between p-6 sm:p-8 lg:p-10 relative min-h-[40vh] lg:min-h-screen">
      <!-- Logo -->
      <div class="w-[120px] sm:w-[150px] lg:w-[180px] lg:mt-[-50px]">
        <img 
          src="/logo.png" 
          alt="Logo" 
          class="w-full h-auto object-contain"
        />
      </div>

      <!-- Profile Image - Hidden on mobile, shown on desktop -->
      <div class="mr-20 hidden lg:block absolute -right-[150px] top-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full overflow-hidden border-[15px] border-black shadow-2xl z-10">
        <img 
          src="/PSX.png" 
          alt="profile H.hodaei"
          class="w-full h-full object-cover grayscale"
        />
      </div>

      <!-- Profile Image - Mobile Version (Centered) -->
      <div class="lg:hidden flex justify-center my-8">
        <div class="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] rounded-full overflow-hidden border-8 border-white shadow-2xl">
          <img 
            src="/PSX.png" 
            alt="profile H.hodaei"
            class="w-full h-full object-cover grayscale"
          />
        </div>
      </div>

     
    </div>

    <!-- Right Section (Light Gray) -->
    <div class="w-full lg:w-[65%] bg-[#e5e5e5] px-6 sm:px-10 lg:px-20 py-6 sm:py-8 lg:py-10 flex flex-col justify-center relative">
      <!-- Subtitle -->
      <div class="text-base sm:text-lg text-gray-600 mb-2 font-normal tracking-[2px] text-center lg:text-left">
        Web Developer
      </div>

      <!-- Main Title with Typewriter Effect -->
      <h1 ref="mainTitle" class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight text-center lg:text-left">
        <span ref="typewriter"></span>
        <span ref="cursor" class="cursor">|</span>
      </h1>

      <!-- Description -->
      <div class="text-[15px] sm:text-[16px] lg:text-[17px] leading-relaxed text-gray-600 mb-8 sm:mb-10 lg:mb-12 max-w-full lg:max-w-[550px] text-center lg:text-left">
        <p class="mb-4 sm:mb-5">
          I am a dedicated creator, fusing visual design mastery with cutting-edge front-end technologies like Nuxt 3, Tailwind CSS, and dynamic animations powered by GSAP.
        </p>
        <p class="mb-4 sm:mb-5">
          My expertise extends across the full stack, utilizing TypeScript and robust languages like Go and Python, while leveraging the power of Prisma for efficient and modern database integration.
        </p>
      </div>

      <!-- Buttons with Slide Left Effect -->
      <div class="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center lg:items-start">
        <a 
          href="/CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-slide-left relative px-8 sm:px-10 lg:px-11 py-[16px] sm:py-[18px] text-sm sm:text-base rounded-full border-2 border-black bg-transparent text-black font-medium overflow-hidden w-full sm:w-auto text-center"
        >
          <span class="relative z-10">Open CV</span>
        </a>
        <a 
          href="#" 
          class="btn btn-slide-left btn-black relative px-8 sm:px-10 lg:px-11 py-[16px] sm:py-[18px] text-sm sm:text-base rounded-full border-2 border-black bg-black text-white font-medium overflow-hidden w-full sm:w-auto text-center"
        >
          <span class="relative z-10">Contact</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const typewriter = ref(null)
const cursor = ref(null)
const mainTitle = ref(null)

onMounted(() => {
  if (process.client) {
    createTypewriterEffect()
  }
})

const createTypewriterEffect = () => {
  const text = "Hamidreza Hodaei"
  
  // Cursor blink animation (always running)
  gsap.to(cursor.value, {
    opacity: 0,
    repeat: -1,
    yoyo: true,
    duration: 0.5,
    ease: 'power2.inOut'
  })

  // Function to type text
  const typeText = () => {
    const chars = text.split('')
    const tl = gsap.timeline({
      onComplete: () => {
        // Wait 2 seconds then delete and restart
        gsap.delayedCall(2, deleteText)
      }
    })
    
    chars.forEach((char, index) => {
      tl.to(typewriter.value, {
        duration: 0.1,
        onStart: () => {
          typewriter.value.textContent += char
        }
      })
    })
  }

  // Function to delete text
  const deleteText = () => {
    const currentText = typewriter.value.textContent
    const chars = currentText.split('')
    const tl = gsap.timeline({
      onComplete: () => {
        // Wait 1 second then restart typing
        gsap.delayedCall(1, typeText)
      }
    })
    
    chars.reverse().forEach((char, index) => {
      tl.to(typewriter.value, {
        duration: 0.05,
        onStart: () => {
          typewriter.value.textContent = typewriter.value.textContent.slice(0, -1)
        }
      })
    })
  }

  // Start the loop
  typeText()
}
</script>

<style scoped>
.cursor {
  display: inline-block;
  font-weight: normal;
  color: #111827;
}

/* Slide Left Button Effect - Fixed without border overflow */
.btn {
  transition: all 0.3s ease;
  will-change: transform;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: black;
  transition: left 0.5s ease-out;
  z-index: 1;
}

.btn:hover::before {
  left: 0;
}

.btn:hover {
  color: white;
  /* Removed translateY to prevent layout shift */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

/* Black Button Variant */
.btn-black::before {
  background: white;
}

.btn-black:hover {
  color: black;
}

/* Mobile optimizations */
@media (max-width: 1023px) {
  .btn:active::before {
    left: 0;
  }
  
  .btn:active {
    color: white;
  }
  
  .btn-black:active {
    color: black;
  }
}
</style>