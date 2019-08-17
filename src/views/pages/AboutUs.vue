<template>
    <div>
        <el-card class="box-card">
          <el-row>
              <el-col :span="24">
                  <h2>About Our App</h2>
                  <p>Insert Info About App.</p>
              </el-col>
          </el-row>
          </el-card>
          
              <el-card class="box-card">
                  <el-row>
                      <el-col :span="24">
                     <h2>About Us</h2>
                      </el-col>
                      </el-row>
                      </el-card>
                     <el-collapse v-model="active" @change="handleChange">
                     <el-collapse-item title="About Sasha" name="1">
                         <el-row>
                             <el-col :span="8">
                      <div>Sasha is a current student in the MSITM program at UT Austin. She was born and raised in Houston, Texas and received her undergraduate degree in Cybersecurity at UTSA. Her interests include connecting the bridge between Data Science and Cybersecurity and playing video games in whatever free time she has. </div>
                             </el-col>
                             <el-col :span="16">
                      <div><img alt="Sasha" src="../../assets/IMG_5073.jpg"></div>
                             </el-col>
                         </el-row>
                     </el-collapse-item>
                     <el-collapse-item title="Sam" name="2">
                     <div>Insert Info About Sam</div>
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