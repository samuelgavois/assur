var getDataFromBodyByUtilisateur = function(_body) {
    var result = {
        nom : _body.nom,
        email : _body.email,
        telephone : _body.telephone,
        photo : _body.photo,
        password : _body.password,
        role : _body.role
    }
    return result;
};

var isDataInvalidFromBodyByUtilisateur = function(_body) {
    return (_body.nom === undefined || _body.email === undefined || _body.password === undefined || _body.role === undefined);
};

Router.route('/utilisateurs',{where: 'server'})
    .get(function(){
        var response = Utilisateur.find({deleted_by:null}).fetch();
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
    })

  	// POST /message - {message as post data}
  	// Add new message in MongoDB collection.
    .post(function(){
        var response;
        if (isDataInvalidFromBodyByUtilisateur(this.request.body)) {
            response = {
                "error" : true,
                "message" : "Données Utilisateur invalides"
            };
        } else {
            var _save = getDataFromBodyByUtilisateur(this.request.body);
            MongoDbUtils.setDateFieldsOnCreate(_save, userlogin.name);
            Utilisateur.insert(_save);
            response = {
                "error" : false,
                "message" : "Utilisateur ajouté."
            }
        }
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
    });

Router.route('/utilisateurs/:id',{where: 'server'})
    // GET /message/:id - returns specific records
    .get(function(){
        var response;
        if (this.params.id !== undefined) {
            var data = Utilisateur.find({_id : this.params.id, deleted_by:null}).fetch();
            if (data.length > 0) {
                response = data;
            } else {
                response = {
                    "error" : true,
                    "message" : "Utilisateur non trouvé."
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
            var data = Utilisateur.find({_id : this.params.id, deleted_by:null}).fetch();
            if (data.length > 0) {
                var _save = getDataFromBodyByUtilisateur(this.request.body);
                MongoDbUtils.setDateFieldsOnUpdate(_save, userlogin.name);
                if (Utilisateur.update({_id : data[0]._id}, {$set:_save}, { upsert: true }) === 1) {
                    response = {
                        "error" : false,
                        "message" : "Utilisateur mis à jour."
                    }
                } else {
                    response = {
                        "error" : true,
                        "message" : "Utilisateur non mis à jour."
                    }
                }
            } else {
                response = {
                    "error" : true,
                    "message" : "Utilisateur non trouvé."
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
            var data = Utilisateur.find({_id : this.params.id, deleted_by:null}).fetch();
            if (data.length >  0) {
                if (cfg_server.mongodb.flag_to_delete) {
                    if (Utilisateur.update({_id : data[0]._id}, {$set:MongoDbUtils.getDateFieldsOnDelete(userlogin.name)}, { upsert: true }) === 1) {
                        response = {
                            "error" : false,
                            "message" : "Utilisateur flaggué à l'état supprimé"
                        }
                    } else {
                        response = {
                            "error" : true,
                            "message" : "Utilisateur non mis à jour."
                        }
                    }
                } else {
                    if (Utilisateur.remove(data[0]._id) === 1) {
                        response = {
                            "error" : false,
                            "message" : "Utilisateur supprimé"
                        }
                    } else {
                        response = {
                            "error" : true,
                            "message" : "Utilisateur non supprimé."
                        }
                    }
                }
            } else {
                response = {
                    "error" : true,
                    "message" : "Utilisateur non trouvé."
                }
            }
        }
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
    });
  