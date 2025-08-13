<template>
  <div class="article-page">
    <div class="article-container">
      <h1 class="article-title">WHY WE DEBATE</h1>
      <p class="article-body">
        <span class="drop-cap">L</span>orem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <p class="article-body">
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
      </p>
    </div>
  </div>
</template>

<script setup>
// No logic needed for this static page yet.
</script>

<style scoped>
.article-page {
  background-color: #f3f4f6; /* bg-gray-100 */
  color: #111827; /* text-gray-900 */
  padding: 6rem 2rem;
}
.article-container {
  max-width: 42rem; /* 672px */
  margin: 0 auto;
}
.article-title {
  font-size: 4.5rem; /* 72px */
  font-weight: 800;
  font-family: sans-serif;
  text-transform: uppercase;
  margin-bottom: 4rem;
  line-height: 1;
}
.article-body {
  font-family: serif;
  font-size: 1.125rem; /* 18px */
  line-height: 1.75; /* leading-loose */
  margin-bottom: 2rem;
}
.drop-cap {
  float: left;
  font-size: 4.5rem; /* 72px */
  line-height: 0.8;
  margin-right: 0.75rem;
  font-weight: 700;
}
</style>
