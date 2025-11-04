<template>
  <div>
    <div v-if="message?.direction === 'Outbound'" class="mb-2 d-flex justify-content-end">
      <div class="message-data mb-2 col-lg-4 col-md-4 col-sm-2">
        <span v-if="message?.subject" class="message-data-time responsive-text-size"> {{ message.subject }}</span>
        <!-- <span class="message-data-time responsive-text-size">{{ message?.dateTime }}</span> -->
      </div>
      <div class="avatar">CL</div>
    </div>

    <div v-else class="mb-2 d-flex justify-content-start">
      <div class="avatar-container">
        <div class="avatar">PA</div>
      </div>
      <div class="message other-message col-lg-4 col-md-4 col-sm-2 responsive-text-size">
        <span v-if="message?.subject"> {{ message.subject }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    message: {
      type: Object,
      required: true
    }
  }
}
</script>
