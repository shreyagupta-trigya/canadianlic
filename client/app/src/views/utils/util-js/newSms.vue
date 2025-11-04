<template>
  <div class="new-sms">
    <div class="new-sms-header">
      <div class="new-sms-header-left">
        <div class="new-sms-header-left-title">
          <span class="new-sms-header-left-title-text">New SMS</span>
        </div>
        <div class="new-sms-header-left-subtitle">
          <span class="new-sms-header-left-subtitle-text">
            Send a new SMS to your friends and family
          </span>
        </div>
      </div>
      <div class="new-sms-header-right">                    
        <div class="new-sms-header-right-icon">                    
          <img src="../../../assets/images/icons/new-sms-header-right-icon.png" alt="">
        </div>
      </div>
    </div>
    <form class="new-sms-form">
      <input type="text" class="new-sms-form-input" placeholder="Phone number">
      <textarea class="new-sms-form-textarea" placeholder="Message"></textarea>
      <div class="new-sms-form-button">
        <button class="new-sms-form-button-send">Send</button>
      </div>
    </form>
  </div>
</template>
