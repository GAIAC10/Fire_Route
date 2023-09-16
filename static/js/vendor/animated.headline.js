jQuery(document).ready(function(a) {
    var c = 2500,
        d = 3800,
        e = d - 3000,
        j = 50,
        u = 150,
        m = 500,
        t = m + 800,
        l = 600,
        k = 1500;
    h();

    function h() {
        p(a(".cd-headline.letters").find("b"));
        b(a(".cd-headline"))
    }

    function p(v) {
        v.each(function() {
            var z = a(this),
                w = z.text().split(""),
                y = z.hasClass("is-visible");
            for (i in w) {
                if (z.parents(".rotate-2").length > 0) {
                    w[i] = "<em>" + w[i] + "</em>"
                }
                w[i] = (y) ? '<i class="in">' + w[i] + "</i>" : "<i>" + w[i] + "</i>"
            }
            var x = w.join("");
            z.html(x).css("opacity", 1)
        })
    }

    function b(v) {
        var w = c;
        v.each(function() {
            var x = a(this);
            if (x.hasClass("loading-bar")) {
                w = d;
                setTimeout(function() {
                    x.find(".cd-words-wrapper").addClass("is-loading")
                }, e)
            } else {
                if (x.hasClass("clip")) {
                    var z = x.find(".cd-words-wrapper"),
                        y = z.width() + 10;
                    z.css("width", y)
                } else {
                    if (!x.hasClass("type")) {
                        var B = x.find(".cd-words-wrapper b"),
                            A = 0;
                        B.each(function() {
                            var C = a(this).width();
                            if (C > A) {
                                A = C
                            }
                        });
                        x.find(".cd-words-wrapper").css("width", A)
                    }
                }
            }
            setTimeout(function() {
                g(x.find(".is-visible").eq(0))
            }, w)
        })
    }

    function g(v) {
        var x = r(v);
        if (v.parents(".cd-headline").hasClass("type")) {
            var y = v.parent(".cd-words-wrapper");
            y.addClass("selected").removeClass("waiting");
            setTimeout(function() {
                y.removeClass("selected");
                v.removeClass("is-visible").addClass("is-hidden").children("i").removeClass("in").addClass("out")
            }, m);
            setTimeout(function() {
                o(x, u)
            }, t)
        } else {
            if (v.parents(".cd-headline").hasClass("letters")) {
                var w = (v.children("i").length >= x.children("i").length) ? true : false;
                f(v.find("i").eq(0), v, w, j);
                n(x.find("i").eq(0), x, w, j)
            } else {
                if (v.parents(".cd-headline").hasClass("clip")) {
                    v.parents(".cd-words-wrapper").animate({
                        width: "2px"
                    }, l, function() {
                        q(v, x);
                        o(x)
                    })
                } else {
                    if (v.parents(".cd-headline").hasClass("loading-bar")) {
                        v.parents(".cd-words-wrapper").removeClass("is-loading");
                        q(v, x);
                        setTimeout(function() {
                            g(x)
                        }, d);
                        setTimeout(function() {
                            v.parents(".cd-words-wrapper").addClass("is-loading")
                        }, e)
                    } else {
                        q(v, x);
                        setTimeout(function() {
                            g(x)
                        }, c)
                    }
                }
            }
        }
    }

    function o(w, v) {
        if (w.parents(".cd-headline").hasClass("type")) {
            n(w.find("i").eq(0), w, false, v);
            w.addClass("is-visible").removeClass("is-hidden")
        } else {
            if (w.parents(".cd-headline").hasClass("clip")) {
                w.parents(".cd-words-wrapper").animate({
                    width: w.width() + 10
                }, l, function() {
                    setTimeout(function() {
                        g(w)
                    }, k)
                })
            }
        }
    }

    function f(x, y, v, w) {
        x.removeClass("in").addClass("out");
        if (!x.is(":last-child")) {
            setTimeout(function() {
                f(x.next(), y, v, w)
            }, w)
        } else {
            if (v) {
                setTimeout(function() {
                    g(r(y))
                }, c)
            }
        }
        if (x.is(":last-child") && a("html").hasClass("no-csstransitions")) {
            var z = r(y);
            q(y, z)
        }
    }

    function n(x, y, v, w) {
        x.addClass("in").removeClass("out");
        if (!x.is(":last-child")) {
            setTimeout(function() {
                n(x.next(), y, v, w)
            }, w)
        } else {
            if (y.parents(".cd-headline").hasClass("type")) {
                setTimeout(function() {
                    y.parents(".cd-words-wrapper").addClass("waiting")
                }, 200)
            }
            if (!v) {
                setTimeout(function() {
                    g(y)
                }, c)
            }
        }
    }

    function r(v) {
        return (!v.is(":last-child")) ? v.next() : v.parent().children().eq(0)
    }

    function s(v) {
        return (!v.is(":first-child")) ? v.prev() : v.parent().children().last()
    }

    function q(w, v) {
        w.removeClass("is-visible").addClass("is-hidden");
        v.removeClass("is-hidden").addClass("is-visible")
    }
});