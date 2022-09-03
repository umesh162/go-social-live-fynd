<template>
  <div class="overflow-hidden h-screen main-div">
    <div class="grid grid-cols-3 h-screen px-10 pt-5 bg-white main">
      <div class="">
        <CommList />
      </div>
      <div>
        <PostSection />
      </div>
      <div>
        <ProfileSection />
      </div>
    </div>
  </div>
</template>

<script>
import ProfileSection from "../Profile/ProfileSection.vue";
import PostSection from "./PostSection.vue";
import CommList from "./CommList.vue";

export default {
  components: { ProfileSection, PostSection, CommList },
};
</script>

<style>
@media (max-width: 575px) {
  .main-div {
    height: auto;
    overflow: auto;
  }
  .main {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  /* .pluse {
    position: absolute;
    bottom: 18px;
    right: 15px;
    padding: 28px;
  } */
}

/* @media (min-width: 576px) {
  .pls-view {
    display: none;
  }
  .hid-crt {
    display: none;
  }
} */
</style>
