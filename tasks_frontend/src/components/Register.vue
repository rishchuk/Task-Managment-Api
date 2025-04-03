<template>
  <AuthForm
    title="Register"
    :fields="fields"
    buttonText="Register"
    @submit="registerUser"
    toggleText="Already have an account?"
    toggleLink="/login"
    toggleLinkText="Login here"
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
      email: "",
      password: "",
      password2: "",
    };
  },
  computed: {
    fields() {
      return [
        { id: "username", label: "Username", type: "text", model: "username" },
        { id: "email", label: "Email", type: "email", model: "email" },
        { id: "password", label: "Password", type: "password", model: "password" },
        { id: "password2", label: "Confirm Password", type: "password", model: "password2" },
      ];
    },
  },
  methods: {
    async registerUser(formData) {
      if (!formData.username || !formData.email || !formData.password || !formData.password2) {
        console.error("All fields must be filled in!");
        return;
      }
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/register/", {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          password2: formData.password2,
        });

        this.$router.push("/login");
      } catch (error) {
        console.error("Error registering user:", error.response?.data || error.message);
      }
    },
  },
};
</script>
