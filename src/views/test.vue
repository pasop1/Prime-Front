<template>
  <div class="d-flex justify-center align-center">
    <v-row>
      <v-col cols="7" class>
        <v-card class="ma-14" color="#D1C4E9">
          <v-row>
            <div class="text-overline mt-6 ml-6 " >Prime Calculator</div>
            <v-col cols="6">
              <v-text-field
                class="pa-md-3 mx-lg-auto"
                label="Start"
                color=""
                filled
                rounded
                dense
                prepend-icon="mdi-ray-start"
                v-model="num1"
              >
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                class="pa-md-3 mx-lg-auto"
                label="End"
                filled
                rounded
                dense
                v-model="num2"
                prepend-icon="mdi-ray-start-end"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-layout align-center justify-center>
            <v-btn
              class="d-flex flex-column justify-center align-center mb-10"
              color="#FFE082"
        
              @click="onClickbtn">
              Submit
            </v-btn>
          </v-layout>

          <v-layout align-center justify-center>
            <center>
              <div v-if="submit">
                <v-row no-gutters>
                  <h5 class="mb-4 " >Prime is </h5>
                  <h5 class="mb-4 " >{{ submit }}</h5>
                </v-row>
              </div>
            </center>
          </v-layout>
        </v-card>
      </v-col>

      <v-col cols="5" class>
        <v-card class="ma-10" outlined color="#B39DDB">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">History</div>

              <v-data-table
                :headers="headers"
                :items="order_data"
                class="elevation-1"
              >
                <template v-slot:item.no="{ item }"
                  >{{ order_data.indexOf(item) + 1 }}.</template
                >
                <!-- <template v-slot:item.action="{ item }">
                  <v-btn icon @click="editBotChannel(item)">
                    <v-icon small>mdi-pencil</v-icon>
                  </v-btn>
                </template> -->

                <template v-slot:top>
                  <v-toolbar flat>
                    <v-dialog v-model="dialog" max-width="500px">
                      <v-card>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <center>
                                <template v-if="result">
                                  <v-row no-gutters>
                                    <span class="mt-6">
                                      Prime : {{ result[test].ansPrime }}</span
                                    >

                                    <pre>
Prime Count : {{ result[test].ansPrime.length }}</pre
                                    >
                                  </v-row>
                                </template>
                              </center>
                            </v-row>
                          </v-container>
                        </v-card-text>
                      </v-card>
                    </v-dialog>
                  </v-toolbar>
                </template>
                <template v-slot:item.prime="{ item }">

                    <v-icon class="mr-2" @click="editItem(item)">
                      mdi-eye
                    </v-icon>

                </template>
              </v-data-table>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      apidata: [],
      test: 0,
      submit: 0,
      num1: "",
      num2: "",
      count: "",
      result: "",
      order_data: [],
      dialog: false,
      headers: [
        {
          text: "No",
          sortable: false,
          value: "no",
          width: "10px",
          align: "center",
        },
        {
          text: "Input Start",
          sortable: false,
          value: "num1",
          align: "center",
        },
        {
          text: "Input End",
          sortable: false,
          value: "num2",
          align: "center",
        },
        {
          text: "Date",
          sortable: false,
          value: "date",
          align: "center",
        },
        {
          text: "Prime",
          value: "prime",
          sortable: false,
        },
      ],
      editedIndex: -1,
    };
  },

  // created() {
  //   // this.getData();
  //   // console.log("5555");
  // },
  methods: {
    //รวมฟังก์ชั่น
    getData() {
      this.order_data = [];
      this.axios
        .get("http://localhost:3000/test", {})
        .then((response) => {
          if (response.data) {
            var order = response.data;
            this.order_data = order;
            // console.log(this.order_data);
          }
          // console.log(response.data);
          // console.log(response.data[0].ans.length);
          this.apidata = response.data;
          this.result = this.apidata;
          this.submit = this.result[this.result.length - 1].ansPrime;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    postData() {
      var data = {
        num1: this.num1,
        num2: this.num2,
      };
      this.axios
        .post("http://localhost:3000/test", data)
        .then((response) => {});
    },

    editItem(item) {
      this.editedIndex = this.order_data.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.test = this.editedIndex;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    onClickbtn() {
      this.postData();
      this.getData();
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },
};
</script>

<style>

</style>
