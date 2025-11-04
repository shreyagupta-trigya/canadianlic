<template>
    <div>
        <Drawer :is-open="isDrawerOpen" :activeMessage="activeMessage" :speed="500" @close="closeDrawer"></Drawer>
        <ComposeMailDrawer :is-open="isComposeMailDrawerOpen"  :speed="500" @close="closeComposeMailDrawer" ></ComposeMailDrawer>
        <div>
            <!-- button div -->
            <div class="row mt-3">
                <div class="col-8 ">
                <div class="search-container ">
                    <input class="search-input" type="search" placeholder="Search" aria-label="Search" style="display: flex;">
                    <i data-v-1a08f58e="" class="fas fa-search" aria-hidden="true"></i>
                </div>
                </div>
                <div class="col-4 text-end">
                <a href="javascript:;">
                    <button @click="toggleComposeMailDrawer()" class="add-btn btn py-1 mb-0 text-truncate" style="padding-inline:0.75rem;margin-left:15px;">
                    Send Email</button>
                </a>
                </div>
            </div>
            <!-- button div ends-->
            <!-- sukanya email -->
            <div>
                <!-- body --------------------------- -->
                <table class="table table-striped" id="table2">
                    <thead>
                        <tr>
                            <th scope="col" class=" ps-0 pb-1 col1"><input type="checkbox"></th>
                            <th scope="col" class=" ps-0 col3 align-middle"><b>Sender</b></th>
                            <th scope="col" class=" ps-0 col4 align-middle"><b>Message</b></th>
                            <th scope="col" class=" ps-0 col5 align-middle"><b>Time</b></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="col1" @click="toggleDrawer(1)"><input type="checkbox"></td>

                            <td class="col3 align-middle" @click="toggleDrawer(1)"><b>Indeed</b></td>
                            <td class="col4 align-middle" @click="toggleDrawer(1)">Don't let this chance go 'Houdini Book your spot NOW.
                                Watch her set the stage on fire at</td>
                            <td class="col5 align-middle" @click="toggleDrawer(1)">
                                <span class="email-time"><b>6:47 PM</b></span>
                                <!-- Hover icons container -->
                                <span class="hover-icons">
                                    <button class="icon-button"><i class="fas fa-trash-alt"></i></button>
                                    <button class="icon-button"><i class="fas fa-envelope"></i></button>
                                    <button class="icon-button"><i class="fas fa-ellipsis-v"></i></button>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td class="col1 align-middle" @click="toggleDrawer(1)"><input type="checkbox"></td>
                            <td class="col3 align-middle" @click="toggleDrawer(1)"><b>Gautam</b></td>
                            <td class="col4 align-middle" @click="toggleDrawer(1)">Get Jobs tailored your prepaired . We are thrilled to
                                announce that you are selected...</td>
                            <td class="col5 align-middle" @click="toggleDrawer(1)">
                                <span class="email-time"><b>5:57 PM</b></span>
                                <!-- Hover icons container -->
                                <span class="hover-icons">
                                    <button class="icon-button"><i class="fas fa-trash-alt"></i></button>
                                    <button class="icon-button"><i class="fas fa-envelope"></i></button>
                                    <button class="icon-button"><i class="fas fa-ellipsis-v"></i></button>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td class="col1 align-middle" @click="toggleDrawer(1)"><input type="checkbox"></td>

                            <td class="col3 align-middle" @click="toggleDrawer(1)"><b>Glassdoor</b></td>
                            <td class="col4 align-middle" @click="toggleDrawer(1)">Hyy Rakesh, Your prepaid recharge bill pay payment is due
                                today...</td>
                            <td class="col5 align-middle" @click="toggleDrawer(1)">
                                <span class="email-time"><b>5:57 PM</b></span>
                                <!-- Hover icons container -->
                                <span class="hover-icons">
                                    <button class="icon-button"><i class="fas fa-trash-alt"></i></button>
                                    <button class="icon-button"><i class="fas fa-envelope"></i></button>
                                    <button class="icon-button"><i class="fas fa-ellipsis-v"></i></button>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td class="col1  align-middle" @click="toggleDrawer(1)"><input type="checkbox"></td>

                            <td class="col3  align-middle" @click="toggleDrawer(1)"><b>Team Scaler</b></td>
                            <td class="col4  align-middle text-truncate" @click="toggleDrawer(1)">Dear Rakesh, 200k enrolled since you've Now would be the
                                latest best time to....</td>
                            <td class="col5  align-middle" @click="toggleDrawer(1)">
                                <span class="email-time"><b>4:07 PM</b></span>
                                <!-- Hover icons container -->
                                <span class="hover-icons">
                                    <button class="icon-button"><i class="fas fa-trash-alt"></i></button>
                                    <button class="icon-button"><i class="fas fa-envelope"></i></button>
                                    <button class="icon-button"><i class="fas fa-ellipsis-v"></i></button>
                                </span>
                            </td>
                        </tr>

                        <tr>
                            <td class="col1  align-middle" @click="toggleDrawer(1)"><input type="checkbox"></td>

                            <td class="col3  align-middle" @click="toggleDrawer(1)"><b>HDFC Bank</b></td>
                            <td class="col4  align-middle" @click="toggleDrawer(1)">You have done a UPI txn. Check details! This is a longer
                                message to demonstrate text
                                overflow.</td>
                            <td class="col5  align-middle" @click="toggleDrawer(1)">
                                <span class="email-time"><b>10:15 AM</b></span>
                                <!-- Hover icons container -->
                                <span class="hover-icons">
                                    <button class="icon-button"><i class="fas fa-trash-alt"></i></button>
                                    <button class="icon-button"><i class="fas fa-envelope"></i></button>
                                    <button class="icon-button"><i class="fas fa-ellipsis-v"></i></button>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td class="col1  align-middle" @click="toggleDrawer(1)"><input type="checkbox"></td>

                            <td class="col3  align-middle" @click="toggleDrawer(1)"><b>Paytm</b></td>
                            <td class="col4  align-middle" @click="toggleDrawer(1)">Upgraded Offer! Especially for you. Click here to see more
                                details and enjoy the
                                benefits.</td>
                            <td class="col5  align-middle" @click="toggleDrawer(1)">
                                <span class="email-time" @click="toggleDrawer(1)"><b>11:20 AM</b></span>
                                <!-- Hover icons container -->
                                <span class="hover-icons">
                                    <button class="icon-button"><i class="fas fa-trash-alt"></i></button>
                                    <button class="icon-button"><i class="fas fa-envelope"></i></button>
                                    <button class="icon-button"><i class="fas fa-ellipsis-v"></i></button>
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import ComposeMailDrawer from './DrawerforEmail/ComposeMailDrawer.vue';
import Drawer from './DrawerforEmail/Drawer.vue';
export default {
    components: {
        Drawer,
        ComposeMailDrawer
    },
    data() {
        return {
            isDrawerOpen: false,
            isComposeMailDrawerOpen:false,
            selectedNavTab: "Mail",
            messages: [
                {
                    name: "Peter Antony",
                    Status: "Sent",
                    Source: "IMAP",
                    Date: "20/12/23",
                    email: 'PeterAntonytrigyaINDjhcsvhjcasjsah@gmail.com',
                    message: `<p>In <a href="/wiki/Literary_theory" title="Literary theory">literary theory</a>, a <b>text</b> is any object that can be "read", whether this object is a work of literature, a street sign, an arrangement of buildings on a city block, or styles of clothing.  It is a set of <a href="/wiki/Sign_(semiotics)" title="Sign (semiotics)">signs</a> that is available to be reconstructed by a reader (or observer) if sufficient <a href="/wiki/Interpretant" title="Interpretant">interpretants</a> are available.  This set of signs is considered in terms of the informative message's <i>content</i>, rather than in terms of its physical form or the medium in which it is represented. </p>
      <p>Within the field of <a href="/wiki/Literary_criticism" title="Literary criticism">literary criticism</a>, "text" also refers to the original information content of a particular piece of writing; that is, the "text" of a work is that primal symbolic arrangement of letters as originally composed, apart from later alterations, deterioration, commentary, translations, <a href="/wiki/Paratext" title="Paratext">paratext</a>, etc.  Therefore, when literary criticism is concerned with the determination of a "text", it is concerned with the distinguishing of the original information content from whatever has been added to or subtracted from that content as it appears in a given textual document (that is, a physical representation of text).</p>
      <p>Since the <a href="/wiki/History_of_writing" title="History of writing">history of writing</a> predates the concept of the "text", most texts were not written with this concept in mind. Most written works fall within a narrow range of the types described by <a href="/wiki/Textual_scholarship" title="Textual scholarship">text theory</a>. The concept of "text" becomes relevant if and when a "coherent written message is completed and needs to be referred to independently of the circumstances in which it was created."<sup class="noprint Inline-Template Template-Fact" style="white-space:nowrap;">[<i><a href="/wiki/Wikipedia:Citation_needed" title="Wikipedia:Citation needed"><span title="This claim needs references to reliable sources. (April 2010)">citation needed</span></a></i>]</sup></p>`,
                    subject: 'Detaild information of new project || react || 20/8/2024',
                    time: '11:02 AM'
                },

                {
                    email: 'Somya@xyz.com', Status: "Sent", Source: "IMAP", Date: "20/12/23", message: `Dear [Recipient's Name], <br>

I hope this message finds you well. <br>

I am writing to provide my official confirmation regarding the publication of our company website. After thorough consideration and review of the website's content and functionality, I am pleased to approve its release to the public.

I commend the hard work and dedication that you and your team have put into this project. Your attention to detail and commitment to excellence are truly commendable, and I am confident that our new website will serve as an effective platform to showcase our company's offerings and engage with our audience.

Please proceed with the necessary steps to publish the website at your earliest convenience. Additionally, ensure that all relevant stakeholders are informed about the website's publication and are provided with any necessary training or resources.

If there are any further actions required from my end or if you have any questions or concerns, please do not hesitate to reach out to me.

Once again, congratulations on reaching this milestone, and thank you for your outstanding efforts in making our company's online presence a success.

Best regards,

[Your Name]
[Your Position/Title]
[Your Contact Information]` , subject: 'Subject line - is here for text', time: '11:02 AM'
                },
                { email: 'Shobhnath@xyz.com', Status: "Sent", Source: "IMAP", Date: "20/12/23", message: "Hello, hope you're doing well. Could you please provide an update on the project?", subject: 'Subject line - is here for text', time: '11:02 AM' },
                { email: 'Shashank@xyz.com', Status: "Sent", Source: "IMAP", Date: "20/12/23", message: "Hi, I have some exciting news to share with you. Let's catch up soon!", subject: 'Subject line - is here for text', time: '11:02 AM' },
                { email: 'Balvinder@xyz.com', Status: "Sent", Source: "IMAP", Date: "20/12/23", message: "Hey, just wanted to remind you about the upcoming meeting tomorrow.", subject: 'Subject line - is here for text', time: '11:02 AM' },
                { email: 'Vinod@xyz.com', Status: "Sent", Source: "IMAP", Date: "20/12/23", message: "Hi, could you please review the attached document and provide your feedback?", subject: 'Subject line - is here for text', time: '11:02 AM' },
                { email: 'Tara@xyz.com', Status: "Sent", Source: "IMAP", Date: "20/12/23", message: "Hello, I hope everything is going smoothly on your end. Let me know if you need any assistance.", subject: 'Subject line - is here for text', time: '11:02 AM' },
                { email: 'Jaishikha@xyz.com', Status: "Sent", Source: "IMAP", Date: "20/12/23", message: "Hi there! Just wanted to say thanks for your hard work on the recent project.", subject: 'Subject line - is here for text', time: '11:02 AM' }
            ],
            activeIndex: null,
            showToMe: false
        };
    },
    computed: {
        activeMessage() {
            return this.activeIndex !== null ? this.messages[this.activeIndex] : {};
        }
    },
    methods: {
        selectNavTab(tab) {
            this.selectedNavTab = tab;
        },
        toggleDetails(index) {
            this.activeIndex = this.activeIndex === index ? null : index;
        },
        closeDetails() {
            this.activeIndex = null;
        },
        reply() {
            // Handle reply functionality
        },
        forward() {
            // Handle forward functionality
        },
        deleteMessage() {
            // Handle delete functionality
        },

        toggleDrawer(index) {
            this.activeIndex = this.activeIndex === index ? null : index;
            this.isDrawerOpen = !this.isDrawerOpen;
        },
        closeDrawer() {
            this.isDrawerOpen = false;
        },
        toggleComposeMailDrawer() {
            this.isComposeMailDrawerOpen = !this.isComposeMailDrawerOpen;
        },
        closeComposeMailDrawer() {
            this.isComposeMailDrawerOpen = false;
        },
      

    }
};
</script>


