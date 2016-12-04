var getDataFromBodyByClient = function(_body) {
    return {
        nom : _body.nom,
        contact : _body.contact,
        email : _body.email,
        telephone : _body.telephone,
        siret : _body.siret,
        rdv1 : _body.rdv1,
        rdv2 : _body.rdv2,
        potentiel : _body.potentiel,
        commentaire : _body.commentaire,
        prospect : _body.prospect
    };
};
var isDataInvalidFromBodyByClient = function(_body) {
    return (_body.nom === undefined || _body.contact === undefined || _body.email === undefined || _body.telephone === undefined || _body.prospect === undefined);
};

Router.route('/clients',{where: 'server'})
    .get(function(){
        var response = Client.find({prospect:false, deleted_by:null}).fetch();
        response.map(function(immeuble, index) {
            //Get the number of immeubles
            response[index].nbimmeubles = ClientImmeuble.find({idClient: response[index]._id, deleted_by:null}).count();
        });

        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
    })

  	// POST /message - {message as post data}
  	// Add new message in MongoDB collection.
    .post(function(){
        var response;
        if (isDataInvalidFromBodyByClient(this.request.body)) {
            response = {
                "error" : true,
                "message" : "Données Client invalides"
            };
        } else {
            var _save = getDataFromBodyByClient(this.request.body);
            MongoDbUtils.setDateFieldsOnCreate(_save, userlogin.name);
            Client.insert(_save);
            response = {
                "error" : false,
                "message" : "Client ajouté."
            }
        }
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
    });

Router.route('/prospects',{where: 'server'})
    .get(function(){
        var response = Client.find({prospect:true, deleted_by:null}).fetch();
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
    });

Router.route('/clients/:id',{where: 'server'})
    // GET /message/:id - returns specific records
    .get(function(){
        var response;
        if (this.params.id !== undefined) {
            var data = Client.find({_id : this.params.id, deleted_by:null}).fetch();
            if (data.length > 0) {
                response = data[0];
                //Get the number of immeubles
                response.nbimmeubles = ClientImmeuble.find({idClient: response._id, deleted_by:null}).count();
            } else {
                response = {
                    "error" : true,
                    "message" : "Client non trouvé."
                }
            }
        }
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
    })

    // PUT /message/:id {message as put data}- update specific records.
    .put(function(){
        var response;
        if (this.params.id !== undefined) {
            var data = Client.find({_id : this.params.id, deleted_by:null}).fetch();
            
            if (data.length > 0) {
                var _save = getDataFromBodyByClient(this.request.body);
                MongoDbUtils.setDateFieldsOnUpdate(_save, userlogin.name);
                if (Client.update({_id : data[0]._id}, {$set:_save}, { upsert: true }) === 1) {
                    response = {
                        "error" : false,
                        "message" : "Client mis à jour."
                    }
                } else {
                    response = {
                        "error" : true,
                        "message" : "Client non mis à jour."
                    }
                }
            } else {
                response = {
                    "error" : true,
                    "message" : "Client non trouvé."
                }
            }
        }
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
    })

    // DELETE /message/:id delete specific record.
    .delete(function(){
        var response;
        if (this.params.id !== undefined) {
            var data = Client.find({_id : this.params.id, deleted_by:null}).fetch();
            if (data.length >  0) {
                if (cfg_server.mongodb.flag_to_delete) {
                    if (Client.update({_id : data[0]._id}, {$set:MongoDbUtils.getDateFieldsOnDelete(userlogin.name)}, { upsert: true }) === 1) {
                        response = {
                            "error" : false,
                            "message" : "Client flaggué à l'état supprimé"
                        }
                    } else {
                        response = {
                            "error" : true,
                            "message" : "Client non mis à jour."
                        }
                    }
                } else {
                    if (Client.remove(data[0]._id) === 1) {
                        response = {
                            "error" : false,
                            "message" : "Client supprimé"
                        }
                    } else {
                        response = {
                            "error" : true,
                            "message" : "Client non supprimé."
                        }
                    }
                }
            } else {
                response = {
                    "error" : true,
                    "message" : "Client non trouvé."
                }
            }
        }
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
    });
          