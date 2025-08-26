<template>
  <section id="join" class="join-us-section">
    <div class="content-container">
      <h2 class="main-title">加入我们</h2>
      <p class="quote">
        "I promise not to waste your time. I'm well aware that we all get way too many marketing emails. I'll only write when I actually have something new to share."
      </p>
      <a href="https://docs.qq.com/form/page/DRUh3d1pXV25FRE5U" 
         target="_blank" 
         rel="noopener noreferrer"
         class="cta-link">
        点击此处，填写报名表 &rarr;
      </a>
    </div>
  </section>
</template>

<script setup>
// This component is purely presentational, so no script logic is needed for now.
</script>

<style scoped>
.join-us-section {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #000000; /* Pure black for maximum contrast */
  color: #ffffff;
  text-align: center;
  padding: 2rem;
}

.content-container {
  max-width: 48rem; /* 768px */
}

.main-title {
  font-size: 6rem; /* 96px */
  font-weight: 800; /* font-extrabold */
  letter-spacing: -0.025em; /* tracking-tight */
  text-transform: uppercase;
}

@media (min-width: 768px) {
  .main-title {
    font-size: 8rem; /* 128px */
  }
}

.quote {
  font-family: serif; /* Use a serif font for the quote for contrast */
  font-size: 1.25rem; /* 20px */
  color: #d1d5db; /* text-gray-300 */
  margin-top: 2rem;
  margin-bottom: 3rem;
  line-height: 1.75;
  max-width: 36rem; /* 576px */
  margin-left: auto;
  margin-right: auto;
}

.cta-link {
  font-size: 1.125rem; /* 18px */
  font-weight: 600; /* font-semibold */
  color: #ffffff;
  text-decoration: underline;
  text-underline-offset: 4px;
  transition: color 0.2s ease;
}

.cta-link:hover {
  color: #fde68a; /* A gold-like color for hover */
}
</style>
