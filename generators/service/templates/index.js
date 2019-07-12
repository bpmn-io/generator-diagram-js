import <%= serviceCls %> from './<%= serviceCls %>';

export default {
  /**
   * Put other modules to be loaded before
   * this module load here.
   */
  __depends__: [ ],

  /**
   * Put names of services to be initialized
   * on module load here
   */
  __init__: [ <% if (initializeService) { %>'<%= serviceName %>'<% } %> ],

  '<%= serviceName %>': [ 'type', <%= serviceCls %> ]
};
