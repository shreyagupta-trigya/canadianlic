<template>
  <div>
    <loader :loading="loader" />
    <div class="w-100">
      <div class="chat">
        <div class="chat-history" style="min-height: 62vh" ref="scrollableDiv">
          <ul class="list-unstyled">
            <li v-for="(messageObj, index) in chatHistory" :key="index" class="clearfix">
              <Message :message="messageObj" />
            </li>
          </ul>
          <infinite-loading @infinite="loadMoreMessages" spinner="spiral" :distance="50" />
        </div>
        <div class="chat-message position-sticky bottom-0 w-100">
          <textarea
            placeholder="Type your message"
            rows="3"
            class="form-control"
            v-model="messageToSend"
          ></textarea>
          <button class="send-button ms-3" @click="sendMessage">
            <i class="fa fa-paper-plane fs-4" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Message from "./WhatsAppMessage.vue";
import socketService from "../../services/socket";
import { putUrl } from "../../boot/axios";
import loader from "./smsLoader.vue";
import axios from "axios";

export default {
  components: { Message, loader },
  props: {
    phoneNumber: { type: String, required: true },
  },
  data() {
    return {
      chatHistory: [],
      messageToSend: "",
      roomId: "",
      hasMore: true,
      page: 1,
      loader: false,
    };
  },
  methods: {
    async sendMessage() {
      if (!this.messageToSend.trim()) return;

      this.loader = true;

      try {
        const payload = { phoneNumber: this.phoneNumber || "919047090872", message: this.messageToSend };
        const response = await axios.post(`${putUrl}mailfunction/api/v1/wati/send`, payload);

        // Emit the message to the WebSocket room
        socketService.emit("sendMessage", {
          roomId: this.roomId,
          message: this.messageToSend,
        });

        // Add the message to chat history
        this.chatHistory.push({
          subject: this.messageToSend,
          messageStatus: response?.data?.status || "",
          dateTime: new Date().toLocaleString(),
          direction: "Outbound",
        });

        this.messageToSend = "";
        this.scrollToBottom();
      } catch (error) {
        console.error("Failed to send message:", error.response?.data || error.message);
      } finally {
        this.loader = false;
      }
    },
    async fetchMessages(pageNumber) {
      try {
        this.loader = true;

        // Save the current scroll position
        const container = this.$refs.scrollableDiv;
        const previousScrollHeight = container.scrollHeight;

        const payload = { phoneNumber: this.phoneNumber || "919047090872", page: pageNumber };
        const response = await axios.post(`${putUrl}mailfunction/api/v1/wati/history`, payload);
        const newMessages = response?.data?.messages || [];

        if (newMessages.length === 0) {
          this.hasMore = false;
        } else {
          this.chatHistory = [...newMessages.reverse(), ...this.chatHistory];
        }

        // Restore the scroll position after prepending messages
        this.$nextTick(() => {
          container.scrollTop = container.scrollHeight - previousScrollHeight;
        });
      } catch (error) {
        console.error("Error fetching chat history:", error);
      } finally {
        this.loader = false;
      }
    },
    scrollToBottom() {
      const container = this.$refs.scrollableDiv;
      if (container) container.scrollTop = container.scrollHeight;
    },
    loadMoreMessages() {
      if (this.hasMore) {
        this.page += 1;
        this.fetchMessages(this.page);
      }
    },
  },
  mounted() {
    this.roomId = `agentPhone_${this.phoneNumber || "919047090872"}`;
    this.fetchMessages(1).finally(() => (this.loader = false));

    // Initialize WebSocket and join room
    socketService.connect();

    socketService.on("connect", () => {
      console.log("Connected to WebSocket server");
      socketService.emit("joinRoom", this.roomId);
    });

    socketService.on("newMessage", (message) => {
      console.log("New message received:", message);
      this.chatHistory.push(message);
      this.scrollToBottom();
    });

    socketService.on("disconnect", (reason) => {
      console.warn("WebSocket disconnected:", reason);
    });
  },
  beforeUnmount() {
    socketService.disconnect();
  },
};
</script>
