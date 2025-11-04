async handleUpdateForm(event) {
      event.preventDefault();
      const advisorData = { ...this.newAdvisor };
      try {
        const response = await axios.post(`${putUrl}uatServerFunction/api/v1/update-advisor-cedential/${this.id}`, advisorData);
        console.log('Advisor updated successfully', response.data);
        this.toggleDrawer();
        this.resetForm();
        Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Advisor Updated Successfully",
                    });
      } catch (error) {
        console.error('Error updating advisor:', error);
      }
    },
    
    const handleUpdateForm = async () => {
      try {

          await axios.post(`${putUrl}locations/api/v1/updatelocation/${props.id}`, formData).then(() => {
              isLoading.value = false;
              Swal.fire({
                  icon: "success",
                  title: "Success",
                  text: "Location Updated Successfully",
              });
          })
          isLoading.value = false;

          router.push("/locationlist")
      } catch (error) {
          isLoading.value = false;
          console.log(error);
          Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
          });
      }
  }