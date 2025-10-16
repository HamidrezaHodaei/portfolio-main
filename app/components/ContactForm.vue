<template>
  <div class="page-wrapper">
    <img src="/logo.png" alt="Logo" class="logo-top-left" />
    <div class="container">
      <div class="ring">
        <i></i>
        <i></i>
        <i></i>
        <div class="form-box">
          <h2>Contact Form</h2>
          <form class="form-grid" @submit.prevent="handleSubmit">
            <div class="inputBx">
              <input 
                type="text" 
                placeholder="First Name" 
                v-model="form.firstName"
                required
                autocomplete="given-name"
              />
            </div>
            <div class="inputBx">
              <input 
                type="text" 
                placeholder="Last Name" 
                v-model="form.lastName"
                required
                autocomplete="family-name"
              />
            </div>
            <div class="inputBx">
              <input 
                type="email" 
                placeholder="Email" 
                v-model="form.email"
                required
                autocomplete="email"
              />
            </div>
            <div class="inputBx">
              <input 
                type="tel" 
                placeholder="Phone Number" 
                v-model="form.phone"
                required
                autocomplete="tel"
              />
            </div>
            <div class="inputBx full-width">
              <input 
                type="text" 
                placeholder="Field of Work" 
                v-model="form.fieldOfWork"
                required
                autocomplete="organization-title"
              />
            </div>
            <div class="inputBx full-width">
              <input 
                type="text" 
                placeholder="Subject" 
                v-model="form.subject"
                required
              />
            </div>
            <div class="inputBx full-width">
              <textarea 
                placeholder="Your Message" 
                rows="5" 
                v-model="form.message"
                required
              ></textarea>
            </div>
            <div class="inputBx full-width">
              <input 
                type="submit" 
                value="Send Message"
                :disabled="isSubmitting"
                :class="{ 'submitting': isSubmitting }"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  fieldOfWork: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)

const handleSubmit = async () => {
  if (isSubmitting.value) return
  
  isSubmitting.value = true
  
  try {
    console.log('Form submitted:', form.value)
    // Add your form submission logic here
    // await $fetch('/api/contact', { method: 'POST', body: form.value })
    
    // Success feedback
    alert('پیام شما با موفقیت ارسال شد!')
    
    // Reset form
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      fieldOfWork: '',
      subject: '',
      message: ''
    }
  } catch (error) {
    console.error('Error submitting form:', error)
    alert('خطا در ارسال پیام. لطفا دوباره تلاش کنید.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.logo-top-left {
  position: fixed;
  top: 20px;
  left: 20px;
  width: 140px;
  height: auto;
  z-index: 20;
  transition: width 0.3s ease;
}

.page-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: #0a0a0a;
  overflow-x: hidden;
  overflow-y: auto;
  font-family: "Quicksand", sans-serif;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  padding: 60px 20px 40px;
}

/* ============================= */
/* Main Ring */
/* ============================= */
.ring {
  position: relative;
  width: 100%;
  max-width: 600px;
  height: auto;
  min-height: 520px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ring i {
  position: absolute;
  inset: 0;
  border: 2px solid #333;
  transition: all 0.5s ease;
  pointer-events: none;
}

.ring i:nth-child(1) {
  border-radius: 38% 62% 63% 37% / 41% 44% 56% 59%;
  animation: animate 6s linear infinite;
}

.ring i:nth-child(2) {
  border-radius: 41% 44% 56% 59% / 38% 62% 63% 37%;
  animation: animate 4s linear infinite;
}

.ring i:nth-child(3) {
  border-radius: 41% 44% 56% 59% / 38% 62% 63% 37%;
  animation: animate2 10s linear infinite;
}

.ring:hover i {
  border: 6px solid #fff;
  filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.5));
}

@keyframes animate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes animate2 {
  0% { transform: rotate(360deg); }
  100% { transform: rotate(0deg); }
}

/* ============================= */
/* Form Box */
/* ============================= */
.form-box {
  position: relative;
  width: 100%;
  max-width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 25px;
  z-index: 10;
  padding: 20px;
}

.form-box h2 {
  font-size: clamp(1.5rem, 5vw, 2rem);
  color: #fff;
  font-weight: 500;
  margin-bottom: 10px;
  text-align: center;
  letter-spacing: 0.5px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 18px;
  width: 100%;
}

