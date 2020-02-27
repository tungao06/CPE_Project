import firebase from 'firebase'
import router from '@/router'

export const actions = {
    // login handler
    loginAdmin({ commit }, payload) {
        commit('setLoading', true)
        firebase.database().ref('admin_login/').once('value')
            .then(snapshot => {
                snapshot.forEach(v => {
                    if (v.val().username === payload.username && v.val().password.toString() === payload.password) {
                        commit('setUser', payload.username)
                        router.push('/admin/' + payload.username)
                    }
                })
            })
        commit('setLoading', false)
    },
    loginTeacher({ commit }, payload) {
        commit('setLoading', true)
        firebase.database().ref('teacher_login/').once('value')
            .then(snapshot => {
                snapshot.forEach(v => {
                    if (v.val().username === payload.username && v.val().password.toString() === payload.password) {
                        commit('setUser', payload.username)
                        router.push('/teacher/' + payload.username)
                    }
                })
            })
        commit('setLoading', false)
    },
    loginStudent({ commit }, payload) {
        commit('setLoading', true)
        firebase.database().ref('student_login/').once('value')
            .then(snapshot => {
                snapshot.forEach(v => {
                    if (v.val().username === payload.username && v.val().password.toString() === payload.password) {
                        commit('setUser', payload.username)
                        router.push('/student/' + payload.username)
                    }
                })
            })
        commit('setLoading', false)
    },

    // schoolyear
    createYear({ commit }, payload) {
        commit('setLoading', true)
        firebase.database().ref('schoolyear/' + payload).set({
            year: payload,
            status: false
        })
        commit('setLoading', false)
    },
    settingYear({ commit }, payload) {
        commit('setLoading', true)
        firebase
            .database()
            .ref("schoolyear")
            .on("child_added", snapshot => {
                payload.push({
                    id: snapshot.key,
                    ...snapshot.val()
                });
            });
        commit('setLoading', false)
    },
    updateYear({ commit }, payload) {
        commit('setLoading', true)
        firebase.database().ref('schoolyear').on('child_changed', snapshot => {
            const update = payload.find(year => year.id == snapshot.key)
            update.year = snapshot.val().year
            update.status = snapshot.val().status
        })
        commit('setLoading', false)
    },

    // teacher profile
    settingTeacherProfile({ commit }, payload) {
        commit('setLoading', true)
        firebase
            .database()
            .ref("teacher_profile")
            .on("child_added", snapshot => {
                payload.push({
                    id: snapshot.key,
                    ...snapshot.val()
                });
            });
        commit('setLoading', false)
    },

    // teacher
    settingTeacher({ commit }, payload) {
        commit('setLoading', true)
        // beware variable in this structure
        firebase
            .database()
            .ref("teacher")
            .on("child_added", snapshot =>
                payload.push({
                    value: snapshot.key,
                    text:
                        snapshot.val().prefix +
                        " " +
                        snapshot.val().firstname +
                        " " +
                        snapshot.val().lastname
                })
            );
        commit('setLoading', false)
    },

    // student
    settingStudent({ commit }, payload) {
        commit('setLoading', true)
        firebase.database().ref('student').on('child_added', snapshot => {
            payload.push({
                id: snapshot.key,
                ...snapshot.val()
            })
        })
        commit('setLoading', false)
    },
    // teacher register
    teacherRegister({ commit }, payload) {
        commit('setLoading', true)
        if (payload.seat !== 0) {
            firebase.database().ref('teacher_register/' + payload.year + '/' + payload.user).set({
                seat: payload.seat,
                remain: payload.seat
            })
        }
        commit('setLoading', false)
    },

    //notice
    createNotice( {commit} , payload) {
        commit('setLoading', true);
        let date = new Date()
        firebase.database().ref('test_notice/').push({
          title: payload.title,
          information: payload.information,
          user: payload.user,
          imageUrl: payload.imageUrl,
          date:
              date.getDate() +
              "/" +
              (date.getMonth() + 1) +
              "/" +
              date.getFullYear() +
              " " +
              date.getHours() +
              ":" +
              date.getMinutes() +
              ":" +
              date.getSeconds()
        });
        commit('setLoading', false)
    },
    // createNoticeWithImage( {commit} , payload) {
    //     commit('setLoading', true)
    //     let date = new Date()
    //     const message = {
    //         title: payload.title,
    //         information: payload.information,
    //         user: payload.user,
    //         imageUrl:'',
    //         date:
    //           date.getDate() +
    //           "/" +
    //           (date.getMonth() + 1) +
    //           "/" +
    //           date.getFullYear() +
    //           " " +
    //           date.getHours() +
    //           ":" +
    //           date.getMinutes() +
    //           ":" +
    //           date.getSeconds()
    //     }
    //     let imageUrl
    //     let key
    //     let task
    //     firebase.database().ref('test_notice/').push(message)
    //         .then((data) =>{
    //             key = data.key
    //             return key
    //         })
    //         .then(key => {
    //             //const filename = payload.image.name
    //             //const ext = filename.slice(filename.lastIndexOf('.'))
    //              task = firebase.storage().ref('noticeImage/' + key).put(payload.image)
    //             return task
    //         })
    //         // get URL method.
    //         .then(() => {
    //             task.snapshot.ref.getDownloadURL().then((url) => {
    //                 this.imageUrl = url
    //                 // eslint-disable-next-line
    //                 //console.log(this.imageUrl)
    //                 return firebase.database().ref('test_notice').child(key).update({
    //                     imageUrl: this.imageUrl
    //                 })
    //             })
    //         })
    //         .then(() => {
    //             commit('createNotice', {
    //                 ...message,
    //                 imageUrl: imageUrl,
    //                 id: key
    //             })
    //         })
    //         .catch((error) => {
    //             // eslint-disable-next-line
    //             console.log(error)
    //           })
    //     commit('setLoading', false)
    // },
    showNotice({ commit }, payload) {
        commit('setLoading', true)
        firebase
          .database()
          .ref("test_notice")
          .on("child_added", snapshot => {
            payload.unshift({
                id: snapshot.key,
                ...snapshot.val()
            });
        });
        commit('setLoading', false)
    }
}