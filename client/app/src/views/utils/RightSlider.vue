<template>
<div class="User-details-section border">
    <div>
      <i @mouseover="handleMouseOver" @mouseleave="handleMouseLeave"
        :class="['fa', isUserVisible ? 'fa-chevron-right' : 'fa-chevron-left ']" @click="showUser()"
        :style="{ cursor: 'pointer', zIndex: 6 }">
      </i>

      <div class="User-details-content pt-2">
        <!-- User details -->
        <div>
          <div class="User-headings mx-3">
            <p class="text-bold">User</p>
          </div>
          <div class="User-cards heading-color mx-3 my-2 px-2 py-2">
            <p class="mb-0 text-sm text-bold">Peter Anthony</p>
            <p class="mb-0 text-xs"><span class="text-bold">Email:</span>Peterxyz@trigybcajbckcaska
            </p>
            <p class="mb-0 text-xs"><span class="text-bold">Phone:</span> 7868768688</p>
          </div>
        </div>
        <!-- User details ends -->
        <hr>
        <!-- refferals details  -->

        <div class="User-headings d-flex justify-content-between mx-3 cursor-pointer" @click="toggleInfo('showInfo1')" >
          <div>
            <p class="text-bold">Refferals</p>
          </div>
          <i :class="['fa', !showInfo1 ? 'fa-chevron-down' : 'fa-chevron-up', 'me-2', 'mt-2 ']"
            @click="toggleInfo('showInfo1')" style="cursor:pointer"></i>
        </div>
        <div class="refferal-cards">

          <div v-show="showInfo1" v-for="item in refferalList" :key="item.email"
            class="User-cards heading-color mx-3 my-2 px-2 py-2">
            <p class="mb-0 text-sm text-bold">{{ item.name }}</p>
            <p class="mb-0 text-xs"><span class="text-bold">Email:</span>{{ item.email }}</p>
            <p class="mb-0 text-xs"><span class="text-bold">Phone:</span>{{ item.phone }}</p>
          </div>
        </div>

        <!-- refferals details ends -->
        <hr>
        <!-- policies details  -->

        <div class="User-headings d-flex justify-content-between mx-3 cursor-pointer" @click="toggleInfo('showInfo2')" >
          <div>
            <p class="text-bold">Policies</p>
          </div>
          <i :class="['fa', !showInfo2 ? 'fa-chevron-down' : 'fa-chevron-up', 'me-2', 'mt-2 ']"
            @click="toggleInfo('showInfo2')" ></i>

        </div>
        <div class="refferal-cards">

          <div v-show="showInfo2" v-for="item in refferalList" :key="item.email"
            class="User-cards heading-color mx-3 my-2 px-2 py-2">
            <p class="mb-0 text-sm text-bold">{{ item.name }}</p>
            <p class="mb-0 text-xs"><span class="text-bold">Email:</span>{{ item.email }}</p>
            <p class="mb-0 text-xs"><span class="text-bold">Phone:</span>{{ item.phone }}</p>
          </div>
        </div>

        <!-- Policies details ends -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data() {
    return {
        showInfo1: true,
      showInfo2: false,
      isUserVisible: false,
      navVisible: false, 
      mobileView: false 
    }
  },
    methods:{
        toggleInfo(data) {
      if (data === "showInfo1") {
        this.showInfo1 = !this.showInfo1;
      }
      if (data === "showInfo2") {
        this.showInfo2 = !this.showInfo2;
      }
     
    
    },
 
handleMouseOver() {
      if (!this.isUserVisible) {
        const item = document.querySelector('.User-details-section');
        item.style.minHeight = '87vh';
      }
    },

    handleMouseLeave() {
      if (!this.isUserVisible) {
        const item = document.querySelector('.User-details-section');
        item.style.minHeight = '2rem';
      }
    },

    showUser() {
      window.addEventListener('resize', this.handleResize);

      if (this.navVisible) {
        this.navVisible = !this.navVisible
      }

      this.isUserVisible = !this.isUserVisible;
      const item = document.querySelector('.User-details-section');
      if (this.mobileView) {
        item.style.width = this.isUserVisible ? '80%' : '1rem';
        console.log("Mobilevie true")
      } else {
        item.style.width = this.isUserVisible ? '30%' : '1rem';
        console.log("Mobilevie false")
      }

      item.style.height = this.isUserVisible ? '' : '2rem';
      item.style.minHeight = this.isUserVisible ? '' : '2rem';

      item.style.backgroundColor = this.isUserVisible ? "#fff" : "rgb(241, 241, 241) ";
      const content = document.querySelector('.User-details-content');
      content.style.display = this.isUserVisible ? 'block' : 'none';
    }
    }
}

</script>
<style scoped>

.refferal-cards {
  max-height: 25vh;
  overflow: scroll;

}

.User-cards {
  /* background-color: #CCE5FF; */
  margin-left: 1rem;
  border: 1px solid rgba(192, 192, 192, 0.5);
  margin-left: 1rem !important;
  border-radius: 1rem;

}

.User-cards:hover {
  background-color: #DCDFEC;
  cursor: pointer;
}

.User-headings {
  background-color: #CCE5FF;
  border: 1px solid rgba(192, 192, 192, 0.5);
  border-radius: 5px;
  height: 2rem;
  padding-left: 10px;
  border-right: none;
  color: #323338;

}

.User-details-section {
  transition: min-height 0.2s ease-in-out;
  transition: width 0.3s ease-in-out;
  position: absolute;
  right: 0;
  top: 3.1rem;
  z-index: 5;
  background-color: #fff;
  min-height: 87vh;
  /* box-shadow: inset 12px 0 0px rgb(241, 241, 241) !important; */
  box-shadow: inset 12px 0 0px #ced4da !important;
}


.User-details-content {}
</style>
