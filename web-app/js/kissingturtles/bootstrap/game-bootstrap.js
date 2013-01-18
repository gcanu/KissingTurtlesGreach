var kissingturtles = kissingturtles || {};

kissingturtles.loadgame = (function () {
    kissingturtles.configuration.domain.push({
        name: 'game',
        view: {
            'list': $('#section-list-game'),
            'save': $('#submit-game'),
            'add': $('#add-game'),
            'show': $('a[id^="game-list-"]'),
            'remove': $('#delete-game')
        },
        options: {
            offline: false,
            synchronization: true
        }
    });
}());
