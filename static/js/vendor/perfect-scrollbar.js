/*
 * perfect-scrollbar v1.5.0
 * Copyright 2020 Hyunje Jun, MDBootstrap and Contributors
 * Licensed under MIT
 */
(function(b, a) {
    typeof exports === "object" && typeof module !== "undefined" ? module.exports = a() : typeof define === "function" && define.amd ? define(a) : (b = b || self, b.PerfectScrollbar = a())
}(this, (function() {
    function p(R) {
        return getComputedStyle(R)
    }

    function H(R, T) {
        for (var S in T) {
            var U = T[S];
            if (typeof U === "number") {
                U = U + "px"
            }
            R.style[S] = U
        }
        return R
    }

    function i(R) {
        var S = document.createElement("div");
        S.className = R;
        return S
    }
    var k = typeof Element !== "undefined" && (Element.prototype.matches || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector);

    function u(R, S) {
        if (!k) {
            throw new Error("No element matching method supported")
        }
        return k.call(R, S)
    }

    function D(R) {
        if (R.remove) {
            R.remove()
        } else {
            if (R.parentNode) {
                R.parentNode.removeChild(R)
            }
        }
    }

    function C(R, S) {
        return Array.prototype.filter.call(R.children, function(T) {
            return u(T, S)
        })
    }
    var e = {
        main: "ps",
        rtl: "ps__rtl",
        element: {
            thumb: function(R) {
                return ("ps__thumb-" + R)
            },
            rail: function(R) {
                return ("ps__rail-" + R)
            },
            consuming: "ps__child--consume",
        },
        state: {
            focus: "ps--focus",
            clicking: "ps--clicking",
            active: function(R) {
                return ("ps--active-" + R)
            },
            scrolling: function(R) {
                return ("ps--scrolling-" + R)
            },
        },
    };
    var G = {
        x: null,
        y: null
    };

    function a(T, U) {
        var R = T.element.classList;
        var S = e.state.scrolling(U);
        if (R.contains(S)) {
            clearTimeout(G[U])
        } else {
            R.add(S)
        }
    }

    function F(R, S) {
        G[S] = setTimeout(function() {
            return R.isAlive && R.element.classList.remove(e.state.scrolling(S))
        }, R.settings.scrollingThreshold)
    }

    function I(R, S) {
        a(R, S);
        F(R, S)
    }
    var n = function n(R) {
        this.element = R;
        this.handlers = {}
    };
    var B = {
        isEmpty: {
            configurable: true
        }
    };
    n.prototype.bind = function b(R, S) {
        if (typeof this.handlers[R] === "undefined") {
            this.handlers[R] = []
        }
        this.handlers[R].push(S);
        this.element.addEventListener(R, S, false)
    };
    n.prototype.unbind = function L(R, S) {
        var T = this;
        this.handlers[R] = this.handlers[R].filter(function(U) {
            if (S && U !== S) {
                return true
            }
            T.element.removeEventListener(R, U, false);
            return false
        })
    };
    n.prototype.unbindAll = function M() {
        for (var R in this.handlers) {
            this.unbind(R)
        }
    };
    B.isEmpty.get = function() {
        var R = this;
        return Object.keys(this.handlers).every(function(S) {
            return R.handlers[S].length === 0
        })
    };
    Object.defineProperties(n.prototype, B);
    var o = function o() {
        this.eventElements = []
    };
    o.prototype.eventElement = function m(S) {
        var R = this.eventElements.filter(function(T) {
            return T.element === S
        })[0];
        if (!R) {
            R = new n(S);
            this.eventElements.push(R)
        }
        return R
    };
    o.prototype.bind = function b(R, S, T) {
        this.eventElement(R).bind(S, T)
    };
    o.prototype.unbind = function L(S, T, U) {
        var R = this.eventElement(S);
        R.unbind(T, U);
        if (R.isEmpty) {
            this.eventElements.splice(this.eventElements.indexOf(R), 1)
        }
    };
    o.prototype.unbindAll = function M() {
        this.eventElements.forEach(function(R) {
            return R.unbindAll()
        });
        this.eventElements = []
    };
    o.prototype.once = function v(S, T, U) {
        var R = this.eventElement(S);
        var V = function(W) {
            R.unbind(T, V);
            U(W)
        };
        R.bind(T, V)
    };

    function f(S) {
        if (typeof window.CustomEvent === "function") {
            return new CustomEvent(S)
        } else {
            var R = document.createEvent("CustomEvent");
            R.initCustomEvent(S, false, false, undefined);
            return R
        }
    }

    function z(V, R, S, W, U) {
        if (W === void 0) {
            W = true
        }
        if (U === void 0) {
            U = false
        }
        var T;
        if (R === "top") {
            T = ["contentHeight", "containerHeight", "scrollTop", "y", "up", "down"]
        } else {
            if (R === "left") {
                T = ["contentWidth", "containerWidth", "scrollLeft", "x", "left", "right"]
            } else {
                throw new Error("A proper axis should be provided")
            }
        }
        A(V, S, T, W, U)
    }

    function A(X, T, Y, ab, W) {
        var S = Y[0];
        var R = Y[1];
        var Z = Y[2];
        var ac = Y[3];
        var aa = Y[4];
        var U = Y[5];
        if (ab === void 0) {
            ab = true
        }
        if (W === void 0) {
            W = false
        }
        var V = X.element;
        X.reach[ac] = null;
        if (V[Z] < 1) {
            X.reach[ac] = "start"
        }
        if (V[Z] > X[S] - X[R] - 1) {
            X.reach[ac] = "end"
        }
        if (T) {
            V.dispatchEvent(f(("ps-scroll-" + ac)));
            if (T < 0) {
                V.dispatchEvent(f(("ps-scroll-" + aa)))
            } else {
                if (T > 0) {
                    V.dispatchEvent(f(("ps-scroll-" + U)))
                }
            }
            if (ab) {
                I(X, ac)
            }
        }
        if (X.reach[ac] && (T || W)) {
            V.dispatchEvent(f(("ps-" + ac + "-reach-" + (X.reach[ac]))))
        }
    }

    function J(R) {
        return parseInt(R, 10) || 0
    }

    function s(R) {
        return (u(R, "input,[contenteditable]") || u(R, "select,[contenteditable]") || u(R, "textarea,[contenteditable]") || u(R, "button,[contenteditable]"))
    }

    function x(R) {
        var S = p(R);
        return (J(S.width) + J(S.paddingLeft) + J(S.paddingRight) + J(S.borderLeftWidth) + J(S.borderRightWidth))
    }
    var l = {
        isWebKit: typeof document !== "undefined" && "WebkitAppearance" in document.documentElement.style,
        supportsTouch: typeof window !== "undefined" && ("ontouchstart" in window || ("maxTouchPoints" in window.navigator && window.navigator.maxTouchPoints > 0) || (window.DocumentTouch && document instanceof window.DocumentTouch)),
        supportsIePointer: typeof navigator !== "undefined" && navigator.msMaxTouchPoints,
        isChrome: typeof navigator !== "undefined" && /Chrome/i.test(navigator && navigator.userAgent),
    };

    function P(S) {
        var R = S.element;
        var U = Math.floor(R.scrollTop);
        var T = R.getBoundingClientRect();
        S.containerWidth = Math.ceil(T.width);
        S.containerHeight = Math.ceil(T.height);
        S.contentWidth = R.scrollWidth;
        S.contentHeight = R.scrollHeight;
        if (!R.contains(S.scrollbarXRail)) {
            C(R, e.element.rail("x")).forEach(function(V) {
                return D(V)
            });
            R.appendChild(S.scrollbarXRail)
        }
        if (!R.contains(S.scrollbarYRail)) {
            C(R, e.element.rail("y")).forEach(function(V) {
                return D(V)
            });
            R.appendChild(S.scrollbarYRail)
        }
        if (!S.settings.suppressScrollX && S.containerWidth + S.settings.scrollXMarginOffset < S.contentWidth) {
            S.scrollbarXActive = true;
            S.railXWidth = S.containerWidth - S.railXMarginWidth;
            S.railXRatio = S.containerWidth / S.railXWidth;
            S.scrollbarXWidth = q(S, J((S.railXWidth * S.containerWidth) / S.contentWidth));
            S.scrollbarXLeft = J(((S.negativeScrollAdjustment + R.scrollLeft) * (S.railXWidth - S.scrollbarXWidth)) / (S.contentWidth - S.containerWidth))
        } else {
            S.scrollbarXActive = false
        }
        if (!S.settings.suppressScrollY && S.containerHeight + S.settings.scrollYMarginOffset < S.contentHeight) {
            S.scrollbarYActive = true;
            S.railYHeight = S.containerHeight - S.railYMarginHeight;
            S.railYRatio = S.containerHeight / S.railYHeight;
            S.scrollbarYHeight = q(S, J((S.railYHeight * S.containerHeight) / S.contentHeight));
            S.scrollbarYTop = J((U * (S.railYHeight - S.scrollbarYHeight)) / (S.contentHeight - S.containerHeight))
        } else {
            S.scrollbarYActive = false
        }
        if (S.scrollbarXLeft >= S.railXWidth - S.scrollbarXWidth) {
            S.scrollbarXLeft = S.railXWidth - S.scrollbarXWidth
        }
        if (S.scrollbarYTop >= S.railYHeight - S.scrollbarYHeight) {
            S.scrollbarYTop = S.railYHeight - S.scrollbarYHeight
        }
        O(R, S);
        if (S.scrollbarXActive) {
            R.classList.add(e.state.active("x"))
        } else {
            R.classList.remove(e.state.active("x"));
            S.scrollbarXWidth = 0;
            S.scrollbarXLeft = 0;
            R.scrollLeft = S.isRtl === true ? S.contentWidth : 0
        }
        if (S.scrollbarYActive) {
            R.classList.add(e.state.active("y"))
        } else {
            R.classList.remove(e.state.active("y"));
            S.scrollbarYHeight = 0;
            S.scrollbarYTop = 0;
            R.scrollTop = 0
        }
    }

    function q(R, S) {
        if (R.settings.minScrollbarLength) {
            S = Math.max(S, R.settings.minScrollbarLength)
        }
        if (R.settings.maxScrollbarLength) {
            S = Math.min(S, R.settings.maxScrollbarLength)
        }
        return S
    }

    function O(R, S) {
        var U = {
            width: S.railXWidth
        };
        var T = Math.floor(R.scrollTop);
        if (S.isRtl) {
            U.left = S.negativeScrollAdjustment + R.scrollLeft + S.containerWidth - S.contentWidth
        } else {
            U.left = R.scrollLeft
        }
        if (S.isScrollbarXUsingBottom) {
            U.bottom = S.scrollbarXBottom - T
        } else {
            U.top = S.scrollbarXTop + T
        }
        H(S.scrollbarXRail, U);
        var V = {
            top: T,
            height: S.railYHeight
        };
        if (S.isScrollbarYUsingRight) {
            if (S.isRtl) {
                V.right = S.contentWidth - (S.negativeScrollAdjustment + R.scrollLeft) - S.scrollbarYRight - S.scrollbarYOuterWidth - 9
            } else {
                V.right = S.scrollbarYRight - R.scrollLeft
            }
        } else {
            if (S.isRtl) {
                V.left = S.negativeScrollAdjustment + R.scrollLeft + S.containerWidth * 2 - S.contentWidth - S.scrollbarYLeft - S.scrollbarYOuterWidth
            } else {
                V.left = S.scrollbarYLeft + R.scrollLeft
            }
        }
        H(S.scrollbarYRail, V);
        H(S.scrollbarX, {
            left: S.scrollbarXLeft,
            width: S.scrollbarXWidth - S.railBorderXWidth,
        });
        H(S.scrollbarY, {
            top: S.scrollbarYTop,
            height: S.scrollbarYHeight - S.railBorderYWidth,
        })
    }

    function d(S) {
        var R = S.element;
        S.event.bind(S.scrollbarY, "mousedown", function(T) {
            return T.stopPropagation()
        });
        S.event.bind(S.scrollbarYRail, "mousedown", function(U) {
            var V = U.pageY - window.pageYOffset - S.scrollbarYRail.getBoundingClientRect().top;
            var T = V > S.scrollbarYTop ? 1 : -1;
            S.element.scrollTop += T * S.containerHeight;
            P(S);
            U.stopPropagation()
        });
        S.event.bind(S.scrollbarX, "mousedown", function(T) {
            return T.stopPropagation()
        });
        S.event.bind(S.scrollbarXRail, "mousedown", function(U) {
            var V = U.pageX - window.pageXOffset - S.scrollbarXRail.getBoundingClientRect().left;
            var T = V > S.scrollbarXLeft ? 1 : -1;
            S.element.scrollLeft += T * S.containerWidth;
            P(S);
            U.stopPropagation()
        })
    }

    function j(R) {
        c(R, ["containerWidth", "contentWidth", "pageX", "railXWidth", "scrollbarX", "scrollbarXWidth", "scrollLeft", "x", "scrollbarXRail"]);
        c(R, ["containerHeight", "contentHeight", "pageY", "railYHeight", "scrollbarY", "scrollbarYHeight", "scrollTop", "y", "scrollbarYRail"])
    }

    function c(V, aa) {
        var S = aa[0];
        var T = aa[1];
        var Y = aa[2];
        var Z = aa[3];
        var ab = aa[4];
        var ac = aa[5];
        var af = aa[6];
        var ai = aa[7];
        var ad = aa[8];
        var U = V.element;
        var ah = null;
        var ag = null;
        var ae = null;

        function W(aj) {
            if (aj.touches && aj.touches[0]) {
                aj[Y] = aj.touches[0].pageY
            }
            U[af] = ah + ae * (aj[Y] - ag);
            a(V, ai);
            P(V);
            aj.stopPropagation();
            aj.preventDefault()
        }

        function X() {
            F(V, ai);
            V[ad].classList.remove(e.state.clicking);
            V.event.unbind(V.ownerDocument, "mousemove", W)
        }

        function R(aj, ak) {
            ah = U[af];
            if (ak && aj.touches) {
                aj[Y] = aj.touches[0].pageY
            }
            ag = aj[Y];
            ae = (V[T] - V[S]) / (V[Z] - V[ac]);
            if (!ak) {
                V.event.bind(V.ownerDocument, "mousemove", W);
                V.event.once(V.ownerDocument, "mouseup", X);
                aj.preventDefault()
            } else {
                V.event.bind(V.ownerDocument, "touchmove", W)
            }
            V[ad].classList.add(e.state.clicking);
            aj.stopPropagation()
        }
        V.event.bind(V[ab], "mousedown", function(aj) {
            R(aj)
        });
        V.event.bind(V[ab], "touchstart", function(aj) {
            R(aj, true)
        })
    }

    function t(T) {
        var R = T.element;
        var S = function() {
            return u(R, ":hover")
        };
        var U = function() {
            return u(T.scrollbarX, ":focus") || u(T.scrollbarY, ":focus")
        };

        function V(W, X) {
            var Z = Math.floor(R.scrollTop);
            if (W === 0) {
                if (!T.scrollbarYActive) {
                    return false
                }
                if ((Z === 0 && X > 0) || (Z >= T.contentHeight - T.containerHeight && X < 0)) {
                    return !T.settings.wheelPropagation
                }
            }
            var Y = R.scrollLeft;
            if (X === 0) {
                if (!T.scrollbarXActive) {
                    return false
                }
                if ((Y === 0 && W < 0) || (Y >= T.contentWidth - T.containerWidth && W > 0)) {
                    return !T.settings.wheelPropagation
                }
            }
            return true
        }
        T.event.bind(T.ownerDocument, "keydown", function(Z) {
            if ((Z.isDefaultPrevented && Z.isDefaultPrevented()) || Z.defaultPrevented) {
                return
            }
            if (!S() && !U()) {
                return
            }
            var W = document.activeElement ? document.activeElement : T.ownerDocument.activeElement;
            if (W) {
                if (W.tagName === "IFRAME") {
                    W = W.contentDocument.activeElement
                } else {
                    while (W.shadowRoot) {
                        W = W.shadowRoot.activeElement
                    }
                }
                if (s(W)) {
                    return
                }
            }
            var X = 0;
            var Y = 0;
            switch (Z.which) {
                case 37:
                    if (Z.metaKey) {
                        X = -T.contentWidth
                    } else {
                        if (Z.altKey) {
                            X = -T.containerWidth
                        } else {
                            X = -30
                        }
                    }
                    break;
                case 38:
                    if (Z.metaKey) {
                        Y = T.contentHeight
                    } else {
                        if (Z.altKey) {
                            Y = T.containerHeight
                        } else {
                            Y = 30
                        }
                    }
                    break;
                case 39:
                    if (Z.metaKey) {
                        X = T.contentWidth
                    } else {
                        if (Z.altKey) {
                            X = T.containerWidth
                        } else {
                            X = 30
                        }
                    }
                    break;
                case 40:
                    if (Z.metaKey) {
                        Y = -T.contentHeight
                    } else {
                        if (Z.altKey) {
                            Y = -T.containerHeight
                        } else {
                            Y = -30
                        }
                    }
                    break;
                case 32:
                    if (Z.shiftKey) {
                        Y = T.containerHeight
                    } else {
                        Y = -T.containerHeight
                    }
                    break;
                case 33:
                    Y = T.containerHeight;
                    break;
                case 34:
                    Y = -T.containerHeight;
                    break;
                case 36:
                    Y = T.contentHeight;
                    break;
                case 35:
                    Y = -T.contentHeight;
                    break;
                default:
                    return
            }
            if (T.settings.suppressScrollX && X !== 0) {
                return
            }
            if (T.settings.suppressScrollY && Y !== 0) {
                return
            }
            R.scrollTop -= Y;
            R.scrollLeft += X;
            P(T);
            if (V(X, Y)) {
                Z.preventDefault()
            }
        })
    }

    function Q(T) {
        var R = T.element;

        function W(X, Y) {
            var ae = Math.floor(R.scrollTop);
            var ad = R.scrollTop === 0;
            var aa = ae + R.offsetHeight === R.scrollHeight;
            var ab = R.scrollLeft === 0;
            var ac = R.scrollLeft + R.offsetWidth === R.scrollWidth;
            var Z;
            if (Math.abs(Y) > Math.abs(X)) {
                Z = ad || aa
            } else {
                Z = ab || ac
            }
            return Z ? !T.settings.wheelPropagation : true
        }

        function S(Z) {
            var X = Z.deltaX;
            var Y = -1 * Z.deltaY;
            if (typeof X === "undefined" || typeof Y === "undefined") {
                X = (-1 * Z.wheelDeltaX) / 6;
                Y = Z.wheelDeltaY / 6
            }
            if (Z.deltaMode && Z.deltaMode === 1) {
                X *= 10;
                Y *= 10
            }
            if (X !== X && Y !== Y) {
                X = 0;
                Y = Z.wheelDelta
            }
            if (Z.shiftKey) {
                return [-Y, -X]
            }
            return [X, Y]
        }

        function V(ad, Y, Z) {
            if (!l.isWebKit && R.querySelector("select:focus")) {
                return true
            }
            if (!R.contains(ad)) {
                return false
            }
            var X = ad;
            while (X && X !== R) {
                if (X.classList.contains(e.element.consuming)) {
                    return true
                }
                var ac = p(X);
                if (Z && ac.overflowY.match(/(scroll|auto)/)) {
                    var ab = X.scrollHeight - X.clientHeight;
                    if (ab > 0) {
                        if ((X.scrollTop > 0 && Z < 0) || (X.scrollTop < ab && Z > 0)) {
                            return true
                        }
                    }
                }
                if (Y && ac.overflowX.match(/(scroll|auto)/)) {
                    var aa = X.scrollWidth - X.clientWidth;
                    if (aa > 0) {
                        if ((X.scrollLeft > 0 && Y < 0) || (X.scrollLeft < aa && Y > 0)) {
                            return true
                        }
                    }
                }
                X = X.parentNode
            }
            return false
        }

        function U(Z) {
            var aa = S(Z);
            var X = aa[0];
            var Y = aa[1];
            if (V(Z.target, X, Y)) {
                return
            }
            var ab = false;
            if (!T.settings.useBothWheelAxes) {
                R.scrollTop -= Y * T.settings.wheelSpeed;
                R.scrollLeft += X * T.settings.wheelSpeed
            } else {
                if (T.scrollbarYActive && !T.scrollbarXActive) {
                    if (Y) {
                        R.scrollTop -= Y * T.settings.wheelSpeed
                    } else {
                        R.scrollTop += X * T.settings.wheelSpeed
                    }
                    ab = true
                } else {
                    if (T.scrollbarXActive && !T.scrollbarYActive) {
                        if (X) {
                            R.scrollLeft += X * T.settings.wheelSpeed
                        } else {
                            R.scrollLeft -= Y * T.settings.wheelSpeed
                        }
                        ab = true
                    }
                }
            }
            P(T);
            ab = ab || W(X, Y);
            if (ab && !Z.ctrlKey) {
                Z.stopPropagation();
                Z.preventDefault()
            }
        }
        if (typeof window.onwheel !== "undefined") {
            T.event.bind(R, "wheel", U)
        } else {
            if (typeof window.onmousewheel !== "undefined") {
                T.event.bind(R, "mousewheel", U)
            }
        }
    }

    function K(V) {
        if (!l.supportsTouch && !l.supportsIePointer) {
            return
        }
        var T = V.element;

        function Y(af, ag) {
            var ak = Math.floor(T.scrollTop);
            var aj = T.scrollLeft;
            var ah = Math.abs(af);
            var ai = Math.abs(ag);
            if (ai > ah) {
                if ((ag < 0 && ak === V.contentHeight - V.containerHeight) || (ag > 0 && ak === 0)) {
                    return window.scrollY === 0 && ag > 0 && l.isChrome
                }
            } else {
                if (ah > ai) {
                    if ((af < 0 && aj === V.contentWidth - V.containerWidth) || (af > 0 && aj === 0)) {
                        return true
                    }
                }
            }
            return true
        }

        function R(af, ag) {
            T.scrollTop -= ag;
            T.scrollLeft -= af;
            P(V)
        }
        var aa = {};
        var ab = 0;
        var Z = {};
        var S = null;

        function U(af) {
            if (af.targetTouches) {
                return af.targetTouches[0]
            } else {
                return af
            }
        }

        function X(af) {
            if (af.pointerType && af.pointerType === "pen" && af.buttons === 0) {
                return false
            }
            if (af.targetTouches && af.targetTouches.length === 1) {
                return true
            }
            if (af.pointerType && af.pointerType !== "mouse" && af.pointerType !== af.MSPOINTER_TYPE_MOUSE) {
                return true
            }
            return false
        }

        function ae(af) {
            if (!X(af)) {
                return
            }
            var ag = U(af);
            aa.pageX = ag.pageX;
            aa.pageY = ag.pageY;
            ab = new Date().getTime();
            if (S !== null) {
                clearInterval(S)
            }
        }

        function W(al, ag, ah) {
            if (!T.contains(al)) {
                return false
            }
            var af = al;
            while (af && af !== T) {
                if (af.classList.contains(e.element.consuming)) {
                    return true
                }
                var ak = p(af);
                if (ah && ak.overflowY.match(/(scroll|auto)/)) {
                    var aj = af.scrollHeight - af.clientHeight;
                    if (aj > 0) {
                        if ((af.scrollTop > 0 && ah < 0) || (af.scrollTop < aj && ah > 0)) {
                            return true
                        }
                    }
                }
                if (ag && ak.overflowX.match(/(scroll|auto)/)) {
                    var ai = af.scrollWidth - af.clientWidth;
                    if (ai > 0) {
                        if ((af.scrollLeft > 0 && ag < 0) || (af.scrollLeft < ai && ag > 0)) {
                            return true
                        }
                    }
                }
                af = af.parentNode
            }
            return false
        }

        function ad(aj) {
            if (X(aj)) {
                var al = U(aj);
                var af = {
                    pageX: al.pageX,
                    pageY: al.pageY
                };
                var ah = af.pageX - aa.pageX;
                var ai = af.pageY - aa.pageY;
                if (W(aj.target, ah, ai)) {
                    return
                }
                R(ah, ai);
                aa = af;
                var ag = new Date().getTime();
                var ak = ag - ab;
                if (ak > 0) {
                    Z.x = ah / ak;
                    Z.y = ai / ak;
                    ab = ag
                }
                if (Y(ah, ai)) {
                    aj.preventDefault()
                }
            }
        }

        function ac() {
            if (V.settings.swipeEasing) {
                clearInterval(S);
                S = setInterval(function() {
                    if (V.isInitialized) {
                        clearInterval(S);
                        return
                    }
                    if (!Z.x && !Z.y) {
                        clearInterval(S);
                        return
                    }
                    if (Math.abs(Z.x) < 0.01 && Math.abs(Z.y) < 0.01) {
                        clearInterval(S);
                        return
                    }
                    R(Z.x * 30, Z.y * 30);
                    Z.x *= 0.8;
                    Z.y *= 0.8
                }, 10)
            }
        }
        if (l.supportsTouch) {
            V.event.bind(T, "touchstart", ae);
            V.event.bind(T, "touchmove", ad);
            V.event.bind(T, "touchend", ac)
        } else {
            if (l.supportsIePointer) {
                if (window.PointerEvent) {
                    V.event.bind(T, "pointerdown", ae);
                    V.event.bind(T, "pointermove", ad);
                    V.event.bind(T, "pointerup", ac)
                } else {
                    if (window.MSPointerEvent) {
                        V.event.bind(T, "MSPointerDown", ae);
                        V.event.bind(T, "MSPointerMove", ad);
                        V.event.bind(T, "MSPointerUp", ac)
                    }
                }
            }
        }
    }
    var g = function() {
        return ({
            handlers: ["click-rail", "drag-thumb", "keyboard", "wheel", "touch"],
            maxScrollbarLength: null,
            minScrollbarLength: null,
            scrollingThreshold: 1000,
            scrollXMarginOffset: 0,
            scrollYMarginOffset: 0,
            suppressScrollX: false,
            suppressScrollY: false,
            swipeEasing: true,
            useBothWheelAxes: false,
            wheelPropagation: true,
            wheelSpeed: 1,
        })
    };
    var r = {
        "click-rail": d,
        "drag-thumb": j,
        keyboard: t,
        wheel: Q,
        touch: K,
    };
    var y = function y(S, Y) {
        var X = this;
        if (Y === void 0) {
            Y = {}
        }
        if (typeof S === "string") {
            S = document.querySelector(S)
        }
        if (!S || !S.nodeName) {
            throw new Error("no element is specified to initialize PerfectScrollbar")
        }
        this.element = S;
        S.classList.add(e.main);
        this.settings = g();
        for (var U in Y) {
            this.settings[U] = Y[U]
        }
        this.containerWidth = null;
        this.containerHeight = null;
        this.contentWidth = null;
        this.contentHeight = null;
        var T = function() {
            return S.classList.add(e.state.focus)
        };
        var R = function() {
            return S.classList.remove(e.state.focus)
        };
        this.isRtl = p(S).direction === "rtl";
        if (this.isRtl === true) {
            S.classList.add(e.rtl)
        }
        this.isNegativeScroll = (function() {
            var Z = S.scrollLeft;
            var aa = null;
            S.scrollLeft = -1;
            aa = S.scrollLeft < 0;
            S.scrollLeft = Z;
            return aa
        })();
        this.negativeScrollAdjustment = this.isNegativeScroll ? S.scrollWidth - S.clientWidth : 0;
        this.event = new o();
        this.ownerDocument = S.ownerDocument || document;
        this.scrollbarXRail = i(e.element.rail("x"));
        S.appendChild(this.scrollbarXRail);
        this.scrollbarX = i(e.element.thumb("x"));
        this.scrollbarXRail.appendChild(this.scrollbarX);
        this.scrollbarX.setAttribute("tabindex", 0);
        this.event.bind(this.scrollbarX, "focus", T);
        this.event.bind(this.scrollbarX, "blur", R);
        this.scrollbarXActive = null;
        this.scrollbarXWidth = null;
        this.scrollbarXLeft = null;
        var V = p(this.scrollbarXRail);
        this.scrollbarXBottom = parseInt(V.bottom, 10);
        if (isNaN(this.scrollbarXBottom)) {
            this.isScrollbarXUsingBottom = false;
            this.scrollbarXTop = J(V.top)
        } else {
            this.isScrollbarXUsingBottom = true
        }
        this.railBorderXWidth = J(V.borderLeftWidth) + J(V.borderRightWidth);
        H(this.scrollbarXRail, {
            display: "block"
        });
        this.railXMarginWidth = J(V.marginLeft) + J(V.marginRight);
        H(this.scrollbarXRail, {
            display: ""
        });
        this.railXWidth = null;
        this.railXRatio = null;
        this.scrollbarYRail = i(e.element.rail("y"));
        S.appendChild(this.scrollbarYRail);
        this.scrollbarY = i(e.element.thumb("y"));
        this.scrollbarYRail.appendChild(this.scrollbarY);
        this.scrollbarY.setAttribute("tabindex", 0);
        this.event.bind(this.scrollbarY, "focus", T);
        this.event.bind(this.scrollbarY, "blur", R);
        this.scrollbarYActive = null;
        this.scrollbarYHeight = null;
        this.scrollbarYTop = null;
        var W = p(this.scrollbarYRail);
        this.scrollbarYRight = parseInt(W.right, 10);
        if (isNaN(this.scrollbarYRight)) {
            this.isScrollbarYUsingRight = false;
            this.scrollbarYLeft = J(W.left)
        } else {
            this.isScrollbarYUsingRight = true
        }
        this.scrollbarYOuterWidth = this.isRtl ? x(this.scrollbarY) : null;
        this.railBorderYWidth = J(W.borderTopWidth) + J(W.borderBottomWidth);
        H(this.scrollbarYRail, {
            display: "block"
        });
        this.railYMarginHeight = J(W.marginTop) + J(W.marginBottom);
        H(this.scrollbarYRail, {
            display: ""
        });
        this.railYHeight = null;
        this.railYRatio = null;
        this.reach = {
            x: S.scrollLeft <= 0 ? "start" : S.scrollLeft >= this.contentWidth - this.containerWidth ? "end" : null,
            y: S.scrollTop <= 0 ? "start" : S.scrollTop >= this.contentHeight - this.containerHeight ? "end" : null,
        };
        this.isAlive = true;
        this.settings.handlers.forEach(function(Z) {
            return r[Z](X)
        });
        this.lastScrollTop = Math.floor(S.scrollTop);
        this.lastScrollLeft = S.scrollLeft;
        this.event.bind(this.element, "scroll", function(Z) {
            return X.onScroll(Z)
        });
        P(this)
    };
    y.prototype.update = function N() {
        if (!this.isAlive) {
            return
        }
        this.negativeScrollAdjustment = this.isNegativeScroll ? this.element.scrollWidth - this.element.clientWidth : 0;
        H(this.scrollbarXRail, {
            display: "block"
        });
        H(this.scrollbarYRail, {
            display: "block"
        });
        this.railXMarginWidth = J(p(this.scrollbarXRail).marginLeft) + J(p(this.scrollbarXRail).marginRight);
        this.railYMarginHeight = J(p(this.scrollbarYRail).marginTop) + J(p(this.scrollbarYRail).marginBottom);
        H(this.scrollbarXRail, {
            display: "none"
        });
        H(this.scrollbarYRail, {
            display: "none"
        });
        P(this);
        z(this, "top", 0, false, true);
        z(this, "left", 0, false, true);
        H(this.scrollbarXRail, {
            display: ""
        });
        H(this.scrollbarYRail, {
            display: ""
        })
    };
    y.prototype.onScroll = function w(R) {
        if (!this.isAlive) {
            return
        }
        P(this);
        z(this, "top", this.element.scrollTop - this.lastScrollTop);
        z(this, "left", this.element.scrollLeft - this.lastScrollLeft);
        this.lastScrollTop = Math.floor(this.element.scrollTop);
        this.lastScrollLeft = this.element.scrollLeft
    };
    y.prototype.destroy = function h() {
        if (!this.isAlive) {
            return
        }
        this.event.unbindAll();
        D(this.scrollbarX);
        D(this.scrollbarY);
        D(this.scrollbarXRail);
        D(this.scrollbarYRail);
        this.removePsClasses();
        this.element = null;
        this.scrollbarX = null;
        this.scrollbarY = null;
        this.scrollbarXRail = null;
        this.scrollbarYRail = null;
        this.isAlive = false
    };
    y.prototype.removePsClasses = function E() {
        this.element.className = this.element.className.split(" ").filter(function(R) {
            return !R.match(/^ps([-_].+|)$/)
        }).join(" ")
    };
    return y
})));