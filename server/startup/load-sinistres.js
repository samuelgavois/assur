Meteor.startup(function () {
  //Sinistre.remove({});
  if (Sinistre.find().count() === 0) {
    var sinistres = [
      
    ];

    sinistres.map(function(sinistre, index) {
      MongoDbUtils.setDateFieldsOnCreate(sinistre);
      Sinistre.insert(sinistre);
    });
  }
});