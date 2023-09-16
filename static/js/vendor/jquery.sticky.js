(function(a) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], a)
    } else {
        if (typeof module === "object" && module.exports) {
            module.exports = a(require("jquery"))
        } else {
            a(jQuery)
        }
    }
}(function(a) {
    var h = Array.prototype.slice;
    var i = Array.prototype.splice;
    var d = {
            topSpacing: 0,
            bottomSpacing: 0,
            className: "is-sticky",
            wrapperClassName: "sticky-wrapper",
            center: false,
            getWidthFrom: "",
            widthFromWrapper: true,
            responsiveWidth: false,
            zIndex: "inherit"
        },
        c = a(window),
        b = a(document),
        j = [],
        k = c.height(),
        g = function() {
            var x = c.scrollTop(),
                m = b.height(),
                n = m - k,
                q = (x > n) ? n - x : 0;
            for (var r = 0, t = j.length; r < t; r++) {
                var w = j[r],
                    o = w.stickyWrapper.offset().top,
                    p = o - w.topSpacing - q;
                w.stickyWrapper.css("height", w.stickyElement.outerHeight());
                if (x <= p) {
                    if (w.currentTop !== null) {
                        w.stickyElement.css({
                            width: "",
                            position: "",
                            top: "",
                            "z-index": ""
                        });
                        w.stickyElement.parent().removeClass(w.className);
                        w.stickyElement.trigger("sticky-end", [w]);
                        w.currentTop = null
                    }
                } else {
                    var u = m - w.stickyElement.outerHeight() - w.topSpacing - w.bottomSpacing - x - q;
                    if (u < 0) {
                        u = u + w.topSpacing
                    } else {
                        u = w.topSpacing
                    }
                    if (w.currentTop !== u) {
                        var v;
                        if (w.getWidthFrom) {
                            padding = w.stickyElement.innerWidth() - w.stickyElement.width();
                            v = a(w.getWidthFrom).width() - padding || null
                        } else {
                            if (w.widthFromWrapper) {
                                v = w.stickyWrapper.width()
                            }
                        }
                        if (v == null) {
                            v = w.stickyElement.width()
                        }
                        w.stickyElement.css("width", v).css("position", "fixed").css("top", u).css("z-index", w.zIndex);
                        w.stickyElement.parent().addClass(w.className);
                        if (w.currentTop === null) {
                            w.stickyElement.trigger("sticky-start", [w])
                        } else {
                            w.stickyElement.trigger("sticky-update", [w])
                        }
                        if (w.currentTop === w.topSpacing && w.currentTop > u || w.currentTop === null && u < w.topSpacing) {
                            w.stickyElement.trigger("sticky-bottom-reached", [w])
                        } else {
                            if (w.currentTop !== null && u === w.topSpacing && w.currentTop < u) {
                                w.stickyElement.trigger("sticky-bottom-unreached", [w])
                            }
                        }
                        w.currentTop = u
                    }
                    var y = w.stickyWrapper.parent();
                    var z = (w.stickyElement.offset().top + w.stickyElement.outerHeight() >= y.offset().top + y.outerHeight()) && (w.stickyElement.offset().top <= w.topSpacing);
                    if (z) {
                        w.stickyElement.css("position", "absolute").css("top", "").css("bottom", 0).css("z-index", "")
                    } else {
                        w.stickyElement.css("position", "fixed").css("top", u).css("bottom", "").css("z-index", w.zIndex)
                    }
                }
            }
        },
        f = function() {
            k = c.height();
            for (var m = 0, n = j.length; m < n; m++) {
                var p = j[m];
                var o = null;
                if (p.getWidthFrom) {
                    if (p.responsiveWidth) {
                        o = a(p.getWidthFrom).width()
                    }
                } else {
                    if (p.widthFromWrapper) {
                        o = p.stickyWrapper.width()
                    }
                }
                if (o != null) {
                    p.stickyElement.css("width", o)
                }
            }
        },
        e = {
            init: function(l) {
                return this.each(function() {
                    var m = a.extend({}, d, l);
                    var n = a(this);
                    var p = n.attr("id");
                    var s = p ? p + "-" + d.wrapperClassName : d.wrapperClassName;
                    var r = a("<div></div>").attr("id", s).addClass(m.wrapperClassName);
                    n.wrapAll(function() {
                        if (a(this).parent("#" + s).length == 0) {
                            return r
                        }
                    });
                    var q = n.parent();
                    if (m.center) {
                        q.css({
                            width: n.outerWidth(),
                            marginLeft: "auto",
                            marginRight: "auto"
                        })
                    }
                    if (n.css("float") === "right") {
                        n.css({
                            "float": "none"
                        }).parent().css({
                            "float": "right"
                        })
                    }
                    m.stickyElement = n;
                    m.stickyWrapper = q;
                    m.currentTop = null;
                    j.push(m);
                    e.setWrapperHeight(this);
                    e.setupChangeListeners(this)
                })
            },
            setWrapperHeight: function(m) {
                var l = a(m);
                var n = l.parent();
                if (n) {
                    n.css("height", l.outerHeight())
                }
            },
            setupChangeListeners: function(m) {
                if (window.MutationObserver) {
                    var l = new window.MutationObserver(function(n) {
                        if (n[0].addedNodes.length || n[0].removedNodes.length) {
                            e.setWrapperHeight(m)
                        }
                    });
                    l.observe(m, {
                        subtree: true,
                        childList: true
                    })
                } else {
                    if (window.addEventListener) {
                        m.addEventListener("DOMNodeInserted", function() {
                            e.setWrapperHeight(m)
                        }, false);
                        m.addEventListener("DOMNodeRemoved", function() {
                            e.setWrapperHeight(m)
                        }, false)
                    } else {
                        if (window.attachEvent) {
                            m.attachEvent("onDOMNodeInserted", function() {
                                e.setWrapperHeight(m)
                            });
                            m.attachEvent("onDOMNodeRemoved", function() {
                                e.setWrapperHeight(m)
                            })
                        }
                    }
                }
            },
            update: g,
            unstick: function(l) {
                return this.each(function() {
                    var o = this;
                    var p = a(o);
                    var n = -1;
                    var m = j.length;
                    while (m-- > 0) {
                        if (j[m].stickyElement.get(0) === o) {
                            i.call(j, m, 1);
                            n = m
                        }
                    }
                    if (n !== -1) {
                        p.unwrap();
                        p.css({
                            width: "",
                            position: "",
                            top: "",
                            "float": "",
                            "z-index": ""
                        })
                    }
                })
            }
        };
    if (window.addEventListener) {
        window.addEventListener("scroll", g, false);
        window.addEventListener("resize", f, false)
    } else {
        if (window.attachEvent) {
            window.attachEvent("onscroll", g);
            window.attachEvent("onresize", f)
        }
    }
    a.fn.sticky = function(l) {
        if (e[l]) {
            return e[l].apply(this, h.call(arguments, 1))
        } else {
            if (typeof l === "object" || !l) {
                return e.init.apply(this, arguments)
            } else {
                a.error("Method " + l + " does not exist on jQuery.sticky")
            }
        }
    };
    a.fn.unstick = function(l) {
        if (e[l]) {
            return e[l].apply(this, h.call(arguments, 1))
        } else {
            if (typeof l === "object" || !l) {
                return e.unstick.apply(this, arguments)
            } else {
                a.error("Method " + l + " does not exist on jQuery.sticky")
            }
        }
    };
    a(function() {
        setTimeout(g, 0)
    })
}));