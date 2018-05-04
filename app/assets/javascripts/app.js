/* global Vue */
document.addEventListener("DOMContentLoaded", function(event) {
  var app = new Vue({
    el: "#app",
    data: {
      leads: [],
      time_format: "12/25/17",
      url: "https://www.google.com/",
      searchTerm: "",
      sortAttribute: "events",
      sortAscending: true
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
      },
      setSortAttribute: function(attribute) {
        if (attribute === this.sortAttribute) {
          this.sortAscending = !this.sortAscending;
        } else {
          this.sortAscending = true;
        }
        this.sortAttribute = attribute;
      },
      toggleFunction: function(lead) {
        if (document.getElementById(lead.id).style.display == "none") {
          document.getElementById(lead.id).style.display = "inline";
        } else {
          document.getElementById(lead.id).style.display = "none";
        }
      }
    },
    computed: {
      sortedLeads: function() {
        return this.leads.sort(
          function(lead1, lead2) {
            if (this.sortAttribute === "events") {
              if (lead1["most_recent_event"] && lead2["most_recent_event"]) {
                return lead2["most_recent_event"]["updated_at"].localeCompare(
                  lead1["most_recent_event"]["updated_at"]
                );
              }
            } else if (this.sortAscending) {
              if (lead1[this.sortAttribute] && lead2[this.sortAttribute]) {
                return lead1[this.sortAttribute].localeCompare(
                  lead2[this.sortAttribute]
                );
              }
            } else {
              if (lead1[this.sortAttribute] && lead2[this.sortAttribute]) {
                return lead2[this.sortAttribute].localeCompare(
                  lead1[this.sortAttribute]
                );
              }
            }
          }.bind(this)
        );
      }
    }
  });
});
