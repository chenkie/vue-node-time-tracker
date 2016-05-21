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
            <h1 class="text-center">{{ totalTime }} hours</h1>
          </div>
        </div>
      </div>
      <div class="col-sm-9">
        <router-view :time-entries=timeEntries></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        totalTime: 0,
        timeEntries: []
      }
    },
    events: {
      addTimeEntry (timeEntry) {
        this.timeEntries.push(timeEntry)
        this.totalTime += parseFloat(timeEntry.totalTime)
      },
      deleteTimeEntry (index) {
        if (window.confirm('Are you sure you want to delete this time entry?')) {
          let timeEntry = this.timeEntries.splice(index, 1)[0]
          this.totalTime -= parseFloat(timeEntry.totalTime)
        }
      }
    }
  }
</script>
