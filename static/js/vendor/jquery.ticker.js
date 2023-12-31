(function(a) {
    a.fn.ticker = function(c) {
        var d = a.extend({}, a.fn.ticker.defaults, c);
        if (a(this).length == 0) {
            if (window.console && window.console.log) {
                window.console.log("Element does not exist in DOM!")
            } else {
                alert("Element does not exist in DOM!")
            }
            return false
        }
        var b = "#" + a(this).attr("id");
        var e = a(this).get(0).tagName;
        return this.each(function() {
            var r = h();
            var p = {
                position: 0,
                time: 0,
                distance: 0,
                newsArr: {},
                play: true,
                paused: false,
                contentLoaded: false,
                dom: {
                    contentID: "#ticker-content-" + r,
                    titleID: "#ticker-title-" + r,
                    titleElem: "#ticker-title-" + r + " SPAN",
                    tickerID: "#ticker-" + r,
                    wrapperID: "#ticker-wrapper-" + r,
                    revealID: "#ticker-swipe-" + r,
                    revealElem: "#ticker-swipe-" + r + " SPAN",
                    controlsID: "#ticker-controls-" + r,
                    prevID: "#prev-" + r,
                    nextID: "#next-" + r,
                    playPauseID: "#play-pause-" + r
                }
            };
            if (e != "UL" && e != "OL" && d.htmlFeed === true) {
                g("Cannot use <" + e.toLowerCase() + "> type of element for this plugin - must of type <ul> or <ol>");
                return false
            }
            d.direction == "rtl" ? d.direction = "right" : d.direction = "left";
            i();

            function f(t) {
                var u = 0,
                    s;
                for (s in t) {
                    if (t.hasOwnProperty(s)) {
                        u++
                    }
                }
                return u
            }

            function h() {
                var s = new Date;
                return s.getTime()
            }

            function g(s) {
                if (d.debugMode) {
                    if (window.console && window.console.log) {
                        window.console.log(s)
                    } else {
                        alert(s)
                    }
                }
            }

            function i() {
                m();
                a(b).wrap('<div id="' + p.dom.wrapperID.replace("#", "") + '"></div>');
                a(p.dom.wrapperID).children().remove();
                a(p.dom.wrapperID).append('<div id="' + p.dom.tickerID.replace("#", "") + '" class="ticker"><div id="' + p.dom.titleID.replace("#", "") + '" class="ticker-title"><span><!-- --></span></div><p id="' + p.dom.contentID.replace("#", "") + '" class="ticker-content"></p><div id="' + p.dom.revealID.replace("#", "") + '" class="ticker-swipe"><span><!-- --></span></div></div>');
                a(p.dom.wrapperID).removeClass("no-js").addClass("ticker-wrapper has-js " + d.direction);
                a(p.dom.tickerElem + "," + p.dom.contentID).hide();
                if (d.controls) {
                    a(p.dom.controlsID).on("click mouseover mousedown mouseout mouseup", function(t) {
                        var s = t.target.id;
                        if (t.type == "click") {
                            switch (s) {
                                case p.dom.prevID.replace("#", ""):
                                    p.paused = true;
                                    a(p.dom.playPauseID).addClass("paused");
                                    j("prev");
                                    break;
                                case p.dom.nextID.replace("#", ""):
                                    p.paused = true;
                                    a(p.dom.playPauseID).addClass("paused");
                                    j("next");
                                    break;
                                case p.dom.playPauseID.replace("#", ""):
                                    if (p.play == true) {
                                        p.paused = true;
                                        a(p.dom.playPauseID).addClass("paused");
                                        k()
                                    } else {
                                        p.paused = false;
                                        a(p.dom.playPauseID).removeClass("paused");
                                        n()
                                    }
                                    break
                            }
                        } else {
                            if (t.type == "mouseover" && a("#" + s).hasClass("controls")) {
                                a("#" + s).addClass("over")
                            } else {
                                if (t.type == "mousedown" && a("#" + s).hasClass("controls")) {
                                    a("#" + s).addClass("down")
                                } else {
                                    if (t.type == "mouseup" && a("#" + s).hasClass("controls")) {
                                        a("#" + s).removeClass("down")
                                    } else {
                                        if (t.type == "mouseout" && a("#" + s).hasClass("controls")) {
                                            a("#" + s).removeClass("over")
                                        }
                                    }
                                }
                            }
                        }
                    });
                    a(p.dom.wrapperID).append('<ul id="' + p.dom.controlsID.replace("#", "") + '" class="ticker-controls"><li id="' + p.dom.playPauseID.replace("#", "") + '" class="jnt-play-pause controls"><a href=""><!-- --></a></li><li id="' + p.dom.prevID.replace("#", "") + '" class="jnt-prev controls"><a href=""><!-- --></a></li><li id="' + p.dom.nextID.replace("#", "") + '" class="jnt-next controls"><a href=""><!-- --></a></li></ul>')
                }
                if (d.displayType != "fade") {
                    a(p.dom.contentID).mouseover(function() {
                        if (p.paused == false) {
                            k()
                        }
                    }).mouseout(function() {
                        if (p.paused == false) {
                            n()
                        }
                    })
                }
                if (!d.ajaxFeed) {
                    q()
                }
            }

            function m() {
                if (p.contentLoaded == false) {
                    if (d.ajaxFeed) {
                        if (d.feedType == "xml") {
                            a.ajax({
                                url: d.feedUrl,
                                cache: false,
                                dataType: d.feedType,
                                async: true,
                                success: function(t) {
                                    count = 0;
                                    for (var s = 0; s < t.childNodes.length; s++) {
                                        if (t.childNodes[s].nodeName == "rss") {
                                            xmlContent = t.childNodes[s]
                                        }
                                    }
                                    for (var u = 0; u < xmlContent.childNodes.length; u++) {
                                        if (xmlContent.childNodes[u].nodeName == "channel") {
                                            xmlChannel = xmlContent.childNodes[u]
                                        }
                                    }
                                    for (var z = 0; z < xmlChannel.childNodes.length; z++) {
                                        if (xmlChannel.childNodes[z].nodeName == "item") {
                                            xmlItems = xmlChannel.childNodes[z];
                                            var w, v = false;
                                            for (var A = 0; A < xmlItems.childNodes.length; A++) {
                                                if (xmlItems.childNodes[A].nodeName == "title") {
                                                    w = xmlItems.childNodes[A].lastChild.nodeValue
                                                } else {
                                                    if (xmlItems.childNodes[A].nodeName == "link") {
                                                        v = xmlItems.childNodes[A].lastChild.nodeValue
                                                    }
                                                }
                                                if ((w !== false && w != "") && v !== false) {
                                                    p.newsArr["item-" + count] = {
                                                        type: d.titleText,
                                                        content: '<a href="' + v + '">' + w + "</a>"
                                                    };
                                                    count++;
                                                    w = false;
                                                    v = false
                                                }
                                            }
                                        }
                                    }
                                    if (f(p.newsArr < 1)) {
                                        g("Couldn't find any content from the XML feed for the ticker to use!");
                                        return false
                                    }
                                    p.contentLoaded = true;
                                    q()
                                }
                            })
                        } else {
                            g("Code Me!")
                        }
                    } else {
                        if (d.htmlFeed) {
                            if (a(b + " LI").length > 0) {
                                a(b + " LI").each(function(s) {
                                    p.newsArr["item-" + s] = {
                                        type: d.titleText,
                                        content: a(this).html()
                                    }
                                })
                            } else {
                                g("Couldn't find HTML any content for the ticker to use!");
                                return false
                            }
                        } else {
                            g("The ticker is set to not use any types of content! Check the settings for the ticker.");
                            return false
                        }
                    }
                }
            }

            function q() {
                p.contentLoaded = true;
                a(p.dom.titleElem).html(p.newsArr["item-" + p.position].type);
                a(p.dom.contentID).html(p.newsArr["item-" + p.position].content);
                if (p.position == (f(p.newsArr) - 1)) {
                    p.position = 0
                } else {
                    p.position++
                }
                distance = a(p.dom.contentID).width();
                time = distance / d.speed;
                o()
            }

            function o() {
                a(p.dom.contentID).css("opacity", "1");
                if (p.play) {
                    var s = a(p.dom.titleID).width() + 20;
                    a(p.dom.revealID).css(d.direction, s + "px");
                    if (d.displayType == "fade") {
                        a(p.dom.revealID).hide(0, function() {
                            a(p.dom.contentID).css(d.direction, s + "px").fadeIn(d.fadeInSpeed, l)
                        })
                    } else {
                        if (d.displayType == "scroll") {} else {
                            a(p.dom.revealElem).show(0, function() {
                                a(p.dom.contentID).css(d.direction, s + "px").show();
                                animationAction = d.direction == "right" ? {
                                    marginRight: distance + "px"
                                } : {
                                    marginLeft: distance + "px"
                                };
                                a(p.dom.revealID).css("margin-" + d.direction, "0px").delay(20).animate(animationAction, time, "linear", l)
                            })
                        }
                    }
                } else {
                    return false
                }
            }

            function l() {
                if (p.play) {
                    a(p.dom.contentID).delay(d.pauseOnItems).fadeOut(d.fadeOutSpeed);
                    if (d.displayType == "fade") {
                        a(p.dom.contentID).fadeOut(d.fadeOutSpeed, function() {
                            a(p.dom.wrapperID).find(p.dom.revealElem + "," + p.dom.contentID).hide().end().find(p.dom.tickerID + "," + p.dom.revealID).show().end().find(p.dom.tickerID + "," + p.dom.revealID).removeAttr("style");
                            q()
                        })
                    } else {
                        a(p.dom.revealID).hide(0, function() {
                            a(p.dom.contentID).fadeOut(d.fadeOutSpeed, function() {
                                a(p.dom.wrapperID).find(p.dom.revealElem + "," + p.dom.contentID).hide().end().find(p.dom.tickerID + "," + p.dom.revealID).show().end().find(p.dom.tickerID + "," + p.dom.revealID).removeAttr("style");
                                q()
                            })
                        })
                    }
                } else {
                    a(p.dom.revealElem).hide()
                }
            }

            function k() {
                p.play = false;
                a(p.dom.tickerID + "," + p.dom.revealID + "," + p.dom.titleID + "," + p.dom.titleElem + "," + p.dom.revealElem + "," + p.dom.contentID).stop(true, true);
                a(p.dom.revealID + "," + p.dom.revealElem).hide();
                a(p.dom.wrapperID).find(p.dom.titleID + "," + p.dom.titleElem).show().end().find(p.dom.contentID).show()
            }

            function n() {
                p.play = true;
                p.paused = false;
                l()
            }

            function j(s) {
                k();
                switch (s) {
                    case "prev":
                        if (p.position == 0) {
                            p.position = f(p.newsArr) - 2
                        } else {
                            if (p.position == 1) {
                                p.position = f(p.newsArr) - 1
                            } else {
                                p.position = p.position - 2
                            }
                        }
                        a(p.dom.titleElem).html(p.newsArr["item-" + p.position].type);
                        a(p.dom.contentID).html(p.newsArr["item-" + p.position].content);
                        break;
                    case "next":
                        a(p.dom.titleElem).html(p.newsArr["item-" + p.position].type);
                        a(p.dom.contentID).html(p.newsArr["item-" + p.position].content);
                        break
                }
                if (p.position == (f(p.newsArr) - 1)) {
                    p.position = 0
                } else {
                    p.position++
                }
            }
        })
    };
    a.fn.ticker.defaults = {
        speed: 0.1,
        ajaxFeed: false,
        feedUrl: "",
        feedType: "xml",
        displayType: "reveal",
        htmlFeed: true,
        debugMode: true,
        controls: true,
        titleText: "",
        direction: "ltr",
        pauseOnItems: 3000,
        fadeInSpeed: 600,
        fadeOutSpeed: 300
    }
})(jQuery);