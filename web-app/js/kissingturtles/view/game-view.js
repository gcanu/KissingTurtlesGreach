var kissingturtles = kissingturtles || {};
kissingturtles.view = kissingturtles.view || {};

kissingturtles.view.gameview = function (model, elements) {

    var that = grails.mobile.mvc.view(model, elements);

    // Register events
    that.model.listedItems.attach(function (data) {
        $('#list-game').empty();
        var key, items = model.getItems();
        $.each(items, function(key, value) {
            renderElement(value);
        });
        $('#list-game').listview('refresh');
    });

    //----------------------------------------------------------------------------------------
    //   Callback after first player create a new game. First player will play as Franklin.
    //----------------------------------------------------------------------------------------
    that.model.createdItem.attach(function (data, event) {
        if (data.item.errors) {
            $.each(data.item.errors, function (index, error) {
                $('#input-game-' + error.field).validationEngine('showPrompt', error.message, 'fail');
            });
            event.stopPropagation();
        } else if (data.item.message) {
            showGeneralMessage(data, event);
        } else {
            var confAsString = data.item.mazeDefinition;
            var conf = JSON.parse(confAsString);

            that.currentMaze = conf;
            that.draw = ktDraw(document.getElementById('canvas'), conf, that.currentMaze.steps[0]);
            that.player = "franklin";
            that.gameId = data.item.id;

            renderElement(data.item);
            showElement(data.item);

            $("#list-game").listview('refresh');
            $.mobile.changePage($("#section-show-game"));
        }
    });

    //----------------------------------------------------------------------------------------
    //    Callback to display the maze after execute method
    //----------------------------------------------------------------------------------------
    that.model.executed.attach(function (data, event) {
        var myGameObject = data.item;
        $.each(myGameObject.configuration.steps, function (key, value) {
            that.draw(value, function () {
                var win = myGameObject.configuration.winningAnimation;
                if (win) {
                    that.draw.win(win.x, win.y);
                }
            });
        });
    });

    that.model.updatedItem.attach(function (data, event) {
        if (data.item.errors) {
            $.each(data.item.errors, function(index, error) {
                $('#input-game-' + error.field).validationEngine('showPrompt',error.message, 'fail');
            });
            event.stopPropagation();
        } else if (data.item.message) {
            showGeneralMessage(data, event);
        } else {
            updateElement(data.item);
            $('#list-game').listview('refresh');
            $.mobile.changePage($('#section-list-game'));
        }
    });

    that.model.deletedItem.attach(function (data, event) {
        if (data.item.message) {
            showGeneralMessage(data, event);
        } else {
            $('#game-list-' + data.item.id).parents('li').remove();
            $('#list-game').listview('refresh');
            $.mobile.changePage($('#section-list-game'));
        }
    });

    //----------------------------------------------------------------------------------------
    //   Click on Play brings you here
    //----------------------------------------------------------------------------------------
    $('#play').live('click tap', function (event) {
        var id = localStorage.getItem("KissingTurtles.UserId");
        if (id) {
            $.mobile.changePage($("#section-list-game"));
            that.listButtonClicked.notify();
        } else {
            $.mobile.changePage($("#section-show-user"));
        }
    });

    //----------------------------------------------------------------------------------------
    //   Click on Save on user page. Your name is asked only once.
    //----------------------------------------------------------------------------------------
    $("#submit-user").live("click tap", function(event) {
        var name = $('#input-user-name').val();
        localStorage.setItem("KissingTurtles.UserId", name);
        $.mobile.changePage($("#section-list-game"));
    });

    that.elements.list.live('pageinit', function (e) {
        that.listButtonClicked.notify();
    });

    //----------------------------------------------------------------------------------------
    //   Click on 'Create your own game' brings you here
    //----------------------------------------------------------------------------------------
    $("#add-game").live('click tap', function (event) {
        event.stopPropagation();
        var obj = {user1: localStorage.getItem("KissingTurtles.UserId")};
        var newElement = {
            game: JSON.stringify(obj)
        };
        that.createButtonClicked.notify(newElement, event);
    });

    //----------------------------------------------------------------------------------------
    //   Click on Execute my DSL script brings you here
    //----------------------------------------------------------------------------------------
    $("#submit-game").live("click tap", function(event) {
        var dslInput = $('#input-move-name').val();
        var gameId = that.gameId;
        that.executeButtonClicked.notify({title: "KissingTurtles", content: dslInput, gameId: gameId, user: localStorage.getItem("KissingTurtles.UserId")});
    });

    that.elements.show.live('click tap', function (event) {
        event.stopPropagation();
        $('#form-update-game').validationEngine('hide');
        $('#form-update-game').validationEngine({promptPosition: 'bottomLeft'});
        showElement($(event.currentTarget).attr("data-id"));
    });

    var createElement = function () {
        resetForm('form-update-game');
        $('#delete-game').hide();
        $.mobile.changePage($('#section-show-game'));
    };

    var showElement = function (id) {
        resetForm('form-update-game');
        var element = that.model.items[id];
        if (element) {
            $.each(element, function (name, value) {
                var input = $('#input-game-' + name);
                input.val(value);
                if (input.attr('data-type') == 'date') {
                    input.scroller('setDate', (value === '') ? '' : new Date(value), true);
                }
            });
        }
        $('#delete-game').show();
        $('#delete-game').parent().show();
        $.mobile.changePage($('#section-show-game'));
    };

    var resetForm = function (form) {
        $('input[data-type="date"]').each(function() {
            $(this).scroller('destroy').scroller({
                preset: 'date',
                theme: 'default',
                display: 'modal',
                mode: 'scroller',
                dateOrder: 'mmD ddyy'
            });
        });
        var div = $("#" + form);
        div.find('input:text, input:hidden, input[type="number"], input:file, input:password').val('');
        div.find('input:radio, input:checkbox').removeAttr('checked').removeAttr('selected');//.checkboxradio('refresh');
    };
    
    var createListItem = function (element) {
        var li, a = $('<a>');
        a.attr({
            id : 'game-list-' + element.id,
            'data-id' : element.id,
            'data-transition': 'fade'
        });
        a.text(getText(element));
        if (element.offlineStatus === 'NOT-SYNC') {
            li =  $('<li>').attr({'data-theme': 'e'});
            li.append(a);
        } else {
            li = $('<li>').append(a);
        }
        return li;
    };

    var renderElement = function (element) {
        if (element.offlineAction !== 'DELETED') {
            $('#list-game').append(createListItem(element));
        }
    };

    var updateElement = function (element) {
        $('#game-list-' + element.id).parents('li').replaceWith(createListItem(element));
    };

    var getText = function (data) {
        return data.user1 + " playing with " + data.user2;
    };


    var showGeneralMessage = function(data, event) {
        $.mobile.showPageLoadingMsg( $.mobile.pageLoadErrorMessageTheme, data.item.message, true );
        setTimeout( $.mobile.hidePageLoadingMsg, 3000 );
        event.stopPropagation();
    };

    return that;
};