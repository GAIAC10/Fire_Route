/* Magnific Popup - v1.1.0 - 2016-02-20
 * http://dimsemenov.com/plugins/magnific-popup/
 * Copyright (c) 2016 Dmitry Semenov; */
! function(b) {
    "function" == typeof define && define.amd ? define(["jquery"], b) : b("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
}(function(V) {
    var X, Z, ab, ad, af, ah, aj = "Close",
        al = "BeforeClose",
        an = "AfterClose",
        ap = "BeforeAppend",
        ar = "MarkupParse",
        au = "Open",
        aw = "Change",
        ay = "mfp",
        aA = "." + ay,
        aC = "mfp-ready",
        aE = "mfp-removing",
        aG = "mfp-prevent-close",
        aI = function() {},
        aK = !!window.jQuery,
        aM = V(window),
        aN = function(b, d) {
            X.ev.on(ay + b + aA, d)
        },
        aO = function(a, g, h, i) {
            var j = document.createElement("div");
            return j.className = "mfp-" + a, h && (j.innerHTML = h), i ? g && g.appendChild(j) : (j = V(j), g && j.appendTo(g)), j
        },
        aP = function(a, b) {
            X.ev.triggerHandler(ay + a, b), X.st.callbacks && (a = a.charAt(0).toLowerCase() + a.slice(1), X.st.callbacks[a] && X.st.callbacks[a].apply(X, V.isArray(b) ? b : [b]))
        },
        aQ = function(a) {
            return a === ah && X.currTemplate.closeBtn || (X.currTemplate.closeBtn = V(X.st.closeMarkup.replace("%title%", X.st.tClose)), ah = a), X.currTemplate.closeBtn
        },
        W = function() {
            V.magnificPopup.instance || (X = new aI, X.init(), V.magnificPopup.instance = X)
        },
        Y = function() {
            var c = document.createElement("p").style,
                d = ["ms", "O", "Moz", "Webkit"];
            if (void 0 !== c.transition) {
                return !0
            }
            for (; d.length;) {
                if (d.pop() + "Transition" in c) {
                    return !0
                }
            }
            return !1
        };
    aI.prototype = {
        constructor: aI,
        init: function() {
            var a = navigator.appVersion;
            X.isLowIE = X.isIE8 = document.all && !document.addEventListener, X.isAndroid = /android/gi.test(a), X.isIOS = /iphone|ipad|ipod/gi.test(a), X.supportsTransition = Y(), X.probablyMobile = X.isAndroid || X.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), ab = V(document), X.popupsCache = {}
        },
        open: function(a) {
            var b;
            if (a.isObj === !1) {
                X.items = a.items.toArray(), X.index = 0;
                var d, f = a.items;
                for (b = 0; b < f.length; b++) {
                    if (d = f[b], d.parsed && (d = d.el[0]), d === a.el[0]) {
                        X.index = b;
                        break
                    }
                }
            } else {
                X.items = V.isArray(a.items) ? a.items : [a.items], X.index = a.index || 0
            }
            if (X.isOpen) {
                return void X.updateItemHTML()
            }
            X.types = [], af = "", a.mainEl && a.mainEl.length ? X.ev = a.mainEl.eq(0) : X.ev = ab, a.key ? (X.popupsCache[a.key] || (X.popupsCache[a.key] = {}), X.currTemplate = X.popupsCache[a.key]) : X.currTemplate = {}, X.st = V.extend(!0, {}, V.magnificPopup.defaults, a), X.fixedContentPos = "auto" === X.st.fixedContentPos ? !X.probablyMobile : X.st.fixedContentPos, X.st.modal && (X.st.closeOnContentClick = !1, X.st.closeOnBgClick = !1, X.st.showCloseBtn = !1, X.st.enableEscapeKey = !1), X.bgOverlay || (X.bgOverlay = aO("bg").on("click" + aA, function() {
                X.close()
            }), X.wrap = aO("wrap").attr("tabindex", -1).on("click" + aA, function(c) {
                X._checkIfClose(c.target) && X.close()
            }), X.container = aO("container", X.wrap)), X.contentContainer = aO("content"), X.st.preloader && (X.preloader = aO("preloader", X.container, X.st.tLoading));
            var l = V.magnificPopup.modules;
            for (b = 0; b < l.length; b++) {
                var m = l[b];
                m = m.charAt(0).toUpperCase() + m.slice(1), X["init" + m].call(X)
            }
            aP("BeforeOpen"), X.st.showCloseBtn && (X.st.closeBtnInside ? (aN(ar, function(e, g, h, i) {
                h.close_replaceWith = aQ(i.type)
            }), af += " mfp-close-btn-in") : X.wrap.append(aQ())), X.st.alignTop && (af += " mfp-align-top"), X.fixedContentPos ? X.wrap.css({
                overflow: X.st.overflowY,
                overflowX: "hidden",
                overflowY: X.st.overflowY
            }) : X.wrap.css({
                top: aM.scrollTop(),
                position: "absolute"
            }), (X.st.fixedBgPos === !1 || "auto" === X.st.fixedBgPos && !X.fixedContentPos) && X.bgOverlay.css({
                height: ab.height(),
                position: "absolute"
            }), X.st.enableEscapeKey && ab.on("keyup" + aA, function(c) {
                27 === c.keyCode && X.close()
            }), aM.on("resize" + aA, function() {
                X.updateSize()
            }), X.st.closeOnContentClick || (af += " mfp-auto-cursor"), af && X.wrap.addClass(af);
            var p = X.wH = aM.height(),
                q = {};
            if (X.fixedContentPos && X._hasScrollBar(p)) {
                var s = X._getScrollbarSize();
                s && (q.marginRight = s)
            }
            X.fixedContentPos && (X.isIE7 ? V("body, html").css("overflow", "hidden") : q.overflow = "hidden");
            var t = X.st.mainClass;
            return X.isIE7 && (t += " mfp-ie7"), t && X._addClassToMFP(t), X.updateItemHTML(), aP("BuildControls"), V("html").css(q), X.bgOverlay.add(X.wrap).prependTo(X.st.prependTo || V(document.body)), X._lastFocusedEl = document.activeElement, setTimeout(function() {
                X.content ? (X._addClassToMFP(aC), X._setFocus()) : X.bgOverlay.addClass(aC), ab.on("focusin" + aA, X._onFocusIn)
            }, 16), X.isOpen = !0, X.updateSize(p), aP(au), a
        },
        close: function() {
            X.isOpen && (aP(al), X.isOpen = !1, X.st.removalDelay && !X.isLowIE && X.supportsTransition ? (X._addClassToMFP(aE), setTimeout(function() {
                X._close()
            }, X.st.removalDelay)) : X._close())
        },
        _close: function() {
            aP(aj);
            var a = aE + " " + aC + " ";
            if (X.bgOverlay.detach(), X.wrap.detach(), X.container.empty(), X.st.mainClass && (a += X.st.mainClass + " "), X._removeClassFromMFP(a), X.fixedContentPos) {
                var b = {
                    marginRight: ""
                };
                X.isIE7 ? V("body, html").css("overflow", "") : b.overflow = "", V("html").css(b)
            }
            ab.off("keyup" + aA + " focusin" + aA), X.ev.off(aA), X.wrap.attr("class", "mfp-wrap").removeAttr("style"), X.bgOverlay.attr("class", "mfp-bg"), X.container.attr("class", "mfp-container"), !X.st.showCloseBtn || X.st.closeBtnInside && X.currTemplate[X.currItem.type] !== !0 || X.currTemplate.closeBtn && X.currTemplate.closeBtn.detach(), X.st.autoFocusLast && X._lastFocusedEl && V(X._lastFocusedEl).focus(), X.currItem = null, X.content = null, X.currTemplate = null, X.prevHeight = 0, aP(an)
        },
        updateSize: function(b) {
            if (X.isIOS) {
                var e = document.documentElement.clientWidth / window.innerWidth,
                    f = window.innerHeight * e;
                X.wrap.css("height", f), X.wH = f
            } else {
                X.wH = b || aM.height()
            }
            X.fixedContentPos || X.wrap.css("height", X.wH), aP("Resize")
        },
        updateItemHTML: function() {
            var a = X.items[X.index];
            X.contentContainer.detach(), X.content && X.content.detach(), a.parsed || (a = X.parseEl(X.index));
            var b = a.type;
            if (aP("BeforeChange", [X.currItem ? X.currItem.type : "", b]), X.currItem = a, !X.currTemplate[b]) {
                var e = X.st[b] ? X.st[b].markup : !1;
                aP("FirstMarkupParse", e), e ? X.currTemplate[b] = V(e) : X.currTemplate[b] = !0
            }
            ad && ad !== a.type && X.container.removeClass("mfp-" + ad + "-holder");
            var h = X["get" + b.charAt(0).toUpperCase() + b.slice(1)](a, X.currTemplate[b]);
            X.appendContent(h, b), a.preloaded = !0, aP(aw, a), ad = a.type, X.container.prepend(X.contentContainer), aP("AfterChange")
        },
        appendContent: function(b, d) {
            X.content = b, b ? X.st.showCloseBtn && X.st.closeBtnInside && X.currTemplate[d] === !0 ? X.content.find(".mfp-close").length || X.content.append(aQ()) : X.content = b : X.content = "", aP(ap), X.container.addClass("mfp-" + d + "-holder"), X.contentContainer.append(X.content)
        },
        parseEl: function(a) {
            var b, h = X.items[a];
            if (h.tagName ? h = {
                    el: V(h)
                } : (b = h.type, h = {
                    data: h,
                    src: h.src
                }), h.el) {
                for (var i = X.types, j = 0; j < i.length; j++) {
                    if (h.el.hasClass("mfp-" + i[j])) {
                        b = i[j];
                        break
                    }
                }
                h.src = h.el.attr("data-mfp-src"), h.src || (h.src = h.el.attr("href"))
            }
            return h.type = b || X.st.type || "inline", h.index = a, h.parsed = !0, X.items[a] = h, aP("ElementParse", h), X.items[a]
        },
        addGroup: function(b, f) {
            var g = function(a) {
                a.mfpEl = this, X._openClick(a, b, f)
            };
            f || (f = {});
            var h = "click.magnificPopup";
            f.mainEl = b, f.items ? (f.isObj = !0, b.off(h).on(h, g)) : (f.isObj = !1, f.delegate ? b.off(h).on(h, f.delegate, g) : (f.items = b, b.off(h).on(h, g)))
        },
        _openClick: function(a, b, h) {
            var i = void 0 !== h.midClick ? h.midClick : V.magnificPopup.defaults.midClick;
            if (i || !(2 === a.which || a.ctrlKey || a.metaKey || a.altKey || a.shiftKey)) {
                var j = void 0 !== h.disableOn ? h.disableOn : V.magnificPopup.defaults.disableOn;
                if (j) {
                    if (V.isFunction(j)) {
                        if (!j.call(X)) {
                            return !0
                        }
                    } else {
                        if (aM.width() < j) {
                            return !0
                        }
                    }
                }
                a.type && (a.preventDefault(), X.isOpen && a.stopPropagation()), h.el = V(a.mfpEl), h.delegate && (h.items = b.find(h.delegate)), X.open(h)
            }
        },
        updateStatus: function(b, c) {
            if (X.preloader) {
                Z !== b && X.container.removeClass("mfp-s-" + Z), c || "loading" !== b || (c = X.st.tLoading);
                var f = {
                    status: b,
                    text: c
                };
                aP("UpdateStatus", f), b = f.status, c = f.text, X.preloader.html(c), X.preloader.find("a").on("click", function(d) {
                    d.stopImmediatePropagation()
                }), X.container.addClass("mfp-s-" + b), Z = b
            }
        },
        _checkIfClose: function(a) {
            if (!V(a).hasClass(aG)) {
                var b = X.st.closeOnContentClick,
                    f = X.st.closeOnBgClick;
                if (b && f) {
                    return !0
                }
                if (!X.content || V(a).hasClass("mfp-close") || X.preloader && a === X.preloader[0]) {
                    return !0
                }
                if (a === X.content[0] || V.contains(X.content[0], a)) {
                    if (b) {
                        return !0
                    }
                } else {
                    if (f && V.contains(document, a)) {
                        return !0
                    }
                }
                return !1
            }
        },
        _addClassToMFP: function(b) {
            X.bgOverlay.addClass(b), X.wrap.addClass(b)
        },
        _removeClassFromMFP: function(b) {
            this.bgOverlay.removeClass(b), X.wrap.removeClass(b)
        },
        _hasScrollBar: function(b) {
            return (X.isIE7 ? ab.height() : document.body.scrollHeight) > (b || aM.height())
        },
        _setFocus: function() {
            (X.st.focus ? X.content.find(X.st.focus).eq(0) : X.wrap).focus()
        },
        _onFocusIn: function(a) {
            return a.target === X.wrap[0] || V.contains(X.wrap[0], a.target) ? void 0 : (X._setFocus(), !1)
        },
        _parseMarkup: function(a, f, g) {
            var h;
            g.data && (f = V.extend(g.data, f)), aP(ar, [a, f, g]), V.each(f, function(b, e) {
                if (void 0 === e || e === !1) {
                    return !0
                }
                if (h = b.split("_"), h.length > 1) {
                    var i = a.find(aA + "-" + h[0]);
                    if (i.length > 0) {
                        var j = h[1];
                        "replaceWith" === j ? i[0] !== e[0] && i.replaceWith(e) : "img" === j ? i.is("img") ? i.attr("src", e) : i.replaceWith(V("<img>").attr("src", e).attr("class", i.attr("class"))) : i.attr(h[1], e)
                    }
                } else {
                    a.find(aA + "-" + b).html(e)
                }
            })
        },
        _getScrollbarSize: function() {
            if (void 0 === X.scrollbarSize) {
                var b = document.createElement("div");
                b.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(b), X.scrollbarSize = b.offsetWidth - b.clientWidth, document.body.removeChild(b)
            }
            return X.scrollbarSize
        }
    }, V.magnificPopup = {
        instance: null,
        proto: aI.prototype,
        modules: [],
        open: function(a, d) {
            return W(), a = a ? V.extend(!0, {}, a) : {}, a.isObj = !0, a.index = d || 0, this.instance.open(a)
        },
        close: function() {
            return V.magnificPopup.instance && V.magnificPopup.instance.close()
        },
        registerModule: function(a, d) {
            d.options && (V.magnificPopup.defaults[a] = d.options), V.extend(this.proto, d.proto), this.modules.push(a)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
            autoFocusLast: !0
        }
    }, V.fn.magnificPopup = function(a) {
        W();
        var b = V(this);
        if ("string" == typeof a) {
            if ("open" === a) {
                var h, i = aK ? b.data("magnificPopup") : b[0].magnificPopup,
                    j = parseInt(arguments[1], 10) || 0;
                i.items ? h = i.items[j] : (h = b, i.delegate && (h = h.find(i.delegate)), h = h.eq(j)), X._openClick({
                    mfpEl: h
                }, b, i)
            } else {
                X.isOpen && X[a].apply(X, Array.prototype.slice.call(arguments, 1))
            }
        } else {
            a = V.extend(!0, {}, a), aK ? b.data("magnificPopup", a) : b[0].magnificPopup = a, X.addGroup(b, a)
        }
        return b
    };
    var aa, ac, ae, ag = "inline",
        ai = function() {
            ae && (ac.after(ae.addClass(aa)).detach(), ae = null)
        };
    V.magnificPopup.registerModule(ag, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                X.types.push(ag), aN(aj + "." + ag, function() {
                    ai()
                })
            },
            getInline: function(a, b) {
                if (ai(), a.src) {
                    var h = X.st.inline,
                        i = V(a.src);
                    if (i.length) {
                        var j = i[0].parentNode;
                        j && j.tagName && (ac || (aa = h.hiddenClass, ac = aO(aa), aa = "mfp-" + aa), ae = i.after(ac).detach().removeClass(aa)), X.updateStatus("ready")
                    } else {
                        X.updateStatus("error", h.tNotFound), i = V("<div>")
                    }
                    return a.inlineElement = i, i
                }
                return X.updateStatus("ready"), X._parseMarkup(b, {}, a), b
            }
        }
    });
    var ak, am = "ajax",
        ao = function() {
            ak && V(document.body).removeClass(ak)
        },
        aq = function() {
            ao(), X.req && X.req.abort()
        };
    V.magnificPopup.registerModule(am, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                X.types.push(am), ak = X.st.ajax.cursor, aN(aj + "." + am, aq), aN("BeforeChange." + am, aq)
            },
            getAjax: function(a) {
                ak && V(document.body).addClass(ak), X.updateStatus("loading");
                var b = V.extend({
                    url: a.src,
                    success: function(c, h, i) {
                        var j = {
                            data: c,
                            xhr: i
                        };
                        aP("ParseAjax", j), X.appendContent(V(j.data), am), a.finished = !0, ao(), X._setFocus(), setTimeout(function() {
                            X.wrap.addClass(aC)
                        }, 16), X.updateStatus("ready"), aP("AjaxContentAdded")
                    },
                    error: function() {
                        ao(), a.finished = a.loadError = !0, X.updateStatus("error", X.st.ajax.tError.replace("%url%", a.src))
                    }
                }, X.st.ajax.settings);
                return X.req = V.ajax(b), ""
            }
        }
    });
    var at, av = function(a) {
        if (a.data && void 0 !== a.data.title) {
            return a.data.title
        }
        var b = X.st.image.titleSrc;
        if (b) {
            if (V.isFunction(b)) {
                return b.call(X, a)
            }
            if (a.el) {
                return a.el.attr(b) || ""
            }
        }
        return ""
    };
    V.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var a = X.st.image,
                    b = ".image";
                X.types.push("image"), aN(au + b, function() {
                    "image" === X.currItem.type && a.cursor && V(document.body).addClass(a.cursor)
                }), aN(aj + b, function() {
                    a.cursor && V(document.body).removeClass(a.cursor), aM.off("resize" + aA)
                }), aN("Resize" + b, X.resizeImage), X.isLowIE && aN("AfterChange", X.resizeImage)
            },
            resizeImage: function() {
                var b = X.currItem;
                if (b && b.img && X.st.image.verticalFit) {
                    var d = 0;
                    X.isLowIE && (d = parseInt(b.img.css("padding-top"), 10) + parseInt(b.img.css("padding-bottom"), 10)), b.img.css("max-height", X.wH - d)
                }
            },
            _onImageHasSize: function(b) {
                b.img && (b.hasSize = !0, at && clearInterval(at), b.isCheckingImgSize = !1, aP("ImageHasSize", b), b.imgHidden && (X.content && X.content.removeClass("mfp-loading"), b.imgHidden = !1))
            },
            findImageSize: function(b) {
                var f = 0,
                    g = b.img[0],
                    h = function(a) {
                        at && clearInterval(at), at = setInterval(function() {
                            return g.naturalWidth > 0 ? void X._onImageHasSize(b) : (f > 200 && clearInterval(at), f++, void(3 === f ? h(10) : 40 === f ? h(50) : 100 === f && h(500)))
                        }, a)
                    };
                h(1)
            },
            getImage: function(a, b) {
                var k = 0,
                    l = function() {
                        a && (a.img[0].complete ? (a.img.off(".mfploader"), a === X.currItem && (X._onImageHasSize(a), X.updateStatus("ready")), a.hasSize = !0, a.loaded = !0, aP("ImageLoadComplete")) : (k++, 200 > k ? setTimeout(l, 100) : m()))
                    },
                    m = function() {
                        a && (a.img.off(".mfploader"), a === X.currItem && (X._onImageHasSize(a), X.updateStatus("error", n.tError.replace("%url%", a.src))), a.hasSize = !0, a.loaded = !0, a.loadError = !0)
                    },
                    n = X.st.image,
                    o = b.find(".mfp-img");
                if (o.length) {
                    var p = document.createElement("img");
                    p.className = "mfp-img", a.el && a.el.find("img").length && (p.alt = a.el.find("img").attr("alt")), a.img = V(p).on("load.mfploader", l).on("error.mfploader", m), p.src = a.src, o.is("img") && (a.img = a.img.clone()), p = a.img[0], p.naturalWidth > 0 ? a.hasSize = !0 : p.width || (a.hasSize = !1)
                }
                return X._parseMarkup(b, {
                    title: av(a),
                    img_replaceWith: a.img
                }, a), X.resizeImage(), a.hasSize ? (at && clearInterval(at), a.loadError ? (b.addClass("mfp-loading"), X.updateStatus("error", n.tError.replace("%url%", a.src))) : (b.removeClass("mfp-loading"), X.updateStatus("ready")), b) : (X.updateStatus("loading"), a.loading = !0, a.hasSize || (a.imgHidden = !0, b.addClass("mfp-loading"), X.findImageSize(a)), b)
            }
        }
    });
    var ax, az = function() {
        return void 0 === ax && (ax = void 0 !== document.createElement("p").style.MozTransform), ax
    };
    V.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(b) {
                return b.is("img") ? b : b.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var b, h = X.st.zoom,
                    i = ".zoom";
                if (h.enabled && X.supportsTransition) {
                    var l, m, n = h.duration,
                        o = function(c) {
                            var g = c.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                j = "all " + h.duration / 1000 + "s " + h.easing,
                                k = {
                                    position: "fixed",
                                    zIndex: 9999,
                                    left: 0,
                                    top: 0,
                                    "-webkit-backface-visibility": "hidden"
                                },
                                q = "transition";
                            return k["-webkit-" + q] = k["-moz-" + q] = k["-o-" + q] = k[q] = j, g.css(k), g
                        },
                        p = function() {
                            X.content.css("visibility", "visible")
                        };
                    aN("BuildControls" + i, function() {
                        if (X._allowZoom()) {
                            if (clearTimeout(l), X.content.css("visibility", "hidden"), b = X._getItemToZoom(), !b) {
                                return void p()
                            }
                            m = o(b), m.css(X._getOffset()), X.wrap.append(m), l = setTimeout(function() {
                                m.css(X._getOffset(!0)), l = setTimeout(function() {
                                    p(), setTimeout(function() {
                                        m.remove(), b = m = null, aP("ZoomAnimationEnded")
                                    }, 16)
                                }, n)
                            }, 16)
                        }
                    }), aN(al + i, function() {
                        if (X._allowZoom()) {
                            if (clearTimeout(l), X.st.removalDelay = n, !b) {
                                if (b = X._getItemToZoom(), !b) {
                                    return
                                }
                                m = o(b)
                            }
                            m.css(X._getOffset(!0)), X.wrap.append(m), X.content.css("visibility", "hidden"), setTimeout(function() {
                                m.css(X._getOffset())
                            }, 16)
                        }
                    }), aN(aj + i, function() {
                        X._allowZoom() && (p(), m && m.remove(), b = null)
                    })
                }
            },
            _allowZoom: function() {
                return "image" === X.currItem.type
            },
            _getItemToZoom: function() {
                return X.currItem.hasSize ? X.currItem.img : !1
            },
            _getOffset: function(a) {
                var b;
                b = a ? X.currItem.img : X.st.zoom.opener(X.currItem.el || X.currItem);
                var i = b.offset(),
                    j = parseInt(b.css("padding-top"), 10),
                    k = parseInt(b.css("padding-bottom"), 10);
                i.top -= V(window).scrollTop() - j;
                var l = {
                    width: b.width(),
                    height: (aK ? b.innerHeight() : b[0].offsetHeight) - k - j
                };
                return az() ? l["-moz-transform"] = l.transform = "translate(" + i.left + "px," + i.top + "px)" : (l.left = i.left, l.top = i.top), l
            }
        }
    });
    var aB = "iframe",
        aD = "//about:blank",
        aF = function(b) {
            if (X.currTemplate[aB]) {
                var d = X.currTemplate[aB].find("iframe");
                d.length && (b || (d[0].src = aD), X.isIE8 && d.css("display", b ? "block" : "none"))
            }
        };
    V.magnificPopup.registerModule(aB, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function() {
                X.types.push(aB), aN("BeforeChange", function(d, e, f) {
                    e !== f && (e === aB ? aF() : f === aB && aF(!0))
                }), aN(aj + "." + aB, function() {
                    aF()
                })
            },
            getIframe: function(a, b) {
                var h = a.src,
                    i = X.st.iframe;
                V.each(i.patterns, function() {
                    return h.indexOf(this.index) > -1 ? (this.id && (h = "string" == typeof this.id ? h.substr(h.lastIndexOf(this.id) + this.id.length, h.length) : this.id.call(this, h)), h = this.src.replace("%id%", h), !1) : void 0
                });
                var j = {};
                return i.srcAction && (j[i.srcAction] = h), X._parseMarkup(b, j, a), X.updateStatus("ready"), b
            }
        }
    });
    var aH = function(b) {
            var d = X.items.length;
            return b > d - 1 ? b - d : 0 > b ? d + b : b
        },
        aJ = function(d, e, f) {
            return d.replace(/%curr%/gi, e + 1).replace(/%total%/gi, f)
        };
    V.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function() {
                var a = X.st.gallery,
                    b = ".mfp-gallery";
                return X.direction = !0, a && a.enabled ? (af += " mfp-gallery", aN(au + b, function() {
                    a.navigateByImgClick && X.wrap.on("click" + b, ".mfp-img", function() {
                        return X.items.length > 1 ? (X.next(), !1) : void 0
                    }), ab.on("keydown" + b, function(c) {
                        37 === c.keyCode ? X.prev() : 39 === c.keyCode && X.next()
                    })
                }), aN("UpdateStatus" + b, function(d, e) {
                    e.text && (e.text = aJ(e.text, X.currItem.index, X.items.length))
                }), aN(ar + b, function(c, h, i, j) {
                    var k = X.items.length;
                    i.counter = k > 1 ? aJ(a.tCounter, j.index, k) : ""
                }), aN("BuildControls" + b, function() {
                    if (X.items.length > 1 && a.arrows && !X.arrowLeft) {
                        var c = a.arrowMarkup,
                            g = X.arrowLeft = V(c.replace(/%title%/gi, a.tPrev).replace(/%dir%/gi, "left")).addClass(aG),
                            h = X.arrowRight = V(c.replace(/%title%/gi, a.tNext).replace(/%dir%/gi, "right")).addClass(aG);
                        g.click(function() {
                            X.prev()
                        }), h.click(function() {
                            X.next()
                        }), X.container.append(g.add(h))
                    }
                }), aN(aw + b, function() {
                    X._preloadTimeout && clearTimeout(X._preloadTimeout), X._preloadTimeout = setTimeout(function() {
                        X.preloadNearbyImages(), X._preloadTimeout = null
                    }, 16)
                }), void aN(aj + b, function() {
                    ab.off(b), X.wrap.off("click" + b), X.arrowRight = X.arrowLeft = null
                })) : !1
            },
            next: function() {
                X.direction = !0, X.index = aH(X.index + 1), X.updateItemHTML()
            },
            prev: function() {
                X.direction = !1, X.index = aH(X.index - 1), X.updateItemHTML()
            },
            goTo: function(b) {
                X.direction = b >= X.index, X.index = b, X.updateItemHTML()
            },
            preloadNearbyImages: function() {
                var b, f = X.st.gallery.preload,
                    g = Math.min(f[0], X.items.length),
                    h = Math.min(f[1], X.items.length);
                for (b = 1; b <= (X.direction ? h : g); b++) {
                    X._preloadItem(X.index + b)
                }
                for (b = 1; b <= (X.direction ? g : h); b++) {
                    X._preloadItem(X.index - b)
                }
            },
            _preloadItem: function(a) {
                if (a = aH(a), !X.items[a].preloaded) {
                    var b = X.items[a];
                    b.parsed || (b = X.parseEl(a)), aP("LazyLoad", b), "image" === b.type && (b.img = V('<img class="mfp-img" />').on("load.mfploader", function() {
                        b.hasSize = !0
                    }).on("error.mfploader", function() {
                        b.hasSize = !0, b.loadError = !0, aP("LazyLoadError", b)
                    }).attr("src", b.src)), b.preloaded = !0
                }
            }
        }
    });
    var aL = "retina";
    V.magnificPopup.registerModule(aL, {
        options: {
            replaceSrc: function(b) {
                return b.src.replace(/\.\w+$/, function(c) {
                    return "@2x" + c
                })
            },
            ratio: 1
        },
        proto: {
            initRetina: function() {
                if (window.devicePixelRatio > 1) {
                    var b = X.st.retina,
                        d = b.ratio;
                    d = isNaN(d) ? d() : d, d > 1 && (aN("ImageHasSize." + aL, function(c, e) {
                        e.img.css({
                            "max-width": e.img[0].naturalWidth / d,
                            width: "100%"
                        })
                    }), aN("ElementParse." + aL, function(a, c) {
                        c.src = b.replaceSrc(c, d)
                    }))
                }
            }
        }
    }), W()
});