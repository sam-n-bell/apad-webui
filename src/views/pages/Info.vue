<template>
    <div>
        <el-card class="box-card">
        <el-row>
            <el-col :span="8">
                <h2>The Narrative</h2>
                <p>The goal of this project is to enable people to schedule events at venues to engage in social sports. Our project allows users to join events that already exist or create their own events, customize their events, and bring guests.</p>
            </el-col>
        </el-row>
        </el-card>
        <el-card class="box-card">
        <el-row>
            <el-col :span="8">
                <h2>How to Use the Website</h2>
                <p>Now that we've introduced the purpose of our project, let's go through a tutorial of how it works, first for normal users.</p>
                <p>Let's start with our login page, which is where users can login or be redirected to sign up for an account.</p>
                <img alt="Login" src="../../assets/login.png">
                <p> By clicking Create an account here, you will be redirected to our register page.</p>
                <img alt= "Register" src="../../assets/register.png">
                <p> Simply providing a name, email, password, and confirmation will register you for an account! After registering, you will be brought back to the login page where you can get access to your new account</p>
                <p> Once you login, you are taken to the events page. </p>
                <vue-custom-scrollbar class="scroll-area"  :settings="settings" @ps-scroll-y="scrollHanle">
                <img src="../../assets/events.png" alt="">
                </vue-custom-scrollbar>
                <p> At the events page, you can select to see events based on what day, what venue, and/or what time you choose. Once you see an event that satisfies your needs, you can press the join event button to join. Or, if you want to create your own event, simply press the Create Event button.</p>
                <p> To join an event, you can add guests that are joining the event with you (or keep it at zero if there are no guests) and provide an optional comment about what they're doing at the event.</p>
                <img alt = "Join Event" src="../../assets/joinevent.png">
                <p> To schedule an event, you simply provide the event name, choose a venue, day, and once a venue and day are selected you can choose times that are available. You can then specify the max number of players allowed at the event and how many guests you want to bring to your event, as well as your comment.</p>
                <img alt= "Create Event" src="../../assets/createevent.png">
                <p> The My Events page shows the events the user has signed up for. It shows the name of the event, the venue, the day, and the start time. The user can also leave events or cancel events (if they are the creator). </p>
                <vue-custom-scrollbar class="scroll-area"  :settings="settings" @ps-scroll-y="scrollHanle">
                <img src="../../assets/myevents.png" alt ="">
                </vue-custom-scrollbar>
                <p> The Venues page displays all the venues. It has the name of the venue, the address, the activities, and opening and closing times. </p>
                <vue-custom-scrollbar class="scroll-area"  :settings="settings" @ps-scroll-y="scrollHanle">
                <img src="../../assets/venues.png" alt ="">
                </vue-custom-scrollbar>
                <p> For admins, there are some differences with regards to functionality of the web interface. Those who are admins log in through the same portal as users do, but the events page is different for admins. </p>
                <p> Admins are able to cancel any event, regardless of who the creator is.</p>
                <vue-custom-scrollbar class="scroll-area"  :settings="settings" @ps-scroll-y="scrollHanle">
                <img src="../../assets/adminevents.png" alt ="">
                </vue-custom-scrollbar>
                <p>When creating events, admins can also create events on behalf of other users by specifying the name of the user. They can leave the field blank if they are creating the event for themselves.</p>
                <img alt= "Admin Create Event" src="../../assets/admincreateevents.png">
                <p> Next, admins can cancel any of the events they created from their My Events page, as well as leave or cancel any events they've joined. It looks the exactly like the My Events page for users, but admins have more privileges. </p>
                <p> On the Venues page, admins have the option to delete venues as well as create venues. Venues are deleted by pressing the delete button and when confirmed, the event is deleted. </p>
                <vue-custom-scrollbar class="scroll-area"  :settings="settings" @ps-scroll-y="scrollHanle">
                <img src="../../assets/adminvenues.png" alt ="">
                </vue-custom-scrollbar>
                <p>On the top right corner, admins have the option to create venues. When creating venues, admins specify the name, address, and activities held at the venue. The venues automatically open at 8:00 am and close at 8:00 pm. </p>
                <img alt= "Admin Create Event" src="../../assets/adminaddsvenue.png">
                <p>Lastly, admins have a Users page that displays the name of the user, their email, and whether or not they are an admin. Admins can delete any user, including other admins or themselves.</p>
                <vue-custom-scrollbar class="scroll-area"  :settings="settings" @ps-scroll-y="scrollHanle">
                <img src="../../assets/adminusers.png" alt ="">
                </vue-custom-scrollbar>
                <p>Admins are able to create users and set their name, email address, password, and choose whether or not the user is admin.</p>
                <vue-custom-scrollbar class="scroll-area"  :settings="settings" @ps-scroll-y="scrollHanle">
                <img src="../../assets/adminaddusers.png" alt ="">
                </vue-custom-scrollbar>
            </el-col>
        </el-row>
        </el-card>
         <el-card class="box-card">
        <el-row>
            <el-col :span="8">
                <h2>How the Android App Works</h2>
                <p>Tutorial of App Goes Here</p>
            </el-col>
        </el-row>
        </el-card>
    </div>
</template>

<script>
import moment from "moment";
import vueCustomScrollbar from 'vue-custom-scrollbar'
export default {
  components: {
    vueCustomScrollbar

  },
  data: function() {
    return {
        settings: {
        maxScrollbarLength: 60
      }
    };
  },
  computed: {
    
  },
  methods: {
  
    scrollHanle(evt) {
      console.log(evt)
    }
    
  },
  mounted: async function() {
    
  }
};
</script>
<style >
.scroll-area {
  position: relative;
  margin: auto;
  width: 600px;
  height: 400px;
}
</style>