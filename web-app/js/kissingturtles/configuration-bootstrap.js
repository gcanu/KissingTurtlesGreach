var kissingturtles = kissingturtles || {};

kissingturtles.loadConfiguration = (function () {
    kissingturtles.configuration = {
        baseURL: "http://localhost:8080/KissingTurtlesGreach/",
        applicationContext: "KissingTurtlesGreach/",
        //Uncomment before pushing to cloudfoundry
        //baseURL: "http://KissingTurtlesGreach.cloudfoundry.com/",
        //applicationContext: "",
        namespace: "kissingturtles",
        domain:[]
    };
})();

