<template>
  <div class="library-dashboard">
    <el-button class="logout-button" type="danger" @click="onLogout">Logout</el-button>
    <el-card class="welcome-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span class="card-header">Library Dashboard</span>
      </div>
      <el-form :model="form" label-width="auto" style="max-width: 600px; margin: auto;">
        <el-form-item label="Book Name">
          <el-input v-model="form.name" placeholder="Enter the book name" />
        </el-form-item>
        <el-form-item label="Category">
          <el-select v-model="form.category" placeholder="Select category">
            <el-option label="Fiction" value="fiction" />
            <el-option label="Non-Fiction" value="non-fiction" />
            <el-option label="Science" value="science" />
            <el-option label="Technology" value="technology" />
          </el-select>
        </el-form-item>
        <el-form-item label="Author">
          <el-input v-model="form.author" placeholder="Enter the author name" />
        </el-form-item>
        <el-form-item label="Publish Date">
          <el-date-picker v-model="form.publishDate" type="date" placeholder="Select publish date" style="width: 100%;" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onBorrow">Borrow</el-button>
          <el-button type="success" @click="onBuy">Buy</el-button>
          <el-button type="danger" @click="onSell">Sell</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const form = reactive({
  name: '',
  category: '',
  author: '',
  publishDate: '',
})

const store = useStore()
const router = useRouter()

const onBorrow = () => {
  ElMessage({
    message: 'Book borrowed successfully!',
    type: 'success',
    duration: 2000
  })
}

const onBuy = () => {
  ElMessage({
    message: 'Book bought successfully!',
    type: 'success',
    duration: 2000
  })
}

const onSell = () => {
  ElMessage({
    message: 'Book sold successfully!',
    type: 'success',
    duration: 2000
  })
}

const onLogout = () => {
  store.dispatch('logout').then(() => {
    ElMessage({
      message: 'Logged out successfully!',
      type: 'success',
      duration: 2000
    })
    router.push('/login')
  })
}

// Display welcome message when routed to this page
onMounted(() => {
  ElMessage({
    message: 'Welcome User!',
    type: 'success',
    duration: 3000
  })
})
</script>

<style scoped>
.library-dashboard {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('path/to/your/background-image.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
}

.logout-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #e53e3e; /* Red background */
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 0.9rem; /* Slightly smaller font size */
  transition: background-color 0.2s ease;
}

.welcome-card {
  width: 80%;
  max-width: 600px;
  margin: auto;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.card-header {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-button {
  margin-right: 10px;
}
</style>
