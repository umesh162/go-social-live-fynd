<template>
  <div class="shadow-lg p-3 rounded-lg mt-5">
    <div>
      <p class="text-left py-2 font-semibold">Joining Request</p>
    </div>

    <div v-for="item in reqCheck()" :key="item._id">
      <div
        class="flex items-center justify-between shadow-md rounded-md p-2 mt-2"
      >
        <p>{{ item.user.firstname + " " + item.user.lastname }}</p>
        <div class="flex w-28 justify-between">
          <div class="border-2 rounded-full bg-green-300">
            <button
              class="px-4 py-3"
              @click="joinRequest(item.user._id, 'true')"
            >
              <i class="fa-solid fa-check"></i>
            </button>
          </div>
          <div class="border-2 rounded-full bg-red-500">
            <button
              class="px-5 py-3"
              @click="joinRequest(item.user._id, 'false')"
            >
              <i class="fa-solid fa-xmark"></i>
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
  name: "JoinRequest",
  computed: {
    ...mapState("comm", ["singleChannel"]),
  },
  methods: {
    reqCheck() {
      let data = this.singleChannel.data.members.filter(
        (_) => _.isAccepted == false
      );
      return data;
    },

    async joinRequest(id, val) {
      let payload = {
        communityId: this.singleChannel.data._id,
        memberId: id,
        isAccept: val,
      };

      let res = await this.$store.dispatch("comm/acceptRequest", payload);

      if (res) {
        await this.$store.dispatch("comm/singleChannInfo", {
          _id: this.singleChannel.data._id,
        });
        this.$swal.fire("Request Rejected", "", "error");
      } else {
        await this.$store.dispatch("comm/singleChannInfo", {
          _id: this.singleChannel.data._id,
        });
        this.$swal.fire("Member Joined", "", "success");
      }
    },
  },
};
</script>

<style></style>
