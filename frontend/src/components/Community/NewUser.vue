<template>
  <div class="mt-10">
    <div>
      <img
        src="../../assets/home-comm.png"
        alt="Home community"
        class="h-80 mx-auto"
      />
      <p class="mt-6 text-xl font-semibold text-center">Let's get Started!</p>
      <p class="mt text-lg font-semibold text-center">
        Start your activity by creating first channel or joining or any existing
        channel
      </p>
      <div class="text-center">
        <div class="flex mx-auto justify-evenly mt-6 w-3/12">
          <button
            type="button"
            class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-semibold rounded-lg text-md py-3 px-5 text-center w-40"
            @click="newToggle"
          >
            New Channel
          </button>
          <button
            type="button"
            class="text-black bg-gradient-to-r from-slate-100 to-slate-300 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-semibold rounded-lg text-md py-3 px-5 text-center w-40"
            @click="joinToggle"
          >
            Join channel
          </button>
        </div>
      </div>
    </div>
    <div v-if="newToggleClick">
      <CreateChannel :toggle="newToggle" />
    </div>
    <div v-if="joinToggleClick">
      <AllCommModal :toggle="joinToggle" />
    </div>
  </div>
</template>

<script>
import CreateChannel from "./CreateChannel.vue";
import AllCommModal from "./AllCommModal.vue";
export default {
  name: "NewUser",
  components: { CreateChannel, AllCommModal },
  data() {
    return {
      newToggleClick: false,
      joinToggleClick: false,
    };
  },
  methods: {
    newToggle() {
      this.newToggleClick = !this.newToggleClick;
    },
    joinToggle() {
      this.joinToggleClick = !this.joinToggleClick;
    },
    getAll() {
      console.log("Get All community call");
    },
  },
  async mounted() {
    this.getAll();
  },
};
</script>

<style></style>
