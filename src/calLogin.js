export default (apiUrl) => ({
  credentials: {
    username: {
      value: "",
      invalid: false,
      errorMessage: "",
    },
    password: {
      value: "",
      invalid: false,
      errorMessage: "",
    },
  },
  isLoading: false,
  errorMessage: "",
  passwordNeeded: false,

  async login() {
    this.isLoading = true;
    const credentials = {
      name: this.credentials.username.value,
    };
    this.credentials.password.value &&
      (credentials.password = this.credentials.password.value);

    try {
      this.errorMessage = "";
      // this.passwordNeeded = false;
      this.credentials.username.invalid = false;
      this.credentials.password.invalid = false;
      this.credentials.password.errorMessage = "";
      this.credentials.username.errorMessage = "";

      const response = await fetch(`${apiUrl}/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      if (response.ok) {
        window.location.href = "./";
      }

      const data = await response.json();
      console.log(data);
      if (response.status == 400) {
        switch (data.code) {
          case "auth-010":
            this.credentials.password.errorMessage = "Wrong password";
            this.credentials.password.invalid = true;
            break;
          case "auth-011":
            this.credentials.username.errorMessage = "Unknown user";
            this.credentials.username.invalid = true;
            this.credentials.password.value = "";
            this.passwordNeeded = false;
            break;
          case "auth-012":
            this.errorMessage = "Admin user must have a password";
            this.passwordNeeded = true;
            break;
          default:
            this.errorMessage = data.message;
        }
      }
    } catch (error) {
      console.error(error);
      this.errorMessage = error.message;
    } finally {
      this.isLoading = false;
    }
  },
});
