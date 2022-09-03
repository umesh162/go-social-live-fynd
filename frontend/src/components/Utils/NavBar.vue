<template>
  <div class="w-full mt-2">
    <div
      class="flex flex-row h-14 border-2 shadow-2xl rounded-3xl nav-wid items-center"
    >
      <div class="flex-1 px-4">
        <h3 class="font-bold text-xl">
          Go<span class="text-blue-500">Social</span>
        </h3>
      </div>

      <div class="mx-1">
        <button
          @click="logout"
          type="button"
          class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-semibold rounded-full text-md py-2 px-8 text-center"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  Name: "Navbar",
  methods: {
    async logout() {
      let res = await this.$store.dispatch("auth/logout");
      if (res) {
        this.$swal.fire("Successfully Logout", "", "success");
        this.$router.push({ name: "login" });
      }
    },
  },
};
</script>

<style>
.nav-wid {
  width: 95%;
  margin: 0 auto;
}
</style>
