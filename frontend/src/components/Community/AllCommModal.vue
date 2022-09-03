<template>
  <div class="container mx-auto">
    <div class="flex justify-center">
      <div
        v-show="true"
        class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
      >
        <div class="max-w-2xl p-6 bg-white rounded-md shadow-xl w-3/5">
          <div class="flex justify-between">
            <h3 class="text-2xl">Community List</h3>
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
          <div>
            <div>
              <input
                placeholder="Search community"
                class="border-2 rounded-lg border-gray-500 w-full my-3 p-2"
                type="text"
                v-model="searchKey"
                @change="srcProd"
              />
            </div>
            <div class="h-96 overflow-auto cust-overflow-y-primary-color-grey">
              <div
                class="flex items-center w-full my-5 shadow-lg rounded-lg border p-3"
                v-for="index in srcProd()"
                :key="index._id"
              >
                <div class="w-24 px-2">
                  <img
                    :src="index.communityImage"
                    alt="Home community"
                    class="h-16 w-24 rounded-full"
                  />
                </div>
                <div class="mx-3">
                  <div class="flex">
                    <h3>{{ index.communityName }}</h3>
                    <p class="text-cyan-500 mx-3">{{ index.type }}</p>
                  </div>
                  <p>
                    {{ index.description }}
                  </p>
                </div>
                <div class="self-center w-44">
                  <div
                    class="self-center w-44"
                    v-if="
                      index.members.filter(
                        (_) => _.user._id == userDetails.user._id
                      ).length > 0
                    "
                  >
                    <button class="bg-cyan-300 px-5 py-1 w-full rounded-lg">
                      Request Sent
                    </button>
                  </div>
                  <div class="self-center w-44 text-center" v-else>
                    <button
                      class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-semibold rounded-full text-md py-2 px-8 text-center"
                      @click.prevent="joinComm(index._id)"
                    >
                      Join
                    </button>
                  </div>
                </div>

                <!-- <div class="self-center w-44">
                <button class="bg-red-500 px-5 py-1 w-full rounded-lg hover:bg-red-700">
                  Join Request
                </button>
              </div>  -->
                <!-- <div class="self-center w-44">
                <button class="bg-cyan-300 px-5 py-1 w-full rounded-lg ">
                  Request Send
                </button>
              </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AllCommModal",
  props: {
    toggle: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
      searchKey: "",
    };
  },
  computed: {
    ...mapState("comm", ["commList"]),
    ...mapState("auth", ["userDetails"]),
  },
  methods: {
    async joinComm(id) {
      let payload = {
        communityId: id,
      };
      await this.$store.dispatch("comm/joinCommunity", payload);
      await this.$store.dispatch("comm/getAllCOmmunity");
      await this.$store.dispatch("comm/getUserJoinComm");
    },
    srcProd() {
      let data = this.commList.length > 0 ? this.commList : [];

      return data.filter((item) =>
        item.communityName.toLowerCase().includes(this.searchKey.toLowerCase())
      );
    },
  },
  async created() {
    await this.$store.dispatch("comm/getAllCOmmunity");
  },
};
</script>

<style>
.cust-overflow-y-primary-color-grey {
  overflow-y: auto;
}
.cust-overflow-y-primary-color-grey::-webkit-scrollbar {
  width: 8px;
}
.cust-overflow-y-primary-color-grey::-webkit-scrollbar-thumb:hover {
  background: #c2c2c2;
}
.cust-overflow-y-primary-color-grey::-webkit-scrollbar-thumb {
  background: #dddddd;
  border-radius: 6px;
}
.cust-overflow-y-primary-color-grey::-webkit-scrollbar-track {
  box-shadow: inset 0 0 3px #31313126;
  border-radius: 6px;
}
</style>
