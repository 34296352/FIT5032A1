<template>
  <div class="container my-4">
    
    <nav class="mb-3 d-flex gap-3">
      <RouterLink to="/" class="btn btn-outline-primary">Home</RouterLink>
      <RouterLink to="/FireLogin" class="btn btn-outline-success">Firebase Login</RouterLink>
    </nav>

    
    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
}
nav a {
  text-decoration: none;
}
</style>
