<template>
  <v-container>
    <v-container>
    <v-card class="elevation-3 mx-auto" max-width="510">
      <v-card-title>โปรไฟล์</v-card-title>
      <v-card-text>
        <v-layout column wrap align-start>
          <v-flex xs12 sm6 >
            <v-img height="300" width="300" :src="image"></v-img>
            <v-spacer></v-spacer>
            <h3>Email : {{email}}</h3>
            <h6 class="title">ความเชี่ยวชาญ</h6>
            <v-list dense v-for="(pro, i) in professionals" :key="'a' + i">
              <v-list-item>
                <v-list-item-action>
                  <v-icon>mdi-checkbox-blank-circle</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ pro }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <h6 class="title">หัวข้อโปรเจก</h6>
            <v-list dense v-for="(head, index) in topics" :key="index">
              <v-list-item>
                <v-list-item-action>
                  <v-icon>mdi-checkbox-blank-circle</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ head }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions>
          <v-btn raised color="primary" @click="editButton = !editButton">แก้ไข</v-btn>
      </v-card-actions>
    </v-card>
    </v-container>
    <v-container>
      <v-card class="mx-auto" max-width="40%" color v-if="editButton">
        <v-toolbar color="primary">
          <v-toolbar-title>แก้ไขโปรไฟล์</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
       
        <v-card-text>
          <v-form>
            <v-text-field
              outlined
              label="ImageURL"
              name="imageURL"
              type="text"
              v-model="image"
            ></v-text-field>
          </v-form>
        </v-card-text>
        
        <v-card-text>
          <v-form>
            <v-text-field
              outlined
              label="email"
              name="email"
              type="text"
              v-model="email"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-text>
          <v-form v-for="(pro, index) in professionals" :key="index">
            <v-text-field
              outlined
              label="ความเชี่ยวชาญ"
              name="pro"
              type="text"
              v-model="professionals[index]"
              :key="index"
            ></v-text-field>
          </v-form>
          <v-btn raised color="primary" @click="addProfessional">เพิ่มความเชี่ยวชาญ</v-btn>
        </v-card-text>

        <v-card-text>
          <v-form v-for="(topic, index) in topics" :key="index">
            <v-text-field
              outlined
              label="หัวข้อโปรเจค"
              name="topic"
              type="text"
              v-model="topics[index]"
              :key="index"
            ></v-text-field>
          </v-form>
          <v-btn raised color="primary" @click="addTopic">เพิ่มหัวข้อโปรเจค</v-btn>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error">ยกเลิก</v-btn>
          <v-btn @click="updateProfile" color="primary">บันทึก</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase'
export default {
  data() {
    return {
      profiles: [],
      professionals: [],
      topics:[],
      image:'',
      email:'',
      user: this.$store.getters.getUser,
      profileInput:[],
      editButton: true
    };
  },
    methods: {
      addProfessional: function () {
        this.professionals.push({ value: '' });
         console.log(this.professionals);
        
      },
      addTopic: function () {
        this.topics.push({ value: '' });
        console.log(this.topics);
        
      },
      updateProfile:function(){
        firebase.database().ref('teacher_profile').child(this.user).update({
          image: this.image,
          email: this.email,
          header: this.topics,
          professional: this.professionals
        })
      }
    },
  created() {
    this.$store.dispatch("settingTeacherProfile", this.profiles);
    // eslint-disable-next-line
    //console.log(this.user)
    this.profiles.forEach(value => {
        if (value.id === this.user) {
            this.professionals = value.professional
            this.topics = value.header
            this.image = value.image
            this.email = value.email
        }   
    })
  }
};
</script>
