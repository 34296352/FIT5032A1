<template>
  <div class="container mt-5" style="max-width: 480px">
    <h3 class="mb-3">User Login / Register</h3>

    <!-- Mode Switch -->
    <div class="btn-group mb-3">
      <button
        class="btn"
        :class="mode === 'login' ? 'btn-primary' : 'btn-outline-primary'"
        @click="mode = 'login'"
      >
        Login
      </button>
      <button
        class="btn"
        :class="mode === 'signup' ? 'btn-success' : 'btn-outline-success'"
        @click="mode = 'signup'"
      >
        Sign Up
      </button>
    </div>

    <!-- Current User Status -->
    <div v-if="user" class="alert alert-info py-2">
      Logged in as: <strong>{{ user.email }}</strong>
      <button class="btn btn-sm btn-outline-dark ms-2" @click="handleSignOut" :disabled="loading">
        Logout
      </button>
    </div>

    <!-- Login/Signup Form -->
    <form @submit.prevent="handleSubmit" class="card p-3">
      <div class="mb-2">
        <label class="form-label">Email</label>
        <input type="email" v-model.trim="email" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Password (≥ 6 characters)</label>
        <input type="password" v-model="password" minlength="6" class="form-control" required />
      </div>

      <button class="btn btn-primary w-100" :disabled="loading">
        <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
        {{ mode === 'login' ? 'Login' : 'Sign Up' }}
      </button>
    </form>

    
    <div v-if="message" class="alert alert-success mt-3 py-2">{{ message }}</div>
    <div v-if="error" class="alert alert-danger mt-3 py-2">{{ error }}</div>

    
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"
import { auth } from "../firebase"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth"

const email = ref("")
const password = ref("")
const mode = ref("login") 
const loading = ref(false)
const message = ref("")
const error = ref("")
const user = ref(null)

let unsub = null


onMounted(() => {
  unsub = onAuthStateChanged(auth, (u) => {
    user.value = u
  })
})

onBeforeUnmount(() => {
  if (unsub) unsub()
})

async function handleSubmit() {
  message.value = ""
  error.value = ""
  loading.value = true
  try {
    if (mode.value === "signup") {
      const cred = await createUserWithEmailAndPassword(auth, email.value, password.value)
      message.value = `Sign up successful: ${cred.user.email}`
    } else {
      const cred = await signInWithEmailAndPassword(auth, email.value, password.value)
      message.value = `Login successful: ${cred.user.email}`
    }
    password.value = "" 
  } catch (e) {
    error.value = e?.message || "Operation failed"
  } finally {
    loading.value = false
  }
}

async function handleSignOut() {
  message.value = ""
  error.value = ""
  loading.value = true
  try {
    await signOut(auth)
    message.value = "Logged out successfully"
  } catch (e) {
    error.value = e?.message || "Logout failed"
  } finally {
    loading.value = false
  }
}
</script>