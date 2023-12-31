(function(a) {
    var b, c, d;
    b = {
        speed: 700,
        pause: 4000,
        showItems: 1,
        mousePause: true,
        height: 0,
        animate: true,
        margin: 0,
        padding: 0,
        startPaused: false,
        autoAppend: true
    };
    c = {
        moveUp: function(f, e) {
            return c.showNextItem(f, e, "up")
        },
        moveDown: function(f, e) {
            return c.showNextItem(f, e, "down")
        },
        nextItemState: function(h, e) {
            var f, g;
            g = h.element.children("ul");
            f = h.itemHeight;
            if (h.options.height > 0) {
                f = g.children("li:first").height()
            }
            f += h.options.margin + h.options.padding * 2;
            return {
                height: f,
                options: h.options,
                el: h.element,
                obj: g,
                selector: e === "up" ? "li:first" : "li:last",
                dir: e
            }
        },
        showNextItem: function(i, e, g) {
            var f, h;
            h = c.nextItemState(i, g);
            h.el.trigger("vticker.beforeTick");
            f = h.obj.children(h.selector).clone(true);
            if (h.dir === "down") {
                h.obj.css("top", "-" + h.height + "px").prepend(f)
            }
            if (e && e.animate) {
                if (!i.animating) {
                    c.animateNextItem(h, i)
                }
            } else {
                c.nonAnimatedNextItem(h)
            }
            if (h.dir === "up" && i.options.autoAppend) {
                f.appendTo(h.obj)
            }
            return h.el.trigger("vticker.afterTick")
        },
        animateNextItem: function(e, g) {
            var f;
            g.animating = true;
            f = e.dir === "up" ? {
                top: "-=" + e.height + "px"
            } : {
                top: 0
            };
            return e.obj.animate(f, g.options.speed, function() {
                a(e.obj).children(e.selector).remove();
                a(e.obj).css("top", "0px");
                return g.animating = false
            })
        },
        nonAnimatedNextItem: function(e) {
            e.obj.children(e.selector).remove();
            return e.obj.css("top", "0px")
        },
        nextUsePause: function() {
            var e, f;
            f = a(this).data("state");
            e = f.options;
            if (f.isPaused || c.hasSingleItem(f)) {
                return
            }
            return d.next.call(this, {
                animate: e.animate
            })
        },
        startInterval: function() {
            var e, f;
            f = a(this).data("state");
            e = f.options;
            return f.intervalId = setInterval((function(g) {
                return function() {
                    return c.nextUsePause.call(g)
                }
            })(this), e.pause)
        },
        stopInterval: function() {
            var e;
            if (!(e = a(this).data("state"))) {
                return
            }
            if (e.intervalId) {
                clearInterval(e.intervalId)
            }
            return e.intervalId = void 0
        },
        restartInterval: function() {
            c.stopInterval.call(this);
            return c.startInterval.call(this)
        },
        getState: function(f, e) {
            var g;
            if (!(g = a(e).data("state"))) {
                throw new Error("vTicker: No state available from " + f)
            }
            return g
        },
        isAnimatingOrSingleItem: function(e) {
            return e.animating || this.hasSingleItem(e)
        },
        hasMultipleItems: function(e) {
            return e.itemCount > 1
        },
        hasSingleItem: function(e) {
            return !c.hasMultipleItems(e)
        },
        bindMousePausing: (function(e) {
            return function(f, g) {
                return f.bind("mouseenter", function() {
                    if (g.isPaused) {
                        return
                    }
                    g.pausedByCode = true;
                    c.stopInterval.call(this);
                    return d.pause.call(this, true)
                }).bind("mouseleave", function() {
                    if (g.isPaused && !g.pausedByCode) {
                        return
                    }
                    g.pausedByCode = false;
                    d.pause.call(this, false);
                    return c.startInterval.call(this)
                })
            }
        })(this),
        setItemLayout: function(f, h, g) {
            var e;
            f.css({
                overflow: "hidden",
                position: "relative"
            }).children("ul").css({
                position: "relative",
                margin: 0,
                padding: 0
            }).children("li").css({
                margin: g.margin,
                padding: g.padding
            });
            if (isNaN(g.height) || g.height === 0) {
                f.children("ul").children("li").each(function() {
                    if (a(this).height() > h.itemHeight) {
                        return h.itemHeight = a(this).height()
                    }
                });
                f.children("ul").children("li").each(function() {
                    return a(this).height(h.itemHeight)
                });
                e = g.margin + g.padding * 2;
                return f.height((h.itemHeight + e) * g.showItems + g.margin)
            } else {
                return f.height(g.height)
            }
        },
        defaultStateAttribs: function(e, f) {
            return {
                itemCount: e.children("ul").children("li").length,
                itemHeight: 0,
                itemMargin: 0,
                element: e,
                animating: false,
                options: f,
                isPaused: f.startPaused,
                pausedByCode: false
            }
        }
    };
    d = {
        init: function(g) {
            var e, f, h;
            if (h = a(this).data("state")) {
                d.stop.call(this)
            }
            h = null;
            e = jQuery.extend({}, b);
            g = a.extend(e, g);
            f = a(this);
            h = c.defaultStateAttribs(f, g);
            a(this).data("state", h);
            c.setItemLayout(f, h, g);
            if (!g.startPaused) {
                c.startInterval.call(this)
            }
            if (g.mousePause) {
                return c.bindMousePausing(f, h)
            }
        },
        pause: function(f) {
            var e, g;
            g = c.getState("pause", this);
            if (!c.hasMultipleItems(g)) {
                return false
            }
            g.isPaused = f;
            e = g.element;
            if (f) {
                a(this).addClass("paused");
                return e.trigger("vticker.pause")
            } else {
                a(this).removeClass("paused");
                return e.trigger("vticker.resume")
            }
        },
        next: function(e) {
            var f;
            f = c.getState("next", this);
            if (c.isAnimatingOrSingleItem(f)) {
                return false
            }
            c.restartInterval.call(this);
            return c.moveUp(f, e)
        },
        prev: function(e) {
            var f;
            f = c.getState("prev", this);
            if (c.isAnimatingOrSingleItem(f)) {
                return false
            }
            c.restartInterval.call(this);
            return c.moveDown(f, e)
        },
        stop: function() {
            var e;
            e = c.getState("stop", this);
            return c.stopInterval.call(this)
        },
        remove: function() {
            var e, f;
            f = c.getState("remove", this);
            c.stopInterval.call(this);
            e = f.element;
            e.unbind();
            return e.remove()
        }
    };
    return a.fn.vTicker = function(e) {
        if (d[e]) {
            return d[e].apply(this, Array.prototype.slice.call(arguments, 1))
        }
        if (typeof e === "object" || !e) {
            return d.init.apply(this, arguments)
        }
        return a.error("Method " + e + " does not exist on jQuery.vTicker")
    }
})(jQuery);