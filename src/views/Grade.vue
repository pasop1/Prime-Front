<template> 
  <div class="d-flex justify-center align-center">
    <v-card class="mx-auto" width="800px ">
      <br>
      <v-text-field
        filled
        class="pa-md-3 mx-lg-auto"
        label="POINT"
        v-model="point"
        prepend-icon="mdi-alarm-check"
        :rules="[rules.required, rules.counter]"
      ></v-text-field>
      <v-text-field
        filled
        class="pa-md-3 mx-lg-auto" 
        label="Grade"
        disabled
        v-model="grade"
        prepend-icon="mdi-star"
      ></v-text-field>
      <v-layout align-center justify-center>
      <v-btn class="d-flex flex-column justify-center align-center" color="success" @click="onClickgradebtn"> GRADE </v-btn>
      </v-layout>
    <br>
    <v-layout align-center justify-center>
    <center>
    <v-row no-gutters>
        <h3 v-if="point != ''">{{ result }}</h3>
    </v-row>
    </center>
    </v-layout>
<br>
    <v-btn
              icon
              color="pink"
            >
              <v-icon>mdi-heart</v-icon>
            </v-btn>
      
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      point: "",
      grade: "",
      result:"",
      rules: {
          required: value => !!value || 'Required.',
          counter: value => (parseInt(value) <= 100 && parseInt(value) >= 0) || 'Max value is 100 and Min value is 0',
      }
    };
  },
  methods: {
    display(item) {
      alert("Name : " + item.name);
    },

    onClickgradebtn(){
        if (parseInt(this.point) >= 80) {
            this.grade = 'A'
            this.result = 'Excellent'
        } else if (parseInt(this.point) >= 70) {
            this.grade = 'B'
            this.result = 'Good'
        } else if (parseInt(this.point) >= 60) {
            this.grade = 'C'
            this.result = 'Fair'
            this.grade = 'D'
            this.result = 'Poor'
        } else {
            this.grade = 'F'
            this.result = 'Failure'
        }
    }
  },
};

</script>

<style></style>