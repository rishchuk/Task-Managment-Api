<template>
  <div class="dialog" v-if="show" @click.stop="hideDialog">
    <div @click.stop class="dialog__content">
      <h3>{{ isEditMode ? "Edit Task" : "Create Task" }}</h3>
      <form @submit.prevent="submitForm">
        <input v-model="title" type="text" placeholder="Title" required />
        <textarea v-model="description" placeholder="Description" required></textarea>
        <select v-model="status">
          <option value="new">New</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit">{{ isEditMode ? "Update" : "Create" }}</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    task: {
      type: Object,
      default: null
    },
    isEditMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      title: "",
      description: "",
      status: "new",
    };
  },
  watch: {
    task: {
      immediate: true,
      handler(newTask) {
        if (newTask) {
          this.title = newTask.title;
          this.description = newTask.description;
          this.status = newTask.status;
        } else {
          this.title = "";
          this.description = "";
          this.status = "new";
        }
      }
    }
  },
  methods: {
    hideDialog() {
      this.$emit("update:show", false);
    },
    async submitForm() {
      const taskData = {
        title: this.title,
        description: this.description,
        status: this.status,
        id: this.task?.id,
      };
      this.$emit(this.isEditMode ? "update" : "create", taskData);

      if (!this.isEditMode) {
        this.title = "";
        this.description = "";
        this.status = "new";
      }

      this.hideDialog();
    }
  }
};
</script>

<style scoped>
.dialog {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0,0,0, 0.5);
    position: fixed;
    display: flex;
}
.dialog__content {
    margin: auto;
    background: white;
    border-radius: 12px;
    min-height: 50px;
    min-width: 300px;
    padding: 20px;
}

.dialog__content form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dialog__content input,
.dialog__content textarea,
.dialog__content select {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.dialog__content button {
  padding: 10px;
  background-color: #007fff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.dialog__content button:hover {
  background-color: #005fcc;
}
</style>
