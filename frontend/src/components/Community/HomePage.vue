<template>
  <div class="">
    <NavBar />

    <div v-if="userJoinComm.length === 0">
      <!-- <div v-if="0 === 0"> -->
      <NewUser />
    </div>
    <div v-else>
      <MainPage />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import NewUser from "./NewUser.vue";
import MainPage from "./MainPage.vue";
import NavBar from "../Utils/NavBar.vue";

export default {
  name: "HomePage",
  components: { NewUser, MainPage, NavBar },
  computed: {
    ...mapState("comm", ["commList", "userJoinComm"]),
  },
  async created() {
    await this.$store.dispatch("comm/getUserJoinComm");
    await this.$store.dispatch("comm/getAllCOmmunity");
  },
};
</script>

<style></style>
