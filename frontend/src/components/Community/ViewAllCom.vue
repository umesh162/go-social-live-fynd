<template>
  <div>
    <div
      class="fixed z-40 w-screen h-screen inset-0 bg-gray-900 bg-opacity-20"
    ></div>

    <!-- The dialog -->
    <div
      class="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md px-8 py-6 space-y-5 drop-shadow-lg"
    >
      <h1 class="text-2xl font-semibold w-96">All Comments</h1>
      <div
        class="py-5 border-t border-b border-gray-300 h-96 overflow-auto cust-overflow-y-primary-color-grey"
      >
        <div class="" v-for="item in allComments" :key="item._id">
          <div class="shadow-xl m-3 p-2">
            <div class="flex items-center py-1">
              <div class="w-24 px-2">
                <img
                  src="../../assets/home-comm.png"
                  alt="Home community"
                  class="h-12 w-12 rounded-full border-2"
                />
              </div>
              <div>
                <p>
                  {{
                    item.createdBy.user[0].firstname +
                    " " +
                    item.createdBy.user[0].lastname
                  }}
                </p>
              </div>
            </div>
            <div class="border-y-2">
              <div class="m-2 ml-16 w-96">
                <p>{{ item.Comment === " " ? "" : item.Comment }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-end">
        <!-- This button is used to close the dialog -->
        <button
          class="px-5 py-2 bg-indigo-500 hover:bg-indigo-700 text-white cursor-pointer rounded-md"
          @click="toggle"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ViewAllCom",
  props: {
    toggle: {
      type: Function,
      required: true,
    },
  },
  computed: {
    ...mapState("comm", ["allComments"]),
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
