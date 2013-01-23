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

    that.model.createdItem.attach(function (data, event) {
        if (data.item.errors) {
            $.each(data.item.errors, function(index, error) {
                $('#input-game-' + error.field).validationEngine('showPrompt',error.message, 'fail');
            });
            event.stopPropagation();
        } else if (data.item.message) {
            showGeneralMessage(data, event);
        } else {
            renderElement(data.item);
            $('#list-game').listview('refresh');
            $.mobile.changePage($('#section-list-game'));
		}
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
        //TO DO
        // retrieve userId from local storage
        // if already there go to section-list-game
        // otherwise change to page section-show-user
    });

    //----------------------------------------------------------------------------------------
    //   Click on Save on user page. Your name is asked only once.
    //----------------------------------------------------------------------------------------
    $("#submit-user").live("click tap", function(event) {
        //TO DO
        // retrive user name from input box
        // store it in localstorage
        // go to section-list-game
    });

    that.elements.list.live('pageinit', function (e) {
        that.listButtonClicked.notify();
    });

    that.elements.save.live('click tap', function (event) {
        event.stopPropagation();
        $('#form-update-game').validationEngine('hide');
        if($('#form-update-game').validationEngine('validate')) {
            var obj = grails.mobile.helper.toObject($('#form-update-game').find('input, select'));
            var newElement = {
                game: JSON.stringify(obj)
            };
            if (obj.id === '') {
                that.createButtonClicked.notify(newElement, event);
            } else {
                that.updateButtonClicked.notify(newElement, event);
            }
        }
    });

    that.elements.remove.live('click tap', function (event) {
        event.stopPropagation();
        that.deleteButtonClicked.notify({ id: $('#input-game-id').val() }, event);
    });

    that.elements.add.live('click tap', function (event) {
        event.stopPropagation();
        $('#form-update-game').validationEngine('hide');
        $('#form-update-game').validationEngine({promptPosition: 'bottomLeft'});
        createElement();
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
        $.each(element, function (name, value) {
            var input = $('#input-game-' + name);
            input.val(value);
            if (input.attr('data-type') == 'date') {
                input.scroller('setDate', (value === '') ? '' : new Date(value), true);
            }
        });
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
        var textDisplay = '';
        $.each(data, function (name, value) {
            if (name !== 'class' && name !== 'id' && name !== 'offlineAction' && name !== 'offlineStatus' && name !== 'status' && name !== 'version') {
                if (typeof value !== 'object') {   // do not display relation in list view
                    textDisplay += value + ' - ';
                }
            }
        });
        return textDisplay.substring(0, textDisplay.length - 2);
    };

    var showGeneralMessage = function(data, event) {
        $.mobile.showPageLoadingMsg( $.mobile.pageLoadErrorMessageTheme, data.item.message, true );
        setTimeout( $.mobile.hidePageLoadingMsg, 3000 );
        event.stopPropagation();
    };

    return that;
};