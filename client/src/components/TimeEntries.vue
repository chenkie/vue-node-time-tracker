<template>
	<div>
		<button v-if="$route.path !== '/time-entries/log-time'" class="btn btn-primary">
            <router-link to="/time-entries/log-time">Log Time</router-link>
        </button>

    <div v-if="$route.path === '/time-entries/log-time'">
      <h3>Log Time</h3>     
    </div>

    <hr>

		<router-view @timeUpdate="timeUpdate"></router-view>

    <div class="time-entries">
      <p v-if="!timeEntries.length"><strong>No time entries yet</strong></p>
      
      <div class="list-group">

        <a class="list-group-item" v-for="timeEntry in timeEntries">
          <div class="row">

            <div class="col-sm-2 user-details">
              <img :src="timeEntry.user.image" class="avatar img-circle img-responsive" />
              <p class="text-center">
                <strong>
                  {{ timeEntry.user.firstName }} 
                  {{ timeEntry.user.lastName }}
                </strong>
              </p>
            </div>

            <div class="col-sm-2 text-center time-block">
              <h3 class="list-group-item-text total-time">
                <i class="glyphicon glyphicon-time"></i> 
                {{ timeEntry.totalTime }} <small>hours</small>
              </h3>
              <p class="label label-primary text-center">
                <i class="glyphicon glyphicon-calendar"></i> 
                {{ timeEntry.date }}
              </p>
            </div>

            <div class="col-sm-7 comment-section">
              <p>{{ timeEntry.comment }}</p>
            </div>

            <div class="col-sm-1">
              <button 
                class="btn btn-xs btn-danger delete-button"
                @click="deleteTimeEntry(timeEntry)">
                X
              </button>
            </div>

          </div>        
        </a>

      </div>
    </div>    
  </div>
</template>

<script>
  export default {
    data () {
      // We want to start with an existing time entry
      let existingEntry = {
        user: {
          firstName: 'Ryan',
          lastName: 'Chenkie',
          email: 'ryanchenkie@gmail.com',
          image: 'https://1.gravatar.com/avatar/7f4ec37467f2f7db6fffc7b4d2cc8dc2?s=250&d=retro&r=g'
        },
        comment: 'First time entry',
        totalTime: 1.5,
        date: '2016-04-08'
      }
      return {
        // Start out with the existing entry
        // by placing it in the array
        timeEntries: [existingEntry]
      }
    },
    methods: {
      // Get the index of the clicked time entry and splice it out
      deleteTimeEntry (timeEntry) {
        let index = this.timeEntries.indexOf(timeEntry)
        if (window.confirm('Are you sure you want to delete this time entry?')) {
          this.timeEntries.splice(index, 1)
          // this.$dispatch('deleteTime', timeEntry)
          this.$emit('deleteTime', timeEntry)
      }
    },
      timeUpdate (timeEntry) {
        this.timeEntries.push(timeEntry)
        return true
      }
    }
  }
</script>

<style>
  .avatar {
    height: 75px;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .user-details {
    background-color: #f5f5f5;
    border-right: 1px solid #ddd;
    margin: -10px 0;
  }
  .time-block {
    padding: 10px;
  }
  .comment-section {
    padding: 20px;
  }
</style>