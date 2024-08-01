<template>
  <div class="library-dashboard">
    <el-button class="logout-button" type="danger" @click="onLogout">Logout</el-button>
    <el-card class="welcome-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span class="card-header">User Dashboard</span>
      </div>
      <el-table :data="books" style="width: 100%">
        <el-table-column prop="title" label="Book Title" />
        <el-table-column prop="author" label="Author" />
        <el-table-column prop="year" label="Year" />
        <el-table-column label="Actions">
          <template #default="scope">
            <el-button 
              type="primary" 
              @click="onBorrow(scope.row)" 
              :disabled="scope.row.borrowed"
            >
              {{ scope.row.borrowed ? 'Borrowed' : 'Borrow' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const books = ref([])
const store = useStore()
const router = useRouter()

const fetchBooks = async () => {
  await store.dispatch('fetchBooks')
  books.value = store.state.books
}

const onBorrow = async (book) => {
  try {
    await store.dispatch('borrowBook', book.id)
    await Swal.fire({
      title: 'Success',
      text: `You have borrowed "${book.title}" successfully!`,
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#3085d6',
      timer: 2000
    })
    fetchBooks() // Refresh the book list
  } catch (error) {
    console.error('Borrow action failed:', error)
    Swal.fire({
      title: 'Error',
      text: 'Failed to borrow the book. Please try again.',
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor: '#e53e3e',
    })
  }
}

const onLogout = () => {
  store.dispatch('logout').then(() => {
    router.push('/login')
  }).then(() => {
    Swal.fire({
      title: 'Logged out',
      text: 'You have been logged out successfully!',
      icon: 'info',
      confirmButtonText: 'OK',
      confirmButtonColor: '#3085d6',
      timer: 2000
    })
  })
}

// Display welcome message when routed to this page
onMounted(() => {
  fetchBooks()
  Swal.fire({
    title: 'Welcome!',
    text: 'Welcome User!',
    icon: 'success',
    confirmButtonText: 'OK',
    confirmButtonColor: '#3085d6',
    timer: 3000
  })
})
</script>

<style scoped>
.library-dashboard {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('@/assets/adminbg.jpg'); /* Use the same background image as admin dashboard */
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
  background: rgba(255, 255, 255, 0.8); /* Slightly translucent background for the card */
}

.card-header {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}
</style>
