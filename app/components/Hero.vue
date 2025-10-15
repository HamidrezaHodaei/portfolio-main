<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Left Section (Black) -->
    <div class="w-[35%] bg-black text-white flex flex-col justify-between p-10 relative">
      <!-- Logo -->
      <div class="w-[180px] mt-[-50px]">
        <img 
          src="/logo1.png" 
          alt="Logo" 
          class="w-full h-auto object-contain"
        />
      </div>

      <!-- Profile Image -->
      <div class="mr-20 absolute -right-[150px] top-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full overflow-hidden border-[15px] border-black shadow-2xl z-10">
        <img 
          src="/profile.jpg" 
          alt="Jane Doe"
          class="w-full h-full object-cover grayscale"
        />
      </div>

      <!-- Social Icons -->
      <div class="flex gap-6">
        <a href="#" class="text-white text-3xl hover:scale-110 transition-transform duration-300">
          <i class="fab fa-linkedin"></i>
        </a>
        <a href="#" class="text-white text-3xl hover:scale-110 transition-transform duration-300">
          <i class="fab fa-github"></i>
        </a>
        <a href="#" class="text-white text-3xl hover:scale-110 transition-transform duration-300">
          <i class="fab fa-twitter"></i>
        </a>
      </div>
    </div>

    <!-- Right Section (Light Gray) -->
    <div class="w-[65%] bg-[#e5e5e5] px-20 py-16 flex flex-col justify-center relative">
      <!-- Subtitle -->
      <div class="text-lg text-gray-600 mb-2 font-normal tracking-[2px]">
        Web Developer
      </div>

      <!-- Main Title with Typewriter Effect -->
      <h1 ref="mainTitle" class="text-5xl font-bold text-gray-900 mb-8 leading-tight">
        <span ref="typewriter"></span>
        <span ref="cursor" class="cursor">|</span>
      </h1>

      <!-- Description -->
      <div class="text-[17px] leading-relaxed text-gray-600 mb-12 max-w-[550px]">
        <p class="mb-5">
          I am a dedicated creator, fusing visual design mastery with cutting-edge front-end technologies like Nuxt 3, Tailwind CSS, and dynamic animations powered by GSAP.
        </p>
        <p class="mb-5">
          My expertise extends across the full stack, utilizing TypeScript and robust languages like Go and Python, while leveraging the power of Prisma for efficient and modern database integration.
        </p>
      </div>

      <!-- Buttons with Slide Left Effect -->
      <div class="flex gap-5">
        <a 
          href="#" 
          class="btn btn-slide-left relative px-11 py-[18px] text-base rounded-full border-2 border-black bg-transparent text-black font-medium overflow-hidden"
        >
          <span class="relative z-10">Download CV</span>
        </a>
        <a 
          href="#" 
          class="btn btn-slide-left btn-black relative px-11 py-[18px] text-base rounded-full border-2 border-black bg-black text-white font-medium overflow-hidden"
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

/* Slide Left Button Effect */
.btn {
  transition: all 0.3s ease;
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
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

/* Black Button Variant */
.btn-black::before {
  background: white;
}

.btn-black:hover {
  color: black;
}
</style>