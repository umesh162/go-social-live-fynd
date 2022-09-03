<template>
  <div class="container mx-auto">
    <div class="flex justify-center">
      <div
        v-show="true"
        class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
      >
        <div class="max-w-2xl p-6 bg-white rounded-md shadow-xl">
          <div class="flex items-center justify-between w-96">
            <h3 class="text-2xl">Edit Channel</h3>
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
            <div class="flex justify-center mb-4">
              <div class="">
                <div class="relative mb-4">
                  <img
                    :src="singleChannel.data.communityImage"
                    alt="Home community"
                    class="w-24 h-24 rounded-full"
                  />
                  <div
                    class="absolute right-0 -bottom-2"
                    v-on:click="$refs.file.click()"
                  >
                    <input
                      type="file"
                      ref="file"
                      style="display: none"
                      @change="onFileSelected"
                    />
                    <i class="fa-solid fa-pencil fa-lg"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="my-2">
              <input
                type="text"
                placeholder="Community name"
                class="w-full rounded-md"
                v-model="form.commName"
              />
            </div>
            <div class="my-2">
              <input
                type="text"
                placeholder="Community Description"
                class="w-full rounded-md"
                v-model="form.commDes"
              />
            </div>

            <div>
              <div class="flex items-center justify-center" v-if="!isLoading">
                <button
                  type="submit"
                  v-on:click.prevent="editCommunity"
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
import { mapState } from "vuex";
import Config from "@/config";
import axios from "axios";

export default {
  name: "EditChannel",
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
      form: {
        commName: "",
        commDes: "",
        commImg: "",
      },
    };
  },
  watch: {
    userDetails(val) {
      if (val) {
        this.form.commName = this.singleChannel.data.communityName;
        this.form.commDes = this.singleChannel.data.description;
      }
    },
  },
  computed: {
    ...mapState("comm", ["singleChannel"]),
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
    setValue() {
      this.form.commName = this.singleChannel.data.communityName;
      this.form.commDes = this.singleChannel.data.description;
      this.form.commImg = this.singleChannel.data.communityImage;
    },
    async editCommunity() {
      let payload = {
        communityId: this.singleChannel.data._id,
        communityName: this.form.commName,
        description: this.form.commDes,
        communityImage:
          this.imgS3Url !== null ? this.imgS3Url : this.form.commImg,
      };

      await this.$store.dispatch("comm/editCommunity", payload);
      this.toggle();
    },
  },
  mounted() {
    this.setValue();
  },
};
</script>

<style></style>
