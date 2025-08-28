<template>
  <div class="container my-4">
    <h2>Activity List</h2>
    <ul>
      <li v-for="(activity, index) in activities" :key="index">
        <strong>{{ activity.title }}</strong> - {{ activity.description }} <br />
        📍 {{ activity.location }} | 📅 {{ activity.status }}
      </li>
    </ul>

    <hr class="my-4" />

    <h3 class="mb-3">Add New Activity</h3>
    <form @submit.prevent="submitForm">
      <div class="row g-3">
        <div class="col-12 col-sm-6 col-md-4">
          <label class="form-label">Title</label>
          <input
            type="text"
            class="form-control"
            v-model="formData.title"
            @blur="validateTitle(true)"
            @input="validateTitle(false)"
          />
          <div v-if="errors.title" class="text-danger mt-1">{{ errors.title }}</div>
        </div>

        
        <div class="col-12 col-sm-6 col-md-4">
          <label class="form-label">Location</label>
          <input
            type="text"
            class="form-control"
            v-model="formData.location"
            @blur="validateLocation(true)"
            @input="validateLocation(false)"
          />
          <div v-if="errors.location" class="text-danger mt-1">{{ errors.location }}</div>
        </div>

        
        <div class="col-12 col-sm-12 col-md-4">
          <label class="form-label">Status</label>
          <select class="form-select" v-model="formData.status">
            <option value="upcoming">upcoming</option>
            <option value="finished">finished</option>
          </select>
        </div>

        
        <div class="col-12">
          <label class="form-label">Description</label>
          <textarea
            class="form-control"
            v-model="formData.description"
            @blur="validateDescription(true)"
            @input="validateDescription(false)"
            rows="3"
          ></textarea>
          <div v-if="errors.description" class="text-danger mt-1">{{ errors.description }}</div>
        </div>

        
        <div class="col-12 d-flex gap-2 justify-content-start justify-content-md-end">
          <button type="submit" class="btn btn-primary">Submit</button>
          <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
        </div>
      </div>
    </form>
  </div>
</template>


<script setup>
import { ref } from "vue"

const activities = ref([
  { title: "Community Walking Group", description: "Weekly social walk.", location: "Carlton Gardens", status: "upcoming" },
  { title: "Stargazing Walks", description: "Gentle walk + stargazing.", location: "Clayton Mountain", status: "finished" }
])


const formData = ref({
  title: "",
  description: "",
  location: "",
  status: "upcoming"
})


const errors = ref({
  title: null,
  description: null,
  location: null
})


const validateTitle = (blur) => {
  const value = formData.value.title.trim()
  if (value === "") {
    if (blur) errors.value.title = "Title cannot be empty"
  } else if (!/[a-zA-Z]/.test(value)) {
    if (blur) errors.value.title = "Title must contain at least one letter"
  } else {
    errors.value.title = null
  }
}


const validateDescription = (blur) => {
  const value = formData.value.description.trim()
  if (value === "") {
    if (blur) errors.value.description = "Description cannot be empty"
  } else if (value.length < 3) {
    if (blur) errors.value.description = "Description must be at least 3 characters"
  } else if (!/[a-zA-Z]/.test(value)) {
    if (blur) errors.value.description = "Description must contain at least one letter"
  } else {
    errors.value.description = null
  }
}


const validateLocation = (blur) => {
  const value = formData.value.location.trim()
  if (value === "") {
    if (blur) errors.value.location = "Location cannot be empty"
  } 
   else if (!/[a-zA-Z]/.test(value)) {
    if (blur) errors.value.location = "Location must contain at least one letter"
  } else {
    errors.value.location = null
  }
}


const submitForm = () => {
  validateTitle(true)
  validateDescription(true)
  validateLocation(true)

  if (!errors.value.title && !errors.value.description && !errors.value.location) {
    activities.value.push({ ...formData.value })
    clearForm()
  }
}


const clearForm = () => {
  formData.value = {
    title: "",
    description: "",
    location: "",
    status: "upcoming"
  }
}
</script>
