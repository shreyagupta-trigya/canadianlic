<template>
  <loader :loading="loader" />
  <div class="w-100">
    <div class="chat">
      <div class="chat-history" style="min-height:62vh" ref="scrollableDiv">
        <ul class="list-unstyled">
          <li v-for="(message, index) in chatHistory" :key="index" class="clearfix">
            <Message :message="message" />
          </li>
        </ul>
        <infinite-loading
          @infinite="loadMoreMessages"
          spinner="spiral"
          :distance="50"
        />
      </div>
      <div class="chat-message position-sticky bottom-0 w-100">
        <textarea
          name="message-to-send"
          id="message-to-send"
          placeholder="Type your message"
          rows="3"
          class="form-control"
          v-model="messageToSend"
        ></textarea>
        <button class="send-button ms-3" @click="sendMessage()">
          <i class="fa fa-paper-plane fs-4" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Message from "./Message.vue";
import { joinRoom, onNewMessage, disconnectSocket } from "../../services/socket";
import { putUrl } from "../../boot/axios";
import loader from './smsLoader.vue'
import axios from "axios";
import "./sms.css";

export default {
  components: {
    Message,
    loader
  },
  props: {
    phoneNumber: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      chatHistory: [],
      messageToSend: "",
      roomId: '', 
      hasMore: true,
      page: 1,
      loadingMore: false,
      loader: false,
    };
  },
  methods: {
    async sendMessage() {
      if (!this.messageToSend.trim()) return; // Prevent sending empty messages

      this.loader = true;  // Show loader while sending message

      try {
        console.log("Sending SMS to:", this.phoneNumber);
        const payload = {
          phoneNumber: this.phoneNumber,
          message: this.messageToSend,
        };

        const response = await axios.post(`${putUrl}mailfunction/api/v1/sms/send`, payload);
        console.log("Message sent successfully:", response.data);

        // Add message to chat history
        this.chatHistory.push({
          subject: this.messageToSend,
          messageStatus: response?.data?.status || "",
          dateTime: new Date().toLocaleString(),
          direction: "Outbound",
        });

        // Reset the message input
        this.messageToSend = "";
        this.scrollToBottom();
      } catch (error) {
        console.error("Failed to send message:", error.response ? error.response.data : error.message);
      } finally {
        this.loader = false;  // Hide loader after operation completes
      }
    },

    async fetchMessages(pageNumber) {
      try {
        this.loadingMore = true;

        const response = await fetch(`${putUrl}mailfunction/api/v1/sms/history`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber: this.phoneNumber,
            page: pageNumber,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch. Status: ${response.status}`);
        }

        const data = await response.json();
        const newMessages = data?.messages || [];

        if (newMessages.length === 0) {
          this.hasMore = false;
        } else {
          this.chatHistory = [...newMessages, ...this.chatHistory].reverse(); // Prepend older messages
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
      } finally {
        this.loadingMore = false;
      }
    },

    scrollToBottom() {
      const container = this.$refs.scrollableDiv;
      if (container) {
        // Check if the user is already at the bottom
        const isAtBottom = container.scrollHeight - container.scrollTop === container.clientHeight;
        if (isAtBottom) {
          container.scrollTop = container.scrollHeight;
        }
      }
    },

    loadMoreMessages() {
      if (this.hasMore && !this.loadingMore) {
        this.page += 1;
        this.fetchMessages(this.page);
      }
    },
  },

  mounted() {
    this.loader = true; 
    this.roomId = `agentPhone_${this.phoneNumber}`;
    console.log("PHONE",this.phoneNumber);
    
    this.fetchMessages(1).finally(() => {
      this.loader = false;
    });
    this.scrollToBottom();

    // WebSocket: Join room and listen for messages
    joinRoom(this.roomId);
    onNewMessage((message) => {
      console.log("New message received via WebSocket:", message);
      this.chatHistory.push(message);
      this.scrollToBottom();
    });
    
  },

  beforeUnmount() {
    disconnectSocket(); // Clean up WebSocket connections
  },
};
</script>
