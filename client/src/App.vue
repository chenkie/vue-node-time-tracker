<template>
  <div id="wrapper">
    <nav class="navbar navbar-default">
      <div class="container">
        <a class="navbar-brand" href="#">
          <i class="glyphicon glyphicon-time"></i>
          Vue Time Tracker
        </a>
        <ul class="nav navbar-nav">
          <li><a v-link="'/home'">Home</a></li>
          <li><a v-link="'/time-entries'">Time Entries</a></li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <div class="col-sm-3">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h1 class="text-center">Total Time</h1>   
          </div>
          <div class="panel-body">
            <h1 class="text-center">{{ time }} hours</h1>
          </div>
        </div>
      </div>
      <div class="col-sm-9">
        <router-view :timeEntry=timeEntry></router-view>
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
        totalTime: 1.5,
        timeEntries: []
      }
    },
    events: {
      addTimeEntry (timeEntry) {
        this.timeEntries.push(timeEntry)
        this.totalTime += parseFloat(timeEntry.totalTime)
      },
      deleteTimeEntry (timeEntry) {
        let index = this.timeEntries.indexOf(timeEntry)
        if (window.confirm('Are you sure you want to delete this time entry?')) {
          this.timeEntries.splice(index, 1)
          this.totalTime -= parseFloat(timeEntry.totalTime)
      }
    }
  }
</script>
