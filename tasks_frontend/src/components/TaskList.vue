<template>
  <div class="task-container">
    <Dialog v-model:show="dialogVisible" @create="createTask"/>
    <div class="task-box">
      <div class="task-content">
        <h2>Task List</h2>

        <ul class="task-list">
          <li v-for="task in tasks" :key="task.id" class="task-item">
            <div class="task-header">
              <h3>{{ task.title }}</h3>
              <div class="task-actions">
                <button>&#x270E;️</button>
                <button @click="deleteTask(task.id)">&#x2716;</button>
              </div>
            </div>
            <p>{{ task.description }}</p>
            <p><strong>Status:</strong> {{ task.status }}</p>
          </li>
        </ul>
      </div>

      <div class="task-footer">
        <div class="pagination">
          <button @click="fetchTasks(prev)" :disabled="!prev">Previous</button>
          <button @click="fetchTasks(next)" :disabled="!next">Next</button>
        </div>
        <button class="task-link" @click="showDialog">+ Create a new task</button>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import Dialog from "@/components/UI/Dialog.vue";

export default {
  components: { Dialog },
  data() {
    return {
      tasks: [],
      next: null,
      prev: null,
      baseUrl: "http://127.0.0.1:8000/api/tasks/?limit=3",
      dialogVisible: false,
    };
  },
  async created() {
    await this.fetchTasks(this.baseUrl);
  },
  methods: {
    async fetchTasks(url) {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        this.tasks = response.data.results;
        this.next = response.data.next;
        this.prev = response.data.previous;
      } catch (error) {
        console.error("Error fetching tasks:", error.response?.data || error.message);
      }
    },
    async deleteTask(id) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/tasks/${id}/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        await this.fetchTasks(this.baseUrl);
      } catch (error) {
        console.error("Delete error:", error.response?.data || error.message);
      }
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async createTask(newTask) {
      try {
        await axios.post("http://127.0.0.1:8000/api/tasks/", newTask, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        await this.fetchTasks(this.baseUrl);
      } catch (error) {
        console.error("Create error:", error.response?.data || error.message);
      }
    },
  },
};
</script>

<style>
body {
  margin: 0;
  background-color: #f4f4f4;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.task-box {
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 520px;
  max-height: 85vh;
  min-height: 85vh;
  display: flex;
  overflow-y: auto;
  text-align: left;
  flex-direction: column;
}

.task-box h2 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.task-list {
  padding: 0;
}

.task-item {
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

.task-item:last-child {
  border-bottom: none;
}

.task-content {
  overflow-y: auto;
  flex-grow: 1;
  margin-bottom: 1rem;
}

.task-header {
  display: flex;
  justify-content: space-between;
}

.task-actions {
  display: flex;
  gap: 0.5rem;
}

.task-actions button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
}

.task-actions button:hover {
  color: #ff4d4d;
}

.task-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.pagination button {
  padding: 8px 12px;
  border: none;
  background-color: #007fff;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: default;
}

.task-link {
  display: inline-block;
  margin-top: 1.5rem;
  text-decoration: none;
  color: #007fff;
  font-weight: bold;
  font-size: 1.1rem;
  background: none;
  border: none;
}

.task-link:hover {
  text-decoration: underline;
}
</style>
