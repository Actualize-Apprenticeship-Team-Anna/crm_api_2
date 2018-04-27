/* global Vue */
document.addEventListener("DOMContentLoaded", function(event) {
  var app = new Vue({
    el: "#app",
    data: {
      leads: [],
      time_format: "12/25/17",
      url: "https://www.google.com/",
      searchTerm: ""
    },
    mounted: function() {
      $.get("/api/v1/leads.json").success(
        function(response) {
          console.log(this);
          this.leads = response;
        }.bind(this)
      );
    },
    methods: {
      moment: function(date) {
        return moment(date);
      },
      toggleFunction: function(lead) {
        console.log("hello")
       if( document.getElementById(lead.id).style.display=='none' ){
         document.getElementById(lead.id).style.display = 'block';
       }else{
         document.getElementById(lead.id).style.display = 'none';
       }
    },
    isValidLead: function(lead) {
           var validFirstName = lead.first_name
             .toLowerCase()
             .includes(this.searchTerm.toLowerCase());
           var validLastName = lead.last_name
             .toLowerCase()
             .includes(this.searchTerm.toLowerCase());
           var validEmail = lead.email
             .toLowerCase()
             .includes(this.searchTerm.toLowerCase());
           return validFirstName || validLastName || validEmail;
         }
    },
    computed: {}
  });
});

