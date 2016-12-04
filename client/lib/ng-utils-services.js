angular.module('Assur').service('UtilsService', ['CSV','$document','$timeout', function(CSV, $document, $timeout) {
	this.exportToCsv = function(data, filename, header, fieldSeparator) {
		var optionsExportToCsv = {};
		optionsExportToCsv.filename = filename;
		optionsExportToCsv.header = header;
		optionsExportToCsv.fieldSep = fieldSeparator;
		optionsExportToCsv.txtDelim = "";
		optionsExportToCsv.quoteStrings = "";
		
		CSV.stringify(data, optionsExportToCsv).then(function(result){
			var blob = new Blob([result], {
				type: "text/csv;charset=utf-8;"
			});
			if (window.navigator.msSaveOrOpenBlob) {
				navigator.msSaveBlob(blob, optionsExportToCsv.filename);
			} else {
				var downloadLink = angular.element('<a></a>');
				downloadLink.attr('href', window.URL.createObjectURL(blob));
				downloadLink.attr('download',optionsExportToCsv.filename);
				
				$document.find('body').append(downloadLink);
				$timeout(function () {
					downloadLink[0].click();
					downloadLink.remove();
				}, null);
			}
		});
	};
}]);
