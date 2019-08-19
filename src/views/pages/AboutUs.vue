<template>
    <div>
        <el-card class="box-card">
          <el-row>
              <el-col :span="24">
                  <h2>About Our App</h2>
                  <p>Our App, SBSO Events makes scheduling events easy. SBSO Events will allow users to create their own events and join daily events created by others. SBSO Events takes the best features of our website and implements them in an app for Android devices.</p>
              </el-col>
          </el-row>
          </el-card>
          
              <el-card class="box-card">
                  <el-row>
                      <el-col :span="16">
                     <h2>About Us</h2>
                      </el-col>
                      </el-row>
                      </el-card>
                     <el-collapse v-model="active" @change="handleChange">
                     <el-collapse-item title="About Sasha" name="1">
                         <el-row>
                             <el-col :span="8">
                      <div>Sasha is a current student in the MSITM program at UT Austin. She was born and raised in Houston, Texas and received her undergraduate degree in Cybersecurity at UTSA and worked as a Supplemental Instructor in statistics. Her interests include connecting the bridge between Data Science and Cybersecurity and baking sweets, playing video games, catching up on the latest movies, and traveling in whatever free time she has. </div>
                             </el-col>
                             <el-col :span="8">
                      <div><img alt="Sasha" src="../../assets/sashabio.png"></div>
                             </el-col>
                         </el-row>
                     </el-collapse-item>
                     <el-collapse-item title="About Sam" name="2">
                         <el-row>
                             <el-col :span="8">
                     <div>Sam is a graduate student at The University of Texas as Austin. He earned a degree in MIS from Angelo State University in 2014 and immediately jumped into a role as a software developer/integrator at USAA doing manual and automated testing. Following that, he became a full-stack JavaScript developer working remotely full time in Austin. In that role, he got to learn VueJS, ExpressJS, and Postgres. In his free time, Sam is usually taking classes at Orangetheory Fitness, walking or jogging along Town Lake, volunteering, spending time at the downtown library, or playing video games.</div>
                     </el-col>
                     <el-col :span="8">
                     <div><img alt="Sam" src="../../assets/bioimg.png"></div>
                     </el-col>
                         </el-row>
                     </el-collapse-item>
                     </el-collapse>
                     </div>
        </template>

<script>
import moment from "moment";
export default {
  components: {
  },
  data: function() {
    
    return {
      active: ['1']
    };
  },
  methods: {
  
     handleChange(val) {
        console.log(val);
      }
  },
  mounted: async function() {
    
  }
};
</script>