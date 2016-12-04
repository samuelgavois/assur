Meteor.startup(function () {
  //Immeuble.remove({});
  if (Immeuble.find().count() === 0) {
    var immeubles = [
      [
        {}
      ],
    ];

    /*immeubles.map(function(elt) {
      elt.created_date = moment().format();
      elt.updated_date = elt.created_date;
      elt.created_by = "Administrateur";
      elt.updated_by = elt.created_by;
      Immeuble.insert(elt);
    });*/
  }
});