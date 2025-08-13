<template>
  <div class="playing-icon">
    <span class="bar"></span>
    <span class="bar"></span>
    <span class="bar"></span>
  </div>
</template>

<style scoped>
.playing-icon {
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.bar {
  width: 4px;
  background-color: #ffffff;
  animation: wave 1.2s ease-in-out infinite;
}

.bar:nth-child(1) {
  height: 5px;
  animation-delay: 0s;
}
.bar:nth-child(2) {
  height: 10px;
  animation-delay: 0.2s;
}
.bar:nth-child(3) {
  height: 15px;
  animation-delay: 0.4s;
}

@keyframes wave {
  0%, 100% {
    height: 5px;
  }
  50% {
    height: 24px;
  }
}
</style>
