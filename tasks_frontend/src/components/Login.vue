<template>
  <AuthForm
    title="Login"
    :fields="fields"
    buttonText="Login"
    @submit="loginUser"
    toggleText="Don't have an account?"
    toggleLink="/register"
    toggleLinkText="Register here"
  />
</template>

<script>
import axios from "axios";
import AuthForm from "@/components/UI/AuthForm.vue";

export default {
  components: { AuthForm },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  computed: {
    fields() {
      return [
        { id: "username", label: "Username", type: "text", model: "username" },
        { id: "password", label: "Password", type: "password", model: "password" },
      ];
    },
  },
  methods: {
    async loginUser(formData) {
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/token/", {
          username: formData.username,
          password: formData.password,
        });

        if (response?.data?.access) {
          localStorage.setItem("access_token", response.data.access);
          this.$router.push("/tasks");
        } else {
          console.error("Invalid response structure:", response);
        }
      } catch (error) {
        console.error("Error logging in:", error.response?.data || error.message);
      }
    },
  },
};
</script>
