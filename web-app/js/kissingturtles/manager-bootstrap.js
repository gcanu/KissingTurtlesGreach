var kissingturtles = kissingturtles || {};

kissingturtles.load = (function () {
    var managerObject = grails.mobile.mvc.manager(kissingturtles.configuration);

    managerObject.domainsObjects['game'].push.grailsEvents.on('execute-game', function (data) {
        var dataParsed = JSON.parse(data);
        dataParsed.NOTIFIED = true;
        managerObject.domainsObjects['game'].model.execute(dataParsed);
    });
}());

