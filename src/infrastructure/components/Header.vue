<script setup lang="ts"></script>

<template>
  <div class="header">
    <slot></slot>
  </div>
</template>

<style scoped>
.header {
  background: #132939;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 3rem;
  display: flex;
  align-items: self-end;
  justify-content: flex-end;
  box-sizing: border-box;
}
</style>
