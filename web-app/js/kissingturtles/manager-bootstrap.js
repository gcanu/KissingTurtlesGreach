var kissingturtles = kissingturtles || {};

kissingturtles.load = (function () {
    var managerObject = grails.mobile.mvc.manager(kissingturtles.configuration);
    
    managerObject.domainsObjects['game'].push.grailsEvents.on('execute-game', function (data) {
		// TO DO do similar stuff than the one in pushmanager.js
    });
}());