<style scoped>
.search-input {
  padding: 10px 8px 10px 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  /* Changed border radius to 5px */
  font-size: 16px;
  width: 250px;
  transition: border-color 0.3s ease-in-out;
  /* Smooth transition for border color */
}
.search-container {
  position: relative;
  display:flex;
}
/* sukanya email */
table {
    width: 100%;
}

.col1 {
    width: 5%;
}

.col2 {
    width: 5%;
}

.col3 {
    width: 20%;
}

.col4 {
    width: 55%;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.col5 {
    width: 15%;
    position: relative;
    text-align: right;
}


.hover-icons {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    display: none;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 5px;
}


tr:hover .hover-icons {
    display: inline-block;
}

tr:hover .email-time {
    visibility: hidden;
}

tbody tr:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    /* height: 60px; */
}


tbody tr {
    height: 40px !important;
    transition: all 0.3s ease;
}

.icon-button {
    background: none;
    border: none;
    cursor: pointer;
    margin-left: 5px;
}

.icon-button i {
    color: #333;
}

.icon-button i:hover {
    color: #007bff;
}

.table td {
    padding: 0;
    padding-top: 10px;
}

.icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(9, 160, 9);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    color: #fff;
    cursor: pointer;
}

.icon-container2 {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(245, 211, 216);
    border-radius: 6px;
    width: 40px;
    height: 40px;
    color: #fff;
    cursor: pointer;
}

