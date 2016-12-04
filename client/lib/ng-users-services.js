//Service de gestion des utilisateurs
angular.module('Assur').service('UsersService', ['$q', function($q) {
	this.checkUser = function(_googleUser) {
		var _user = this.getUser(_googleUser.email);
		if (_user === undefined) {
			_user = this.createUser(_googleUser);
		}
		return _user;
	};

	this.getUser = function(_googleEmail) {
		var _user = Users.findOne({email:_googleEmail.toLowerCase()});
		if (_user !== undefined && _user !== null) {
			_user.countries = _.sortBy(_user.countries, function(o) { return o.sort; });
		}
		return _user;
	};

	this.createUser = function(_googleUser) {
		//Rattache la liste des countries
		var countries = Countries.find({}, {sort:{sort:1}}).fetch();
		var countriesUser = [];
		countries.forEach(_country => {
			countriesUser.push(_country);
		});
		Users.insert({email: _googleUser.email.toLowerCase(), name:_googleUser.name, imageUrl: _googleUser.imageUrl, enabled: true, countries:countriesUser});

		return this.getUser(_googleUser.email);
	};

	this.activeUser = function(_user) {
		Users.update({_id: _user._id}, {enable: true});
	};

	this.deactiveUser = function(_user) {
		Users.update({_id: _user._id}, {enable: false});
	};

	this.setCountries = function(_user, _countries) {
		Users.update({_id: _user._id}, {countries: _countries});
	};

	this.getCountries = function(_user) {
		_user.countries = _.sortBy(_user.countries, function(o) { return o.sort; });
		return _user.countries;
	};

	this.getCountry = function(_user, _gaId) {
		var deferred = $q.defer();
		_user.countries.forEach(_country => {
			if (_country.gaId === _gaId) {
				deferred.resolve(_country);
			}
		});
		return deferred.promise;
	}

}]);