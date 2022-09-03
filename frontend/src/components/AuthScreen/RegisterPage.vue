<template>
  <section class="h-screen">
    <div class="px-6 h-full text-gray-800">
      <div
        class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
      >
        <div
          class="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 mb-12 md:mb-0 hidden-img"
        >
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            class="w-full"
            alt="Sample image"
          />
        </div>
        <div class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0 add-p">
          <form @submit.prevent="signUp()">
            <!-- Email input -->
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="firstname"
              >
                Firstname
              </label>
              <input
                type="text"
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="First Name"
                v-model="firstName"
                @blur="$v.firstName.$touch()"
              />
            </div>
            <div v-if="$v.firstName.$error">
              <div v-if="!$v.firstName.required" class="error-message">
                <small class="text-red-600"
                  >The FirstName field is required</small
                >
              </div>
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="lastname"
              >
                Last Name
              </label>
              <input
                type="text"
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlInput2"
                placeholder="last Name"
                v-model="lastName"
                @blur="$v.lastName.$touch()"
              />
            </div>
            <div v-if="$v.lastName.$error">
              <div v-if="!$v.lastName.required" class="error-message">
                <small class="text-red-600"
                  >The Last Name field is required</small
                >
              </div>
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Email
              </label>
              <input
                type="text"
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlInput2"
                placeholder="Email address"
                v-model="email"
                @blur="$v.email.$touch()"
              />
            </div>
            <div v-if="$v.email.$error">
              <div v-if="!$v.email.required" class="error-message">
                <small class="text-red-600">The email field is required</small>
              </div>
              <div v-if="!$v.email.email" class="error-message">
                <small class="text-red-600">Invalid email address</small>
              </div>
            </div>

            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="phone"
              >
                Phone
              </label>
              <input
                type="text"
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlInput2"
                placeholder="Phone Number"
                v-model="phone"
                @blur="$v.phone.$touch()"
              />
            </div>
            <div v-if="$v.phone.$error">
              <div v-if="!$v.phone.required" class="error-message">
                <small class="text-red-600">The phone field is required</small>
              </div>
            </div>

            <!-- Password input -->
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="password"
              >
                Password
              </label>
              <input
                type="password"
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlInput2"
                placeholder="Password"
                v-model="password"
                @blur="$v.password.$touch()"
              />
            </div>
            <div v-if="$v.password.$error">
              <div v-if="!$v.password.required" class="error-message">
                <small class="text-red-600"
                  >The password field is required</small
                >
              </div>
              <div v-if="!$v.password.minLength" class="error-message">
                <small class="text-red-600"
                  >The password must have at least 8 characters</small
                >
              </div>
              <div v-if="!$v.password.containsUppercase" class="error-message">
                <small class="text-red-600"
                  >The password must have at least 1 uppercase character</small
                >
              </div>
              <div v-if="!$v.password.containsLowercase" class="error-message">
                <small class="text-red-600"
                  >The password must have at least 1 lowercase character</small
                >
              </div>
              <div v-if="!$v.password.containsNumber" class="error-message">
                <small class="text-red-600"
                  >The password must have at least 1 digit</small
                >
              </div>
              <div v-if="!$v.password.containsSpecial" class="error-message">
                <small class="text-red-600"
                  >The password must have at least 1 special character</small
                >
              </div>
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="password"
              >
                Confirm Password
              </label>
              <input
                type="password"
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlInput2"
                placeholder="Password"
                v-model="confirmPassword"
                @blur="$v.confirmPassword.$touch()"
              />
            </div>

            <div class="text-center lg:text-left">
              <div>
                <div class="flex items-center justify-start" v-if="!isLoading">
                  <button
                    type="submit"
                    v-on:click.prevent="signUp"
                    class="inline-flex items-center px-10 py-2 text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out bg-blue-600 rounded-md shadow hover:bg-blue-500"
                  >
                    Sign Up
                  </button>
                </div>
                <div class="flex items-center justify-start" v-else>
                  <button
                    type="button"
                    class="inline-flex items-center px-3 py-2 text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out bg-blue-600 rounded-md shadow opacity-50 cursor-not-allowed"
                    disabled="true"
                  >
                    <svg
                      class="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Loading...
                  </button>
                </div>
              </div>
              <p class="text-sm font-semibold mt-2 pt-1 mb-0">
                Already have an account?
                <router-link
                  to="/"
                  class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                  >Login</router-link
                >
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  name: "RegisterPage",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      isLoading: "",
    };
  },
  validations: {
    firstName: {
      required,
    },
    lastName: {
      required,
    },
    email: {
      required,
      email,
    },
    phone: {
      required,
    },
    password: {
      required,
      minLength: minLength(8),
      containsUppercase: function (value) {
        return /[A-Z]/.test(value);
      },
      containsLowercase: function (value) {
        return /[a-z]/.test(value);
      },
      containsNumber: function (value) {
        return /[0-9]/.test(value);
      },
      containsSpecial: function (value) {
        return /[#?!@$%^&*-]/.test(value);
      },
    },
    confirmPassword: {
      required,
      sameAs: sameAs("password"),
    },
  },
  methods: {
    async signUp() {
      if (
        this.firstName &&
        this.lastName &&
        this.email &&
        this.phone &&
        this.password &&
        this.confirmPassword
      ) {
        if (this.password === this.confirmPassword) {
          let payload = {
            firstname: this.firstName,
            lastname: this.lastName,
            phone: this.phone,
            email: this.email,
            password: this.password,
          };
          this.isLoading = true;
          let response = await this.$store.dispatch(
            "auth/registerUserAction",
            payload
          );
          if (response.code === 400) {
            this.isLoading = false;
            this.$swal.fire(response.msg, "", "error");
          } else {
            this.isLoading = false;
            this.$swal.fire(response.msg, "", "success");
            this.$router.push({ name: "login" });
          }
        } else {
          alert("Password and confirm password does not match");
        }
      } else {
        alert("Please fill all the fields");
      }
    },
  },
};
</script>

<style>
@media screen and (max-width: 600px) {
  .hidden-img {
    display: none;
  }
  .add-p {
    padding: 30px;

    --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px -4px rgb(0 0 0 / 0.1);
    --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color),
      0 4px 6px -4px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    border: 2px gray;
    border-radius: 10px;
  }
}
</style>
