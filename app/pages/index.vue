<template>
  <div
    :class="[
      'min-h-screen transition-colors duration-300 relative', // ⬅️ کلاس relative اضافه شد
      isDark
        ? 'bg-[#121212]'
        : 'bg-gradient-to-br from-gray-50 to-gray-100',
    ]"
  >
    <StarsCanvas />

    <Navbar class="relative z-20" />  <Hero />
      <Motion />
    <div></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Motion from '~/components/Motion.vue';

// StarsCanvas و Hero به طور خودکار توسط Nuxt ایمپورت می‌شوند.

const isDark = ref(true);

onMounted(() => {
  if (process.client) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      isDark.value = savedTheme === 'dark';
    }

    // ... (منطق تغییر تم شما)
    const observer = new MutationObserver(() => {
      const theme = localStorage.getItem('theme');
      if (theme) {
        isDark.value = theme === 'dark';
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    window.addEventListener('storage', (e) => {
      if (e.key === 'theme' && e.newValue !== null) {
        isDark.value = e.newValue === 'dark';
      }
    });
  }
});
</script>