<template>
  <div id="wrapper">
    <nav class="navbar navbar-default">
      <div class="container">
        <a class="navbar-brand" href="#">
          <i class="glyphicon glyphicon-time"></i>
          Vue Time Tracker
        </a>
        <ul class="nav navbar-nav">
          <li><router-link to="/home">Home</router-link></li>
          <li><router-link to="/time-entries">Time Entries</router-link></li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <div class="col-sm-3">
        <sidebar :time="totalTime"></sidebar>
      </div>
      <div class="col-sm-9">
        <router-view @deleteTime="deleteTime" @timeUpdate="timeUpdate"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import Sidebar from './components/Sidebar.vue'
  
  export default {
    components: { 'sidebar': Sidebar },
    data () {
      return {
        // Start with the same value as our
        // first time entry. Hard-coded for now
        // because we'll use a different approach
        // in the next article anyway
        totalTime: 1.5
      }
    },
        methods: {
      // Increment the totalTime value based on the new
      // time entry that is dispatched up
      timeUpdate (timeEntry) {
        this.totalTime += parseFloat(timeEntry.totalTime)
      },
      // Decrement totalTime when a time entry is deleted
      deleteTime (timeEntry) {
        this.totalTime -= parseFloat(timeEntry.totalTime)
      }
    }
  }
</script>
