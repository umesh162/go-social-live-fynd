<template>
  <div class="container w mx-auto">
    <div class="flex justify-center">
      <div
        v-show="true"
        class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 bg-opa"
      >
        <div class="max-w-2xl p-6 bg-white rounded-md shadow-xl">
          <div class="flex items-center justify-between w-80">
            <h3 class="text-2xl">Create Channel</h3>
            <svg
              @click="toggle"
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8 text-red-900 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <form class="mt-4" @submit.prevent="handleSubmit()">
            <div class="flex justify-center">
              <div
                class="flex items-center justify-center w-full h-60 border-2 border-dashed border-red-400"
              >
                <input type="file" @change="onFileSelected" accept="image/*" />
              </div>
            </div>
            <div class="my-2">
              <input
                type="text"
                placeholder="Channel Name"
                class="w-full rounded-md"
                v-model="form.channelName"
                @blur="$v.form.channelName.$touch()"
              />
              <div v-if="$v.form.channelName.$error">
                <div v-if="!$v.form.channelName.required" class="error-message">
                  <small>This field can't be empty</small>
                </div>
                <div
                  v-if="!$v.form.channelName.minLength"
                  class="error-message"
                >
                  <small>min 4 character needs</small>
                </div>
              </div>
            </div>
            <div class="my-2">
              <input
                type="text"
                placeholder="Description"
                class="w-full rounded-md"
                v-model="form.des"
                @blur="$v.form.des.$touch()"
              />
              <div v-if="$v.form.des.$error">
                <div v-if="!$v.form.des.required" class="error-message">
                  <small>This field can't be empty</small>
                </div>
                <div v-if="!$v.form.des.minLength" class="error-message">
                  <small>min 10 character needs</small>
                </div>
              </div>
            </div>
            <div class="flex justify-around my-2 w-full gap-3">
              <button
                class="w-40 py-2 border border-blue-600 rounded"
                :class="
                  form.channelType === 'public'
                    ? 'bg-blue-600 text-white'
                    : 'border-blue-600 text-blue-800 '
                "
                v-on:click.prevent="selectType('public')"
              >
                Public
              </button>
              <button
                class="w-40 py-2 border border-blue-600 rounded"
                :class="
                  form.channelType === 'private'
                    ? 'bg-blue-600 text-white'
                    : 'border-blue-600 text-blue-800 '
                "
                v-on:click.prevent="selectType('private')"
              >
                Private
              </button>
            </div>

            <div>
              <div class="flex items-center justify-center" v-if="!isLoading">
                <button
                  type="submit"
                  class="inline-flex items-center px-10 py-2 text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out bg-blue-600 rounded-md shadow hover:bg-blue-500"
                >
                  Submit
                </button>
              </div>
              <div class="flex items-center justify-center" v-else>
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
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Config from "@/config";
import axios from "axios";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "CreateChannel",
  props: {
    toggle: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
      selectedFile: null,
      imgS3Url: null,
      isLoading: false,
      form: { channelName: "", des: "", channelType: "public" },
    };
  },
  validations: {
    form: {
      channelName: { required, minLength: minLength(4) },
      des: { required, minLength: minLength(12) },
    },
  },
  methods: {
    async onFileSelected(e) {
      this.selectedFile = e.target.files[0];
      let payload = new FormData();
      payload.append("image", this.selectedFile);
      this.isLoading = true;
      let response = await axios.post(
        `${Config.baseUrl}/s3Path/ImgUrl`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      this.isLoading = false;

      this.imgS3Url = response.data.imageUrl;
    },

    selectType(type) {
      this.form.channelType = type;
    },

    async handleSubmit() {
      let payload = {
        communityName: this.form.channelName,
        description: this.form.des,
        communityImage: this.imgS3Url,
        type: this.form.type,
      };
      this.isLoading = true;
      let res = await this.$store.dispatch("comm/createCommunity", payload);
      if (res) {
        this.isLoading = false;
        this.toggle();
        this.$swal.fire("Succesfully Community Created", "", "success");
        await this.$store.dispatch("comm/getUserJoinComm");
      } else {
        this.isLoading = false;
        this.$swal.fire("Something Went Wrong", "", "error");
      }
    },
  },
};
</script>

<style>
@media (max-width: 575px) {
  .bg-opa {
    height: 107vh;
  }
}
@media (min-width: 576px) {
  .bg-opa {
    height: 110vh;
  }
}
</style>
