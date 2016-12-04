Meteor.startup(function () {
  //Utilisateur.remove({});
  if (Utilisateur.find().count() === 0) {
    var utilisateurs = [
      {nom: "GAVOIS Isabelle", email: "isabelle@test.fr", telephone: "0102030405", photo : "60.jpeg", password: "123456", role: "Gestionnaire"},
      {nom: "Commercial 1", email: "commercial1@test.fr", telephone: "0102030405", photo : "61.jpeg", password: "123456", role: "Commercial"},
      {nom: "Commercial 2", email: "commercial2@test.fr", telephone: "0102030405", photo : "62.jpeg", password: "123456", role: "Commercial"},
      {nom: "Administrateur", email: "admin@test.fr", telephone: "", photo : "63.jpeg", password: "123456", role: "Administrateur"},
    ];

    utilisateurs.map(function(utilisateur, index) {
      MongoDbUtils.setDateFieldsOnCreate(utilisateur);
      Utilisateur.insert(utilisateur);
    });
  }
});