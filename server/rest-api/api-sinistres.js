var getDataFromBodyBySinistre = function(_body) {
    return {
        nom : _body.nom
    };
};

var isDataInvalidFromBodyBySinistre = function(_body) {
    return (_body.nom === undefined);
};

Router.route('/sinistres',{where: 'server'})
    .get(function(){
        var response = Sinistre.find({deleted_by:null}).fetch();
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
    })

  	// POST /message - {message as post data}
  	// Add new message in MongoDB collection.
    .post(function(){
        var response;
        if (isDataInvalidFromBodyBySinistre(this.request.body)) {
            response = {
                "error" : true,
                "message" : "Données Sinistre invalides"
            };
        } else {
            var _save = getDataFromBodyBySinistre(this.request.body);
            MongoDbUtils.setDateFieldsOnCreate(_save, userlogin.name);
            Sinistre.insert(_save);
            response = {
                "error" : false,
                "message" : "Sinistre ajouté."
            }
        }
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
    });

Router.route('/sinistres/:id',{where: 'server'})
    // GET /message/:id - returns specific records
    .get(function(){
        var response;
        if (this.params.id !== undefined) {
            var data = Sinistre.find({_id : this.params.id, deleted_by:null}).fetch();
            if (data.length > 0) {
                response = data;
            } else {
                response = {
                    "error" : true,
                    "message" : "Sinistre non trouvé."
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
            var data = Sinistre.find({_id : this.params.id, deleted_by:null}).fetch();
            if (data.length > 0) {
                var _save = getDataFromBodyBySinistre(this.request.body);
                MongoDbUtils.setDateFieldsOnUpdate(_save, userlogin.name);
                if (Sinistre.update({_id : data[0]._id}, {$set:_save}, { upsert: true }) === 1) {
                    response = {
                        "error" : false,
                        "message" : "Sinistre mis à jour."
                    }
                } else {
                    response = {
                        "error" : true,
                        "message" : "Sinistre non mis à jour."
                    }
                }
            } else {
                response = {
                    "error" : true,
                    "message" : "Sinistre non trouvé."
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
            var data = Sinistre.find({_id : this.params.id, deleted_by:null}).fetch();
            if (data.length >  0) {
                if (cfg_server.mongodb.flag_to_delete) {
                    if (Sinistre.update({_id : data[0]._id}, {$set:MongoDbUtils.getDateFieldsOnDelete(userlogin.name)}, { upsert: true }) === 1) {
                        response = {
                            "error" : false,
                            "message" : "Sinistre flaggué à l'état supprimé"
                        }
                    } else {
                        response = {
                            "error" : true,
                            "message" : "Sinistre non mis à jour."
                        }
                    }
                } else {
                    if (Sinistre.remove(data[0]._id) === 1) {
                        response = {
                            "error" : false,
                            "message" : "Sinistre supprimé"
                        }
                    } else {
                        response = {
                            "error" : true,
                            "message" : "Sinistre non supprimé."
                        }
                    }
                }
            } else {
                response = {
                    "error" : true,
                    "message" : "Sinistre non trouvé."
                }
            }
        }
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
    });
  