<template>
  <div class="container mx-auto">
    <div class="flex justify-center">
      <div
        v-show="true"
        class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
      >
        <form class="max-w-2xl p-6 bg-white rounded-md shadow-xl">
          <div class="flex items-center justify-between w-96">
            <h3 class="text-2xl">Create Post</h3>
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
          <form class="mt-4">
            <div class="flex justify-center">
              <div
                class="flex items-center justify-center w-full h-60 border-2 border-dashed border-red-400"
              >
                <input type="file" @change="onFileSelected" accept="image/*" />
              </div>
            </div>

            <div class="my-2">
              <textarea
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
            <div>
              <label>Choose Community</label>
              <fieldset v-for="item in userJoinComm" :key="item._id">
                <div class="flex items-center mb-4">
                  <input
                    type="radio"
                    :value="item._id"
                    v-model="form.channelChoose"
                    class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="country-option-1"
                    class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {{ item.communityName }}
                  </label>
                </div>
              </fieldset>
            </div>
          </form>
          <div>
            <div class="flex items-center justify-center" v-if="!isLoading">
              <button
                type="submit"
                class="inline-flex items-center px-10 py-2 text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out bg-blue-600 rounded-md shadow hover:bg-blue-500"
                v-on:click.prevent="handleSubmit"
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
</template>

<script>
import { mapState } from "vuex";
import Config from "@/config";
import axios from "axios";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "CreatePost",
  props: {
    toggle: {
      type: Function,
      required: true,
    },
  },
  computed: {
    ...mapState("comm", ["singleChannel", "userJoinComm"]),
  },
  data() {
    return {
      isOpen: false,
      des: "",
      selectedFile: null,
      imgS3Url: null,
      isLoading: false,
      form: {
        channelId: "",
        des: "",
        channelChoose: "",
      },
    };
  },
  validations: {
    form: {
      des: { required, minLength: minLength(12) },
    },
  },
  methods: {
    async onFileSelected(e) {
      this.selectedFile = e.target.files[0];
      console.log(this.selectedFile);
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

    async handleSubmit() {
      let payload = {
        communityName: this.form.channelChoose,
        title: this.form.des,
        Image: this.imgS3Url,
      };

      let response = await this.$store.dispatch("comm/CreatePost", payload);
      if (response.code === 400) {
        this.$swal.fire(response.msg, "", "error");
      } else {
        this.$swal.fire("Post Created", "", "success");
        await this.$store.dispatch("comm/singleChannInfo", {
          _id: this.form.channelChoose,
        });

        await this.$store.dispatch("comm/CommAllPost", {
          getByCommunity: this.form.channelChoose,
        });
        this.toggle();
      }
    },
  },
};
</script>

<style></style>
