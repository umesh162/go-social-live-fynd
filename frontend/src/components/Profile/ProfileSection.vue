<template>
  <div
    class="border-slate-300 overflow-auto row-span-full rounded-r-lg overflow-auto scroll-hidden"
  >
    <div>
      <div class="shadow-lg p-3 rounded-lg mt-5">
        <h3 class="text-left py-2 font-semibold">Profile Details</h3>
        <div class="grid justify-items-center">
          <div class="grid justify-center w-1/3">
            <img
              :src="userDetails.user.profile"
              alt="Home community"
              class="h-24 rounded-full"
            />
            <div class="text-center">
              <p class="">
                {{
                  user.user.firstname.toUpperCase() +
                  " " +
                  user.user.lastname.toUpperCase()
                }}
              </p>
            </div>
          </div>
        </div>
        <div class="flex justify-evenly m-2">
          <div>
            <!-- class="bg-blue-400 px-3 py-1 rounded" -->
            <button
              class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-semibold rounded-lg text-md py-1 px-5 text-center"
              @click="toggle"
            >
              <i class="fa-solid fa-plus"></i>
              Create Channel
            </button>
          </div>
          <div>
            <button
              class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-semibold rounded-lg text-md py-1 px-5 text-center"
              @click="editToggle"
            >
              <i class="fa-solid fa-pen-to-square"></i>
              Edit Profile
            </button>
          </div>
        </div>
      </div>
      <div v-show="singleChannel">
        <div class="shadow-lg p-3 rounded-lg">
          <h3 class="text-left py-2 font-semibold">Channel Details</h3>

          <div class="flex items-center">
            <div class="w-16">
              <img
                :src="singleChannel.data.communityImage"
                alt="Home community"
                class="h-16 rounded-full"
              />
            </div>
            <div class="flex flex-col flex-1 ml-2">
              <div>
                <span>{{ singleChannel.data.communityName }}</span>
                <span class="ml-2 text-blue-400">{{
                  singleChannel.data.type
                }}</span>
              </div>
              <p>
                {{ singleChannel.data.description }}
              </p>
              <p>
                Admin:
                <span
                  >{{ singleChannel.data.createdBy.user.firstname }}
                  {{ singleChannel.data.createdBy.user.lastname }}</span
                >
              </p>
            </div>
          </div>
          <div
            class="flex mt-2 w-11/12"
            :class="
              singleChannel.currentuser.role === 'owner'
                ? 'justify-between'
                : 'justify-center'
            "
          >
            <div class="w-36" v-if="singleChannel.currentuser.role === 'owner'">
              <button
                class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-semibold rounded-md text-md py-1 px-3 text-center w-56"
                @click="editChnToggle"
              >
                <i class="fa-solid fa-pen-to-square"></i>
                Edit Community
              </button>
            </div>
            <div class="w-40" v-if="singleChannel.currentuser.role !== 'owner'">
              <button
                class="text-white bg-gradient-to-r from-red-500 to-red-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-semibold rounded-md text-md py-1 px-3 text-center w-52"
                @click="leaveComm(singleChannel.data._id)"
              >
                <i class="fa-solid fa-pen-to-square"></i>
                leave Community
              </button>
            </div>
            <div class="w-40" v-if="singleChannel.currentuser.role === 'owner'">
              <button
                class="text-white bg-gradient-to-r from-red-500 to-red-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-semibold rounded-md text-md py-1 px-3 text-center w-52"
                @click="deleteComm(singleChannel.data._id)"
              >
                <i class="fa-regular fa-trash-can"></i>
                Delete Community
              </button>
            </div>
          </div>
        </div>

        <JoinRequest
          v-if="
            singleChannel.data.members.filter((_) => _.isAccepted == false)
              .length > 0 && singleChannel.currentuser.role !== 'member'
          "
        />
      </div>
    </div>
    <div v-show="visible">
      <CreateChannel :toggle="toggle" />
    </div>
    <div v-show="editVisible">
      <EditProfile :toggle="editToggle" />
    </div>
    <div v-show="editChannel">
      <EditChannel :toggle="editChnToggle" />
    </div>
  </div>
</template>

<script>
import JoinRequest from "../Community/JoinRequest.vue";
import EditProfile from "./EditProfile.vue";
import EditChannel from "../Community/EditChannel.vue";
import { mapState } from "vuex";
import CreateChannel from "../Community/CreateChannel.vue";
export default {
  name: "ProfileSection",
  components: { JoinRequest, EditProfile, EditChannel, CreateChannel },
  data() {
    return { visible: false, editVisible: false, editChannel: false };
  },
  computed: {
    ...mapState("comm", ["singleChannel", "userJoinComm"]),
    ...mapState("auth", ["user", "userDetails"]),
  },
  methods: {
    toggle() {
      this.visible = !this.visible;
    },
    editToggle() {
      this.editVisible = !this.editVisible;
    },
    editChnToggle() {
      this.editChannel = !this.editChannel;
    },
    checkRequest() {
      let data = this.singleChannel.data.members.filter(
        (_) => _.isAccepted == false
      );
      return data.length > 0;
    },
    async leaveComm(id) {
      let payload = {
        communityId: id,
      };

      let alertRes = await this.$swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, leave Channel!",
      });

      if (alertRes.isConfirmed) {
        let res = await this.$store.dispatch("comm/leaveCommunity", payload);
        if (res) {
          this.$swal.fire("Succfully Leave", "", "success");
          await this.$store.dispatch("comm/getAllCOmmunity");
          await this.$store.dispatch("comm/getUserJoinComm");
          if (this.userJoinComm.length > 0) {
            console.log("Enter Thissssss");
            await this.$store.dispatch("comm/singleChannInfo", {
              _id: this.userJoinComm[0]._id,
            });
          }
        } else {
          this.$swal.fire("Somthing Went Wrong", "", "error");
        }
      }
    },

    async deleteComm(id) {
      let payload = {
        communityId: id,
      };

      let alertRes = await this.$swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (alertRes.isConfirmed) {
        let res = await this.$store.dispatch("comm/deleteCommunity", payload);
        if (res) {
          this.$swal.fire("Succfully Leave", "", "success");
          await this.$store.dispatch("comm/getAllCOmmunity");
          await this.$store.dispatch("comm/getUserJoinComm");
        } else {
          this.$swal.fire("Somthing Went Wrong", "", "error");
        }
      }
    },

    async logout() {
      console.log("click");
      try {
        await this.$store.dispatch("auth/logoutAction");
      } catch (e) {
        console.log(e);
      }
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
</style>