.div {
    display: flex;
    align-items: center;
    justify-content: center;
}

@media (max-width: 576px) {
    #table2 {
        font-size: 10px;
    }

    .table td {
        padding: 0;
    }

    .table {
        font-size: 25px;
    }


}

/* sukanya email ends*/

.email-message-card {
    padding: 0 50px
}



ul {
    display: flex;
}

ul li {
    list-style: none;
    text-decoration: none;
    padding: 0 10px;
    color: #323338;
    font-size: 14px;
    font-weight: 600;
}

nav {
    border-bottom: 1px solid (192, 192, 192, 0.5);
    box-shadow: 0px 1px 2px silver;
    height: 30px;
    display: flex;
    align-items: last baseline;
}

.selected-nav-li {
    border-bottom: 3px solid #0060B9;
    box-shadow: 0px 2px 4px #fffefe;
    transform: translateY(2px);
    font-weight: 700;
}


.card .card-body {
    padding: 0.5rem 1.5rem !important;
}

.btn-div {
    display: none;
}

.border {
    border-radius: 5px !important;
}

.card {
    border-radius: 5px !important;
}

.card-body {
    border-radius: 5px !important;
}

.blue-color {
    color: #0060B9 !important
}

.text-size {
    font-size: 15px !important;
}

.custom-scroll {
    overflow-y: auto;
    max-height: calc(100vh - 200px);
}

