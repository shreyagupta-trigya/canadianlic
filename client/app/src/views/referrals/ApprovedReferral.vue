<template>   
    <div class="row">
        <div class="col-12 col-lg-12 m-auto">
            <form @submit.prevent="submitForm" class="multisteps-form_from">
                <div class="card multisteps-form__panel p-3 border-radius-xl bg-white js-active position-relative"
                    data-animation="FadeIn">
                    <Loader :loading="isLoading"></Loader>
                    <h5 class="main-heading mb-0">Rerferral Approve</h5>
                    <div class="multisteps-form__content">
                    <div class="row mt-3">
                        <div class="col-6 col-sm-6 mt-3 mt-sm-0">
                        <label>Approval Status</label>
                        <div
                            class="choices"
                            data-type="select-one"
                            tabindex="0"
                            role="listbox"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <div class="select-box">
                                <select v-model="formData.approvalStatus"  class="multisteps-form__select form-control choices__input">
                                    <option value="approved">Approved</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            
                            </div>
                        </div>
                        </div>
                        <div class="col-6 col-sm-6 mt-3 mt-sm-0">
                        <label>Comment</label>
                        <div
                            class="choices"
                            tabindex="0"
                            role="listbox"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <div class="">
                                <textarea v-model="formData.comments"  class="multisteps-form__select form-control "></textarea>
                            </div>
                        </div>
                        </div>
                    </div>             
                    </div>
                    <button  class="btn mb-0 bg-gradient-dark btn-md null null js-btn-next"
                      type="submit">Submit</button>
                </div>
            </form>
        </div>
    </div>       
</template>  
  <script>
  import { reactive } from 'vue';
  import axios from 'axios';
  import { putUrl } from "../../boot/axios.js";
  import Swal from "sweetalert2";
  import router from "../../router/index.js";
  export default {
    props: ["id"],
  
    setup(props) {
      const formData = reactive({
        approvalStatus: "",
        comments: "",
      });  
      const submitForm = async () => {
        console.log("Submit", props.id);
        console.log("form submission", formData);

        console.log(formData);
        const res=await axios
       .post(putUrl + "referralFunction/approveReferralEmail/"+props.id, formData)
       .then((res) => {
          console.log(res);
          Swal.fire({
            icon: "success",
            title: "Referral Updated Success",
            text: res.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            router.push("/referral-list");
          }, 3000);
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: err.response.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        });
       console.log(res);        
      };
  
      return {
        formData,
        submitForm
      };
    }
  }
  </script>
  