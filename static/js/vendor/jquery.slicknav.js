(function(a, c, h) {
    var b = {
            label: "MENU",
            duplicate: true,
            duration: 200,
            easingOpen: "swing",
            easingClose: "swing",
            closedSymbol: "&#9658;",
            openedSymbol: "&#9660;",
            prependTo: "body",
            appendTo: "",
            parentTag: "a",
            closeOnClick: false,
            allowParentLinks: false,
            nestedParentLinks: true,
            showChildren: false,
            removeIds: true,
            removeClasses: false,
            removeStyles: false,
            brand: "",
            animations: "jquery",
            init: function() {},
            beforeOpen: function() {},
            beforeClose: function() {},
            afterOpen: function() {},
            afterClose: function() {}
        },
        e = "slicknav",
        g = "slicknav",
        d = {
            DOWN: 40,
            ENTER: 13,
            ESCAPE: 27,
            LEFT: 37,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38,
        };

    function f(i, j) {
        this.element = i;
        this.settings = a.extend({}, b, j);
        if (!this.settings.duplicate && !j.hasOwnProperty("removeIds")) {
            this.settings.removeIds = false
        }
        this._defaults = b;
        this._name = e;
        this.init()
    }
    f.prototype.init = function() {
        var i = this,
            m = a(this.element),
            o = this.settings,
            k, n;
        if (o.duplicate) {
            i.mobileNav = m.clone()
        } else {
            i.mobileNav = m
        }
        if (o.removeIds) {
            i.mobileNav.removeAttr("id");
            i.mobileNav.find("*").each(function(q, p) {
                a(p).removeAttr("id")
            })
        }
        if (o.removeClasses) {
            i.mobileNav.removeAttr("class");
            i.mobileNav.find("*").each(function(q, p) {
                a(p).removeAttr("class")
            })
        }
        if (o.removeStyles) {
            i.mobileNav.removeAttr("style");
            i.mobileNav.find("*").each(function(q, p) {
                a(p).removeAttr("style")
            })
        }
        k = g + "_icon";
        if (o.label === "") {
            k += " " + g + "_no-text"
        }
        if (o.parentTag == "a") {
            o.parentTag = 'a href="#"'
        }
        i.mobileNav.attr("class", g + "_nav");
        n = a('<div class="' + g + '_menu"></div>');
        if (o.brand !== "") {
            var j = a('<div class="' + g + '_brand">' + o.brand + "</div>");
            a(n).append(j)
        }
        i.btn = a(['<div class="container"><' + o.parentTag + ' aria-haspopup="true" role="button" tabindex="0" class="' + g + "_btn " + g + '_collapsed">', '<span class="' + g + '_menutxt">' + o.label + "</span>", '<span class="' + k + '">', '<span class="ti-layout-grid3"></span>', '<span class="ti-close"></span>', "</span>", "</" + o.parentTag + "></div>"].join(""));
        a(n).append(i.btn);
        if (o.appendTo !== "") {
            a(o.appendTo).append(n)
        } else {
            a(o.prependTo).prepend(n)
        }
        n.append(i.mobileNav);
        var l = i.mobileNav.find("li");
        a(l).each(function() {
            var u = a(this),
                t = {};
            t.children = u.children("ul").attr("role", "menu");
            u.data("menu", t);
            if (t.children.length > 0) {
                var q = u.contents(),
                    s = false,
                    v = [];
                a(q).each(function() {
                    if (!a(this).is("ul")) {
                        v.push(this)
                    } else {
                        return false
                    }
                    if (a(this).is("a")) {
                        s = true
                    }
                });
                var w = a("<" + o.parentTag + ' role="menuitem" aria-haspopup="true" tabindex="-1" class="' + g + '_item"/>');
                if ((!o.allowParentLinks || o.nestedParentLinks) || !s) {
                    var p = a(v).wrapAll(w).parent();
                    p.addClass(g + "_row")
                } else {
                    a(v).wrapAll('<span class="' + g + "_parent-link " + g + '_row"/>').parent()
                }
                if (!o.showChildren) {
                    u.addClass(g + "_collapsed")
                } else {
                    u.addClass(g + "_open")
                }
                u.addClass(g + "_parent");
                var r = a('<span class="' + g + '_arrow">' + (o.showChildren ? o.openedSymbol : o.closedSymbol) + "</span>");
                if (o.allowParentLinks && !o.nestedParentLinks && s) {
                    r = r.wrap(w).parent()
                }
                a(v).last().after(r)
            } else {
                if (u.children().length === 0) {
                    u.addClass(g + "_txtnode")
                }
            }
            u.children("a").attr("role", "menuitem").click(function(x) {
                if (o.closeOnClick && !a(x.target).parent().closest("li").hasClass(g + "_parent")) {
                    a(i.btn).click()
                }
            });
            if (o.closeOnClick && o.allowParentLinks) {
                u.children("a").children("a").click(function(x) {
                    a(i.btn).click()
                });
                u.find("." + g + "_parent-link a:not(." + g + "_item)").click(function(x) {
                    a(i.btn).click()
                })
            }
        });
        a(l).each(function() {
            var p = a(this).data("menu");
            if (!o.showChildren) {
                i._visibilityToggle(p.children, null, false, null, true)
            }
        });
        i._visibilityToggle(i.mobileNav, null, false, "init", true);
        i.mobileNav.attr("role", "menu");
        a(c).mousedown(function() {
            i._outlines(false)
        });
        a(c).keyup(function() {
            i._outlines(true)
        });
        a(i.btn).click(function(p) {
            p.preventDefault();
            i._menuToggle()
        });
        i.mobileNav.on("click", "." + g + "_item", function(p) {
            p.preventDefault();
            i._itemClick(a(this))
        });
        a(i.btn).keydown(function(p) {
            var q = p || event;
            switch (q.keyCode) {
                case d.ENTER:
                case d.SPACE:
                case d.DOWN:
                    p.preventDefault();
                    if (q.keyCode !== d.DOWN || !a(i.btn).hasClass(g + "_open")) {
                        i._menuToggle()
                    }
                    a(i.btn).next().find('[role="menuitem"]').first().focus();
                    break
            }
        });
        i.mobileNav.on("keydown", "." + g + "_item", function(p) {
            var q = p || event;
            switch (q.keyCode) {
                case d.ENTER:
                    p.preventDefault();
                    i._itemClick(a(p.target));
                    break;
                case d.RIGHT:
                    p.preventDefault();
                    if (a(p.target).parent().hasClass(g + "_collapsed")) {
                        i._itemClick(a(p.target))
                    }
                    a(p.target).next().find('[role="menuitem"]').first().focus();
                    break
            }
        });
        i.mobileNav.on("keydown", '[role="menuitem"]', function(q) {
            var r = q || event;
            switch (r.keyCode) {
                case d.DOWN:
                    q.preventDefault();
                    var p = a(q.target).parent().parent().children().children('[role="menuitem"]:visible');
                    var s = p.index(q.target);
                    var u = s + 1;
                    if (p.length <= u) {
                        u = 0
                    }
                    var t = p.eq(u);
                    t.focus();
                    break;
                case d.UP:
                    q.preventDefault();
                    var p = a(q.target).parent().parent().children().children('[role="menuitem"]:visible');
                    var s = p.index(q.target);
                    var t = p.eq(s - 1);
                    t.focus();
                    break;
                case d.LEFT:
                    q.preventDefault();
                    if (a(q.target).parent().parent().parent().hasClass(g + "_open")) {
                        var v = a(q.target).parent().parent().prev();
                        v.focus();
                        i._itemClick(v)
                    } else {
                        if (a(q.target).parent().parent().hasClass(g + "_nav")) {
                            i._menuToggle();
                            a(i.btn).focus()
                        }
                    }
                    break;
                case d.ESCAPE:
                    q.preventDefault();
                    i._menuToggle();
                    a(i.btn).focus();
                    break
            }
        });
        if (o.allowParentLinks && o.nestedParentLinks) {
            a("." + g + "_item a").click(function(p) {
                p.stopImmediatePropagation()
            })
        }
    };
    f.prototype._menuToggle = function(k) {
        var i = this;
        var j = i.btn;
        var l = i.mobileNav;
        if (j.hasClass(g + "_collapsed")) {
            j.removeClass(g + "_collapsed");
            j.addClass(g + "_open")
        } else {
            j.removeClass(g + "_open");
            j.addClass(g + "_collapsed")
        }
        j.addClass(g + "_animating");
        i._visibilityToggle(l, j.parent(), true, j)
    };
    f.prototype._itemClick = function(k) {
        var i = this;
        var l = i.settings;
        var j = k.data("menu");
        if (!j) {
            j = {};
            j.arrow = k.children("." + g + "_arrow");
            j.ul = k.next("ul");
            j.parent = k.parent();
            if (j.parent.hasClass(g + "_parent-link")) {
                j.parent = k.parent().parent();
                j.ul = k.parent().next("ul")
            }
            k.data("menu", j)
        }
        if (j.parent.hasClass(g + "_collapsed")) {
            j.arrow.html(l.openedSymbol);
            j.parent.removeClass(g + "_collapsed");
            j.parent.addClass(g + "_open");
            j.parent.addClass(g + "_animating");
            i._visibilityToggle(j.ul, j.parent, true, k)
        } else {
            j.arrow.html(l.closedSymbol);
            j.parent.addClass(g + "_collapsed");
            j.parent.removeClass(g + "_open");
            j.parent.addClass(g + "_animating");
            i._visibilityToggle(j.ul, j.parent, true, k)
        }
    };
    f.prototype._visibilityToggle = function(n, q, l, s, o) {
        var i = this;
        var r = i.settings;
        var p = i._getActionItems(n);
        var m = 0;
        if (l) {
            m = r.duration
        }

        function k(u, t) {
            a(u).removeClass(g + "_animating");
            a(t).removeClass(g + "_animating");
            if (!o) {
                r.afterOpen(u)
            }
        }

        function j(u, t) {
            n.attr("aria-hidden", "true");
            p.attr("tabindex", "-1");
            i._setVisAttr(n, true);
            n.hide();
            a(u).removeClass(g + "_animating");
            a(t).removeClass(g + "_animating");
            if (!o) {
                r.afterClose(u)
            } else {
                if (u == "init") {
                    r.init()
                }
            }
        }
        if (n.hasClass(g + "_hidden")) {
            n.removeClass(g + "_hidden");
            if (!o) {
                r.beforeOpen(s)
            }
            if (r.animations === "jquery") {
                n.stop(true, true).slideDown(m, r.easingOpen, function() {
                    k(s, q)
                })
            } else {
                if (r.animations === "velocity") {
                    n.velocity("finish").velocity("slideDown", {
                        duration: m,
                        easing: r.easingOpen,
                        complete: function() {
                            k(s, q)
                        }
                    })
                }
            }
            n.attr("aria-hidden", "false");
            p.attr("tabindex", "0");
            i._setVisAttr(n, false)
        } else {
            n.addClass(g + "_hidden");
            if (!o) {
                r.beforeClose(s)
            }
            if (r.animations === "jquery") {
                n.stop(true, true).slideUp(m, this.settings.easingClose, function() {
                    j(s, q)
                })
            } else {
                if (r.animations === "velocity") {
                    n.velocity("finish").velocity("slideUp", {
                        duration: m,
                        easing: r.easingClose,
                        complete: function() {
                            j(s, q)
                        }
                    })
                }
            }
        }
    };
    f.prototype._setVisAttr = function(j, k) {
        var i = this;
        var l = j.children("li").children("ul").not("." + g + "_hidden");
        if (!k) {
            l.each(function() {
                var n = a(this);
                n.attr("aria-hidden", "false");
                var m = i._getActionItems(n);
                m.attr("tabindex", "0");
                i._setVisAttr(n, k)
            })
        } else {
            l.each(function() {
                var n = a(this);
                n.attr("aria-hidden", "true");
                var m = i._getActionItems(n);
                m.attr("tabindex", "-1");
                i._setVisAttr(n, k)
            })
        }
    };
    f.prototype._getActionItems = function(k) {
        var j = k.data("menu");
        if (!j) {
            j = {};
            var l = k.children("li");
            var i = l.find("a");
            j.links = i.add(l.find("." + g + "_item"));
            k.data("menu", j)
        }
        return j.links
    };
    f.prototype._outlines = function(i) {
        if (!i) {
            a("." + g + "_item, ." + g + "_btn").css("outline", "none")
        } else {
            a("." + g + "_item, ." + g + "_btn").css("outline", "")
        }
    };
    f.prototype.toggle = function() {
        var i = this;
        i._menuToggle()
    };
    f.prototype.open = function() {
        var i = this;
        if (i.btn.hasClass(g + "_collapsed")) {
            i._menuToggle()
        }
    };
    f.prototype.close = function() {
        var i = this;
        if (i.btn.hasClass(g + "_open")) {
            i._menuToggle()
        }
    };
    a.fn[e] = function(j) {
        var i = arguments;
        if (j === undefined || typeof j === "object") {
            return this.each(function() {
                if (!a.data(this, "plugin_" + e)) {
                    a.data(this, "plugin_" + e, new f(this, j))
                }
            })
        } else {
            if (typeof j === "string" && j[0] !== "_" && j !== "init") {
                var k;
                this.each(function() {
                    var l = a.data(this, "plugin_" + e);
                    if (l instanceof f && typeof l[j] === "function") {
                        k = l[j].apply(l, Array.prototype.slice.call(i, 1))
                    }
                });
                return k !== undefined ? k : this
            }
        }
    }
}(jQuery, document, window));