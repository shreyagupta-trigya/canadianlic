<template>
  <div class="ps-0 pe-2 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-12">
            <card class="card-dashboard-1 shadow" :title="stats.money.title" :value="stats.money.value" :percentage="stats.money.percentage"
              :iconClass="stats.money.iconClass" :iconBackground="stats.money.iconBackground"
              :detail="stats.money.detail" directionReverse></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12 ">
            <card class="card-dashboard-2 shadow" :title="stats.users.title" :value="stats.users.value" :percentage="stats.users.percentage"
              :iconClass="stats.users.iconClass" :iconBackground="stats.users.iconBackground"
              :detail="stats.users.detail" directionReverse></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12 ">
            <card class="card-dashboard-3 shadow" :title="stats.clients.title" :value="stats.clients.value" :percentage="stats.clients.percentage"
              :iconClass="stats.clients.iconClass" :iconBackground="stats.clients.iconBackground"
              :percentageColor="stats.clients.percentageColor" :detail="stats.clients.detail" directionReverse></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12 ">
            <card class="card-dashboard-4 shadow"  :title="stats.sales.title" :value="stats.sales.value" :percentage="stats.sales.percentage"
              :iconClass="stats.sales.iconClass" :iconBackground="stats.sales.iconBackground"
              :detail="stats.sales.detail" directionReverse></card>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-7 mb-lg ">
            <!-- line chart -->
            <div class="card z-index-2 dashboard-chart-bg ">
              <gradient-line-chart />
            </div>
          </div>
          <div class="col-lg-5 ps-0">
            <carousel />
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-lg-7 mb-lg-0 mb-4">
            <div class="card">
              <div class="p-3 pb-0 card-header">
                <div class="d-flex justify-content-between">
                  <h6 class="mb-2">Sales by Country</h6>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table align-items-center">
                  <tbody>
                    <tr v-for="(sale, index) in sales" :key="index">
                      <td class="w-30">
                        <div class="px-2 py-1 d-flex align-items-center">
                          <div>
                            <img :src="sale.flag" alt="Country flag" />
                          </div>
                          <div class="ms-4">
                            <p class="mb-0 text-xs font-weight-bold">Country:</p>
                            <h6 class="mb-0 text-sm">{{ sale.country }}</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="text-center">
                          <p class="mb-0 text-xs font-weight-bold">Sales:</p>
                          <h6 class="mb-0 text-sm">{{ sale.sales }}</h6>
                        </div>
                      </td>
                      <td>
                        <div class="text-center">
                          <p class="mb-0 text-xs font-weight-bold">Value:</p>
                          <h6 class="mb-0 text-sm">{{ sale.value }}</h6>
                        </div>
                      </td>
                      <td class="text-sm align-middle">
                        <div class="text-center col">
                          <p class="mb-0 text-xs font-weight-bold">Bounce:</p>
                          <h6 class="mb-0 text-sm">{{ sale.bounce }}</h6>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col-lg-5 ">
            <categories-card />
          </div>
        </div>
      </div>
    </div>
  </div>
   <MobileNav class="d-block d-sm-block d-lg-none d-md-none"></MobileNav>
</template>
<script>
import Card from "@/examples/Cards/Card.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import Carousel from "./components/Carousel.vue";
import CategoriesCard from "./components/CategoriesCard.vue";
import { putUrl } from "../boot/axios";
import router from "../router/index";


import US from "@/assets/img/icons/flags/US.png";
import DE from "@/assets/img/icons/flags/DE.png";
import GB from "@/assets/img/icons/flags/GB.png";
import BR from "@/assets/img/icons/flags/BR.png";
// import MobileNav from "../examples/MobileNav/MobileNav.vue";

export default {
  name: "dashboard-default",
  
  data() {
    return {
      stats: {
        money: {
          title: "Today's Money",
          value: "$53,000",
          percentage: "+55%",
          iconClass: "ni ni-money-coins",
          detail: "since yesterday",
          iconBackground: "bg-gradient-primary",
        },
        users: {
          title: "Today's Users",
          value: "2,300",
          percentage: "+3%",
          iconClass: "ni ni-world",
          iconBackground: "bg-gradient-primary",
          detail: "since last week",
        },
        clients: {
          title: "New Clients",
          value: "+3,462",
          percentage: "-2%",
          iconClass: "ni ni-paper-diploma",
          percentageColor: "text-danger",
          iconBackground: "bg-gradient-success",
          detail: "since last quarter",
        },
        sales: {
          title: "Sales",
          value: "$103,430",
          percentage: "+5%",
          iconClass: "ni ni-cart",
          iconBackground: "bg-gradient-primary",
          detail: "than last month",
        },
      },
      sales: {
        us: {
          country: "United States",
          sales: 2500,
          value: "$230,900",
          bounce: "29.9%",
          flag: US,
        },
        germany: {
          country: "Germany",
          sales: "3.900",
          value: "$440,000",
          bounce: "40.22%",
          flag: DE,
        },
        britain: {
          country: "Great Britain",
          sales: "1.400",
          value: "$190,700",
          bounce: "23.44%",
          flag: GB,
        },
        brasil: {
          country: "Brasil",
          sales: "562",
          value: "$143,960",
          bounce: "32.14%",
          flag: BR,
        },
      },
    };
  },
  mounted() {

  },
  beforeMount(){
      this.fetchDataFromServer()
  },
  methods: {
    async fetchDataFromServer() {
      try {
        const userEmail = localStorage.getItem('userEmail');
        const response = await fetch(`${putUrl}usersFunction/app/getuserdata`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userEmail: userEmail })
        });

        const data = await response.json();

        if (data.success) {

          if(!data.data.userData.verifiedPhone ||  !data.data.userData.verifiedEmail){

            router.push("/verify-otp")
          }          

          // Do whatever you want with the user data here
        } else {
          // User not found or error handling
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching data from server:', error);
      }
    }
  },
  components: {
    Card,
    GradientLineChart,
    Carousel,
    CategoriesCard,
    // MobileNav,
  },
};
</script>
