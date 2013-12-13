var handlerBackButton = function () {
    var _this = $(this);
    var container = _this.parent().parent();
    var slider = $(".slider", container);
    var marginLeft = parseInt(slider.css("marginLeft"));
    if (marginLeft !== 0) {
        var view = $(".view", container);
        marginLeft = marginLeft + view.width();
        $(slider).animate({"marginLeft": marginLeft});
    }
};

var handlerClickMenu = function () {
    var _this = $(this);
    var parent = _this.parent();

    var slider = $(parent).parent();
    $(parent).nextAll().each(function (idx, el) {
        $(el).hide();
    });

    var submenu = _this.data("submenu");
    if (submenu != undefined) {
        var $submenu = $(submenu);
        $submenu.show();
        var margin_left = $submenu.css("margin-left");
        console.log(margin_left);

        $(slider).animate({"marginLeft": "-" + margin_left});
    }
};

var buildPane = function (data) {
    var pane = $("<ul></ul>");
    data.forEach(function (item, idx, coll) {
        var li_tag = $("<li></li>")
            .appendTo(pane)
            .click(handlerClickMenu);

        $("<span></span>")
            .html(item.caption)
            .appendTo(li_tag);

        if (item.submenu != null) {
            var submenu = buildPane(item.submenu);
            li_tag.data("submenu", submenu);
        }
    });

    return pane.get(0);
}

var addPane = function (pane, slider, view, depth) {
    slider.append(pane);
    var margin_left = view.width() * depth;
    $(pane).css({
        "width": view.width(),
        "margin-left": margin_left
    });

    $("> li", pane).each(function (idx, el) {
        var submenu = $(this).data("submenu");
        if (submenu != null) {
            addPane(submenu, slider, view, depth + 1);
        }
    });
}

var createControl = function (el, data) {
    var container = $("<div></div>").addClass("slide-menu");
    var caption = $("<div></div>").addClass("caption").appendTo(container);
    $("<span>back</span>")
        .appendTo(caption)
        .click(handlerBackButton);

    var view = $("<div></div>").addClass("view").appendTo(container);

    var slider = $("<div></div>").addClass("slider").appendTo(view);
    container.appendTo(el);

    var hContainer = container.height();
    var wContainer = container.width();

    var hCaption = caption.height();

    view.height(hContainer - hCaption);
    view.width(wContainer);

    var pane = buildPane(data);
    addPane(pane, slider, view, 0);

    var wSlider = view.width() * slider.children().length;
    slider.width(wSlider);
    slider.height(view.height());
}

var initSlideMenu = function (el, data) {
    createControl(el, data);
};
