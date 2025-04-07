<template>
  <div class="task-container">
    <div class="task-box">
      <div class="task-content">
        <h2>Task List</h2>

        <ul class="task-list">
          <li v-for="task in tasks" :key="task.id" class="task-item">
            <h3>{{ task.title }}</h3>
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
        <router-link class="task-link" to="/tasks/create">+ Create a new task</router-link>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      tasks: [],
      next: null,
      prev: null,
      baseUrl: "http://127.0.0.1:8000/api/tasks/?limit=3",
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
  width: 500px;
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
}

.task-link:hover {
  text-decoration: underline;
}
</style>