.heading-color {
    color: #323338;
}

i {
    padding: 0.5rem;
}

i:hover {
    background-color: #dce0e4;
    border-radius: 50%;
}

.message-details {
    z-index: 6;
    position: fixed;
    height: 65vh;
    right: 0;
    bottom: 0;
    width: 80%;
    background-color: #fefefe;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease-in-out;
    transform: translateX(100%);
    overflow-y: auto;
}

.message-details-content {
    padding: 20px;
}

.message-details-open {
    transform: translateX(0);
}

.close {
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
}

.table {
    table-layout: fixed;
}

.col-lg-4,
.col-md-4 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* .message-actions {
    margin-top: 20px;
} */

.message-actions i {
    margin-right: 10px;
    cursor: pointer;
}

@media (max-width: 600px) {
    .message-details {
        width: 100%;
        height: 87vh !important;
        top: 14vh !important;
    }

    .text-size {
        font-size: 12px !important;
    }

    .btn-div {
        display: block !important;
    }

    .sentBy {
        display: none !important;
    }

    .source {
        display: none !important;
    }

    .status {
        display: none !important;
    }

    .date {
        display: none !important;
    }

    .subject {
        display: none !important;
    }
}

@media (min-width:601px) and (max-width: 900px) {
    .source {
        display: none !important;
    }

    .subject {
        display: none !important;
    }

    .date {
        display: none !important;
    }

    .sentBy {
        display: none !important;
    }

    .status {
        display: none !important;
    }

    .message-details {
        width: 100%;
        height: 90.5vh !important;
        top: 10vh;
    }

    .text-size {
        font-size: 12px !important;
    }

    .btn-div {
        display: block !important;
    }

}
</style>
