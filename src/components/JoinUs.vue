<template>
  <section id="join" class="join-us-section">
    <div class="content-container">
      <h2 class="main-title">加入我们</h2>
      <p class="quote">
        "维特根斯坦在《逻辑哲学论》中说语言的边界就是世界的边界，从这个角度看，辩论当之无愧是一个重新认识世界的过程
        ，我们每个人或多或少都被一两个振聋发聩的辩论片段吸引，那正是思想突破既有牢笼，向着更自由、更辽阔的世界边界试探性飞翔的迷人时刻....."
      </p>
      <a href="https://www.wjx.cn/vm/Pp5PVqU.aspx" 
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
