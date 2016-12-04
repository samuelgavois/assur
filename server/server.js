Meteor.startup(function () {
	Meteor.methods({
    	getInformationsJSByCountry: function (url, timeout) {
	    	try {
	    		var options = {timeout: timeout};

	    		if (Meteor.settings !== undefined && Meteor.settings.proxyEnabled !== undefined) {
	    			proxyEnabled = Meteor.settings.proxyEnabled;
	    		}
	    		//console.log("With proxy : " + proxyEnabled);
	    		if (!proxyEnabled) {
					options.proxy = "";
				}

			    var res = request.sync(url + "?v=" + moment().format('YYYYMMDDHHmmsss'), options);
			    var result = {};
			    if (res.response.statusCode == 200) {
			    	result.version = extractVersion(res.response.body);
			    	result.generatedDate = extractGeneratedDate(res.response.body);
			    	result.diffDays = moment().diff(moment(result.generatedDate , "YYYY-MM-DD HH:mm:ss"), "days");

			    	var _idtc = extractIDTC(res.response.body);
			    	var _ids = extractIDS(res.response.body);

			    	result.idtc = _idtc;
			    	result.ids = _ids;
			    	result.launchTags = extractLaunchTags(res.response.body, _ids, _idtc);

			    } else {
			    	result.version = "Undefined";
			    	result.generatedDate = "";
			    	result.launchTags = "";
			    }
			    //console.log("Load url " + url + " : " + res.response.statusCode);
			    return result;
			} catch (e) {
				throw Meteor.Error(e);
			    // See below for info on errors
			}
		}
	});
});
