var getDataFromBodyByImmeuble = function(_body) {
    return {
        nom : _body.nom,
        adresse1 : _body.adresse1,
        adresse2 : _body.adresse2,
        codepostal : _body.codepostal,
        ville : _body.ville,
        sigle_obi : _body.sigle_obi,
        ref_syndic : _body.ref_syndic,
        annee_construction : _body.annee_construction,
        altitude : _body.altitude,
        surface_shob : _body.surface_shob,
        type_risque : _body.type_risque,
        commentaire : _body.commentaire
    };
};

var isDataInvalidFromBodyByImmeuble = function(_body) {
    return (_body.nom === undefined || _body.adresse1 === undefined || _body.codepostal === undefined || _body.ville === undefined || _body.sigle === undefined || _body.ref_syndic === undefined || _body.surface_shob === undefined || _body.type_risque === undefined);
};

Router.route('/immeubles',{where: 'server'})
    .get(function(){
        var response = Immeuble.find({deleted_by:null}).fetch();
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
    })

  	// POST /message - {message as post data}
  	// Add new message in MongoDB collection.
    .post(function(){
        var response;
        if (isDataInvalidFromBodyByImmeuble(this.request.body)) {
            response = {
                "error" : true,
                "message" : "Données Immeuble invalides"
            };
        } else {
            var _save = getDataFromBodyByImmeuble(this.request.body);
            MongoDbUtils.setDateFieldsOnCreate(_save, userlogin.name);
            Immeuble.insert(_save);
            response = {
                "error" : false,
                "message" : "Immeuble ajouté."
            }
        }
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
    });

Router.route('/immeubles/:id',{where: 'server'})
    // GET /message/:id - returns specific records
    .get(function(){
        var response;
        if (this.params.id !== undefined) {
            var data = Immeuble.find({_id : this.params.id, deleted_by:null}).fetch();
            if (data.length > 0) {
                response = data;
            } else {
                response = {
                    "error" : true,
                    "message" : "Immeuble non trouvé."
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
            var data = Immeuble.find({_id : this.params.id, deleted_by:null}).fetch();
            if (data.length > 0) {
                var _save = getDataFromBodyByImmeuble(this.request.body);
                MongoDbUtils.setDateFieldsOnUpdate(_save, userlogin.name);
                if (Immeuble.update({_id : data[0]._id}, {$set:_save}, { upsert: true }) === 1) {
                    response = {
                        "error" : false,
                        "message" : "Immeuble mis à jour."
                    }
                } else {
                    response = {
                        "error" : true,
                        "message" : "Immeuble non mis à jour."
                    }
                }
            } else {
                response = {
                    "error" : true,
                    "message" : "Immeuble non trouvé."
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
            var data = Immeuble.find({_id : this.params.id, deleted_by:null}).fetch();
            if (data.length >  0) {
                if (cfg_server.mongodb.flag_to_delete) {
                    if (Immeuble.update({_id : data[0]._id}, {$set:MongoDbUtils.getDateFieldsOnDelete(userlogin.name)}, { upsert: true }) === 1) {
                        response = {
                            "error" : false,
                            "message" : "Immeuble flaggué à l'état supprimé"
                        }
                    } else {
                        response = {
                            "error" : true,
                            "message" : "Immeuble non mis à jour."
                        }
                    }
                } else {
                    if (Immeuble.remove(data[0]._id) === 1) {
                        response = {
                            "error" : false,
                            "message" : "Immeuble supprimé"
                        }
                    } else {
                        response = {
                            "error" : true,
                            "message" : "Immeuble non supprimé."
                        }
                    }
                }
            } else {
                response = {
                    "error" : true,
                    "message" : "Immeuble non trouvé."
                }
            }
        }
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
    });

//Get immeubles for a client
Router.route('/clients-immeubles/:id',{where: 'server'})
    // GET /message/:id - returns specific records
    .get(function(){
        var response;
        if (this.params.id !== undefined) {
            var data = ClientImmeuble.find({idClient : this.params.id, deleted_by:null}).fetch();
            if (data.length > 0) {
                var immeubles = [];
                data.map(function(immeuble, index) {
                    //Get the immeuble
                    immeubles.push(Immeuble.findOne({_id : immeuble.idImmeuble, deleted_by:null}));
                });
                response = immeubles;
            } else {
                response = {
                    "error" : true,
                    "message" : "Immeubles non trouvés pour ce client."
                }
            }
        }
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
    });
  