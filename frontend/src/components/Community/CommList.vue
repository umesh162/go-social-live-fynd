<template>
  <div
    class="row-span-full border-slate-300 overflow-auto scroll-hidden before rounded-l-lg"
  >
    <!-- border-t-2 border-l-2 border-b-2 -->
    <div class="px-1 pb-1 pt-2">
      <h3 class="text-center text-lg font-semibold">Joined Community</h3>
      <div v-for="item in userJoinComm" :key="item._id" class="">
        <div
          class="flex items-center m-2 border-2 p-1 rounded-lg shadow-lg"
          v-on:click="singleChannel(item._id)"
        >
          <div class="w-16">
            <img
              :src="item.communityImage"
              alt="Home community"
              class="h-14 rounded-full"
            />
          </div>
          <div class="mx-5">
            <p>{{ item.communityName }}</p>
            <p>{{ item.type }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="height overflow-auto scroll-hidden">
      <div class="px-2">
        <div class="sticky top-0 bg-white p-5">
          <h3 class="text-center my-1 text-lg font-semibold">All Community</h3>
          <input
            type="text"
            placeholder="Search Community"
            class="w-full rounded-md"
            v-model="searchKey"
            @change="srcProd"
          />
        </div>
        <div
          class="flex items-center justify-evenly w-full my-3 shadow-lg rounded-lg border p-3"
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

          <!-- class="bg-blue-400 px-5 py-1 w-full rounded-lg hover:bg-blue-500" -->
          <!-- <div class="self-center w-44">
                <button class="bg-red-500 px-5 py-1 w-full rounded-lg hover:bg-red-700">
                  Join Request
                </button>
              </div>  -->
          <div
            class="self-center w-44"
            v-if="
              index.members.filter((_) => _.user._id == userDetails.user._id)
                .length > 0
            "
          >
            <button
              class="text-white bg-gradient-to-r from-yellow-500 to-slate-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-normal rounded-3xl text-sm py-2 px-4 text-center"
            >
              Request Sent
            </button>
          </div>
          <div class="self-center w-44 text-center" v-else>
            <button
              class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-semibold rounded-full text-md py-2 px-8 text-center"
              @click.prevent="joinNewChannel(index._id)"
            >
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CommList",
  data() {
    return { searchKey: "" };
  },
  computed: {
    ...mapState("comm", ["userJoinComm", "commList"]),
    ...mapState("auth", ["userDetails"]),
  },
  methods: {
    async singleChannel(id) {
      await this.$store.dispatch("comm/singleChannInfo", { _id: id });
      await this.$store.dispatch("comm/CommAllPost", { getByCommunity: id });
    },
    async joinNewChannel(id) {
      let payload = {
        communityId: id,
      };

      let response = await this.$store.dispatch("comm/joinCommunity", payload);
      if (response.code === 400) {
        this.$swal.fire(response.msg, "", "error");
      } else {
        this.$swal.fire(response.msg, "", "success");
        await this.$store.dispatch("comm/getAllCOmmunity");
        await this.$store.dispatch("comm/getUserJoinComm");
      }
    },
    srcProd() {
      let data = this.commList.length > 0 ? this.commList : [];

      return data.filter((item) =>
        item.communityName.toLowerCase().includes(this.searchKey.toLowerCase())
      );
    },
  },
};
</script>

<style>
.scroll-hidden {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
}

.scroll-hidden::-webkit-scrollbar {
  /* Firefox */
  display: none;
}

.height {
  height: 445px;
}
</style>
