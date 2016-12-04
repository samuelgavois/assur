Meteor.startup(function () {
  /*Client.remove({});
  Immeuble.remove({});
  ClientImmeuble.remove({});*/

  if (Client.find().count() === 0) {
    var clients = [
      {nom: "GROUPE DEBAYLE", contact: "Aucun", email: "contact@groupe-debayle.com", telephone: "", siret: "11122233344444", rdv1: "2016/11/07", rdv2: "", potentiel: "", commentaire: "", prospect: false},
      {nom: "SCI IMMO", contact: "Jean Durand", email: "jeandurand@sci-immo.com", telephone: "", siret: "40265490100001", rdv1: "2017/02/10", rdv2: "", potentiel: "", commentaire: "", prospect: true},
      {nom: "SCI DU PARC", contact: "Eric Moulin", email: "ericmoulin@sci-du-parc.com", telephone: "", siret: "40211190100321", rdv1: "2016/09/12", rdv2: "", potentiel: "", commentaire: "Aucun", prospect: false},
      {nom: "SCI IMMEUBLE", contact: "Paul Dupont", email: "pauldupont@sci-immeuble.com", telephone: "", siret: "40244490100999", rdv1: "2016/08/25", rdv2: "", potentiel: "", commentaire: "", prospect: false}
    ];

    var immeubles = [
      [
        {nom: "46 DAMREMONT",adresse1: "46 rue Damremont",codepostal: "75018",ville: "PARIS",sigle_obi: "", ref_syndic:"8", altitude:"<1500", surface_shob:3276, type_risque:"SDCV", commentaire:"En attente CG et CP pour comparatif"},
        {nom: "39 PROUDHON",adresse1: "39 rue Proudhon",codepostal: "75012",ville: "PARIS",sigle_obi: "SDC",ref_syndic: "142", annee_construction:1970, altitude:"<1500", surface_shob:960, type_risque:"SDCV", commentaire:"ACCORD CLIENT"}
      ],
      [],
      [],
      []
    ];

    clients.map(function(client, index) {
      //Insertion du client
      MongoDbUtils.setDateFieldsOnCreate(client);
      _idClient = Client.insert(client);

      //Insertion des immeubles du client
      if (immeubles[index].length > 0) {
        immeubles[index].map(function(immeuble, index) {
          MongoDbUtils.setDateFieldsOnCreate(immeuble);
          _idImmeuble = Immeuble.insert(immeuble);

          //Rattachement de l'immeuble au client
          clientimmeuble = {idClient: _idClient, idImmeuble: _idImmeuble};
          MongoDbUtils.setDateFieldsOnCreate(clientimmeuble);
          ClientImmeuble.insert(clientimmeuble);
        });
      }

    });
  }
});