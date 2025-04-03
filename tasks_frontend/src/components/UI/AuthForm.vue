<template>
  <div class="auth-container">
    <div class="auth-box">
      <h2>{{ title }}</h2>
      <form @submit.prevent.stop="handleSubmit">
        <div v-for="field in fields" :key="field.id" class="input-group">
          <label :for="field.id">{{ field.label }}</label>
          <input
            :type="field.type"
            v-model="formData[field.model]"
            :id="field.id"
            required
          />
        </div>
        <button type="submit" class="auth-button">{{ buttonText }}</button>
      </form>
      <p>
        {{ toggleText }}
        <router-link :to="toggleLink">{{ toggleLinkText }}</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    fields: Array,
    buttonText: String,
    toggleText: String,
    toggleLink: String,
    toggleLinkText: String,
  },
  data() {
    return {
      formData: {},
    };
  },
  created() {
    this.fields.forEach((field) => {
      this.formData[field.model] = "";
    });
  },
  methods: {
    handleSubmit(event) {
      this.$emit("submit", this.formData);
    },
  },
};
</script>

<style scoped>
body {
  margin: 0;
  background-color: #f4f4f4;
  display: flex;
  justify-content: center;
}

.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
}

.auth-box {
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
}

h2 {
  margin-bottom: 1rem;
}

.input-group {
  margin-bottom: 1rem;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.auth-button {
  width: 100%;
  padding: 10px;
  background-color: #007fff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.auth-button:hover {
  background-color: #0055b5;
}

p {
  margin-top: 10px;
}

a {
  color: #007fff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
