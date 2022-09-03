<template>
  <div
    class="border-slate-300 overflow-auto row-span-full scroll-hidden h-screen post-hei"
  >
    <!-- border-y-2 -->
    <div class="">
      <div v-if="commPost.length > 0">
        <!-- <div class="py-10 bg-white top-0 sticky">
          <p class="text-center font-bold text-lg">Post</p>
        </div> -->
        <div>
          <div v-for="item in commPost" :key="item._id">
            <div class="m-4 border-2 rounded-lg pt-3 shadow-lg">
              <div class="flex items-center px-3 pb-1">
                <div class="rounded-full w-16">
                  <img
                    src="../../assets/home-comm.png"
                    alt="Home community"
                    class="h-14"
                  />
                </div>
                <div class="flex-1 mx-4">
                  <h3>
                    {{
                      item.createdBy.user[0].firstname +
                      " " +
                      item.createdBy.user[0].lastname
                    }}
                  </h3>
                  <p>Posted 2 hours ago</p>
                </div>
                <div
                  v-show="item.createdBy.user[0]._id === userDetails.user._id"
                >
                  <button @click="deletePost(item._id)">
                    <i class="fa-regular fa-trash-can"></i>
                  </button>
                </div>
              </div>
              <div class="border-y-2">
                <img
                  :src="item.Image"
                  alt="Home community"
                  class="object-contain p-2 bg-slate-50 h-64 w-full"
                />
                <div class="w-full">
                  <p class="px-3">{{ item.title }}</p>
                </div>
              </div>
              <div class="flex items-center justify-around pt-2">
                <div>
                  <button
                    class=""
                    v-on:click.prevent="
                      item.isLike ? postUnlike(item._id) : postLike(item._id)
                    "
                  >
                    <i
                      class="fa-solid fa-heart"
                      style="color: blue"
                      v-if="checkMyLink(item)"
                    ></i>
                    <i class="fa-regular fa-heart" v-else></i>
                    <span class="mx-1">{{ item.likeCount }}</span>
                    Like
                  </button>
                </div>
                <div>
                  <button>
                    <i class="fa-regular fa-comment"></i>
                    <span class="mx-1">{{ item.comments.length }}</span>
                    Comments
                  </button>
                </div>
              </div>
              <div>
                <div
                  class="flex border-2 border-slate-300 p-1 gap-2 rounded-full m-2 mb-0"
                >
                  <input
                    type="text"
                    placeholder="Comments"
                    class="flex-1 border-transparent focus:border-transparent focus:ring-0 rounded-full"
                    v-model="commTxt"
                  />

                  <!-- @click.prevent="commentOnPost(item._id)" -->

                  <button
                    type="submit"
                    class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-semibold rounded-full text-md py-1 px-5 text-center"
                    @click.prevent="commentOnPost(item._id)"
                  >
                    <!-- class="px-5 bg-blue-400 rounded-3xl hover:bg-blue-500" -->
                    Post
                  </button>
                </div>
                <div class="w-full text-center mt-2 bg-slate-200">
                  <button @click="viewComm(item.comments)" class="py-2">
                    View All Comments
                  </button>
                </div>
                <div v-show="showComments" class="bg-opacity-20">
                  <ViewAllCom :toggle="commToggle" />
                </div>
              </div>
            </div>
          </div>

          <div class="bottom-24 sticky btn-bottom">
            <button
              class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-semibold rounded-full text-md px-6 py-5 text-center absolute right-0 bottom-0"
              @click="toggle"
            >
              <!-- class="bg-blue-400 px-6 py-5 rounded-full absolute bottom-2
              right-0 hover:bg-slate-400 active:bg-slate-400 focus:outline-none" -->

              <i class="fa-solid fa-plus fa-lg"></i>
            </button>
          </div>
          <div class="max-screen">
            <button
              class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-semibold rounded-full text-md px-6 py-5 text-center absolute plus-btn"
              @click="toggle"
            >
              <!-- class="bg-blue-400 px-6 py-5 rounded-full absolute bottom-2
              right-0 hover:bg-slate-400 active:bg-slate-400 focus:outline-none" -->

              <i class="fa-solid fa-plus fa-lg"></i>
            </button>
          </div>
        </div>
      </div>
      <div v-else class="">
        <div>
          <img
            src="../../assets/CommunityHome.png"
            class="w-full h-96"
            alt="Sample image"
          />
        </div>
        <p class="text-center font-semibold text-xl">
          Be the first to upload a new post
        </p>
        <div class="text-center my-5">
          <button
            @click="toggle"
            class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-semibold rounded-full text-md py-2 px-8 text-center"
          >
            Create Post
          </button>
        </div>
      </div>
      <div v-if="visible" class="">
        <CreatePost :toggle="toggle" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CreatePost from "./CreatePost.vue";
import ViewAllCom from "./ViewAllCom.vue";
export default {
  name: "PostSection",
  components: { CreatePost, ViewAllCom },
  data() {
    return { visible: false, showComments: false, commTxt: "" };
  },
  computed: {
    ...mapState("comm", ["commPost", "singleChannel"]),
    ...mapState("auth", ["userDetails"]),
  },

  methods: {
    toggle() {
      this.visible = !this.visible;
    },
    commToggle() {
      this.showComments = !this.showComments;
    },
    checkMyLink(item) {
      return !!item.isLike;
    },
    async viewComm(item) {
      await this.$store.dispatch("comm/allComments", item);
      this.commToggle();
    },

    async deletePost(id) {
      let payload = {
        postId: id,
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
        await this.$store.dispatch("comm/DeletePost", payload);
        this.$swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
      await this.$store.dispatch("comm/CommAllPost", {
        getByCommunity: this.singleChannel.data._id,
      });
    },
    async postLike(id) {
      let payload = {
        postId: id,
      };
      await this.$store.dispatch("comm/LikePost", payload);
      await this.$store.dispatch("comm/singleChannInfo", {
        _id: this.singleChannel.data._id,
      });
      await this.$store.dispatch("comm/CommAllPost", {
        getByCommunity: this.singleChannel.data._id,
      });
    },

    async postUnlike(id) {
      let payload = {
        postId: id,
      };
      await this.$store.dispatch("comm/UnLikePost", payload);
      await this.$store.dispatch("comm/CommAllPost", {
        getByCommunity: this.singleChannel.data._id,
      });
    },

    async commentOnPost(id) {
      let payload = {
        postId: id,
        comment: this.commTxt,
      };

      let res = await this.$store.dispatch("comm/Comment", payload);
      if (res) {
        this.commTxt = "";
        await this.$store.dispatch("comm/singleChannInfo", {
          _id: this.singleChannel.data._id,
        });
        await this.$store.dispatch("comm/CommAllPost", {
          getByCommunity: this.singleChannel.data._id,
        });

        this.$swal.fire("successfully comment on post ", "", "success");
      } else {
        this.$swal.fire("Somthing Went Wrong", "", "error");
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

@media (max-width: 575px) {
  .post-hei {
    height: auto;
  }
  .btn-bottom {
    display: none;
  }
  .plus-btn {
    bottom: 12px;
    right: 20px;
  }
}

@media (min-width: 576px) {
  .max-screen {
    display: none;
  }
}
</style>