.inputBx {
  position: relative;
  width: 100%;
}

.inputBx.full-width {
  grid-column: 1 / -1;
}

.inputBx input,
.inputBx textarea {
  width: 100%;
  padding: 12px 20px;
  background: transparent;
  border: 2px solid #666;
  border-radius: 40px;
  font-size: clamp(0.9rem, 2vw, 1rem);
  color: #fff;
  font-family: "Quicksand", sans-serif;
  outline: none;
  transition: all 0.3s ease;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.inputBx textarea {
  border-radius: 25px;
  resize: vertical;
  min-height: 120px;
  padding-top: 14px;
  line-height: 1.5;
}

.inputBx input:focus,
.inputBx textarea:focus {
  border-color: #fff;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
}

.inputBx input:valid,
.inputBx textarea:valid {
  border-color: #888;
}

.inputBx input[type="submit"] {
  width: 100%;
  background: #fff;
  color: #000;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: clamp(0.95rem, 2.5vw, 1.05rem);
  padding: 14px 20px;
  border-radius: 40px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.inputBx input[type="submit"]:hover:not(:disabled) {
  background: #e0e0e0;
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(255, 255, 255, 0.3);
}

.inputBx input[type="submit"]:active:not(:disabled) {
  transform: translateY(0);
}

.inputBx input[type="submit"]:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.inputBx input[type="submit"].submitting {
  position: relative;
}

.inputBx input[type="submit"].submitting::after {
  content: '';
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  border: 2px solid #000;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: translateY(-50%) rotate(360deg); }
}

.inputBx input::placeholder,
.inputBx textarea::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

/* ============================= */
/* Responsive Design */
/* ============================= */
@media (max-width: 1024px) {
  .logo-top-left { 
    width: 120px;
    top: 16px;
    left: 16px;
  }
  
  .ring {
    max-width: 500px;
    min-height: 480px;
  }

  .form-box {
    max-width: 420px;
    gap: 20px;
  }

  .form-grid {
    gap: 16px;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 50px 20px 30px;
  }

  .logo-top-left { 
    width: 100px;
    top: 12px;
    left: 12px;
  }

  .ring {
    max-width: 100%;
    min-height: 560px;
  }

  .form-box {
    max-width: 100%;
    padding: 15px;
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .inputBx input,
  .inputBx textarea {
    padding: 11px 18px;
  }

  .inputBx input[type="submit"] {
    padding: 13px 18px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 40px 15px 20px;
  }

  .logo-top-left { 
    width: 85px;
    top: 10px;
    left: 10px;
  }

  .ring {
    min-height: 520px;
  }

  .form-box {
    padding: 12px;
    gap: 18px;
  }

  .form-grid {
    gap: 12px;
  }

  .inputBx input,
  .inputBx textarea {
    padding: 10px 16px;
  }

  .inputBx textarea {
    min-height: 100px;
  }

  .inputBx input[type="submit"] {
    padding: 12px 16px;
  }

  .ring i {
    border-width: 1.5px;
  }

  .ring:hover i {
    border-width: 4px;
  }
}

@media (max-width: 360px) {
  .logo-top-left { 
    width: 75px;
  }
  
  .ring {
    min-height: 500px;
  }

  .form-box {
    padding: 10px;
    gap: 15px;
  }

  .form-grid {
    gap: 10px;
  }

  .inputBx input,
  .inputBx textarea {
    padding: 9px 14px;
  }
}

/* ============================= */
/* Touch Device Optimizations */
/* ============================= */
@media (hover: none) and (pointer: coarse) {
  .inputBx input,
  .inputBx textarea {
    font-size: 16px; /* Prevents zoom on iOS */
  }

  .inputBx input[type="submit"] {
    min-height: 48px; /* Better touch target */
  }
}

/* ============================= */
/* Dark Mode Support */
/* ============================= */
@media (prefers-color-scheme: dark) {
  .page-wrapper {
    background: #0a0a0a;
  }
}

/* ============================= */
/* Reduced Motion */
/* ============================= */
@media (prefers-reduced-motion: reduce) {
  .ring i {
    animation: none;
  }
  
  * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
</style>