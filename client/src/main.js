import Vue from 'vue'
import App from './App.vue'
import Home from './components/Home.vue'
import TimeEntries from './components/TimeEntries.vue'
import LogTime from './components/LogTime.vue'
import Sidebar from './components/Sidebar.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

// We want to apply VueResource and VueRouter
// to our Vue instance
Vue.use(VueResource)
Vue.use(VueRouter)

const routes = [{
    path: '/home',
    component: Home
}, {
    path: '/time-entries',
    component: TimeEntries,
    children: [
        { path: 'log-time', component: LogTime },
    ]
}, {
    path: '/time-entries/log-time2',
    component: { template: '<div>root component</div>' }
}]

const router = new VueRouter({ routes })
var bus = new Vue()

const app = new Vue({
    router,
    template: `
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
    `,
    components: {
        'sidebar': Sidebar
    },
    data() {
        return {
            // Start with the same value as our
            // first time entry. Hard-coded for now
            // because we'll use a different approach
            // in the next article anyway
            totalTime: 1.5
      }
    },
    methods: {
        evt: function() {
            console.log('router-view event');
        },
        // Increment the totalTime value based on the new
        // time entry that is dispatched up
        timeUpdate(timeEntry) {
            console.log('main.js: timeEntry: ' + timeEntry)
            this.totalTime += parseFloat(timeEntry.totalTime)
        },
        // Decrement totalTime when a time entry is deleted
        deleteTime(timeEntry) {
            console.log('timeEntry: ' + timeEntry)
            this.totalTime -= parseFloat(timeEntry.totalTime)
    }
  }

}).$mount('#app')