<template>
  <div class="page-wrapper">
    <div class="container">
      <div class="ring">
        <i></i>
        <i></i>
        <i></i>
        <div class="form-box">
          <h2>Contact Form</h2>
          <form class="form-grid" @submit.prevent="handleSubmit">
            <div class="inputBx">
              <input type="text" placeholder="First Name" v-model="form.firstName" />
            </div>
            <div class="inputBx">
              <input type="text" placeholder="Last Name" v-model="form.lastName" />
            </div>
            <div class="inputBx">
              <input type="email" placeholder="Email" v-model="form.email" />
            </div>
            <div class="inputBx">
              <input type="tel" placeholder="Phone Number" v-model="form.phone" />
            </div>
            <div class="inputBx full-width">
              <input type="text" placeholder="Field of Work" v-model="form.fieldOfWork" />
            </div>
            <div class="inputBx full-width">
              <input type="text" placeholder="Subject" v-model="form.subject" />
            </div>
            <div class="inputBx full-width">
              <textarea placeholder="Your Message" rows="5" v-model="form.message"></textarea>
            </div>
            <div class="inputBx full-width">
              <input type="submit" value="Send Message" />
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

const handleSubmit = () => {
  console.log('Form submitted:', form.value)
  // Add your form submission logic here
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;500&display=swap");

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
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  padding: 40px 20px;
  margin: 0;
}

/* ============================= */
/* Main Ring */
/* ============================= */
.ring {
  position: fixed;
  width: 600px;
  height: 520px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ring i {
  position: absolute;
  inset: 0;
  border: 2px solid #333;
  transition: 0.5s;
}

.ring i:nth-child(1) {
  border-radius: 38% 62% 63% 37% / 41% 44% 56% 59%;
  animation: animate 6s linear infinite;
}

.ring i:nth-child(2) {
  border-radius: 41% 44% 56% 59%/38% 62% 63% 37%;
  animation: animate 4s linear infinite;
}

.ring i:nth-child(3) {
  border-radius: 41% 44% 56% 59%/38% 62% 63% 37%;
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
  position: fixed;
  width: 500px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 25px;
  z-index: 10;
  padding: 20px;
  margin: 0;
}

.form-box h2 {
  font-size: 2em;
  color: #fff;
  font-weight: 500;
  margin-bottom: 10px;
  text-align: center;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
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
  padding: 10px 18px;
  background: transparent;
  border: 2px solid #666;
  border-radius: 40px;
  font-size: 1em;
  color: #fff;
  font-family: "Quicksand", sans-serif;
  outline: none;
  transition: 0.3s;
  margin: 0;
}

.inputBx textarea {
  border-radius: 25px;
  resize: none;
  padding-top: 14px;
}

.inputBx input:focus,
.inputBx textarea:focus {
  border-color: #fff;
  background: rgba(255, 255, 255, 0.03);
}

.inputBx input[type="submit"] {
  width: 100%;
  background: #fff;
  color: #000;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 1.05em;
  padding: 14px 20px;
  border-radius: 40px;
  transition: 0.3s;
}

.inputBx input[type="submit"]:hover {
  background: #e0e0e0;
  transform: scale(1.02);
}

.inputBx input::placeholder,
.inputBx textarea::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

/* ============================= */
/* Responsive Design */
/* ============================= */
@media (max-width: 1024px) {
  .ring {
    width: 500px;
    height: 460px;
  }

  .form-box {
    width: 420px;
  }

  .form-box h2 {
    font-size: 1.8em;
  }

  .form-grid {
    gap: 16px;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 30px 15px;
  }

  .ring {
    width: 100%;
    max-width: 500px;
    height: auto;
    min-height: 550px;
  }

  .form-box {
    width: 100%;
    max-width: 450px;
    padding: 15px;
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .form-box h2 {
    font-size: 1.6em;
  }

  .inputBx input,
  .inputBx textarea {
    font-size: 0.95em;
    padding: 10px 16px;
  }

  .inputBx input[type="submit"] {
    font-size: 1em;
    padding: 12px 18px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 20px 10px;
  }

  .ring {
    width: 100%;
    max-width: 380px;
    min-height: 500px;
  }

  .form-box {
    width: 100%;
    max-width: 340px;
    padding: 10px;
    gap: 20px;
  }

  .form-box h2 {
    font-size: 1.5em;
    margin-bottom: 5px;
  }

  .form-grid {
    gap: 12px;
  }

  .inputBx input,
  .inputBx textarea {
    font-size: 0.9em;
    padding: 9px 14px;
  }

  .inputBx input[type="submit"] {
    font-size: 0.95em;
    padding: 11px 16px;
  }
}

@media (max-width: 360px) {
  .ring {
    max-width: 320px;
    min-height: 480px;
  }

  .form-box {
    max-width: 300px;
  }

  .form-box h2 {
    font-size: 1.3em;
  }
}
</style>