/* global Vue */
document.addEventListener("DOMContentLoaded", function(event) { 
  var app = new Vue({
    el: '#app',
    data: {
      leads: [],
      time_format: "12/25/17",
      url: "https://www.google.com/"
    },
    mounted: function() {
      $.get('/api/v1/leads.json').success(function(response) {
        console.log(this);
        this.leads = response;
      }.bind(this));
    },
    methods: {
      moment: function(date) {
        return moment(date);
      },
      onClickLead: function(lead) {
        console.log("lead", lead);
      },
      scrollFunction: function(lead) {
        console.log("oyt");
          var x = document.getElementById("myDIV");
          if (x.style.display === "none") {
              x.style.display = "block";
          } else {
              x.style.display = "none";
          }
      } 
    },


    computed: {

    },
  });
});


