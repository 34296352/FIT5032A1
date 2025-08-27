<template>
  <div>
    <h2>Activity List</h2>
    <ul>
      <li v-for="(activity, index) in activities" :key="index">
        <strong>{{ activity.title }}</strong> - {{ activity.description }} <br />
        📍 {{ activity.location }} | 📅 {{ activity.status }}
      </li>
    </ul>

    <hr />

    <!-- 新增活动表单 -->
    <h3>Add New Activity</h3>
    <form @submit.prevent="submitForm">
      <!-- 标题 -->
      <div class="mb-3">
        <label class="form-label">Title</label>
        <input 
          type="text" 
          class="form-control" 
          v-model="formData.title"
          @blur="validateTitle(true)"
          @input="validateTitle(false)"
        />
        <div v-if="errors.title" class="text-danger">{{ errors.title }}</div>
      </div>

      <!-- 描述 -->
      <div class="mb-3">
        <label class="form-label">Description</label>
        <textarea 
          class="form-control" 
          v-model="formData.description"
          @blur="validateDescription(true)"
          @input="validateDescription(false)"
        ></textarea>
        <div v-if="errors.description" class="text-danger">{{ errors.description }}</div>
      </div>

      <!-- 地点 -->
      <div class="mb-3">
        <label class="form-label">Location</label>
        <input 
          type="text" 
          class="form-control" 
          v-model="formData.location"
        />
      </div>

      <!-- 状态 -->
      <div class="mb-3">
        <label class="form-label">Status</label>
        <select class="form-select" v-model="formData.status">
          <option value="upcoming">upcoming</option>
          <option value="finished">finished</option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
      <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue"

const activities = ref([
  { title: "Community Walking Group", description: "Weekly social walk.", location: "Carlton Gardens", status: "upcoming" },
  { title: "Stargazing Walks", description: "Gentle walk + stargazing.", location: "Clayton Mountain", status: "finished" }
])

// 表单数据
const formData = ref({
  title: "",
  description: "",
  location: "",
  status: "upcoming"
})

// 错误信息
const errors = ref({
  title: null,
  description: null
})

// 验证标题（最少 3 个字符）
const validateTitle = (blur) => {
  if (formData.value.title.length < 3) {
    if (blur) errors.value.title = "Title must be at least 3 characters"
  } else {
    errors.value.title = null
  }
}

// 验证描述（最少 5 个字符）
const validateDescription = (blur) => {
  if (formData.value.description.trim().length < 5) {
    if (blur) errors.value.description = "Description at least 5 characters"
  } else {
    errors.value.description = null
  }
}

// 提交表单
const submitForm = () => {
  validateTitle(true)
  validateDescription(true)

  if (!errors.value.title && !errors.value.description) {
    activities.value.push({ ...formData.value })
    clearForm()
  }
}

// 清空表单
const clearForm = () => {
  formData.value = {
    title: "",
    description: "",
    location: "",
    status: "upcoming"
  }
}
</script>
