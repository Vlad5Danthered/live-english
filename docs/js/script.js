!function (e, t) {
  "object" == typeof exports && "undefined" != typeof module ? t() : "function" == typeof define && define.amd ? define(t) : t();
}(0, function () {
  "use strict";

  function e(e) {
    var t = !0,
      n = !1,
      o = null,
      d = {
        text: !0,
        search: !0,
        url: !0,
        tel: !0,
        email: !0,
        password: !0,
        number: !0,
        date: !0,
        month: !0,
        week: !0,
        time: !0,
        datetime: !0,
        "datetime-local": !0
      };
    function i(e) {
      return !!(e && e !== document && "HTML" !== e.nodeName && "BODY" !== e.nodeName && "classList" in e && "contains" in e.classList);
    }
    function s(e) {
      e.classList.contains("focus-visible") || (e.classList.add("focus-visible"), e.setAttribute("data-focus-visible-added", ""));
    }
    function u(e) {
      t = !1;
    }
    function a() {
      document.addEventListener("mousemove", c), document.addEventListener("mousedown", c), document.addEventListener("mouseup", c), document.addEventListener("pointermove", c), document.addEventListener("pointerdown", c), document.addEventListener("pointerup", c), document.addEventListener("touchmove", c), document.addEventListener("touchstart", c), document.addEventListener("touchend", c);
    }
    function c(e) {
      e.target.nodeName && "html" === e.target.nodeName.toLowerCase() || (t = !1, document.removeEventListener("mousemove", c), document.removeEventListener("mousedown", c), document.removeEventListener("mouseup", c), document.removeEventListener("pointermove", c), document.removeEventListener("pointerdown", c), document.removeEventListener("pointerup", c), document.removeEventListener("touchmove", c), document.removeEventListener("touchstart", c), document.removeEventListener("touchend", c));
    }
    document.addEventListener("keydown", function (n) {
      n.metaKey || n.altKey || n.ctrlKey || (i(e.activeElement) && s(e.activeElement), t = !0);
    }, !0), document.addEventListener("mousedown", u, !0), document.addEventListener("pointerdown", u, !0), document.addEventListener("touchstart", u, !0), document.addEventListener("visibilitychange", function (e) {
      "hidden" === document.visibilityState && (n && (t = !0), a());
    }, !0), a(), e.addEventListener("focus", function (e) {
      var n, o, u;
      i(e.target) && (t || (n = e.target, o = n.type, "INPUT" === (u = n.tagName) && d[o] && !n.readOnly || "TEXTAREA" === u && !n.readOnly || n.isContentEditable)) && s(e.target);
    }, !0), e.addEventListener("blur", function (e) {
      var t;
      i(e.target) && (e.target.classList.contains("focus-visible") || e.target.hasAttribute("data-focus-visible-added")) && (n = !0, window.clearTimeout(o), o = window.setTimeout(function () {
        n = !1;
      }, 100), (t = e.target).hasAttribute("data-focus-visible-added") && (t.classList.remove("focus-visible"), t.removeAttribute("data-focus-visible-added")));
    }, !0), e.nodeType === Node.DOCUMENT_FRAGMENT_NODE && e.host ? e.host.setAttribute("data-js-focus-visible", "") : e.nodeType === Node.DOCUMENT_NODE && (document.documentElement.classList.add("js-focus-visible"), document.documentElement.setAttribute("data-js-focus-visible", ""));
  }
  if ("undefined" != typeof window && "undefined" != typeof document) {
    var t;
    window.applyFocusVisiblePolyfill = e;
    try {
      t = new CustomEvent("focus-visible-polyfill-ready");
    } catch (e) {
      (t = document.createEvent("CustomEvent")).initCustomEvent("focus-visible-polyfill-ready", !1, !1, {});
    }
    window.dispatchEvent(t);
  }
  "undefined" != typeof document && e(document);
});
/*!
  hey, [be]Lazy.js - v1.8.2 - 2016.10.25
  A fast, small and dependency free lazy load script (https://github.com/dinbror/blazy)
  (c) Bjoern Klinggaard - @bklinggaard - http://dinbror.dk/blazy
*/
(function (q, m) {
  "function" === typeof define && define.amd ? define(m) : "object" === typeof exports ? module.exports = m() : q.Blazy = m();
})(this, function () {
  function q(b) {
    var c = b._util;
    c.elements = E(b.options);
    c.count = c.elements.length;
    c.destroyed && (c.destroyed = !1, b.options.container && l(b.options.container, function (a) {
      n(a, "scroll", c.validateT);
    }), n(window, "resize", c.saveViewportOffsetT), n(window, "resize", c.validateT), n(window, "scroll", c.validateT));
    m(b);
  }
  function m(b) {
    for (var c = b._util, a = 0; a < c.count; a++) {
      var d = c.elements[a],
        e;
      a: {
        var g = d;
        e = b.options;
        var p = g.getBoundingClientRect();
        if (e.container && y && (g = g.closest(e.containerClass))) {
          g = g.getBoundingClientRect();
          e = r(g, f) ? r(p, {
            top: g.top - e.offset,
            right: g.right + e.offset,
            bottom: g.bottom + e.offset,
            left: g.left - e.offset
          }) : !1;
          break a;
        }
        e = r(p, f);
      }
      if (e || t(d, b.options.successClass)) b.load(d), c.elements.splice(a, 1), c.count--, a--;
    }
    0 === c.count && b.destroy();
  }
  function r(b, c) {
    return b.right >= c.left && b.bottom >= c.top && b.left <= c.right && b.top <= c.bottom;
  }
  function z(b, c, a) {
    if (!t(b, a.successClass) && (c || a.loadInvisible || 0 < b.offsetWidth && 0 < b.offsetHeight)) if (c = b.getAttribute(u) || b.getAttribute(a.src)) {
      c = c.split(a.separator);
      var d = c[A && 1 < c.length ? 1 : 0],
        e = b.getAttribute(a.srcset),
        g = "img" === b.nodeName.toLowerCase(),
        p = (c = b.parentNode) && "picture" === c.nodeName.toLowerCase();
      if (g || void 0 === b.src) {
        var h = new Image(),
          w = function () {
            a.error && a.error(b, "invalid");
            v(b, a.errorClass);
            k(h, "error", w);
            k(h, "load", f);
          },
          f = function () {
            g ? p || B(b, d, e) : b.style.backgroundImage = 'url("' + d + '")';
            x(b, a);
            k(h, "load", f);
            k(h, "error", w);
          };
        p && (h = b, l(c.getElementsByTagName("source"), function (b) {
          var c = a.srcset,
            e = b.getAttribute(c);
          e && (b.setAttribute("srcset", e), b.removeAttribute(c));
        }));
        n(h, "error", w);
        n(h, "load", f);
        B(h, d, e);
      } else b.src = d, x(b, a);
    } else "video" === b.nodeName.toLowerCase() ? (l(b.getElementsByTagName("source"), function (b) {
      var c = a.src,
        e = b.getAttribute(c);
      e && (b.setAttribute("src", e), b.removeAttribute(c));
    }), b.load(), x(b, a)) : (a.error && a.error(b, "missing"), v(b, a.errorClass));
  }
  function x(b, c) {
    v(b, c.successClass);
    c.success && c.success(b);
    b.removeAttribute(c.src);
    b.removeAttribute(c.srcset);
    l(c.breakpoints, function (a) {
      b.removeAttribute(a.src);
    });
  }
  function B(b, c, a) {
    a && b.setAttribute("srcset", a);
    b.src = c;
  }
  function t(b, c) {
    return -1 !== (" " + b.className + " ").indexOf(" " + c + " ");
  }
  function v(b, c) {
    t(b, c) || (b.className += " " + c);
  }
  function E(b) {
    var c = [];
    b = b.root.querySelectorAll(b.selector);
    for (var a = b.length; a--; c.unshift(b[a]));
    return c;
  }
  function C(b) {
    f.bottom = (window.innerHeight || document.documentElement.clientHeight) + b;
    f.right = (window.innerWidth || document.documentElement.clientWidth) + b;
  }
  function n(b, c, a) {
    b.attachEvent ? b.attachEvent && b.attachEvent("on" + c, a) : b.addEventListener(c, a, {
      capture: !1,
      passive: !0
    });
  }
  function k(b, c, a) {
    b.detachEvent ? b.detachEvent && b.detachEvent("on" + c, a) : b.removeEventListener(c, a, {
      capture: !1,
      passive: !0
    });
  }
  function l(b, c) {
    if (b && c) for (var a = b.length, d = 0; d < a && !1 !== c(b[d], d); d++);
  }
  function D(b, c, a) {
    var d = 0;
    return function () {
      var e = +new Date();
      e - d < c || (d = e, b.apply(a, arguments));
    };
  }
  var u, f, A, y;
  return function (b) {
    if (!document.querySelectorAll) {
      var c = document.createStyleSheet();
      document.querySelectorAll = function (a, b, d, h, f) {
        f = document.all;
        b = [];
        a = a.replace(/\[for\b/gi, "[htmlFor").split(",");
        for (d = a.length; d--;) {
          c.addRule(a[d], "k:v");
          for (h = f.length; h--;) f[h].currentStyle.k && b.push(f[h]);
          c.removeRule(0);
        }
        return b;
      };
    }
    var a = this,
      d = a._util = {};
    d.elements = [];
    d.destroyed = !0;
    a.options = b || {};
    a.options.error = a.options.error || !1;
    a.options.offset = a.options.offset || 100;
    a.options.root = a.options.root || document;
    a.options.success = a.options.success || !1;
    a.options.selector = a.options.selector || ".b-lazy";
    a.options.separator = a.options.separator || "|";
    a.options.containerClass = a.options.container;
    a.options.container = a.options.containerClass ? document.querySelectorAll(a.options.containerClass) : !1;
    a.options.errorClass = a.options.errorClass || "b-error";
    a.options.breakpoints = a.options.breakpoints || !1;
    a.options.loadInvisible = a.options.loadInvisible || !1;
    a.options.successClass = a.options.successClass || "b-loaded";
    a.options.validateDelay = a.options.validateDelay || 25;
    a.options.saveViewportOffsetDelay = a.options.saveViewportOffsetDelay || 50;
    a.options.srcset = a.options.srcset || "data-srcset";
    a.options.src = u = a.options.src || "data-src";
    y = Element.prototype.closest;
    A = 1 < window.devicePixelRatio;
    f = {};
    f.top = 0 - a.options.offset;
    f.left = 0 - a.options.offset;
    a.revalidate = function () {
      q(a);
    };
    a.load = function (a, b) {
      var c = this.options;
      void 0 === a.length ? z(a, b, c) : l(a, function (a) {
        z(a, b, c);
      });
    };
    a.destroy = function () {
      var a = this._util;
      this.options.container && l(this.options.container, function (b) {
        k(b, "scroll", a.validateT);
      });
      k(window, "scroll", a.validateT);
      k(window, "resize", a.validateT);
      k(window, "resize", a.saveViewportOffsetT);
      a.count = 0;
      a.elements.length = 0;
      a.destroyed = !0;
    };
    d.validateT = D(function () {
      m(a);
    }, a.options.validateDelay, a);
    d.saveViewportOffsetT = D(function () {
      C(a.options.offset);
    }, a.options.saveViewportOffsetDelay, a);
    C(a.options.offset);
    l(a.options.breakpoints, function (a) {
      if (a.width >= window.screen.width) return u = a.src, !1;
    });
    setTimeout(function () {
      q(a);
    });
  };
});
!function (root, factory) {
  "function" == typeof define && define.amd ?
  // AMD. Register as an anonymous module unless amdModuleId is set
  define([], function () {
    return root.svg4everybody = factory();
  }) : "object" == typeof module && module.exports ?
  // Node. Does not work with strict CommonJS, but
  // only CommonJS-like environments that support module.exports,
  // like Node.
  module.exports = factory() : root.svg4everybody = factory();
}(this, function () {
  /*! svg4everybody v2.1.9 | github.com/jonathantneal/svg4everybody */
  function embed(parent, svg, target) {
    // if the target exists
    if (target) {
      // create a document fragment to hold the contents of the target
      var fragment = document.createDocumentFragment(),
        viewBox = !svg.hasAttribute("viewBox") && target.getAttribute("viewBox");
      // conditionally set the viewBox on the svg
      viewBox && svg.setAttribute("viewBox", viewBox);
      // copy the contents of the clone into the fragment
      for (
      // clone the target
      var clone = target.cloneNode(!0); clone.childNodes.length;) {
        fragment.appendChild(clone.firstChild);
      }
      // append the fragment into the svg
      parent.appendChild(fragment);
    }
  }
  function loadreadystatechange(xhr) {
    // listen to changes in the request
    xhr.onreadystatechange = function () {
      // if the request is ready
      if (4 === xhr.readyState) {
        // get the cached html document
        var cachedDocument = xhr._cachedDocument;
        // ensure the cached html document based on the xhr response
        cachedDocument || (cachedDocument = xhr._cachedDocument = document.implementation.createHTMLDocument(""), cachedDocument.body.innerHTML = xhr.responseText, xhr._cachedTarget = {}),
        // clear the xhr embeds list and embed each item
        xhr._embeds.splice(0).map(function (item) {
          // get the cached target
          var target = xhr._cachedTarget[item.id];
          // ensure the cached target
          target || (target = xhr._cachedTarget[item.id] = cachedDocument.getElementById(item.id)),
          // embed the target into the svg
          embed(item.parent, item.svg, target);
        });
      }
    },
    // test the ready state change immediately
    xhr.onreadystatechange();
  }
  function svg4everybody(rawopts) {
    function oninterval() {
      // while the index exists in the live <use> collection
      for (
      // get the cached <use> index
      var index = 0; index < uses.length;) {
        // get the current <use>
        var use = uses[index],
          parent = use.parentNode,
          svg = getSVGAncestor(parent),
          src = use.getAttribute("xlink:href") || use.getAttribute("href");
        if (!src && opts.attributeName && (src = use.getAttribute(opts.attributeName)), svg && src) {
          if (polyfill) {
            if (!opts.validate || opts.validate(src, svg, use)) {
              // remove the <use> element
              parent.removeChild(use);
              // parse the src and get the url and id
              var srcSplit = src.split("#"),
                url = srcSplit.shift(),
                id = srcSplit.join("#");
              // if the link is external
              if (url.length) {
                // get the cached xhr request
                var xhr = requests[url];
                // ensure the xhr request exists
                xhr || (xhr = requests[url] = new XMLHttpRequest(), xhr.open("GET", url), xhr.send(), xhr._embeds = []),
                // add the svg and id as an item to the xhr embeds list
                xhr._embeds.push({
                  parent: parent,
                  svg: svg,
                  id: id
                }),
                // prepare the xhr ready state change event
                loadreadystatechange(xhr);
              } else {
                // embed the local id into the svg
                embed(parent, svg, document.getElementById(id));
              }
            } else {
              // increase the index when the previous value was not "valid"
              ++index, ++numberOfSvgUseElementsToBypass;
            }
          }
        } else {
          // increase the index when the previous value was not "valid"
          ++index;
        }
      }
      // continue the interval
      (!uses.length || uses.length - numberOfSvgUseElementsToBypass > 0) && requestAnimationFrame(oninterval, 67);
    }
    var polyfill,
      opts = Object(rawopts),
      newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,
      webkitUA = /\bAppleWebKit\/(\d+)\b/,
      olderEdgeUA = /\bEdge\/12\.(\d+)\b/,
      edgeUA = /\bEdge\/.(\d+)\b/,
      inIframe = window.top !== window.self;
    polyfill = "polyfill" in opts ? opts.polyfill : newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537 || edgeUA.test(navigator.userAgent) && inIframe;
    // create xhr requests object
    var requests = {},
      requestAnimationFrame = window.requestAnimationFrame || setTimeout,
      uses = document.getElementsByTagName("use"),
      numberOfSvgUseElementsToBypass = 0;
    // conditionally start the interval if the polyfill is active
    polyfill && oninterval();
  }
  function getSVGAncestor(node) {
    for (var svg = node; "svg" !== svg.nodeName.toLowerCase() && (svg = svg.parentNode);) {}
    return svg;
  }
  return svg4everybody;
});
function _classCallCheck(t, i) {
  if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(t, i) {
  for (var e = 0; e < i.length; e++) {
    var s = i[e];
    s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(t, s.key, s);
  }
}
function _createClass(t, i, e) {
  return i && _defineProperties(t.prototype, i), e && _defineProperties(t, e), t;
}
var Sticky = function () {
  function e() {
    var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "",
      i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
    _classCallCheck(this, e), this.selector = t, this.elements = [], this.version = "1.3.0", this.vp = this.getViewportSize(), this.body = document.querySelector("body"), this.options = {
      wrap: i.wrap || !1,
      wrapWith: i.wrapWith || "<span></span>",
      marginTop: i.marginTop || 0,
      marginBottom: i.marginBottom || 0,
      stickyFor: i.stickyFor || 0,
      stickyClass: i.stickyClass || null,
      stickyContainer: i.stickyContainer || "body"
    }, this.updateScrollTopPosition = this.updateScrollTopPosition.bind(this), this.updateScrollTopPosition(), window.addEventListener("load", this.updateScrollTopPosition), window.addEventListener("scroll", this.updateScrollTopPosition), this.run();
  }
  return _createClass(e, [{
    key: "run",
    value: function () {
      var i = this,
        e = setInterval(function () {
          if ("complete" === document.readyState) {
            clearInterval(e);
            var t = document.querySelectorAll(i.selector);
            i.forEach(t, function (t) {
              return i.renderElement(t);
            });
          }
        }, 10);
    }
  }, {
    key: "renderElement",
    value: function (t) {
      var i = this;
      t.sticky = {}, t.sticky.active = !1, t.sticky.marginTop = parseInt(t.getAttribute("data-margin-top")) || this.options.marginTop, t.sticky.marginBottom = parseInt(t.getAttribute("data-margin-bottom")) || this.options.marginBottom, t.sticky.stickyFor = parseInt(t.getAttribute("data-sticky-for")) || this.options.stickyFor, t.sticky.stickyClass = t.getAttribute("data-sticky-class") || this.options.stickyClass, t.sticky.wrap = !!t.hasAttribute("data-sticky-wrap") || this.options.wrap, t.sticky.stickyContainer = this.options.stickyContainer, t.sticky.container = this.getStickyContainer(t), t.sticky.container.rect = this.getRectangle(t.sticky.container), t.sticky.rect = this.getRectangle(t), "img" === t.tagName.toLowerCase() && (t.onload = function () {
        return t.sticky.rect = i.getRectangle(t);
      }), t.sticky.wrap && this.wrapElement(t), this.activate(t);
    }
  }, {
    key: "wrapElement",
    value: function (t) {
      t.insertAdjacentHTML("beforebegin", t.getAttribute("data-sticky-wrapWith") || this.options.wrapWith), t.previousSibling.appendChild(t);
    }
  }, {
    key: "activate",
    value: function (t) {
      t.sticky.rect.top + t.sticky.rect.height < t.sticky.container.rect.top + t.sticky.container.rect.height && t.sticky.stickyFor < this.vp.width && !t.sticky.active && (t.sticky.active = !0), this.elements.indexOf(t) < 0 && this.elements.push(t), t.sticky.resizeEvent || (this.initResizeEvents(t), t.sticky.resizeEvent = !0), t.sticky.scrollEvent || (this.initScrollEvents(t), t.sticky.scrollEvent = !0), this.setPosition(t);
    }
  }, {
    key: "initResizeEvents",
    value: function (t) {
      var i = this;
      t.sticky.resizeListener = function () {
        return i.onResizeEvents(t);
      }, window.addEventListener("resize", t.sticky.resizeListener);
    }
  }, {
    key: "destroyResizeEvents",
    value: function (t) {
      window.removeEventListener("resize", t.sticky.resizeListener);
    }
  }, {
    key: "onResizeEvents",
    value: function (t) {
      this.vp = this.getViewportSize(), t.sticky.rect = this.getRectangle(t), t.sticky.container.rect = this.getRectangle(t.sticky.container), t.sticky.rect.top + t.sticky.rect.height < t.sticky.container.rect.top + t.sticky.container.rect.height && t.sticky.stickyFor < this.vp.width && !t.sticky.active ? t.sticky.active = !0 : (t.sticky.rect.top + t.sticky.rect.height >= t.sticky.container.rect.top + t.sticky.container.rect.height || t.sticky.stickyFor >= this.vp.width && t.sticky.active) && (t.sticky.active = !1), this.setPosition(t);
    }
  }, {
    key: "initScrollEvents",
    value: function (t) {
      var i = this;
      t.sticky.scrollListener = function () {
        return i.onScrollEvents(t);
      }, window.addEventListener("scroll", t.sticky.scrollListener);
    }
  }, {
    key: "destroyScrollEvents",
    value: function (t) {
      window.removeEventListener("scroll", t.sticky.scrollListener);
    }
  }, {
    key: "onScrollEvents",
    value: function (t) {
      t.sticky && t.sticky.active && this.setPosition(t);
    }
  }, {
    key: "setPosition",
    value: function (t) {
      this.css(t, {
        position: "",
        width: "",
        top: "",
        left: ""
      }), this.vp.height < t.sticky.rect.height || !t.sticky.active || (t.sticky.rect.width || (t.sticky.rect = this.getRectangle(t)), t.sticky.wrap && this.css(t.parentNode, {
        display: "block",
        width: t.sticky.rect.width + "px",
        height: t.sticky.rect.height + "px"
      }), 0 === t.sticky.rect.top && t.sticky.container === this.body ? (this.css(t, {
        position: "fixed",
        top: t.sticky.rect.top + "px",
        left: t.sticky.rect.left + "px",
        width: t.sticky.rect.width + "px"
      }), t.sticky.stickyClass && t.classList.add(t.sticky.stickyClass)) : this.scrollTop > t.sticky.rect.top - t.sticky.marginTop ? (this.css(t, {
        position: "fixed",
        width: t.sticky.rect.width + "px",
        left: t.sticky.rect.left + "px"
      }), this.scrollTop + t.sticky.rect.height + t.sticky.marginTop > t.sticky.container.rect.top + t.sticky.container.offsetHeight - t.sticky.marginBottom ? (t.sticky.stickyClass && t.classList.remove(t.sticky.stickyClass), this.css(t, {
        top: t.sticky.container.rect.top + t.sticky.container.offsetHeight - (this.scrollTop + t.sticky.rect.height + t.sticky.marginBottom) + "px"
      })) : (t.sticky.stickyClass && t.classList.add(t.sticky.stickyClass), this.css(t, {
        top: t.sticky.marginTop + "px"
      }))) : (t.sticky.stickyClass && t.classList.remove(t.sticky.stickyClass), this.css(t, {
        position: "",
        width: "",
        top: "",
        left: ""
      }), t.sticky.wrap && this.css(t.parentNode, {
        display: "",
        width: "",
        height: ""
      })));
    }
  }, {
    key: "update",
    value: function () {
      var i = this;
      this.forEach(this.elements, function (t) {
        t.sticky.rect = i.getRectangle(t), t.sticky.container.rect = i.getRectangle(t.sticky.container), i.activate(t), i.setPosition(t);
      });
    }
  }, {
    key: "destroy",
    value: function () {
      var i = this;
      window.removeEventListener("load", this.updateScrollTopPosition), window.removeEventListener("scroll", this.updateScrollTopPosition), this.forEach(this.elements, function (t) {
        i.destroyResizeEvents(t), i.destroyScrollEvents(t), delete t.sticky;
      });
    }
  }, {
    key: "getStickyContainer",
    value: function (t) {
      for (var i = t.parentNode; !i.hasAttribute("data-sticky-container") && !i.parentNode.querySelector(t.sticky.stickyContainer) && i !== this.body;) i = i.parentNode;
      return i;
    }
  }, {
    key: "getRectangle",
    value: function (t) {
      this.css(t, {
        position: "",
        width: "",
        top: "",
        left: ""
      });
      for (var i = Math.max(t.offsetWidth, t.clientWidth, t.scrollWidth), e = Math.max(t.offsetHeight, t.clientHeight, t.scrollHeight), s = 0, n = 0; s += t.offsetTop || 0, n += t.offsetLeft || 0, t = t.offsetParent;);
      return {
        top: s,
        left: n,
        width: i,
        height: e
      };
    }
  }, {
    key: "getViewportSize",
    value: function () {
      return {
        width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
        height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
      };
    }
  }, {
    key: "updateScrollTopPosition",
    value: function () {
      this.scrollTop = (window.pageYOffset || document.scrollTop) - (document.clientTop || 0) || 0;
    }
  }, {
    key: "forEach",
    value: function (t, i) {
      for (var e = 0, s = t.length; e < s; e++) i(t[e]);
    }
  }, {
    key: "css",
    value: function (t, i) {
      for (var e in i) i.hasOwnProperty(e) && (t.style[e] = i[e]);
    }
  }]), e;
}();
!function (t, i) {
  "undefined" != typeof exports ? module.exports = i : "function" == typeof define && define.amd ? define([], function () {
    return i;
  }) : t.Sticky = i;
}(this, Sticky);
/*! jQuery v3.7.1 | (c) OpenJS Foundation and other contributors | jquery.org/license */
!function (e, t) {
  "use strict";

  "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function (e) {
    if (!e.document) throw new Error("jQuery requires a window with a document");
    return t(e);
  } : t(e);
}("undefined" != typeof window ? window : this, function (ie, e) {
  "use strict";

  var oe = [],
    r = Object.getPrototypeOf,
    ae = oe.slice,
    g = oe.flat ? function (e) {
      return oe.flat.call(e);
    } : function (e) {
      return oe.concat.apply([], e);
    },
    s = oe.push,
    se = oe.indexOf,
    n = {},
    i = n.toString,
    ue = n.hasOwnProperty,
    o = ue.toString,
    a = o.call(Object),
    le = {},
    v = function (e) {
      return "function" == typeof e && "number" != typeof e.nodeType && "function" != typeof e.item;
    },
    y = function (e) {
      return null != e && e === e.window;
    },
    C = ie.document,
    u = {
      type: !0,
      src: !0,
      nonce: !0,
      noModule: !0
    };
  function m(e, t, n) {
    var r,
      i,
      o = (n = n || C).createElement("script");
    if (o.text = e, t) for (r in u) (i = t[r] || t.getAttribute && t.getAttribute(r)) && o.setAttribute(r, i);
    n.head.appendChild(o).parentNode.removeChild(o);
  }
  function x(e) {
    return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? n[i.call(e)] || "object" : typeof e;
  }
  var t = "3.7.1",
    l = /HTML$/i,
    ce = function (e, t) {
      return new ce.fn.init(e, t);
    };
  function c(e) {
    var t = !!e && "length" in e && e.length,
      n = x(e);
    return !v(e) && !y(e) && ("array" === n || 0 === t || "number" == typeof t && 0 < t && t - 1 in e);
  }
  function fe(e, t) {
    return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
  }
  ce.fn = ce.prototype = {
    jquery: t,
    constructor: ce,
    length: 0,
    toArray: function () {
      return ae.call(this);
    },
    get: function (e) {
      return null == e ? ae.call(this) : e < 0 ? this[e + this.length] : this[e];
    },
    pushStack: function (e) {
      var t = ce.merge(this.constructor(), e);
      return t.prevObject = this, t;
    },
    each: function (e) {
      return ce.each(this, e);
    },
    map: function (n) {
      return this.pushStack(ce.map(this, function (e, t) {
        return n.call(e, t, e);
      }));
    },
    slice: function () {
      return this.pushStack(ae.apply(this, arguments));
    },
    first: function () {
      return this.eq(0);
    },
    last: function () {
      return this.eq(-1);
    },
    even: function () {
      return this.pushStack(ce.grep(this, function (e, t) {
        return (t + 1) % 2;
      }));
    },
    odd: function () {
      return this.pushStack(ce.grep(this, function (e, t) {
        return t % 2;
      }));
    },
    eq: function (e) {
      var t = this.length,
        n = +e + (e < 0 ? t : 0);
      return this.pushStack(0 <= n && n < t ? [this[n]] : []);
    },
    end: function () {
      return this.prevObject || this.constructor();
    },
    push: s,
    sort: oe.sort,
    splice: oe.splice
  }, ce.extend = ce.fn.extend = function () {
    var e,
      t,
      n,
      r,
      i,
      o,
      a = arguments[0] || {},
      s = 1,
      u = arguments.length,
      l = !1;
    for ("boolean" == typeof a && (l = a, a = arguments[s] || {}, s++), "object" == typeof a || v(a) || (a = {}), s === u && (a = this, s--); s < u; s++) if (null != (e = arguments[s])) for (t in e) r = e[t], "__proto__" !== t && a !== r && (l && r && (ce.isPlainObject(r) || (i = Array.isArray(r))) ? (n = a[t], o = i && !Array.isArray(n) ? [] : i || ce.isPlainObject(n) ? n : {}, i = !1, a[t] = ce.extend(l, o, r)) : void 0 !== r && (a[t] = r));
    return a;
  }, ce.extend({
    expando: "jQuery" + (t + Math.random()).replace(/\D/g, ""),
    isReady: !0,
    error: function (e) {
      throw new Error(e);
    },
    noop: function () {},
    isPlainObject: function (e) {
      var t, n;
      return !(!e || "[object Object]" !== i.call(e)) && (!(t = r(e)) || "function" == typeof (n = ue.call(t, "constructor") && t.constructor) && o.call(n) === a);
    },
    isEmptyObject: function (e) {
      var t;
      for (t in e) return !1;
      return !0;
    },
    globalEval: function (e, t, n) {
      m(e, {
        nonce: t && t.nonce
      }, n);
    },
    each: function (e, t) {
      var n,
        r = 0;
      if (c(e)) {
        for (n = e.length; r < n; r++) if (!1 === t.call(e[r], r, e[r])) break;
      } else for (r in e) if (!1 === t.call(e[r], r, e[r])) break;
      return e;
    },
    text: function (e) {
      var t,
        n = "",
        r = 0,
        i = e.nodeType;
      if (!i) while (t = e[r++]) n += ce.text(t);
      return 1 === i || 11 === i ? e.textContent : 9 === i ? e.documentElement.textContent : 3 === i || 4 === i ? e.nodeValue : n;
    },
    makeArray: function (e, t) {
      var n = t || [];
      return null != e && (c(Object(e)) ? ce.merge(n, "string" == typeof e ? [e] : e) : s.call(n, e)), n;
    },
    inArray: function (e, t, n) {
      return null == t ? -1 : se.call(t, e, n);
    },
    isXMLDoc: function (e) {
      var t = e && e.namespaceURI,
        n = e && (e.ownerDocument || e).documentElement;
      return !l.test(t || n && n.nodeName || "HTML");
    },
    merge: function (e, t) {
      for (var n = +t.length, r = 0, i = e.length; r < n; r++) e[i++] = t[r];
      return e.length = i, e;
    },
    grep: function (e, t, n) {
      for (var r = [], i = 0, o = e.length, a = !n; i < o; i++) !t(e[i], i) !== a && r.push(e[i]);
      return r;
    },
    map: function (e, t, n) {
      var r,
        i,
        o = 0,
        a = [];
      if (c(e)) for (r = e.length; o < r; o++) null != (i = t(e[o], o, n)) && a.push(i);else for (o in e) null != (i = t(e[o], o, n)) && a.push(i);
      return g(a);
    },
    guid: 1,
    support: le
  }), "function" == typeof Symbol && (ce.fn[Symbol.iterator] = oe[Symbol.iterator]), ce.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (e, t) {
    n["[object " + t + "]"] = t.toLowerCase();
  });
  var pe = oe.pop,
    de = oe.sort,
    he = oe.splice,
    ge = "[\\x20\\t\\r\\n\\f]",
    ve = new RegExp("^" + ge + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ge + "+$", "g");
  ce.contains = function (e, t) {
    var n = t && t.parentNode;
    return e === n || !(!n || 1 !== n.nodeType || !(e.contains ? e.contains(n) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(n)));
  };
  var f = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
  function p(e, t) {
    return t ? "\0" === e ? "\ufffd" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e;
  }
  ce.escapeSelector = function (e) {
    return (e + "").replace(f, p);
  };
  var ye = C,
    me = s;
  !function () {
    var e,
      b,
      w,
      o,
      a,
      T,
      r,
      C,
      d,
      i,
      k = me,
      S = ce.expando,
      E = 0,
      n = 0,
      s = W(),
      c = W(),
      u = W(),
      h = W(),
      l = function (e, t) {
        return e === t && (a = !0), 0;
      },
      f = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
      t = "(?:\\\\[\\da-fA-F]{1,6}" + ge + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
      p = "\\[" + ge + "*(" + t + ")(?:" + ge + "*([*^$|!~]?=)" + ge + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + t + "))|)" + ge + "*\\]",
      g = ":(" + t + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + p + ")*)|.*)\\)|)",
      v = new RegExp(ge + "+", "g"),
      y = new RegExp("^" + ge + "*," + ge + "*"),
      m = new RegExp("^" + ge + "*([>+~]|" + ge + ")" + ge + "*"),
      x = new RegExp(ge + "|>"),
      j = new RegExp(g),
      A = new RegExp("^" + t + "$"),
      D = {
        ID: new RegExp("^#(" + t + ")"),
        CLASS: new RegExp("^\\.(" + t + ")"),
        TAG: new RegExp("^(" + t + "|[*])"),
        ATTR: new RegExp("^" + p),
        PSEUDO: new RegExp("^" + g),
        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ge + "*(even|odd|(([+-]|)(\\d*)n|)" + ge + "*(?:([+-]|)" + ge + "*(\\d+)|))" + ge + "*\\)|)", "i"),
        bool: new RegExp("^(?:" + f + ")$", "i"),
        needsContext: new RegExp("^" + ge + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ge + "*((?:-\\d)?\\d*)" + ge + "*\\)|)(?=[^-]|$)", "i")
      },
      N = /^(?:input|select|textarea|button)$/i,
      q = /^h\d$/i,
      L = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      H = /[+~]/,
      O = new RegExp("\\\\[\\da-fA-F]{1,6}" + ge + "?|\\\\([^\\r\\n\\f])", "g"),
      P = function (e, t) {
        var n = "0x" + e.slice(1) - 65536;
        return t || (n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320));
      },
      M = function () {
        V();
      },
      R = J(function (e) {
        return !0 === e.disabled && fe(e, "fieldset");
      }, {
        dir: "parentNode",
        next: "legend"
      });
    try {
      k.apply(oe = ae.call(ye.childNodes), ye.childNodes), oe[ye.childNodes.length].nodeType;
    } catch (e) {
      k = {
        apply: function (e, t) {
          me.apply(e, ae.call(t));
        },
        call: function (e) {
          me.apply(e, ae.call(arguments, 1));
        }
      };
    }
    function I(t, e, n, r) {
      var i,
        o,
        a,
        s,
        u,
        l,
        c,
        f = e && e.ownerDocument,
        p = e ? e.nodeType : 9;
      if (n = n || [], "string" != typeof t || !t || 1 !== p && 9 !== p && 11 !== p) return n;
      if (!r && (V(e), e = e || T, C)) {
        if (11 !== p && (u = L.exec(t))) if (i = u[1]) {
          if (9 === p) {
            if (!(a = e.getElementById(i))) return n;
            if (a.id === i) return k.call(n, a), n;
          } else if (f && (a = f.getElementById(i)) && I.contains(e, a) && a.id === i) return k.call(n, a), n;
        } else {
          if (u[2]) return k.apply(n, e.getElementsByTagName(t)), n;
          if ((i = u[3]) && e.getElementsByClassName) return k.apply(n, e.getElementsByClassName(i)), n;
        }
        if (!(h[t + " "] || d && d.test(t))) {
          if (c = t, f = e, 1 === p && (x.test(t) || m.test(t))) {
            (f = H.test(t) && U(e.parentNode) || e) == e && le.scope || ((s = e.getAttribute("id")) ? s = ce.escapeSelector(s) : e.setAttribute("id", s = S)), o = (l = Y(t)).length;
            while (o--) l[o] = (s ? "#" + s : ":scope") + " " + Q(l[o]);
            c = l.join(",");
          }
          try {
            return k.apply(n, f.querySelectorAll(c)), n;
          } catch (e) {
            h(t, !0);
          } finally {
            s === S && e.removeAttribute("id");
          }
        }
      }
      return re(t.replace(ve, "$1"), e, n, r);
    }
    function W() {
      var r = [];
      return function e(t, n) {
        return r.push(t + " ") > b.cacheLength && delete e[r.shift()], e[t + " "] = n;
      };
    }
    function F(e) {
      return e[S] = !0, e;
    }
    function $(e) {
      var t = T.createElement("fieldset");
      try {
        return !!e(t);
      } catch (e) {
        return !1;
      } finally {
        t.parentNode && t.parentNode.removeChild(t), t = null;
      }
    }
    function B(t) {
      return function (e) {
        return fe(e, "input") && e.type === t;
      };
    }
    function _(t) {
      return function (e) {
        return (fe(e, "input") || fe(e, "button")) && e.type === t;
      };
    }
    function z(t) {
      return function (e) {
        return "form" in e ? e.parentNode && !1 === e.disabled ? "label" in e ? "label" in e.parentNode ? e.parentNode.disabled === t : e.disabled === t : e.isDisabled === t || e.isDisabled !== !t && R(e) === t : e.disabled === t : "label" in e && e.disabled === t;
      };
    }
    function X(a) {
      return F(function (o) {
        return o = +o, F(function (e, t) {
          var n,
            r = a([], e.length, o),
            i = r.length;
          while (i--) e[n = r[i]] && (e[n] = !(t[n] = e[n]));
        });
      });
    }
    function U(e) {
      return e && "undefined" != typeof e.getElementsByTagName && e;
    }
    function V(e) {
      var t,
        n = e ? e.ownerDocument || e : ye;
      return n != T && 9 === n.nodeType && n.documentElement && (r = (T = n).documentElement, C = !ce.isXMLDoc(T), i = r.matches || r.webkitMatchesSelector || r.msMatchesSelector, r.msMatchesSelector && ye != T && (t = T.defaultView) && t.top !== t && t.addEventListener("unload", M), le.getById = $(function (e) {
        return r.appendChild(e).id = ce.expando, !T.getElementsByName || !T.getElementsByName(ce.expando).length;
      }), le.disconnectedMatch = $(function (e) {
        return i.call(e, "*");
      }), le.scope = $(function () {
        return T.querySelectorAll(":scope");
      }), le.cssHas = $(function () {
        try {
          return T.querySelector(":has(*,:jqfake)"), !1;
        } catch (e) {
          return !0;
        }
      }), le.getById ? (b.filter.ID = function (e) {
        var t = e.replace(O, P);
        return function (e) {
          return e.getAttribute("id") === t;
        };
      }, b.find.ID = function (e, t) {
        if ("undefined" != typeof t.getElementById && C) {
          var n = t.getElementById(e);
          return n ? [n] : [];
        }
      }) : (b.filter.ID = function (e) {
        var n = e.replace(O, P);
        return function (e) {
          var t = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
          return t && t.value === n;
        };
      }, b.find.ID = function (e, t) {
        if ("undefined" != typeof t.getElementById && C) {
          var n,
            r,
            i,
            o = t.getElementById(e);
          if (o) {
            if ((n = o.getAttributeNode("id")) && n.value === e) return [o];
            i = t.getElementsByName(e), r = 0;
            while (o = i[r++]) if ((n = o.getAttributeNode("id")) && n.value === e) return [o];
          }
          return [];
        }
      }), b.find.TAG = function (e, t) {
        return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : t.querySelectorAll(e);
      }, b.find.CLASS = function (e, t) {
        if ("undefined" != typeof t.getElementsByClassName && C) return t.getElementsByClassName(e);
      }, d = [], $(function (e) {
        var t;
        r.appendChild(e).innerHTML = "<a id='" + S + "' href='' disabled='disabled'></a><select id='" + S + "-\r\\' disabled='disabled'><option selected=''></option></select>", e.querySelectorAll("[selected]").length || d.push("\\[" + ge + "*(?:value|" + f + ")"), e.querySelectorAll("[id~=" + S + "-]").length || d.push("~="), e.querySelectorAll("a#" + S + "+*").length || d.push(".#.+[+~]"), e.querySelectorAll(":checked").length || d.push(":checked"), (t = T.createElement("input")).setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), r.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && d.push(":enabled", ":disabled"), (t = T.createElement("input")).setAttribute("name", ""), e.appendChild(t), e.querySelectorAll("[name='']").length || d.push("\\[" + ge + "*name" + ge + "*=" + ge + "*(?:''|\"\")");
      }), le.cssHas || d.push(":has"), d = d.length && new RegExp(d.join("|")), l = function (e, t) {
        if (e === t) return a = !0, 0;
        var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
        return n || (1 & (n = (e.ownerDocument || e) == (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !le.sortDetached && t.compareDocumentPosition(e) === n ? e === T || e.ownerDocument == ye && I.contains(ye, e) ? -1 : t === T || t.ownerDocument == ye && I.contains(ye, t) ? 1 : o ? se.call(o, e) - se.call(o, t) : 0 : 4 & n ? -1 : 1);
      }), T;
    }
    for (e in I.matches = function (e, t) {
      return I(e, null, null, t);
    }, I.matchesSelector = function (e, t) {
      if (V(e), C && !h[t + " "] && (!d || !d.test(t))) try {
        var n = i.call(e, t);
        if (n || le.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n;
      } catch (e) {
        h(t, !0);
      }
      return 0 < I(t, T, null, [e]).length;
    }, I.contains = function (e, t) {
      return (e.ownerDocument || e) != T && V(e), ce.contains(e, t);
    }, I.attr = function (e, t) {
      (e.ownerDocument || e) != T && V(e);
      var n = b.attrHandle[t.toLowerCase()],
        r = n && ue.call(b.attrHandle, t.toLowerCase()) ? n(e, t, !C) : void 0;
      return void 0 !== r ? r : e.getAttribute(t);
    }, I.error = function (e) {
      throw new Error("Syntax error, unrecognized expression: " + e);
    }, ce.uniqueSort = function (e) {
      var t,
        n = [],
        r = 0,
        i = 0;
      if (a = !le.sortStable, o = !le.sortStable && ae.call(e, 0), de.call(e, l), a) {
        while (t = e[i++]) t === e[i] && (r = n.push(i));
        while (r--) he.call(e, n[r], 1);
      }
      return o = null, e;
    }, ce.fn.uniqueSort = function () {
      return this.pushStack(ce.uniqueSort(ae.apply(this)));
    }, (b = ce.expr = {
      cacheLength: 50,
      createPseudo: F,
      match: D,
      attrHandle: {},
      find: {},
      relative: {
        ">": {
          dir: "parentNode",
          first: !0
        },
        " ": {
          dir: "parentNode"
        },
        "+": {
          dir: "previousSibling",
          first: !0
        },
        "~": {
          dir: "previousSibling"
        }
      },
      preFilter: {
        ATTR: function (e) {
          return e[1] = e[1].replace(O, P), e[3] = (e[3] || e[4] || e[5] || "").replace(O, P), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4);
        },
        CHILD: function (e) {
          return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || I.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && I.error(e[0]), e;
        },
        PSEUDO: function (e) {
          var t,
            n = !e[6] && e[2];
          return D.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && j.test(n) && (t = Y(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3));
        }
      },
      filter: {
        TAG: function (e) {
          var t = e.replace(O, P).toLowerCase();
          return "*" === e ? function () {
            return !0;
          } : function (e) {
            return fe(e, t);
          };
        },
        CLASS: function (e) {
          var t = s[e + " "];
          return t || (t = new RegExp("(^|" + ge + ")" + e + "(" + ge + "|$)")) && s(e, function (e) {
            return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "");
          });
        },
        ATTR: function (n, r, i) {
          return function (e) {
            var t = I.attr(e, n);
            return null == t ? "!=" === r : !r || (t += "", "=" === r ? t === i : "!=" === r ? t !== i : "^=" === r ? i && 0 === t.indexOf(i) : "*=" === r ? i && -1 < t.indexOf(i) : "$=" === r ? i && t.slice(-i.length) === i : "~=" === r ? -1 < (" " + t.replace(v, " ") + " ").indexOf(i) : "|=" === r && (t === i || t.slice(0, i.length + 1) === i + "-"));
          };
        },
        CHILD: function (d, e, t, h, g) {
          var v = "nth" !== d.slice(0, 3),
            y = "last" !== d.slice(-4),
            m = "of-type" === e;
          return 1 === h && 0 === g ? function (e) {
            return !!e.parentNode;
          } : function (e, t, n) {
            var r,
              i,
              o,
              a,
              s,
              u = v !== y ? "nextSibling" : "previousSibling",
              l = e.parentNode,
              c = m && e.nodeName.toLowerCase(),
              f = !n && !m,
              p = !1;
            if (l) {
              if (v) {
                while (u) {
                  o = e;
                  while (o = o[u]) if (m ? fe(o, c) : 1 === o.nodeType) return !1;
                  s = u = "only" === d && !s && "nextSibling";
                }
                return !0;
              }
              if (s = [y ? l.firstChild : l.lastChild], y && f) {
                p = (a = (r = (i = l[S] || (l[S] = {}))[d] || [])[0] === E && r[1]) && r[2], o = a && l.childNodes[a];
                while (o = ++a && o && o[u] || (p = a = 0) || s.pop()) if (1 === o.nodeType && ++p && o === e) {
                  i[d] = [E, a, p];
                  break;
                }
              } else if (f && (p = a = (r = (i = e[S] || (e[S] = {}))[d] || [])[0] === E && r[1]), !1 === p) while (o = ++a && o && o[u] || (p = a = 0) || s.pop()) if ((m ? fe(o, c) : 1 === o.nodeType) && ++p && (f && ((i = o[S] || (o[S] = {}))[d] = [E, p]), o === e)) break;
              return (p -= g) === h || p % h == 0 && 0 <= p / h;
            }
          };
        },
        PSEUDO: function (e, o) {
          var t,
            a = b.pseudos[e] || b.setFilters[e.toLowerCase()] || I.error("unsupported pseudo: " + e);
          return a[S] ? a(o) : 1 < a.length ? (t = [e, e, "", o], b.setFilters.hasOwnProperty(e.toLowerCase()) ? F(function (e, t) {
            var n,
              r = a(e, o),
              i = r.length;
            while (i--) e[n = se.call(e, r[i])] = !(t[n] = r[i]);
          }) : function (e) {
            return a(e, 0, t);
          }) : a;
        }
      },
      pseudos: {
        not: F(function (e) {
          var r = [],
            i = [],
            s = ne(e.replace(ve, "$1"));
          return s[S] ? F(function (e, t, n, r) {
            var i,
              o = s(e, null, r, []),
              a = e.length;
            while (a--) (i = o[a]) && (e[a] = !(t[a] = i));
          }) : function (e, t, n) {
            return r[0] = e, s(r, null, n, i), r[0] = null, !i.pop();
          };
        }),
        has: F(function (t) {
          return function (e) {
            return 0 < I(t, e).length;
          };
        }),
        contains: F(function (t) {
          return t = t.replace(O, P), function (e) {
            return -1 < (e.textContent || ce.text(e)).indexOf(t);
          };
        }),
        lang: F(function (n) {
          return A.test(n || "") || I.error("unsupported lang: " + n), n = n.replace(O, P).toLowerCase(), function (e) {
            var t;
            do {
              if (t = C ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (t = t.toLowerCase()) === n || 0 === t.indexOf(n + "-");
            } while ((e = e.parentNode) && 1 === e.nodeType);
            return !1;
          };
        }),
        target: function (e) {
          var t = ie.location && ie.location.hash;
          return t && t.slice(1) === e.id;
        },
        root: function (e) {
          return e === r;
        },
        focus: function (e) {
          return e === function () {
            try {
              return T.activeElement;
            } catch (e) {}
          }() && T.hasFocus() && !!(e.type || e.href || ~e.tabIndex);
        },
        enabled: z(!1),
        disabled: z(!0),
        checked: function (e) {
          return fe(e, "input") && !!e.checked || fe(e, "option") && !!e.selected;
        },
        selected: function (e) {
          return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected;
        },
        empty: function (e) {
          for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeType < 6) return !1;
          return !0;
        },
        parent: function (e) {
          return !b.pseudos.empty(e);
        },
        header: function (e) {
          return q.test(e.nodeName);
        },
        input: function (e) {
          return N.test(e.nodeName);
        },
        button: function (e) {
          return fe(e, "input") && "button" === e.type || fe(e, "button");
        },
        text: function (e) {
          var t;
          return fe(e, "input") && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase());
        },
        first: X(function () {
          return [0];
        }),
        last: X(function (e, t) {
          return [t - 1];
        }),
        eq: X(function (e, t, n) {
          return [n < 0 ? n + t : n];
        }),
        even: X(function (e, t) {
          for (var n = 0; n < t; n += 2) e.push(n);
          return e;
        }),
        odd: X(function (e, t) {
          for (var n = 1; n < t; n += 2) e.push(n);
          return e;
        }),
        lt: X(function (e, t, n) {
          var r;
          for (r = n < 0 ? n + t : t < n ? t : n; 0 <= --r;) e.push(r);
          return e;
        }),
        gt: X(function (e, t, n) {
          for (var r = n < 0 ? n + t : n; ++r < t;) e.push(r);
          return e;
        })
      }
    }).pseudos.nth = b.pseudos.eq, {
      radio: !0,
      checkbox: !0,
      file: !0,
      password: !0,
      image: !0
    }) b.pseudos[e] = B(e);
    for (e in {
      submit: !0,
      reset: !0
    }) b.pseudos[e] = _(e);
    function G() {}
    function Y(e, t) {
      var n,
        r,
        i,
        o,
        a,
        s,
        u,
        l = c[e + " "];
      if (l) return t ? 0 : l.slice(0);
      a = e, s = [], u = b.preFilter;
      while (a) {
        for (o in n && !(r = y.exec(a)) || (r && (a = a.slice(r[0].length) || a), s.push(i = [])), n = !1, (r = m.exec(a)) && (n = r.shift(), i.push({
          value: n,
          type: r[0].replace(ve, " ")
        }), a = a.slice(n.length)), b.filter) !(r = D[o].exec(a)) || u[o] && !(r = u[o](r)) || (n = r.shift(), i.push({
          value: n,
          type: o,
          matches: r
        }), a = a.slice(n.length));
        if (!n) break;
      }
      return t ? a.length : a ? I.error(e) : c(e, s).slice(0);
    }
    function Q(e) {
      for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
      return r;
    }
    function J(a, e, t) {
      var s = e.dir,
        u = e.next,
        l = u || s,
        c = t && "parentNode" === l,
        f = n++;
      return e.first ? function (e, t, n) {
        while (e = e[s]) if (1 === e.nodeType || c) return a(e, t, n);
        return !1;
      } : function (e, t, n) {
        var r,
          i,
          o = [E, f];
        if (n) {
          while (e = e[s]) if ((1 === e.nodeType || c) && a(e, t, n)) return !0;
        } else while (e = e[s]) if (1 === e.nodeType || c) if (i = e[S] || (e[S] = {}), u && fe(e, u)) e = e[s] || e;else {
          if ((r = i[l]) && r[0] === E && r[1] === f) return o[2] = r[2];
          if ((i[l] = o)[2] = a(e, t, n)) return !0;
        }
        return !1;
      };
    }
    function K(i) {
      return 1 < i.length ? function (e, t, n) {
        var r = i.length;
        while (r--) if (!i[r](e, t, n)) return !1;
        return !0;
      } : i[0];
    }
    function Z(e, t, n, r, i) {
      for (var o, a = [], s = 0, u = e.length, l = null != t; s < u; s++) (o = e[s]) && (n && !n(o, r, i) || (a.push(o), l && t.push(s)));
      return a;
    }
    function ee(d, h, g, v, y, e) {
      return v && !v[S] && (v = ee(v)), y && !y[S] && (y = ee(y, e)), F(function (e, t, n, r) {
        var i,
          o,
          a,
          s,
          u = [],
          l = [],
          c = t.length,
          f = e || function (e, t, n) {
            for (var r = 0, i = t.length; r < i; r++) I(e, t[r], n);
            return n;
          }(h || "*", n.nodeType ? [n] : n, []),
          p = !d || !e && h ? f : Z(f, u, d, n, r);
        if (g ? g(p, s = y || (e ? d : c || v) ? [] : t, n, r) : s = p, v) {
          i = Z(s, l), v(i, [], n, r), o = i.length;
          while (o--) (a = i[o]) && (s[l[o]] = !(p[l[o]] = a));
        }
        if (e) {
          if (y || d) {
            if (y) {
              i = [], o = s.length;
              while (o--) (a = s[o]) && i.push(p[o] = a);
              y(null, s = [], i, r);
            }
            o = s.length;
            while (o--) (a = s[o]) && -1 < (i = y ? se.call(e, a) : u[o]) && (e[i] = !(t[i] = a));
          }
        } else s = Z(s === t ? s.splice(c, s.length) : s), y ? y(null, t, s, r) : k.apply(t, s);
      });
    }
    function te(e) {
      for (var i, t, n, r = e.length, o = b.relative[e[0].type], a = o || b.relative[" "], s = o ? 1 : 0, u = J(function (e) {
          return e === i;
        }, a, !0), l = J(function (e) {
          return -1 < se.call(i, e);
        }, a, !0), c = [function (e, t, n) {
          var r = !o && (n || t != w) || ((i = t).nodeType ? u(e, t, n) : l(e, t, n));
          return i = null, r;
        }]; s < r; s++) if (t = b.relative[e[s].type]) c = [J(K(c), t)];else {
        if ((t = b.filter[e[s].type].apply(null, e[s].matches))[S]) {
          for (n = ++s; n < r; n++) if (b.relative[e[n].type]) break;
          return ee(1 < s && K(c), 1 < s && Q(e.slice(0, s - 1).concat({
            value: " " === e[s - 2].type ? "*" : ""
          })).replace(ve, "$1"), t, s < n && te(e.slice(s, n)), n < r && te(e = e.slice(n)), n < r && Q(e));
        }
        c.push(t);
      }
      return K(c);
    }
    function ne(e, t) {
      var n,
        v,
        y,
        m,
        x,
        r,
        i = [],
        o = [],
        a = u[e + " "];
      if (!a) {
        t || (t = Y(e)), n = t.length;
        while (n--) (a = te(t[n]))[S] ? i.push(a) : o.push(a);
        (a = u(e, (v = o, m = 0 < (y = i).length, x = 0 < v.length, r = function (e, t, n, r, i) {
          var o,
            a,
            s,
            u = 0,
            l = "0",
            c = e && [],
            f = [],
            p = w,
            d = e || x && b.find.TAG("*", i),
            h = E += null == p ? 1 : Math.random() || .1,
            g = d.length;
          for (i && (w = t == T || t || i); l !== g && null != (o = d[l]); l++) {
            if (x && o) {
              a = 0, t || o.ownerDocument == T || (V(o), n = !C);
              while (s = v[a++]) if (s(o, t || T, n)) {
                k.call(r, o);
                break;
              }
              i && (E = h);
            }
            m && ((o = !s && o) && u--, e && c.push(o));
          }
          if (u += l, m && l !== u) {
            a = 0;
            while (s = y[a++]) s(c, f, t, n);
            if (e) {
              if (0 < u) while (l--) c[l] || f[l] || (f[l] = pe.call(r));
              f = Z(f);
            }
            k.apply(r, f), i && !e && 0 < f.length && 1 < u + y.length && ce.uniqueSort(r);
          }
          return i && (E = h, w = p), c;
        }, m ? F(r) : r))).selector = e;
      }
      return a;
    }
    function re(e, t, n, r) {
      var i,
        o,
        a,
        s,
        u,
        l = "function" == typeof e && e,
        c = !r && Y(e = l.selector || e);
      if (n = n || [], 1 === c.length) {
        if (2 < (o = c[0] = c[0].slice(0)).length && "ID" === (a = o[0]).type && 9 === t.nodeType && C && b.relative[o[1].type]) {
          if (!(t = (b.find.ID(a.matches[0].replace(O, P), t) || [])[0])) return n;
          l && (t = t.parentNode), e = e.slice(o.shift().value.length);
        }
        i = D.needsContext.test(e) ? 0 : o.length;
        while (i--) {
          if (a = o[i], b.relative[s = a.type]) break;
          if ((u = b.find[s]) && (r = u(a.matches[0].replace(O, P), H.test(o[0].type) && U(t.parentNode) || t))) {
            if (o.splice(i, 1), !(e = r.length && Q(o))) return k.apply(n, r), n;
            break;
          }
        }
      }
      return (l || ne(e, c))(r, t, !C, n, !t || H.test(e) && U(t.parentNode) || t), n;
    }
    G.prototype = b.filters = b.pseudos, b.setFilters = new G(), le.sortStable = S.split("").sort(l).join("") === S, V(), le.sortDetached = $(function (e) {
      return 1 & e.compareDocumentPosition(T.createElement("fieldset"));
    }), ce.find = I, ce.expr[":"] = ce.expr.pseudos, ce.unique = ce.uniqueSort, I.compile = ne, I.select = re, I.setDocument = V, I.tokenize = Y, I.escape = ce.escapeSelector, I.getText = ce.text, I.isXML = ce.isXMLDoc, I.selectors = ce.expr, I.support = ce.support, I.uniqueSort = ce.uniqueSort;
  }();
  var d = function (e, t, n) {
      var r = [],
        i = void 0 !== n;
      while ((e = e[t]) && 9 !== e.nodeType) if (1 === e.nodeType) {
        if (i && ce(e).is(n)) break;
        r.push(e);
      }
      return r;
    },
    h = function (e, t) {
      for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
      return n;
    },
    b = ce.expr.match.needsContext,
    w = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
  function T(e, n, r) {
    return v(n) ? ce.grep(e, function (e, t) {
      return !!n.call(e, t, e) !== r;
    }) : n.nodeType ? ce.grep(e, function (e) {
      return e === n !== r;
    }) : "string" != typeof n ? ce.grep(e, function (e) {
      return -1 < se.call(n, e) !== r;
    }) : ce.filter(n, e, r);
  }
  ce.filter = function (e, t, n) {
    var r = t[0];
    return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? ce.find.matchesSelector(r, e) ? [r] : [] : ce.find.matches(e, ce.grep(t, function (e) {
      return 1 === e.nodeType;
    }));
  }, ce.fn.extend({
    find: function (e) {
      var t,
        n,
        r = this.length,
        i = this;
      if ("string" != typeof e) return this.pushStack(ce(e).filter(function () {
        for (t = 0; t < r; t++) if (ce.contains(i[t], this)) return !0;
      }));
      for (n = this.pushStack([]), t = 0; t < r; t++) ce.find(e, i[t], n);
      return 1 < r ? ce.uniqueSort(n) : n;
    },
    filter: function (e) {
      return this.pushStack(T(this, e || [], !1));
    },
    not: function (e) {
      return this.pushStack(T(this, e || [], !0));
    },
    is: function (e) {
      return !!T(this, "string" == typeof e && b.test(e) ? ce(e) : e || [], !1).length;
    }
  });
  var k,
    S = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
  (ce.fn.init = function (e, t, n) {
    var r, i;
    if (!e) return this;
    if (n = n || k, "string" == typeof e) {
      if (!(r = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [null, e, null] : S.exec(e)) || !r[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
      if (r[1]) {
        if (t = t instanceof ce ? t[0] : t, ce.merge(this, ce.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : C, !0)), w.test(r[1]) && ce.isPlainObject(t)) for (r in t) v(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
        return this;
      }
      return (i = C.getElementById(r[2])) && (this[0] = i, this.length = 1), this;
    }
    return e.nodeType ? (this[0] = e, this.length = 1, this) : v(e) ? void 0 !== n.ready ? n.ready(e) : e(ce) : ce.makeArray(e, this);
  }).prototype = ce.fn, k = ce(C);
  var E = /^(?:parents|prev(?:Until|All))/,
    j = {
      children: !0,
      contents: !0,
      next: !0,
      prev: !0
    };
  function A(e, t) {
    while ((e = e[t]) && 1 !== e.nodeType);
    return e;
  }
  ce.fn.extend({
    has: function (e) {
      var t = ce(e, this),
        n = t.length;
      return this.filter(function () {
        for (var e = 0; e < n; e++) if (ce.contains(this, t[e])) return !0;
      });
    },
    closest: function (e, t) {
      var n,
        r = 0,
        i = this.length,
        o = [],
        a = "string" != typeof e && ce(e);
      if (!b.test(e)) for (; r < i; r++) for (n = this[r]; n && n !== t; n = n.parentNode) if (n.nodeType < 11 && (a ? -1 < a.index(n) : 1 === n.nodeType && ce.find.matchesSelector(n, e))) {
        o.push(n);
        break;
      }
      return this.pushStack(1 < o.length ? ce.uniqueSort(o) : o);
    },
    index: function (e) {
      return e ? "string" == typeof e ? se.call(ce(e), this[0]) : se.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
    },
    add: function (e, t) {
      return this.pushStack(ce.uniqueSort(ce.merge(this.get(), ce(e, t))));
    },
    addBack: function (e) {
      return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
    }
  }), ce.each({
    parent: function (e) {
      var t = e.parentNode;
      return t && 11 !== t.nodeType ? t : null;
    },
    parents: function (e) {
      return d(e, "parentNode");
    },
    parentsUntil: function (e, t, n) {
      return d(e, "parentNode", n);
    },
    next: function (e) {
      return A(e, "nextSibling");
    },
    prev: function (e) {
      return A(e, "previousSibling");
    },
    nextAll: function (e) {
      return d(e, "nextSibling");
    },
    prevAll: function (e) {
      return d(e, "previousSibling");
    },
    nextUntil: function (e, t, n) {
      return d(e, "nextSibling", n);
    },
    prevUntil: function (e, t, n) {
      return d(e, "previousSibling", n);
    },
    siblings: function (e) {
      return h((e.parentNode || {}).firstChild, e);
    },
    children: function (e) {
      return h(e.firstChild);
    },
    contents: function (e) {
      return null != e.contentDocument && r(e.contentDocument) ? e.contentDocument : (fe(e, "template") && (e = e.content || e), ce.merge([], e.childNodes));
    }
  }, function (r, i) {
    ce.fn[r] = function (e, t) {
      var n = ce.map(this, i, e);
      return "Until" !== r.slice(-5) && (t = e), t && "string" == typeof t && (n = ce.filter(t, n)), 1 < this.length && (j[r] || ce.uniqueSort(n), E.test(r) && n.reverse()), this.pushStack(n);
    };
  });
  var D = /[^\x20\t\r\n\f]+/g;
  function N(e) {
    return e;
  }
  function q(e) {
    throw e;
  }
  function L(e, t, n, r) {
    var i;
    try {
      e && v(i = e.promise) ? i.call(e).done(t).fail(n) : e && v(i = e.then) ? i.call(e, t, n) : t.apply(void 0, [e].slice(r));
    } catch (e) {
      n.apply(void 0, [e]);
    }
  }
  ce.Callbacks = function (r) {
    var e, n;
    r = "string" == typeof r ? (e = r, n = {}, ce.each(e.match(D) || [], function (e, t) {
      n[t] = !0;
    }), n) : ce.extend({}, r);
    var i,
      t,
      o,
      a,
      s = [],
      u = [],
      l = -1,
      c = function () {
        for (a = a || r.once, o = i = !0; u.length; l = -1) {
          t = u.shift();
          while (++l < s.length) !1 === s[l].apply(t[0], t[1]) && r.stopOnFalse && (l = s.length, t = !1);
        }
        r.memory || (t = !1), i = !1, a && (s = t ? [] : "");
      },
      f = {
        add: function () {
          return s && (t && !i && (l = s.length - 1, u.push(t)), function n(e) {
            ce.each(e, function (e, t) {
              v(t) ? r.unique && f.has(t) || s.push(t) : t && t.length && "string" !== x(t) && n(t);
            });
          }(arguments), t && !i && c()), this;
        },
        remove: function () {
          return ce.each(arguments, function (e, t) {
            var n;
            while (-1 < (n = ce.inArray(t, s, n))) s.splice(n, 1), n <= l && l--;
          }), this;
        },
        has: function (e) {
          return e ? -1 < ce.inArray(e, s) : 0 < s.length;
        },
        empty: function () {
          return s && (s = []), this;
        },
        disable: function () {
          return a = u = [], s = t = "", this;
        },
        disabled: function () {
          return !s;
        },
        lock: function () {
          return a = u = [], t || i || (s = t = ""), this;
        },
        locked: function () {
          return !!a;
        },
        fireWith: function (e, t) {
          return a || (t = [e, (t = t || []).slice ? t.slice() : t], u.push(t), i || c()), this;
        },
        fire: function () {
          return f.fireWith(this, arguments), this;
        },
        fired: function () {
          return !!o;
        }
      };
    return f;
  }, ce.extend({
    Deferred: function (e) {
      var o = [["notify", "progress", ce.Callbacks("memory"), ce.Callbacks("memory"), 2], ["resolve", "done", ce.Callbacks("once memory"), ce.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", ce.Callbacks("once memory"), ce.Callbacks("once memory"), 1, "rejected"]],
        i = "pending",
        a = {
          state: function () {
            return i;
          },
          always: function () {
            return s.done(arguments).fail(arguments), this;
          },
          "catch": function (e) {
            return a.then(null, e);
          },
          pipe: function () {
            var i = arguments;
            return ce.Deferred(function (r) {
              ce.each(o, function (e, t) {
                var n = v(i[t[4]]) && i[t[4]];
                s[t[1]](function () {
                  var e = n && n.apply(this, arguments);
                  e && v(e.promise) ? e.promise().progress(r.notify).done(r.resolve).fail(r.reject) : r[t[0] + "With"](this, n ? [e] : arguments);
                });
              }), i = null;
            }).promise();
          },
          then: function (t, n, r) {
            var u = 0;
            function l(i, o, a, s) {
              return function () {
                var n = this,
                  r = arguments,
                  e = function () {
                    var e, t;
                    if (!(i < u)) {
                      if ((e = a.apply(n, r)) === o.promise()) throw new TypeError("Thenable self-resolution");
                      t = e && ("object" == typeof e || "function" == typeof e) && e.then, v(t) ? s ? t.call(e, l(u, o, N, s), l(u, o, q, s)) : (u++, t.call(e, l(u, o, N, s), l(u, o, q, s), l(u, o, N, o.notifyWith))) : (a !== N && (n = void 0, r = [e]), (s || o.resolveWith)(n, r));
                    }
                  },
                  t = s ? e : function () {
                    try {
                      e();
                    } catch (e) {
                      ce.Deferred.exceptionHook && ce.Deferred.exceptionHook(e, t.error), u <= i + 1 && (a !== q && (n = void 0, r = [e]), o.rejectWith(n, r));
                    }
                  };
                i ? t() : (ce.Deferred.getErrorHook ? t.error = ce.Deferred.getErrorHook() : ce.Deferred.getStackHook && (t.error = ce.Deferred.getStackHook()), ie.setTimeout(t));
              };
            }
            return ce.Deferred(function (e) {
              o[0][3].add(l(0, e, v(r) ? r : N, e.notifyWith)), o[1][3].add(l(0, e, v(t) ? t : N)), o[2][3].add(l(0, e, v(n) ? n : q));
            }).promise();
          },
          promise: function (e) {
            return null != e ? ce.extend(e, a) : a;
          }
        },
        s = {};
      return ce.each(o, function (e, t) {
        var n = t[2],
          r = t[5];
        a[t[1]] = n.add, r && n.add(function () {
          i = r;
        }, o[3 - e][2].disable, o[3 - e][3].disable, o[0][2].lock, o[0][3].lock), n.add(t[3].fire), s[t[0]] = function () {
          return s[t[0] + "With"](this === s ? void 0 : this, arguments), this;
        }, s[t[0] + "With"] = n.fireWith;
      }), a.promise(s), e && e.call(s, s), s;
    },
    when: function (e) {
      var n = arguments.length,
        t = n,
        r = Array(t),
        i = ae.call(arguments),
        o = ce.Deferred(),
        a = function (t) {
          return function (e) {
            r[t] = this, i[t] = 1 < arguments.length ? ae.call(arguments) : e, --n || o.resolveWith(r, i);
          };
        };
      if (n <= 1 && (L(e, o.done(a(t)).resolve, o.reject, !n), "pending" === o.state() || v(i[t] && i[t].then))) return o.then();
      while (t--) L(i[t], a(t), o.reject);
      return o.promise();
    }
  });
  var H = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
  ce.Deferred.exceptionHook = function (e, t) {
    ie.console && ie.console.warn && e && H.test(e.name) && ie.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t);
  }, ce.readyException = function (e) {
    ie.setTimeout(function () {
      throw e;
    });
  };
  var O = ce.Deferred();
  function P() {
    C.removeEventListener("DOMContentLoaded", P), ie.removeEventListener("load", P), ce.ready();
  }
  ce.fn.ready = function (e) {
    return O.then(e)["catch"](function (e) {
      ce.readyException(e);
    }), this;
  }, ce.extend({
    isReady: !1,
    readyWait: 1,
    ready: function (e) {
      (!0 === e ? --ce.readyWait : ce.isReady) || (ce.isReady = !0) !== e && 0 < --ce.readyWait || O.resolveWith(C, [ce]);
    }
  }), ce.ready.then = O.then, "complete" === C.readyState || "loading" !== C.readyState && !C.documentElement.doScroll ? ie.setTimeout(ce.ready) : (C.addEventListener("DOMContentLoaded", P), ie.addEventListener("load", P));
  var M = function (e, t, n, r, i, o, a) {
      var s = 0,
        u = e.length,
        l = null == n;
      if ("object" === x(n)) for (s in i = !0, n) M(e, t, s, n[s], !0, o, a);else if (void 0 !== r && (i = !0, v(r) || (a = !0), l && (a ? (t.call(e, r), t = null) : (l = t, t = function (e, t, n) {
        return l.call(ce(e), n);
      })), t)) for (; s < u; s++) t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
      return i ? e : l ? t.call(e) : u ? t(e[0], n) : o;
    },
    R = /^-ms-/,
    I = /-([a-z])/g;
  function W(e, t) {
    return t.toUpperCase();
  }
  function F(e) {
    return e.replace(R, "ms-").replace(I, W);
  }
  var $ = function (e) {
    return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
  };
  function B() {
    this.expando = ce.expando + B.uid++;
  }
  B.uid = 1, B.prototype = {
    cache: function (e) {
      var t = e[this.expando];
      return t || (t = {}, $(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
        value: t,
        configurable: !0
      }))), t;
    },
    set: function (e, t, n) {
      var r,
        i = this.cache(e);
      if ("string" == typeof t) i[F(t)] = n;else for (r in t) i[F(r)] = t[r];
      return i;
    },
    get: function (e, t) {
      return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][F(t)];
    },
    access: function (e, t, n) {
      return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t);
    },
    remove: function (e, t) {
      var n,
        r = e[this.expando];
      if (void 0 !== r) {
        if (void 0 !== t) {
          n = (t = Array.isArray(t) ? t.map(F) : (t = F(t)) in r ? [t] : t.match(D) || []).length;
          while (n--) delete r[t[n]];
        }
        (void 0 === t || ce.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando]);
      }
    },
    hasData: function (e) {
      var t = e[this.expando];
      return void 0 !== t && !ce.isEmptyObject(t);
    }
  };
  var _ = new B(),
    z = new B(),
    X = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    U = /[A-Z]/g;
  function V(e, t, n) {
    var r, i;
    if (void 0 === n && 1 === e.nodeType) if (r = "data-" + t.replace(U, "-$&").toLowerCase(), "string" == typeof (n = e.getAttribute(r))) {
      try {
        n = "true" === (i = n) || "false" !== i && ("null" === i ? null : i === +i + "" ? +i : X.test(i) ? JSON.parse(i) : i);
      } catch (e) {}
      z.set(e, t, n);
    } else n = void 0;
    return n;
  }
  ce.extend({
    hasData: function (e) {
      return z.hasData(e) || _.hasData(e);
    },
    data: function (e, t, n) {
      return z.access(e, t, n);
    },
    removeData: function (e, t) {
      z.remove(e, t);
    },
    _data: function (e, t, n) {
      return _.access(e, t, n);
    },
    _removeData: function (e, t) {
      _.remove(e, t);
    }
  }), ce.fn.extend({
    data: function (n, e) {
      var t,
        r,
        i,
        o = this[0],
        a = o && o.attributes;
      if (void 0 === n) {
        if (this.length && (i = z.get(o), 1 === o.nodeType && !_.get(o, "hasDataAttrs"))) {
          t = a.length;
          while (t--) a[t] && 0 === (r = a[t].name).indexOf("data-") && (r = F(r.slice(5)), V(o, r, i[r]));
          _.set(o, "hasDataAttrs", !0);
        }
        return i;
      }
      return "object" == typeof n ? this.each(function () {
        z.set(this, n);
      }) : M(this, function (e) {
        var t;
        if (o && void 0 === e) return void 0 !== (t = z.get(o, n)) ? t : void 0 !== (t = V(o, n)) ? t : void 0;
        this.each(function () {
          z.set(this, n, e);
        });
      }, null, e, 1 < arguments.length, null, !0);
    },
    removeData: function (e) {
      return this.each(function () {
        z.remove(this, e);
      });
    }
  }), ce.extend({
    queue: function (e, t, n) {
      var r;
      if (e) return t = (t || "fx") + "queue", r = _.get(e, t), n && (!r || Array.isArray(n) ? r = _.access(e, t, ce.makeArray(n)) : r.push(n)), r || [];
    },
    dequeue: function (e, t) {
      t = t || "fx";
      var n = ce.queue(e, t),
        r = n.length,
        i = n.shift(),
        o = ce._queueHooks(e, t);
      "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, function () {
        ce.dequeue(e, t);
      }, o)), !r && o && o.empty.fire();
    },
    _queueHooks: function (e, t) {
      var n = t + "queueHooks";
      return _.get(e, n) || _.access(e, n, {
        empty: ce.Callbacks("once memory").add(function () {
          _.remove(e, [t + "queue", n]);
        })
      });
    }
  }), ce.fn.extend({
    queue: function (t, n) {
      var e = 2;
      return "string" != typeof t && (n = t, t = "fx", e--), arguments.length < e ? ce.queue(this[0], t) : void 0 === n ? this : this.each(function () {
        var e = ce.queue(this, t, n);
        ce._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && ce.dequeue(this, t);
      });
    },
    dequeue: function (e) {
      return this.each(function () {
        ce.dequeue(this, e);
      });
    },
    clearQueue: function (e) {
      return this.queue(e || "fx", []);
    },
    promise: function (e, t) {
      var n,
        r = 1,
        i = ce.Deferred(),
        o = this,
        a = this.length,
        s = function () {
          --r || i.resolveWith(o, [o]);
        };
      "string" != typeof e && (t = e, e = void 0), e = e || "fx";
      while (a--) (n = _.get(o[a], e + "queueHooks")) && n.empty && (r++, n.empty.add(s));
      return s(), i.promise(t);
    }
  });
  var G = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    Y = new RegExp("^(?:([+-])=|)(" + G + ")([a-z%]*)$", "i"),
    Q = ["Top", "Right", "Bottom", "Left"],
    J = C.documentElement,
    K = function (e) {
      return ce.contains(e.ownerDocument, e);
    },
    Z = {
      composed: !0
    };
  J.getRootNode && (K = function (e) {
    return ce.contains(e.ownerDocument, e) || e.getRootNode(Z) === e.ownerDocument;
  });
  var ee = function (e, t) {
    return "none" === (e = t || e).style.display || "" === e.style.display && K(e) && "none" === ce.css(e, "display");
  };
  function te(e, t, n, r) {
    var i,
      o,
      a = 20,
      s = r ? function () {
        return r.cur();
      } : function () {
        return ce.css(e, t, "");
      },
      u = s(),
      l = n && n[3] || (ce.cssNumber[t] ? "" : "px"),
      c = e.nodeType && (ce.cssNumber[t] || "px" !== l && +u) && Y.exec(ce.css(e, t));
    if (c && c[3] !== l) {
      u /= 2, l = l || c[3], c = +u || 1;
      while (a--) ce.style(e, t, c + l), (1 - o) * (1 - (o = s() / u || .5)) <= 0 && (a = 0), c /= o;
      c *= 2, ce.style(e, t, c + l), n = n || [];
    }
    return n && (c = +c || +u || 0, i = n[1] ? c + (n[1] + 1) * n[2] : +n[2], r && (r.unit = l, r.start = c, r.end = i)), i;
  }
  var ne = {};
  function re(e, t) {
    for (var n, r, i, o, a, s, u, l = [], c = 0, f = e.length; c < f; c++) (r = e[c]).style && (n = r.style.display, t ? ("none" === n && (l[c] = _.get(r, "display") || null, l[c] || (r.style.display = "")), "" === r.style.display && ee(r) && (l[c] = (u = a = o = void 0, a = (i = r).ownerDocument, s = i.nodeName, (u = ne[s]) || (o = a.body.appendChild(a.createElement(s)), u = ce.css(o, "display"), o.parentNode.removeChild(o), "none" === u && (u = "block"), ne[s] = u)))) : "none" !== n && (l[c] = "none", _.set(r, "display", n)));
    for (c = 0; c < f; c++) null != l[c] && (e[c].style.display = l[c]);
    return e;
  }
  ce.fn.extend({
    show: function () {
      return re(this, !0);
    },
    hide: function () {
      return re(this);
    },
    toggle: function (e) {
      return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
        ee(this) ? ce(this).show() : ce(this).hide();
      });
    }
  });
  var xe,
    be,
    we = /^(?:checkbox|radio)$/i,
    Te = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
    Ce = /^$|^module$|\/(?:java|ecma)script/i;
  xe = C.createDocumentFragment().appendChild(C.createElement("div")), (be = C.createElement("input")).setAttribute("type", "radio"), be.setAttribute("checked", "checked"), be.setAttribute("name", "t"), xe.appendChild(be), le.checkClone = xe.cloneNode(!0).cloneNode(!0).lastChild.checked, xe.innerHTML = "<textarea>x</textarea>", le.noCloneChecked = !!xe.cloneNode(!0).lastChild.defaultValue, xe.innerHTML = "<option></option>", le.option = !!xe.lastChild;
  var ke = {
    thead: [1, "<table>", "</table>"],
    col: [2, "<table><colgroup>", "</colgroup></table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default: [0, "", ""]
  };
  function Se(e, t) {
    var n;
    return n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && fe(e, t) ? ce.merge([e], n) : n;
  }
  function Ee(e, t) {
    for (var n = 0, r = e.length; n < r; n++) _.set(e[n], "globalEval", !t || _.get(t[n], "globalEval"));
  }
  ke.tbody = ke.tfoot = ke.colgroup = ke.caption = ke.thead, ke.th = ke.td, le.option || (ke.optgroup = ke.option = [1, "<select multiple='multiple'>", "</select>"]);
  var je = /<|&#?\w+;/;
  function Ae(e, t, n, r, i) {
    for (var o, a, s, u, l, c, f = t.createDocumentFragment(), p = [], d = 0, h = e.length; d < h; d++) if ((o = e[d]) || 0 === o) if ("object" === x(o)) ce.merge(p, o.nodeType ? [o] : o);else if (je.test(o)) {
      a = a || f.appendChild(t.createElement("div")), s = (Te.exec(o) || ["", ""])[1].toLowerCase(), u = ke[s] || ke._default, a.innerHTML = u[1] + ce.htmlPrefilter(o) + u[2], c = u[0];
      while (c--) a = a.lastChild;
      ce.merge(p, a.childNodes), (a = f.firstChild).textContent = "";
    } else p.push(t.createTextNode(o));
    f.textContent = "", d = 0;
    while (o = p[d++]) if (r && -1 < ce.inArray(o, r)) i && i.push(o);else if (l = K(o), a = Se(f.appendChild(o), "script"), l && Ee(a), n) {
      c = 0;
      while (o = a[c++]) Ce.test(o.type || "") && n.push(o);
    }
    return f;
  }
  var De = /^([^.]*)(?:\.(.+)|)/;
  function Ne() {
    return !0;
  }
  function qe() {
    return !1;
  }
  function Le(e, t, n, r, i, o) {
    var a, s;
    if ("object" == typeof t) {
      for (s in "string" != typeof n && (r = r || n, n = void 0), t) Le(e, s, n, r, t[s], o);
      return e;
    }
    if (null == r && null == i ? (i = n, r = n = void 0) : null == i && ("string" == typeof n ? (i = r, r = void 0) : (i = r, r = n, n = void 0)), !1 === i) i = qe;else if (!i) return e;
    return 1 === o && (a = i, (i = function (e) {
      return ce().off(e), a.apply(this, arguments);
    }).guid = a.guid || (a.guid = ce.guid++)), e.each(function () {
      ce.event.add(this, t, i, r, n);
    });
  }
  function He(e, r, t) {
    t ? (_.set(e, r, !1), ce.event.add(e, r, {
      namespace: !1,
      handler: function (e) {
        var t,
          n = _.get(this, r);
        if (1 & e.isTrigger && this[r]) {
          if (n) (ce.event.special[r] || {}).delegateType && e.stopPropagation();else if (n = ae.call(arguments), _.set(this, r, n), this[r](), t = _.get(this, r), _.set(this, r, !1), n !== t) return e.stopImmediatePropagation(), e.preventDefault(), t;
        } else n && (_.set(this, r, ce.event.trigger(n[0], n.slice(1), this)), e.stopPropagation(), e.isImmediatePropagationStopped = Ne);
      }
    })) : void 0 === _.get(e, r) && ce.event.add(e, r, Ne);
  }
  ce.event = {
    global: {},
    add: function (t, e, n, r, i) {
      var o,
        a,
        s,
        u,
        l,
        c,
        f,
        p,
        d,
        h,
        g,
        v = _.get(t);
      if ($(t)) {
        n.handler && (n = (o = n).handler, i = o.selector), i && ce.find.matchesSelector(J, i), n.guid || (n.guid = ce.guid++), (u = v.events) || (u = v.events = Object.create(null)), (a = v.handle) || (a = v.handle = function (e) {
          return "undefined" != typeof ce && ce.event.triggered !== e.type ? ce.event.dispatch.apply(t, arguments) : void 0;
        }), l = (e = (e || "").match(D) || [""]).length;
        while (l--) d = g = (s = De.exec(e[l]) || [])[1], h = (s[2] || "").split(".").sort(), d && (f = ce.event.special[d] || {}, d = (i ? f.delegateType : f.bindType) || d, f = ce.event.special[d] || {}, c = ce.extend({
          type: d,
          origType: g,
          data: r,
          handler: n,
          guid: n.guid,
          selector: i,
          needsContext: i && ce.expr.match.needsContext.test(i),
          namespace: h.join(".")
        }, o), (p = u[d]) || ((p = u[d] = []).delegateCount = 0, f.setup && !1 !== f.setup.call(t, r, h, a) || t.addEventListener && t.addEventListener(d, a)), f.add && (f.add.call(t, c), c.handler.guid || (c.handler.guid = n.guid)), i ? p.splice(p.delegateCount++, 0, c) : p.push(c), ce.event.global[d] = !0);
      }
    },
    remove: function (e, t, n, r, i) {
      var o,
        a,
        s,
        u,
        l,
        c,
        f,
        p,
        d,
        h,
        g,
        v = _.hasData(e) && _.get(e);
      if (v && (u = v.events)) {
        l = (t = (t || "").match(D) || [""]).length;
        while (l--) if (d = g = (s = De.exec(t[l]) || [])[1], h = (s[2] || "").split(".").sort(), d) {
          f = ce.event.special[d] || {}, p = u[d = (r ? f.delegateType : f.bindType) || d] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = p.length;
          while (o--) c = p[o], !i && g !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (p.splice(o, 1), c.selector && p.delegateCount--, f.remove && f.remove.call(e, c));
          a && !p.length && (f.teardown && !1 !== f.teardown.call(e, h, v.handle) || ce.removeEvent(e, d, v.handle), delete u[d]);
        } else for (d in u) ce.event.remove(e, d + t[l], n, r, !0);
        ce.isEmptyObject(u) && _.remove(e, "handle events");
      }
    },
    dispatch: function (e) {
      var t,
        n,
        r,
        i,
        o,
        a,
        s = new Array(arguments.length),
        u = ce.event.fix(e),
        l = (_.get(this, "events") || Object.create(null))[u.type] || [],
        c = ce.event.special[u.type] || {};
      for (s[0] = u, t = 1; t < arguments.length; t++) s[t] = arguments[t];
      if (u.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, u)) {
        a = ce.event.handlers.call(this, u, l), t = 0;
        while ((i = a[t++]) && !u.isPropagationStopped()) {
          u.currentTarget = i.elem, n = 0;
          while ((o = i.handlers[n++]) && !u.isImmediatePropagationStopped()) u.rnamespace && !1 !== o.namespace && !u.rnamespace.test(o.namespace) || (u.handleObj = o, u.data = o.data, void 0 !== (r = ((ce.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, s)) && !1 === (u.result = r) && (u.preventDefault(), u.stopPropagation()));
        }
        return c.postDispatch && c.postDispatch.call(this, u), u.result;
      }
    },
    handlers: function (e, t) {
      var n,
        r,
        i,
        o,
        a,
        s = [],
        u = t.delegateCount,
        l = e.target;
      if (u && l.nodeType && !("click" === e.type && 1 <= e.button)) for (; l !== this; l = l.parentNode || this) if (1 === l.nodeType && ("click" !== e.type || !0 !== l.disabled)) {
        for (o = [], a = {}, n = 0; n < u; n++) void 0 === a[i = (r = t[n]).selector + " "] && (a[i] = r.needsContext ? -1 < ce(i, this).index(l) : ce.find(i, this, null, [l]).length), a[i] && o.push(r);
        o.length && s.push({
          elem: l,
          handlers: o
        });
      }
      return l = this, u < t.length && s.push({
        elem: l,
        handlers: t.slice(u)
      }), s;
    },
    addProp: function (t, e) {
      Object.defineProperty(ce.Event.prototype, t, {
        enumerable: !0,
        configurable: !0,
        get: v(e) ? function () {
          if (this.originalEvent) return e(this.originalEvent);
        } : function () {
          if (this.originalEvent) return this.originalEvent[t];
        },
        set: function (e) {
          Object.defineProperty(this, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: e
          });
        }
      });
    },
    fix: function (e) {
      return e[ce.expando] ? e : new ce.Event(e);
    },
    special: {
      load: {
        noBubble: !0
      },
      click: {
        setup: function (e) {
          var t = this || e;
          return we.test(t.type) && t.click && fe(t, "input") && He(t, "click", !0), !1;
        },
        trigger: function (e) {
          var t = this || e;
          return we.test(t.type) && t.click && fe(t, "input") && He(t, "click"), !0;
        },
        _default: function (e) {
          var t = e.target;
          return we.test(t.type) && t.click && fe(t, "input") && _.get(t, "click") || fe(t, "a");
        }
      },
      beforeunload: {
        postDispatch: function (e) {
          void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result);
        }
      }
    }
  }, ce.removeEvent = function (e, t, n) {
    e.removeEventListener && e.removeEventListener(t, n);
  }, ce.Event = function (e, t) {
    if (!(this instanceof ce.Event)) return new ce.Event(e, t);
    e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? Ne : qe, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && ce.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[ce.expando] = !0;
  }, ce.Event.prototype = {
    constructor: ce.Event,
    isDefaultPrevented: qe,
    isPropagationStopped: qe,
    isImmediatePropagationStopped: qe,
    isSimulated: !1,
    preventDefault: function () {
      var e = this.originalEvent;
      this.isDefaultPrevented = Ne, e && !this.isSimulated && e.preventDefault();
    },
    stopPropagation: function () {
      var e = this.originalEvent;
      this.isPropagationStopped = Ne, e && !this.isSimulated && e.stopPropagation();
    },
    stopImmediatePropagation: function () {
      var e = this.originalEvent;
      this.isImmediatePropagationStopped = Ne, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation();
    }
  }, ce.each({
    altKey: !0,
    bubbles: !0,
    cancelable: !0,
    changedTouches: !0,
    ctrlKey: !0,
    detail: !0,
    eventPhase: !0,
    metaKey: !0,
    pageX: !0,
    pageY: !0,
    shiftKey: !0,
    view: !0,
    "char": !0,
    code: !0,
    charCode: !0,
    key: !0,
    keyCode: !0,
    button: !0,
    buttons: !0,
    clientX: !0,
    clientY: !0,
    offsetX: !0,
    offsetY: !0,
    pointerId: !0,
    pointerType: !0,
    screenX: !0,
    screenY: !0,
    targetTouches: !0,
    toElement: !0,
    touches: !0,
    which: !0
  }, ce.event.addProp), ce.each({
    focus: "focusin",
    blur: "focusout"
  }, function (r, i) {
    function o(e) {
      if (C.documentMode) {
        var t = _.get(this, "handle"),
          n = ce.event.fix(e);
        n.type = "focusin" === e.type ? "focus" : "blur", n.isSimulated = !0, t(e), n.target === n.currentTarget && t(n);
      } else ce.event.simulate(i, e.target, ce.event.fix(e));
    }
    ce.event.special[r] = {
      setup: function () {
        var e;
        if (He(this, r, !0), !C.documentMode) return !1;
        (e = _.get(this, i)) || this.addEventListener(i, o), _.set(this, i, (e || 0) + 1);
      },
      trigger: function () {
        return He(this, r), !0;
      },
      teardown: function () {
        var e;
        if (!C.documentMode) return !1;
        (e = _.get(this, i) - 1) ? _.set(this, i, e) : (this.removeEventListener(i, o), _.remove(this, i));
      },
      _default: function (e) {
        return _.get(e.target, r);
      },
      delegateType: i
    }, ce.event.special[i] = {
      setup: function () {
        var e = this.ownerDocument || this.document || this,
          t = C.documentMode ? this : e,
          n = _.get(t, i);
        n || (C.documentMode ? this.addEventListener(i, o) : e.addEventListener(r, o, !0)), _.set(t, i, (n || 0) + 1);
      },
      teardown: function () {
        var e = this.ownerDocument || this.document || this,
          t = C.documentMode ? this : e,
          n = _.get(t, i) - 1;
        n ? _.set(t, i, n) : (C.documentMode ? this.removeEventListener(i, o) : e.removeEventListener(r, o, !0), _.remove(t, i));
      }
    };
  }), ce.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function (e, i) {
    ce.event.special[e] = {
      delegateType: i,
      bindType: i,
      handle: function (e) {
        var t,
          n = e.relatedTarget,
          r = e.handleObj;
        return n && (n === this || ce.contains(this, n)) || (e.type = r.origType, t = r.handler.apply(this, arguments), e.type = i), t;
      }
    };
  }), ce.fn.extend({
    on: function (e, t, n, r) {
      return Le(this, e, t, n, r);
    },
    one: function (e, t, n, r) {
      return Le(this, e, t, n, r, 1);
    },
    off: function (e, t, n) {
      var r, i;
      if (e && e.preventDefault && e.handleObj) return r = e.handleObj, ce(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
      if ("object" == typeof e) {
        for (i in e) this.off(i, t, e[i]);
        return this;
      }
      return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = qe), this.each(function () {
        ce.event.remove(this, e, n, t);
      });
    }
  });
  var Oe = /<script|<style|<link/i,
    Pe = /checked\s*(?:[^=]|=\s*.checked.)/i,
    Me = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
  function Re(e, t) {
    return fe(e, "table") && fe(11 !== t.nodeType ? t : t.firstChild, "tr") && ce(e).children("tbody")[0] || e;
  }
  function Ie(e) {
    return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e;
  }
  function We(e) {
    return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e;
  }
  function Fe(e, t) {
    var n, r, i, o, a, s;
    if (1 === t.nodeType) {
      if (_.hasData(e) && (s = _.get(e).events)) for (i in _.remove(t, "handle events"), s) for (n = 0, r = s[i].length; n < r; n++) ce.event.add(t, i, s[i][n]);
      z.hasData(e) && (o = z.access(e), a = ce.extend({}, o), z.set(t, a));
    }
  }
  function $e(n, r, i, o) {
    r = g(r);
    var e,
      t,
      a,
      s,
      u,
      l,
      c = 0,
      f = n.length,
      p = f - 1,
      d = r[0],
      h = v(d);
    if (h || 1 < f && "string" == typeof d && !le.checkClone && Pe.test(d)) return n.each(function (e) {
      var t = n.eq(e);
      h && (r[0] = d.call(this, e, t.html())), $e(t, r, i, o);
    });
    if (f && (t = (e = Ae(r, n[0].ownerDocument, !1, n, o)).firstChild, 1 === e.childNodes.length && (e = t), t || o)) {
      for (s = (a = ce.map(Se(e, "script"), Ie)).length; c < f; c++) u = e, c !== p && (u = ce.clone(u, !0, !0), s && ce.merge(a, Se(u, "script"))), i.call(n[c], u, c);
      if (s) for (l = a[a.length - 1].ownerDocument, ce.map(a, We), c = 0; c < s; c++) u = a[c], Ce.test(u.type || "") && !_.access(u, "globalEval") && ce.contains(l, u) && (u.src && "module" !== (u.type || "").toLowerCase() ? ce._evalUrl && !u.noModule && ce._evalUrl(u.src, {
        nonce: u.nonce || u.getAttribute("nonce")
      }, l) : m(u.textContent.replace(Me, ""), u, l));
    }
    return n;
  }
  function Be(e, t, n) {
    for (var r, i = t ? ce.filter(t, e) : e, o = 0; null != (r = i[o]); o++) n || 1 !== r.nodeType || ce.cleanData(Se(r)), r.parentNode && (n && K(r) && Ee(Se(r, "script")), r.parentNode.removeChild(r));
    return e;
  }
  ce.extend({
    htmlPrefilter: function (e) {
      return e;
    },
    clone: function (e, t, n) {
      var r,
        i,
        o,
        a,
        s,
        u,
        l,
        c = e.cloneNode(!0),
        f = K(e);
      if (!(le.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || ce.isXMLDoc(e))) for (a = Se(c), r = 0, i = (o = Se(e)).length; r < i; r++) s = o[r], u = a[r], void 0, "input" === (l = u.nodeName.toLowerCase()) && we.test(s.type) ? u.checked = s.checked : "input" !== l && "textarea" !== l || (u.defaultValue = s.defaultValue);
      if (t) if (n) for (o = o || Se(e), a = a || Se(c), r = 0, i = o.length; r < i; r++) Fe(o[r], a[r]);else Fe(e, c);
      return 0 < (a = Se(c, "script")).length && Ee(a, !f && Se(e, "script")), c;
    },
    cleanData: function (e) {
      for (var t, n, r, i = ce.event.special, o = 0; void 0 !== (n = e[o]); o++) if ($(n)) {
        if (t = n[_.expando]) {
          if (t.events) for (r in t.events) i[r] ? ce.event.remove(n, r) : ce.removeEvent(n, r, t.handle);
          n[_.expando] = void 0;
        }
        n[z.expando] && (n[z.expando] = void 0);
      }
    }
  }), ce.fn.extend({
    detach: function (e) {
      return Be(this, e, !0);
    },
    remove: function (e) {
      return Be(this, e);
    },
    text: function (e) {
      return M(this, function (e) {
        return void 0 === e ? ce.text(this) : this.empty().each(function () {
          1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e);
        });
      }, null, e, arguments.length);
    },
    append: function () {
      return $e(this, arguments, function (e) {
        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || Re(this, e).appendChild(e);
      });
    },
    prepend: function () {
      return $e(this, arguments, function (e) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var t = Re(this, e);
          t.insertBefore(e, t.firstChild);
        }
      });
    },
    before: function () {
      return $e(this, arguments, function (e) {
        this.parentNode && this.parentNode.insertBefore(e, this);
      });
    },
    after: function () {
      return $e(this, arguments, function (e) {
        this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
      });
    },
    empty: function () {
      for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (ce.cleanData(Se(e, !1)), e.textContent = "");
      return this;
    },
    clone: function (e, t) {
      return e = null != e && e, t = null == t ? e : t, this.map(function () {
        return ce.clone(this, e, t);
      });
    },
    html: function (e) {
      return M(this, function (e) {
        var t = this[0] || {},
          n = 0,
          r = this.length;
        if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
        if ("string" == typeof e && !Oe.test(e) && !ke[(Te.exec(e) || ["", ""])[1].toLowerCase()]) {
          e = ce.htmlPrefilter(e);
          try {
            for (; n < r; n++) 1 === (t = this[n] || {}).nodeType && (ce.cleanData(Se(t, !1)), t.innerHTML = e);
            t = 0;
          } catch (e) {}
        }
        t && this.empty().append(e);
      }, null, e, arguments.length);
    },
    replaceWith: function () {
      var n = [];
      return $e(this, arguments, function (e) {
        var t = this.parentNode;
        ce.inArray(this, n) < 0 && (ce.cleanData(Se(this)), t && t.replaceChild(e, this));
      }, n);
    }
  }), ce.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function (e, a) {
    ce.fn[e] = function (e) {
      for (var t, n = [], r = ce(e), i = r.length - 1, o = 0; o <= i; o++) t = o === i ? this : this.clone(!0), ce(r[o])[a](t), s.apply(n, t.get());
      return this.pushStack(n);
    };
  });
  var _e = new RegExp("^(" + G + ")(?!px)[a-z%]+$", "i"),
    ze = /^--/,
    Xe = function (e) {
      var t = e.ownerDocument.defaultView;
      return t && t.opener || (t = ie), t.getComputedStyle(e);
    },
    Ue = function (e, t, n) {
      var r,
        i,
        o = {};
      for (i in t) o[i] = e.style[i], e.style[i] = t[i];
      for (i in r = n.call(e), t) e.style[i] = o[i];
      return r;
    },
    Ve = new RegExp(Q.join("|"), "i");
  function Ge(e, t, n) {
    var r,
      i,
      o,
      a,
      s = ze.test(t),
      u = e.style;
    return (n = n || Xe(e)) && (a = n.getPropertyValue(t) || n[t], s && a && (a = a.replace(ve, "$1") || void 0), "" !== a || K(e) || (a = ce.style(e, t)), !le.pixelBoxStyles() && _e.test(a) && Ve.test(t) && (r = u.width, i = u.minWidth, o = u.maxWidth, u.minWidth = u.maxWidth = u.width = a, a = n.width, u.width = r, u.minWidth = i, u.maxWidth = o)), void 0 !== a ? a + "" : a;
  }
  function Ye(e, t) {
    return {
      get: function () {
        if (!e()) return (this.get = t).apply(this, arguments);
        delete this.get;
      }
    };
  }
  !function () {
    function e() {
      if (l) {
        u.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", l.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", J.appendChild(u).appendChild(l);
        var e = ie.getComputedStyle(l);
        n = "1%" !== e.top, s = 12 === t(e.marginLeft), l.style.right = "60%", o = 36 === t(e.right), r = 36 === t(e.width), l.style.position = "absolute", i = 12 === t(l.offsetWidth / 3), J.removeChild(u), l = null;
      }
    }
    function t(e) {
      return Math.round(parseFloat(e));
    }
    var n,
      r,
      i,
      o,
      a,
      s,
      u = C.createElement("div"),
      l = C.createElement("div");
    l.style && (l.style.backgroundClip = "content-box", l.cloneNode(!0).style.backgroundClip = "", le.clearCloneStyle = "content-box" === l.style.backgroundClip, ce.extend(le, {
      boxSizingReliable: function () {
        return e(), r;
      },
      pixelBoxStyles: function () {
        return e(), o;
      },
      pixelPosition: function () {
        return e(), n;
      },
      reliableMarginLeft: function () {
        return e(), s;
      },
      scrollboxSize: function () {
        return e(), i;
      },
      reliableTrDimensions: function () {
        var e, t, n, r;
        return null == a && (e = C.createElement("table"), t = C.createElement("tr"), n = C.createElement("div"), e.style.cssText = "position:absolute;left:-11111px;border-collapse:separate", t.style.cssText = "box-sizing:content-box;border:1px solid", t.style.height = "1px", n.style.height = "9px", n.style.display = "block", J.appendChild(e).appendChild(t).appendChild(n), r = ie.getComputedStyle(t), a = parseInt(r.height, 10) + parseInt(r.borderTopWidth, 10) + parseInt(r.borderBottomWidth, 10) === t.offsetHeight, J.removeChild(e)), a;
      }
    }));
  }();
  var Qe = ["Webkit", "Moz", "ms"],
    Je = C.createElement("div").style,
    Ke = {};
  function Ze(e) {
    var t = ce.cssProps[e] || Ke[e];
    return t || (e in Je ? e : Ke[e] = function (e) {
      var t = e[0].toUpperCase() + e.slice(1),
        n = Qe.length;
      while (n--) if ((e = Qe[n] + t) in Je) return e;
    }(e) || e);
  }
  var et = /^(none|table(?!-c[ea]).+)/,
    tt = {
      position: "absolute",
      visibility: "hidden",
      display: "block"
    },
    nt = {
      letterSpacing: "0",
      fontWeight: "400"
    };
  function rt(e, t, n) {
    var r = Y.exec(t);
    return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t;
  }
  function it(e, t, n, r, i, o) {
    var a = "width" === t ? 1 : 0,
      s = 0,
      u = 0,
      l = 0;
    if (n === (r ? "border" : "content")) return 0;
    for (; a < 4; a += 2) "margin" === n && (l += ce.css(e, n + Q[a], !0, i)), r ? ("content" === n && (u -= ce.css(e, "padding" + Q[a], !0, i)), "margin" !== n && (u -= ce.css(e, "border" + Q[a] + "Width", !0, i))) : (u += ce.css(e, "padding" + Q[a], !0, i), "padding" !== n ? u += ce.css(e, "border" + Q[a] + "Width", !0, i) : s += ce.css(e, "border" + Q[a] + "Width", !0, i));
    return !r && 0 <= o && (u += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - u - s - .5)) || 0), u + l;
  }
  function ot(e, t, n) {
    var r = Xe(e),
      i = (!le.boxSizingReliable() || n) && "border-box" === ce.css(e, "boxSizing", !1, r),
      o = i,
      a = Ge(e, t, r),
      s = "offset" + t[0].toUpperCase() + t.slice(1);
    if (_e.test(a)) {
      if (!n) return a;
      a = "auto";
    }
    return (!le.boxSizingReliable() && i || !le.reliableTrDimensions() && fe(e, "tr") || "auto" === a || !parseFloat(a) && "inline" === ce.css(e, "display", !1, r)) && e.getClientRects().length && (i = "border-box" === ce.css(e, "boxSizing", !1, r), (o = s in e) && (a = e[s])), (a = parseFloat(a) || 0) + it(e, t, n || (i ? "border" : "content"), o, r, a) + "px";
  }
  function at(e, t, n, r, i) {
    return new at.prototype.init(e, t, n, r, i);
  }
  ce.extend({
    cssHooks: {
      opacity: {
        get: function (e, t) {
          if (t) {
            var n = Ge(e, "opacity");
            return "" === n ? "1" : n;
          }
        }
      }
    },
    cssNumber: {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageSlice: !0,
      columnCount: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      gridArea: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnStart: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowStart: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      scale: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0
    },
    cssProps: {},
    style: function (e, t, n, r) {
      if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
        var i,
          o,
          a,
          s = F(t),
          u = ze.test(t),
          l = e.style;
        if (u || (t = Ze(s)), a = ce.cssHooks[t] || ce.cssHooks[s], void 0 === n) return a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : l[t];
        "string" === (o = typeof n) && (i = Y.exec(n)) && i[1] && (n = te(e, t, i), o = "number"), null != n && n == n && ("number" !== o || u || (n += i && i[3] || (ce.cssNumber[s] ? "" : "px")), le.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, r)) || (u ? l.setProperty(t, n) : l[t] = n));
      }
    },
    css: function (e, t, n, r) {
      var i,
        o,
        a,
        s = F(t);
      return ze.test(t) || (t = Ze(s)), (a = ce.cssHooks[t] || ce.cssHooks[s]) && "get" in a && (i = a.get(e, !0, n)), void 0 === i && (i = Ge(e, t, r)), "normal" === i && t in nt && (i = nt[t]), "" === n || n ? (o = parseFloat(i), !0 === n || isFinite(o) ? o || 0 : i) : i;
    }
  }), ce.each(["height", "width"], function (e, u) {
    ce.cssHooks[u] = {
      get: function (e, t, n) {
        if (t) return !et.test(ce.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? ot(e, u, n) : Ue(e, tt, function () {
          return ot(e, u, n);
        });
      },
      set: function (e, t, n) {
        var r,
          i = Xe(e),
          o = !le.scrollboxSize() && "absolute" === i.position,
          a = (o || n) && "border-box" === ce.css(e, "boxSizing", !1, i),
          s = n ? it(e, u, n, a, i) : 0;
        return a && o && (s -= Math.ceil(e["offset" + u[0].toUpperCase() + u.slice(1)] - parseFloat(i[u]) - it(e, u, "border", !1, i) - .5)), s && (r = Y.exec(t)) && "px" !== (r[3] || "px") && (e.style[u] = t, t = ce.css(e, u)), rt(0, t, s);
      }
    };
  }), ce.cssHooks.marginLeft = Ye(le.reliableMarginLeft, function (e, t) {
    if (t) return (parseFloat(Ge(e, "marginLeft")) || e.getBoundingClientRect().left - Ue(e, {
      marginLeft: 0
    }, function () {
      return e.getBoundingClientRect().left;
    })) + "px";
  }), ce.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function (i, o) {
    ce.cssHooks[i + o] = {
      expand: function (e) {
        for (var t = 0, n = {}, r = "string" == typeof e ? e.split(" ") : [e]; t < 4; t++) n[i + Q[t] + o] = r[t] || r[t - 2] || r[0];
        return n;
      }
    }, "margin" !== i && (ce.cssHooks[i + o].set = rt);
  }), ce.fn.extend({
    css: function (e, t) {
      return M(this, function (e, t, n) {
        var r,
          i,
          o = {},
          a = 0;
        if (Array.isArray(t)) {
          for (r = Xe(e), i = t.length; a < i; a++) o[t[a]] = ce.css(e, t[a], !1, r);
          return o;
        }
        return void 0 !== n ? ce.style(e, t, n) : ce.css(e, t);
      }, e, t, 1 < arguments.length);
    }
  }), ((ce.Tween = at).prototype = {
    constructor: at,
    init: function (e, t, n, r, i, o) {
      this.elem = e, this.prop = n, this.easing = i || ce.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (ce.cssNumber[n] ? "" : "px");
    },
    cur: function () {
      var e = at.propHooks[this.prop];
      return e && e.get ? e.get(this) : at.propHooks._default.get(this);
    },
    run: function (e) {
      var t,
        n = at.propHooks[this.prop];
      return this.options.duration ? this.pos = t = ce.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : at.propHooks._default.set(this), this;
    }
  }).init.prototype = at.prototype, (at.propHooks = {
    _default: {
      get: function (e) {
        var t;
        return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = ce.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0;
      },
      set: function (e) {
        ce.fx.step[e.prop] ? ce.fx.step[e.prop](e) : 1 !== e.elem.nodeType || !ce.cssHooks[e.prop] && null == e.elem.style[Ze(e.prop)] ? e.elem[e.prop] = e.now : ce.style(e.elem, e.prop, e.now + e.unit);
      }
    }
  }).scrollTop = at.propHooks.scrollLeft = {
    set: function (e) {
      e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
    }
  }, ce.easing = {
    linear: function (e) {
      return e;
    },
    swing: function (e) {
      return .5 - Math.cos(e * Math.PI) / 2;
    },
    _default: "swing"
  }, ce.fx = at.prototype.init, ce.fx.step = {};
  var st,
    ut,
    lt,
    ct,
    ft = /^(?:toggle|show|hide)$/,
    pt = /queueHooks$/;
  function dt() {
    ut && (!1 === C.hidden && ie.requestAnimationFrame ? ie.requestAnimationFrame(dt) : ie.setTimeout(dt, ce.fx.interval), ce.fx.tick());
  }
  function ht() {
    return ie.setTimeout(function () {
      st = void 0;
    }), st = Date.now();
  }
  function gt(e, t) {
    var n,
      r = 0,
      i = {
        height: e
      };
    for (t = t ? 1 : 0; r < 4; r += 2 - t) i["margin" + (n = Q[r])] = i["padding" + n] = e;
    return t && (i.opacity = i.width = e), i;
  }
  function vt(e, t, n) {
    for (var r, i = (yt.tweeners[t] || []).concat(yt.tweeners["*"]), o = 0, a = i.length; o < a; o++) if (r = i[o].call(n, t, e)) return r;
  }
  function yt(o, e, t) {
    var n,
      a,
      r = 0,
      i = yt.prefilters.length,
      s = ce.Deferred().always(function () {
        delete u.elem;
      }),
      u = function () {
        if (a) return !1;
        for (var e = st || ht(), t = Math.max(0, l.startTime + l.duration - e), n = 1 - (t / l.duration || 0), r = 0, i = l.tweens.length; r < i; r++) l.tweens[r].run(n);
        return s.notifyWith(o, [l, n, t]), n < 1 && i ? t : (i || s.notifyWith(o, [l, 1, 0]), s.resolveWith(o, [l]), !1);
      },
      l = s.promise({
        elem: o,
        props: ce.extend({}, e),
        opts: ce.extend(!0, {
          specialEasing: {},
          easing: ce.easing._default
        }, t),
        originalProperties: e,
        originalOptions: t,
        startTime: st || ht(),
        duration: t.duration,
        tweens: [],
        createTween: function (e, t) {
          var n = ce.Tween(o, l.opts, e, t, l.opts.specialEasing[e] || l.opts.easing);
          return l.tweens.push(n), n;
        },
        stop: function (e) {
          var t = 0,
            n = e ? l.tweens.length : 0;
          if (a) return this;
          for (a = !0; t < n; t++) l.tweens[t].run(1);
          return e ? (s.notifyWith(o, [l, 1, 0]), s.resolveWith(o, [l, e])) : s.rejectWith(o, [l, e]), this;
        }
      }),
      c = l.props;
    for (!function (e, t) {
      var n, r, i, o, a;
      for (n in e) if (i = t[r = F(n)], o = e[n], Array.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), (a = ce.cssHooks[r]) && "expand" in a) for (n in o = a.expand(o), delete e[r], o) n in e || (e[n] = o[n], t[n] = i);else t[r] = i;
    }(c, l.opts.specialEasing); r < i; r++) if (n = yt.prefilters[r].call(l, o, c, l.opts)) return v(n.stop) && (ce._queueHooks(l.elem, l.opts.queue).stop = n.stop.bind(n)), n;
    return ce.map(c, vt, l), v(l.opts.start) && l.opts.start.call(o, l), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always), ce.fx.timer(ce.extend(u, {
      elem: o,
      anim: l,
      queue: l.opts.queue
    })), l;
  }
  ce.Animation = ce.extend(yt, {
    tweeners: {
      "*": [function (e, t) {
        var n = this.createTween(e, t);
        return te(n.elem, e, Y.exec(t), n), n;
      }]
    },
    tweener: function (e, t) {
      v(e) ? (t = e, e = ["*"]) : e = e.match(D);
      for (var n, r = 0, i = e.length; r < i; r++) n = e[r], yt.tweeners[n] = yt.tweeners[n] || [], yt.tweeners[n].unshift(t);
    },
    prefilters: [function (e, t, n) {
      var r,
        i,
        o,
        a,
        s,
        u,
        l,
        c,
        f = "width" in t || "height" in t,
        p = this,
        d = {},
        h = e.style,
        g = e.nodeType && ee(e),
        v = _.get(e, "fxshow");
      for (r in n.queue || (null == (a = ce._queueHooks(e, "fx")).unqueued && (a.unqueued = 0, s = a.empty.fire, a.empty.fire = function () {
        a.unqueued || s();
      }), a.unqueued++, p.always(function () {
        p.always(function () {
          a.unqueued--, ce.queue(e, "fx").length || a.empty.fire();
        });
      })), t) if (i = t[r], ft.test(i)) {
        if (delete t[r], o = o || "toggle" === i, i === (g ? "hide" : "show")) {
          if ("show" !== i || !v || void 0 === v[r]) continue;
          g = !0;
        }
        d[r] = v && v[r] || ce.style(e, r);
      }
      if ((u = !ce.isEmptyObject(t)) || !ce.isEmptyObject(d)) for (r in f && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY], null == (l = v && v.display) && (l = _.get(e, "display")), "none" === (c = ce.css(e, "display")) && (l ? c = l : (re([e], !0), l = e.style.display || l, c = ce.css(e, "display"), re([e]))), ("inline" === c || "inline-block" === c && null != l) && "none" === ce.css(e, "float") && (u || (p.done(function () {
        h.display = l;
      }), null == l && (c = h.display, l = "none" === c ? "" : c)), h.display = "inline-block")), n.overflow && (h.overflow = "hidden", p.always(function () {
        h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2];
      })), u = !1, d) u || (v ? "hidden" in v && (g = v.hidden) : v = _.access(e, "fxshow", {
        display: l
      }), o && (v.hidden = !g), g && re([e], !0), p.done(function () {
        for (r in g || re([e]), _.remove(e, "fxshow"), d) ce.style(e, r, d[r]);
      })), u = vt(g ? v[r] : 0, r, p), r in v || (v[r] = u.start, g && (u.end = u.start, u.start = 0));
    }],
    prefilter: function (e, t) {
      t ? yt.prefilters.unshift(e) : yt.prefilters.push(e);
    }
  }), ce.speed = function (e, t, n) {
    var r = e && "object" == typeof e ? ce.extend({}, e) : {
      complete: n || !n && t || v(e) && e,
      duration: e,
      easing: n && t || t && !v(t) && t
    };
    return ce.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in ce.fx.speeds ? r.duration = ce.fx.speeds[r.duration] : r.duration = ce.fx.speeds._default), null != r.queue && !0 !== r.queue || (r.queue = "fx"), r.old = r.complete, r.complete = function () {
      v(r.old) && r.old.call(this), r.queue && ce.dequeue(this, r.queue);
    }, r;
  }, ce.fn.extend({
    fadeTo: function (e, t, n, r) {
      return this.filter(ee).css("opacity", 0).show().end().animate({
        opacity: t
      }, e, n, r);
    },
    animate: function (t, e, n, r) {
      var i = ce.isEmptyObject(t),
        o = ce.speed(e, n, r),
        a = function () {
          var e = yt(this, ce.extend({}, t), o);
          (i || _.get(this, "finish")) && e.stop(!0);
        };
      return a.finish = a, i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a);
    },
    stop: function (i, e, o) {
      var a = function (e) {
        var t = e.stop;
        delete e.stop, t(o);
      };
      return "string" != typeof i && (o = e, e = i, i = void 0), e && this.queue(i || "fx", []), this.each(function () {
        var e = !0,
          t = null != i && i + "queueHooks",
          n = ce.timers,
          r = _.get(this);
        if (t) r[t] && r[t].stop && a(r[t]);else for (t in r) r[t] && r[t].stop && pt.test(t) && a(r[t]);
        for (t = n.length; t--;) n[t].elem !== this || null != i && n[t].queue !== i || (n[t].anim.stop(o), e = !1, n.splice(t, 1));
        !e && o || ce.dequeue(this, i);
      });
    },
    finish: function (a) {
      return !1 !== a && (a = a || "fx"), this.each(function () {
        var e,
          t = _.get(this),
          n = t[a + "queue"],
          r = t[a + "queueHooks"],
          i = ce.timers,
          o = n ? n.length : 0;
        for (t.finish = !0, ce.queue(this, a, []), r && r.stop && r.stop.call(this, !0), e = i.length; e--;) i[e].elem === this && i[e].queue === a && (i[e].anim.stop(!0), i.splice(e, 1));
        for (e = 0; e < o; e++) n[e] && n[e].finish && n[e].finish.call(this);
        delete t.finish;
      });
    }
  }), ce.each(["toggle", "show", "hide"], function (e, r) {
    var i = ce.fn[r];
    ce.fn[r] = function (e, t, n) {
      return null == e || "boolean" == typeof e ? i.apply(this, arguments) : this.animate(gt(r, !0), e, t, n);
    };
  }), ce.each({
    slideDown: gt("show"),
    slideUp: gt("hide"),
    slideToggle: gt("toggle"),
    fadeIn: {
      opacity: "show"
    },
    fadeOut: {
      opacity: "hide"
    },
    fadeToggle: {
      opacity: "toggle"
    }
  }, function (e, r) {
    ce.fn[e] = function (e, t, n) {
      return this.animate(r, e, t, n);
    };
  }), ce.timers = [], ce.fx.tick = function () {
    var e,
      t = 0,
      n = ce.timers;
    for (st = Date.now(); t < n.length; t++) (e = n[t])() || n[t] !== e || n.splice(t--, 1);
    n.length || ce.fx.stop(), st = void 0;
  }, ce.fx.timer = function (e) {
    ce.timers.push(e), ce.fx.start();
  }, ce.fx.interval = 13, ce.fx.start = function () {
    ut || (ut = !0, dt());
  }, ce.fx.stop = function () {
    ut = null;
  }, ce.fx.speeds = {
    slow: 600,
    fast: 200,
    _default: 400
  }, ce.fn.delay = function (r, e) {
    return r = ce.fx && ce.fx.speeds[r] || r, e = e || "fx", this.queue(e, function (e, t) {
      var n = ie.setTimeout(e, r);
      t.stop = function () {
        ie.clearTimeout(n);
      };
    });
  }, lt = C.createElement("input"), ct = C.createElement("select").appendChild(C.createElement("option")), lt.type = "checkbox", le.checkOn = "" !== lt.value, le.optSelected = ct.selected, (lt = C.createElement("input")).value = "t", lt.type = "radio", le.radioValue = "t" === lt.value;
  var mt,
    xt = ce.expr.attrHandle;
  ce.fn.extend({
    attr: function (e, t) {
      return M(this, ce.attr, e, t, 1 < arguments.length);
    },
    removeAttr: function (e) {
      return this.each(function () {
        ce.removeAttr(this, e);
      });
    }
  }), ce.extend({
    attr: function (e, t, n) {
      var r,
        i,
        o = e.nodeType;
      if (3 !== o && 8 !== o && 2 !== o) return "undefined" == typeof e.getAttribute ? ce.prop(e, t, n) : (1 === o && ce.isXMLDoc(e) || (i = ce.attrHooks[t.toLowerCase()] || (ce.expr.match.bool.test(t) ? mt : void 0)), void 0 !== n ? null === n ? void ce.removeAttr(e, t) : i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : null == (r = ce.find.attr(e, t)) ? void 0 : r);
    },
    attrHooks: {
      type: {
        set: function (e, t) {
          if (!le.radioValue && "radio" === t && fe(e, "input")) {
            var n = e.value;
            return e.setAttribute("type", t), n && (e.value = n), t;
          }
        }
      }
    },
    removeAttr: function (e, t) {
      var n,
        r = 0,
        i = t && t.match(D);
      if (i && 1 === e.nodeType) while (n = i[r++]) e.removeAttribute(n);
    }
  }), mt = {
    set: function (e, t, n) {
      return !1 === t ? ce.removeAttr(e, n) : e.setAttribute(n, n), n;
    }
  }, ce.each(ce.expr.match.bool.source.match(/\w+/g), function (e, t) {
    var a = xt[t] || ce.find.attr;
    xt[t] = function (e, t, n) {
      var r,
        i,
        o = t.toLowerCase();
      return n || (i = xt[o], xt[o] = r, r = null != a(e, t, n) ? o : null, xt[o] = i), r;
    };
  });
  var bt = /^(?:input|select|textarea|button)$/i,
    wt = /^(?:a|area)$/i;
  function Tt(e) {
    return (e.match(D) || []).join(" ");
  }
  function Ct(e) {
    return e.getAttribute && e.getAttribute("class") || "";
  }
  function kt(e) {
    return Array.isArray(e) ? e : "string" == typeof e && e.match(D) || [];
  }
  ce.fn.extend({
    prop: function (e, t) {
      return M(this, ce.prop, e, t, 1 < arguments.length);
    },
    removeProp: function (e) {
      return this.each(function () {
        delete this[ce.propFix[e] || e];
      });
    }
  }), ce.extend({
    prop: function (e, t, n) {
      var r,
        i,
        o = e.nodeType;
      if (3 !== o && 8 !== o && 2 !== o) return 1 === o && ce.isXMLDoc(e) || (t = ce.propFix[t] || t, i = ce.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t];
    },
    propHooks: {
      tabIndex: {
        get: function (e) {
          var t = ce.find.attr(e, "tabindex");
          return t ? parseInt(t, 10) : bt.test(e.nodeName) || wt.test(e.nodeName) && e.href ? 0 : -1;
        }
      }
    },
    propFix: {
      "for": "htmlFor",
      "class": "className"
    }
  }), le.optSelected || (ce.propHooks.selected = {
    get: function (e) {
      var t = e.parentNode;
      return t && t.parentNode && t.parentNode.selectedIndex, null;
    },
    set: function (e) {
      var t = e.parentNode;
      t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
    }
  }), ce.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
    ce.propFix[this.toLowerCase()] = this;
  }), ce.fn.extend({
    addClass: function (t) {
      var e, n, r, i, o, a;
      return v(t) ? this.each(function (e) {
        ce(this).addClass(t.call(this, e, Ct(this)));
      }) : (e = kt(t)).length ? this.each(function () {
        if (r = Ct(this), n = 1 === this.nodeType && " " + Tt(r) + " ") {
          for (o = 0; o < e.length; o++) i = e[o], n.indexOf(" " + i + " ") < 0 && (n += i + " ");
          a = Tt(n), r !== a && this.setAttribute("class", a);
        }
      }) : this;
    },
    removeClass: function (t) {
      var e, n, r, i, o, a;
      return v(t) ? this.each(function (e) {
        ce(this).removeClass(t.call(this, e, Ct(this)));
      }) : arguments.length ? (e = kt(t)).length ? this.each(function () {
        if (r = Ct(this), n = 1 === this.nodeType && " " + Tt(r) + " ") {
          for (o = 0; o < e.length; o++) {
            i = e[o];
            while (-1 < n.indexOf(" " + i + " ")) n = n.replace(" " + i + " ", " ");
          }
          a = Tt(n), r !== a && this.setAttribute("class", a);
        }
      }) : this : this.attr("class", "");
    },
    toggleClass: function (t, n) {
      var e,
        r,
        i,
        o,
        a = typeof t,
        s = "string" === a || Array.isArray(t);
      return v(t) ? this.each(function (e) {
        ce(this).toggleClass(t.call(this, e, Ct(this), n), n);
      }) : "boolean" == typeof n && s ? n ? this.addClass(t) : this.removeClass(t) : (e = kt(t), this.each(function () {
        if (s) for (o = ce(this), i = 0; i < e.length; i++) r = e[i], o.hasClass(r) ? o.removeClass(r) : o.addClass(r);else void 0 !== t && "boolean" !== a || ((r = Ct(this)) && _.set(this, "__className__", r), this.setAttribute && this.setAttribute("class", r || !1 === t ? "" : _.get(this, "__className__") || ""));
      }));
    },
    hasClass: function (e) {
      var t,
        n,
        r = 0;
      t = " " + e + " ";
      while (n = this[r++]) if (1 === n.nodeType && -1 < (" " + Tt(Ct(n)) + " ").indexOf(t)) return !0;
      return !1;
    }
  });
  var St = /\r/g;
  ce.fn.extend({
    val: function (n) {
      var r,
        e,
        i,
        t = this[0];
      return arguments.length ? (i = v(n), this.each(function (e) {
        var t;
        1 === this.nodeType && (null == (t = i ? n.call(this, e, ce(this).val()) : n) ? t = "" : "number" == typeof t ? t += "" : Array.isArray(t) && (t = ce.map(t, function (e) {
          return null == e ? "" : e + "";
        })), (r = ce.valHooks[this.type] || ce.valHooks[this.nodeName.toLowerCase()]) && "set" in r && void 0 !== r.set(this, t, "value") || (this.value = t));
      })) : t ? (r = ce.valHooks[t.type] || ce.valHooks[t.nodeName.toLowerCase()]) && "get" in r && void 0 !== (e = r.get(t, "value")) ? e : "string" == typeof (e = t.value) ? e.replace(St, "") : null == e ? "" : e : void 0;
    }
  }), ce.extend({
    valHooks: {
      option: {
        get: function (e) {
          var t = ce.find.attr(e, "value");
          return null != t ? t : Tt(ce.text(e));
        }
      },
      select: {
        get: function (e) {
          var t,
            n,
            r,
            i = e.options,
            o = e.selectedIndex,
            a = "select-one" === e.type,
            s = a ? null : [],
            u = a ? o + 1 : i.length;
          for (r = o < 0 ? u : a ? o : 0; r < u; r++) if (((n = i[r]).selected || r === o) && !n.disabled && (!n.parentNode.disabled || !fe(n.parentNode, "optgroup"))) {
            if (t = ce(n).val(), a) return t;
            s.push(t);
          }
          return s;
        },
        set: function (e, t) {
          var n,
            r,
            i = e.options,
            o = ce.makeArray(t),
            a = i.length;
          while (a--) ((r = i[a]).selected = -1 < ce.inArray(ce.valHooks.option.get(r), o)) && (n = !0);
          return n || (e.selectedIndex = -1), o;
        }
      }
    }
  }), ce.each(["radio", "checkbox"], function () {
    ce.valHooks[this] = {
      set: function (e, t) {
        if (Array.isArray(t)) return e.checked = -1 < ce.inArray(ce(e).val(), t);
      }
    }, le.checkOn || (ce.valHooks[this].get = function (e) {
      return null === e.getAttribute("value") ? "on" : e.value;
    });
  });
  var Et = ie.location,
    jt = {
      guid: Date.now()
    },
    At = /\?/;
  ce.parseXML = function (e) {
    var t, n;
    if (!e || "string" != typeof e) return null;
    try {
      t = new ie.DOMParser().parseFromString(e, "text/xml");
    } catch (e) {}
    return n = t && t.getElementsByTagName("parsererror")[0], t && !n || ce.error("Invalid XML: " + (n ? ce.map(n.childNodes, function (e) {
      return e.textContent;
    }).join("\n") : e)), t;
  };
  var Dt = /^(?:focusinfocus|focusoutblur)$/,
    Nt = function (e) {
      e.stopPropagation();
    };
  ce.extend(ce.event, {
    trigger: function (e, t, n, r) {
      var i,
        o,
        a,
        s,
        u,
        l,
        c,
        f,
        p = [n || C],
        d = ue.call(e, "type") ? e.type : e,
        h = ue.call(e, "namespace") ? e.namespace.split(".") : [];
      if (o = f = a = n = n || C, 3 !== n.nodeType && 8 !== n.nodeType && !Dt.test(d + ce.event.triggered) && (-1 < d.indexOf(".") && (d = (h = d.split(".")).shift(), h.sort()), u = d.indexOf(":") < 0 && "on" + d, (e = e[ce.expando] ? e : new ce.Event(d, "object" == typeof e && e)).isTrigger = r ? 2 : 3, e.namespace = h.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = n), t = null == t ? [e] : ce.makeArray(t, [e]), c = ce.event.special[d] || {}, r || !c.trigger || !1 !== c.trigger.apply(n, t))) {
        if (!r && !c.noBubble && !y(n)) {
          for (s = c.delegateType || d, Dt.test(s + d) || (o = o.parentNode); o; o = o.parentNode) p.push(o), a = o;
          a === (n.ownerDocument || C) && p.push(a.defaultView || a.parentWindow || ie);
        }
        i = 0;
        while ((o = p[i++]) && !e.isPropagationStopped()) f = o, e.type = 1 < i ? s : c.bindType || d, (l = (_.get(o, "events") || Object.create(null))[e.type] && _.get(o, "handle")) && l.apply(o, t), (l = u && o[u]) && l.apply && $(o) && (e.result = l.apply(o, t), !1 === e.result && e.preventDefault());
        return e.type = d, r || e.isDefaultPrevented() || c._default && !1 !== c._default.apply(p.pop(), t) || !$(n) || u && v(n[d]) && !y(n) && ((a = n[u]) && (n[u] = null), ce.event.triggered = d, e.isPropagationStopped() && f.addEventListener(d, Nt), n[d](), e.isPropagationStopped() && f.removeEventListener(d, Nt), ce.event.triggered = void 0, a && (n[u] = a)), e.result;
      }
    },
    simulate: function (e, t, n) {
      var r = ce.extend(new ce.Event(), n, {
        type: e,
        isSimulated: !0
      });
      ce.event.trigger(r, null, t);
    }
  }), ce.fn.extend({
    trigger: function (e, t) {
      return this.each(function () {
        ce.event.trigger(e, t, this);
      });
    },
    triggerHandler: function (e, t) {
      var n = this[0];
      if (n) return ce.event.trigger(e, t, n, !0);
    }
  });
  var qt = /\[\]$/,
    Lt = /\r?\n/g,
    Ht = /^(?:submit|button|image|reset|file)$/i,
    Ot = /^(?:input|select|textarea|keygen)/i;
  function Pt(n, e, r, i) {
    var t;
    if (Array.isArray(e)) ce.each(e, function (e, t) {
      r || qt.test(n) ? i(n, t) : Pt(n + "[" + ("object" == typeof t && null != t ? e : "") + "]", t, r, i);
    });else if (r || "object" !== x(e)) i(n, e);else for (t in e) Pt(n + "[" + t + "]", e[t], r, i);
  }
  ce.param = function (e, t) {
    var n,
      r = [],
      i = function (e, t) {
        var n = v(t) ? t() : t;
        r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n);
      };
    if (null == e) return "";
    if (Array.isArray(e) || e.jquery && !ce.isPlainObject(e)) ce.each(e, function () {
      i(this.name, this.value);
    });else for (n in e) Pt(n, e[n], t, i);
    return r.join("&");
  }, ce.fn.extend({
    serialize: function () {
      return ce.param(this.serializeArray());
    },
    serializeArray: function () {
      return this.map(function () {
        var e = ce.prop(this, "elements");
        return e ? ce.makeArray(e) : this;
      }).filter(function () {
        var e = this.type;
        return this.name && !ce(this).is(":disabled") && Ot.test(this.nodeName) && !Ht.test(e) && (this.checked || !we.test(e));
      }).map(function (e, t) {
        var n = ce(this).val();
        return null == n ? null : Array.isArray(n) ? ce.map(n, function (e) {
          return {
            name: t.name,
            value: e.replace(Lt, "\r\n")
          };
        }) : {
          name: t.name,
          value: n.replace(Lt, "\r\n")
        };
      }).get();
    }
  });
  var Mt = /%20/g,
    Rt = /#.*$/,
    It = /([?&])_=[^&]*/,
    Wt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
    Ft = /^(?:GET|HEAD)$/,
    $t = /^\/\//,
    Bt = {},
    _t = {},
    zt = "*/".concat("*"),
    Xt = C.createElement("a");
  function Ut(o) {
    return function (e, t) {
      "string" != typeof e && (t = e, e = "*");
      var n,
        r = 0,
        i = e.toLowerCase().match(D) || [];
      if (v(t)) while (n = i[r++]) "+" === n[0] ? (n = n.slice(1) || "*", (o[n] = o[n] || []).unshift(t)) : (o[n] = o[n] || []).push(t);
    };
  }
  function Vt(t, i, o, a) {
    var s = {},
      u = t === _t;
    function l(e) {
      var r;
      return s[e] = !0, ce.each(t[e] || [], function (e, t) {
        var n = t(i, o, a);
        return "string" != typeof n || u || s[n] ? u ? !(r = n) : void 0 : (i.dataTypes.unshift(n), l(n), !1);
      }), r;
    }
    return l(i.dataTypes[0]) || !s["*"] && l("*");
  }
  function Gt(e, t) {
    var n,
      r,
      i = ce.ajaxSettings.flatOptions || {};
    for (n in t) void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
    return r && ce.extend(!0, e, r), e;
  }
  Xt.href = Et.href, ce.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: Et.href,
      type: "GET",
      isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Et.protocol),
      global: !0,
      processData: !0,
      async: !0,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": zt,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {
        xml: /\bxml\b/,
        html: /\bhtml/,
        json: /\bjson\b/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },
      converters: {
        "* text": String,
        "text html": !0,
        "text json": JSON.parse,
        "text xml": ce.parseXML
      },
      flatOptions: {
        url: !0,
        context: !0
      }
    },
    ajaxSetup: function (e, t) {
      return t ? Gt(Gt(e, ce.ajaxSettings), t) : Gt(ce.ajaxSettings, e);
    },
    ajaxPrefilter: Ut(Bt),
    ajaxTransport: Ut(_t),
    ajax: function (e, t) {
      "object" == typeof e && (t = e, e = void 0), t = t || {};
      var c,
        f,
        p,
        n,
        d,
        r,
        h,
        g,
        i,
        o,
        v = ce.ajaxSetup({}, t),
        y = v.context || v,
        m = v.context && (y.nodeType || y.jquery) ? ce(y) : ce.event,
        x = ce.Deferred(),
        b = ce.Callbacks("once memory"),
        w = v.statusCode || {},
        a = {},
        s = {},
        u = "canceled",
        T = {
          readyState: 0,
          getResponseHeader: function (e) {
            var t;
            if (h) {
              if (!n) {
                n = {};
                while (t = Wt.exec(p)) n[t[1].toLowerCase() + " "] = (n[t[1].toLowerCase() + " "] || []).concat(t[2]);
              }
              t = n[e.toLowerCase() + " "];
            }
            return null == t ? null : t.join(", ");
          },
          getAllResponseHeaders: function () {
            return h ? p : null;
          },
          setRequestHeader: function (e, t) {
            return null == h && (e = s[e.toLowerCase()] = s[e.toLowerCase()] || e, a[e] = t), this;
          },
          overrideMimeType: function (e) {
            return null == h && (v.mimeType = e), this;
          },
          statusCode: function (e) {
            var t;
            if (e) if (h) T.always(e[T.status]);else for (t in e) w[t] = [w[t], e[t]];
            return this;
          },
          abort: function (e) {
            var t = e || u;
            return c && c.abort(t), l(0, t), this;
          }
        };
      if (x.promise(T), v.url = ((e || v.url || Et.href) + "").replace($t, Et.protocol + "//"), v.type = t.method || t.type || v.method || v.type, v.dataTypes = (v.dataType || "*").toLowerCase().match(D) || [""], null == v.crossDomain) {
        r = C.createElement("a");
        try {
          r.href = v.url, r.href = r.href, v.crossDomain = Xt.protocol + "//" + Xt.host != r.protocol + "//" + r.host;
        } catch (e) {
          v.crossDomain = !0;
        }
      }
      if (v.data && v.processData && "string" != typeof v.data && (v.data = ce.param(v.data, v.traditional)), Vt(Bt, v, t, T), h) return T;
      for (i in (g = ce.event && v.global) && 0 == ce.active++ && ce.event.trigger("ajaxStart"), v.type = v.type.toUpperCase(), v.hasContent = !Ft.test(v.type), f = v.url.replace(Rt, ""), v.hasContent ? v.data && v.processData && 0 === (v.contentType || "").indexOf("application/x-www-form-urlencoded") && (v.data = v.data.replace(Mt, "+")) : (o = v.url.slice(f.length), v.data && (v.processData || "string" == typeof v.data) && (f += (At.test(f) ? "&" : "?") + v.data, delete v.data), !1 === v.cache && (f = f.replace(It, "$1"), o = (At.test(f) ? "&" : "?") + "_=" + jt.guid++ + o), v.url = f + o), v.ifModified && (ce.lastModified[f] && T.setRequestHeader("If-Modified-Since", ce.lastModified[f]), ce.etag[f] && T.setRequestHeader("If-None-Match", ce.etag[f])), (v.data && v.hasContent && !1 !== v.contentType || t.contentType) && T.setRequestHeader("Content-Type", v.contentType), T.setRequestHeader("Accept", v.dataTypes[0] && v.accepts[v.dataTypes[0]] ? v.accepts[v.dataTypes[0]] + ("*" !== v.dataTypes[0] ? ", " + zt + "; q=0.01" : "") : v.accepts["*"]), v.headers) T.setRequestHeader(i, v.headers[i]);
      if (v.beforeSend && (!1 === v.beforeSend.call(y, T, v) || h)) return T.abort();
      if (u = "abort", b.add(v.complete), T.done(v.success), T.fail(v.error), c = Vt(_t, v, t, T)) {
        if (T.readyState = 1, g && m.trigger("ajaxSend", [T, v]), h) return T;
        v.async && 0 < v.timeout && (d = ie.setTimeout(function () {
          T.abort("timeout");
        }, v.timeout));
        try {
          h = !1, c.send(a, l);
        } catch (e) {
          if (h) throw e;
          l(-1, e);
        }
      } else l(-1, "No Transport");
      function l(e, t, n, r) {
        var i,
          o,
          a,
          s,
          u,
          l = t;
        h || (h = !0, d && ie.clearTimeout(d), c = void 0, p = r || "", T.readyState = 0 < e ? 4 : 0, i = 200 <= e && e < 300 || 304 === e, n && (s = function (e, t, n) {
          var r,
            i,
            o,
            a,
            s = e.contents,
            u = e.dataTypes;
          while ("*" === u[0]) u.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
          if (r) for (i in s) if (s[i] && s[i].test(r)) {
            u.unshift(i);
            break;
          }
          if (u[0] in n) o = u[0];else {
            for (i in n) {
              if (!u[0] || e.converters[i + " " + u[0]]) {
                o = i;
                break;
              }
              a || (a = i);
            }
            o = o || a;
          }
          if (o) return o !== u[0] && u.unshift(o), n[o];
        }(v, T, n)), !i && -1 < ce.inArray("script", v.dataTypes) && ce.inArray("json", v.dataTypes) < 0 && (v.converters["text script"] = function () {}), s = function (e, t, n, r) {
          var i,
            o,
            a,
            s,
            u,
            l = {},
            c = e.dataTypes.slice();
          if (c[1]) for (a in e.converters) l[a.toLowerCase()] = e.converters[a];
          o = c.shift();
          while (o) if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift()) if ("*" === o) o = u;else if ("*" !== u && u !== o) {
            if (!(a = l[u + " " + o] || l["* " + o])) for (i in l) if ((s = i.split(" "))[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
              !0 === a ? a = l[i] : !0 !== l[i] && (o = s[0], c.unshift(s[1]));
              break;
            }
            if (!0 !== a) if (a && e["throws"]) t = a(t);else try {
              t = a(t);
            } catch (e) {
              return {
                state: "parsererror",
                error: a ? e : "No conversion from " + u + " to " + o
              };
            }
          }
          return {
            state: "success",
            data: t
          };
        }(v, s, T, i), i ? (v.ifModified && ((u = T.getResponseHeader("Last-Modified")) && (ce.lastModified[f] = u), (u = T.getResponseHeader("etag")) && (ce.etag[f] = u)), 204 === e || "HEAD" === v.type ? l = "nocontent" : 304 === e ? l = "notmodified" : (l = s.state, o = s.data, i = !(a = s.error))) : (a = l, !e && l || (l = "error", e < 0 && (e = 0))), T.status = e, T.statusText = (t || l) + "", i ? x.resolveWith(y, [o, l, T]) : x.rejectWith(y, [T, l, a]), T.statusCode(w), w = void 0, g && m.trigger(i ? "ajaxSuccess" : "ajaxError", [T, v, i ? o : a]), b.fireWith(y, [T, l]), g && (m.trigger("ajaxComplete", [T, v]), --ce.active || ce.event.trigger("ajaxStop")));
      }
      return T;
    },
    getJSON: function (e, t, n) {
      return ce.get(e, t, n, "json");
    },
    getScript: function (e, t) {
      return ce.get(e, void 0, t, "script");
    }
  }), ce.each(["get", "post"], function (e, i) {
    ce[i] = function (e, t, n, r) {
      return v(t) && (r = r || n, n = t, t = void 0), ce.ajax(ce.extend({
        url: e,
        type: i,
        dataType: r,
        data: t,
        success: n
      }, ce.isPlainObject(e) && e));
    };
  }), ce.ajaxPrefilter(function (e) {
    var t;
    for (t in e.headers) "content-type" === t.toLowerCase() && (e.contentType = e.headers[t] || "");
  }), ce._evalUrl = function (e, t, n) {
    return ce.ajax({
      url: e,
      type: "GET",
      dataType: "script",
      cache: !0,
      async: !1,
      global: !1,
      converters: {
        "text script": function () {}
      },
      dataFilter: function (e) {
        ce.globalEval(e, t, n);
      }
    });
  }, ce.fn.extend({
    wrapAll: function (e) {
      var t;
      return this[0] && (v(e) && (e = e.call(this[0])), t = ce(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
        var e = this;
        while (e.firstElementChild) e = e.firstElementChild;
        return e;
      }).append(this)), this;
    },
    wrapInner: function (n) {
      return v(n) ? this.each(function (e) {
        ce(this).wrapInner(n.call(this, e));
      }) : this.each(function () {
        var e = ce(this),
          t = e.contents();
        t.length ? t.wrapAll(n) : e.append(n);
      });
    },
    wrap: function (t) {
      var n = v(t);
      return this.each(function (e) {
        ce(this).wrapAll(n ? t.call(this, e) : t);
      });
    },
    unwrap: function (e) {
      return this.parent(e).not("body").each(function () {
        ce(this).replaceWith(this.childNodes);
      }), this;
    }
  }), ce.expr.pseudos.hidden = function (e) {
    return !ce.expr.pseudos.visible(e);
  }, ce.expr.pseudos.visible = function (e) {
    return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
  }, ce.ajaxSettings.xhr = function () {
    try {
      return new ie.XMLHttpRequest();
    } catch (e) {}
  };
  var Yt = {
      0: 200,
      1223: 204
    },
    Qt = ce.ajaxSettings.xhr();
  le.cors = !!Qt && "withCredentials" in Qt, le.ajax = Qt = !!Qt, ce.ajaxTransport(function (i) {
    var o, a;
    if (le.cors || Qt && !i.crossDomain) return {
      send: function (e, t) {
        var n,
          r = i.xhr();
        if (r.open(i.type, i.url, i.async, i.username, i.password), i.xhrFields) for (n in i.xhrFields) r[n] = i.xhrFields[n];
        for (n in i.mimeType && r.overrideMimeType && r.overrideMimeType(i.mimeType), i.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest"), e) r.setRequestHeader(n, e[n]);
        o = function (e) {
          return function () {
            o && (o = a = r.onload = r.onerror = r.onabort = r.ontimeout = r.onreadystatechange = null, "abort" === e ? r.abort() : "error" === e ? "number" != typeof r.status ? t(0, "error") : t(r.status, r.statusText) : t(Yt[r.status] || r.status, r.statusText, "text" !== (r.responseType || "text") || "string" != typeof r.responseText ? {
              binary: r.response
            } : {
              text: r.responseText
            }, r.getAllResponseHeaders()));
          };
        }, r.onload = o(), a = r.onerror = r.ontimeout = o("error"), void 0 !== r.onabort ? r.onabort = a : r.onreadystatechange = function () {
          4 === r.readyState && ie.setTimeout(function () {
            o && a();
          });
        }, o = o("abort");
        try {
          r.send(i.hasContent && i.data || null);
        } catch (e) {
          if (o) throw e;
        }
      },
      abort: function () {
        o && o();
      }
    };
  }), ce.ajaxPrefilter(function (e) {
    e.crossDomain && (e.contents.script = !1);
  }), ce.ajaxSetup({
    accepts: {
      script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    },
    contents: {
      script: /\b(?:java|ecma)script\b/
    },
    converters: {
      "text script": function (e) {
        return ce.globalEval(e), e;
      }
    }
  }), ce.ajaxPrefilter("script", function (e) {
    void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET");
  }), ce.ajaxTransport("script", function (n) {
    var r, i;
    if (n.crossDomain || n.scriptAttrs) return {
      send: function (e, t) {
        r = ce("<script>").attr(n.scriptAttrs || {}).prop({
          charset: n.scriptCharset,
          src: n.url
        }).on("load error", i = function (e) {
          r.remove(), i = null, e && t("error" === e.type ? 404 : 200, e.type);
        }), C.head.appendChild(r[0]);
      },
      abort: function () {
        i && i();
      }
    };
  });
  var Jt,
    Kt = [],
    Zt = /(=)\?(?=&|$)|\?\?/;
  ce.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function () {
      var e = Kt.pop() || ce.expando + "_" + jt.guid++;
      return this[e] = !0, e;
    }
  }), ce.ajaxPrefilter("json jsonp", function (e, t, n) {
    var r,
      i,
      o,
      a = !1 !== e.jsonp && (Zt.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Zt.test(e.data) && "data");
    if (a || "jsonp" === e.dataTypes[0]) return r = e.jsonpCallback = v(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, a ? e[a] = e[a].replace(Zt, "$1" + r) : !1 !== e.jsonp && (e.url += (At.test(e.url) ? "&" : "?") + e.jsonp + "=" + r), e.converters["script json"] = function () {
      return o || ce.error(r + " was not called"), o[0];
    }, e.dataTypes[0] = "json", i = ie[r], ie[r] = function () {
      o = arguments;
    }, n.always(function () {
      void 0 === i ? ce(ie).removeProp(r) : ie[r] = i, e[r] && (e.jsonpCallback = t.jsonpCallback, Kt.push(r)), o && v(i) && i(o[0]), o = i = void 0;
    }), "script";
  }), le.createHTMLDocument = ((Jt = C.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === Jt.childNodes.length), ce.parseHTML = function (e, t, n) {
    return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t, t = !1), t || (le.createHTMLDocument ? ((r = (t = C.implementation.createHTMLDocument("")).createElement("base")).href = C.location.href, t.head.appendChild(r)) : t = C), o = !n && [], (i = w.exec(e)) ? [t.createElement(i[1])] : (i = Ae([e], t, o), o && o.length && ce(o).remove(), ce.merge([], i.childNodes)));
    var r, i, o;
  }, ce.fn.load = function (e, t, n) {
    var r,
      i,
      o,
      a = this,
      s = e.indexOf(" ");
    return -1 < s && (r = Tt(e.slice(s)), e = e.slice(0, s)), v(t) ? (n = t, t = void 0) : t && "object" == typeof t && (i = "POST"), 0 < a.length && ce.ajax({
      url: e,
      type: i || "GET",
      dataType: "html",
      data: t
    }).done(function (e) {
      o = arguments, a.html(r ? ce("<div>").append(ce.parseHTML(e)).find(r) : e);
    }).always(n && function (e, t) {
      a.each(function () {
        n.apply(this, o || [e.responseText, t, e]);
      });
    }), this;
  }, ce.expr.pseudos.animated = function (t) {
    return ce.grep(ce.timers, function (e) {
      return t === e.elem;
    }).length;
  }, ce.offset = {
    setOffset: function (e, t, n) {
      var r,
        i,
        o,
        a,
        s,
        u,
        l = ce.css(e, "position"),
        c = ce(e),
        f = {};
      "static" === l && (e.style.position = "relative"), s = c.offset(), o = ce.css(e, "top"), u = ce.css(e, "left"), ("absolute" === l || "fixed" === l) && -1 < (o + u).indexOf("auto") ? (a = (r = c.position()).top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(u) || 0), v(t) && (t = t.call(e, n, ce.extend({}, s))), null != t.top && (f.top = t.top - s.top + a), null != t.left && (f.left = t.left - s.left + i), "using" in t ? t.using.call(e, f) : c.css(f);
    }
  }, ce.fn.extend({
    offset: function (t) {
      if (arguments.length) return void 0 === t ? this : this.each(function (e) {
        ce.offset.setOffset(this, t, e);
      });
      var e,
        n,
        r = this[0];
      return r ? r.getClientRects().length ? (e = r.getBoundingClientRect(), n = r.ownerDocument.defaultView, {
        top: e.top + n.pageYOffset,
        left: e.left + n.pageXOffset
      }) : {
        top: 0,
        left: 0
      } : void 0;
    },
    position: function () {
      if (this[0]) {
        var e,
          t,
          n,
          r = this[0],
          i = {
            top: 0,
            left: 0
          };
        if ("fixed" === ce.css(r, "position")) t = r.getBoundingClientRect();else {
          t = this.offset(), n = r.ownerDocument, e = r.offsetParent || n.documentElement;
          while (e && (e === n.body || e === n.documentElement) && "static" === ce.css(e, "position")) e = e.parentNode;
          e && e !== r && 1 === e.nodeType && ((i = ce(e).offset()).top += ce.css(e, "borderTopWidth", !0), i.left += ce.css(e, "borderLeftWidth", !0));
        }
        return {
          top: t.top - i.top - ce.css(r, "marginTop", !0),
          left: t.left - i.left - ce.css(r, "marginLeft", !0)
        };
      }
    },
    offsetParent: function () {
      return this.map(function () {
        var e = this.offsetParent;
        while (e && "static" === ce.css(e, "position")) e = e.offsetParent;
        return e || J;
      });
    }
  }), ce.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function (t, i) {
    var o = "pageYOffset" === i;
    ce.fn[t] = function (e) {
      return M(this, function (e, t, n) {
        var r;
        if (y(e) ? r = e : 9 === e.nodeType && (r = e.defaultView), void 0 === n) return r ? r[i] : e[t];
        r ? r.scrollTo(o ? r.pageXOffset : n, o ? n : r.pageYOffset) : e[t] = n;
      }, t, e, arguments.length);
    };
  }), ce.each(["top", "left"], function (e, n) {
    ce.cssHooks[n] = Ye(le.pixelPosition, function (e, t) {
      if (t) return t = Ge(e, n), _e.test(t) ? ce(e).position()[n] + "px" : t;
    });
  }), ce.each({
    Height: "height",
    Width: "width"
  }, function (a, s) {
    ce.each({
      padding: "inner" + a,
      content: s,
      "": "outer" + a
    }, function (r, o) {
      ce.fn[o] = function (e, t) {
        var n = arguments.length && (r || "boolean" != typeof e),
          i = r || (!0 === e || !0 === t ? "margin" : "border");
        return M(this, function (e, t, n) {
          var r;
          return y(e) ? 0 === o.indexOf("outer") ? e["inner" + a] : e.document.documentElement["client" + a] : 9 === e.nodeType ? (r = e.documentElement, Math.max(e.body["scroll" + a], r["scroll" + a], e.body["offset" + a], r["offset" + a], r["client" + a])) : void 0 === n ? ce.css(e, t, i) : ce.style(e, t, n, i);
        }, s, n ? e : void 0, n);
      };
    });
  }), ce.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
    ce.fn[t] = function (e) {
      return this.on(t, e);
    };
  }), ce.fn.extend({
    bind: function (e, t, n) {
      return this.on(e, null, t, n);
    },
    unbind: function (e, t) {
      return this.off(e, null, t);
    },
    delegate: function (e, t, n, r) {
      return this.on(t, e, n, r);
    },
    undelegate: function (e, t, n) {
      return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n);
    },
    hover: function (e, t) {
      return this.on("mouseenter", e).on("mouseleave", t || e);
    }
  }), ce.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (e, n) {
    ce.fn[n] = function (e, t) {
      return 0 < arguments.length ? this.on(n, null, e, t) : this.trigger(n);
    };
  });
  var en = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
  ce.proxy = function (e, t) {
    var n, r, i;
    if ("string" == typeof t && (n = e[t], t = e, e = n), v(e)) return r = ae.call(arguments, 2), (i = function () {
      return e.apply(t || this, r.concat(ae.call(arguments)));
    }).guid = e.guid = e.guid || ce.guid++, i;
  }, ce.holdReady = function (e) {
    e ? ce.readyWait++ : ce.ready(!0);
  }, ce.isArray = Array.isArray, ce.parseJSON = JSON.parse, ce.nodeName = fe, ce.isFunction = v, ce.isWindow = y, ce.camelCase = F, ce.type = x, ce.now = Date.now, ce.isNumeric = function (e) {
    var t = ce.type(e);
    return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e));
  }, ce.trim = function (e) {
    return null == e ? "" : (e + "").replace(en, "$1");
  }, "function" == typeof define && define.amd && define("jquery", [], function () {
    return ce;
  });
  var tn = ie.jQuery,
    nn = ie.$;
  return ce.noConflict = function (e) {
    return ie.$ === ce && (ie.$ = nn), e && ie.jQuery === ce && (ie.jQuery = tn), ce;
  }, "undefined" == typeof e && (ie.jQuery = ie.$ = ce), ce;
});
/*! npm.im/object-fit-images 3.2.4 */
var objectFitImages = function () {
  'use strict';

  var OFI = 'bfred-it:object-fit-images';
  var propRegex = /(object-fit|object-position)\s*:\s*([-.\w\s%]+)/g;
  var testImg = typeof Image === 'undefined' ? {
    style: {
      'object-position': 1
    }
  } : new Image();
  var supportsObjectFit = 'object-fit' in testImg.style;
  var supportsObjectPosition = 'object-position' in testImg.style;
  var supportsOFI = 'background-size' in testImg.style;
  var supportsCurrentSrc = typeof testImg.currentSrc === 'string';
  var nativeGetAttribute = testImg.getAttribute;
  var nativeSetAttribute = testImg.setAttribute;
  var autoModeEnabled = false;
  function createPlaceholder(w, h) {
    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" + w + "' height='" + h + "'%3E%3C/svg%3E";
  }
  function polyfillCurrentSrc(el) {
    if (el.srcset && !supportsCurrentSrc && window.picturefill) {
      var pf = window.picturefill._;
      // parse srcset with picturefill where currentSrc isn't available
      if (!el[pf.ns] || !el[pf.ns].evaled) {
        // force synchronous srcset parsing
        pf.fillImg(el, {
          reselect: true
        });
      }
      if (!el[pf.ns].curSrc) {
        // force picturefill to parse srcset
        el[pf.ns].supported = false;
        pf.fillImg(el, {
          reselect: true
        });
      }

      // retrieve parsed currentSrc, if any
      el.currentSrc = el[pf.ns].curSrc || el.src;
    }
  }
  function getStyle(el) {
    var style = getComputedStyle(el).fontFamily;
    var parsed;
    var props = {};
    while ((parsed = propRegex.exec(style)) !== null) {
      props[parsed[1]] = parsed[2];
    }
    return props;
  }
  function setPlaceholder(img, width, height) {
    // Default: fill width, no height
    var placeholder = createPlaceholder(width || 1, height || 0);

    // Only set placeholder if it's different
    if (nativeGetAttribute.call(img, 'src') !== placeholder) {
      nativeSetAttribute.call(img, 'src', placeholder);
    }
  }
  function onImageReady(img, callback) {
    // naturalWidth is only available when the image headers are loaded,
    // this loop will poll it every 100ms.
    if (img.naturalWidth) {
      callback(img);
    } else {
      setTimeout(onImageReady, 100, img, callback);
    }
  }
  function fixOne(el) {
    var style = getStyle(el);
    var ofi = el[OFI];
    style['object-fit'] = style['object-fit'] || 'fill'; // default value

    // Avoid running where unnecessary, unless OFI had already done its deed
    if (!ofi.img) {
      // fill is the default behavior so no action is necessary
      if (style['object-fit'] === 'fill') {
        return;
      }

      // Where object-fit is supported and object-position isn't (Safari < 10)
      if (!ofi.skipTest &&
      // unless user wants to apply regardless of browser support
      supportsObjectFit &&
      // if browser already supports object-fit
      !style['object-position'] // unless object-position is used
      ) {
        return;
      }
    }

    // keep a clone in memory while resetting the original to a blank
    if (!ofi.img) {
      ofi.img = new Image(el.width, el.height);
      ofi.img.srcset = nativeGetAttribute.call(el, "data-ofi-srcset") || el.srcset;
      ofi.img.src = nativeGetAttribute.call(el, "data-ofi-src") || el.src;

      // preserve for any future cloneNode calls
      // https://github.com/bfred-it/object-fit-images/issues/53
      nativeSetAttribute.call(el, "data-ofi-src", el.src);
      if (el.srcset) {
        nativeSetAttribute.call(el, "data-ofi-srcset", el.srcset);
      }
      setPlaceholder(el, el.naturalWidth || el.width, el.naturalHeight || el.height);

      // remove srcset because it overrides src
      if (el.srcset) {
        el.srcset = '';
      }
      try {
        keepSrcUsable(el);
      } catch (err) {
        if (window.console) {
          console.warn('https://bit.ly/ofi-old-browser');
        }
      }
    }
    polyfillCurrentSrc(ofi.img);
    el.style.backgroundImage = "url(\"" + (ofi.img.currentSrc || ofi.img.src).replace(/"/g, '\\"') + "\")";
    el.style.backgroundPosition = style['object-position'] || 'center';
    el.style.backgroundRepeat = 'no-repeat';
    el.style.backgroundOrigin = 'content-box';
    if (/scale-down/.test(style['object-fit'])) {
      onImageReady(ofi.img, function () {
        if (ofi.img.naturalWidth > el.width || ofi.img.naturalHeight > el.height) {
          el.style.backgroundSize = 'contain';
        } else {
          el.style.backgroundSize = 'auto';
        }
      });
    } else {
      el.style.backgroundSize = style['object-fit'].replace('none', 'auto').replace('fill', '100% 100%');
    }
    onImageReady(ofi.img, function (img) {
      setPlaceholder(el, img.naturalWidth, img.naturalHeight);
    });
  }
  function keepSrcUsable(el) {
    var descriptors = {
      get: function get(prop) {
        return el[OFI].img[prop ? prop : 'src'];
      },
      set: function set(value, prop) {
        el[OFI].img[prop ? prop : 'src'] = value;
        nativeSetAttribute.call(el, "data-ofi-" + prop, value); // preserve for any future cloneNode
        fixOne(el);
        return value;
      }
    };
    Object.defineProperty(el, 'src', descriptors);
    Object.defineProperty(el, 'currentSrc', {
      get: function () {
        return descriptors.get('currentSrc');
      }
    });
    Object.defineProperty(el, 'srcset', {
      get: function () {
        return descriptors.get('srcset');
      },
      set: function (ss) {
        return descriptors.set(ss, 'srcset');
      }
    });
  }
  function hijackAttributes() {
    function getOfiImageMaybe(el, name) {
      return el[OFI] && el[OFI].img && (name === 'src' || name === 'srcset') ? el[OFI].img : el;
    }
    if (!supportsObjectPosition) {
      HTMLImageElement.prototype.getAttribute = function (name) {
        return nativeGetAttribute.call(getOfiImageMaybe(this, name), name);
      };
      HTMLImageElement.prototype.setAttribute = function (name, value) {
        return nativeSetAttribute.call(getOfiImageMaybe(this, name), name, String(value));
      };
    }
  }
  function fix(imgs, opts) {
    var startAutoMode = !autoModeEnabled && !imgs;
    opts = opts || {};
    imgs = imgs || 'img';
    if (supportsObjectPosition && !opts.skipTest || !supportsOFI) {
      return false;
    }

    // use imgs as a selector or just select all images
    if (imgs === 'img') {
      imgs = document.getElementsByTagName('img');
    } else if (typeof imgs === 'string') {
      imgs = document.querySelectorAll(imgs);
    } else if (!('length' in imgs)) {
      imgs = [imgs];
    }

    // apply fix to all
    for (var i = 0; i < imgs.length; i++) {
      imgs[i][OFI] = imgs[i][OFI] || {
        skipTest: opts.skipTest
      };
      fixOne(imgs[i]);
    }
    if (startAutoMode) {
      document.body.addEventListener('load', function (e) {
        if (e.target.tagName === 'IMG') {
          fix(e.target, {
            skipTest: opts.skipTest
          });
        }
      }, true);
      autoModeEnabled = true;
      imgs = 'img'; // reset to a generic selector for watchMQ
    }

    // if requested, watch media queries for object-fit change
    if (opts.watchMQ) {
      window.addEventListener('resize', fix.bind(null, imgs, {
        skipTest: opts.skipTest
      }));
    }
  }
  fix.supportsObjectFit = supportsObjectFit;
  fix.supportsObjectPosition = supportsObjectPosition;
  hijackAttributes();
  return fix;
}();
/*!
  * Bootstrap v4.6.2 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
!function (t, e) {
  "object" == typeof exports && "undefined" != typeof module ? e(exports, require("jquery")) : "function" == typeof define && define.amd ? define(["exports", "jquery"], e) : e((t = "undefined" != typeof globalThis ? globalThis : t || self).bootstrap = {}, t.jQuery);
}(this, function (t, e) {
  "use strict";

  function n(t) {
    return t && "object" == typeof t && "default" in t ? t : {
      default: t
    };
  }
  var i = n(e);
  function o(t, e) {
    for (var n = 0; n < e.length; n++) {
      var i = e[n];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
    }
  }
  function r(t, e, n) {
    return e && o(t.prototype, e), n && o(t, n), Object.defineProperty(t, "prototype", {
      writable: !1
    }), t;
  }
  function a() {
    return a = Object.assign ? Object.assign.bind() : function (t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];
        for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
      }
      return t;
    }, a.apply(this, arguments);
  }
  function s(t, e) {
    return s = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
      return t.__proto__ = e, t;
    }, s(t, e);
  }
  var l = "transitionend";
  var u = {
    TRANSITION_END: "bsTransitionEnd",
    getUID: function (t) {
      do {
        t += ~~(1e6 * Math.random());
      } while (document.getElementById(t));
      return t;
    },
    getSelectorFromElement: function (t) {
      var e = t.getAttribute("data-target");
      if (!e || "#" === e) {
        var n = t.getAttribute("href");
        e = n && "#" !== n ? n.trim() : "";
      }
      try {
        return document.querySelector(e) ? e : null;
      } catch (t) {
        return null;
      }
    },
    getTransitionDurationFromElement: function (t) {
      if (!t) return 0;
      var e = i.default(t).css("transition-duration"),
        n = i.default(t).css("transition-delay"),
        o = parseFloat(e),
        r = parseFloat(n);
      return o || r ? (e = e.split(",")[0], n = n.split(",")[0], 1e3 * (parseFloat(e) + parseFloat(n))) : 0;
    },
    reflow: function (t) {
      return t.offsetHeight;
    },
    triggerTransitionEnd: function (t) {
      i.default(t).trigger(l);
    },
    supportsTransitionEnd: function () {
      return Boolean(l);
    },
    isElement: function (t) {
      return (t[0] || t).nodeType;
    },
    typeCheckConfig: function (t, e, n) {
      for (var i in n) if (Object.prototype.hasOwnProperty.call(n, i)) {
        var o = n[i],
          r = e[i],
          a = r && u.isElement(r) ? "element" : null === (s = r) || "undefined" == typeof s ? "" + s : {}.toString.call(s).match(/\s([a-z]+)/i)[1].toLowerCase();
        if (!new RegExp(o).test(a)) throw new Error(t.toUpperCase() + ': Option "' + i + '" provided type "' + a + '" but expected type "' + o + '".');
      }
      var s;
    },
    findShadowRoot: function (t) {
      if (!document.documentElement.attachShadow) return null;
      if ("function" == typeof t.getRootNode) {
        var e = t.getRootNode();
        return e instanceof ShadowRoot ? e : null;
      }
      return t instanceof ShadowRoot ? t : t.parentNode ? u.findShadowRoot(t.parentNode) : null;
    },
    jQueryDetection: function () {
      if ("undefined" == typeof i.default) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
      var t = i.default.fn.jquery.split(" ")[0].split(".");
      if (t[0] < 2 && t[1] < 9 || 1 === t[0] && 9 === t[1] && t[2] < 1 || t[0] >= 4) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0");
    }
  };
  u.jQueryDetection(), i.default.fn.emulateTransitionEnd = function (t) {
    var e = this,
      n = !1;
    return i.default(this).one(u.TRANSITION_END, function () {
      n = !0;
    }), setTimeout(function () {
      n || u.triggerTransitionEnd(e);
    }, t), this;
  }, i.default.event.special[u.TRANSITION_END] = {
    bindType: l,
    delegateType: l,
    handle: function (t) {
      if (i.default(t.target).is(this)) return t.handleObj.handler.apply(this, arguments);
    }
  };
  var f = "bs.alert",
    d = i.default.fn.alert,
    c = function () {
      function t(t) {
        this._element = t;
      }
      var e = t.prototype;
      return e.close = function (t) {
        var e = this._element;
        t && (e = this._getRootElement(t)), this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e);
      }, e.dispose = function () {
        i.default.removeData(this._element, f), this._element = null;
      }, e._getRootElement = function (t) {
        var e = u.getSelectorFromElement(t),
          n = !1;
        return e && (n = document.querySelector(e)), n || (n = i.default(t).closest(".alert")[0]), n;
      }, e._triggerCloseEvent = function (t) {
        var e = i.default.Event("close.bs.alert");
        return i.default(t).trigger(e), e;
      }, e._removeElement = function (t) {
        var e = this;
        if (i.default(t).removeClass("show"), i.default(t).hasClass("fade")) {
          var n = u.getTransitionDurationFromElement(t);
          i.default(t).one(u.TRANSITION_END, function (n) {
            return e._destroyElement(t, n);
          }).emulateTransitionEnd(n);
        } else this._destroyElement(t);
      }, e._destroyElement = function (t) {
        i.default(t).detach().trigger("closed.bs.alert").remove();
      }, t._jQueryInterface = function (e) {
        return this.each(function () {
          var n = i.default(this),
            o = n.data(f);
          o || (o = new t(this), n.data(f, o)), "close" === e && o[e](this);
        });
      }, t._handleDismiss = function (t) {
        return function (e) {
          e && e.preventDefault(), t.close(this);
        };
      }, r(t, null, [{
        key: "VERSION",
        get: function () {
          return "4.6.2";
        }
      }]), t;
    }();
  i.default(document).on("click.bs.alert.data-api", '[data-dismiss="alert"]', c._handleDismiss(new c())), i.default.fn.alert = c._jQueryInterface, i.default.fn.alert.Constructor = c, i.default.fn.alert.noConflict = function () {
    return i.default.fn.alert = d, c._jQueryInterface;
  };
  var h = "bs.button",
    p = i.default.fn.button,
    m = "active",
    g = '[data-toggle^="button"]',
    _ = 'input:not([type="hidden"])',
    v = ".btn",
    b = function () {
      function t(t) {
        this._element = t, this.shouldAvoidTriggerChange = !1;
      }
      var e = t.prototype;
      return e.toggle = function () {
        var t = !0,
          e = !0,
          n = i.default(this._element).closest('[data-toggle="buttons"]')[0];
        if (n) {
          var o = this._element.querySelector(_);
          if (o) {
            if ("radio" === o.type) if (o.checked && this._element.classList.contains(m)) t = !1;else {
              var r = n.querySelector(".active");
              r && i.default(r).removeClass(m);
            }
            t && ("checkbox" !== o.type && "radio" !== o.type || (o.checked = !this._element.classList.contains(m)), this.shouldAvoidTriggerChange || i.default(o).trigger("change")), o.focus(), e = !1;
          }
        }
        this._element.hasAttribute("disabled") || this._element.classList.contains("disabled") || (e && this._element.setAttribute("aria-pressed", !this._element.classList.contains(m)), t && i.default(this._element).toggleClass(m));
      }, e.dispose = function () {
        i.default.removeData(this._element, h), this._element = null;
      }, t._jQueryInterface = function (e, n) {
        return this.each(function () {
          var o = i.default(this),
            r = o.data(h);
          r || (r = new t(this), o.data(h, r)), r.shouldAvoidTriggerChange = n, "toggle" === e && r[e]();
        });
      }, r(t, null, [{
        key: "VERSION",
        get: function () {
          return "4.6.2";
        }
      }]), t;
    }();
  i.default(document).on("click.bs.button.data-api", g, function (t) {
    var e = t.target,
      n = e;
    if (i.default(e).hasClass("btn") || (e = i.default(e).closest(v)[0]), !e || e.hasAttribute("disabled") || e.classList.contains("disabled")) t.preventDefault();else {
      var o = e.querySelector(_);
      if (o && (o.hasAttribute("disabled") || o.classList.contains("disabled"))) return void t.preventDefault();
      "INPUT" !== n.tagName && "LABEL" === e.tagName || b._jQueryInterface.call(i.default(e), "toggle", "INPUT" === n.tagName);
    }
  }).on("focus.bs.button.data-api blur.bs.button.data-api", g, function (t) {
    var e = i.default(t.target).closest(v)[0];
    i.default(e).toggleClass("focus", /^focus(in)?$/.test(t.type));
  }), i.default(window).on("load.bs.button.data-api", function () {
    for (var t = [].slice.call(document.querySelectorAll('[data-toggle="buttons"] .btn')), e = 0, n = t.length; e < n; e++) {
      var i = t[e],
        o = i.querySelector(_);
      o.checked || o.hasAttribute("checked") ? i.classList.add(m) : i.classList.remove(m);
    }
    for (var r = 0, a = (t = [].slice.call(document.querySelectorAll('[data-toggle="button"]'))).length; r < a; r++) {
      var s = t[r];
      "true" === s.getAttribute("aria-pressed") ? s.classList.add(m) : s.classList.remove(m);
    }
  }), i.default.fn.button = b._jQueryInterface, i.default.fn.button.Constructor = b, i.default.fn.button.noConflict = function () {
    return i.default.fn.button = p, b._jQueryInterface;
  };
  var y = "carousel",
    E = "bs.carousel",
    w = i.default.fn[y],
    T = "active",
    C = "next",
    S = "prev",
    N = "slid.bs.carousel",
    D = ".active.carousel-item",
    A = {
      interval: 5e3,
      keyboard: !0,
      slide: !1,
      pause: "hover",
      wrap: !0,
      touch: !0
    },
    k = {
      interval: "(number|boolean)",
      keyboard: "boolean",
      slide: "(boolean|string)",
      pause: "(string|boolean)",
      wrap: "boolean",
      touch: "boolean"
    },
    I = {
      TOUCH: "touch",
      PEN: "pen"
    },
    O = function () {
      function t(t, e) {
        this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(e), this._element = t, this._indicatorsElement = this._element.querySelector(".carousel-indicators"), this._touchSupported = "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0, this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent), this._addEventListeners();
      }
      var e = t.prototype;
      return e.next = function () {
        this._isSliding || this._slide(C);
      }, e.nextWhenVisible = function () {
        var t = i.default(this._element);
        !document.hidden && t.is(":visible") && "hidden" !== t.css("visibility") && this.next();
      }, e.prev = function () {
        this._isSliding || this._slide(S);
      }, e.pause = function (t) {
        t || (this._isPaused = !0), this._element.querySelector(".carousel-item-next, .carousel-item-prev") && (u.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null;
      }, e.cycle = function (t) {
        t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._updateInterval(), this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval));
      }, e.to = function (t) {
        var e = this;
        this._activeElement = this._element.querySelector(D);
        var n = this._getItemIndex(this._activeElement);
        if (!(t > this._items.length - 1 || t < 0)) if (this._isSliding) i.default(this._element).one(N, function () {
          return e.to(t);
        });else {
          if (n === t) return this.pause(), void this.cycle();
          var o = t > n ? C : S;
          this._slide(o, this._items[t]);
        }
      }, e.dispose = function () {
        i.default(this._element).off(".bs.carousel"), i.default.removeData(this._element, E), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null;
      }, e._getConfig = function (t) {
        return t = a({}, A, t), u.typeCheckConfig(y, t, k), t;
      }, e._handleSwipe = function () {
        var t = Math.abs(this.touchDeltaX);
        if (!(t <= 40)) {
          var e = t / this.touchDeltaX;
          this.touchDeltaX = 0, e > 0 && this.prev(), e < 0 && this.next();
        }
      }, e._addEventListeners = function () {
        var t = this;
        this._config.keyboard && i.default(this._element).on("keydown.bs.carousel", function (e) {
          return t._keydown(e);
        }), "hover" === this._config.pause && i.default(this._element).on("mouseenter.bs.carousel", function (e) {
          return t.pause(e);
        }).on("mouseleave.bs.carousel", function (e) {
          return t.cycle(e);
        }), this._config.touch && this._addTouchEventListeners();
      }, e._addTouchEventListeners = function () {
        var t = this;
        if (this._touchSupported) {
          var e = function (e) {
              t._pointerEvent && I[e.originalEvent.pointerType.toUpperCase()] ? t.touchStartX = e.originalEvent.clientX : t._pointerEvent || (t.touchStartX = e.originalEvent.touches[0].clientX);
            },
            n = function (e) {
              t._pointerEvent && I[e.originalEvent.pointerType.toUpperCase()] && (t.touchDeltaX = e.originalEvent.clientX - t.touchStartX), t._handleSwipe(), "hover" === t._config.pause && (t.pause(), t.touchTimeout && clearTimeout(t.touchTimeout), t.touchTimeout = setTimeout(function (e) {
                return t.cycle(e);
              }, 500 + t._config.interval));
            };
          i.default(this._element.querySelectorAll(".carousel-item img")).on("dragstart.bs.carousel", function (t) {
            return t.preventDefault();
          }), this._pointerEvent ? (i.default(this._element).on("pointerdown.bs.carousel", function (t) {
            return e(t);
          }), i.default(this._element).on("pointerup.bs.carousel", function (t) {
            return n(t);
          }), this._element.classList.add("pointer-event")) : (i.default(this._element).on("touchstart.bs.carousel", function (t) {
            return e(t);
          }), i.default(this._element).on("touchmove.bs.carousel", function (e) {
            return function (e) {
              t.touchDeltaX = e.originalEvent.touches && e.originalEvent.touches.length > 1 ? 0 : e.originalEvent.touches[0].clientX - t.touchStartX;
            }(e);
          }), i.default(this._element).on("touchend.bs.carousel", function (t) {
            return n(t);
          }));
        }
      }, e._keydown = function (t) {
        if (!/input|textarea/i.test(t.target.tagName)) switch (t.which) {
          case 37:
            t.preventDefault(), this.prev();
            break;
          case 39:
            t.preventDefault(), this.next();
        }
      }, e._getItemIndex = function (t) {
        return this._items = t && t.parentNode ? [].slice.call(t.parentNode.querySelectorAll(".carousel-item")) : [], this._items.indexOf(t);
      }, e._getItemByDirection = function (t, e) {
        var n = t === C,
          i = t === S,
          o = this._getItemIndex(e),
          r = this._items.length - 1;
        if ((i && 0 === o || n && o === r) && !this._config.wrap) return e;
        var a = (o + (t === S ? -1 : 1)) % this._items.length;
        return -1 === a ? this._items[this._items.length - 1] : this._items[a];
      }, e._triggerSlideEvent = function (t, e) {
        var n = this._getItemIndex(t),
          o = this._getItemIndex(this._element.querySelector(D)),
          r = i.default.Event("slide.bs.carousel", {
            relatedTarget: t,
            direction: e,
            from: o,
            to: n
          });
        return i.default(this._element).trigger(r), r;
      }, e._setActiveIndicatorElement = function (t) {
        if (this._indicatorsElement) {
          var e = [].slice.call(this._indicatorsElement.querySelectorAll(".active"));
          i.default(e).removeClass(T);
          var n = this._indicatorsElement.children[this._getItemIndex(t)];
          n && i.default(n).addClass(T);
        }
      }, e._updateInterval = function () {
        var t = this._activeElement || this._element.querySelector(D);
        if (t) {
          var e = parseInt(t.getAttribute("data-interval"), 10);
          e ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, this._config.interval = e) : this._config.interval = this._config.defaultInterval || this._config.interval;
        }
      }, e._slide = function (t, e) {
        var n,
          o,
          r,
          a = this,
          s = this._element.querySelector(D),
          l = this._getItemIndex(s),
          f = e || s && this._getItemByDirection(t, s),
          d = this._getItemIndex(f),
          c = Boolean(this._interval);
        if (t === C ? (n = "carousel-item-left", o = "carousel-item-next", r = "left") : (n = "carousel-item-right", o = "carousel-item-prev", r = "right"), f && i.default(f).hasClass(T)) this._isSliding = !1;else if (!this._triggerSlideEvent(f, r).isDefaultPrevented() && s && f) {
          this._isSliding = !0, c && this.pause(), this._setActiveIndicatorElement(f), this._activeElement = f;
          var h = i.default.Event(N, {
            relatedTarget: f,
            direction: r,
            from: l,
            to: d
          });
          if (i.default(this._element).hasClass("slide")) {
            i.default(f).addClass(o), u.reflow(f), i.default(s).addClass(n), i.default(f).addClass(n);
            var p = u.getTransitionDurationFromElement(s);
            i.default(s).one(u.TRANSITION_END, function () {
              i.default(f).removeClass(n + " " + o).addClass(T), i.default(s).removeClass("active " + o + " " + n), a._isSliding = !1, setTimeout(function () {
                return i.default(a._element).trigger(h);
              }, 0);
            }).emulateTransitionEnd(p);
          } else i.default(s).removeClass(T), i.default(f).addClass(T), this._isSliding = !1, i.default(this._element).trigger(h);
          c && this.cycle();
        }
      }, t._jQueryInterface = function (e) {
        return this.each(function () {
          var n = i.default(this).data(E),
            o = a({}, A, i.default(this).data());
          "object" == typeof e && (o = a({}, o, e));
          var r = "string" == typeof e ? e : o.slide;
          if (n || (n = new t(this, o), i.default(this).data(E, n)), "number" == typeof e) n.to(e);else if ("string" == typeof r) {
            if ("undefined" == typeof n[r]) throw new TypeError('No method named "' + r + '"');
            n[r]();
          } else o.interval && o.ride && (n.pause(), n.cycle());
        });
      }, t._dataApiClickHandler = function (e) {
        var n = u.getSelectorFromElement(this);
        if (n) {
          var o = i.default(n)[0];
          if (o && i.default(o).hasClass("carousel")) {
            var r = a({}, i.default(o).data(), i.default(this).data()),
              s = this.getAttribute("data-slide-to");
            s && (r.interval = !1), t._jQueryInterface.call(i.default(o), r), s && i.default(o).data(E).to(s), e.preventDefault();
          }
        }
      }, r(t, null, [{
        key: "VERSION",
        get: function () {
          return "4.6.2";
        }
      }, {
        key: "Default",
        get: function () {
          return A;
        }
      }]), t;
    }();
  i.default(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", O._dataApiClickHandler), i.default(window).on("load.bs.carousel.data-api", function () {
    for (var t = [].slice.call(document.querySelectorAll('[data-ride="carousel"]')), e = 0, n = t.length; e < n; e++) {
      var o = i.default(t[e]);
      O._jQueryInterface.call(o, o.data());
    }
  }), i.default.fn[y] = O._jQueryInterface, i.default.fn[y].Constructor = O, i.default.fn[y].noConflict = function () {
    return i.default.fn[y] = w, O._jQueryInterface;
  };
  var x = "collapse",
    j = "bs.collapse",
    L = i.default.fn[x],
    P = "show",
    F = "collapse",
    R = "collapsing",
    B = "collapsed",
    H = "width",
    M = '[data-toggle="collapse"]',
    q = {
      toggle: !0,
      parent: ""
    },
    Q = {
      toggle: "boolean",
      parent: "(string|element)"
    },
    W = function () {
      function t(t, e) {
        this._isTransitioning = !1, this._element = t, this._config = this._getConfig(e), this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]'));
        for (var n = [].slice.call(document.querySelectorAll(M)), i = 0, o = n.length; i < o; i++) {
          var r = n[i],
            a = u.getSelectorFromElement(r),
            s = [].slice.call(document.querySelectorAll(a)).filter(function (e) {
              return e === t;
            });
          null !== a && s.length > 0 && (this._selector = a, this._triggerArray.push(r));
        }
        this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle();
      }
      var e = t.prototype;
      return e.toggle = function () {
        i.default(this._element).hasClass(P) ? this.hide() : this.show();
      }, e.show = function () {
        var e,
          n,
          o = this;
        if (!(this._isTransitioning || i.default(this._element).hasClass(P) || (this._parent && 0 === (e = [].slice.call(this._parent.querySelectorAll(".show, .collapsing")).filter(function (t) {
          return "string" == typeof o._config.parent ? t.getAttribute("data-parent") === o._config.parent : t.classList.contains(F);
        })).length && (e = null), e && (n = i.default(e).not(this._selector).data(j)) && n._isTransitioning))) {
          var r = i.default.Event("show.bs.collapse");
          if (i.default(this._element).trigger(r), !r.isDefaultPrevented()) {
            e && (t._jQueryInterface.call(i.default(e).not(this._selector), "hide"), n || i.default(e).data(j, null));
            var a = this._getDimension();
            i.default(this._element).removeClass(F).addClass(R), this._element.style[a] = 0, this._triggerArray.length && i.default(this._triggerArray).removeClass(B).attr("aria-expanded", !0), this.setTransitioning(!0);
            var s = "scroll" + (a[0].toUpperCase() + a.slice(1)),
              l = u.getTransitionDurationFromElement(this._element);
            i.default(this._element).one(u.TRANSITION_END, function () {
              i.default(o._element).removeClass(R).addClass("collapse show"), o._element.style[a] = "", o.setTransitioning(!1), i.default(o._element).trigger("shown.bs.collapse");
            }).emulateTransitionEnd(l), this._element.style[a] = this._element[s] + "px";
          }
        }
      }, e.hide = function () {
        var t = this;
        if (!this._isTransitioning && i.default(this._element).hasClass(P)) {
          var e = i.default.Event("hide.bs.collapse");
          if (i.default(this._element).trigger(e), !e.isDefaultPrevented()) {
            var n = this._getDimension();
            this._element.style[n] = this._element.getBoundingClientRect()[n] + "px", u.reflow(this._element), i.default(this._element).addClass(R).removeClass("collapse show");
            var o = this._triggerArray.length;
            if (o > 0) for (var r = 0; r < o; r++) {
              var a = this._triggerArray[r],
                s = u.getSelectorFromElement(a);
              null !== s && (i.default([].slice.call(document.querySelectorAll(s))).hasClass(P) || i.default(a).addClass(B).attr("aria-expanded", !1));
            }
            this.setTransitioning(!0), this._element.style[n] = "";
            var l = u.getTransitionDurationFromElement(this._element);
            i.default(this._element).one(u.TRANSITION_END, function () {
              t.setTransitioning(!1), i.default(t._element).removeClass(R).addClass(F).trigger("hidden.bs.collapse");
            }).emulateTransitionEnd(l);
          }
        }
      }, e.setTransitioning = function (t) {
        this._isTransitioning = t;
      }, e.dispose = function () {
        i.default.removeData(this._element, j), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null;
      }, e._getConfig = function (t) {
        return (t = a({}, q, t)).toggle = Boolean(t.toggle), u.typeCheckConfig(x, t, Q), t;
      }, e._getDimension = function () {
        return i.default(this._element).hasClass(H) ? H : "height";
      }, e._getParent = function () {
        var e,
          n = this;
        u.isElement(this._config.parent) ? (e = this._config.parent, "undefined" != typeof this._config.parent.jquery && (e = this._config.parent[0])) : e = document.querySelector(this._config.parent);
        var o = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]',
          r = [].slice.call(e.querySelectorAll(o));
        return i.default(r).each(function (e, i) {
          n._addAriaAndCollapsedClass(t._getTargetFromElement(i), [i]);
        }), e;
      }, e._addAriaAndCollapsedClass = function (t, e) {
        var n = i.default(t).hasClass(P);
        e.length && i.default(e).toggleClass(B, !n).attr("aria-expanded", n);
      }, t._getTargetFromElement = function (t) {
        var e = u.getSelectorFromElement(t);
        return e ? document.querySelector(e) : null;
      }, t._jQueryInterface = function (e) {
        return this.each(function () {
          var n = i.default(this),
            o = n.data(j),
            r = a({}, q, n.data(), "object" == typeof e && e ? e : {});
          if (!o && r.toggle && "string" == typeof e && /show|hide/.test(e) && (r.toggle = !1), o || (o = new t(this, r), n.data(j, o)), "string" == typeof e) {
            if ("undefined" == typeof o[e]) throw new TypeError('No method named "' + e + '"');
            o[e]();
          }
        });
      }, r(t, null, [{
        key: "VERSION",
        get: function () {
          return "4.6.2";
        }
      }, {
        key: "Default",
        get: function () {
          return q;
        }
      }]), t;
    }();
  i.default(document).on("click.bs.collapse.data-api", M, function (t) {
    "A" === t.currentTarget.tagName && t.preventDefault();
    var e = i.default(this),
      n = u.getSelectorFromElement(this),
      o = [].slice.call(document.querySelectorAll(n));
    i.default(o).each(function () {
      var t = i.default(this),
        n = t.data(j) ? "toggle" : e.data();
      W._jQueryInterface.call(t, n);
    });
  }), i.default.fn[x] = W._jQueryInterface, i.default.fn[x].Constructor = W, i.default.fn[x].noConflict = function () {
    return i.default.fn[x] = L, W._jQueryInterface;
  };
  var U = "undefined" != typeof window && "undefined" != typeof document && "undefined" != typeof navigator,
    V = function () {
      for (var t = ["Edge", "Trident", "Firefox"], e = 0; e < t.length; e += 1) if (U && navigator.userAgent.indexOf(t[e]) >= 0) return 1;
      return 0;
    }(),
    Y = U && window.Promise ? function (t) {
      var e = !1;
      return function () {
        e || (e = !0, window.Promise.resolve().then(function () {
          e = !1, t();
        }));
      };
    } : function (t) {
      var e = !1;
      return function () {
        e || (e = !0, setTimeout(function () {
          e = !1, t();
        }, V));
      };
    };
  function z(t) {
    return t && "[object Function]" === {}.toString.call(t);
  }
  function K(t, e) {
    if (1 !== t.nodeType) return [];
    var n = t.ownerDocument.defaultView.getComputedStyle(t, null);
    return e ? n[e] : n;
  }
  function X(t) {
    return "HTML" === t.nodeName ? t : t.parentNode || t.host;
  }
  function G(t) {
    if (!t) return document.body;
    switch (t.nodeName) {
      case "HTML":
      case "BODY":
        return t.ownerDocument.body;
      case "#document":
        return t.body;
    }
    var e = K(t),
      n = e.overflow,
      i = e.overflowX,
      o = e.overflowY;
    return /(auto|scroll|overlay)/.test(n + o + i) ? t : G(X(t));
  }
  function $(t) {
    return t && t.referenceNode ? t.referenceNode : t;
  }
  var J = U && !(!window.MSInputMethodContext || !document.documentMode),
    Z = U && /MSIE 10/.test(navigator.userAgent);
  function tt(t) {
    return 11 === t ? J : 10 === t ? Z : J || Z;
  }
  function et(t) {
    if (!t) return document.documentElement;
    for (var e = tt(10) ? document.body : null, n = t.offsetParent || null; n === e && t.nextElementSibling;) n = (t = t.nextElementSibling).offsetParent;
    var i = n && n.nodeName;
    return i && "BODY" !== i && "HTML" !== i ? -1 !== ["TH", "TD", "TABLE"].indexOf(n.nodeName) && "static" === K(n, "position") ? et(n) : n : t ? t.ownerDocument.documentElement : document.documentElement;
  }
  function nt(t) {
    return null !== t.parentNode ? nt(t.parentNode) : t;
  }
  function it(t, e) {
    if (!(t && t.nodeType && e && e.nodeType)) return document.documentElement;
    var n = t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING,
      i = n ? t : e,
      o = n ? e : t,
      r = document.createRange();
    r.setStart(i, 0), r.setEnd(o, 0);
    var a,
      s,
      l = r.commonAncestorContainer;
    if (t !== l && e !== l || i.contains(o)) return "BODY" === (s = (a = l).nodeName) || "HTML" !== s && et(a.firstElementChild) !== a ? et(l) : l;
    var u = nt(t);
    return u.host ? it(u.host, e) : it(t, nt(e).host);
  }
  function ot(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "top",
      n = "top" === e ? "scrollTop" : "scrollLeft",
      i = t.nodeName;
    if ("BODY" === i || "HTML" === i) {
      var o = t.ownerDocument.documentElement,
        r = t.ownerDocument.scrollingElement || o;
      return r[n];
    }
    return t[n];
  }
  function rt(t, e) {
    var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
      i = ot(e, "top"),
      o = ot(e, "left"),
      r = n ? -1 : 1;
    return t.top += i * r, t.bottom += i * r, t.left += o * r, t.right += o * r, t;
  }
  function at(t, e) {
    var n = "x" === e ? "Left" : "Top",
      i = "Left" === n ? "Right" : "Bottom";
    return parseFloat(t["border" + n + "Width"]) + parseFloat(t["border" + i + "Width"]);
  }
  function st(t, e, n, i) {
    return Math.max(e["offset" + t], e["scroll" + t], n["client" + t], n["offset" + t], n["scroll" + t], tt(10) ? parseInt(n["offset" + t]) + parseInt(i["margin" + ("Height" === t ? "Top" : "Left")]) + parseInt(i["margin" + ("Height" === t ? "Bottom" : "Right")]) : 0);
  }
  function lt(t) {
    var e = t.body,
      n = t.documentElement,
      i = tt(10) && getComputedStyle(n);
    return {
      height: st("Height", e, n, i),
      width: st("Width", e, n, i)
    };
  }
  var ut = function (t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    },
    ft = function () {
      function t(t, e) {
        for (var n = 0; n < e.length; n++) {
          var i = e[n];
          i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
        }
      }
      return function (e, n, i) {
        return n && t(e.prototype, n), i && t(e, i), e;
      };
    }(),
    dt = function (t, e, n) {
      return e in t ? Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : t[e] = n, t;
    },
    ct = Object.assign || function (t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];
        for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
      }
      return t;
    };
  function ht(t) {
    return ct({}, t, {
      right: t.left + t.width,
      bottom: t.top + t.height
    });
  }
  function pt(t) {
    var e = {};
    try {
      if (tt(10)) {
        e = t.getBoundingClientRect();
        var n = ot(t, "top"),
          i = ot(t, "left");
        e.top += n, e.left += i, e.bottom += n, e.right += i;
      } else e = t.getBoundingClientRect();
    } catch (t) {}
    var o = {
        left: e.left,
        top: e.top,
        width: e.right - e.left,
        height: e.bottom - e.top
      },
      r = "HTML" === t.nodeName ? lt(t.ownerDocument) : {},
      a = r.width || t.clientWidth || o.width,
      s = r.height || t.clientHeight || o.height,
      l = t.offsetWidth - a,
      u = t.offsetHeight - s;
    if (l || u) {
      var f = K(t);
      l -= at(f, "x"), u -= at(f, "y"), o.width -= l, o.height -= u;
    }
    return ht(o);
  }
  function mt(t, e) {
    var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
      i = tt(10),
      o = "HTML" === e.nodeName,
      r = pt(t),
      a = pt(e),
      s = G(t),
      l = K(e),
      u = parseFloat(l.borderTopWidth),
      f = parseFloat(l.borderLeftWidth);
    n && o && (a.top = Math.max(a.top, 0), a.left = Math.max(a.left, 0));
    var d = ht({
      top: r.top - a.top - u,
      left: r.left - a.left - f,
      width: r.width,
      height: r.height
    });
    if (d.marginTop = 0, d.marginLeft = 0, !i && o) {
      var c = parseFloat(l.marginTop),
        h = parseFloat(l.marginLeft);
      d.top -= u - c, d.bottom -= u - c, d.left -= f - h, d.right -= f - h, d.marginTop = c, d.marginLeft = h;
    }
    return (i && !n ? e.contains(s) : e === s && "BODY" !== s.nodeName) && (d = rt(d, e)), d;
  }
  function gt(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
      n = t.ownerDocument.documentElement,
      i = mt(t, n),
      o = Math.max(n.clientWidth, window.innerWidth || 0),
      r = Math.max(n.clientHeight, window.innerHeight || 0),
      a = e ? 0 : ot(n),
      s = e ? 0 : ot(n, "left"),
      l = {
        top: a - i.top + i.marginTop,
        left: s - i.left + i.marginLeft,
        width: o,
        height: r
      };
    return ht(l);
  }
  function _t(t) {
    var e = t.nodeName;
    if ("BODY" === e || "HTML" === e) return !1;
    if ("fixed" === K(t, "position")) return !0;
    var n = X(t);
    return !!n && _t(n);
  }
  function vt(t) {
    if (!t || !t.parentElement || tt()) return document.documentElement;
    for (var e = t.parentElement; e && "none" === K(e, "transform");) e = e.parentElement;
    return e || document.documentElement;
  }
  function bt(t, e, n, i) {
    var o = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
      r = {
        top: 0,
        left: 0
      },
      a = o ? vt(t) : it(t, $(e));
    if ("viewport" === i) r = gt(a, o);else {
      var s = void 0;
      "scrollParent" === i ? "BODY" === (s = G(X(e))).nodeName && (s = t.ownerDocument.documentElement) : s = "window" === i ? t.ownerDocument.documentElement : i;
      var l = mt(s, a, o);
      if ("HTML" !== s.nodeName || _t(a)) r = l;else {
        var u = lt(t.ownerDocument),
          f = u.height,
          d = u.width;
        r.top += l.top - l.marginTop, r.bottom = f + l.top, r.left += l.left - l.marginLeft, r.right = d + l.left;
      }
    }
    var c = "number" == typeof (n = n || 0);
    return r.left += c ? n : n.left || 0, r.top += c ? n : n.top || 0, r.right -= c ? n : n.right || 0, r.bottom -= c ? n : n.bottom || 0, r;
  }
  function yt(t) {
    return t.width * t.height;
  }
  function Et(t, e, n, i, o) {
    var r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
    if (-1 === t.indexOf("auto")) return t;
    var a = bt(n, i, r, o),
      s = {
        top: {
          width: a.width,
          height: e.top - a.top
        },
        right: {
          width: a.right - e.right,
          height: a.height
        },
        bottom: {
          width: a.width,
          height: a.bottom - e.bottom
        },
        left: {
          width: e.left - a.left,
          height: a.height
        }
      },
      l = Object.keys(s).map(function (t) {
        return ct({
          key: t
        }, s[t], {
          area: yt(s[t])
        });
      }).sort(function (t, e) {
        return e.area - t.area;
      }),
      u = l.filter(function (t) {
        var e = t.width,
          i = t.height;
        return e >= n.clientWidth && i >= n.clientHeight;
      }),
      f = u.length > 0 ? u[0].key : l[0].key,
      d = t.split("-")[1];
    return f + (d ? "-" + d : "");
  }
  function wt(t, e, n) {
    var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null,
      o = i ? vt(e) : it(e, $(n));
    return mt(n, o, i);
  }
  function Tt(t) {
    var e = t.ownerDocument.defaultView.getComputedStyle(t),
      n = parseFloat(e.marginTop || 0) + parseFloat(e.marginBottom || 0),
      i = parseFloat(e.marginLeft || 0) + parseFloat(e.marginRight || 0);
    return {
      width: t.offsetWidth + i,
      height: t.offsetHeight + n
    };
  }
  function Ct(t) {
    var e = {
      left: "right",
      right: "left",
      bottom: "top",
      top: "bottom"
    };
    return t.replace(/left|right|bottom|top/g, function (t) {
      return e[t];
    });
  }
  function St(t, e, n) {
    n = n.split("-")[0];
    var i = Tt(t),
      o = {
        width: i.width,
        height: i.height
      },
      r = -1 !== ["right", "left"].indexOf(n),
      a = r ? "top" : "left",
      s = r ? "left" : "top",
      l = r ? "height" : "width",
      u = r ? "width" : "height";
    return o[a] = e[a] + e[l] / 2 - i[l] / 2, o[s] = n === s ? e[s] - i[u] : e[Ct(s)], o;
  }
  function Nt(t, e) {
    return Array.prototype.find ? t.find(e) : t.filter(e)[0];
  }
  function Dt(t, e, n) {
    return (void 0 === n ? t : t.slice(0, function (t, e, n) {
      if (Array.prototype.findIndex) return t.findIndex(function (t) {
        return t.name === n;
      });
      var i = Nt(t, function (t) {
        return t.name === n;
      });
      return t.indexOf(i);
    }(t, 0, n))).forEach(function (t) {
      t.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
      var n = t.function || t.fn;
      t.enabled && z(n) && (e.offsets.popper = ht(e.offsets.popper), e.offsets.reference = ht(e.offsets.reference), e = n(e, t));
    }), e;
  }
  function At() {
    if (!this.state.isDestroyed) {
      var t = {
        instance: this,
        styles: {},
        arrowStyles: {},
        attributes: {},
        flipped: !1,
        offsets: {}
      };
      t.offsets.reference = wt(this.state, this.popper, this.reference, this.options.positionFixed), t.placement = Et(this.options.placement, t.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), t.originalPlacement = t.placement, t.positionFixed = this.options.positionFixed, t.offsets.popper = St(this.popper, t.offsets.reference, t.placement), t.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute", t = Dt(this.modifiers, t), this.state.isCreated ? this.options.onUpdate(t) : (this.state.isCreated = !0, this.options.onCreate(t));
    }
  }
  function kt(t, e) {
    return t.some(function (t) {
      var n = t.name;
      return t.enabled && n === e;
    });
  }
  function It(t) {
    for (var e = [!1, "ms", "Webkit", "Moz", "O"], n = t.charAt(0).toUpperCase() + t.slice(1), i = 0; i < e.length; i++) {
      var o = e[i],
        r = o ? "" + o + n : t;
      if ("undefined" != typeof document.body.style[r]) return r;
    }
    return null;
  }
  function Ot() {
    return this.state.isDestroyed = !0, kt(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange = "", this.popper.style[It("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this;
  }
  function xt(t) {
    var e = t.ownerDocument;
    return e ? e.defaultView : window;
  }
  function jt(t, e, n, i) {
    var o = "BODY" === t.nodeName,
      r = o ? t.ownerDocument.defaultView : t;
    r.addEventListener(e, n, {
      passive: !0
    }), o || jt(G(r.parentNode), e, n, i), i.push(r);
  }
  function Lt(t, e, n, i) {
    n.updateBound = i, xt(t).addEventListener("resize", n.updateBound, {
      passive: !0
    });
    var o = G(t);
    return jt(o, "scroll", n.updateBound, n.scrollParents), n.scrollElement = o, n.eventsEnabled = !0, n;
  }
  function Pt() {
    this.state.eventsEnabled || (this.state = Lt(this.reference, this.options, this.state, this.scheduleUpdate));
  }
  function Ft() {
    var t, e;
    this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = (t = this.reference, e = this.state, xt(t).removeEventListener("resize", e.updateBound), e.scrollParents.forEach(function (t) {
      t.removeEventListener("scroll", e.updateBound);
    }), e.updateBound = null, e.scrollParents = [], e.scrollElement = null, e.eventsEnabled = !1, e));
  }
  function Rt(t) {
    return "" !== t && !isNaN(parseFloat(t)) && isFinite(t);
  }
  function Bt(t, e) {
    Object.keys(e).forEach(function (n) {
      var i = "";
      -1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(n) && Rt(e[n]) && (i = "px"), t.style[n] = e[n] + i;
    });
  }
  var Ht = U && /Firefox/i.test(navigator.userAgent);
  function Mt(t, e, n) {
    var i = Nt(t, function (t) {
        return t.name === e;
      }),
      o = !!i && t.some(function (t) {
        return t.name === n && t.enabled && t.order < i.order;
      });
    if (!o) {
      var r = "`" + e + "`",
        a = "`" + n + "`";
      console.warn(a + " modifier is required by " + r + " modifier in order to work, be sure to include it before " + r + "!");
    }
    return o;
  }
  var qt = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
    Qt = qt.slice(3);
  function Wt(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
      n = Qt.indexOf(t),
      i = Qt.slice(n + 1).concat(Qt.slice(0, n));
    return e ? i.reverse() : i;
  }
  var Ut = {
      placement: "bottom",
      positionFixed: !1,
      eventsEnabled: !0,
      removeOnDestroy: !1,
      onCreate: function () {},
      onUpdate: function () {},
      modifiers: {
        shift: {
          order: 100,
          enabled: !0,
          fn: function (t) {
            var e = t.placement,
              n = e.split("-")[0],
              i = e.split("-")[1];
            if (i) {
              var o = t.offsets,
                r = o.reference,
                a = o.popper,
                s = -1 !== ["bottom", "top"].indexOf(n),
                l = s ? "left" : "top",
                u = s ? "width" : "height",
                f = {
                  start: dt({}, l, r[l]),
                  end: dt({}, l, r[l] + r[u] - a[u])
                };
              t.offsets.popper = ct({}, a, f[i]);
            }
            return t;
          }
        },
        offset: {
          order: 200,
          enabled: !0,
          fn: function (t, e) {
            var n,
              i = e.offset,
              o = t.placement,
              r = t.offsets,
              a = r.popper,
              s = r.reference,
              l = o.split("-")[0];
            return n = Rt(+i) ? [+i, 0] : function (t, e, n, i) {
              var o = [0, 0],
                r = -1 !== ["right", "left"].indexOf(i),
                a = t.split(/(\+|\-)/).map(function (t) {
                  return t.trim();
                }),
                s = a.indexOf(Nt(a, function (t) {
                  return -1 !== t.search(/,|\s/);
                }));
              a[s] && -1 === a[s].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
              var l = /\s*,\s*|\s+/,
                u = -1 !== s ? [a.slice(0, s).concat([a[s].split(l)[0]]), [a[s].split(l)[1]].concat(a.slice(s + 1))] : [a];
              return u = u.map(function (t, i) {
                var o = (1 === i ? !r : r) ? "height" : "width",
                  a = !1;
                return t.reduce(function (t, e) {
                  return "" === t[t.length - 1] && -1 !== ["+", "-"].indexOf(e) ? (t[t.length - 1] = e, a = !0, t) : a ? (t[t.length - 1] += e, a = !1, t) : t.concat(e);
                }, []).map(function (t) {
                  return function (t, e, n, i) {
                    var o = t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                      r = +o[1],
                      a = o[2];
                    return r ? 0 === a.indexOf("%") ? ht("%p" === a ? n : i)[e] / 100 * r : "vh" === a || "vw" === a ? ("vh" === a ? Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : Math.max(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * r : r : t;
                  }(t, o, e, n);
                });
              }), u.forEach(function (t, e) {
                t.forEach(function (n, i) {
                  Rt(n) && (o[e] += n * ("-" === t[i - 1] ? -1 : 1));
                });
              }), o;
            }(i, a, s, l), "left" === l ? (a.top += n[0], a.left -= n[1]) : "right" === l ? (a.top += n[0], a.left += n[1]) : "top" === l ? (a.left += n[0], a.top -= n[1]) : "bottom" === l && (a.left += n[0], a.top += n[1]), t.popper = a, t;
          },
          offset: 0
        },
        preventOverflow: {
          order: 300,
          enabled: !0,
          fn: function (t, e) {
            var n = e.boundariesElement || et(t.instance.popper);
            t.instance.reference === n && (n = et(n));
            var i = It("transform"),
              o = t.instance.popper.style,
              r = o.top,
              a = o.left,
              s = o[i];
            o.top = "", o.left = "", o[i] = "";
            var l = bt(t.instance.popper, t.instance.reference, e.padding, n, t.positionFixed);
            o.top = r, o.left = a, o[i] = s, e.boundaries = l;
            var u = e.priority,
              f = t.offsets.popper,
              d = {
                primary: function (t) {
                  var n = f[t];
                  return f[t] < l[t] && !e.escapeWithReference && (n = Math.max(f[t], l[t])), dt({}, t, n);
                },
                secondary: function (t) {
                  var n = "right" === t ? "left" : "top",
                    i = f[n];
                  return f[t] > l[t] && !e.escapeWithReference && (i = Math.min(f[n], l[t] - ("right" === t ? f.width : f.height))), dt({}, n, i);
                }
              };
            return u.forEach(function (t) {
              var e = -1 !== ["left", "top"].indexOf(t) ? "primary" : "secondary";
              f = ct({}, f, d[e](t));
            }), t.offsets.popper = f, t;
          },
          priority: ["left", "right", "top", "bottom"],
          padding: 5,
          boundariesElement: "scrollParent"
        },
        keepTogether: {
          order: 400,
          enabled: !0,
          fn: function (t) {
            var e = t.offsets,
              n = e.popper,
              i = e.reference,
              o = t.placement.split("-")[0],
              r = Math.floor,
              a = -1 !== ["top", "bottom"].indexOf(o),
              s = a ? "right" : "bottom",
              l = a ? "left" : "top",
              u = a ? "width" : "height";
            return n[s] < r(i[l]) && (t.offsets.popper[l] = r(i[l]) - n[u]), n[l] > r(i[s]) && (t.offsets.popper[l] = r(i[s])), t;
          }
        },
        arrow: {
          order: 500,
          enabled: !0,
          fn: function (t, e) {
            var n;
            if (!Mt(t.instance.modifiers, "arrow", "keepTogether")) return t;
            var i = e.element;
            if ("string" == typeof i) {
              if (!(i = t.instance.popper.querySelector(i))) return t;
            } else if (!t.instance.popper.contains(i)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), t;
            var o = t.placement.split("-")[0],
              r = t.offsets,
              a = r.popper,
              s = r.reference,
              l = -1 !== ["left", "right"].indexOf(o),
              u = l ? "height" : "width",
              f = l ? "Top" : "Left",
              d = f.toLowerCase(),
              c = l ? "left" : "top",
              h = l ? "bottom" : "right",
              p = Tt(i)[u];
            s[h] - p < a[d] && (t.offsets.popper[d] -= a[d] - (s[h] - p)), s[d] + p > a[h] && (t.offsets.popper[d] += s[d] + p - a[h]), t.offsets.popper = ht(t.offsets.popper);
            var m = s[d] + s[u] / 2 - p / 2,
              g = K(t.instance.popper),
              _ = parseFloat(g["margin" + f]),
              v = parseFloat(g["border" + f + "Width"]),
              b = m - t.offsets.popper[d] - _ - v;
            return b = Math.max(Math.min(a[u] - p, b), 0), t.arrowElement = i, t.offsets.arrow = (dt(n = {}, d, Math.round(b)), dt(n, c, ""), n), t;
          },
          element: "[x-arrow]"
        },
        flip: {
          order: 600,
          enabled: !0,
          fn: function (t, e) {
            if (kt(t.instance.modifiers, "inner")) return t;
            if (t.flipped && t.placement === t.originalPlacement) return t;
            var n = bt(t.instance.popper, t.instance.reference, e.padding, e.boundariesElement, t.positionFixed),
              i = t.placement.split("-")[0],
              o = Ct(i),
              r = t.placement.split("-")[1] || "",
              a = [];
            switch (e.behavior) {
              case "flip":
                a = [i, o];
                break;
              case "clockwise":
                a = Wt(i);
                break;
              case "counterclockwise":
                a = Wt(i, !0);
                break;
              default:
                a = e.behavior;
            }
            return a.forEach(function (s, l) {
              if (i !== s || a.length === l + 1) return t;
              i = t.placement.split("-")[0], o = Ct(i);
              var u = t.offsets.popper,
                f = t.offsets.reference,
                d = Math.floor,
                c = "left" === i && d(u.right) > d(f.left) || "right" === i && d(u.left) < d(f.right) || "top" === i && d(u.bottom) > d(f.top) || "bottom" === i && d(u.top) < d(f.bottom),
                h = d(u.left) < d(n.left),
                p = d(u.right) > d(n.right),
                m = d(u.top) < d(n.top),
                g = d(u.bottom) > d(n.bottom),
                _ = "left" === i && h || "right" === i && p || "top" === i && m || "bottom" === i && g,
                v = -1 !== ["top", "bottom"].indexOf(i),
                b = !!e.flipVariations && (v && "start" === r && h || v && "end" === r && p || !v && "start" === r && m || !v && "end" === r && g),
                y = !!e.flipVariationsByContent && (v && "start" === r && p || v && "end" === r && h || !v && "start" === r && g || !v && "end" === r && m),
                E = b || y;
              (c || _ || E) && (t.flipped = !0, (c || _) && (i = a[l + 1]), E && (r = function (t) {
                return "end" === t ? "start" : "start" === t ? "end" : t;
              }(r)), t.placement = i + (r ? "-" + r : ""), t.offsets.popper = ct({}, t.offsets.popper, St(t.instance.popper, t.offsets.reference, t.placement)), t = Dt(t.instance.modifiers, t, "flip"));
            }), t;
          },
          behavior: "flip",
          padding: 5,
          boundariesElement: "viewport",
          flipVariations: !1,
          flipVariationsByContent: !1
        },
        inner: {
          order: 700,
          enabled: !1,
          fn: function (t) {
            var e = t.placement,
              n = e.split("-")[0],
              i = t.offsets,
              o = i.popper,
              r = i.reference,
              a = -1 !== ["left", "right"].indexOf(n),
              s = -1 === ["top", "left"].indexOf(n);
            return o[a ? "left" : "top"] = r[n] - (s ? o[a ? "width" : "height"] : 0), t.placement = Ct(e), t.offsets.popper = ht(o), t;
          }
        },
        hide: {
          order: 800,
          enabled: !0,
          fn: function (t) {
            if (!Mt(t.instance.modifiers, "hide", "preventOverflow")) return t;
            var e = t.offsets.reference,
              n = Nt(t.instance.modifiers, function (t) {
                return "preventOverflow" === t.name;
              }).boundaries;
            if (e.bottom < n.top || e.left > n.right || e.top > n.bottom || e.right < n.left) {
              if (!0 === t.hide) return t;
              t.hide = !0, t.attributes["x-out-of-boundaries"] = "";
            } else {
              if (!1 === t.hide) return t;
              t.hide = !1, t.attributes["x-out-of-boundaries"] = !1;
            }
            return t;
          }
        },
        computeStyle: {
          order: 850,
          enabled: !0,
          fn: function (t, e) {
            var n = e.x,
              i = e.y,
              o = t.offsets.popper,
              r = Nt(t.instance.modifiers, function (t) {
                return "applyStyle" === t.name;
              }).gpuAcceleration;
            void 0 !== r && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
            var a,
              s,
              l = void 0 !== r ? r : e.gpuAcceleration,
              u = et(t.instance.popper),
              f = pt(u),
              d = {
                position: o.position
              },
              c = function (t, e) {
                var n = t.offsets,
                  i = n.popper,
                  o = n.reference,
                  r = Math.round,
                  a = Math.floor,
                  s = function (t) {
                    return t;
                  },
                  l = r(o.width),
                  u = r(i.width),
                  f = -1 !== ["left", "right"].indexOf(t.placement),
                  d = -1 !== t.placement.indexOf("-"),
                  c = e ? f || d || l % 2 == u % 2 ? r : a : s,
                  h = e ? r : s;
                return {
                  left: c(l % 2 == 1 && u % 2 == 1 && !d && e ? i.left - 1 : i.left),
                  top: h(i.top),
                  bottom: h(i.bottom),
                  right: c(i.right)
                };
              }(t, window.devicePixelRatio < 2 || !Ht),
              h = "bottom" === n ? "top" : "bottom",
              p = "right" === i ? "left" : "right",
              m = It("transform");
            if (s = "bottom" === h ? "HTML" === u.nodeName ? -u.clientHeight + c.bottom : -f.height + c.bottom : c.top, a = "right" === p ? "HTML" === u.nodeName ? -u.clientWidth + c.right : -f.width + c.right : c.left, l && m) d[m] = "translate3d(" + a + "px, " + s + "px, 0)", d[h] = 0, d[p] = 0, d.willChange = "transform";else {
              var g = "bottom" === h ? -1 : 1,
                _ = "right" === p ? -1 : 1;
              d[h] = s * g, d[p] = a * _, d.willChange = h + ", " + p;
            }
            var v = {
              "x-placement": t.placement
            };
            return t.attributes = ct({}, v, t.attributes), t.styles = ct({}, d, t.styles), t.arrowStyles = ct({}, t.offsets.arrow, t.arrowStyles), t;
          },
          gpuAcceleration: !0,
          x: "bottom",
          y: "right"
        },
        applyStyle: {
          order: 900,
          enabled: !0,
          fn: function (t) {
            var e, n;
            return Bt(t.instance.popper, t.styles), e = t.instance.popper, n = t.attributes, Object.keys(n).forEach(function (t) {
              !1 !== n[t] ? e.setAttribute(t, n[t]) : e.removeAttribute(t);
            }), t.arrowElement && Object.keys(t.arrowStyles).length && Bt(t.arrowElement, t.arrowStyles), t;
          },
          onLoad: function (t, e, n, i, o) {
            var r = wt(o, e, t, n.positionFixed),
              a = Et(n.placement, r, e, t, n.modifiers.flip.boundariesElement, n.modifiers.flip.padding);
            return e.setAttribute("x-placement", a), Bt(e, {
              position: n.positionFixed ? "fixed" : "absolute"
            }), n;
          },
          gpuAcceleration: void 0
        }
      }
    },
    Vt = function () {
      function t(e, n) {
        var i = this,
          o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        ut(this, t), this.scheduleUpdate = function () {
          return requestAnimationFrame(i.update);
        }, this.update = Y(this.update.bind(this)), this.options = ct({}, t.Defaults, o), this.state = {
          isDestroyed: !1,
          isCreated: !1,
          scrollParents: []
        }, this.reference = e && e.jquery ? e[0] : e, this.popper = n && n.jquery ? n[0] : n, this.options.modifiers = {}, Object.keys(ct({}, t.Defaults.modifiers, o.modifiers)).forEach(function (e) {
          i.options.modifiers[e] = ct({}, t.Defaults.modifiers[e] || {}, o.modifiers ? o.modifiers[e] : {});
        }), this.modifiers = Object.keys(this.options.modifiers).map(function (t) {
          return ct({
            name: t
          }, i.options.modifiers[t]);
        }).sort(function (t, e) {
          return t.order - e.order;
        }), this.modifiers.forEach(function (t) {
          t.enabled && z(t.onLoad) && t.onLoad(i.reference, i.popper, i.options, t, i.state);
        }), this.update();
        var r = this.options.eventsEnabled;
        r && this.enableEventListeners(), this.state.eventsEnabled = r;
      }
      return ft(t, [{
        key: "update",
        value: function () {
          return At.call(this);
        }
      }, {
        key: "destroy",
        value: function () {
          return Ot.call(this);
        }
      }, {
        key: "enableEventListeners",
        value: function () {
          return Pt.call(this);
        }
      }, {
        key: "disableEventListeners",
        value: function () {
          return Ft.call(this);
        }
      }]), t;
    }();
  Vt.Utils = ("undefined" != typeof window ? window : global).PopperUtils, Vt.placements = qt, Vt.Defaults = Ut;
  var Yt = Vt,
    zt = "dropdown",
    Kt = "bs.dropdown",
    Xt = i.default.fn[zt],
    Gt = new RegExp("38|40|27"),
    $t = "disabled",
    Jt = "show",
    Zt = "dropdown-menu-right",
    te = "hide.bs.dropdown",
    ee = "hidden.bs.dropdown",
    ne = "click.bs.dropdown.data-api",
    ie = "keydown.bs.dropdown.data-api",
    oe = '[data-toggle="dropdown"]',
    re = ".dropdown-menu",
    ae = {
      offset: 0,
      flip: !0,
      boundary: "scrollParent",
      reference: "toggle",
      display: "dynamic",
      popperConfig: null
    },
    se = {
      offset: "(number|string|function)",
      flip: "boolean",
      boundary: "(string|element)",
      reference: "(string|element)",
      display: "string",
      popperConfig: "(null|object)"
    },
    le = function () {
      function t(t, e) {
        this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners();
      }
      var e = t.prototype;
      return e.toggle = function () {
        if (!this._element.disabled && !i.default(this._element).hasClass($t)) {
          var e = i.default(this._menu).hasClass(Jt);
          t._clearMenus(), e || this.show(!0);
        }
      }, e.show = function (e) {
        if (void 0 === e && (e = !1), !(this._element.disabled || i.default(this._element).hasClass($t) || i.default(this._menu).hasClass(Jt))) {
          var n = {
              relatedTarget: this._element
            },
            o = i.default.Event("show.bs.dropdown", n),
            r = t._getParentFromElement(this._element);
          if (i.default(r).trigger(o), !o.isDefaultPrevented()) {
            if (!this._inNavbar && e) {
              if ("undefined" == typeof Yt) throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
              var a = this._element;
              "parent" === this._config.reference ? a = r : u.isElement(this._config.reference) && (a = this._config.reference, "undefined" != typeof this._config.reference.jquery && (a = this._config.reference[0])), "scrollParent" !== this._config.boundary && i.default(r).addClass("position-static"), this._popper = new Yt(a, this._menu, this._getPopperConfig());
            }
            "ontouchstart" in document.documentElement && 0 === i.default(r).closest(".navbar-nav").length && i.default(document.body).children().on("mouseover", null, i.default.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), i.default(this._menu).toggleClass(Jt), i.default(r).toggleClass(Jt).trigger(i.default.Event("shown.bs.dropdown", n));
          }
        }
      }, e.hide = function () {
        if (!this._element.disabled && !i.default(this._element).hasClass($t) && i.default(this._menu).hasClass(Jt)) {
          var e = {
              relatedTarget: this._element
            },
            n = i.default.Event(te, e),
            o = t._getParentFromElement(this._element);
          i.default(o).trigger(n), n.isDefaultPrevented() || (this._popper && this._popper.destroy(), i.default(this._menu).toggleClass(Jt), i.default(o).toggleClass(Jt).trigger(i.default.Event(ee, e)));
        }
      }, e.dispose = function () {
        i.default.removeData(this._element, Kt), i.default(this._element).off(".bs.dropdown"), this._element = null, this._menu = null, null !== this._popper && (this._popper.destroy(), this._popper = null);
      }, e.update = function () {
        this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate();
      }, e._addEventListeners = function () {
        var t = this;
        i.default(this._element).on("click.bs.dropdown", function (e) {
          e.preventDefault(), e.stopPropagation(), t.toggle();
        });
      }, e._getConfig = function (t) {
        return t = a({}, this.constructor.Default, i.default(this._element).data(), t), u.typeCheckConfig(zt, t, this.constructor.DefaultType), t;
      }, e._getMenuElement = function () {
        if (!this._menu) {
          var e = t._getParentFromElement(this._element);
          e && (this._menu = e.querySelector(re));
        }
        return this._menu;
      }, e._getPlacement = function () {
        var t = i.default(this._element.parentNode),
          e = "bottom-start";
        return t.hasClass("dropup") ? e = i.default(this._menu).hasClass(Zt) ? "top-end" : "top-start" : t.hasClass("dropright") ? e = "right-start" : t.hasClass("dropleft") ? e = "left-start" : i.default(this._menu).hasClass(Zt) && (e = "bottom-end"), e;
      }, e._detectNavbar = function () {
        return i.default(this._element).closest(".navbar").length > 0;
      }, e._getOffset = function () {
        var t = this,
          e = {};
        return "function" == typeof this._config.offset ? e.fn = function (e) {
          return e.offsets = a({}, e.offsets, t._config.offset(e.offsets, t._element)), e;
        } : e.offset = this._config.offset, e;
      }, e._getPopperConfig = function () {
        var t = {
          placement: this._getPlacement(),
          modifiers: {
            offset: this._getOffset(),
            flip: {
              enabled: this._config.flip
            },
            preventOverflow: {
              boundariesElement: this._config.boundary
            }
          }
        };
        return "static" === this._config.display && (t.modifiers.applyStyle = {
          enabled: !1
        }), a({}, t, this._config.popperConfig);
      }, t._jQueryInterface = function (e) {
        return this.each(function () {
          var n = i.default(this).data(Kt);
          if (n || (n = new t(this, "object" == typeof e ? e : null), i.default(this).data(Kt, n)), "string" == typeof e) {
            if ("undefined" == typeof n[e]) throw new TypeError('No method named "' + e + '"');
            n[e]();
          }
        });
      }, t._clearMenus = function (e) {
        if (!e || 3 !== e.which && ("keyup" !== e.type || 9 === e.which)) for (var n = [].slice.call(document.querySelectorAll(oe)), o = 0, r = n.length; o < r; o++) {
          var a = t._getParentFromElement(n[o]),
            s = i.default(n[o]).data(Kt),
            l = {
              relatedTarget: n[o]
            };
          if (e && "click" === e.type && (l.clickEvent = e), s) {
            var u = s._menu;
            if (i.default(a).hasClass(Jt) && !(e && ("click" === e.type && /input|textarea/i.test(e.target.tagName) || "keyup" === e.type && 9 === e.which) && i.default.contains(a, e.target))) {
              var f = i.default.Event(te, l);
              i.default(a).trigger(f), f.isDefaultPrevented() || ("ontouchstart" in document.documentElement && i.default(document.body).children().off("mouseover", null, i.default.noop), n[o].setAttribute("aria-expanded", "false"), s._popper && s._popper.destroy(), i.default(u).removeClass(Jt), i.default(a).removeClass(Jt).trigger(i.default.Event(ee, l)));
            }
          }
        }
      }, t._getParentFromElement = function (t) {
        var e,
          n = u.getSelectorFromElement(t);
        return n && (e = document.querySelector(n)), e || t.parentNode;
      }, t._dataApiKeydownHandler = function (e) {
        if (!(/input|textarea/i.test(e.target.tagName) ? 32 === e.which || 27 !== e.which && (40 !== e.which && 38 !== e.which || i.default(e.target).closest(re).length) : !Gt.test(e.which)) && !this.disabled && !i.default(this).hasClass($t)) {
          var n = t._getParentFromElement(this),
            o = i.default(n).hasClass(Jt);
          if (o || 27 !== e.which) {
            if (e.preventDefault(), e.stopPropagation(), !o || 27 === e.which || 32 === e.which) return 27 === e.which && i.default(n.querySelector(oe)).trigger("focus"), void i.default(this).trigger("click");
            var r = [].slice.call(n.querySelectorAll(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)")).filter(function (t) {
              return i.default(t).is(":visible");
            });
            if (0 !== r.length) {
              var a = r.indexOf(e.target);
              38 === e.which && a > 0 && a--, 40 === e.which && a < r.length - 1 && a++, a < 0 && (a = 0), r[a].focus();
            }
          }
        }
      }, r(t, null, [{
        key: "VERSION",
        get: function () {
          return "4.6.2";
        }
      }, {
        key: "Default",
        get: function () {
          return ae;
        }
      }, {
        key: "DefaultType",
        get: function () {
          return se;
        }
      }]), t;
    }();
  i.default(document).on(ie, oe, le._dataApiKeydownHandler).on(ie, re, le._dataApiKeydownHandler).on(ne + " keyup.bs.dropdown.data-api", le._clearMenus).on(ne, oe, function (t) {
    t.preventDefault(), t.stopPropagation(), le._jQueryInterface.call(i.default(this), "toggle");
  }).on(ne, ".dropdown form", function (t) {
    t.stopPropagation();
  }), i.default.fn[zt] = le._jQueryInterface, i.default.fn[zt].Constructor = le, i.default.fn[zt].noConflict = function () {
    return i.default.fn[zt] = Xt, le._jQueryInterface;
  };
  var ue = "bs.modal",
    fe = i.default.fn.modal,
    de = "modal-open",
    ce = "fade",
    he = "show",
    pe = "modal-static",
    me = "hidden.bs.modal",
    ge = "show.bs.modal",
    _e = "focusin.bs.modal",
    ve = "resize.bs.modal",
    be = "click.dismiss.bs.modal",
    ye = "keydown.dismiss.bs.modal",
    Ee = "mousedown.dismiss.bs.modal",
    we = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
    Te = {
      backdrop: !0,
      keyboard: !0,
      focus: !0,
      show: !0
    },
    Ce = {
      backdrop: "(boolean|string)",
      keyboard: "boolean",
      focus: "boolean",
      show: "boolean"
    },
    Se = function () {
      function t(t, e) {
        this._config = this._getConfig(e), this._element = t, this._dialog = t.querySelector(".modal-dialog"), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollbarWidth = 0;
      }
      var e = t.prototype;
      return e.toggle = function (t) {
        return this._isShown ? this.hide() : this.show(t);
      }, e.show = function (t) {
        var e = this;
        if (!this._isShown && !this._isTransitioning) {
          var n = i.default.Event(ge, {
            relatedTarget: t
          });
          i.default(this._element).trigger(n), n.isDefaultPrevented() || (this._isShown = !0, i.default(this._element).hasClass(ce) && (this._isTransitioning = !0), this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), i.default(this._element).on(be, '[data-dismiss="modal"]', function (t) {
            return e.hide(t);
          }), i.default(this._dialog).on(Ee, function () {
            i.default(e._element).one("mouseup.dismiss.bs.modal", function (t) {
              i.default(t.target).is(e._element) && (e._ignoreBackdropClick = !0);
            });
          }), this._showBackdrop(function () {
            return e._showElement(t);
          }));
        }
      }, e.hide = function (t) {
        var e = this;
        if (t && t.preventDefault(), this._isShown && !this._isTransitioning) {
          var n = i.default.Event("hide.bs.modal");
          if (i.default(this._element).trigger(n), this._isShown && !n.isDefaultPrevented()) {
            this._isShown = !1;
            var o = i.default(this._element).hasClass(ce);
            if (o && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), i.default(document).off(_e), i.default(this._element).removeClass(he), i.default(this._element).off(be), i.default(this._dialog).off(Ee), o) {
              var r = u.getTransitionDurationFromElement(this._element);
              i.default(this._element).one(u.TRANSITION_END, function (t) {
                return e._hideModal(t);
              }).emulateTransitionEnd(r);
            } else this._hideModal();
          }
        }
      }, e.dispose = function () {
        [window, this._element, this._dialog].forEach(function (t) {
          return i.default(t).off(".bs.modal");
        }), i.default(document).off(_e), i.default.removeData(this._element, ue), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._isTransitioning = null, this._scrollbarWidth = null;
      }, e.handleUpdate = function () {
        this._adjustDialog();
      }, e._getConfig = function (t) {
        return t = a({}, Te, t), u.typeCheckConfig("modal", t, Ce), t;
      }, e._triggerBackdropTransition = function () {
        var t = this,
          e = i.default.Event("hidePrevented.bs.modal");
        if (i.default(this._element).trigger(e), !e.isDefaultPrevented()) {
          var n = this._element.scrollHeight > document.documentElement.clientHeight;
          n || (this._element.style.overflowY = "hidden"), this._element.classList.add(pe);
          var o = u.getTransitionDurationFromElement(this._dialog);
          i.default(this._element).off(u.TRANSITION_END), i.default(this._element).one(u.TRANSITION_END, function () {
            t._element.classList.remove(pe), n || i.default(t._element).one(u.TRANSITION_END, function () {
              t._element.style.overflowY = "";
            }).emulateTransitionEnd(t._element, o);
          }).emulateTransitionEnd(o), this._element.focus();
        }
      }, e._showElement = function (t) {
        var e = this,
          n = i.default(this._element).hasClass(ce),
          o = this._dialog ? this._dialog.querySelector(".modal-body") : null;
        this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), i.default(this._dialog).hasClass("modal-dialog-scrollable") && o ? o.scrollTop = 0 : this._element.scrollTop = 0, n && u.reflow(this._element), i.default(this._element).addClass(he), this._config.focus && this._enforceFocus();
        var r = i.default.Event("shown.bs.modal", {
            relatedTarget: t
          }),
          a = function () {
            e._config.focus && e._element.focus(), e._isTransitioning = !1, i.default(e._element).trigger(r);
          };
        if (n) {
          var s = u.getTransitionDurationFromElement(this._dialog);
          i.default(this._dialog).one(u.TRANSITION_END, a).emulateTransitionEnd(s);
        } else a();
      }, e._enforceFocus = function () {
        var t = this;
        i.default(document).off(_e).on(_e, function (e) {
          document !== e.target && t._element !== e.target && 0 === i.default(t._element).has(e.target).length && t._element.focus();
        });
      }, e._setEscapeEvent = function () {
        var t = this;
        this._isShown ? i.default(this._element).on(ye, function (e) {
          t._config.keyboard && 27 === e.which ? (e.preventDefault(), t.hide()) : t._config.keyboard || 27 !== e.which || t._triggerBackdropTransition();
        }) : this._isShown || i.default(this._element).off(ye);
      }, e._setResizeEvent = function () {
        var t = this;
        this._isShown ? i.default(window).on(ve, function (e) {
          return t.handleUpdate(e);
        }) : i.default(window).off(ve);
      }, e._hideModal = function () {
        var t = this;
        this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._isTransitioning = !1, this._showBackdrop(function () {
          i.default(document.body).removeClass(de), t._resetAdjustments(), t._resetScrollbar(), i.default(t._element).trigger(me);
        });
      }, e._removeBackdrop = function () {
        this._backdrop && (i.default(this._backdrop).remove(), this._backdrop = null);
      }, e._showBackdrop = function (t) {
        var e = this,
          n = i.default(this._element).hasClass(ce) ? ce : "";
        if (this._isShown && this._config.backdrop) {
          if (this._backdrop = document.createElement("div"), this._backdrop.className = "modal-backdrop", n && this._backdrop.classList.add(n), i.default(this._backdrop).appendTo(document.body), i.default(this._element).on(be, function (t) {
            e._ignoreBackdropClick ? e._ignoreBackdropClick = !1 : t.target === t.currentTarget && ("static" === e._config.backdrop ? e._triggerBackdropTransition() : e.hide());
          }), n && u.reflow(this._backdrop), i.default(this._backdrop).addClass(he), !t) return;
          if (!n) return void t();
          var o = u.getTransitionDurationFromElement(this._backdrop);
          i.default(this._backdrop).one(u.TRANSITION_END, t).emulateTransitionEnd(o);
        } else if (!this._isShown && this._backdrop) {
          i.default(this._backdrop).removeClass(he);
          var r = function () {
            e._removeBackdrop(), t && t();
          };
          if (i.default(this._element).hasClass(ce)) {
            var a = u.getTransitionDurationFromElement(this._backdrop);
            i.default(this._backdrop).one(u.TRANSITION_END, r).emulateTransitionEnd(a);
          } else r();
        } else t && t();
      }, e._adjustDialog = function () {
        var t = this._element.scrollHeight > document.documentElement.clientHeight;
        !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px");
      }, e._resetAdjustments = function () {
        this._element.style.paddingLeft = "", this._element.style.paddingRight = "";
      }, e._checkScrollbar = function () {
        var t = document.body.getBoundingClientRect();
        this._isBodyOverflowing = Math.round(t.left + t.right) < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth();
      }, e._setScrollbar = function () {
        var t = this;
        if (this._isBodyOverflowing) {
          var e = [].slice.call(document.querySelectorAll(we)),
            n = [].slice.call(document.querySelectorAll(".sticky-top"));
          i.default(e).each(function (e, n) {
            var o = n.style.paddingRight,
              r = i.default(n).css("padding-right");
            i.default(n).data("padding-right", o).css("padding-right", parseFloat(r) + t._scrollbarWidth + "px");
          }), i.default(n).each(function (e, n) {
            var o = n.style.marginRight,
              r = i.default(n).css("margin-right");
            i.default(n).data("margin-right", o).css("margin-right", parseFloat(r) - t._scrollbarWidth + "px");
          });
          var o = document.body.style.paddingRight,
            r = i.default(document.body).css("padding-right");
          i.default(document.body).data("padding-right", o).css("padding-right", parseFloat(r) + this._scrollbarWidth + "px");
        }
        i.default(document.body).addClass(de);
      }, e._resetScrollbar = function () {
        var t = [].slice.call(document.querySelectorAll(we));
        i.default(t).each(function (t, e) {
          var n = i.default(e).data("padding-right");
          i.default(e).removeData("padding-right"), e.style.paddingRight = n || "";
        });
        var e = [].slice.call(document.querySelectorAll(".sticky-top"));
        i.default(e).each(function (t, e) {
          var n = i.default(e).data("margin-right");
          "undefined" != typeof n && i.default(e).css("margin-right", n).removeData("margin-right");
        });
        var n = i.default(document.body).data("padding-right");
        i.default(document.body).removeData("padding-right"), document.body.style.paddingRight = n || "";
      }, e._getScrollbarWidth = function () {
        var t = document.createElement("div");
        t.className = "modal-scrollbar-measure", document.body.appendChild(t);
        var e = t.getBoundingClientRect().width - t.clientWidth;
        return document.body.removeChild(t), e;
      }, t._jQueryInterface = function (e, n) {
        return this.each(function () {
          var o = i.default(this).data(ue),
            r = a({}, Te, i.default(this).data(), "object" == typeof e && e ? e : {});
          if (o || (o = new t(this, r), i.default(this).data(ue, o)), "string" == typeof e) {
            if ("undefined" == typeof o[e]) throw new TypeError('No method named "' + e + '"');
            o[e](n);
          } else r.show && o.show(n);
        });
      }, r(t, null, [{
        key: "VERSION",
        get: function () {
          return "4.6.2";
        }
      }, {
        key: "Default",
        get: function () {
          return Te;
        }
      }]), t;
    }();
  i.default(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (t) {
    var e,
      n = this,
      o = u.getSelectorFromElement(this);
    o && (e = document.querySelector(o));
    var r = i.default(e).data(ue) ? "toggle" : a({}, i.default(e).data(), i.default(this).data());
    "A" !== this.tagName && "AREA" !== this.tagName || t.preventDefault();
    var s = i.default(e).one(ge, function (t) {
      t.isDefaultPrevented() || s.one(me, function () {
        i.default(n).is(":visible") && n.focus();
      });
    });
    Se._jQueryInterface.call(i.default(e), r, this);
  }), i.default.fn.modal = Se._jQueryInterface, i.default.fn.modal.Constructor = Se, i.default.fn.modal.noConflict = function () {
    return i.default.fn.modal = fe, Se._jQueryInterface;
  };
  var Ne = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"],
    De = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i,
    Ae = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;
  function ke(t, e, n) {
    if (0 === t.length) return t;
    if (n && "function" == typeof n) return n(t);
    for (var i = new window.DOMParser().parseFromString(t, "text/html"), o = Object.keys(e), r = [].slice.call(i.body.querySelectorAll("*")), a = function (t, n) {
        var i = r[t],
          a = i.nodeName.toLowerCase();
        if (-1 === o.indexOf(i.nodeName.toLowerCase())) return i.parentNode.removeChild(i), "continue";
        var s = [].slice.call(i.attributes),
          l = [].concat(e["*"] || [], e[a] || []);
        s.forEach(function (t) {
          (function (t, e) {
            var n = t.nodeName.toLowerCase();
            if (-1 !== e.indexOf(n)) return -1 === Ne.indexOf(n) || Boolean(De.test(t.nodeValue) || Ae.test(t.nodeValue));
            for (var i = e.filter(function (t) {
                return t instanceof RegExp;
              }), o = 0, r = i.length; o < r; o++) if (i[o].test(n)) return !0;
            return !1;
          })(t, l) || i.removeAttribute(t.nodeName);
        });
      }, s = 0, l = r.length; s < l; s++) a(s);
    return i.body.innerHTML;
  }
  var Ie = "tooltip",
    Oe = "bs.tooltip",
    xe = i.default.fn.tooltip,
    je = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
    Le = ["sanitize", "whiteList", "sanitizeFn"],
    Pe = "fade",
    Fe = "show",
    Re = "show",
    Be = "out",
    He = "hover",
    Me = "focus",
    qe = {
      AUTO: "auto",
      TOP: "top",
      RIGHT: "right",
      BOTTOM: "bottom",
      LEFT: "left"
    },
    Qe = {
      animation: !0,
      template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
      trigger: "hover focus",
      title: "",
      delay: 0,
      html: !1,
      selector: !1,
      placement: "top",
      offset: 0,
      container: !1,
      fallbackPlacement: "flip",
      boundary: "scrollParent",
      customClass: "",
      sanitize: !0,
      sanitizeFn: null,
      whiteList: {
        "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
        a: ["target", "href", "title", "rel"],
        area: [],
        b: [],
        br: [],
        col: [],
        code: [],
        div: [],
        em: [],
        hr: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        img: ["src", "srcset", "alt", "title", "width", "height"],
        li: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        u: [],
        ul: []
      },
      popperConfig: null
    },
    We = {
      animation: "boolean",
      template: "string",
      title: "(string|element|function)",
      trigger: "string",
      delay: "(number|object)",
      html: "boolean",
      selector: "(string|boolean)",
      placement: "(string|function)",
      offset: "(number|string|function)",
      container: "(string|element|boolean)",
      fallbackPlacement: "(string|array)",
      boundary: "(string|element)",
      customClass: "(string|function)",
      sanitize: "boolean",
      sanitizeFn: "(null|function)",
      whiteList: "object",
      popperConfig: "(null|object)"
    },
    Ue = {
      HIDE: "hide.bs.tooltip",
      HIDDEN: "hidden.bs.tooltip",
      SHOW: "show.bs.tooltip",
      SHOWN: "shown.bs.tooltip",
      INSERTED: "inserted.bs.tooltip",
      CLICK: "click.bs.tooltip",
      FOCUSIN: "focusin.bs.tooltip",
      FOCUSOUT: "focusout.bs.tooltip",
      MOUSEENTER: "mouseenter.bs.tooltip",
      MOUSELEAVE: "mouseleave.bs.tooltip"
    },
    Ve = function () {
      function t(t, e) {
        if ("undefined" == typeof Yt) throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
        this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners();
      }
      var e = t.prototype;
      return e.enable = function () {
        this._isEnabled = !0;
      }, e.disable = function () {
        this._isEnabled = !1;
      }, e.toggleEnabled = function () {
        this._isEnabled = !this._isEnabled;
      }, e.toggle = function (t) {
        if (this._isEnabled) if (t) {
          var e = this.constructor.DATA_KEY,
            n = i.default(t.currentTarget).data(e);
          n || (n = new this.constructor(t.currentTarget, this._getDelegateConfig()), i.default(t.currentTarget).data(e, n)), n._activeTrigger.click = !n._activeTrigger.click, n._isWithActiveTrigger() ? n._enter(null, n) : n._leave(null, n);
        } else {
          if (i.default(this.getTipElement()).hasClass(Fe)) return void this._leave(null, this);
          this._enter(null, this);
        }
      }, e.dispose = function () {
        clearTimeout(this._timeout), i.default.removeData(this.element, this.constructor.DATA_KEY), i.default(this.element).off(this.constructor.EVENT_KEY), i.default(this.element).closest(".modal").off("hide.bs.modal", this._hideModalHandler), this.tip && i.default(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null;
      }, e.show = function () {
        var t = this;
        if ("none" === i.default(this.element).css("display")) throw new Error("Please use show on visible elements");
        var e = i.default.Event(this.constructor.Event.SHOW);
        if (this.isWithContent() && this._isEnabled) {
          i.default(this.element).trigger(e);
          var n = u.findShadowRoot(this.element),
            o = i.default.contains(null !== n ? n : this.element.ownerDocument.documentElement, this.element);
          if (e.isDefaultPrevented() || !o) return;
          var r = this.getTipElement(),
            a = u.getUID(this.constructor.NAME);
          r.setAttribute("id", a), this.element.setAttribute("aria-describedby", a), this.setContent(), this.config.animation && i.default(r).addClass(Pe);
          var s = "function" == typeof this.config.placement ? this.config.placement.call(this, r, this.element) : this.config.placement,
            l = this._getAttachment(s);
          this.addAttachmentClass(l);
          var f = this._getContainer();
          i.default(r).data(this.constructor.DATA_KEY, this), i.default.contains(this.element.ownerDocument.documentElement, this.tip) || i.default(r).appendTo(f), i.default(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new Yt(this.element, r, this._getPopperConfig(l)), i.default(r).addClass(Fe), i.default(r).addClass(this.config.customClass), "ontouchstart" in document.documentElement && i.default(document.body).children().on("mouseover", null, i.default.noop);
          var d = function () {
            t.config.animation && t._fixTransition();
            var e = t._hoverState;
            t._hoverState = null, i.default(t.element).trigger(t.constructor.Event.SHOWN), e === Be && t._leave(null, t);
          };
          if (i.default(this.tip).hasClass(Pe)) {
            var c = u.getTransitionDurationFromElement(this.tip);
            i.default(this.tip).one(u.TRANSITION_END, d).emulateTransitionEnd(c);
          } else d();
        }
      }, e.hide = function (t) {
        var e = this,
          n = this.getTipElement(),
          o = i.default.Event(this.constructor.Event.HIDE),
          r = function () {
            e._hoverState !== Re && n.parentNode && n.parentNode.removeChild(n), e._cleanTipClass(), e.element.removeAttribute("aria-describedby"), i.default(e.element).trigger(e.constructor.Event.HIDDEN), null !== e._popper && e._popper.destroy(), t && t();
          };
        if (i.default(this.element).trigger(o), !o.isDefaultPrevented()) {
          if (i.default(n).removeClass(Fe), "ontouchstart" in document.documentElement && i.default(document.body).children().off("mouseover", null, i.default.noop), this._activeTrigger.click = !1, this._activeTrigger.focus = !1, this._activeTrigger.hover = !1, i.default(this.tip).hasClass(Pe)) {
            var a = u.getTransitionDurationFromElement(n);
            i.default(n).one(u.TRANSITION_END, r).emulateTransitionEnd(a);
          } else r();
          this._hoverState = "";
        }
      }, e.update = function () {
        null !== this._popper && this._popper.scheduleUpdate();
      }, e.isWithContent = function () {
        return Boolean(this.getTitle());
      }, e.addAttachmentClass = function (t) {
        i.default(this.getTipElement()).addClass("bs-tooltip-" + t);
      }, e.getTipElement = function () {
        return this.tip = this.tip || i.default(this.config.template)[0], this.tip;
      }, e.setContent = function () {
        var t = this.getTipElement();
        this.setElementContent(i.default(t.querySelectorAll(".tooltip-inner")), this.getTitle()), i.default(t).removeClass("fade show");
      }, e.setElementContent = function (t, e) {
        "object" != typeof e || !e.nodeType && !e.jquery ? this.config.html ? (this.config.sanitize && (e = ke(e, this.config.whiteList, this.config.sanitizeFn)), t.html(e)) : t.text(e) : this.config.html ? i.default(e).parent().is(t) || t.empty().append(e) : t.text(i.default(e).text());
      }, e.getTitle = function () {
        var t = this.element.getAttribute("data-original-title");
        return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), t;
      }, e._getPopperConfig = function (t) {
        var e = this;
        return a({}, {
          placement: t,
          modifiers: {
            offset: this._getOffset(),
            flip: {
              behavior: this.config.fallbackPlacement
            },
            arrow: {
              element: ".arrow"
            },
            preventOverflow: {
              boundariesElement: this.config.boundary
            }
          },
          onCreate: function (t) {
            t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t);
          },
          onUpdate: function (t) {
            return e._handlePopperPlacementChange(t);
          }
        }, this.config.popperConfig);
      }, e._getOffset = function () {
        var t = this,
          e = {};
        return "function" == typeof this.config.offset ? e.fn = function (e) {
          return e.offsets = a({}, e.offsets, t.config.offset(e.offsets, t.element)), e;
        } : e.offset = this.config.offset, e;
      }, e._getContainer = function () {
        return !1 === this.config.container ? document.body : u.isElement(this.config.container) ? i.default(this.config.container) : i.default(document).find(this.config.container);
      }, e._getAttachment = function (t) {
        return qe[t.toUpperCase()];
      }, e._setListeners = function () {
        var t = this;
        this.config.trigger.split(" ").forEach(function (e) {
          if ("click" === e) i.default(t.element).on(t.constructor.Event.CLICK, t.config.selector, function (e) {
            return t.toggle(e);
          });else if ("manual" !== e) {
            var n = e === He ? t.constructor.Event.MOUSEENTER : t.constructor.Event.FOCUSIN,
              o = e === He ? t.constructor.Event.MOUSELEAVE : t.constructor.Event.FOCUSOUT;
            i.default(t.element).on(n, t.config.selector, function (e) {
              return t._enter(e);
            }).on(o, t.config.selector, function (e) {
              return t._leave(e);
            });
          }
        }), this._hideModalHandler = function () {
          t.element && t.hide();
        }, i.default(this.element).closest(".modal").on("hide.bs.modal", this._hideModalHandler), this.config.selector ? this.config = a({}, this.config, {
          trigger: "manual",
          selector: ""
        }) : this._fixTitle();
      }, e._fixTitle = function () {
        var t = typeof this.element.getAttribute("data-original-title");
        (this.element.getAttribute("title") || "string" !== t) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""));
      }, e._enter = function (t, e) {
        var n = this.constructor.DATA_KEY;
        (e = e || i.default(t.currentTarget).data(n)) || (e = new this.constructor(t.currentTarget, this._getDelegateConfig()), i.default(t.currentTarget).data(n, e)), t && (e._activeTrigger["focusin" === t.type ? Me : He] = !0), i.default(e.getTipElement()).hasClass(Fe) || e._hoverState === Re ? e._hoverState = Re : (clearTimeout(e._timeout), e._hoverState = Re, e.config.delay && e.config.delay.show ? e._timeout = setTimeout(function () {
          e._hoverState === Re && e.show();
        }, e.config.delay.show) : e.show());
      }, e._leave = function (t, e) {
        var n = this.constructor.DATA_KEY;
        (e = e || i.default(t.currentTarget).data(n)) || (e = new this.constructor(t.currentTarget, this._getDelegateConfig()), i.default(t.currentTarget).data(n, e)), t && (e._activeTrigger["focusout" === t.type ? Me : He] = !1), e._isWithActiveTrigger() || (clearTimeout(e._timeout), e._hoverState = Be, e.config.delay && e.config.delay.hide ? e._timeout = setTimeout(function () {
          e._hoverState === Be && e.hide();
        }, e.config.delay.hide) : e.hide());
      }, e._isWithActiveTrigger = function () {
        for (var t in this._activeTrigger) if (this._activeTrigger[t]) return !0;
        return !1;
      }, e._getConfig = function (t) {
        var e = i.default(this.element).data();
        return Object.keys(e).forEach(function (t) {
          -1 !== Le.indexOf(t) && delete e[t];
        }), "number" == typeof (t = a({}, this.constructor.Default, e, "object" == typeof t && t ? t : {})).delay && (t.delay = {
          show: t.delay,
          hide: t.delay
        }), "number" == typeof t.title && (t.title = t.title.toString()), "number" == typeof t.content && (t.content = t.content.toString()), u.typeCheckConfig(Ie, t, this.constructor.DefaultType), t.sanitize && (t.template = ke(t.template, t.whiteList, t.sanitizeFn)), t;
      }, e._getDelegateConfig = function () {
        var t = {};
        if (this.config) for (var e in this.config) this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
        return t;
      }, e._cleanTipClass = function () {
        var t = i.default(this.getTipElement()),
          e = t.attr("class").match(je);
        null !== e && e.length && t.removeClass(e.join(""));
      }, e._handlePopperPlacementChange = function (t) {
        this.tip = t.instance.popper, this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement));
      }, e._fixTransition = function () {
        var t = this.getTipElement(),
          e = this.config.animation;
        null === t.getAttribute("x-placement") && (i.default(t).removeClass(Pe), this.config.animation = !1, this.hide(), this.show(), this.config.animation = e);
      }, t._jQueryInterface = function (e) {
        return this.each(function () {
          var n = i.default(this),
            o = n.data(Oe),
            r = "object" == typeof e && e;
          if ((o || !/dispose|hide/.test(e)) && (o || (o = new t(this, r), n.data(Oe, o)), "string" == typeof e)) {
            if ("undefined" == typeof o[e]) throw new TypeError('No method named "' + e + '"');
            o[e]();
          }
        });
      }, r(t, null, [{
        key: "VERSION",
        get: function () {
          return "4.6.2";
        }
      }, {
        key: "Default",
        get: function () {
          return Qe;
        }
      }, {
        key: "NAME",
        get: function () {
          return Ie;
        }
      }, {
        key: "DATA_KEY",
        get: function () {
          return Oe;
        }
      }, {
        key: "Event",
        get: function () {
          return Ue;
        }
      }, {
        key: "EVENT_KEY",
        get: function () {
          return ".bs.tooltip";
        }
      }, {
        key: "DefaultType",
        get: function () {
          return We;
        }
      }]), t;
    }();
  i.default.fn.tooltip = Ve._jQueryInterface, i.default.fn.tooltip.Constructor = Ve, i.default.fn.tooltip.noConflict = function () {
    return i.default.fn.tooltip = xe, Ve._jQueryInterface;
  };
  var Ye = "bs.popover",
    ze = i.default.fn.popover,
    Ke = new RegExp("(^|\\s)bs-popover\\S+", "g"),
    Xe = a({}, Ve.Default, {
      placement: "right",
      trigger: "click",
      content: "",
      template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
    }),
    Ge = a({}, Ve.DefaultType, {
      content: "(string|element|function)"
    }),
    $e = {
      HIDE: "hide.bs.popover",
      HIDDEN: "hidden.bs.popover",
      SHOW: "show.bs.popover",
      SHOWN: "shown.bs.popover",
      INSERTED: "inserted.bs.popover",
      CLICK: "click.bs.popover",
      FOCUSIN: "focusin.bs.popover",
      FOCUSOUT: "focusout.bs.popover",
      MOUSEENTER: "mouseenter.bs.popover",
      MOUSELEAVE: "mouseleave.bs.popover"
    },
    Je = function (t) {
      var e, n;
      function o() {
        return t.apply(this, arguments) || this;
      }
      n = t, (e = o).prototype = Object.create(n.prototype), e.prototype.constructor = e, s(e, n);
      var a = o.prototype;
      return a.isWithContent = function () {
        return this.getTitle() || this._getContent();
      }, a.addAttachmentClass = function (t) {
        i.default(this.getTipElement()).addClass("bs-popover-" + t);
      }, a.getTipElement = function () {
        return this.tip = this.tip || i.default(this.config.template)[0], this.tip;
      }, a.setContent = function () {
        var t = i.default(this.getTipElement());
        this.setElementContent(t.find(".popover-header"), this.getTitle());
        var e = this._getContent();
        "function" == typeof e && (e = e.call(this.element)), this.setElementContent(t.find(".popover-body"), e), t.removeClass("fade show");
      }, a._getContent = function () {
        return this.element.getAttribute("data-content") || this.config.content;
      }, a._cleanTipClass = function () {
        var t = i.default(this.getTipElement()),
          e = t.attr("class").match(Ke);
        null !== e && e.length > 0 && t.removeClass(e.join(""));
      }, o._jQueryInterface = function (t) {
        return this.each(function () {
          var e = i.default(this).data(Ye),
            n = "object" == typeof t ? t : null;
          if ((e || !/dispose|hide/.test(t)) && (e || (e = new o(this, n), i.default(this).data(Ye, e)), "string" == typeof t)) {
            if ("undefined" == typeof e[t]) throw new TypeError('No method named "' + t + '"');
            e[t]();
          }
        });
      }, r(o, null, [{
        key: "VERSION",
        get: function () {
          return "4.6.2";
        }
      }, {
        key: "Default",
        get: function () {
          return Xe;
        }
      }, {
        key: "NAME",
        get: function () {
          return "popover";
        }
      }, {
        key: "DATA_KEY",
        get: function () {
          return Ye;
        }
      }, {
        key: "Event",
        get: function () {
          return $e;
        }
      }, {
        key: "EVENT_KEY",
        get: function () {
          return ".bs.popover";
        }
      }, {
        key: "DefaultType",
        get: function () {
          return Ge;
        }
      }]), o;
    }(Ve);
  i.default.fn.popover = Je._jQueryInterface, i.default.fn.popover.Constructor = Je, i.default.fn.popover.noConflict = function () {
    return i.default.fn.popover = ze, Je._jQueryInterface;
  };
  var Ze = "scrollspy",
    tn = "bs.scrollspy",
    en = i.default.fn[Ze],
    nn = "active",
    on = "position",
    rn = ".nav, .list-group",
    an = {
      offset: 10,
      method: "auto",
      target: ""
    },
    sn = {
      offset: "number",
      method: "string",
      target: "(string|element)"
    },
    ln = function () {
      function t(t, e) {
        var n = this;
        this._element = t, this._scrollElement = "BODY" === t.tagName ? window : t, this._config = this._getConfig(e), this._selector = this._config.target + " .nav-link," + this._config.target + " .list-group-item," + this._config.target + " .dropdown-item", this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, i.default(this._scrollElement).on("scroll.bs.scrollspy", function (t) {
          return n._process(t);
        }), this.refresh(), this._process();
      }
      var e = t.prototype;
      return e.refresh = function () {
        var t = this,
          e = this._scrollElement === this._scrollElement.window ? "offset" : on,
          n = "auto" === this._config.method ? e : this._config.method,
          o = n === on ? this._getScrollTop() : 0;
        this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), [].slice.call(document.querySelectorAll(this._selector)).map(function (t) {
          var e,
            r = u.getSelectorFromElement(t);
          if (r && (e = document.querySelector(r)), e) {
            var a = e.getBoundingClientRect();
            if (a.width || a.height) return [i.default(e)[n]().top + o, r];
          }
          return null;
        }).filter(Boolean).sort(function (t, e) {
          return t[0] - e[0];
        }).forEach(function (e) {
          t._offsets.push(e[0]), t._targets.push(e[1]);
        });
      }, e.dispose = function () {
        i.default.removeData(this._element, tn), i.default(this._scrollElement).off(".bs.scrollspy"), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null;
      }, e._getConfig = function (t) {
        if ("string" != typeof (t = a({}, an, "object" == typeof t && t ? t : {})).target && u.isElement(t.target)) {
          var e = i.default(t.target).attr("id");
          e || (e = u.getUID(Ze), i.default(t.target).attr("id", e)), t.target = "#" + e;
        }
        return u.typeCheckConfig(Ze, t, sn), t;
      }, e._getScrollTop = function () {
        return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
      }, e._getScrollHeight = function () {
        return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      }, e._getOffsetHeight = function () {
        return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
      }, e._process = function () {
        var t = this._getScrollTop() + this._config.offset,
          e = this._getScrollHeight(),
          n = this._config.offset + e - this._getOffsetHeight();
        if (this._scrollHeight !== e && this.refresh(), t >= n) {
          var i = this._targets[this._targets.length - 1];
          this._activeTarget !== i && this._activate(i);
        } else {
          if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget = null, void this._clear();
          for (var o = this._offsets.length; o--;) this._activeTarget !== this._targets[o] && t >= this._offsets[o] && ("undefined" == typeof this._offsets[o + 1] || t < this._offsets[o + 1]) && this._activate(this._targets[o]);
        }
      }, e._activate = function (t) {
        this._activeTarget = t, this._clear();
        var e = this._selector.split(",").map(function (e) {
            return e + '[data-target="' + t + '"],' + e + '[href="' + t + '"]';
          }),
          n = i.default([].slice.call(document.querySelectorAll(e.join(","))));
        n.hasClass("dropdown-item") ? (n.closest(".dropdown").find(".dropdown-toggle").addClass(nn), n.addClass(nn)) : (n.addClass(nn), n.parents(rn).prev(".nav-link, .list-group-item").addClass(nn), n.parents(rn).prev(".nav-item").children(".nav-link").addClass(nn)), i.default(this._scrollElement).trigger("activate.bs.scrollspy", {
          relatedTarget: t
        });
      }, e._clear = function () {
        [].slice.call(document.querySelectorAll(this._selector)).filter(function (t) {
          return t.classList.contains(nn);
        }).forEach(function (t) {
          return t.classList.remove(nn);
        });
      }, t._jQueryInterface = function (e) {
        return this.each(function () {
          var n = i.default(this).data(tn);
          if (n || (n = new t(this, "object" == typeof e && e), i.default(this).data(tn, n)), "string" == typeof e) {
            if ("undefined" == typeof n[e]) throw new TypeError('No method named "' + e + '"');
            n[e]();
          }
        });
      }, r(t, null, [{
        key: "VERSION",
        get: function () {
          return "4.6.2";
        }
      }, {
        key: "Default",
        get: function () {
          return an;
        }
      }]), t;
    }();
  i.default(window).on("load.bs.scrollspy.data-api", function () {
    for (var t = [].slice.call(document.querySelectorAll('[data-spy="scroll"]')), e = t.length; e--;) {
      var n = i.default(t[e]);
      ln._jQueryInterface.call(n, n.data());
    }
  }), i.default.fn[Ze] = ln._jQueryInterface, i.default.fn[Ze].Constructor = ln, i.default.fn[Ze].noConflict = function () {
    return i.default.fn[Ze] = en, ln._jQueryInterface;
  };
  var un = "bs.tab",
    fn = i.default.fn.tab,
    dn = "active",
    cn = "fade",
    hn = "show",
    pn = ".active",
    mn = "> li > .active",
    gn = function () {
      function t(t) {
        this._element = t;
      }
      var e = t.prototype;
      return e.show = function () {
        var t = this;
        if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && i.default(this._element).hasClass(dn) || i.default(this._element).hasClass("disabled") || this._element.hasAttribute("disabled"))) {
          var e,
            n,
            o = i.default(this._element).closest(".nav, .list-group")[0],
            r = u.getSelectorFromElement(this._element);
          if (o) {
            var a = "UL" === o.nodeName || "OL" === o.nodeName ? mn : pn;
            n = (n = i.default.makeArray(i.default(o).find(a)))[n.length - 1];
          }
          var s = i.default.Event("hide.bs.tab", {
              relatedTarget: this._element
            }),
            l = i.default.Event("show.bs.tab", {
              relatedTarget: n
            });
          if (n && i.default(n).trigger(s), i.default(this._element).trigger(l), !l.isDefaultPrevented() && !s.isDefaultPrevented()) {
            r && (e = document.querySelector(r)), this._activate(this._element, o);
            var f = function () {
              var e = i.default.Event("hidden.bs.tab", {
                  relatedTarget: t._element
                }),
                o = i.default.Event("shown.bs.tab", {
                  relatedTarget: n
                });
              i.default(n).trigger(e), i.default(t._element).trigger(o);
            };
            e ? this._activate(e, e.parentNode, f) : f();
          }
        }
      }, e.dispose = function () {
        i.default.removeData(this._element, un), this._element = null;
      }, e._activate = function (t, e, n) {
        var o = this,
          r = (!e || "UL" !== e.nodeName && "OL" !== e.nodeName ? i.default(e).children(pn) : i.default(e).find(mn))[0],
          a = n && r && i.default(r).hasClass(cn),
          s = function () {
            return o._transitionComplete(t, r, n);
          };
        if (r && a) {
          var l = u.getTransitionDurationFromElement(r);
          i.default(r).removeClass(hn).one(u.TRANSITION_END, s).emulateTransitionEnd(l);
        } else s();
      }, e._transitionComplete = function (t, e, n) {
        if (e) {
          i.default(e).removeClass(dn);
          var o = i.default(e.parentNode).find("> .dropdown-menu .active")[0];
          o && i.default(o).removeClass(dn), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !1);
        }
        i.default(t).addClass(dn), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0), u.reflow(t), t.classList.contains(cn) && t.classList.add(hn);
        var r = t.parentNode;
        if (r && "LI" === r.nodeName && (r = r.parentNode), r && i.default(r).hasClass("dropdown-menu")) {
          var a = i.default(t).closest(".dropdown")[0];
          if (a) {
            var s = [].slice.call(a.querySelectorAll(".dropdown-toggle"));
            i.default(s).addClass(dn);
          }
          t.setAttribute("aria-expanded", !0);
        }
        n && n();
      }, t._jQueryInterface = function (e) {
        return this.each(function () {
          var n = i.default(this),
            o = n.data(un);
          if (o || (o = new t(this), n.data(un, o)), "string" == typeof e) {
            if ("undefined" == typeof o[e]) throw new TypeError('No method named "' + e + '"');
            o[e]();
          }
        });
      }, r(t, null, [{
        key: "VERSION",
        get: function () {
          return "4.6.2";
        }
      }]), t;
    }();
  i.default(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', function (t) {
    t.preventDefault(), gn._jQueryInterface.call(i.default(this), "show");
  }), i.default.fn.tab = gn._jQueryInterface, i.default.fn.tab.Constructor = gn, i.default.fn.tab.noConflict = function () {
    return i.default.fn.tab = fn, gn._jQueryInterface;
  };
  var _n = "bs.toast",
    vn = i.default.fn.toast,
    bn = "hide",
    yn = "show",
    En = "showing",
    wn = "click.dismiss.bs.toast",
    Tn = {
      animation: !0,
      autohide: !0,
      delay: 500
    },
    Cn = {
      animation: "boolean",
      autohide: "boolean",
      delay: "number"
    },
    Sn = function () {
      function t(t, e) {
        this._element = t, this._config = this._getConfig(e), this._timeout = null, this._setListeners();
      }
      var e = t.prototype;
      return e.show = function () {
        var t = this,
          e = i.default.Event("show.bs.toast");
        if (i.default(this._element).trigger(e), !e.isDefaultPrevented()) {
          this._clearTimeout(), this._config.animation && this._element.classList.add("fade");
          var n = function () {
            t._element.classList.remove(En), t._element.classList.add(yn), i.default(t._element).trigger("shown.bs.toast"), t._config.autohide && (t._timeout = setTimeout(function () {
              t.hide();
            }, t._config.delay));
          };
          if (this._element.classList.remove(bn), u.reflow(this._element), this._element.classList.add(En), this._config.animation) {
            var o = u.getTransitionDurationFromElement(this._element);
            i.default(this._element).one(u.TRANSITION_END, n).emulateTransitionEnd(o);
          } else n();
        }
      }, e.hide = function () {
        if (this._element.classList.contains(yn)) {
          var t = i.default.Event("hide.bs.toast");
          i.default(this._element).trigger(t), t.isDefaultPrevented() || this._close();
        }
      }, e.dispose = function () {
        this._clearTimeout(), this._element.classList.contains(yn) && this._element.classList.remove(yn), i.default(this._element).off(wn), i.default.removeData(this._element, _n), this._element = null, this._config = null;
      }, e._getConfig = function (t) {
        return t = a({}, Tn, i.default(this._element).data(), "object" == typeof t && t ? t : {}), u.typeCheckConfig("toast", t, this.constructor.DefaultType), t;
      }, e._setListeners = function () {
        var t = this;
        i.default(this._element).on(wn, '[data-dismiss="toast"]', function () {
          return t.hide();
        });
      }, e._close = function () {
        var t = this,
          e = function () {
            t._element.classList.add(bn), i.default(t._element).trigger("hidden.bs.toast");
          };
        if (this._element.classList.remove(yn), this._config.animation) {
          var n = u.getTransitionDurationFromElement(this._element);
          i.default(this._element).one(u.TRANSITION_END, e).emulateTransitionEnd(n);
        } else e();
      }, e._clearTimeout = function () {
        clearTimeout(this._timeout), this._timeout = null;
      }, t._jQueryInterface = function (e) {
        return this.each(function () {
          var n = i.default(this),
            o = n.data(_n);
          if (o || (o = new t(this, "object" == typeof e && e), n.data(_n, o)), "string" == typeof e) {
            if ("undefined" == typeof o[e]) throw new TypeError('No method named "' + e + '"');
            o[e](this);
          }
        });
      }, r(t, null, [{
        key: "VERSION",
        get: function () {
          return "4.6.2";
        }
      }, {
        key: "DefaultType",
        get: function () {
          return Cn;
        }
      }, {
        key: "Default",
        get: function () {
          return Tn;
        }
      }]), t;
    }();
  i.default.fn.toast = Sn._jQueryInterface, i.default.fn.toast.Constructor = Sn, i.default.fn.toast.noConflict = function () {
    return i.default.fn.toast = vn, Sn._jQueryInterface;
  }, t.Alert = c, t.Button = b, t.Carousel = O, t.Collapse = W, t.Dropdown = le, t.Modal = Se, t.Popover = Je, t.Scrollspy = ln, t.Tab = gn, t.Toast = Sn, t.Tooltip = Ve, t.Util = u, Object.defineProperty(t, "__esModule", {
    value: !0
  });
});
/**
 * Swiper 14.3.0
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2026 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: September 28, 2026
 */

var Swiper = function () {
  "use strict";

  function e(e = "") {
    return e.trim().split(" ").filter(e => !!e.trim());
  }
  function t(e, t = 0) {
    return setTimeout(e, t);
  }
  function s() {
    return Date.now();
  }
  function i(e, t = "x") {
    const s = function (e) {
        return window.getComputedStyle(e, null);
      }(e),
      i = s.transform || s.webkitTransform;
    if (!i || "none" === i) return 0;
    const r = new DOMMatrixReadOnly(i);
    return "x" === t ? r.m41 : r.m42;
  }
  function r(e) {
    return "object" == typeof e && null !== e && !!e.constructor && "Object" === Object.prototype.toString.call(e).slice(8, -1);
  }
  function a(e) {
    return "undefined" != typeof HTMLElement && e instanceof HTMLElement || !!e && "object" == typeof e && (1 === e.nodeType || 11 === e.nodeType);
  }
  function n(e, ...t) {
    const s = Object(e);
    for (let e = 0; e < t.length; e += 1) {
      const i = t[e];
      if (null == i || a(i)) continue;
      const l = i,
        o = Object.keys(Object(l));
      for (let e = 0, t = o.length; e < t; e += 1) {
        const t = o[e];
        if ("__proto__" === t || "constructor" === t || "prototype" === t) continue;
        const i = Object.getOwnPropertyDescriptor(l, t);
        if (!i || !i.enumerable) continue;
        const a = l[t];
        r(s[t]) && r(a) ? a.__swiper__ ? s[t] = a : n(s[t], a) : !r(s[t]) && r(a) ? (s[t] = {}, a.__swiper__ ? s[t] = a : n(s[t], a)) : s[t] = a;
      }
    }
    return s;
  }
  function l(e, t, s) {
    e.style.setProperty(t, s);
  }
  function o(e) {
    const t = e.querySelector(".swiper-slide-transform");
    if (t) return t;
    if (e.shadowRoot) {
      const t = e.shadowRoot.querySelector(".swiper-slide-transform");
      if (t) return t;
    }
    return e;
  }
  function d(e, t = "") {
    const s = [...e.children];
    return e instanceof HTMLSlotElement && s.push(...e.assignedElements()), t ? s.filter(e => e.matches(t)) : s;
  }
  function c(e) {
    try {
      console.warn(e);
    } catch {}
  }
  function p(t, s = []) {
    const i = document.createElement(t);
    return i.classList.add(...(Array.isArray(s) ? s : e(s))), i;
  }
  function u(e) {
    const t = e.getBoundingClientRect();
    return {
      top: t.top - (e.clientTop || 0),
      left: t.left - (e.clientLeft || 0)
    };
  }
  function m(e, t) {
    return window.getComputedStyle(e, null).getPropertyValue(t);
  }
  function h(e) {
    if (e && e.parentNode) return [...e.parentNode.children].indexOf(e);
  }
  function f(e, t) {
    const s = [];
    let i = e.parentElement;
    for (; i;) t && !i.matches(t) || s.push(i), i = i.parentElement;
    return s;
  }
  function g(e, t) {
    t && e.addEventListener("transitionend", function s(i) {
      i.target === e && (e.removeEventListener("transitionend", s), t.call(e, i));
    });
  }
  function v(e, t, s) {
    {
      const s = window.getComputedStyle(e, null);
      return e["width" === t ? "offsetWidth" : "offsetHeight"] + parseFloat(s.getPropertyValue("width" === t ? "margin-right" : "margin-top")) + parseFloat(s.getPropertyValue("width" === t ? "margin-left" : "margin-bottom"));
    }
  }
  function w(e) {
    return (Array.isArray(e) ? e : [e]).filter(e => !!e);
  }
  function b(e) {
    return t => Math.abs(t) > 0 && e.browser && e.browser.need3dFix && Math.abs(t) % 90 == 0 ? t + .001 : t;
  }
  function y(e, t = "") {
    const s = globalThis.trustedTypes;
    e.innerHTML = void 0 !== s ? s.createPolicy("html", {
      createHTML: e => e
    }).createHTML(t) : t;
  }
  let E, S, x;
  function T() {
    return E || (E = "undefined" == typeof window ? {
      touch: !1
    } : {
      touch: "ontouchstart" in window || navigator.maxTouchPoints > 0
    }), E;
  }
  function M(e = {}) {
    return S || (S = function ({
      userAgent: e
    } = {}) {
      if ("undefined" == typeof window) return {
        ios: !1,
        android: !1
      };
      const t = T(),
        s = navigator.platform,
        i = e || navigator.userAgent,
        r = {
          ios: !1,
          android: !1
        },
        a = /(Android);?[\s/]+([\d.]+)?/.test(i),
        n = /(iPhone\sOS|iOS|iPod)/.test(i),
        l = /iPad/.test(i),
        o = "MacIntel" === s && t.touch && navigator.maxTouchPoints > 1,
        d = l || o;
      return a && !("Win32" === s) && (r.os = "android", r.android = !0), (d || n) && (r.os = "ios", r.ios = !0), r;
    }(e)), S;
  }
  function C() {
    return x || (x = function () {
      if ("undefined" == typeof window) return {
        isSafari: !1,
        isWebView: !1,
        need3dFix: !1
      };
      const e = M(),
        t = navigator.userAgent,
        s = t.toLowerCase(),
        i = s.includes("safari") && !s.includes("chrome") && !s.includes("android"),
        r = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(t);
      return {
        isSafari: i,
        isWebView: r,
        need3dFix: i || r && e.ios
      };
    }()), x;
  }
  const P = (e, t) => {
      if (!e || e.destroyed || !e.params || !e.params.lazyPreload) return;
      const s = t.closest(e.isElement ? "swiper-slide" : `.${e.params.slideClass}`);
      if (s) {
        let t = s.querySelector(`.${e.params.lazyPreloaderClass}`);
        !t && e.isElement && (s.shadowRoot ? t = s.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`) : requestAnimationFrame(() => {
          if (s.shadowRoot) {
            const t = s.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`);
            t && !t.lazyPreloaderManaged && t.remove();
          }
        })), t && !t.lazyPreloaderManaged && t.remove();
      }
    },
    L = (e, t) => {
      if (!e.slides[t]) return;
      const s = e.slides[t].querySelector('[loading="lazy"]');
      s && s.removeAttribute("loading");
    },
    A = e => {
      if (!e || e.destroyed || !e.params || !e.params.lazyPreload) return;
      let t = e.params.lazyPreloadPrevNext;
      const s = e.slides.length;
      if (!s || !t || t < 0) return;
      t = Math.min(t, s);
      const i = "auto" === e.params.slidesPerView ? e.slidesPerViewDynamic() : Math.ceil(e.params.slidesPerView),
        r = e.activeIndex;
      if (e.params.grid && (e.params.grid.rows ?? 1) > 1) {
        const s = r,
          a = [s - t];
        return a.push(...Array.from({
          length: t
        }).map((e, t) => s + i + t)), void e.slides.forEach((t, s) => {
          void 0 !== t.column && a.includes(t.column) && L(e, s);
        });
      }
      const a = r + i - 1;
      if (e.params.rewind || e.params.loop) for (let i = r - t; i <= a + t; i += 1) {
        const t = (i % s + s) % s;
        (t < r || t > a) && L(e, t);
      } else for (let i = Math.max(r - t, 0); i <= Math.min(a + t, s - 1); i += 1) i !== r && (i > a || i < r) && L(e, i);
    };
  const I = (e, t) => !!(e.grid && t.grid && t.grid.rows > 1);
  var z = {
    setBreakpoint: function () {
      const e = this,
        {
          realIndex: t,
          initialized: s,
          params: i,
          el: r
        } = e,
        a = i.breakpoints;
      if (!a || a && 0 === Object.keys(a).length) return;
      const l = "window" !== i.breakpointsBase && i.breakpointsBase ? "container" : i.breakpointsBase,
        o = ["window", "container"].includes(i.breakpointsBase) || !i.breakpointsBase ? e.el : document.querySelector(i.breakpointsBase),
        d = e.getBreakpoint(a, l, o);
      if (!d || e.currentBreakpoint === d) return;
      const c = (d in a ? a[d] : void 0) || e.originalParams,
        p = I(e, i),
        u = I(e, c),
        m = e.params.grabCursor,
        h = c.grabCursor,
        f = i.enabled;
      p && !u ? (r.classList.remove(`${i.containerModifierClass}grid`, `${i.containerModifierClass}grid-column`), e.emitContainerClasses()) : !p && u && (r.classList.add(`${i.containerModifierClass}grid`), (c.grid.fill && "column" === c.grid.fill || !c.grid.fill && "column" === i.grid.fill) && r.classList.add(`${i.containerModifierClass}grid-column`), e.emitContainerClasses()), m && !h ? e.unsetGrabCursor() : !m && h && e.setGrabCursor();
      const g = (e, t) => e[t];
      ["navigation", "pagination", "scrollbar"].forEach(t => {
        const s = g(c, t);
        if (void 0 === s) return;
        const r = g(i, t),
          a = "object" == typeof r && null !== r && r.enabled,
          n = "object" == typeof s && null !== s && s.enabled,
          l = e[t];
        a && !n && l?.disable?.(), !a && n && l?.enable?.();
      });
      const v = c.direction && c.direction !== i.direction,
        w = i.loop && (c.slidesPerView !== i.slidesPerView || v),
        b = i.loop;
      v && s && e.changeDirection(), n(e.params, c);
      const y = e.params.enabled,
        E = e.params.loop;
      Object.assign(e, {
        allowTouchMove: e.params.allowTouchMove,
        allowSlideNext: e.params.allowSlideNext,
        allowSlidePrev: e.params.allowSlidePrev
      }), f && !y ? e.disable() : !f && y && e.enable(), e.currentBreakpoint = d, e.emit("_beforeBreakpoint", c), s && (w ? (e.loopDestroy(), e.updateSlides(), e.loopCreate(t)) : !b && E ? (e.updateSlides(), e.loopCreate(t)) : b && !E && e.loopDestroy()), e.emit("breakpoint", c);
    },
    getBreakpoint: function (e, t = "window", s) {
      if (!e || "container" === t && !s) return;
      let i = !1;
      const r = "window" === t ? window.innerHeight : s.clientHeight,
        a = Object.keys(e).map(e => {
          if ("string" == typeof e && 0 === e.indexOf("@")) {
            const t = parseFloat(e.substr(1));
            return {
              value: r * t,
              point: e
            };
          }
          return {
            value: e,
            point: e
          };
        });
      a.sort((e, t) => parseInt(String(e.value), 10) - parseInt(String(t.value), 10));
      for (let e = 0; e < a.length; e += 1) {
        const {
          point: r,
          value: n
        } = a[e];
        "window" === t ? window.matchMedia(`(min-width: ${n}px)`).matches && (i = r) : n <= s.clientWidth && (i = r);
      }
      return i || "max";
    }
  };
  var $ = {
    checkOverflow: function () {
      const e = this,
        {
          isLocked: t,
          params: s
        } = e,
        {
          slidesOffsetBefore: i
        } = s;
      if (i) {
        const t = e.slides.length - 1,
          s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
        e.isLocked = e.size > s;
      } else e.isLocked = 1 === e.snapGrid.length;
      !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked), !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked), t && t !== e.isLocked && (e.isEnd = !1), t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
    }
  };
  var k = {
    addClasses: function () {
      const e = this,
        {
          classNames: t,
          params: s,
          rtl: i,
          el: r,
          device: a
        } = e,
        n = function (e, t) {
          const s = [];
          return e.forEach(e => {
            "object" == typeof e ? Object.keys(e).forEach(i => {
              e[i] && s.push(t + i);
            }) : "string" == typeof e && s.push(t + e);
          }), s;
        }(["initialized", s.direction, {
          "free-mode": e.params.freeMode && s.freeMode.enabled
        }, {
          autoheight: s.autoHeight
        }, {
          rtl: i
        }, {
          grid: s.grid && s.grid.rows > 1
        }, {
          "grid-column": s.grid && s.grid.rows > 1 && "column" === s.grid.fill
        }, {
          android: a.android
        }, {
          ios: a.ios
        }, {
          "css-mode": s.cssMode
        }, {
          centered: s.cssMode && s.centeredSlides
        }, {
          "watch-progress": s.watchSlidesProgress
        }], s.containerModifierClass);
      t.push(...n), r.classList.add(...t), e.emitContainerClasses();
    },
    removeClasses: function () {
      const {
        el: e,
        classNames: t
      } = this;
      e && "string" != typeof e && (e.classList.remove(...t), this.emitContainerClasses());
    }
  };
  const O = {
    init: !0,
    direction: "horizontal",
    oneWayMovement: !1,
    swiperElementNodeName: "SWIPER-CONTAINER",
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    eventsPrefix: "swiper",
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    snapToSlideEdge: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: .5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: .85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopAddBlankSlides: !0,
    loopAdditionalSlides: 0,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-blank",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideFullyVisibleClass: "swiper-slide-fully-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreload: !0,
    lazyPreloaderClass: "swiper-lazy-preloader",
    lazyPreloadPrevNext: 0,
    runCallbacksOnInit: !0,
    _emitClasses: !1
  };
  var D = {
    on(e, t, s) {
      const i = this;
      if (!i.eventsListeners || i.destroyed) return i;
      if ("function" != typeof t) return i;
      const r = s ? "unshift" : "push";
      return e.split(" ").forEach(e => {
        i.eventsListeners[e] || (i.eventsListeners[e] = []), i.eventsListeners[e][r](t);
      }), i;
    },
    once(e, t, s) {
      const i = this;
      if (!i.eventsListeners || i.destroyed) return i;
      if ("function" != typeof t) return i;
      const r = function (...s) {
        i.off(e, r), r.__emitterProxy && delete r.__emitterProxy, t.apply(i, s);
      };
      return r.__emitterProxy = t, i.on(e, r, s);
    },
    onAny(e, t) {
      const s = this;
      if (!s.eventsListeners || s.destroyed) return s;
      if ("function" != typeof e) return s;
      const i = t ? "unshift" : "push";
      return s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[i](e), s;
    },
    offAny(e) {
      const t = this;
      if (!t.eventsListeners || t.destroyed) return t;
      if (!t.eventsAnyListeners) return t;
      const s = t.eventsAnyListeners.indexOf(e);
      return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
    },
    off(e, t) {
      const s = this;
      return !s.eventsListeners || s.destroyed ? s : s.eventsListeners ? (e.split(" ").forEach(e => {
        void 0 === t ? s.eventsListeners[e] = [] : s.eventsListeners[e] && s.eventsListeners[e].forEach((i, r) => {
          (i === t || i.__emitterProxy && i.__emitterProxy === t) && s.eventsListeners[e].splice(r, 1);
        });
      }), s) : s;
    },
    emit(...e) {
      const t = this;
      if (!t.eventsListeners || t.destroyed) return t;
      if (!t.eventsListeners) return t;
      let s, i, r;
      if ("string" == typeof e[0] || Array.isArray(e[0])) s = e[0], i = e.slice(1, e.length), r = t;else {
        const a = e[0];
        s = a.events, i = a.data ?? [], r = a.context || t;
      }
      i.unshift(r);
      return (Array.isArray(s) ? s : s.split(" ")).forEach(e => {
        t.eventsAnyListeners && t.eventsAnyListeners.length && t.eventsAnyListeners.forEach(t => {
          t.apply(r, [e, ...i]);
        }), t.eventsListeners && t.eventsListeners[e] && t.eventsListeners[e].forEach(e => {
          e.apply(r, i);
        });
      }), t;
    }
  };
  function G(e) {
    const t = this;
    t.destroyed || t.enabled && (t.allowClick || (t.params.preventClicks && e.preventDefault(), t.params.preventClicksPropagation && t.animating && (e.stopPropagation(), e.stopImmediatePropagation())));
  }
  function X() {
    const e = this;
    e.destroyed || e.documentTouchHandlerProceeded || (e.documentTouchHandlerProceeded = !0, e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"));
  }
  function B(e) {
    const t = this;
    t.destroyed || (P(t, e.target), "error" === e.type || t.params.cssMode || "auto" !== t.params.slidesPerView && !t.params.autoHeight || t.update());
  }
  function H() {
    const e = this,
      {
        params: t,
        el: s
      } = e;
    if (s && 0 === s.offsetWidth) return;
    t.breakpoints && e.setBreakpoint();
    const {
        allowSlideNext: i,
        allowSlidePrev: r,
        snapGrid: a
      } = e,
      n = e.virtual && e.params.virtual?.enabled;
    e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), e.updateSlidesClasses();
    const l = n && t.loop;
    if (!("auto" === t.slidesPerView || t.slidesPerView > 1) || !e.isEnd || e.isBeginning || e.params.centeredSlides || l) e.params.loop && !n ? e.slideToLoop(e.realIndex, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0);else {
      const t = n ? e.virtual.slides.length : e.slides.length;
      e.slideTo(t - 1, 0, !1, !0);
    }
    if (e.autoplay && e.autoplay.running && e.autoplay.paused) {
      const t = e.autoplay;
      clearTimeout(t.resizeTimeout), t.resizeTimeout = setTimeout(() => {
        e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.resume();
      }, 500);
    }
    e.allowSlidePrev = r, e.allowSlideNext = i, e.params.watchOverflow && a !== e.snapGrid && e.checkOverflow();
  }
  function Y() {
    const e = this;
    if (e.destroyed) return;
    const {
      wrapperEl: t,
      rtlTranslate: s,
      enabled: i
    } = e;
    if (!i) return;
    let r;
    e.previousTranslate = e.translate, e.isHorizontal() ? e.translate = -t.scrollLeft : e.translate = -t.scrollTop, 0 === e.translate && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses();
    const a = e.maxTranslate() - e.minTranslate();
    r = 0 === a ? 0 : (e.translate - e.minTranslate()) / a, r !== e.progress && e.updateProgress(s ? -e.translate : e.translate), e.emit("setTranslate", e.translate, !1);
  }
  function R(e) {
    const i = this;
    if (i.destroyed) return;
    const r = i.touchEventsData;
    let a = e.originalEvent ?? e;
    if ("touchend" === a.type || "touchcancel" === a.type) {
      const e = [...a.changedTouches].find(e => e.identifier === r.touchId);
      if (!e || e.identifier !== r.touchId) return;
    } else {
      if (null !== r.touchId) return;
      if (a.pointerId !== r.pointerId) return;
    }
    if (["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(a.type)) {
      if (!(["pointercancel", "contextmenu"].includes(a.type) && (i.browser.isSafari || i.browser.isWebView))) return;
    }
    r.pointerId = null, r.touchId = null, r.startEventPath = void 0, r.lastMoveEvent = void 0;
    const {
      params: n,
      touches: l,
      rtlTranslate: o,
      slidesGrid: d,
      enabled: c
    } = i;
    if (!c) return;
    if (!n.simulateTouch && "mouse" === a.pointerType) return;
    if (r.allowTouchCallbacks && i.emit("touchEnd", a), r.allowTouchCallbacks = !1, !r.isTouched) return r.isMoved && n.grabCursor && i.setGrabCursor(!1), r.isMoved = !1, void (r.startMoving = !1);
    n.grabCursor && r.isMoved && r.isTouched && (!0 === i.allowSlideNext || !0 === i.allowSlidePrev) && i.setGrabCursor(!1);
    const p = s(),
      u = p - r.touchStartTime;
    if (i.allowClick) {
      const e = a.path ?? (a.composedPath && a.composedPath());
      i.updateClickedSlide(e && e[0], e), i.emit("tap click", a), u < 300 && p - r.lastClickTime < 300 && i.emit("doubleTap doubleClick", a);
    }
    if (r.lastClickTime = s(), t(() => {
      i.destroyed || (i.allowClick = !0);
    }), !r.isTouched || !r.isMoved || !i.swipeDirection || 0 === l.diff && !r.loopSwapReset || r.currentTranslate === r.startTranslate && !r.loopSwapReset) return r.isTouched = !1, r.isMoved = !1, void (r.startMoving = !1);
    let m;
    if (r.isTouched = !1, r.isMoved = !1, r.startMoving = !1, m = n.followFinger ? o ? i.translate : -i.translate : -(r.currentTranslate ?? 0), n.cssMode) return;
    if (n.freeMode && n.freeMode.enabled) return void i.freeMode.onTouchEnd({
      currentPos: m
    });
    const h = m >= -i.maxTranslate() && !i.params.loop;
    let f = 0,
      g = i.slidesSizesGrid[0];
    for (let e = 0; e < d.length; e += e < n.slidesPerGroupSkip ? 1 : n.slidesPerGroup) {
      const t = e < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
      void 0 !== d[e + t] ? (h || m >= d[e] && m < d[e + t]) && (f = e, g = d[e + t] - d[e]) : (h || m >= d[e]) && (f = e, g = d[d.length - 1] - d[d.length - 2]);
    }
    let v = null,
      w = null;
    n.rewind && (i.isBeginning ? w = n.virtual?.enabled && i.virtual ? i.virtual.slides.length - 1 : i.slides.length - 1 : i.isEnd && (v = 0));
    const b = (m - d[f]) / g,
      y = f < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
    if (u > n.longSwipesMs) {
      if (!n.longSwipes) return void i.slideTo(i.activeIndex);
      "next" === i.swipeDirection && (b >= n.longSwipesRatio ? i.slideTo(n.rewind && i.isEnd ? v : f + y) : i.slideTo(f)), "prev" === i.swipeDirection && (b > 1 - n.longSwipesRatio ? i.slideTo(f + y) : null !== w && b < 0 && Math.abs(b) > n.longSwipesRatio ? i.slideTo(w) : i.slideTo(f));
    } else {
      if (!n.shortSwipes) return void i.slideTo(i.activeIndex);
      i.navigation && (a.target === i.navigation.nextEl || a.target === i.navigation.prevEl) ? a.target === i.navigation.nextEl ? i.slideTo(f + y) : i.slideTo(f) : ("next" === i.swipeDirection && i.slideTo(null !== v ? v : f + y), "prev" === i.swipeDirection && i.slideTo(null !== w ? w : f));
    }
  }
  function _(e) {
    const t = this;
    if (t.destroyed) return;
    const i = t.touchEventsData,
      {
        params: r,
        touches: a,
        rtlTranslate: n,
        enabled: l
      } = t;
    if (!l) return;
    if (!r.simulateTouch && "mouse" === e.pointerType) return;
    const o = e,
      d = o.originalEvent ?? o;
    if ("pointermove" === d.type) {
      if (null !== i.touchId) return;
      if (d.pointerId !== i.pointerId) return;
    }
    let c;
    if ("touchmove" === d.type) {
      const e = [...d.changedTouches].find(e => e.identifier === i.touchId);
      if (!e || e.identifier !== i.touchId) return;
      c = e;
    } else c = d;
    if (!i.isTouched) return void (i.startMoving && i.isScrolling && t.emit("touchMoveOpposite", d));
    if (i.lastMoveEvent === d) return;
    i.lastMoveEvent = d;
    for (const s of i.startEventPath ?? []) {
      if (s === t.el) break;
      const i = s.swiper;
      i && i !== t && !i.destroyed && i.params.nested && i.touchEventsData.isTouched && i.onTouchMove(e);
    }
    const p = c.pageX,
      u = c.pageY;
    if (d.preventedByNestedSwiper) return a.startX = p, void (a.startY = u);
    if (!t.allowTouchMove) return d.target.matches(i.focusableElements) || (t.allowClick = !1), void (i.isTouched && (Object.assign(a, {
      startX: p,
      startY: u,
      currentX: p,
      currentY: u
    }), i.touchStartTime = s()));
    if (r.touchReleaseOnEdges && !r.loop) if (t.isVertical()) {
      if (u < a.startY && t.translate <= t.maxTranslate() || u > a.startY && t.translate >= t.minTranslate()) return i.isTouched = !1, void (i.isMoved = !1);
    } else {
      if (n && (p > a.startX && -t.translate <= t.maxTranslate() || p < a.startX && -t.translate >= t.minTranslate())) return;
      if (!n && (p < a.startX && t.translate <= t.maxTranslate() || p > a.startX && t.translate >= t.minTranslate())) return;
    }
    if (document.activeElement && document.activeElement.matches(i.focusableElements) && document.activeElement !== d.target && "mouse" !== d.pointerType && document.activeElement.blur(), document.activeElement && d.target === document.activeElement && d.target.matches(i.focusableElements)) return i.isMoved = !0, void (t.allowClick = !1);
    i.allowTouchCallbacks && t.emit("touchMove", d), a.previousX = a.currentX, a.previousY = a.currentY, a.currentX = p, a.currentY = u;
    const m = a.currentX - a.startX,
      h = a.currentY - a.startY;
    if (t.params.threshold && Math.sqrt(m ** 2 + h ** 2) < t.params.threshold) return;
    if (void 0 === i.isScrolling) {
      let e;
      t.isHorizontal() && a.currentY === a.startY || t.isVertical() && a.currentX === a.startX ? i.isScrolling = !1 : m * m + h * h >= 25 && (e = 180 * Math.atan2(Math.abs(h), Math.abs(m)) / Math.PI, i.isScrolling = t.isHorizontal() ? e > r.touchAngle : 90 - e > r.touchAngle);
    }
    if (i.isScrolling && t.emit("touchMoveOpposite", d), void 0 === i.startMoving && (a.currentX === a.startX && a.currentY === a.startY || (i.startMoving = !0)), i.isScrolling || "touchmove" === d.type && i.preventTouchMoveFromPointerMove) return void (i.isTouched = !1);
    if (!i.startMoving) return;
    t.allowClick = !1, !r.cssMode && d.cancelable && d.preventDefault(), r.touchMoveStopPropagation && !r.nested && d.stopPropagation();
    let f = t.isHorizontal() ? m : h,
      g = t.isHorizontal() ? a.currentX - a.previousX : a.currentY - a.previousY;
    r.oneWayMovement && (f = Math.abs(f) * (n ? 1 : -1), g = Math.abs(g) * (n ? 1 : -1)), a.diff = f, f *= r.touchRatio, n && (f = -f, g = -g);
    const v = t.touchesDirection;
    t.swipeDirection = f > 0 ? "prev" : "next", t.touchesDirection = g > 0 ? "prev" : "next";
    const w = t.params.loop && !r.cssMode,
      b = "next" === t.touchesDirection && t.allowSlideNext || "prev" === t.touchesDirection && t.allowSlidePrev;
    if (!i.isMoved) {
      if (w && b && t.loopFix({
        direction: t.swipeDirection
      }), i.startTranslate = t.getTranslate(), t.setTransition(0), t.animating) {
        const e = new window.CustomEvent("transitionend", {
          bubbles: !0,
          cancelable: !0,
          detail: {
            bySwiperTouchMove: !0
          }
        });
        t.wrapperEl.dispatchEvent(e);
      }
      i.allowMomentumBounce = !1, !r.grabCursor || !0 !== t.allowSlideNext && !0 !== t.allowSlidePrev || t.setGrabCursor(!0), t.emit("sliderFirstMove", d);
    }
    if (new Date().getTime(), !1 !== r._loopSwapReset && i.isMoved && i.allowThresholdMove && v !== t.touchesDirection && w && b && Math.abs(f) >= 1) return Object.assign(a, {
      startX: p,
      startY: u,
      currentX: p,
      currentY: u,
      startTranslate: i.currentTranslate
    }), i.loopSwapReset = !0, void (i.startTranslate = i.currentTranslate);
    t.emit("sliderMove", d), i.isMoved = !0;
    const y = i.startTranslate ?? 0;
    i.currentTranslate = f + y;
    let E = !0,
      S = r.resistanceRatio;
    if (r.touchReleaseOnEdges && (S = 0), f > 0 ? (w && b && i.allowThresholdMove && i.currentTranslate > (r.centeredSlides ? t.minTranslate() - t.slidesSizesGrid[t.activeIndex + 1] - ("auto" !== r.slidesPerView && t.slides.length - r.slidesPerView >= 2 ? t.slidesSizesGrid[t.activeIndex + 1] + t.params.spaceBetween : 0) - t.params.spaceBetween : t.minTranslate()) && t.loopFix({
      direction: "prev",
      setTranslate: !0,
      activeSlideIndex: 0
    }), i.currentTranslate > t.minTranslate() && (E = !1, r.resistance && (i.currentTranslate = t.minTranslate() - 1 + (-t.minTranslate() + y + f) ** S))) : f < 0 && (w && b && i.allowThresholdMove && i.currentTranslate < (r.centeredSlides ? t.maxTranslate() + t.slidesSizesGrid[t.slidesSizesGrid.length - 1] + t.params.spaceBetween + ("auto" !== r.slidesPerView && t.slides.length - r.slidesPerView >= 2 ? t.slidesSizesGrid[t.slidesSizesGrid.length - 1] + t.params.spaceBetween : 0) : t.maxTranslate()) && t.loopFix({
      direction: "next",
      setTranslate: !0,
      activeSlideIndex: t.slides.length - ("auto" === r.slidesPerView ? t.slidesPerViewDynamic() : Math.ceil(parseFloat(String(r.slidesPerView))))
    }), i.currentTranslate < t.maxTranslate() && (E = !1, r.resistance && (i.currentTranslate = t.maxTranslate() + 1 - (t.maxTranslate() - y - f) ** S))), E && (d.preventedByNestedSwiper = !0), !t.allowSlideNext && "next" === t.swipeDirection && (i.currentTranslate ?? 0) < y && (i.currentTranslate = y), !t.allowSlidePrev && "prev" === t.swipeDirection && (i.currentTranslate ?? 0) > y && (i.currentTranslate = y), t.allowSlidePrev || t.allowSlideNext || (i.currentTranslate = y), r.threshold > 0) {
      if (!(Math.abs(f) > r.threshold || i.allowThresholdMove)) return void (i.currentTranslate = i.startTranslate);
      if (!i.allowThresholdMove) return i.allowThresholdMove = !0, a.startX = a.currentX, a.startY = a.currentY, i.currentTranslate = i.startTranslate, void (a.diff = t.isHorizontal() ? a.currentX - a.startX : a.currentY - a.startY);
    }
    r.followFinger && !r.cssMode && ((r.freeMode && r.freeMode.enabled && t.freeMode || r.watchSlidesProgress) && (t.updateActiveIndex(), t.updateSlidesClasses()), r.freeMode && r.freeMode.enabled && t.freeMode && t.freeMode.onTouchMove(), t.updateProgress(i.currentTranslate), t.setTranslate(i.currentTranslate ?? 0));
  }
  function N(e, t, s) {
    const {
        params: i
      } = e,
      r = i.edgeSwipeDetection,
      a = i.edgeSwipeThreshold;
    return !r || !(s <= a || s >= window.innerWidth - a) || "prevent" === r && (t.preventDefault(), !0);
  }
  function V(e) {
    const t = this;
    if (t.destroyed) return;
    const i = e.originalEvent ?? e,
      r = t.touchEventsData;
    if ("pointerdown" === i.type) {
      const e = i;
      if (null !== r.pointerId && r.pointerId !== e.pointerId) return;
      r.pointerId = e.pointerId;
    } else "touchstart" === i.type && 1 === i.targetTouches.length && (r.touchId = i.targetTouches[0].identifier);
    if ("touchstart" === i.type) return void N(t, i, i.targetTouches[0].pageX);
    const {
      params: a,
      touches: n,
      enabled: l
    } = t;
    if (!l) return;
    if (!a.simulateTouch && "mouse" === i.pointerType) return;
    if (t.animating && a.preventInteractionOnTransition) return;
    !t.animating && a.cssMode && a.loop && t.loopFix();
    let o = i.target;
    if ("wrapper" === a.touchEventsTarget && !function (e, t) {
      let s = t.contains(e);
      !s && t instanceof HTMLSlotElement && (s = [...t.assignedElements()].includes(e), s || (s = function (e, t) {
        const s = [t];
        for (; s.length > 0;) {
          const t = s.shift();
          if (e === t) return !0;
          s.push(...t.children, ...(t.shadowRoot ? t.shadowRoot.children : []), ...(t.assignedElements ? t.assignedElements() : []));
        }
        return !1;
      }(e, t)));
      return s;
    }(o, t.wrapperEl)) return;
    const d = i;
    if ("number" == typeof d.which && 3 === d.which) return;
    if ("number" == typeof d.button && d.button > 0) return;
    if (r.isTouched && r.isMoved) return;
    const c = !!a.noSwipingClass && "" !== a.noSwipingClass,
      p = i.composedPath ? i.composedPath() : i.path;
    c && i.target && i.target.shadowRoot && p && (o = p[0]);
    const u = a.noSwipingSelector ? a.noSwipingSelector : `.${a.noSwipingClass}`,
      m = !(!i.target || !i.target.shadowRoot);
    if (a.noSwiping && (m ? (h = u, function e(t) {
      if (!t || t === document || t === window) return null;
      let s = t;
      s.assignedSlot && (s = s.assignedSlot);
      const i = s.closest(h);
      if (!i && !s.getRootNode) return null;
      const r = s.getRootNode();
      return i || e(r.host);
    }(o)) : o.closest(u))) return void (t.allowClick = !0);
    var h;
    if (a.swipeHandler && "string" == typeof a.swipeHandler && !o.closest(a.swipeHandler)) return;
    const f = i;
    n.currentX = f.pageX, n.currentY = f.pageY;
    const g = n.currentX,
      v = n.currentY;
    if (!N(t, i, g)) return;
    Object.assign(r, {
      isTouched: !0,
      isMoved: !1,
      allowTouchCallbacks: !0,
      isScrolling: void 0,
      startMoving: void 0
    }), n.startX = g, n.startY = v, r.touchStartTime = s(), r.startEventPath = p, t.allowClick = !0, t.updateSize(), t.swipeDirection = void 0, a.threshold > 0 && (r.allowThresholdMove = !1);
    let w = !0;
    o.matches(r.focusableElements) && (w = !1, "SELECT" === o.nodeName && (r.isTouched = !1)), document.activeElement && document.activeElement.matches(r.focusableElements) && document.activeElement !== o && ("mouse" === f.pointerType || "mouse" !== f.pointerType && !o.matches(r.focusableElements)) && document.activeElement.blur();
    const b = w && t.allowTouchMove && a.touchStartPreventDefault;
    !a.touchStartForcePreventDefault && !b || o.isContentEditable || i.preventDefault(), a.freeMode && a.freeMode.enabled && t.freeMode && t.animating && !a.cssMode && t.freeMode.onTouchStart(), t.emit("touchStart", i);
  }
  const q = (e, t) => {
    const {
        params: s,
        el: i,
        wrapperEl: r,
        device: a
      } = e,
      n = !!s.nested,
      l = "on" === t ? "addEventListener" : "removeEventListener",
      o = t;
    if (!i || "string" == typeof i) return;
    document[l]("touchstart", e.onDocumentTouchStart, {
      passive: !1,
      capture: n
    }), i[l]("touchstart", e.onTouchStart, {
      passive: !1
    }), i[l]("pointerdown", e.onTouchStart, {
      passive: !1
    }), document[l]("touchmove", e.onTouchMove, {
      passive: !1,
      capture: n
    }), document[l]("pointermove", e.onTouchMove, {
      passive: !1,
      capture: n
    }), document[l]("touchend", e.onTouchEnd, {
      passive: !0
    }), document[l]("pointerup", e.onTouchEnd, {
      passive: !0
    }), document[l]("pointercancel", e.onTouchEnd, {
      passive: !0
    }), document[l]("touchcancel", e.onTouchEnd, {
      passive: !0
    }), document[l]("pointerout", e.onTouchEnd, {
      passive: !0
    }), document[l]("pointerleave", e.onTouchEnd, {
      passive: !0
    }), document[l]("contextmenu", e.onTouchEnd, {
      passive: !0
    }), (s.preventClicks || s.preventClicksPropagation) && i[l]("click", e.onClick, !0), s.cssMode && r[l]("scroll", e.onScroll);
    const d = t => {
      e[o](t, H, !0);
    };
    s.updateOnWindowResize ? d(a.ios || a.android ? "resize orientationchange observerUpdate" : "resize observerUpdate") : d("observerUpdate"), s.lazyPreload && (i[l]("load", e.onLoad, {
      capture: !0
    }), i[l]("error", e.onLoad, {
      capture: !0
    }));
  };
  var F = {
    loopCreate: function (e, t) {
      const s = this,
        {
          params: i,
          slidesEl: r
        } = s;
      if (!i.loop || s.virtual && s.params.virtual?.enabled) return;
      const a = () => {
          d(r, `.${i.slideClass}, swiper-slide`).forEach((e, t) => {
            e.setAttribute("data-swiper-slide-index", String(t));
          });
        },
        n = s.grid && i.grid && i.grid.rows > 1;
      i.loopAddBlankSlides && (i.slidesPerGroup > 1 || n) && (() => {
        const e = d(r, `.${i.slideBlankClass}`);
        e.forEach(e => {
          e.remove();
        }), e.length > 0 && (s.recalcSlides(), s.updateSlides());
      })();
      const l = i.slidesPerGroup * (n ? i.grid.rows : 1),
        o = s.slides.length % l !== 0,
        u = n && s.slides.length % i.grid.rows !== 0,
        m = e => {
          for (let t = 0; t < e; t += 1) {
            const e = s.isElement ? p("swiper-slide", [i.slideBlankClass]) : p("div", [i.slideClass, i.slideBlankClass]);
            s.slidesEl.append(e);
          }
        };
      if (o) {
        if (i.loopAddBlankSlides) {
          m(l - s.slides.length % l), s.recalcSlides(), s.updateSlides();
        } else c("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
        a();
      } else if (u) {
        if (i.loopAddBlankSlides) {
          m(i.grid.rows - s.slides.length % i.grid.rows), s.recalcSlides(), s.updateSlides();
        } else c("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
        a();
      } else a();
      const h = i.centeredSlides || !!i.slidesOffsetBefore || !!i.slidesOffsetAfter;
      s.loopFix({
        slideRealIndex: e,
        direction: h ? void 0 : "next",
        initial: t
      });
    },
    loopFix: function (e = {}) {
      const {
        slideRealIndex: t,
        slideTo: s = !0,
        direction: i,
        setTranslate: r,
        activeSlideIndex: a,
        initial: n,
        byController: l,
        byMousewheel: o
      } = e;
      let d = a;
      const p = this;
      if (!p.params.loop) return;
      if (p.params.watchOverflow && p.isLocked) return;
      p.emit("beforeLoopFix"), p.__loopFixInProgress__ = !0;
      const {
          slides: u,
          allowSlidePrev: m,
          allowSlideNext: h,
          slidesEl: f,
          params: g
        } = p,
        {
          centeredSlides: v,
          slidesOffsetBefore: w,
          slidesOffsetAfter: b,
          initialSlide: y
        } = g,
        E = v || !!w || !!b;
      if (p.allowSlidePrev = !0, p.allowSlideNext = !0, p.virtual && g.virtual?.enabled) {
        if (s) {
          const e = p.virtual.slides.length,
            t = p.virtual.slidesBefore ?? 0;
          E || 0 !== p.snapIndex ? E && p.snapIndex < g.slidesPerView ? p.slideTo(e + p.snapIndex, 0, !1, !0) : p.snapIndex === p.snapGrid.length - 1 && p.slideTo(t, 0, !1, !0) : p.slideTo(e, 0, !1, !0);
        }
        return p.allowSlidePrev = m, p.allowSlideNext = h, p.__loopFixInProgress__ = !1, void p.emit("loopFix");
      }
      let S = g.slidesPerView;
      "auto" === S ? S = p.slidesPerViewDynamic() : (S = Math.ceil(parseFloat(String(g.slidesPerView))), E && S % 2 == 0 && (S += 1));
      const x = g.slidesPerGroupAuto ? S : g.slidesPerGroup,
        T = e => ("function" == typeof e ? e.call(p) : e) || 0,
        M = p.slidesGrid.length > 1 ? (p.slidesGrid[p.slidesGrid.length - 1] - p.slidesGrid[0]) / (p.slidesGrid.length - 1) : p.size,
        C = M > 0 ? T(w) / M : 0,
        P = M > 0 ? T(b) / M : 0;
      let L = E ? Math.max(x, (v ? Math.ceil(S / 2) : 0) + Math.ceil(Math.max(C, P))) : x;
      L % x !== 0 && (L += x - L % x), L += g.loopAdditionalSlides, p.loopedSlides = L;
      const A = p.grid && g.grid && g.grid.rows > 1;
      u.length < S + L || "cards" === p.params.effect && u.length < S + 2 * L ? c("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters") : A && "row" === g.grid.fill && c("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
      const I = [],
        z = [],
        $ = A ? Math.ceil(u.length / g.grid.rows) : u.length,
        k = n && $ - y < S && !E;
      let O = k ? y : p.activeIndex;
      void 0 === d ? d = p.getSlideIndex(u.find(e => e.classList.contains(g.slideActiveClass))) : O = d;
      const D = "next" === i || !i,
        G = "prev" === i || !i;
      let X = 0,
        B = 0;
      const H = (A ? u[d].column ?? 0 : d) + (E && void 0 === r ? (v ? -S / 2 + .5 : 0) - C : 0);
      if (H < L) {
        X = Math.max(L - H, x);
        for (let e = 0; e < L - H; e += 1) {
          const t = e - Math.floor(e / $) * $;
          if (A) {
            const e = $ - t - 1;
            for (let t = u.length - 1; t >= 0; t -= 1) u[t].column === e && I.push(t);
          } else I.push($ - t - 1);
        }
      } else if (H + S > $ - L) {
        B = Math.max(H - ($ - 2 * L), x), k && (B = Math.max(B, S - $ + y + 1));
        for (let e = 0; e < B; e += 1) {
          const t = e - Math.floor(e / $) * $;
          A ? u.forEach((e, s) => {
            e.column === t && z.push(s);
          }) : z.push(t);
        }
      }
      if (p.__preventObserver__ = !0, requestAnimationFrame(() => {
        p.__preventObserver__ = !1;
      }), "cards" === p.params.effect && u.length < S + 2 * L && (z.includes(d) && z.splice(z.indexOf(d), 1), I.includes(d) && I.splice(I.indexOf(d), 1)), G && I.forEach(e => {
        const t = u[e];
        t.swiperLoopMoveDOM = !0, f.prepend(t), t.swiperLoopMoveDOM = !1;
      }), D && z.forEach(e => {
        const t = u[e];
        t.swiperLoopMoveDOM = !0, f.append(t), t.swiperLoopMoveDOM = !1;
      }), p.recalcSlides(), "auto" === g.slidesPerView ? p.updateSlides() : A && (I.length > 0 && G || z.length > 0 && D) && p.slides.forEach((e, t) => {
        p.grid.updateSlide(t, e, p.slides);
      }), g.watchSlidesProgress && p.updateSlidesOffset(), s) if (I.length > 0 && G) {
        if (void 0 === t) {
          const e = p.slidesGrid[O],
            t = p.slidesGrid[O + X] - e;
          o ? p.setTranslate(p.translate - t) : (p.slideTo(O + Math.ceil(X), 0, !1, !0), r && (p.touchEventsData.startTranslate = p.touchEventsData.startTranslate - t, p.touchEventsData.currentTranslate = p.touchEventsData.currentTranslate - t));
        } else if (r) {
          const e = A ? I.length / g.grid.rows : I.length;
          p.slideTo(p.activeIndex + e, 0, !1, !0), p.touchEventsData.currentTranslate = p.translate;
        }
      } else if (z.length > 0 && D) if (void 0 === t) {
        const e = p.slidesGrid[O],
          t = p.slidesGrid[O - B] - e;
        o ? p.setTranslate(p.translate - t) : (p.slideTo(O - B, 0, !1, !0), r && (p.touchEventsData.startTranslate = p.touchEventsData.startTranslate - t, p.touchEventsData.currentTranslate = p.touchEventsData.currentTranslate - t));
      } else {
        const e = A ? z.length / g.grid.rows : z.length;
        p.slideTo(p.activeIndex - e, 0, !1, !0);
      }
      p.allowSlidePrev = m, p.allowSlideNext = h;
      const Y = p.controller?.control;
      if (Y && !l) {
        const e = {
          slideRealIndex: t,
          direction: i,
          setTranslate: r,
          activeSlideIndex: d,
          byController: !0
        };
        Array.isArray(Y) ? Y.forEach(t => {
          !t.destroyed && t.params.loop && t.loopFix({
            ...e,
            slideTo: t.params.slidesPerView === g.slidesPerView && s
          });
        }) : Y instanceof p.constructor && Y.params.loop && Y.loopFix({
          ...e,
          slideTo: Y.params.slidesPerView === g.slidesPerView && s
        });
      }
      p.__loopFixInProgress__ = !1, p.emit("loopFix");
    },
    loopDestroy: function () {
      const e = this,
        {
          params: t,
          slidesEl: s
        } = e;
      if (!t.loop || !s || e.virtual && e.params.virtual?.enabled) return;
      e.recalcSlides();
      const i = [];
      e.slides.forEach(e => {
        const t = e,
          s = void 0 === t.swiperSlideIndex ? Number(e.getAttribute("data-swiper-slide-index")) : t.swiperSlideIndex;
        i[s] = e;
      }), e.slides.forEach(e => {
        e.removeAttribute("data-swiper-slide-index");
      }), i.forEach(e => {
        s.append(e);
      }), e.recalcSlides(), e.slideTo(e.realIndex, 0);
    }
  };
  function W(e, t) {
    return function (s = {}) {
      const i = Object.keys(s)[0],
        r = s[i];
      "object" == typeof r && null !== r ? (!0 === e[i] && (e[i] = {
        enabled: !0
      }), "navigation" === i && e[i] && e[i].enabled && !e[i].prevEl && !e[i].nextEl && (e[i].auto = !0), ["pagination", "scrollbar"].indexOf(i) >= 0 && e[i] && e[i].enabled && !e[i].el && (e[i].auto = !0), i in e && "enabled" in r ? ("object" != typeof e[i] || "enabled" in e[i] || (e[i].enabled = !0), e[i] || (e[i] = {
        enabled: !1
      }), n(t, s)) : n(t, s)) : n(t, s);
    };
  }
  var j = {
    slideTo: function (e = 0, t, s = !0, i, r) {
      "string" == typeof e && (e = parseInt(e, 10));
      const a = this;
      let n = e;
      n < 0 && (n = 0);
      const {
        params: l,
        snapGrid: o,
        slidesGrid: d,
        previousIndex: c,
        activeIndex: p,
        rtlTranslate: u,
        wrapperEl: m,
        enabled: h
      } = a;
      if (!h && !i && !r || a.destroyed || a.animating && l.preventInteractionOnTransition) return !1;
      void 0 === t && (t = a.params.speed);
      const f = Math.min(a.params.slidesPerGroupSkip, n);
      let g = f + Math.floor((n - f) / a.params.slidesPerGroup);
      g >= o.length && (g = o.length - 1);
      const v = -o[g];
      if (l.normalizeSlideIndex) for (let e = 0; e < d.length; e += 1) {
        const t = -Math.floor(100 * v),
          s = Math.floor(100 * d[e]),
          i = Math.floor(100 * d[e + 1]);
        void 0 !== d[e + 1] ? t >= s && t < i - (i - s) / 2 ? n = e : t >= s && t < i && (n = e + 1) : t >= s && (n = e);
      }
      if (a.initialized && n !== p) {
        if (!a.allowSlideNext && (u ? v > a.translate && v > a.minTranslate() : v < a.translate && v < a.minTranslate())) return !1;
        if (!a.allowSlidePrev && v > a.translate && v > a.maxTranslate() && (p || 0) !== n) return !1;
      }
      let w;
      n !== (c || 0) && s && a.emit("beforeSlideChangeStart"), a.updateProgress(v), w = n > p ? "next" : n < p ? "prev" : "reset";
      const b = a.virtual && a.params.virtual?.enabled;
      if (!(b && r) && (u && -v === a.translate || !u && v === a.translate)) return a.updateActiveIndex(n), l.autoHeight && a.updateAutoHeight(), a.updateSlidesClasses(), "slide" !== l.effect && a.setTranslate(v), "reset" !== w && (a.transitionStart(s, w), a.transitionEnd(s, w)), !1;
      if (l.cssMode) {
        const e = a.isHorizontal(),
          s = u ? v : -v;
        return 0 === t ? (b && (a.wrapperEl.style.scrollSnapType = "none", a._immediateVirtual = !0), b && !a._cssModeVirtualInitialSet && (a.params.initialSlide ?? 0) > 0 ? (a._cssModeVirtualInitialSet = !0, requestAnimationFrame(() => {
          m[e ? "scrollLeft" : "scrollTop"] = s;
        })) : m[e ? "scrollLeft" : "scrollTop"] = s, b && requestAnimationFrame(() => {
          a.wrapperEl.style.scrollSnapType = "", a._immediateVirtual = !1;
        })) : m.scrollTo({
          [e ? "left" : "top"]: s,
          behavior: "smooth"
        }), !0;
      }
      const y = C().isSafari;
      return b && !r && y && a.isElement && a.virtual.update(!1, !1, n), a.setTransition(t), a.setTranslate(v), a.updateActiveIndex(n), a.updateSlidesClasses(), a.emit("beforeTransitionStart", t, i), a.transitionStart(s, w), 0 === t ? a.transitionEnd(s, w) : a.animating || (a.animating = !0, a.onSlideToWrapperTransitionEnd || (a.onSlideToWrapperTransitionEnd = function (e) {
        a && !a.destroyed && e.target === this && (a.wrapperEl.removeEventListener("transitionend", a.onSlideToWrapperTransitionEnd), a.onSlideToWrapperTransitionEnd = null, delete a.onSlideToWrapperTransitionEnd, a.transitionEnd(s, w));
      }), a.wrapperEl.addEventListener("transitionend", a.onSlideToWrapperTransitionEnd)), !0;
    },
    slideToLoop: function (e = 0, t, s = !0, i) {
      if ("string" == typeof e) {
        e = parseInt(e, 10);
      }
      const r = this;
      if (r.destroyed) return;
      void 0 === t && (t = r.params.speed);
      const a = r.grid && r.params.grid && r.params.grid.rows > 1;
      let n = e;
      if (r.params.loop) if (r.virtual && r.params.virtual?.enabled) n += r.virtual.slidesBefore ?? 0;else {
        let e;
        if (a) {
          const t = n * r.params.grid.rows,
            s = r.slides.find(e => Number(e.getAttribute("data-swiper-slide-index")) === t);
          e = s?.column ?? 0;
        } else e = r.getSlideIndexByData(n);
        const t = a ? Math.ceil(r.slides.length / r.params.grid.rows) : r.slides.length,
          {
            centeredSlides: s,
            slidesOffsetBefore: l,
            slidesOffsetAfter: o
          } = r.params,
          d = s || !!l || !!o;
        let c;
        "auto" === r.params.slidesPerView ? c = r.slidesPerViewDynamic() : (c = Math.ceil(parseFloat(String(r.params.slidesPerView))), d && c % 2 == 0 && (c += 1));
        let p = t - e < c;
        if (d && (p = p || e < Math.ceil(c / 2)), i && d && "auto" !== r.params.slidesPerView && !a && (p = !1), p) {
          const s = d ? e < r.activeIndex ? "prev" : "next" : e - r.activeIndex - 1 < r.params.slidesPerView ? "next" : "prev";
          r.loopFix({
            direction: s,
            slideTo: !0,
            activeSlideIndex: "next" === s ? e + 1 : e - t + 1,
            slideRealIndex: "next" === s ? r.realIndex : void 0
          });
        }
        if (a) {
          const e = n * r.params.grid.rows,
            t = r.slides.find(t => Number(t.getAttribute("data-swiper-slide-index")) === e);
          n = t?.column ?? 0;
        } else n = r.getSlideIndexByData(n);
      }
      return requestAnimationFrame(() => {
        r.slideTo(n, t, s, i);
      }), r;
    },
    slideNext: function (e, t = !0, s) {
      const i = this,
        {
          enabled: r,
          params: a,
          animating: n
        } = i;
      if (!r || i.destroyed) return i;
      void 0 === e && (e = i.params.speed);
      let l = a.slidesPerGroup;
      "auto" === a.slidesPerView && 1 === a.slidesPerGroup && a.slidesPerGroupAuto && (l = Math.max(i.slidesPerViewDynamic("current", !0), 1));
      const o = i.activeIndex < a.slidesPerGroupSkip ? 1 : l,
        d = i.virtual && a.virtual?.enabled;
      if (a.loop) {
        if (n && !d && a.loopPreventsSliding) return !1;
        if (i.loopFix({
          direction: "next"
        }), i._clientLeft = i.wrapperEl.clientLeft, i.activeIndex === i.slides.length - 1 && a.cssMode) return requestAnimationFrame(() => {
          i.slideTo(i.activeIndex + o, e, t, s);
        }), !0;
      }
      return a.rewind && i.isEnd ? i.slideTo(0, e, t, s) : i.slideTo(i.activeIndex + o, e, t, s);
    },
    slidePrev: function (e, t = !0, s) {
      const i = this,
        {
          params: r,
          snapGrid: a,
          slidesGrid: n,
          rtlTranslate: l,
          enabled: o,
          animating: d
        } = i;
      if (!o || i.destroyed) return i;
      void 0 === e && (e = i.params.speed);
      const c = i.virtual && r.virtual?.enabled;
      if (r.loop) {
        if (d && !c && r.loopPreventsSliding) return !1;
        i.loopFix({
          direction: "prev"
        }), i._clientLeft = i.wrapperEl.clientLeft;
      }
      function p(e) {
        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
      }
      const u = p(l ? i.translate : -i.translate),
        m = a.map(e => p(e)),
        h = r.freeMode && r.freeMode.enabled;
      let f = a[m.indexOf(u) - 1];
      if (void 0 === f && (r.cssMode || h)) {
        let e;
        a.forEach((t, s) => {
          u >= t && (e = s);
        }), void 0 !== e && (f = h ? a[e] : a[e > 0 ? e - 1 : e]);
      }
      let g = 0;
      if (void 0 !== f && (g = n.indexOf(f), g < 0 && (g = i.activeIndex - 1), "auto" === r.slidesPerView && 1 === r.slidesPerGroup && r.slidesPerGroupAuto && (g = g - i.slidesPerViewDynamic("previous", !0) + 1, g = Math.max(g, 0))), r.rewind && i.isBeginning) {
        const r = i.params.virtual?.enabled && i.virtual ? i.virtual.slides.length - 1 : i.slides.length - 1;
        return i.slideTo(r, e, t, s);
      }
      return r.loop && 0 === i.activeIndex && r.cssMode ? (requestAnimationFrame(() => {
        i.slideTo(g, e, t, s);
      }), !0) : i.slideTo(g, e, t, s);
    },
    slideReset: function (e, t = !0, s) {
      const i = this;
      if (!i.destroyed) return void 0 === e && (e = i.params.speed), i.slideTo(i.activeIndex, e, t, s);
    },
    slideToClosest: function (e, t = !0, s, i = .5) {
      const r = this;
      if (r.destroyed) return;
      void 0 === e && (e = r.params.speed);
      let a = r.activeIndex;
      const n = Math.min(r.params.slidesPerGroupSkip, a),
        l = n + Math.floor((a - n) / r.params.slidesPerGroup),
        o = r.rtlTranslate ? r.translate : -r.translate;
      if (o >= r.snapGrid[l]) {
        const e = r.snapGrid[l];
        o - e > (r.snapGrid[l + 1] - e) * i && (a += r.params.slidesPerGroup);
      } else {
        const e = r.snapGrid[l - 1];
        o - e <= (r.snapGrid[l] - e) * i && (a -= r.params.slidesPerGroup);
      }
      return a = Math.max(a, 0), a = Math.min(a, r.slidesGrid.length - 1), r.slideTo(a, e, t, s);
    },
    slideToClickedSlide: function () {
      const e = this;
      if (e.destroyed) return;
      const {
        params: s,
        slidesEl: i,
        clickedSlide: r,
        clickedIndex: a
      } = e;
      if (void 0 === r || void 0 === a) return;
      const n = "auto" === s.slidesPerView ? e.slidesPerViewDynamic() : s.slidesPerView;
      let l,
        o = e.getSlideIndexWhenGrid(a);
      const c = e.isElement ? "swiper-slide" : `.${s.slideClass}`,
        p = e.grid && e.params.grid && e.params.grid.rows > 1;
      if (s.loop) {
        if (e.animating) return;
        l = parseInt(r.getAttribute("data-swiper-slide-index"), 10), s.centeredSlides ? e.slideToLoop(l) : o > (p ? (e.slides.length - n) / 2 - (e.params.grid.rows - 1) : e.slides.length - n) ? (e.loopFix(), o = e.getSlideIndex(d(i, `${c}[data-swiper-slide-index="${l}"]`)[0]), t(() => {
          e.slideTo(o);
        })) : e.slideTo(o);
      } else e.slideTo(o);
    }
  };
  function U({
    swiper: e,
    runCallbacks: t,
    direction: s,
    step: i
  }) {
    const {
      activeIndex: r,
      previousIndex: a
    } = e;
    let n = s;
    n || (n = r > a ? "next" : r < a ? "prev" : "reset"), e.emit(`transition${i}`), t && "reset" === n ? e.emit(`slideResetTransition${i}`) : t && r !== a && (e.emit(`slideChangeTransition${i}`), "next" === n ? e.emit(`slideNextTransition${i}`) : e.emit(`slidePrevTransition${i}`));
  }
  var K = {
    getTranslate: function (e = this.isHorizontal() ? "x" : "y") {
      const {
        params: t,
        rtlTranslate: s,
        translate: r,
        wrapperEl: a
      } = this;
      if (t.virtualTranslate) return s ? -r : r;
      if (t.cssMode) return r;
      let n = i(a, e);
      return n += this.cssOverflowAdjustment(), s && (n = -n), n || 0;
    },
    setTranslate: function (e, t) {
      const s = this,
        {
          rtlTranslate: i,
          params: r,
          wrapperEl: a,
          progress: n
        } = s;
      let l,
        o = 0,
        d = 0;
      s.isHorizontal() ? o = i ? -e : e : d = e, r.roundLengths && (o = Math.floor(o), d = Math.floor(d)), s.previousTranslate = s.translate, s.translate = s.isHorizontal() ? o : d, r.cssMode ? a[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal() ? -o : -d : r.virtualTranslate || (s.isHorizontal() ? o -= s.cssOverflowAdjustment() : d -= s.cssOverflowAdjustment(), a.style.transform = `translate3d(${o}px, ${d}px, 0px)`);
      const c = s.maxTranslate() - s.minTranslate();
      l = 0 === c ? 0 : (e - s.minTranslate()) / c, l !== n && s.updateProgress(e), s.emit("setTranslate", s.translate, t);
    },
    minTranslate: function () {
      return -this.snapGrid[0];
    },
    maxTranslate: function () {
      return -this.snapGrid[this.snapGrid.length - 1];
    },
    translateTo: function (e = 0, t = this.params.speed, s = !0, i = !0, r) {
      const a = this,
        {
          params: n,
          wrapperEl: l
        } = a;
      if (a.animating && n.preventInteractionOnTransition) return !1;
      const o = a.minTranslate(),
        d = a.maxTranslate();
      let c;
      if (c = i && e > o ? o : i && e < d ? d : e, a.updateProgress(c), n.cssMode) {
        const e = a.isHorizontal();
        return 0 === t ? l[e ? "scrollLeft" : "scrollTop"] = -c : l.scrollTo({
          [e ? "left" : "top"]: -c,
          behavior: "smooth"
        }), !0;
      }
      return 0 === t ? (a.setTransition(0), a.setTranslate(c), s && (a.emit("beforeTransitionStart", t, r), a.emit("transitionEnd"))) : (a.setTransition(t), a.setTranslate(c), s && (a.emit("beforeTransitionStart", t, r), a.emit("transitionStart")), a.animating || (a.animating = !0, a.onTranslateToWrapperTransitionEnd || (a.onTranslateToWrapperTransitionEnd = function (e) {
        a && !a.destroyed && e.target === this && (a.wrapperEl.removeEventListener("transitionend", a.onTranslateToWrapperTransitionEnd), a.onTranslateToWrapperTransitionEnd = null, delete a.onTranslateToWrapperTransitionEnd, a.animating = !1, s && a.emit("transitionEnd"));
      }), a.wrapperEl.addEventListener("transitionend", a.onTranslateToWrapperTransitionEnd))), !0;
    }
  };
  const Z = (e, t, s) => {
    t && !e.classList.contains(s) ? e.classList.add(s) : !t && e.classList.contains(s) && e.classList.remove(s);
  };
  const Q = (e, t, s) => {
    t && !e.classList.contains(s) ? e.classList.add(s) : !t && e.classList.contains(s) && e.classList.remove(s);
  };
  var J = {
    updateSize: function () {
      const e = this;
      let t, s;
      const i = e.el;
      t = void 0 !== e.params.width && null !== e.params.width ? e.params.width : i.clientWidth, s = void 0 !== e.params.height && null !== e.params.height ? e.params.height : i.clientHeight, 0 === t && e.isHorizontal() || 0 === s && e.isVertical() || (t = t - parseInt(m(i, "padding-left") || "0", 10) - parseInt(m(i, "padding-right") || "0", 10), s = s - parseInt(m(i, "padding-top") || "0", 10) - parseInt(m(i, "padding-bottom") || "0", 10), Number.isNaN(t) && (t = 0), Number.isNaN(s) && (s = 0), Object.assign(e, {
        width: t,
        height: s,
        size: e.isHorizontal() ? t : s
      }));
    },
    updateSlides: function () {
      const e = this;
      function t(t, s) {
        return parseFloat(t.getPropertyValue(e.getDirectionLabel(s)) || "0");
      }
      const s = e.params,
        {
          wrapperEl: i,
          slidesEl: r,
          rtlTranslate: a,
          wrongRTL: n
        } = e,
        o = !(!e.virtual || !s.virtual?.enabled),
        c = o ? e.virtual.slides.length : e.slides.length,
        p = d(r, `.${e.params.slideClass}, swiper-slide`),
        u = o ? e.virtual.slides.length : p.length;
      let h = [];
      const f = [],
        g = [],
        w = t => "function" == typeof t ? t.call(e) : t,
        b = w(s.slidesOffsetBefore),
        y = w(s.slidesOffsetAfter),
        E = e.snapGrid.length,
        S = e.slidesGrid.length,
        x = e.size - b - y;
      let T = s.spaceBetween,
        M = -b,
        C = 0,
        P = 0;
      if (void 0 === x) return;
      "string" == typeof T && T.indexOf("%") >= 0 ? T = parseFloat(T.replace("%", "")) / 100 * x : "string" == typeof T && (T = parseFloat(T)), e.virtualSize = -T - b - y, p.forEach(e => {
        a ? e.style.marginLeft = "" : e.style.marginRight = "", e.style.marginBottom = "", e.style.marginTop = "";
      }), s.centeredSlides && s.cssMode && (l(i, "--swiper-centered-offset-before", ""), l(i, "--swiper-centered-offset-after", "")), s.cssMode && (l(i, "--swiper-slides-offset-before", `${b}px`), l(i, "--swiper-slides-offset-after", `${y}px`));
      const L = s.grid && s.grid.rows > 1 && e.grid;
      L ? e.grid.initSlides(p) : e.grid && e.grid.unsetSlides();
      let A = 0;
      const I = "auto" === s.slidesPerView && s.breakpoints && Object.keys(s.breakpoints).filter(e => {
        const t = s.breakpoints[e];
        return void 0 !== t?.slidesPerView;
      }).length > 0;
      for (let i = 0; i < u; i += 1) {
        A = 0;
        const r = p[i];
        if (!r || (L && e.grid.updateSlide(i, r, p), "none" !== m(r, "display"))) {
          if (o && "auto" === s.slidesPerView) s.virtual?.slidesPerViewAutoSlideSize && (A = s.virtual.slidesPerViewAutoSlideSize), A && r && (s.roundLengths && (A = Math.floor(A)), r.style[e.getDirectionLabel("width")] = `${A}px`);else if ("auto" === s.slidesPerView) {
            I && (r.style[e.getDirectionLabel("width")] = "");
            const i = getComputedStyle(r),
              a = r.style.transform,
              n = r.style.webkitTransform;
            if (a && (r.style.transform = "none"), n && (r.style.webkitTransform = "none"), s.roundLengths) A = e.isHorizontal() ? v(r, "width") : v(r, "height");else {
              const e = t(i, "width"),
                s = t(i, "padding-left"),
                a = t(i, "padding-right"),
                n = t(i, "margin-left"),
                l = t(i, "margin-right"),
                o = i.getPropertyValue("box-sizing");
              if (o && "border-box" === o) A = e + n + l;else {
                const {
                  clientWidth: t,
                  offsetWidth: i
                } = r;
                A = e + s + a + n + l + (i - t);
              }
            }
            a && (r.style.transform = a), n && (r.style.webkitTransform = n), s.roundLengths && (A = Math.floor(A));
          } else A = (x - (s.slidesPerView - 1) * T) / s.slidesPerView, s.roundLengths && (A = Math.floor(A)), r && (r.style[e.getDirectionLabel("width")] = `${A}px`);
          r && (r.swiperSlideSize = A), g.push(A), s.centeredSlides ? (M = M + A / 2 + C / 2 + T, 0 === C && 0 !== i && (M = M - x / 2 - T), 0 === i && (M = M - x / 2 - T), Math.abs(M) < .001 && (M = 0), s.roundLengths && (M = Math.floor(M)), P % s.slidesPerGroup === 0 && h.push(M), f.push(M)) : (s.roundLengths && (M = Math.floor(M)), (P - Math.min(e.params.slidesPerGroupSkip, P)) % e.params.slidesPerGroup === 0 && h.push(M), f.push(M), M = M + A + T), e.virtualSize += A + T, C = A, P += 1;
        }
      }
      if (e.virtualSize = Math.max(e.virtualSize, x) + y, a && n && ("slide" === s.effect || "coverflow" === s.effect) && (i.style.width = `${e.virtualSize + T}px`), s.setWrapperSize && (i.style[e.getDirectionLabel("width")] = `${e.virtualSize + T}px`), L && e.grid.updateWrapperSize(A, h), !s.centeredSlides) {
        const t = "auto" !== s.slidesPerView && s.slidesPerView % 1 != 0,
          i = s.snapToSlideEdge && !s.loop && ("auto" === s.slidesPerView || t);
        let r = h.length;
        if (i) {
          let e;
          if ("auto" === s.slidesPerView) {
            e = 1;
            let t = 0;
            for (let s = g.length - 1; s >= 0 && (t += g[s] + (s < g.length - 1 ? T : 0), t <= x); s -= 1) e = g.length - s;
          } else e = Math.floor(s.slidesPerView);
          r = Math.max(u - e, 0);
        }
        const a = [];
        for (let t = 0; t < h.length; t += 1) {
          let n = h[t];
          s.roundLengths && (n = Math.floor(n)), i ? t <= r && a.push(n) : h[t] <= e.virtualSize - x && a.push(n);
        }
        h = a, Math.floor(e.virtualSize - x) - Math.floor(h[h.length - 1]) > 1 && (i || h.push(e.virtualSize - x));
      }
      if (o && s.loop) {
        const t = g[0] + T,
          i = (e.virtual.slidesBefore ?? 0) + (e.virtual.slidesAfter ?? 0);
        if (s.slidesPerGroup > 1) {
          const e = Math.ceil(i / s.slidesPerGroup),
            r = t * s.slidesPerGroup;
          for (let t = 0; t < e; t += 1) h.push(h[h.length - 1] + r);
        }
        for (let r = 0; r < i; r += 1) 1 === s.slidesPerGroup && h.push(h[h.length - 1] + t), f.push(f[f.length - 1] + t), e.virtualSize += t;
      }
      if (0 === h.length && (h = [0]), 0 !== T) {
        const t = e.isHorizontal() && a ? "marginLeft" : e.getDirectionLabel("marginRight");
        p.filter((e, t) => !(s.cssMode && !s.loop) || t !== p.length - 1).forEach(e => {
          e.style[t] = `${T}px`;
        });
      }
      if (s.centeredSlides && s.centeredSlidesBounds) {
        let e = 0;
        g.forEach(t => {
          e += t + (T || 0);
        }), e -= T;
        const t = e > x ? e - x : 0;
        h = h.map(e => e <= 0 ? -b : e > t ? t + y : e);
      }
      if (s.centerInsufficientSlides) {
        let e = 0;
        if (g.forEach(t => {
          e += t + (T || 0);
        }), e -= T, e < x) {
          const t = (x - e) / 2;
          h.forEach((e, s) => {
            h[s] = e - t;
          }), f.forEach((e, s) => {
            f[s] = e + t;
          });
        }
      }
      if (Object.assign(e, {
        slides: p,
        snapGrid: h,
        slidesGrid: f,
        slidesSizesGrid: g
      }), s.centeredSlides && s.cssMode && !s.centeredSlidesBounds) {
        l(i, "--swiper-centered-offset-before", -h[0] + "px"), l(i, "--swiper-centered-offset-after", e.size / 2 - g[g.length - 1] / 2 + "px");
        const t = -e.snapGrid[0],
          s = -e.slidesGrid[0];
        e.snapGrid = e.snapGrid.map(e => e + t), e.slidesGrid = e.slidesGrid.map(e => e + s);
      }
      if (u !== c && e.emit("slidesLengthChange"), h.length !== E && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), f.length !== S && e.emit("slidesGridLengthChange"), s.watchSlidesProgress && e.updateSlidesOffset(), e.emit("slidesUpdated"), !(o || s.cssMode || "slide" !== s.effect && "fade" !== s.effect)) {
        const t = `${s.containerModifierClass}backface-hidden`,
          i = e.el.classList.contains(t);
        u <= s.maxBackfaceHiddenSlides ? i || e.el.classList.add(t) : i && e.el.classList.remove(t);
      }
    },
    updateAutoHeight: function (e) {
      const t = this,
        s = [],
        i = t.virtual && t.params.virtual?.enabled;
      let r,
        a = 0;
      "number" == typeof e ? t.setTransition(e) : !0 === e && t.setTransition(t.params.speed);
      const n = e => i ? t.slides[t.getSlideIndexByData(e)] : t.slides[e];
      if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1) {
        if (t.params.centeredSlides) (t.visibleSlides || []).forEach(e => {
          s.push(e);
        });else for (r = 0; r < Math.ceil(t.params.slidesPerView); r += 1) {
          const e = t.activeIndex + r;
          if (e > t.slides.length && !i) break;
          const a = n(e);
          a && s.push(a);
        }
      } else {
        const e = n(t.activeIndex);
        e && s.push(e);
      }
      for (r = 0; r < s.length; r += 1) if (void 0 !== s[r]) {
        const e = s[r].offsetHeight;
        a = e > a ? e : a;
      }
      (a || 0 === a) && (t.wrapperEl.style.height = `${a}px`);
    },
    updateSlidesOffset: function () {
      const e = this,
        t = e.slides,
        s = e.isElement ? e.isHorizontal() ? e.wrapperEl.offsetLeft : e.wrapperEl.offsetTop : 0;
      for (let i = 0; i < t.length; i += 1) t[i].swiperSlideOffset = (e.isHorizontal() ? t[i].offsetLeft : t[i].offsetTop) - s - e.cssOverflowAdjustment();
    },
    updateSlidesProgress: function (e = this && this.translate || 0) {
      const t = this,
        s = t.params,
        {
          slides: i,
          rtlTranslate: r,
          snapGrid: a
        } = t;
      if (0 === i.length) return;
      void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
      let n = -e;
      r && (n = e), t.visibleSlidesIndexes = [], t.visibleSlides = [];
      let l = s.spaceBetween;
      "string" == typeof l && l.indexOf("%") >= 0 ? l = parseFloat(l.replace("%", "")) / 100 * t.size : "string" == typeof l && (l = parseFloat(l));
      for (let e = 0; e < i.length; e += 1) {
        const o = i[e];
        let d = o.swiperSlideOffset ?? 0;
        s.cssMode && s.centeredSlides && (d -= i[0].swiperSlideOffset ?? 0);
        const c = o.swiperSlideSize ?? 0,
          p = (n + (s.centeredSlides ? t.minTranslate() : 0) - d) / (c + l),
          u = (n - a[0] + (s.centeredSlides ? t.minTranslate() : 0) - d) / (c + l),
          m = -(n - d),
          h = m + t.slidesSizesGrid[e],
          f = m >= 0 && m <= t.size - t.slidesSizesGrid[e],
          g = m >= 0 && m < t.size - 1 || h > 1 && h <= t.size || m <= 0 && h >= t.size;
        g && (t.visibleSlides.push(o), t.visibleSlidesIndexes.push(e)), Q(o, g, s.slideVisibleClass), Q(o, f, s.slideFullyVisibleClass), o.progress = r ? -p : p, o.originalProgress = r ? -u : u;
      }
    },
    updateProgress: function (e) {
      const t = this;
      if (void 0 === e) {
        const s = t.rtlTranslate ? -1 : 1;
        e = t && t.translate && t.translate * s || 0;
      }
      const s = t.params,
        i = t.maxTranslate() - t.minTranslate();
      let {
          progress: r,
          isBeginning: a,
          isEnd: n
        } = t,
        l = t.progressLoop;
      const o = a,
        d = n;
      if (0 === i) r = 0, a = !0, n = !0;else {
        r = (e - t.minTranslate()) / i;
        const s = Math.abs(e - t.minTranslate()) < 1,
          l = Math.abs(e - t.maxTranslate()) < 1;
        a = s || r <= 0, n = l || r >= 1, s && (r = 0), l && (r = 1);
      }
      if (s.loop) {
        const s = t.getSlideIndexByData(0),
          i = t.getSlideIndexByData(t.slides.length - 1),
          r = t.slidesGrid[s],
          a = t.slidesGrid[i],
          n = t.slidesGrid[t.slidesGrid.length - 1],
          o = Math.abs(e);
        l = o >= r ? (o - r) / n : (o + n - a) / n, l > 1 && (l -= 1);
      }
      Object.assign(t, {
        progress: r,
        progressLoop: l,
        isBeginning: a,
        isEnd: n
      }), (s.watchSlidesProgress || s.centeredSlides && s.autoHeight) && t.updateSlidesProgress(e), a && !o && t.emit("reachBeginning toEdge"), n && !d && t.emit("reachEnd toEdge"), (o && !a || d && !n) && t.emit("fromEdge"), t.emit("progress", r);
    },
    updateSlidesClasses: function () {
      const e = this,
        {
          slides: t,
          params: s,
          slidesEl: i,
          activeIndex: r
        } = e,
        a = !(!e.virtual || !s.virtual?.enabled),
        n = e.grid && s.grid && s.grid.rows > 1,
        l = e => d(i, `.${s.slideClass}${e}, swiper-slide${e}`)[0];
      let o, c, p;
      if (a) {
        if (s.loop) {
          const t = e.virtual.slides;
          let s = r - (e.virtual.slidesBefore ?? 0);
          s < 0 && (s = t.length + s), s >= t.length && (s -= t.length), o = l(`[data-swiper-slide-index="${s}"]`);
        } else o = l(`[data-swiper-slide-index="${r}"]`);
      } else n ? (o = t.find(e => e.column === r), p = t.find(e => e.column === r + 1), c = t.find(e => e.column === r - 1)) : o = t[r];
      o && (n || (p = function (e, t) {
        const s = [];
        let i = e.nextElementSibling;
        for (; i;) t && !i.matches(t) || s.push(i), i = i.nextElementSibling;
        return s;
      }(o, `.${s.slideClass}, swiper-slide`)[0], s.loop && !p && (p = t[0]), c = function (e, t) {
        const s = [];
        let i = e.previousElementSibling;
        for (; i;) t && !i.matches(t) || s.push(i), i = i.previousElementSibling;
        return s;
      }(o, `.${s.slideClass}, swiper-slide`)[0], s.loop && 0 === !c && (c = t[t.length - 1]))), t.forEach(e => {
        Z(e, e === o, s.slideActiveClass), Z(e, e === p, s.slideNextClass), Z(e, e === c, s.slidePrevClass);
      }), e.emitSlidesClasses();
    },
    updateActiveIndex: function (e) {
      const t = this,
        s = t.rtlTranslate ? t.translate : -t.translate,
        {
          snapGrid: i,
          params: r,
          activeIndex: a,
          realIndex: n,
          snapIndex: l
        } = t;
      let o,
        d = e;
      const c = e => {
        const s = t.virtual.slides;
        let i = e - (t.virtual.slidesBefore ?? 0);
        return i < 0 && (i = s.length + i), i >= s.length && (i -= s.length), i;
      };
      if (void 0 === d && (d = function (e) {
        const {
            slidesGrid: t,
            params: s
          } = e,
          i = e.rtlTranslate ? e.translate : -e.translate;
        let r;
        for (let e = 0; e < t.length; e += 1) void 0 !== t[e + 1] ? i >= t[e] && i < t[e + 1] - (t[e + 1] - t[e]) / 2 ? r = e : i >= t[e] && i < t[e + 1] && (r = e + 1) : i >= t[e] && (r = e);
        return s.normalizeSlideIndex && (r < 0 || void 0 === r) && (r = 0), r;
      }(t)), i.indexOf(s) >= 0) o = i.indexOf(s);else {
        const e = Math.min(r.slidesPerGroupSkip, d);
        o = e + Math.floor((d - e) / r.slidesPerGroup);
      }
      if (o >= i.length && (o = i.length - 1), d === a && !t.params.loop) return void (o !== l && (t.snapIndex = o, t.emit("snapIndexChange")));
      if (d === a && t.params.loop && t.virtual && t.params.virtual?.enabled) return void (t.realIndex = c(d));
      const p = t.grid && r.grid && r.grid.rows > 1;
      let u;
      if (t.virtual && r.virtual?.enabled) u = r.loop ? c(d) : d;else if (p) {
        const e = t.slides.find(e => e.column === d);
        let s = parseInt(e.getAttribute("data-swiper-slide-index"), 10);
        Number.isNaN(s) && (s = Math.max(t.slides.indexOf(e), 0)), u = Math.floor(s / r.grid.rows);
      } else if (t.slides[d]) {
        const e = t.slides[d].getAttribute("data-swiper-slide-index");
        u = e ? parseInt(e, 10) : d;
      } else u = d;
      Object.assign(t, {
        previousSnapIndex: l,
        snapIndex: o,
        previousRealIndex: n,
        realIndex: u,
        previousIndex: a,
        activeIndex: d
      }), t.initialized && A(t), t.__loopFixInProgress__ || (t.emit("activeIndexChange"), t.emit("snapIndexChange"), (t.initialized || t.params.runCallbacksOnInit) && ((t.__lastEmittedRealIndex__ ?? n) !== u && t.emit("realIndexChange"), t.emit("slideChange")), t.__lastEmittedRealIndex__ = u);
    },
    updateClickedSlide: function (e, t) {
      const s = this,
        i = s.params;
      let r = e.closest(`.${i.slideClass}, swiper-slide`);
      !r && s.isElement && t && t.length > 1 && t.includes(e) && [...t.slice(t.indexOf(e) + 1, t.length)].forEach(e => {
        !r && e.matches && e.matches(`.${i.slideClass}, swiper-slide`) && (r = e);
      });
      let a,
        n = !1;
      if (r) for (let e = 0; e < s.slides.length; e += 1) if (s.slides[e] === r) {
        n = !0, a = e;
        break;
      }
      if (!r || !n) return s.clickedSlide = void 0, void (s.clickedIndex = void 0);
      s.clickedSlide = r, s.virtual && s.params.virtual?.enabled ? s.clickedIndex = parseInt(r.getAttribute("data-swiper-slide-index"), 10) : s.clickedIndex = a, i.slideToClickedSlide && void 0 !== s.clickedIndex && s.clickedIndex !== s.activeIndex && s.slideToClickedSlide();
    }
  };
  const ee = {
      eventsEmitter: D,
      update: J,
      translate: K,
      transition: {
        setTransition: function (e, t) {
          const s = this;
          s.params.cssMode || (s.wrapperEl.style.transitionDuration = `${e}ms`, s.wrapperEl.style.transitionDelay = 0 === e ? "0ms" : ""), s.emit("setTransition", e, t);
        },
        transitionStart: function (e = !0, t) {
          const s = this,
            {
              params: i
            } = s;
          i.cssMode || (i.autoHeight && s.updateAutoHeight(), U({
            swiper: s,
            runCallbacks: e,
            direction: t,
            step: "Start"
          }));
        },
        transitionEnd: function (e = !0, t) {
          const s = this,
            {
              params: i
            } = s;
          s.animating = !1, i.cssMode || (s.setTransition(0), U({
            swiper: s,
            runCallbacks: e,
            direction: t,
            step: "End"
          }));
        }
      },
      slide: j,
      loop: F,
      grabCursor: {
        setGrabCursor: function (e) {
          const t = this;
          if (!t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode) return;
          const s = "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
          t.isElement && (t.__preventObserver__ = !0), s.style.cursor = "move", s.style.cursor = e ? "grabbing" : "grab", t.isElement && requestAnimationFrame(() => {
            t.__preventObserver__ = !1;
          });
        },
        unsetGrabCursor: function () {
          const e = this;
          e.params.watchOverflow && e.isLocked || e.params.cssMode || (e.isElement && (e.__preventObserver__ = !0), e["container" === e.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "", e.isElement && requestAnimationFrame(() => {
            e.__preventObserver__ = !1;
          }));
        }
      },
      events: {
        attachEvents: function () {
          const e = this,
            {
              params: t
            } = e;
          e.onTouchStart = V.bind(e), e.onTouchMove = _.bind(e), e.onTouchEnd = R.bind(e), e.onDocumentTouchStart = X.bind(e), t.cssMode && (e.onScroll = Y.bind(e)), e.onClick = G.bind(e), e.onLoad = B.bind(e), q(e, "on");
        },
        detachEvents: function () {
          q(this, "off");
        }
      },
      breakpoints: z,
      checkOverflow: $,
      classes: k
    },
    te = {};
  class se {
    static extendedDefaults;
    static defaults;
    constructor(...e) {
      let t, s;
      if (1 === e.length && null !== e[0] && "object" == typeof e[0] && "Object" === Object.prototype.toString.call(e[0]).slice(8, -1) ? s = e[0] : [t, s] = e, s || (s = {}), s = n({}, s), t && !s.el && (s.el = t), s.el && "string" == typeof s.el && "undefined" != typeof document && document.querySelectorAll(s.el).length > 1) {
        const e = [];
        return document.querySelectorAll(s.el).forEach(t => {
          const i = n({}, s, {
            el: t
          });
          e.push(new se(i));
        }), e;
      }
      const i = this;
      i.__swiper__ = !0, i.support = T(), i.device = M({
        userAgent: s.userAgent ?? void 0
      }), i.browser = C(), i.eventsListeners = {}, i.eventsAnyListeners = [], i.modules = [...(i.__modules__ || [])], s.modules && Array.isArray(s.modules) && s.modules.forEach(e => {
        const t = e;
        "function" == typeof t && i.modules.indexOf(t) < 0 && i.modules.push(t);
      });
      const r = {};
      i.modules.forEach(e => {
        e({
          params: s,
          swiper: i,
          extendParams: W(s, r),
          on: i.on.bind(i),
          once: i.once.bind(i),
          off: i.off.bind(i),
          emit: i.emit.bind(i)
        });
      });
      const a = n({}, O, r);
      if (i.params = n({}, a, te, s), i.originalParams = n({}, i.params), i.passedParams = n({}, s), i.params && i.params.on) {
        const e = i.params.on;
        Object.keys(e).forEach(t => {
          const s = e[t];
          s && i.on(t, s);
        });
      }
      return i.params && i.params.onAny && i.onAny(i.params.onAny), Object.assign(i, {
        enabled: i.params.enabled,
        el: t,
        classNames: [],
        slides: [],
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],
        isHorizontal: () => "horizontal" === i.params.direction,
        isVertical: () => "vertical" === i.params.direction,
        activeIndex: 0,
        realIndex: 0,
        isBeginning: !0,
        isEnd: !1,
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: !1,
        cssOverflowAdjustment() {
          return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
        },
        allowSlideNext: i.params.allowSlideNext,
        allowSlidePrev: i.params.allowSlidePrev,
        touchEventsData: {
          isTouched: void 0,
          isMoved: void 0,
          allowTouchCallbacks: void 0,
          touchStartTime: void 0,
          isScrolling: void 0,
          currentTranslate: void 0,
          startTranslate: void 0,
          allowThresholdMove: void 0,
          focusableElements: i.params.focusableElements,
          lastClickTime: 0,
          clickTimeout: void 0,
          velocities: [],
          allowMomentumBounce: void 0,
          startMoving: void 0,
          pointerId: null,
          touchId: null
        },
        allowClick: !0,
        allowTouchMove: i.params.allowTouchMove,
        touches: {
          startX: 0,
          startY: 0,
          currentX: 0,
          currentY: 0,
          diff: 0
        },
        imagesToLoad: [],
        imagesLoaded: 0
      }), i.emit("_swiper"), i.params.init && i.init(), i;
    }
    getDirectionLabel(e) {
      return this.isHorizontal() ? e : {
        width: "height",
        "margin-top": "margin-left",
        "margin-bottom ": "margin-right",
        "margin-left": "margin-top",
        "margin-right": "margin-bottom",
        "padding-left": "padding-top",
        "padding-right": "padding-bottom",
        marginRight: "marginBottom"
      }[e];
    }
    isHorizontal() {
      return "horizontal" === this.params.direction;
    }
    isVertical() {
      return "vertical" === this.params.direction;
    }
    cssOverflowAdjustment() {
      return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
    }
    getSlideIndex(e) {
      const {
          slidesEl: t,
          params: s
        } = this,
        i = h(d(t, `.${s.slideClass}, swiper-slide`)[0]);
      return h(e) - (i ?? 0);
    }
    getSlideIndexByData(e) {
      return this.getSlideIndex(this.slides.find(t => Number(t.getAttribute("data-swiper-slide-index")) === e));
    }
    getSlideIndexWhenGrid(e) {
      return this.grid && this.params.grid && this.params.grid.rows > 1 && ("column" === this.params.grid.fill ? e = Math.floor(e / this.params.grid.rows) : "row" === this.params.grid.fill && (e %= Math.ceil(this.slides.length / this.params.grid.rows))), e;
    }
    recalcSlides() {
      const {
        slidesEl: e,
        params: t
      } = this;
      this.slides = d(e, `.${t.slideClass}, swiper-slide`);
    }
    enable() {
      this.enabled || (this.enabled = !0, this.params.grabCursor && this.setGrabCursor(), this.emit("enable"));
    }
    disable() {
      this.enabled && (this.enabled = !1, this.params.grabCursor && this.unsetGrabCursor(), this.emit("disable"));
    }
    setProgress(e, t) {
      e = Math.min(Math.max(e, 0), 1);
      const s = this.minTranslate(),
        i = (this.maxTranslate() - s) * e + s;
      this.translateTo(i, void 0 === t ? 0 : t), this.updateActiveIndex(), this.updateSlidesClasses();
    }
    emitContainerClasses() {
      if (!this.params._emitClasses || !this.el) return;
      const e = this.el.className.split(" ").filter(e => 0 === e.indexOf("swiper") || 0 === e.indexOf(this.params.containerModifierClass));
      this.emit("_containerClasses", e.join(" "));
    }
    getSlideClasses(e) {
      return this.destroyed ? "" : e.className.split(" ").filter(e => 0 === e.indexOf("swiper-slide") || 0 === e.indexOf(this.params.slideClass)).join(" ");
    }
    emitSlidesClasses() {
      if (!this.params._emitClasses || !this.el) return;
      const e = [];
      this.slides.forEach(t => {
        const s = this.getSlideClasses(t);
        e.push({
          slideEl: t,
          classNames: s
        }), this.emit("_slideClass", t, s);
      }), this.emit("_slideClasses", e);
    }
    slidesPerViewDynamic(e = "current", t = !1) {
      const {
        params: s,
        slides: i,
        slidesGrid: r,
        slidesSizesGrid: a,
        size: n,
        activeIndex: l
      } = this;
      let o = 1;
      if ("number" == typeof s.slidesPerView) return s.slidesPerView;
      if (!n) return o;
      if (s.centeredSlides) {
        let e = i[l] ? Math.ceil(i[l].swiperSlideSize ?? 0) : 0,
          t = !1;
        for (let s = l + 1; s < i.length; s += 1) i[s] && !t && (e += Math.ceil(i[s].swiperSlideSize ?? 0), o += 1, e > n && (t = !0));
        for (let s = l - 1; s >= 0; s -= 1) i[s] && !t && (e += i[s].swiperSlideSize ?? 0, o += 1, e > n && (t = !0));
      } else if ("current" === e) for (let e = l + 1; e < i.length; e += 1) {
        (t ? r[e] + a[e] - r[l] < n : r[e] - r[l] < n) && (o += 1);
      } else for (let e = l - 1; e >= 0; e -= 1) {
        r[l] - r[e] < n && (o += 1);
      }
      return o;
    }
    update() {
      const e = this;
      if (!e || e.destroyed) return;
      const {
        snapGrid: t,
        params: s
      } = e;
      function i() {
        const t = e.rtlTranslate ? -1 * e.translate : e.translate,
          s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
        e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses();
      }
      let r;
      if (s.breakpoints && e.setBreakpoint(), s.lazyPreload && [...e.el.querySelectorAll('[loading="lazy"]')].forEach(t => {
        t.complete && P(e, t);
      }), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), s.freeMode?.enabled && !s.cssMode) i(), s.autoHeight && e.updateAutoHeight();else {
        if (("auto" === s.slidesPerView || s.slidesPerView > 1) && e.isEnd && !s.centeredSlides) {
          const t = e.virtual && s.virtual?.enabled ? e.virtual.slides.length : e.slides.length;
          r = e.slideTo(t - 1, 0, !1, !0);
        } else r = e.slideTo(e.activeIndex, 0, !1, !0);
        r || i();
      }
      s.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update");
    }
    changeDirection(e, t = !0) {
      const s = this,
        i = s.params.direction;
      return e || (e = "horizontal" === i ? "vertical" : "horizontal"), e === i || "horizontal" !== e && "vertical" !== e || (s.el.classList.remove(`${s.params.containerModifierClass}${i}`), s.el.classList.add(`${s.params.containerModifierClass}${e}`), s.emitContainerClasses(), s.params.direction = e, s.rtlTranslate = "horizontal" === e && s.rtl, s.slides.forEach(t => {
        "vertical" === e ? t.style.width = "" : t.style.height = "";
      }), s.emit("changeDirection"), t && s.update()), s;
    }
    changeLanguageDirection(e) {
      const t = this;
      t.rtl && "rtl" === e || !t.rtl && "ltr" === e || (t.rtl = "rtl" === e, t.rtlTranslate = "horizontal" === t.params.direction && t.rtl, t.rtl ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`), t.el.dir = "rtl") : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`), t.el.dir = "ltr"), t.update());
    }
    mount(e) {
      const t = this;
      if (t.mounted) return !0;
      if ("undefined" == typeof document) return !1;
      const s = e ?? t.params.el;
      let i = null;
      if ("string" == typeof s ? i = document.querySelector(s) : s instanceof HTMLElement && (i = s), !i) return !1;
      i.swiper = t;
      const r = i.parentNode;
      r && r.host && r.host.nodeName === t.params.swiperElementNodeName.toUpperCase() && (t.isElement = !0);
      const a = () => `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
      let n = (() => {
        if (i && i.shadowRoot) {
          return i.shadowRoot.querySelector(a());
        }
        return d(i, a())[0];
      })();
      !n && t.params.createElements && (n = p("div", t.params.wrapperClass), i.append(n), d(i, `.${t.params.slideClass}`).forEach(e => {
        n.append(e);
      }));
      const l = t.isElement ? i.parentNode.host : null;
      return Object.assign(t, {
        el: i,
        wrapperEl: n,
        slidesEl: t.isElement && !l.slideSlots ? l : n,
        hostEl: t.isElement ? l : i,
        mounted: !0,
        rtl: "rtl" === i.dir.toLowerCase() || "rtl" === m(i, "direction"),
        rtlTranslate: "horizontal" === t.params.direction && ("rtl" === i.dir.toLowerCase() || "rtl" === m(i, "direction")),
        wrongRTL: "-webkit-box" === m(n, "display")
      }), !0;
    }
    init(e) {
      const t = this;
      if (t.initialized) return t;
      if (!1 === t.mount(e)) return t;
      if (t.emit("beforeInit"), t.params.breakpoints && t.setBreakpoint(), t.addClasses(), t.updateSize(), t.updateSlides(), t.params.watchOverflow && t.checkOverflow(), t.params.grabCursor && t.enabled && t.setGrabCursor(), t.params.loop && t.virtual && t.params.virtual?.enabled ? t.slideTo((t.params.initialSlide ?? 0) + (t.virtual.slidesBefore ?? 0), 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0), t.params.loop && t.loopCreate(void 0, !0), t.attachEvents(), t.params.lazyPreload) {
        const e = [...t.el.querySelectorAll('[loading="lazy"]')];
        t.isElement && e.push(...t.hostEl.querySelectorAll('[loading="lazy"]')), e.forEach(e => {
          e.complete && P(t, e);
        });
      }
      return t.initialized = !0, A(t), t.emit("init"), t.emit("afterInit"), t;
    }
    destroy(e = !0, t = !0) {
      const s = this,
        {
          params: i,
          el: r,
          wrapperEl: a,
          slides: n
        } = s;
      return void 0 === s.params || s.destroyed || (s.emit("beforeDestroy"), s.initialized = !1, s.detachEvents(), i.loop && s.loopDestroy(), t && (s.removeClasses(), r && "string" != typeof r && r.removeAttribute("style"), a && a.removeAttribute("style"), n && n.length && n.forEach(e => {
        e.classList.remove(i.slideVisibleClass, i.slideFullyVisibleClass, i.slideActiveClass, i.slideNextClass, i.slidePrevClass), e.removeAttribute("style"), e.removeAttribute("data-swiper-slide-index");
      })), s.emit("destroy"), Object.keys(s.eventsListeners).forEach(e => {
        s.off(e);
      }), !1 !== e && (s.el && "string" != typeof s.el && (s.el.swiper = null), l = s, Object.keys(l).forEach(e => {
        try {
          l[e] = null;
        } catch {}
        try {
          delete l[e];
        } catch {}
      })), s.destroyed = !0), null;
      var l;
    }
    static extendDefaults(e) {
      n(te, e);
    }
    static installModule(e) {
      se.prototype.__modules__ || (se.prototype.__modules__ = []);
      const t = se.prototype.__modules__;
      "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
    }
    static use(e) {
      return Array.isArray(e) ? (e.forEach(e => se.installModule(e)), se) : (se.installModule(e), se);
    }
  }
  Object.defineProperty(se, "extendedDefaults", {
    get: () => te
  }), Object.defineProperty(se, "defaults", {
    get: () => O
  });
  const ie = ee,
    re = se.prototype;
  Object.keys(ie).forEach(e => {
    const t = ie[e];
    Object.keys(t).forEach(e => {
      re[e] = t[e];
    });
  }), se.use([({
    swiper: e,
    on: t,
    emit: s
  }) => {
    let i = null,
      r = null;
    const a = () => {
        e && !e.destroyed && e.initialized && (s("beforeResize"), s("resize"));
      },
      n = () => {
        e && !e.destroyed && e.initialized && s("orientationchange");
      };
    t("init", () => {
      e.params.resizeObserver && void 0 !== window.ResizeObserver ? (() => {
        if (!e || e.destroyed || !e.initialized) return;
        let t = e.width,
          s = e.height;
        i = new ResizeObserver(i => {
          r = window.requestAnimationFrame(() => {
            let r = t,
              n = s;
            i.forEach(({
              contentBoxSize: t,
              contentRect: s,
              target: i
            }) => {
              if (i && i !== e.el) return;
              const a = Array.isArray(t) ? t[0] : t;
              r = s ? s.width : a.inlineSize, n = s ? s.height : a.blockSize;
            }), r === t && n === s || (t = r, s = n, a());
          });
        }), i.observe(e.el);
      })() : (window.addEventListener("resize", a), window.addEventListener("orientationchange", n));
    }), t("destroy", () => {
      r && window.cancelAnimationFrame(r), i && i.unobserve && e.el && (i.unobserve(e.el), i = null), window.removeEventListener("resize", a), window.removeEventListener("orientationchange", n);
    });
  }, ({
    swiper: e,
    extendParams: t,
    on: s
  }) => {
    const i = [],
      r = (t, s = {}) => {
        const r = window.MutationObserver || window.WebkitMutationObserver;
        if (!r) return;
        const a = new r(t => {
          if (e.__preventObserver__) return;
          if (1 === t.length) return void e.emit("observerUpdate", t[0]);
          const s = function () {
            e.emit("observerUpdate", t[0]);
          };
          window.requestAnimationFrame ? window.requestAnimationFrame(s) : window.setTimeout(s, 0);
        });
        a.observe(t, {
          attributes: void 0 === s.attributes || s.attributes,
          childList: e.isElement || void 0 === s.childList || s.childList,
          characterData: void 0 === s.characterData || s.characterData
        }), i.push(a);
      };
    t({
      observer: !1,
      observeParents: !1,
      observeSlideChildren: !1
    }), s("init", () => {
      if (e.params.observer) {
        if (e.params.observeParents) {
          const t = f(e.hostEl);
          for (let e = 0; e < t.length; e += 1) r(t[e]);
        }
        r(e.hostEl, {
          childList: e.params.observeSlideChildren
        }), r(e.wrapperEl, {
          attributes: !1
        });
      }
    }), s("destroy", () => {
      i.forEach(e => {
        e.disconnect();
      }), i.splice(0, i.length);
    });
  }]);
  function ae(e, t, s, i) {
    const r = s ?? {},
      a = t ?? {};
    return e.params.createElements && Object.keys(i).forEach(t => {
      if (!r[t] && !0 === r.auto) {
        let s = d(e.el, `.${i[t]}`)[0];
        s || (s = p("div", i[t]), s.className = i[t], e.el.append(s)), r[t] = s, a[t] = s;
      }
    }), r;
  }
  const ne = '<svg class="swiper-navigation-icon" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"/></svg>';
  function le(e = "") {
    return `.${e.trim().replace(/([.:!+/()[\]#>~*^$|=,'"@{}\\])/g, "\\$1").replace(/ /g, ".")}`;
  }
  const oe = e => {
    if ((e => !!e.virtual && !!e.params.virtual?.enabled)(e)) return e.virtual.slides.length;
    const t = e.params.grid?.rows;
    return e.grid && t && t > 1 ? e.slides.length / Math.ceil(t) : e.slides.length;
  };
  class de {
    x;
    y;
    lastIndex;
    binarySearch;
    constructor(e, t) {
      let s, i, r;
      this.binarySearch = (e, t) => {
        for (i = -1, s = e.length; s - i > 1;) r = s + i >> 1, e[r] <= t ? i = r : s = r;
        return s;
      }, this.x = e, this.y = t, this.lastIndex = e.length - 1;
    }
    interpolate(e) {
      if (!e) return 0;
      const t = this.binarySearch(this.x, e),
        s = t - 1;
      return (e - this.x[s]) * (this.y[t] - this.y[s]) / (this.x[t] - this.x[s]) + this.y[s];
    }
  }
  const ce = e => !!e.virtual && !!e.params.virtual?.enabled,
    pe = e => !!e.virtual && !!e.params.virtual?.enabled;
  function ue(e, t) {
    const s = this,
      {
        params: i,
        activeIndex: r,
        slidesEl: a
      } = s;
    let n = r;
    i.loop && (n -= s.loopedSlides ?? 0, s.loopDestroy(), s.recalcSlides());
    const l = s.slides.length;
    if (e <= 0) return void s.prependSlide(t);
    if (e >= l) return void s.appendSlide(t);
    let o = n > e ? n + 1 : n;
    const d = [];
    for (let t = l - 1; t >= e; t -= 1) {
      const e = s.slides[t];
      e && (e.remove(), d.unshift(e));
    }
    if (Array.isArray(t)) {
      for (let e = 0; e < t.length; e += 1) {
        const s = t[e];
        s && a.append(s);
      }
      o = n > e ? n + t.length : n;
    } else a.append(t);
    for (let e = 0; e < d.length; e += 1) a.append(d[e]);
    s.recalcSlides(), i.loop && s.loopCreate(), i.observer && !s.isElement || s.update(), i.loop ? s.slideTo(o + (s.loopedSlides ?? 0), 0, !1) : s.slideTo(o, 0, !1);
  }
  function me(e) {
    const t = this,
      {
        params: s,
        slidesEl: i
      } = t;
    s.loop && t.loopDestroy();
    const r = e => {
      if ("string" == typeof e) {
        const t = document.createElement("div");
        y(t, e);
        const s = t.children[0];
        s && i.append(s), y(t, "");
      } else i.append(e);
    };
    if (Array.isArray(e)) for (let t = 0; t < e.length; t += 1) {
      const s = e[t];
      s && r(s);
    } else r(e);
    t.recalcSlides(), s.loop && t.loopCreate(), s.observer && !t.isElement || t.update();
  }
  function he(e) {
    const t = this,
      {
        params: s,
        activeIndex: i,
        slidesEl: r
      } = t;
    s.loop && t.loopDestroy();
    let a = i + 1;
    const n = e => {
      if ("string" == typeof e) {
        const t = document.createElement("div");
        y(t, e);
        const s = t.children[0];
        s && r.prepend(s), y(t, "");
      } else r.prepend(e);
    };
    if (Array.isArray(e)) {
      for (let t = 0; t < e.length; t += 1) {
        const s = e[t];
        s && n(s);
      }
      a = i + e.length;
    } else n(e);
    t.recalcSlides(), s.loop && t.loopCreate(), s.observer && !t.isElement || t.update(), t.slideTo(a, 0, !1);
  }
  function fe() {
    const e = this,
      t = [];
    for (let s = 0; s < e.slides.length; s += 1) t.push(s);
    e.removeSlide(t);
  }
  function ge(e) {
    const t = this,
      {
        params: s,
        activeIndex: i
      } = t;
    let r = i;
    s.loop && (r -= t.loopedSlides ?? 0, t.loopDestroy());
    let a = r;
    if (Array.isArray(e)) {
      for (let s = 0; s < e.length; s += 1) {
        const i = e[s];
        t.slides[i] && t.slides[i].remove(), i < a && (a -= 1);
      }
      a = Math.max(a, 0);
    } else {
      const s = e;
      t.slides[s] && t.slides[s].remove(), s < a && (a -= 1), a = Math.max(a, 0);
    }
    t.recalcSlides(), s.loop && t.loopCreate(), s.observer && !t.isElement || t.update(), s.loop ? t.slideTo(a + (t.loopedSlides ?? 0), 0, !1) : t.slideTo(a, 0, !1);
  }
  function ve(e) {
    const {
      effect: t,
      swiper: s,
      on: i,
      setTranslate: r,
      setTransition: a,
      overwriteParams: n,
      perspective: l,
      recreateShadows: o,
      getEffectParams: d
    } = e;
    i("beforeInit", () => {
      if (s.params.effect !== t) return;
      s.classNames.push(`${s.params.containerModifierClass}${t}`), l && l() && s.classNames.push(`${s.params.containerModifierClass}3d`);
      const e = n ? n() : {};
      Object.assign(s.params, e), Object.assign(s.originalParams, e);
    }), i("setTranslate _virtualUpdated", () => {
      s.params.effect === t && r();
    }), i("setTransition", (e, i) => {
      s.params.effect === t && a(i);
    }), i("transitionEnd", () => {
      if (s.params.effect === t && o) {
        const e = d ? d() : void 0;
        if (!e || !e.slideShadows) return;
        s.slides.forEach(e => {
          e.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach(e => e.remove());
        }), o();
      }
    });
    let c = !1;
    i("virtualUpdate", () => {
      s.params.effect === t && (s.slides.length || (c = !0), requestAnimationFrame(() => {
        c && s.slides && s.slides.length && (r(), c = !1);
      }));
    });
  }
  function we(e, t) {
    const s = o(t);
    return s !== t && (s.style.backfaceVisibility = "hidden", s.style.setProperty("-webkit-backface-visibility", "hidden")), s;
  }
  function be({
    swiper: e,
    duration: t,
    transformElements: s,
    allSlides: i
  }) {
    const {
      activeIndex: r
    } = e;
    if (e.params.virtualTranslate && 0 !== t) {
      let t,
        a = !1;
      t = i ? s : s.filter(t => {
        const s = t.classList.contains("swiper-slide-transform") ? (t => t.parentElement ? t.parentElement instanceof HTMLElement ? t.parentElement : void 0 : e.slides.find(e => e.shadowRoot && e.shadowRoot === t.parentNode))(t) : t;
        return !!s && e.getSlideIndex(s) === r;
      }), t.forEach(t => {
        g(t, () => {
          if (a) return;
          if (!e || e.destroyed) return;
          a = !0, e.animating = !1;
          const t = new CustomEvent("transitionend", {
            bubbles: !0,
            cancelable: !0
          });
          e.wrapperEl.dispatchEvent(t);
        });
      });
    }
  }
  function ye(e, t, s) {
    const i = `swiper-slide-shadow${s ? `-${s}` : ""}${e ? ` swiper-slide-shadow-${e}` : ""}`,
      r = o(t),
      a = `.${i.split(" ").join(".")}`,
      n = r.querySelector(a);
    if (n) return n;
    const l = p("div", i.split(" "));
    return r.append(l), l;
  }
  const Ee = [({
    swiper: e,
    extendParams: t,
    on: s,
    emit: i
  }) => {
    let r, a;
    function n() {
      return e.params.virtual;
    }
    t({
      virtual: {
        enabled: !1,
        slides: [],
        cache: !0,
        slidesPerViewAutoSlideSize: 320,
        renderSlide: null,
        renderExternal: null,
        renderExternalUpdate: !0,
        addSlidesBefore: 0,
        addSlidesAfter: 0
      }
    }), e.virtual = {
      cache: {},
      from: 0,
      to: -1,
      slides: [],
      offset: 0,
      slidesGrid: []
    };
    function o(t, s) {
      const i = n();
      if (i.cache && e.virtual.cache[s]) return e.virtual.cache[s];
      let r;
      if (i.renderSlide) {
        const n = i.renderSlide.call(e, t, s);
        if ("string" == typeof n) {
          const e = a ??= document.createElement("div");
          y(e, n), r = e.children[0];
        } else r = n;
      } else r = e.isElement ? p("swiper-slide") : p("div", e.params.slideClass);
      return r.setAttribute("data-swiper-slide-index", String(s)), i.renderSlide || y(r, t), i.cache && (e.virtual.cache[s] = r), r;
    }
    function c(t, s, r) {
      const {
        slidesPerGroup: a,
        centeredSlides: l,
        slidesPerView: c,
        loop: p,
        initialSlide: u
      } = e.params;
      if (s && !p && (u ?? 0) > 0) return;
      const {
          addSlidesBefore: m,
          addSlidesAfter: h,
          slidesPerViewAutoSlideSize: f
        } = n(),
        {
          from: g,
          to: v,
          slides: w,
          slidesGrid: b,
          offset: y
        } = e.virtual;
      e.params.cssMode || e.updateActiveIndex();
      const E = void 0 === r ? e.activeIndex || 0 : r;
      let S, x;
      if (S = e.rtlTranslate ? "right" : e.isHorizontal() ? "left" : "top", "auto" === c) {
        if (f) {
          let t = e.size;
          t || (t = e.isHorizontal() ? e.el.getBoundingClientRect().width : e.el.getBoundingClientRect().height), x = Math.max(1, Math.ceil(t / f));
        } else x = 1;
      } else x = c ?? 1;
      const T = a ?? 1;
      let M, C;
      l ? (M = Math.floor(x / 2) + T + h, C = Math.floor(x / 2) + T + m) : (M = x + (T - 1) + h, C = (p ? x : T) + m);
      let P = E - C,
        L = E + M;
      p || (P = Math.max(P, 0), L = Math.min(L, w.length - 1));
      let A = (e.slidesGrid[P] || 0) - (e.slidesGrid[0] || 0);
      function I() {
        e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), i("virtualUpdate");
      }
      if (p && E >= C ? (P -= C, l || (A += e.slidesGrid[0])) : p && E < C && (P = -C, l && (A += e.slidesGrid[0])), Object.assign(e.virtual, {
        from: P,
        to: L,
        offset: A,
        slidesGrid: e.slidesGrid,
        slidesBefore: C,
        slidesAfter: M
      }), g === P && v === L && !t) return e.slidesGrid !== b && A !== y && e.slides.forEach(t => {
        t.style.setProperty(S, A - Math.abs(e.cssOverflowAdjustment()) + "px");
      }), e.updateProgress(), void i("virtualUpdate");
      const z = n();
      if (z.renderExternal) {
        const t = [];
        for (let e = P; e <= L; e += 1) t.push(w[e]);
        return z.renderExternal.call(e, {
          offset: A,
          from: P,
          to: L,
          slides: t
        }), void (z.renderExternalUpdate ? I() : i("virtualUpdate"));
      }
      const $ = [],
        k = [],
        O = e => {
          let t = e;
          return e < 0 ? t = w.length + e : t >= w.length && (t -= w.length), t;
        };
      if (t) e.slides.filter(t => t.matches(`.${e.params.slideClass}, swiper-slide`)).forEach(e => {
        e.remove();
      });else for (let t = g; t <= v; t += 1) if (t < P || t > L) {
        const s = O(t);
        e.slides.filter(t => t.matches(`.${e.params.slideClass}[data-swiper-slide-index="${s}"], swiper-slide[data-swiper-slide-index="${s}"]`)).forEach(e => {
          e.remove();
        });
      }
      const D = p ? -w.length : 0,
        G = p ? 2 * w.length : w.length;
      for (let e = D; e < G; e += 1) if (e >= P && e <= L) {
        const s = O(e);
        void 0 === v || t ? k.push(s) : (e > v && k.push(s), e < g && $.push(s));
      }
      if (k.forEach(t => {
        e.slidesEl.append(o(w[t], t));
      }), p) for (let t = $.length - 1; t >= 0; t -= 1) {
        const s = $[t];
        e.slidesEl.prepend(o(w[s], s));
      } else $.sort((e, t) => t - e), $.forEach(t => {
        e.slidesEl.prepend(o(w[t], t));
      });
      d(e.slidesEl, ".swiper-slide, swiper-slide").forEach(t => {
        t.style.setProperty(S, A - Math.abs(e.cssOverflowAdjustment()) + "px");
      }), I();
    }
    s("beforeInit", () => {
      if (!n().enabled) return;
      let t = !1;
      const s = e.passedParams.virtual;
      if (!s || "object" != typeof s || void 0 === s.slides) {
        const s = [...e.slidesEl.children].filter(t => t.matches(`.${e.params.slideClass}, swiper-slide`));
        s && s.length && (e.virtual.slides = [...s], t = !0, s.forEach((t, s) => {
          t.setAttribute("data-swiper-slide-index", String(s)), e.virtual.cache[s] = t, t.remove();
        }));
      }
      t || (e.virtual.slides = n().slides), e.classNames.push(`${e.params.containerModifierClass}virtual`), e.params.watchSlidesProgress = !0, e.originalParams.watchSlidesProgress = !0, c(!1, !0);
    }), s("setTranslate", () => {
      n().enabled && (e.params.cssMode && !e._immediateVirtual ? (clearTimeout(r), r = setTimeout(() => {
        c();
      }, 100)) : c());
    }), s("init update resize", () => {
      n().enabled && e.params.cssMode && l(e.wrapperEl, "--swiper-virtual-size", `${e.virtualSize}px`);
    }), Object.assign(e.virtual, {
      appendSlide: function (t) {
        if (null !== t && "object" == typeof t && "length" in t) {
          const s = t;
          for (let t = 0; t < s.length; t += 1) s[t] && e.virtual.slides.push(s[t]);
        } else e.virtual.slides.push(t);
        c(!0);
      },
      prependSlide: function (t) {
        const s = e.activeIndex;
        let i = s + 1,
          r = 1;
        if (Array.isArray(t)) {
          for (let s = 0; s < t.length; s += 1) t[s] && e.virtual.slides.unshift(t[s]);
          i = s + t.length, r = t.length;
        } else e.virtual.slides.unshift(t);
        if (n().cache) {
          const t = e.virtual.cache,
            s = {};
          Object.keys(t).forEach(e => {
            const i = t[Number(e)],
              a = i.getAttribute("data-swiper-slide-index");
            a && i.setAttribute("data-swiper-slide-index", String(parseInt(a, 10) + r)), s[parseInt(e, 10) + r] = i;
          }), e.virtual.cache = s;
        }
        c(!0), e.slideTo(i, 0);
      },
      removeSlide: function (t) {
        if (null == t) return;
        let s = e.activeIndex;
        const i = t => {
          Object.keys(e.virtual.cache).forEach(s => {
            const i = Number(s);
            if (i > t) {
              const t = e.virtual.cache[i];
              e.virtual.cache[i - 1] = t, t.setAttribute("data-swiper-slide-index", String(i - 1)), delete e.virtual.cache[i];
            }
          });
        };
        if (Array.isArray(t)) for (let r = t.length - 1; r >= 0; r -= 1) n().cache && (delete e.virtual.cache[t[r]], i(t[r])), e.virtual.slides.splice(t[r], 1), t[r] < s && (s -= 1), s = Math.max(s, 0);else n().cache && (delete e.virtual.cache[t], i(t)), e.virtual.slides.splice(t, 1), t < s && (s -= 1), s = Math.max(s, 0);
        c(!0), e.slideTo(s, 0);
      },
      removeAllSlides: function () {
        e.virtual.slides = [], n().cache && (e.virtual.cache = {}), c(!0), e.slideTo(0, 0);
      },
      update: c
    });
  }, ({
    swiper: e,
    extendParams: t,
    on: s,
    emit: i
  }) => {
    function r() {
      return e.params.keyboard;
    }
    function a(t) {
      if (!e.enabled) return;
      const {
          rtlTranslate: s
        } = e,
        a = "originalEvent" in t && t.originalEvent ? t.originalEvent : t,
        n = a.keyCode || a.charCode,
        l = r(),
        o = !!l.pageUpDown,
        d = o && 33 === n,
        c = o && 34 === n,
        p = 37 === n,
        m = 39 === n,
        h = 38 === n,
        g = 40 === n;
      if (!e.allowSlideNext && (e.isHorizontal() && m || e.isVertical() && g || c)) return !1;
      if (!e.allowSlidePrev && (e.isHorizontal() && p || e.isVertical() && h || d)) return !1;
      if (a.shiftKey || a.altKey || a.ctrlKey || a.metaKey) return;
      const v = document.activeElement;
      if (v && (v.isContentEditable || v.nodeName && ("input" === v.nodeName.toLowerCase() || "textarea" === v.nodeName.toLowerCase()))) return;
      if (l.onlyInViewport && (d || c || p || m || h || g)) {
        let t = !1;
        if (f(e.el, `.${e.params.slideClass}, swiper-slide`).length > 0 && 0 === f(e.el, `.${e.params.slideActiveClass}`).length) return;
        const i = e.el,
          r = i.clientWidth,
          a = i.clientHeight,
          n = window.innerWidth,
          l = window.innerHeight,
          o = u(i);
        s && (o.left -= i.scrollLeft);
        const d = [[o.left, o.top], [o.left + r, o.top], [o.left, o.top + a], [o.left + r, o.top + a]];
        for (let e = 0; e < d.length; e += 1) {
          const s = d[e];
          if (s[0] >= 0 && s[0] <= n && s[1] >= 0 && s[1] <= l) {
            if (0 === s[0] && 0 === s[1]) continue;
            t = !0;
          }
        }
        if (!t) return;
      }
      const w = l.speed;
      e.isHorizontal() ? ((d || c || p || m) && a.cancelable && a.preventDefault(), ((c || m) && !s || (d || p) && s) && e.slideNext(w), ((d || p) && !s || (c || m) && s) && e.slidePrev(w)) : ((d || c || h || g) && a.cancelable && a.preventDefault(), (c || g) && e.slideNext(w), (d || h) && e.slidePrev(w)), i("keyPress", n);
    }
    function n() {
      e.keyboard.enabled || (document.addEventListener("keydown", a), e.keyboard.enabled = !0);
    }
    function l() {
      e.keyboard.enabled && (document.removeEventListener("keydown", a), e.keyboard.enabled = !1);
    }
    t({
      keyboard: {
        enabled: !1,
        onlyInViewport: !0,
        pageUpDown: !0,
        speed: void 0
      }
    }), e.keyboard = {
      enabled: !1,
      enable: n,
      disable: l
    }, s("init", () => {
      r().enabled && n();
    }), s("destroy", () => {
      e.keyboard.enabled && l();
    });
  }, ({
    swiper: e,
    extendParams: i,
    on: r,
    emit: a
  }) => {
    let n;
    i({
      mousewheel: {
        enabled: !1,
        releaseOnEdges: !1,
        invert: !1,
        forceToAxis: !1,
        sensitivity: 1,
        eventsTarget: "container",
        thresholdDelta: null,
        thresholdTime: null,
        noMousewheelClass: "swiper-no-mousewheel"
      }
    });
    let l,
      o = s(),
      d = !1;
    const c = [];
    function p() {
      return e.params.mousewheel;
    }
    function u() {
      e.enabled && (d = !0);
    }
    function m() {
      e.enabled && (d = !1);
    }
    function h(t) {
      const i = p();
      return !(i.thresholdDelta && t.delta < i.thresholdDelta) && !(i.thresholdTime && s() - o < i.thresholdTime) && (t.delta >= 6 && s() - o < 60 || (t.direction < 0 ? e.isEnd && !e.params.loop || e.animating || (e.slideNext(), a("scroll", t.raw)) : e.isBeginning && !e.params.loop || e.animating || (e.slidePrev(), a("scroll", t.raw)), o = new window.Date().getTime(), !1));
    }
    function f(i) {
      let r = "originalEvent" in i && i.originalEvent ? i.originalEvent : i,
        o = !0;
      if (!e.enabled) return !1;
      const u = p();
      if (i.target.closest(`.${u.noMousewheelClass}`)) return !1;
      e.params.cssMode && r.preventDefault();
      let m = e.el;
      "container" !== u.eventsTarget && (m = document.querySelector(u.eventsTarget));
      const f = m && m.contains(r.target);
      if (!d && !f && !u.releaseOnEdges) return !0;
      let g = 0;
      const v = e.rtlTranslate ? -1 : 1,
        w = function (e) {
          const t = e;
          let s = 0,
            i = 0,
            r = 0,
            a = 0;
          return void 0 !== t.detail && (i = t.detail), void 0 !== t.wheelDelta && (i = -t.wheelDelta / 120), void 0 !== t.wheelDeltaY && (i = -t.wheelDeltaY / 120), void 0 !== t.wheelDeltaX && (s = -t.wheelDeltaX / 120), void 0 !== t.axis && void 0 !== t.HORIZONTAL_AXIS && t.axis === t.HORIZONTAL_AXIS && (s = i, i = 0), r = 10 * s, a = 10 * i, void 0 !== t.deltaY && (a = t.deltaY), void 0 !== t.deltaX && (r = t.deltaX), t.shiftKey && !r && (r = a, a = 0), (r || a) && t.deltaMode && (1 === t.deltaMode ? (r *= 40, a *= 40) : (r *= 800, a *= 800)), r && !s && (s = r < 1 ? -1 : 1), a && !i && (i = a < 1 ? -1 : 1), {
            spinX: s,
            spinY: i,
            pixelX: r,
            pixelY: a
          };
        }(r);
      if (u.forceToAxis) {
        if (e.isHorizontal()) {
          if (!(Math.abs(w.pixelX) > Math.abs(w.pixelY))) return !0;
          g = -w.pixelX * v;
        } else {
          if (!(Math.abs(w.pixelY) > Math.abs(w.pixelX))) return !0;
          g = -w.pixelY;
        }
      } else g = Math.abs(w.pixelX) > Math.abs(w.pixelY) ? -w.pixelX * v : -w.pixelY;
      if (0 === g) return !0;
      u.invert && (g = -g);
      let b = e.getTranslate() + g * (u.sensitivity ?? 1);
      b >= e.minTranslate() && (b = e.minTranslate()), b <= e.maxTranslate() && (b = e.maxTranslate()), o = !!e.params.loop || !(b === e.minTranslate() || b === e.maxTranslate()), o && e.params.nested && r.stopPropagation();
      const y = e.params.freeMode;
      if (e.params.freeMode && y?.enabled) {
        const i = {
            time: s(),
            delta: Math.abs(g),
            direction: Math.sign(g)
          },
          o = l && i.time < l.time + 500 && i.delta <= l.delta && i.direction === l.direction;
        if (!o) {
          l = void 0;
          let s = e.getTranslate() + g * (u.sensitivity ?? 1);
          const d = e.isBeginning,
            p = e.isEnd;
          if (s >= e.minTranslate() && (s = e.minTranslate()), s <= e.maxTranslate() && (s = e.maxTranslate()), e.setTransition(0), e.setTranslate(s), e.updateProgress(), e.updateActiveIndex(), e.updateSlidesClasses(), (!d && e.isBeginning || !p && e.isEnd) && e.updateSlidesClasses(), e.params.loop && e.loopFix({
            direction: i.direction < 0 ? "next" : "prev",
            byMousewheel: !0
          }), y?.sticky) {
            clearTimeout(n), n = void 0, c.length >= 15 && c.shift();
            const s = c.length ? c[c.length - 1] : void 0,
              r = c[0];
            if (c.push(i), s && (i.delta > s.delta || i.direction !== s.direction)) c.splice(0);else if (c.length >= 15 && r && i.time - r.time < 500 && r.delta - i.delta >= 1 && i.delta <= 6) {
              const s = g > 0 ? .8 : .2;
              l = i, c.splice(0), n = t(() => {
                !e.destroyed && e.params && e.slideToClosest(e.params.speed, !0, void 0, s);
              }, 0);
            }
            n || (n = t(() => {
              if (e.destroyed || !e.params) return;
              l = i, c.splice(0), e.slideToClosest(e.params.speed, !0, void 0, .5);
            }, 500));
          }
          o || a("scroll", r);
          const m = e.params.autoplay;
          if (e.params.autoplay && m?.disableOnInteraction && e.autoplay.stop(), u.releaseOnEdges && (s === e.minTranslate() || s === e.maxTranslate())) return !0;
        }
      } else {
        const t = {
          time: s(),
          delta: Math.abs(g),
          direction: Math.sign(g),
          raw: i
        };
        c.length >= 2 && c.shift();
        const r = c.length ? c[c.length - 1] : void 0;
        if (c.push(t), r ? (t.direction !== r.direction || t.delta > r.delta || t.time > r.time + 150) && h(t) : h(t), function (t) {
          const s = p();
          if (t.direction < 0) {
            if (e.isEnd && !e.params.loop && s.releaseOnEdges) return !0;
          } else if (e.isBeginning && !e.params.loop && s.releaseOnEdges) return !0;
          return !1;
        }(t)) return !0;
      }
      return r.cancelable && r.preventDefault(), !1;
    }
    function g(t) {
      const s = p();
      let i = e.el;
      "container" !== s.eventsTarget && (i = document.querySelector(s.eventsTarget)), i[t]("mouseenter", u), i[t]("mouseleave", m), i[t]("wheel", f);
    }
    function v() {
      return e.params.cssMode ? (e.wrapperEl.removeEventListener("wheel", f), !0) : !e.mousewheel.enabled && (g("addEventListener"), e.mousewheel.enabled = !0, !0);
    }
    function w() {
      return e.params.cssMode ? (e.wrapperEl.addEventListener("wheel", f), !0) : !!e.mousewheel.enabled && (g("removeEventListener"), e.mousewheel.enabled = !1, !0);
    }
    r("init", () => {
      const t = p();
      !t.enabled && e.params.cssMode && w(), t.enabled && v();
    }), e.mousewheel = {
      enabled: !1,
      enable: v,
      disable: w
    }, r("destroy", () => {
      e.params.cssMode && v(), e.mousewheel.enabled && w();
    });
  }, ({
    swiper: e,
    extendParams: t,
    on: s,
    emit: i
  }) => {
    function r() {
      return e.params.navigation;
    }
    function a(t) {
      let s;
      return t && "string" == typeof t && e.isElement && (s = e.el.querySelector(t) || e.hostEl.querySelector(t), s) ? s : (t && ("string" == typeof t && (s = [...document.querySelectorAll(t)]), e.params.uniqueNavElements && "string" == typeof t && s && s.length > 1 && 1 === e.el.querySelectorAll(t).length ? s = e.el.querySelector(t) : s && 1 === s.length && (s = s[0])), t && !s ? t : s);
    }
    function n(t, s) {
      const i = r();
      w(t).forEach(t => {
        t && (t.classList[s ? "add" : "remove"](...i.disabledClass.split(" ")), "BUTTON" === t.tagName && (t.disabled = s), e.params.watchOverflow && e.enabled && t.classList[e.isLocked ? "add" : "remove"](i.lockClass));
      });
    }
    function l() {
      const {
        nextEl: t,
        prevEl: s
      } = e.navigation;
      if (e.params.loop) return n(s, !1), void n(t, !1);
      n(s, e.isBeginning && !e.params.rewind), n(t, e.isEnd && !e.params.rewind);
    }
    function o(t) {
      t.preventDefault(), (!e.isBeginning || e.params.loop || e.params.rewind) && (e.slidePrev(), i("navigationPrev"));
    }
    function d(t) {
      t.preventDefault(), (!e.isEnd || e.params.loop || e.params.rewind) && (e.slideNext(), i("navigationNext"));
    }
    function c() {
      e.params.navigation = ae(e, e.originalParams.navigation, e.params.navigation, {
        nextEl: "swiper-button-next",
        prevEl: "swiper-button-prev"
      });
      const t = r();
      if (!t.nextEl && !t.prevEl) return;
      const s = a(t.nextEl),
        i = a(t.prevEl);
      Object.assign(e.navigation, {
        nextEl: s,
        prevEl: i
      });
      const n = w(s),
        l = w(i),
        c = (s, i) => {
          if (s) {
            if (t.addIcons && s.matches(".swiper-button-next,.swiper-button-prev") && !s.querySelector("svg")) {
              const e = document.createElement("div");
              y(e, ne);
              const t = e.querySelector("svg");
              t && s.appendChild(t), e.remove();
            }
            s.addEventListener("click", "next" === i ? d : o);
          }
          !e.enabled && s && s.classList.add(...t.lockClass.split(" "));
        };
      n.forEach(e => c(e, "next")), l.forEach(e => c(e, "prev"));
    }
    function p() {
      const t = r(),
        {
          nextEl: s,
          prevEl: i
        } = e.navigation,
        a = w(s),
        n = w(i),
        l = (e, s) => {
          e.removeEventListener("click", "next" === s ? d : o), e.classList.remove(...t.disabledClass.split(" "));
        };
      a.forEach(e => l(e, "next")), n.forEach(e => l(e, "prev"));
    }
    t({
      navigation: {
        nextEl: null,
        prevEl: null,
        addIcons: !0,
        hideOnClick: !1,
        disabledClass: "swiper-button-disabled",
        hiddenClass: "swiper-button-hidden",
        lockClass: "swiper-button-lock",
        navigationDisabledClass: "swiper-navigation-disabled"
      }
    }), e.navigation = {
      nextEl: null,
      prevEl: null,
      arrowSvg: ne
    }, s("init", () => {
      !1 === r().enabled ? u() : (c(), l());
    }), s("toEdge fromEdge lock unlock", () => {
      l();
    }), s("destroy", () => {
      p();
    }), s("enable disable", () => {
      const t = r(),
        {
          nextEl: s,
          prevEl: i
        } = e.navigation,
        a = w(s),
        n = w(i);
      e.enabled ? l() : [...a, ...n].filter(e => !!e).forEach(e => e.classList.add(t.lockClass));
    }), s("click", (t, s) => {
      const a = r(),
        {
          nextEl: n,
          prevEl: l
        } = e.navigation,
        o = w(n),
        d = w(l),
        c = s.target;
      let p = d.includes(c) || o.includes(c);
      if (e.isElement && !p) {
        const e = s.composedPath ? s.composedPath() : [];
        e.length && (p = e.find(e => o.includes(e) || d.includes(e)));
      }
      if (a.hideOnClick && !p) {
        if (e.pagination && e.params.pagination && e.params.pagination.clickable && (e.pagination.el === c || e.pagination.el.contains(c))) return;
        let t;
        o.length ? t = o[0].classList.contains(a.hiddenClass) : d.length && (t = d[0].classList.contains(a.hiddenClass)), i(!0 === t ? "navigationShow" : "navigationHide"), [...o, ...d].filter(e => !!e).forEach(e => e.classList.toggle(a.hiddenClass));
      }
    });
    const u = () => {
      const t = r();
      e.el.classList.add(...t.navigationDisabledClass.split(" ")), p();
    };
    Object.assign(e.navigation, {
      enable: () => {
        const t = r();
        e.el.classList.remove(...t.navigationDisabledClass.split(" ")), c(), l();
      },
      disable: u,
      update: l,
      init: c,
      destroy: p
    });
  }, ({
    swiper: e,
    extendParams: t,
    on: s,
    emit: i
  }) => {
    const r = "swiper-pagination";
    let a;
    t({
      pagination: {
        el: null,
        bulletElement: "span",
        clickable: !1,
        hideOnClick: !1,
        renderBullet: null,
        renderProgressbar: null,
        renderFraction: null,
        renderCustom: null,
        progressbarOpposite: !1,
        type: "bullets",
        dynamicBullets: !1,
        dynamicMainBullets: 1,
        formatFractionCurrent: e => e,
        formatFractionTotal: e => e,
        bulletClass: `${r}-bullet`,
        bulletActiveClass: `${r}-bullet-active`,
        modifierClass: `${r}-`,
        currentClass: `${r}-current`,
        totalClass: `${r}-total`,
        hiddenClass: `${r}-hidden`,
        progressbarFillClass: `${r}-progressbar-fill`,
        progressbarOppositeClass: `${r}-progressbar-opposite`,
        clickableClass: `${r}-clickable`,
        lockClass: `${r}-lock`,
        horizontalClass: `${r}-horizontal`,
        verticalClass: `${r}-vertical`,
        paginationDisabledClass: `${r}-disabled`
      }
    }), e.pagination = {
      el: null,
      bullets: []
    };
    let n = 0;
    function l() {
      return e.params.pagination;
    }
    function o() {
      return !l().el || !e.pagination.el || Array.isArray(e.pagination.el) && 0 === e.pagination.el.length;
    }
    function d(e, t) {
      const {
        bulletActiveClass: s
      } = l();
      if (!e) return;
      let i = e[("prev" === t ? "previous" : "next") + "ElementSibling"];
      i && (i.classList.add(`${s}-${t}`), i = i[("prev" === t ? "previous" : "next") + "ElementSibling"], i && i.classList.add(`${s}-${t}-${t}`));
    }
    function c(t) {
      const s = t.target.closest(le(l().bulletClass));
      if (!s) return;
      t.preventDefault();
      const i = (h(s) ?? 0) * (e.params.slidesPerGroup ?? 1);
      if (e.params.loop) {
        if (e.realIndex === i) return;
        const t = (r = e.realIndex, a = i, n = e.slides.length, (a %= n) === 1 + (r %= n) ? "next" : a === r - 1 ? "previous" : void 0);
        "next" === t ? e.slideNext() : "previous" === t ? e.slidePrev() : e.slideToLoop(i);
      } else e.slideTo(i);
      var r, a, n;
    }
    function p() {
      const t = e.rtl,
        s = l();
      if (o()) return;
      const r = w(e.pagination.el);
      let c, p;
      const u = oe(e),
        m = e.params.loop ? Math.ceil(u / (e.params.slidesPerGroup ?? 1)) : e.snapGrid.length;
      if (e.params.loop ? (p = e.previousRealIndex || 0, c = (e.params.slidesPerGroup ?? 1) > 1 ? Math.floor(e.realIndex / (e.params.slidesPerGroup ?? 1)) : e.realIndex) : void 0 !== e.snapIndex ? (c = e.snapIndex, p = e.previousSnapIndex) : (p = e.previousIndex || 0, c = e.activeIndex || 0), "bullets" === s.type && e.pagination.bullets && e.pagination.bullets.length > 0) {
        const i = e.pagination.bullets;
        let l = 0,
          o = 0,
          u = 0;
        if (s.dynamicBullets) {
          a = v(i[0], e.isHorizontal() ? "width" : "height");
          const t = e.isHorizontal() ? "width" : "height";
          r.forEach(e => {
            e.style[t] = (a ?? 0) * (s.dynamicMainBullets + 4) + "px";
          }), s.dynamicMainBullets > 1 && void 0 !== p && (n += c - (p || 0), n > s.dynamicMainBullets - 1 ? n = s.dynamicMainBullets - 1 : n < 0 && (n = 0)), l = Math.max(c - n, 0), o = l + (Math.min(i.length, s.dynamicMainBullets) - 1), u = (o + l) / 2;
        }
        if (i.forEach(e => {
          const t = ["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map(e => `${s.bulletActiveClass}${e}`).flatMap(e => "string" == typeof e && e.includes(" ") ? e.split(" ") : [e]);
          e.classList.remove(...t);
        }), r.length > 1) i.forEach(t => {
          const i = h(t);
          i === c ? t.classList.add(...s.bulletActiveClass.split(" ")) : e.isElement && t.setAttribute("part", "bullet"), s.dynamicBullets && void 0 !== i && (i >= l && i <= o && t.classList.add(...`${s.bulletActiveClass}-main`.split(" ")), i === l && d(t, "prev"), i === o && d(t, "next"));
        });else {
          const t = i[c];
          if (t && t.classList.add(...s.bulletActiveClass.split(" ")), e.isElement && i.forEach((e, t) => {
            e.setAttribute("part", t === c ? "bullet-active" : "bullet");
          }), s.dynamicBullets) {
            const e = i[l],
              t = i[o];
            for (let e = l; e <= o; e += 1) i[e] && i[e].classList.add(...`${s.bulletActiveClass}-main`.split(" "));
            d(e, "prev"), d(t, "next");
          }
        }
        if (s.dynamicBullets) {
          const r = Math.min(i.length, s.dynamicMainBullets + 4),
            n = ((a ?? 0) * r - (a ?? 0)) / 2 - u * (a ?? 0),
            l = t ? "right" : "left",
            o = e.isHorizontal() ? l : "top";
          i.forEach(e => {
            e.style[o] = `${n}px`;
          });
        }
      }
      r.forEach((t, r) => {
        if ("fraction" === s.type && (t.querySelectorAll(le(s.currentClass)).forEach(e => {
          e.textContent = String(s.formatFractionCurrent(c + 1));
        }), t.querySelectorAll(le(s.totalClass)).forEach(e => {
          e.textContent = String(s.formatFractionTotal(m));
        })), "progressbar" === s.type) {
          let i;
          i = s.progressbarOpposite ? e.isHorizontal() ? "vertical" : "horizontal" : e.isHorizontal() ? "horizontal" : "vertical";
          const r = (c + 1) / m;
          let a = 1,
            n = 1;
          "horizontal" === i ? a = r : n = r, t.querySelectorAll(le(s.progressbarFillClass)).forEach(t => {
            t.style.transform = `translate3d(0,0,0) scaleX(${a}) scaleY(${n})`, t.style.transitionDuration = `${e.params.speed}ms`;
          });
        }
        "custom" === s.type && s.renderCustom ? (y(t, s.renderCustom(e, c + 1, m)), 0 === r && i("paginationRender", t)) : (0 === r && i("paginationRender", t), i("paginationUpdate", t)), e.params.watchOverflow && e.enabled && t.classList[e.isLocked ? "add" : "remove"](s.lockClass);
      });
    }
    function u() {
      const t = l();
      if (o()) return;
      const s = oe(e),
        r = w(e.pagination.el);
      let a = "";
      if ("bullets" === t.type) {
        let i = e.params.loop ? Math.ceil(s / (e.params.slidesPerGroup ?? 1)) : e.snapGrid.length;
        e.params.freeMode && (e => !!e.params.freeMode?.enabled)(e) && i > s && (i = s);
        for (let s = 0; s < i; s += 1) t.renderBullet ? a += t.renderBullet.call(e, s, t.bulletClass) : a += `<${t.bulletElement} ${e.isElement ? 'part="bullet"' : ""} class="${t.bulletClass}"></${t.bulletElement}>`;
      }
      "fraction" === t.type && (a = t.renderFraction ? t.renderFraction.call(e, t.currentClass, t.totalClass) : `<span class="${t.currentClass}"></span> / <span class="${t.totalClass}"></span>`), "progressbar" === t.type && (a = t.renderProgressbar ? t.renderProgressbar.call(e, t.progressbarFillClass) : `<span class="${t.progressbarFillClass}"></span>`), e.pagination.bullets = [], r.forEach(s => {
        "custom" !== t.type && y(s, a || ""), "bullets" === t.type && e.pagination.bullets.push(...Array.from(s.querySelectorAll(le(t.bulletClass))));
      }), "custom" !== t.type && i("paginationRender", r[0]);
    }
    function m() {
      e.params.pagination = ae(e, e.originalParams.pagination, e.params.pagination, {
        el: "swiper-pagination"
      });
      const t = l();
      if (!t.el) return;
      let s;
      if ("string" == typeof t.el && e.isElement && (s = e.el.querySelector(t.el)), s || "string" != typeof t.el || (s = [...document.querySelectorAll(t.el)]), s || (s = t.el), !s || Array.isArray(s) && 0 === s.length) return;
      if (e.params.uniqueNavElements && "string" == typeof t.el && Array.isArray(s) && s.length > 1 && (s = [...e.el.querySelectorAll(t.el)], s.length > 1)) {
        const t = s.find(t => f(t, ".swiper")[0] === e.el);
        t && (s = t);
      }
      Array.isArray(s) && 1 === s.length && (s = s[0]), Object.assign(e.pagination, {
        el: s
      });
      w(s).forEach(s => {
        "bullets" === t.type && t.clickable && s.classList.add(...(t.clickableClass || "").split(" ")), s.classList.add(t.modifierClass + t.type), s.classList.add(e.isHorizontal() ? t.horizontalClass : t.verticalClass), "bullets" === t.type && t.dynamicBullets && (s.classList.add(`${t.modifierClass}${t.type}-dynamic`), n = 0, t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)), "progressbar" === t.type && t.progressbarOpposite && s.classList.add(t.progressbarOppositeClass), t.clickable && s.addEventListener("click", c), e.enabled || s.classList.add(t.lockClass);
      });
    }
    function g() {
      const t = l();
      if (o()) return;
      const s = e.pagination.el;
      if (s) {
        w(s).forEach(s => {
          s.classList.remove(t.hiddenClass), s.classList.remove(t.modifierClass + t.type), s.classList.remove(e.isHorizontal() ? t.horizontalClass : t.verticalClass), t.clickable && (s.classList.remove(...(t.clickableClass || "").split(" ")), s.removeEventListener("click", c));
        });
      }
      e.pagination.bullets && e.pagination.bullets.forEach(e => e.classList.remove(...t.bulletActiveClass.split(" ")));
    }
    s("changeDirection", () => {
      if (!e.pagination || !e.pagination.el) return;
      const t = l();
      w(e.pagination.el).forEach(s => {
        s.classList.remove(t.horizontalClass, t.verticalClass), s.classList.add(e.isHorizontal() ? t.horizontalClass : t.verticalClass);
      });
    }), s("init", () => {
      !1 === l().enabled ? b() : (m(), u(), p());
    }), s("activeIndexChange", () => {
      void 0 === e.snapIndex && p();
    }), s("snapIndexChange", () => {
      p();
    }), s("snapGridLengthChange", () => {
      u(), p();
    }), s("destroy", () => {
      g();
    }), s("enable disable", () => {
      const {
        el: t
      } = e.pagination;
      if (t) {
        const s = l();
        w(t).forEach(t => t.classList[e.enabled ? "remove" : "add"](s.lockClass));
      }
    }), s("lock unlock", () => {
      p();
    }), s("click", (t, s) => {
      const r = s.target,
        a = w(e.pagination.el),
        n = l();
      if (n.el && n.hideOnClick && a && a.length > 0 && !r.classList.contains(n.bulletClass)) {
        if (e.navigation && (e.navigation.nextEl && r === e.navigation.nextEl || e.navigation.prevEl && r === e.navigation.prevEl)) return;
        const t = a[0].classList.contains(n.hiddenClass);
        i(!0 === t ? "paginationShow" : "paginationHide"), a.forEach(e => e.classList.toggle(n.hiddenClass));
      }
    });
    const b = () => {
      const t = l();
      e.el.classList.add(t.paginationDisabledClass);
      const {
        el: s
      } = e.pagination;
      if (s) {
        w(s).forEach(e => e.classList.add(t.paginationDisabledClass));
      }
      g();
    };
    Object.assign(e.pagination, {
      enable: () => {
        const t = l();
        e.el.classList.remove(t.paginationDisabledClass);
        const {
          el: s
        } = e.pagination;
        if (s) {
          w(s).forEach(e => e.classList.remove(t.paginationDisabledClass));
        }
        m(), u(), p();
      },
      disable: b,
      render: u,
      update: p,
      init: m,
      destroy: g
    });
  }, ({
    swiper: s,
    extendParams: i,
    on: r,
    emit: a
  }) => {
    let n = !1,
      l = null,
      o = null,
      d = 0,
      c = 0,
      m = 0,
      h = 0;
    function f() {
      return s.params.scrollbar;
    }
    function g() {
      const e = f();
      if (!e.el || !s.scrollbar.el) return;
      const {
          scrollbar: t,
          rtlTranslate: i
        } = s,
        {
          dragEl: r,
          el: a
        } = t,
        n = s.params.loop ? s.progressLoop ?? 0 : s.progress;
      let o = c,
        d = (m - c) * n;
      i ? (d = -d, d > 0 ? (o = c - d, d = 0) : -d + c > m && (o = m + d)) : d < 0 ? (o = c + d, d = 0) : d + c > m && (o = m - d), s.isHorizontal() ? (r.style.transform = `translate3d(${d}px, 0, 0)`, r.style.width = `${o}px`) : (r.style.transform = `translate3d(0px, ${d}px, 0)`, r.style.height = `${o}px`), e.hide && (l && clearTimeout(l), a.style.opacity = "1", l = setTimeout(() => {
        a.style.opacity = "0", a.style.transitionDuration = "400ms";
      }, 1e3));
    }
    function v() {
      const e = f();
      if (!e.el || !s.scrollbar.el) return;
      const {
          scrollbar: t
        } = s,
        {
          dragEl: i,
          el: r
        } = t;
      i.style.width = "", i.style.height = "", m = s.isHorizontal() ? r.offsetWidth : r.offsetHeight, h = s.size / (s.virtualSize + (s.params.slidesOffsetBefore ?? 0) - (s.params.centeredSlides ? s.snapGrid[0] : 0)), c = "auto" === e.dragSize ? m * h : parseInt(String(e.dragSize), 10), s.isHorizontal() ? i.style.width = `${c}px` : i.style.height = `${c}px`, r.style.display = h >= 1 ? "none" : "", e.hide && (r.style.opacity = "0"), s.params.watchOverflow && s.enabled && t.el.classList[s.isLocked ? "add" : "remove"](e.lockClass);
    }
    function b(e) {
      return s.isHorizontal() ? e.clientX ?? e.touches?.[0]?.clientX ?? 0 : e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    }
    function y(e) {
      const {
          scrollbar: t,
          rtlTranslate: i
        } = s,
        {
          el: r
        } = t;
      let a;
      a = (b(e) - u(r)[s.isHorizontal() ? "left" : "top"] - (null !== d ? d : c / 2)) / (m - c), a = Math.max(Math.min(a, 1), 0), i && (a = 1 - a);
      const n = s.minTranslate() + (s.maxTranslate() - s.minTranslate()) * a;
      s.updateProgress(n), s.setTranslate(n), s.updateActiveIndex(), s.updateSlidesClasses();
    }
    function E(e) {
      const t = f(),
        {
          scrollbar: i,
          wrapperEl: r
        } = s,
        {
          el: l,
          dragEl: c
        } = i;
      n = !0, d = e.target === c ? b(e) - e.target.getBoundingClientRect()[s.isHorizontal() ? "left" : "top"] : null, e.preventDefault(), e.stopPropagation(), r.style.transitionDuration = "100ms", c.style.transitionDuration = "100ms", y(e), o && clearTimeout(o), l.style.transitionDuration = "0ms", t.hide && (l.style.opacity = "1"), s.params.cssMode && (s.wrapperEl.style.scrollSnapType = "none"), a("scrollbarDragStart", e);
    }
    function S(e) {
      const {
          scrollbar: t,
          wrapperEl: i
        } = s,
        {
          el: r,
          dragEl: l
        } = t;
      n && (e.cancelable && e.preventDefault(), y(e), i.style.transitionDuration = "0ms", r.style.transitionDuration = "0ms", l.style.transitionDuration = "0ms", a("scrollbarDragMove", e));
    }
    function x(e) {
      const i = f(),
        {
          scrollbar: r,
          wrapperEl: l
        } = s,
        {
          el: d
        } = r;
      n && (n = !1, s.params.cssMode && (s.wrapperEl.style.scrollSnapType = "", l.style.transitionDuration = ""), i.hide && (o && clearTimeout(o), o = t(() => {
        d.style.opacity = "0", d.style.transitionDuration = "400ms";
      }, 1e3)), a("scrollbarDragEnd", e), i.snapOnRelease && s.slideToClosest());
    }
    function T(e) {
      const {
          scrollbar: t,
          params: i
        } = s,
        r = t.el;
      if (!r) return;
      const a = !!i.passiveListeners && {
          passive: !1,
          capture: !1
        },
        n = !!i.passiveListeners && {
          passive: !0,
          capture: !1
        },
        l = "on" === e ? "addEventListener" : "removeEventListener";
      r[l]("pointerdown", E, a), document[l]("pointermove", S, a), document[l]("pointerup", x, n);
    }
    function M() {
      const {
        scrollbar: t,
        el: i
      } = s;
      s.params.scrollbar = ae(s, s.originalParams.scrollbar, s.params.scrollbar, {
        el: "swiper-scrollbar"
      });
      const r = f();
      if (!r.el) return;
      let a;
      if ("string" == typeof r.el && s.isElement && (a = s.el.querySelector(r.el)), a || "string" != typeof r.el) a || (a = r.el);else if (a = document.querySelectorAll(r.el), !a.length) return;
      s.params.uniqueNavElements && "string" == typeof r.el && a.length > 1 && 1 === i.querySelectorAll(r.el).length && (a = i.querySelector(r.el)), a.length > 0 && (a = a[0]);
      const n = a;
      n.classList.add(s.isHorizontal() ? r.horizontalClass : r.verticalClass);
      let l = null;
      n && (l = n.querySelector(le(r.dragClass)), l || (l = p("div", r.dragClass), n.append(l))), Object.assign(t, {
        el: n,
        dragEl: l
      }), r.draggable && f().el && s.scrollbar.el && T("on"), n && n.classList[s.enabled ? "remove" : "add"](...e(r.lockClass));
    }
    function C() {
      const t = f(),
        i = s.scrollbar.el;
      i && i.classList.remove(...e(s.isHorizontal() ? t.horizontalClass : t.verticalClass)), f().el && s.scrollbar.el && T("off");
    }
    i({
      scrollbar: {
        el: null,
        dragSize: "auto",
        hide: !1,
        draggable: !1,
        snapOnRelease: !0,
        lockClass: "swiper-scrollbar-lock",
        dragClass: "swiper-scrollbar-drag",
        scrollbarDisabledClass: "swiper-scrollbar-disabled",
        horizontalClass: "swiper-scrollbar-horizontal",
        verticalClass: "swiper-scrollbar-vertical"
      }
    }), s.scrollbar = {
      el: null,
      dragEl: null
    }, r("changeDirection", () => {
      if (!s.scrollbar || !s.scrollbar.el) return;
      const e = f();
      w(s.scrollbar.el).forEach(t => {
        t.classList.remove(e.horizontalClass, e.verticalClass), t.classList.add(s.isHorizontal() ? e.horizontalClass : e.verticalClass);
      });
    }), r("init", () => {
      !1 === f().enabled ? P() : (M(), v(), g());
    }), r("update resize observerUpdate lock unlock changeDirection", () => {
      v();
    }), r("setTranslate", () => {
      g();
    }), r("setTransition", (e, t) => {
      !function (e) {
        f().el && s.scrollbar.el && (s.scrollbar.dragEl.style.transitionDuration = `${e}ms`);
      }(t);
    }), r("enable disable", () => {
      const {
        el: t
      } = s.scrollbar;
      t && t.classList[s.enabled ? "remove" : "add"](...e(f().lockClass));
    }), r("destroy", () => {
      C();
    });
    const P = () => {
      const t = f();
      s.el.classList.add(...e(t.scrollbarDisabledClass)), s.scrollbar.el && s.scrollbar.el.classList.add(...e(t.scrollbarDisabledClass)), C();
    };
    Object.assign(s.scrollbar, {
      enable: () => {
        const t = f();
        s.el.classList.remove(...e(t.scrollbarDisabledClass)), s.scrollbar.el && s.scrollbar.el.classList.remove(...e(t.scrollbarDisabledClass)), M(), v(), g();
      },
      disable: P,
      updateSize: v,
      setTranslate: g,
      init: M,
      destroy: C
    });
  }, ({
    swiper: e,
    extendParams: t,
    on: s
  }) => {
    function i() {
      return e.params.parallax;
    }
    t({
      parallax: {
        enabled: !1
      }
    });
    const r = "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]",
      a = (t, s) => {
        const {
            rtl: i
          } = e,
          r = i ? -1 : 1,
          a = t.getAttribute("data-swiper-parallax") || "0";
        let n = t.getAttribute("data-swiper-parallax-x"),
          l = t.getAttribute("data-swiper-parallax-y");
        const o = t.getAttribute("data-swiper-parallax-scale"),
          d = t.getAttribute("data-swiper-parallax-opacity"),
          c = t.getAttribute("data-swiper-parallax-rotate");
        if (n || l ? (n = n || "0", l = l || "0") : e.isHorizontal() ? (n = a, l = "0") : (l = a, n = "0"), n = n.indexOf("%") >= 0 ? parseInt(n, 10) * s * r + "%" : Number(n) * s * r + "px", l = l.indexOf("%") >= 0 ? parseInt(l, 10) * s + "%" : Number(l) * s + "px", null != d) {
          const e = Number(d),
            i = e - (e - 1) * (1 - Math.abs(s));
          t.style.opacity = String(i);
        }
        let p = `translate3d(${n}, ${l}, 0px)`;
        if (null != o) {
          const e = Number(o);
          p += ` scale(${e - (e - 1) * (1 - Math.abs(s))})`;
        }
        if (c && null != c) {
          p += ` rotate(${Number(c) * s * -1}deg)`;
        }
        t.style.transform = p;
      },
      n = () => {
        const {
            el: t,
            slides: s,
            progress: i,
            snapGrid: n
          } = e,
          l = d(t, r);
        e.isElement && l.push(...d(e.hostEl, r)), l.forEach(e => {
          a(e, i);
        }), s.forEach((t, s) => {
          let l = t.progress ?? 0;
          (e.params.slidesPerGroup ?? 1) > 1 && "auto" !== e.params.slidesPerView && (l += Math.ceil(s / 2) - i * (n.length - 1)), l = Math.min(Math.max(l, -1), 1), t.querySelectorAll(`${r}, [data-swiper-parallax-rotate]`).forEach(e => {
            a(e, l);
          });
        });
      };
    s("beforeInit", () => {
      i().enabled && (e.params.watchSlidesProgress = !0, e.originalParams.watchSlidesProgress = !0);
    }), s("init", () => {
      i().enabled && n();
    }), s("setTranslate", () => {
      i().enabled && n();
    }), s("setTransition", (t, s) => {
      i().enabled && ((t = e.params.speed ?? 300) => {
        const {
            el: s,
            hostEl: i
          } = e,
          a = [...s.querySelectorAll(r)];
        e.isElement && a.push(...i.querySelectorAll(r)), a.forEach(e => {
          const s = e.getAttribute("data-swiper-parallax-duration");
          let i = (s ? parseInt(s, 10) : 0) || t;
          0 === t && (i = 0), e.style.transitionDuration = `${i}ms`;
        });
      })(s);
    });
  }, ({
    swiper: e,
    extendParams: t,
    on: s,
    emit: r
  }) => {
    function a() {
      return e.params.zoom;
    }
    t({
      zoom: {
        enabled: !1,
        limitToOriginalSize: !1,
        maxRatio: 3,
        minRatio: 1,
        panOnMouseMove: !1,
        toggle: !0,
        containerClass: "swiper-zoom-container",
        zoomedSlideClass: "swiper-slide-zoomed"
      }
    }), e.zoom = {
      enabled: !1
    };
    let n = 1,
      l = !1,
      o = !1,
      c = {
        x: 0,
        y: 0
      };
    let p = !1,
      m = !1;
    const h = [],
      g = {
        originX: 0,
        originY: 0,
        slideEl: void 0,
        slideWidth: void 0,
        slideHeight: void 0,
        imageEl: void 0,
        imageWrapEl: void 0,
        maxRatio: 3
      },
      v = {
        isTouched: void 0,
        isMoved: void 0,
        currentX: void 0,
        currentY: void 0,
        minX: void 0,
        minY: void 0,
        maxX: void 0,
        maxY: void 0,
        width: void 0,
        height: void 0,
        startX: void 0,
        startY: void 0,
        touchesStart: {},
        touchesCurrent: {}
      },
      w = {
        x: void 0,
        y: void 0,
        prevPositionX: void 0,
        prevPositionY: void 0,
        prevTime: void 0
      };
    let b,
      y = 1;
    function E() {
      if (h.length < 2) return 1;
      const e = h[0].pageX,
        t = h[0].pageY,
        s = h[1].pageX,
        i = h[1].pageY;
      return Math.sqrt((s - e) ** 2 + (i - t) ** 2);
    }
    function S() {
      const e = a(),
        t = g.imageWrapEl?.getAttribute("data-swiper-zoom"),
        s = null != t ? Number(t) : e.maxRatio,
        i = g.imageEl;
      if (e.limitToOriginalSize && i && i.naturalWidth) {
        const e = i.naturalWidth / i.offsetWidth;
        return Math.min(e, s);
      }
      return s;
    }
    function x(t) {
      const s = e.isElement ? "swiper-slide" : `.${e.params.slideClass}`,
        i = t.target;
      return !!i && (!!i.matches(s) || e.slides.filter(e => e.contains(i)).length > 0);
    }
    function T(t) {
      const s = `.${a().containerClass}`,
        i = t.target;
      return !!i && (!!i.matches(s) || [...e.hostEl.querySelectorAll(s)].filter(e => e.contains(i)).length > 0);
    }
    function M(t) {
      if ("mouse" === t.pointerType && h.splice(0, h.length), !x(t)) return;
      const s = a();
      if (p = !1, m = !1, h.push(t), !(h.length < 2)) {
        if (p = !0, g.scaleStart = E(), !g.slideEl) {
          const i = t.target;
          g.slideEl = i?.closest(`.${e.params.slideClass}, swiper-slide`) ?? void 0, g.slideEl || (g.slideEl = e.slides[e.activeIndex]);
          let r = g.slideEl?.querySelector(`.${s.containerClass}`) ?? null;
          if (r && (r = r.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0] ?? null), g.imageEl = r ?? void 0, g.imageWrapEl = r ? f(r, `.${s.containerClass}`)[0] ?? void 0 : void 0, !g.imageWrapEl) return void (g.imageEl = void 0);
          g.maxRatio = S();
        }
        if (g.imageEl) {
          const [e, t] = function () {
            if (h.length < 2 || !g.imageEl) return [null, null];
            const e = g.imageEl.getBoundingClientRect();
            return [(h[0].pageX + (h[1].pageX - h[0].pageX) / 2 - e.x - window.scrollX) / n, (h[0].pageY + (h[1].pageY - h[0].pageY) / 2 - e.y - window.scrollY) / n];
          }();
          g.originX = e ?? 0, g.originY = t ?? 0, g.imageEl.style.transitionDuration = "0ms";
        }
        l = !0;
      }
    }
    function C(t) {
      if (!x(t)) return;
      const s = a(),
        i = e.zoom,
        r = h.findIndex(e => e.pointerId === t.pointerId);
      r >= 0 && (h[r] = t), h.length < 2 || (m = !0, g.scaleMove = E(), g.imageEl && (i.scale = g.scaleMove / (g.scaleStart ?? 1) * n, i.scale > g.maxRatio && (i.scale = g.maxRatio - 1 + (i.scale - g.maxRatio + 1) ** .5), i.scale < s.minRatio && (i.scale = s.minRatio + 1 - (s.minRatio - i.scale + 1) ** .5), g.imageEl.style.transform = `translate3d(0,0,0) scale(${i.scale})`));
    }
    function P(t) {
      if (!x(t)) return;
      if ("mouse" === t.pointerType && "pointerout" === t.type) return;
      const s = a(),
        i = e.zoom,
        r = h.findIndex(e => e.pointerId === t.pointerId);
      r >= 0 && h.splice(r, 1), p && m && (p = !1, m = !1, g.imageEl && (i.scale = Math.max(Math.min(i.scale, g.maxRatio), s.minRatio), g.imageEl.style.transitionDuration = `${e.params.speed}ms`, g.imageEl.style.transform = `translate3d(0,0,0) scale(${i.scale})`, n = i.scale, l = !1, i.scale > 1 && g.slideEl ? g.slideEl.classList.add(`${s.zoomedSlideClass}`) : i.scale <= 1 && g.slideEl && g.slideEl.classList.remove(`${s.zoomedSlideClass}`), 1 === i.scale && (g.originX = 0, g.originY = 0, g.slideEl = void 0)));
    }
    function L() {
      e.touchEventsData.preventTouchMoveFromPointerMove = !1;
    }
    function A(t) {
      const s = "mouse" === t.pointerType && a().panOnMouseMove;
      if (!x(t) || !T(t)) return;
      const r = e.zoom;
      if (!g.imageEl) return;
      if (!v.isTouched || !g.slideEl) return void (s && z(t));
      if (s) return void z(t);
      v.isMoved || (v.width = g.imageEl.offsetWidth || g.imageEl.clientWidth, v.height = g.imageEl.offsetHeight || g.imageEl.clientHeight, v.startX = i(g.imageWrapEl, "x") || 0, v.startY = i(g.imageWrapEl, "y") || 0, g.slideWidth = g.slideEl.offsetWidth, g.slideHeight = g.slideEl.offsetHeight, g.imageWrapEl.style.transitionDuration = "0ms");
      const o = v.width * r.scale,
        d = v.height * r.scale;
      v.minX = Math.min(g.slideWidth / 2 - o / 2, 0), v.maxX = -v.minX, v.minY = Math.min(g.slideHeight / 2 - d / 2, 0), v.maxY = -v.minY, v.touchesCurrent.x = h.length > 0 ? h[0].pageX : t.pageX, v.touchesCurrent.y = h.length > 0 ? h[0].pageY : t.pageY;
      Math.max(Math.abs(v.touchesCurrent.x - (v.touchesStart.x ?? 0)), Math.abs(v.touchesCurrent.y - (v.touchesStart.y ?? 0))) > 5 && (e.allowClick = !1);
      const c = v.startX ?? 0,
        p = v.startY ?? 0;
      if (!v.isMoved && !l) {
        if (e.isHorizontal() && (Math.floor(v.minX) === Math.floor(c) && v.touchesCurrent.x < (v.touchesStart.x ?? 0) || Math.floor(v.maxX) === Math.floor(c) && v.touchesCurrent.x > (v.touchesStart.x ?? 0))) return v.isTouched = !1, void L();
        if (!e.isHorizontal() && (Math.floor(v.minY) === Math.floor(p) && v.touchesCurrent.y < (v.touchesStart.y ?? 0) || Math.floor(v.maxY) === Math.floor(p) && v.touchesCurrent.y > (v.touchesStart.y ?? 0))) return v.isTouched = !1, void L();
      }
      t.cancelable && t.preventDefault(), t.stopPropagation(), void 0 !== b && clearTimeout(b), e.touchEventsData.preventTouchMoveFromPointerMove = !0, b = setTimeout(() => {
        e.destroyed || L();
      }), v.isMoved = !0;
      const u = (r.scale - n) / (g.maxRatio - a().minRatio),
        {
          originX: m,
          originY: f
        } = g;
      v.currentX = v.touchesCurrent.x - (v.touchesStart.x ?? 0) + c + u * (v.width - 2 * m), v.currentY = v.touchesCurrent.y - (v.touchesStart.y ?? 0) + p + u * (v.height - 2 * f), v.currentX < v.minX && (v.currentX = v.minX + 1 - (v.minX - v.currentX + 1) ** .8), v.currentX > v.maxX && (v.currentX = v.maxX - 1 + (v.currentX - v.maxX + 1) ** .8), v.currentY < v.minY && (v.currentY = v.minY + 1 - (v.minY - v.currentY + 1) ** .8), v.currentY > v.maxY && (v.currentY = v.maxY - 1 + (v.currentY - v.maxY + 1) ** .8), w.prevPositionX || (w.prevPositionX = v.touchesCurrent.x), w.prevPositionY || (w.prevPositionY = v.touchesCurrent.y), w.prevTime || (w.prevTime = Date.now()), w.x = (v.touchesCurrent.x - w.prevPositionX) / (Date.now() - w.prevTime) / 2, w.y = (v.touchesCurrent.y - w.prevPositionY) / (Date.now() - w.prevTime) / 2, Math.abs(v.touchesCurrent.x - w.prevPositionX) < 2 && (w.x = 0), Math.abs(v.touchesCurrent.y - w.prevPositionY) < 2 && (w.y = 0), w.prevPositionX = v.touchesCurrent.x, w.prevPositionY = v.touchesCurrent.y, w.prevTime = Date.now(), g.imageWrapEl.style.transform = `translate3d(${v.currentX}px, ${v.currentY}px,0)`;
    }
    function I() {
      const t = e.zoom;
      g.slideEl && e.activeIndex !== e.slides.indexOf(g.slideEl) && (g.imageEl && (g.imageEl.style.transform = "translate3d(0,0,0) scale(1)"), g.imageWrapEl && (g.imageWrapEl.style.transform = "translate3d(0,0,0)"), g.slideEl.classList.remove(`${a().zoomedSlideClass}`), t.scale = 1, n = 1, g.slideEl = void 0, g.imageEl = void 0, g.imageWrapEl = void 0, g.originX = 0, g.originY = 0);
    }
    function z(e) {
      if (n <= 1 || !g.imageWrapEl) return;
      if (!x(e) || !T(e)) return;
      const t = window.getComputedStyle(g.imageWrapEl).transform,
        s = new window.DOMMatrix(t);
      if (!o) return o = !0, c.x = e.clientX, c.y = e.clientY, v.startX = s.e, v.startY = s.f, v.width = g.imageEl.offsetWidth || g.imageEl.clientWidth, v.height = g.imageEl.offsetHeight || g.imageEl.clientHeight, g.slideWidth = g.slideEl.offsetWidth, void (g.slideHeight = g.slideEl.offsetHeight);
      const i = -3 * (e.clientX - c.x),
        r = -3 * (e.clientY - c.y),
        a = v.width * n,
        l = v.height * n,
        d = g.slideWidth,
        p = g.slideHeight,
        u = Math.min(d / 2 - a / 2, 0),
        m = -u,
        h = Math.min(p / 2 - l / 2, 0),
        f = -h,
        w = Math.max(Math.min(v.startX + i, m), u),
        b = Math.max(Math.min(v.startY + r, f), h);
      g.imageWrapEl.style.transitionDuration = "0ms", g.imageWrapEl.style.transform = `translate3d(${w}px, ${b}px, 0)`, c.x = e.clientX, c.y = e.clientY, v.startX = w, v.startY = b, v.currentX = w, v.currentY = b;
    }
    function $(t) {
      const s = e.zoom,
        i = a();
      if (!g.slideEl) {
        if (t && "number" != typeof t && "target" in t && t.target && (g.slideEl = t.target.closest(`.${e.params.slideClass}, swiper-slide`) ?? void 0), !g.slideEl) {
          const t = e.params.virtual;
          t && t.enabled && e.virtual ? g.slideEl = d(e.slidesEl, `.${e.params.slideActiveClass}`)[0] ?? void 0 : g.slideEl = e.slides[e.activeIndex];
        }
        let s = g.slideEl?.querySelector(`.${i.containerClass}`) ?? null;
        s && (s = s.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0] ?? null), g.imageEl = s ?? void 0, g.imageWrapEl = s ? f(s, `.${i.containerClass}`)[0] ?? void 0 : void 0;
      }
      if (!g.imageEl || !g.imageWrapEl || !g.slideEl) return;
      let r, l, o, c, p, m, h, w, b, y, E, x, T, M, C, P, L, A;
      g.maxRatio = S(), e.params.cssMode && (e.wrapperEl.style.overflow = "hidden", e.wrapperEl.style.touchAction = "none"), g.slideEl.classList.add(`${i.zoomedSlideClass}`);
      const I = t && "number" != typeof t;
      void 0 === v.touchesStart.x && I ? (r = t.pageX, l = t.pageY) : (r = v.touchesStart.x, l = v.touchesStart.y);
      const z = n,
        $ = "number" == typeof t ? t : null;
      1 === n && $ && (r = void 0, l = void 0, v.touchesStart.x = void 0, v.touchesStart.y = void 0);
      const k = S();
      s.scale = $ || k, n = $ || k, !t || 1 === n && $ ? (h = 0, w = 0) : (L = g.slideEl.offsetWidth, A = g.slideEl.offsetHeight, o = u(g.slideEl).left + window.scrollX, c = u(g.slideEl).top + window.scrollY, p = o + L / 2 - (r ?? 0), m = c + A / 2 - (l ?? 0), b = g.imageEl.offsetWidth || g.imageEl.clientWidth, y = g.imageEl.offsetHeight || g.imageEl.clientHeight, E = b * s.scale, x = y * s.scale, T = Math.min(L / 2 - E / 2, 0), M = Math.min(A / 2 - x / 2, 0), C = -T, P = -M, z > 0 && $ && "number" == typeof v.currentX && "number" == typeof v.currentY ? (h = v.currentX * s.scale / z, w = v.currentY * s.scale / z) : (h = p * s.scale, w = m * s.scale), h < T && (h = T), h > C && (h = C), w < M && (w = M), w > P && (w = P)), $ && 1 === s.scale && (g.originX = 0, g.originY = 0), v.currentX = h, v.currentY = w, g.imageWrapEl.style.transitionDuration = "300ms", g.imageWrapEl.style.transform = `translate3d(${h}px, ${w}px,0)`, g.imageEl.style.transitionDuration = "300ms", g.imageEl.style.transform = `translate3d(0,0,0) scale(${s.scale})`;
    }
    function k() {
      const t = e.zoom,
        s = a();
      if (!g.slideEl) {
        const t = e.params.virtual;
        t && t.enabled && e.virtual ? g.slideEl = d(e.slidesEl, `.${e.params.slideActiveClass}`)[0] ?? void 0 : g.slideEl = e.slides[e.activeIndex];
        let i = g.slideEl?.querySelector(`.${s.containerClass}`) ?? null;
        i && (i = i.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0] ?? null), g.imageEl = i ?? void 0, g.imageWrapEl = i ? f(i, `.${s.containerClass}`)[0] ?? void 0 : void 0;
      }
      g.imageEl && g.imageWrapEl && g.slideEl && (g.maxRatio = S(), e.params.cssMode && (e.wrapperEl.style.overflow = "", e.wrapperEl.style.touchAction = ""), t.scale = 1, n = 1, v.currentX = void 0, v.currentY = void 0, v.touchesStart.x = void 0, v.touchesStart.y = void 0, g.imageWrapEl.style.transitionDuration = "300ms", g.imageWrapEl.style.transform = "translate3d(0,0,0)", g.imageEl.style.transitionDuration = "300ms", g.imageEl.style.transform = "translate3d(0,0,0) scale(1)", g.slideEl.classList.remove(`${s.zoomedSlideClass}`), g.slideEl = void 0, g.originX = 0, g.originY = 0, s.panOnMouseMove && (c = {
        x: 0,
        y: 0
      }, o && (o = !1, v.startX = 0, v.startY = 0)));
    }
    function O(t) {
      const s = e.zoom;
      s.scale && 1 !== s.scale ? k() : $(t);
    }
    function D() {
      return {
        passiveListener: !!e.params.passiveListeners && {
          passive: !0,
          capture: !1
        },
        activeListenerWithCapture: !e.params.passiveListeners || {
          passive: !1,
          capture: !0
        }
      };
    }
    function G() {
      const t = e.zoom;
      if (t.enabled) return;
      t.enabled = !0;
      const {
        passiveListener: s,
        activeListenerWithCapture: i
      } = D();
      e.wrapperEl.addEventListener("pointerdown", M, s), e.wrapperEl.addEventListener("pointermove", C, i), ["pointerup", "pointercancel", "pointerout"].forEach(t => {
        e.wrapperEl.addEventListener(t, P, s);
      }), e.wrapperEl.addEventListener("pointermove", A, i);
    }
    function X() {
      const t = e.zoom;
      if (!t.enabled) return;
      t.enabled = !1;
      const {
        passiveListener: s,
        activeListenerWithCapture: i
      } = D();
      e.wrapperEl.removeEventListener("pointerdown", M, s), e.wrapperEl.removeEventListener("pointermove", C, i), ["pointerup", "pointercancel", "pointerout"].forEach(t => {
        e.wrapperEl.removeEventListener(t, P, s);
      }), e.wrapperEl.removeEventListener("pointermove", A, i);
    }
    Object.defineProperty(e.zoom, "scale", {
      get: () => y,
      set(e) {
        if (y !== e) {
          const t = g.imageEl,
            s = g.slideEl;
          r("zoomChange", e, t, s);
        }
        y = e;
      }
    }), s("init", () => {
      a().enabled && G();
    }), s("destroy", () => {
      X();
    }), s("touchStart", (t, s) => {
      e.zoom.enabled && function (t) {
        const s = e.device;
        if (v.isTouched) return;
        const i = h.length > 0 ? h[0] : t;
        v.touchesStart.x = i.pageX, v.touchesStart.y = i.pageY, g.imageEl && (s.android && t.cancelable && t.preventDefault(), v.isTouched = !0);
      }(s);
    }), s("touchEnd", () => {
      e.zoom.enabled && function () {
        const t = e.zoom;
        if (h.length = 0, !g.imageEl) return;
        if (!v.isTouched || !v.isMoved) return v.isTouched = !1, void (v.isMoved = !1);
        v.isTouched = !1, v.isMoved = !1;
        let s = 300,
          i = 300;
        const r = w.x ?? 0,
          a = w.y ?? 0,
          n = r * s,
          l = v.currentX + n,
          o = a * i,
          d = v.currentY + o;
        0 !== r && (s = Math.abs((l - v.currentX) / r)), 0 !== a && (i = Math.abs((d - v.currentY) / a));
        const c = Math.max(s, i);
        v.currentX = l, v.currentY = d;
        const p = v.width * t.scale,
          u = v.height * t.scale;
        v.minX = Math.min(g.slideWidth / 2 - p / 2, 0), v.maxX = -v.minX, v.minY = Math.min(g.slideHeight / 2 - u / 2, 0), v.maxY = -v.minY, v.currentX = Math.max(Math.min(v.currentX, v.maxX), v.minX), v.currentY = Math.max(Math.min(v.currentY, v.maxY), v.minY), g.imageWrapEl.style.transitionDuration = `${c}ms`, g.imageWrapEl.style.transform = `translate3d(${v.currentX}px, ${v.currentY}px,0)`;
      }();
    }), s("doubleTap", (t, s) => {
      !e.animating && a().enabled && e.zoom.enabled && a().toggle && O(s);
    }), s("transitionEnd", () => {
      e.zoom.enabled && a().enabled && I();
    }), s("slideChange", () => {
      e.zoom.enabled && a().enabled && e.params.cssMode && I();
    }), Object.assign(e.zoom, {
      enable: G,
      disable: X,
      in: $,
      out: k,
      toggle: O
    });
  }, ({
    swiper: e,
    extendParams: s,
    on: i
  }) => {
    function r() {
      return e.params.controller;
    }
    function a() {
      e.controller.control && e.controller.spline && (e.controller.spline = void 0, delete e.controller.spline);
    }
    s({
      controller: {
        control: void 0,
        inverse: !1,
        by: "slide"
      }
    }), e.controller = {
      control: void 0
    }, i("beforeInit", () => {
      const t = r().control;
      if ("undefined" != typeof window && ("string" == typeof t || t instanceof HTMLElement)) {
        return void ("string" == typeof t ? [...document.querySelectorAll(t)] : [t]).forEach(t => {
          e.controller.control || (e.controller.control = []);
          const s = e.controller.control;
          if (t && t.swiper) s.push(t.swiper);else if (t) {
            const i = `${e.params.eventsPrefix}init`,
              r = a => {
                const n = a.detail;
                n && n[0] && s.push(n[0]), e.update(), t.removeEventListener(i, r);
              };
            t.addEventListener(i, r);
          }
        });
      }
      e.controller.control = t;
    }), i("update", () => {
      a();
    }), i("resize", () => {
      a();
    }), i("observerUpdate", () => {
      a();
    }), i("setTranslate", (t, s, i) => {
      e.controller.control && (!Array.isArray(e.controller.control) && e.controller.control.destroyed || e.controller.setTranslate(s, i));
    }), i("setTransition", (t, s, i) => {
      e.controller.control && (!Array.isArray(e.controller.control) && e.controller.control.destroyed || e.controller.setTransition(s, i));
    }), Object.assign(e.controller, {
      setTranslate: function (t, s) {
        const i = e.controller.control;
        let a, n;
        const l = e.constructor;
        function o(t) {
          if (t.destroyed) return;
          const s = e.rtlTranslate ? -e.translate : e.translate,
            i = r();
          "slide" === i.by ? (!function (t) {
            e.controller.spline = e.params.loop ? new de(e.slidesGrid, t.slidesGrid) : new de(e.snapGrid, t.snapGrid);
          }(t), n = -e.controller.spline.interpolate(-s)) : n = 0, n && "container" !== i.by || (a = (t.maxTranslate() - t.minTranslate()) / (e.maxTranslate() - e.minTranslate()), !Number.isNaN(a) && Number.isFinite(a) || (a = 1), n = (s - e.minTranslate()) * a + t.minTranslate()), i.inverse && (n = t.maxTranslate() - n), t.updateProgress(n), t.setTranslate(n, e), t.updateActiveIndex(), t.updateSlidesClasses();
        }
        if (Array.isArray(i)) for (let e = 0; e < i.length; e += 1) {
          const t = i[e];
          t && t !== s && t instanceof l && o(t);
        } else i instanceof l && s !== i && o(i);
      },
      setTransition: function (s, i) {
        const r = e.constructor,
          a = e.controller.control;
        function n(i) {
          i.destroyed || (i.setTransition(s, e), 0 !== s && (i.transitionStart(), i.params.autoHeight && t(() => {
            i.updateAutoHeight();
          }), g(i.wrapperEl, () => {
            a && i.transitionEnd();
          })));
        }
        if (Array.isArray(a)) for (let e = 0; e < a.length; e += 1) {
          const t = a[e];
          t && t !== i && t instanceof r && n(t);
        } else a instanceof r && i !== a && n(a);
      }
    });
  }, ({
    swiper: e,
    extendParams: t,
    on: s
  }) => {
    t({
      a11y: {
        enabled: !0,
        notificationClass: "swiper-notification",
        prevSlideMessage: "Previous slide",
        nextSlideMessage: "Next slide",
        firstSlideMessage: "This is the first slide",
        lastSlideMessage: "This is the last slide",
        paginationBulletMessage: "Go to slide {{index}}",
        slideLabelMessage: "{{index}} / {{slidesLength}}",
        containerMessage: null,
        containerRoleDescriptionMessage: null,
        containerRole: null,
        itemRoleDescriptionMessage: null,
        slideRole: "group",
        id: null,
        scrollOnFocus: !0,
        wrapperLiveRegion: !0
      }
    }), e.a11y = {
      clicked: !1
    };
    let i,
      r = null,
      a = !1,
      n = new Date().getTime();
    function l() {
      return e.params.a11y;
    }
    function o(e) {
      r && e && y(r, e);
    }
    function d(e) {
      w(e).forEach(e => {
        e.setAttribute("tabIndex", "0");
      });
    }
    function c(e) {
      w(e).forEach(e => {
        e.setAttribute("tabIndex", "-1");
      });
    }
    function u(e, t) {
      w(e).forEach(e => {
        e.setAttribute("role", t);
      });
    }
    function m(e, t) {
      w(e).forEach(e => {
        e.setAttribute("aria-roledescription", t);
      });
    }
    function f(e, t) {
      w(e).forEach(e => {
        e.setAttribute("aria-label", t);
      });
    }
    function g(e) {
      w(e).forEach(e => {
        e.setAttribute("aria-disabled", "true");
      });
    }
    function v(e) {
      w(e).forEach(e => {
        e.removeAttribute("aria-disabled");
      });
    }
    function b(t) {
      if (13 !== t.keyCode && 32 !== t.keyCode) return;
      const s = l(),
        i = e.params.pagination,
        r = t.target;
      if (!e.pagination || !e.pagination.el || r !== e.pagination.el && !e.pagination.el.contains(r) || r.matches(le(i?.bulletClass))) {
        if (e.navigation && e.navigation.prevEl && e.navigation.nextEl) {
          const t = w(e.navigation.prevEl);
          w(e.navigation.nextEl).includes(r) && (e.isEnd && !e.params.loop || e.slideNext(), e.isEnd ? o(s.lastSlideMessage) : o(s.nextSlideMessage)), t.includes(r) && (e.isBeginning && !e.params.loop || e.slidePrev(), e.isBeginning ? o(s.firstSlideMessage) : o(s.prevSlideMessage));
        }
        e.pagination && r.matches(le(i?.bulletClass)) && r.click();
      }
    }
    function E() {
      return !!(e.pagination && e.pagination.bullets && e.pagination.bullets.length);
    }
    function S() {
      const t = e.params.pagination;
      return E() && !!t?.clickable;
    }
    const x = (e, t, s) => {
        d(e), "BUTTON" !== e.tagName && (u(e, "button"), e.addEventListener("keydown", b)), f(e, s);
      },
      T = t => {
        i && i !== t.target && !i.contains(t.target) && (a = !0), e.a11y.clicked = !0;
      },
      M = () => {
        a = !1, requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            e.destroyed || (e.a11y.clicked = !1);
          });
        });
      },
      C = e => {
        n = new Date().getTime();
      };
    let P = [];
    const L = () => {
        P.forEach(e => e.removeAttribute("inert")), P = [];
      },
      A = t => {
        if ("Tab" !== t.key || !e.params.loop || e.destroyed) return;
        const s = t.target,
          i = s?.closest?.(`.${e.params.slideClass}, swiper-slide`);
        if (!i || !e.slides.includes(i)) return;
        const r = parseInt(i.getAttribute("data-swiper-slide-index") || "", 10);
        if (Number.isNaN(r)) return;
        const a = ce(e) ? e.virtual.slides.length : e.slides.length;
        (t.shiftKey ? 0 === r : r === a - 1) && (L(), e.slides.forEach(e => {
          e === i || e.hasAttribute("inert") || (e.setAttribute("inert", ""), P.push(e));
        }), setTimeout(L, 0));
      },
      I = t => {
        const s = l();
        if (e.a11y.clicked || !s.scrollOnFocus) return;
        if (new Date().getTime() - n < 100) return;
        const r = t.target.closest(`.${e.params.slideClass}, swiper-slide`);
        if (!r || !e.slides.includes(r)) return;
        i = r;
        const o = ce(e),
          d = (o ? parseInt(r.getAttribute("data-swiper-slide-index") || "0", 10) : e.slides.indexOf(r)) === e.activeIndex,
          c = e.params.watchSlidesProgress && e.visibleSlides && e.visibleSlides.includes(r);
        if (d || c) return;
        const p = t.sourceCapabilities;
        p && p.firesTouchEvents || (e.isHorizontal() ? e.el.scrollLeft = 0 : e.el.scrollTop = 0, requestAnimationFrame(() => {
          a || (e.params.loop ? e.slideToLoop(e.getSlideIndexWhenGrid(parseInt(r.getAttribute("data-swiper-slide-index") || "0", 10)), 0) : o ? e.slideTo(e.getSlideIndexWhenGrid(parseInt(r.getAttribute("data-swiper-slide-index") || "0", 10)), 0) : e.slideTo(e.getSlideIndexWhenGrid(e.slides.indexOf(r)), 0), a = !1);
        }));
      },
      z = () => {
        const t = l();
        t.itemRoleDescriptionMessage && m(e.slides, t.itemRoleDescriptionMessage), t.slideRole && u(e.slides, t.slideRole);
        const s = e.slides.length,
          i = t.slideLabelMessage;
        i && e.slides.forEach((t, r) => {
          const a = e.params.loop ? parseInt(t.getAttribute("data-swiper-slide-index") || "0", 10) : r;
          f(t, i.replace(/\{\{index\}\}/, String(a + 1)).replace(/\{\{slidesLength\}\}/, String(s)));
        });
      },
      $ = () => {
        const t = l();
        r && e.el.append(r);
        const s = e.el;
        t.containerRoleDescriptionMessage && m(s, t.containerRoleDescriptionMessage), t.containerMessage && f(s, t.containerMessage), t.containerRole && u(s, t.containerRole);
        const i = e.wrapperEl,
          a = String(t.id || i.getAttribute("id") || `swiper-wrapper-${function (e = 16) {
            return "x".repeat(e).replace(/x/g, () => Math.round(16 * Math.random()).toString(16));
          }(16)}`);
        var n;
        if (n = a, w(i).forEach(e => {
          e.setAttribute("id", n);
        }), t.wrapperLiveRegion) {
          const t = e.params.autoplay;
          !function (e, t) {
            w(e).forEach(e => {
              e.setAttribute("aria-live", t);
            });
          }(i, e.params.autoplay && t?.enabled ? "off" : "polite");
        }
        z();
        const o = e.navigation ? e.navigation : {
            nextEl: void 0,
            prevEl: void 0
          },
          d = w(o.nextEl),
          c = w(o.prevEl);
        if (d && d.forEach(e => x(e, 0, t.nextSlideMessage)), c && c.forEach(e => x(e, 0, t.prevSlideMessage)), S()) {
          w(e.pagination.el).forEach(e => {
            e.addEventListener("keydown", b);
          });
        }
        document.addEventListener("visibilitychange", C), e.el.addEventListener("focus", I, !0), e.el.addEventListener("keydown", A, !0), e.el.addEventListener("pointerdown", T, !0), e.el.addEventListener("pointerup", M, !0);
      };
    s("beforeInit", () => {
      r = p("span", l().notificationClass), r.setAttribute("aria-live", "assertive"), r.setAttribute("aria-atomic", "true");
    }), s("afterInit", () => {
      l().enabled && $();
    }), s("slidesLengthChange snapGridLengthChange slidesGridLengthChange", () => {
      l().enabled && z();
    }), s("fromEdge toEdge afterInit lock unlock", () => {
      l().enabled && function () {
        if (e.params.loop || e.params.rewind || !e.navigation) return;
        const {
          nextEl: t,
          prevEl: s
        } = e.navigation;
        s && (e.isBeginning ? (g(s), c(s)) : (v(s), d(s))), t && (e.isEnd ? (g(t), c(t)) : (v(t), d(t)));
      }();
    }), s("paginationUpdate", () => {
      l().enabled && function () {
        const t = l();
        if (!E()) return;
        const s = e.params.pagination;
        e.pagination.bullets.forEach(e => {
          s.clickable && (d(e), s.renderBullet || (u(e, "button"), f(e, t.paginationBulletMessage.replace(/\{\{index\}\}/, String((h(e) ?? 0) + 1))))), e.matches(le(s.bulletActiveClass)) ? e.setAttribute("aria-current", "true") : e.removeAttribute("aria-current");
        });
      }();
    }), s("destroy", () => {
      l().enabled && function () {
        r && r.remove();
        const t = e.navigation ? e.navigation : {
            nextEl: void 0,
            prevEl: void 0
          },
          s = w(t.nextEl),
          i = w(t.prevEl);
        s && s.forEach(e => e.removeEventListener("keydown", b)), i && i.forEach(e => e.removeEventListener("keydown", b)), S() && w(e.pagination.el).forEach(e => {
          e.removeEventListener("keydown", b);
        });
        document.removeEventListener("visibilitychange", C), e.el && "string" != typeof e.el && (e.el.removeEventListener("focus", I, !0), e.el.removeEventListener("keydown", A, !0), e.el.removeEventListener("pointerdown", T, !0), e.el.removeEventListener("pointerup", M, !0)), L();
      }();
    });
  }, ({
    swiper: e,
    extendParams: t,
    on: s
  }) => {
    t({
      history: {
        enabled: !1,
        root: "",
        replaceState: !1,
        key: "slides",
        keepQuery: !1
      }
    });
    let i = !1,
      r = {
        key: void 0,
        value: void 0
      };
    function a() {
      return e.params.history;
    }
    const n = e => e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, ""),
      l = e => {
        let t;
        t = e ? new URL(e) : window.location;
        const s = t.pathname.slice(1).split("/").filter(e => "" !== e),
          i = s.length;
        return {
          key: s[i - 2],
          value: s[i - 1]
        };
      },
      o = (t, s) => {
        const r = a();
        if (!i || !r.enabled) return;
        let l;
        l = e.params.url ? new URL(e.params.url) : window.location;
        const o = !!e.params.virtual?.enabled,
          d = e.virtual && o ? e.slidesEl.querySelector(`[data-swiper-slide-index="${s}"]`) : e.slides[s];
        if (!d) return;
        let c = n(d.getAttribute("data-history") || "");
        const p = r.root;
        if (p.length > 0) {
          c = `${"/" === p[p.length - 1] ? p.slice(0, p.length - 1) : p}/${t ? `${t}/` : ""}${c}`;
        } else l.pathname.includes(t || "") || (c = `${t ? `${t}/` : ""}${c}`);
        r.keepQuery && (c += l.search);
        const u = window.history.state;
        u && u.value === c || (r.replaceState ? window.history.replaceState({
          value: c
        }, "", c) : window.history.pushState({
          value: c
        }, "", c));
      },
      d = (t, s, i) => {
        if (s) for (let r = 0, a = e.slides.length; r < a; r += 1) {
          const a = e.slides[r];
          if (n(a.getAttribute("data-history") || "") === s) {
            const s = e.getSlideIndex(a);
            e.slideTo(s, t, i);
          }
        } else e.slideTo(0, t, i);
      },
      c = () => {
        r = l(e.params.url), d(e.params.speed, r.value, !1);
      };
    s("init", () => {
      a().enabled && (() => {
        const t = e.params.history;
        if (t) {
          if (!window.history || !window.history.pushState) {
            t.enabled = !1;
            const s = e.params.hashNavigation;
            return void (s && (s.enabled = !0));
          }
          i = !0, r = l(e.params.url), r.key || r.value ? (d(0, r.value, e.params.runCallbacksOnInit), t.replaceState || window.addEventListener("popstate", c)) : t.replaceState || window.addEventListener("popstate", c);
        }
      })();
    }), s("destroy", () => {
      a().enabled && (a().replaceState || window.removeEventListener("popstate", c));
    }), s("transitionEnd _freeModeNoMomentumRelease", () => {
      i && o(a().key, e.activeIndex);
    }), s("slideChange", () => {
      i && e.params.cssMode && o(a().key, e.activeIndex);
    });
  }, ({
    swiper: e,
    extendParams: t,
    emit: s,
    on: i
  }) => {
    let r = !1;
    function a() {
      return e.params.hashNavigation;
    }
    t({
      hashNavigation: {
        enabled: !1,
        replaceState: !1,
        watchState: !1,
        getSlideIndex(t, s) {
          if (pe(e)) {
            const t = e.slides.find(e => e.getAttribute("data-hash") === s);
            if (!t) return 0;
            return parseInt(t.getAttribute("data-swiper-slide-index") || "0", 10);
          }
          const i = d(e.slidesEl, `.${e.params.slideClass}[data-hash="${s}"], swiper-slide[data-hash="${s}"]`)[0];
          return i ? e.getSlideIndex(i) : 0;
        }
      }
    });
    const n = () => {
        s("hashChange");
        const t = document.location.hash.replace("#", ""),
          i = pe(e) ? e.slidesEl.querySelector(`[data-swiper-slide-index="${e.activeIndex}"]`) : e.slides[e.activeIndex];
        if (t !== (i ? i.getAttribute("data-hash") : "")) {
          const s = a().getSlideIndex(e, t);
          if (void 0 === s || Number.isNaN(s)) return;
          e.slideTo(s);
        }
      },
      l = () => {
        const t = a();
        if (!r || !t.enabled) return;
        const i = pe(e) ? e.slidesEl.querySelector(`[data-swiper-slide-index="${e.activeIndex}"]`) : e.slides[e.activeIndex],
          n = i ? i.getAttribute("data-hash") || i.getAttribute("data-history") : "";
        t.replaceState && window.history && window.history.replaceState ? (window.history.replaceState(null, "", `#${n}` || ""), s("hashSet")) : (document.location.hash = n || "", s("hashSet"));
      };
    i("init", () => {
      a().enabled && (() => {
        const t = a(),
          s = e.params.history;
        if (!t.enabled || s && s.enabled) return;
        r = !0;
        const i = document.location.hash.replace("#", "");
        if (i) {
          const s = 0,
            r = t.getSlideIndex(e, i);
          e.slideTo(r || 0, s, e.params.runCallbacksOnInit, !0);
        }
        t.watchState && window.addEventListener("hashchange", n);
      })();
    }), i("destroy", () => {
      a().enabled && a().watchState && window.removeEventListener("hashchange", n);
    }), i("transitionEnd _freeModeNoMomentumRelease", () => {
      r && l();
    }), i("slideChange", () => {
      r && e.params.cssMode && l();
    });
  }, ({
    swiper: e,
    extendParams: t,
    on: s,
    emit: i,
    params: r
  }) => {
    function a() {
      return e.params.autoplay;
    }
    e.autoplay = {
      running: !1,
      paused: !1,
      timeLeft: 0
    }, t({
      autoplay: {
        enabled: !1,
        delay: 3e3,
        waitForTransition: !0,
        disableOnInteraction: !1,
        stopOnLastSlide: !1,
        reverseDirection: !1,
        pauseOnMouseEnter: !1
      }
    });
    const n = "object" == typeof r.autoplay && r.autoplay && "number" == typeof r.autoplay.delay ? r.autoplay.delay : 3e3;
    let l,
      o,
      d,
      c = n,
      p = n,
      u = 0,
      m = new Date().getTime(),
      h = !1,
      f = !1,
      g = !1,
      v = !1,
      w = !1;
    function b(t) {
      if (!e || e.destroyed || !e.wrapperEl) return;
      if (t.target !== e.wrapperEl) return;
      e.wrapperEl.removeEventListener("transitionend", b);
      const s = t.detail;
      w || s && s.bySwiperTouchMove || C();
    }
    const y = () => {
        if (e.destroyed || !e.autoplay.running) return;
        e.autoplay.paused ? h = !0 : h && (p = u, h = !1);
        const t = e.autoplay.paused ? u : m + p - new Date().getTime();
        e.autoplay.timeLeft = t, i("autoplayTimeLeft", t, t / c), o = requestAnimationFrame(() => {
          y();
        });
      },
      E = () => {
        let t = a().delay;
        const s = (() => {
          let t;
          const s = !!e.params.virtual?.enabled;
          if (t = e.virtual && s ? e.slides.find(e => e.classList.contains("swiper-slide-active")) : e.slides[e.activeIndex], !t) return;
          const i = t.getAttribute("data-swiper-autoplay");
          return null != i ? parseInt(i, 10) : void 0;
        })();
        return "number" == typeof s && !Number.isNaN(s) && s > 0 && (t = s), t;
      },
      S = t => {
        if (e.destroyed || !e.autoplay.running) return 0;
        void 0 !== o && cancelAnimationFrame(o), y();
        let s = t;
        void 0 === s && (s = E(), c = s, p = s), u = s;
        const r = e.params.speed,
          n = () => {
            if (!e || e.destroyed) return;
            const t = a();
            t.reverseDirection ? !e.isBeginning || e.params.loop || e.params.rewind ? (e.slidePrev(r, !0, !0), i("autoplay")) : t.stopOnLastSlide || (e.slideTo(e.slides.length - 1, r, !0, !0), i("autoplay")) : !e.isEnd || e.params.loop || e.params.rewind ? (e.slideNext(r, !0, !0), i("autoplay")) : t.stopOnLastSlide || (e.slideTo(0, r, !0, !0), i("autoplay")), e.params.cssMode && (m = new Date().getTime(), requestAnimationFrame(() => {
              S();
            }));
          };
        return s > 0 ? (void 0 !== l && clearTimeout(l), l = setTimeout(() => {
          n();
        }, s)) : requestAnimationFrame(() => {
          n();
        }), s;
      },
      x = () => (m = new Date().getTime(), e.autoplay.running = !0, S(), i("autoplayStart"), !0),
      T = () => (e.autoplay.running = !1, void 0 !== l && clearTimeout(l), void 0 !== o && cancelAnimationFrame(o), i("autoplayStop"), !0),
      M = (t, s) => {
        if (e.destroyed || !e.autoplay.running) return;
        void 0 !== l && clearTimeout(l), t || (v = !0);
        const r = () => {
          i("autoplayPause"), a().waitForTransition ? e.wrapperEl.addEventListener("transitionend", b) : C();
        };
        if (e.autoplay.paused = !0, s) return void r();
        const n = u || a().delay;
        u = n - (new Date().getTime() - m), e.isEnd && u < 0 && !e.params.loop || (u < 0 && (u = 0), r());
      },
      C = () => {
        e.isEnd && u < 0 && !e.params.loop || e.destroyed || !e.autoplay.running || (m = new Date().getTime(), v ? (v = !1, S(u)) : S(), e.autoplay.paused = !1, i("autoplayResume"));
      },
      P = () => {
        !e.destroyed && e.autoplay.running && ("hidden" === document.visibilityState && (v = !0, M(!0)), "visible" === document.visibilityState && C());
      },
      L = t => {
        "mouse" === t.pointerType && (v = !0, w = !0, e.animating || e.autoplay.paused || M(!0));
      },
      A = t => {
        "mouse" === t.pointerType && (w = !1, e.autoplay.paused && C());
      };
    s("init", () => {
      a().enabled && (a().pauseOnMouseEnter && (e.el.addEventListener("pointerenter", L), e.el.addEventListener("pointerleave", A)), document.addEventListener("visibilitychange", P), x());
    }), s("destroy", () => {
      e.el && "string" != typeof e.el && (e.el.removeEventListener("pointerenter", L), e.el.removeEventListener("pointerleave", A)), document.removeEventListener("visibilitychange", P), e.autoplay.running && T();
    }), s("_freeModeStaticRelease", () => {
      (g || v) && C();
    }), s("_freeModeNoMomentumRelease", () => {
      a().disableOnInteraction ? T() : M(!0, !0);
    }), s("beforeTransitionStart", (t, s, i) => {
      !e.destroyed && e.autoplay.running && (i || !a().disableOnInteraction ? M(!0, !0) : T());
    }), s("sliderFirstMove", () => {
      !e.destroyed && e.autoplay.running && (a().disableOnInteraction ? T() : (f = !0, g = !1, v = !1, d = setTimeout(() => {
        v = !0, g = !0, M(!0);
      }, 200)));
    }), s("touchEnd", () => {
      if (!e.destroyed && e.autoplay.running && f) {
        if (void 0 !== d && clearTimeout(d), void 0 !== l && clearTimeout(l), a().disableOnInteraction) return g = !1, void (f = !1);
        g && e.params.cssMode && C(), g = !1, f = !1;
      }
    }), s("slideChange", () => {
      !e.destroyed && e.autoplay.running && e.autoplay.paused && (u = E(), c = E());
    }), Object.assign(e.autoplay, {
      start: x,
      stop: T,
      pause: M,
      resume: C
    });
  }, ({
    swiper: e,
    extendParams: t,
    on: s
  }) => {
    t({
      thumbs: {
        swiper: null,
        multipleActiveThumbs: !0,
        autoScrollOffset: 0,
        slideThumbActiveClass: "swiper-slide-thumb-active",
        thumbsContainerClass: "swiper-thumbs"
      }
    });
    let i = !1,
      a = !1;
    function n() {
      return e.params.thumbs;
    }
    function l() {
      const t = e.thumbs.swiper;
      if (!t || t.destroyed) return !1;
      const s = t.params.virtual;
      return !!s && !!s.enabled;
    }
    function o() {
      const t = e.thumbs.swiper;
      if (!t || t.destroyed) return;
      const s = t.clickedIndex,
        i = t.clickedSlide,
        r = n();
      if (i && i.classList.contains(r.slideThumbActiveClass)) return;
      if (null == s) return;
      let a;
      if (t.params.loop) {
        const e = t.clickedSlide?.getAttribute("data-swiper-slide-index");
        a = null == e ? s : parseInt(e, 10);
      } else a = s;
      e.params.loop ? e.slideToLoop(a) : e.slideTo(a);
    }
    function c() {
      const t = n();
      if (i) return !1;
      i = !0;
      const s = e.constructor;
      if (t.swiper instanceof s) {
        if (t.swiper.destroyed) return i = !1, !1;
        const s = t.swiper;
        e.thumbs.swiper = s, Object.assign(s.originalParams, {
          watchSlidesProgress: !0,
          slideToClickedSlide: !1
        }), Object.assign(s.params, {
          watchSlidesProgress: !0,
          slideToClickedSlide: !1
        }), s.update();
      } else if (r(t.swiper)) {
        const i = Object.assign({}, t.swiper);
        Object.assign(i, {
          watchSlidesProgress: !0,
          slideToClickedSlide: !1
        }), e.thumbs.swiper = new s(i), a = !0;
      }
      const d = e.thumbs.swiper;
      return !!d && (d.el.classList.add(t.thumbsContainerClass), d.on("tap", o), l() && d.on("virtualUpdate", () => {
        p(!1, {
          autoScroll: !1
        });
      }), !0);
    }
    function p(t, s) {
      const i = e.thumbs.swiper;
      if (!i || i.destroyed) return;
      let r = 1;
      const a = n(),
        o = a.slideThumbActiveClass,
        c = e.params.slidesPerView;
      if ("number" == typeof c && c > 1 && !e.params.centeredSlides && (r = c), a.multipleActiveThumbs || (r = 1), r = Math.floor(r), i.slides.forEach(e => e.classList.remove(o)), i.params.loop || l()) for (let t = 0; t < r; t += 1) d(i.slidesEl, `[data-swiper-slide-index="${e.realIndex + t}"]`).forEach(e => {
        e.classList.add(o);
      });else for (let t = 0; t < r; t += 1) {
        const s = i.slides[e.realIndex + t];
        s && s.classList.add(o);
      }
      (s?.autoScroll ?? 1) && function (t) {
        const s = e.thumbs.swiper;
        if (!s || s.destroyed) return;
        const i = s.params.slidesPerView,
          r = "auto" === i ? s.slidesPerViewDynamic() : i ?? 1,
          a = n().autoScrollOffset,
          l = a && !s.params.loop;
        if (e.realIndex !== s.realIndex || l) {
          const i = s.activeIndex;
          let n, o;
          if (s.params.loop) {
            const t = s.slides.find(t => t.getAttribute("data-swiper-slide-index") === `${e.realIndex}`);
            n = t ? s.slides.indexOf(t) : -1, o = e.activeIndex > e.previousIndex ? "next" : "prev";
          } else n = e.realIndex, o = n > e.previousIndex ? "next" : "prev";
          l && (n += "next" === o ? a : -1 * a), s.visibleSlidesIndexes && s.visibleSlidesIndexes.indexOf(n) < 0 && (s.params.centeredSlides ? n = n > i ? n - Math.floor(r / 2) + 1 : n + Math.floor(r / 2) - 1 : n > i && s.params.slidesPerGroup, s.slideTo(n, t));
        }
      }(t ? 0 : void 0);
    }
    e.thumbs = {
      swiper: null
    }, s("beforeInit", () => {
      const t = e.params.thumbs;
      if (t && t.swiper) if ("string" == typeof t.swiper || t.swiper instanceof HTMLElement) {
        const s = () => {
            const s = "string" == typeof t.swiper ? document.querySelector(t.swiper) : t.swiper;
            if (s && s.swiper) t.swiper = s.swiper, c(), p(!0);else if (s) {
              const i = `${e.params.eventsPrefix}init`,
                r = a => {
                  const n = a.detail;
                  t.swiper = n[0], s.removeEventListener(i, r), c(), p(!0), t.swiper.update(), e.update();
                };
              s.addEventListener(i, r);
            }
            return s;
          },
          i = () => {
            if (e.destroyed) return;
            s() || requestAnimationFrame(i);
          };
        requestAnimationFrame(i);
      } else c(), p(!0);
    }), s("slideChange update resize observerUpdate", () => {
      p();
    }), s("setTransition", (t, s) => {
      const i = e.thumbs.swiper;
      i && !i.destroyed && i.setTransition(s);
    }), s("beforeDestroy", () => {
      const t = e.thumbs.swiper;
      t && !t.destroyed && a && t.destroy();
    }), Object.assign(e.thumbs, {
      init: c,
      update: p
    });
  }, ({
    swiper: e,
    extendParams: t,
    emit: i,
    once: r
  }) => {
    t({
      freeMode: {
        enabled: !1,
        momentum: !0,
        momentumRatio: 1,
        momentumBounce: !0,
        momentumBounceRatio: 1,
        momentumVelocityRatio: 1,
        sticky: !1,
        minimumVelocity: .02
      }
    }), e.freeMode = {
      onTouchStart: function () {
        if (e.params.cssMode) return;
        const t = e.getTranslate();
        e.setTranslate(t), e.setTransition(0), e.touchEventsData.velocities.length = 0, e.freeMode.onTouchEnd({
          currentPos: e.rtl ? e.translate : -e.translate
        });
      },
      onTouchMove: function () {
        if (e.params.cssMode) return;
        const {
          touchEventsData: t,
          touches: i
        } = e;
        0 === t.velocities.length && t.velocities.push({
          position: i[e.isHorizontal() ? "startX" : "startY"],
          time: t.touchStartTime ?? s()
        }), t.velocities.push({
          position: i[e.isHorizontal() ? "currentX" : "currentY"],
          time: s()
        });
      },
      onTouchEnd: function ({
        currentPos: t
      }) {
        if (e.params.cssMode) return;
        const {
            wrapperEl: a,
            rtlTranslate: n,
            snapGrid: l,
            touchEventsData: o
          } = e,
          d = e.params,
          c = e.params.freeMode,
          p = s(),
          u = p - (o.touchStartTime ?? p);
        if (t < -e.minTranslate()) e.slideTo(e.activeIndex);else if (t > -e.maxTranslate()) e.slides.length < l.length ? e.slideTo(l.length - 1) : e.slideTo(e.slides.length - 1);else {
          if (c.momentum) {
            if (o.velocities.length > 1) {
              const t = o.velocities.pop(),
                i = o.velocities.pop(),
                r = t.position - i.position,
                a = t.time - i.time;
              e.velocity = r / a, e.velocity /= 2, Math.abs(e.velocity) < c.minimumVelocity && (e.velocity = 0), (a > 150 || s() - t.time > 300) && (e.velocity = 0);
            } else e.velocity = 0;
            e.velocity *= c.momentumVelocityRatio, o.velocities.length = 0;
            let t = 1e3 * c.momentumRatio;
            const p = e.velocity * t;
            let u = e.translate + p;
            n && (u = -u);
            let m,
              h = !1;
            const f = 20 * Math.abs(e.velocity) * c.momentumBounceRatio;
            let v = !1;
            if (u < e.maxTranslate()) c.momentumBounce ? (u + e.maxTranslate() < -f && (u = e.maxTranslate() - f), m = e.maxTranslate(), h = !0, o.allowMomentumBounce = !0) : u = e.maxTranslate(), d.loop && d.centeredSlides && (v = !0);else if (u > e.minTranslate()) c.momentumBounce ? (u - e.minTranslate() > f && (u = e.minTranslate() + f), m = e.minTranslate(), h = !0, o.allowMomentumBounce = !0) : u = e.minTranslate(), d.loop && d.centeredSlides && (v = !0);else if (c.sticky) {
              let t = 0;
              for (let e = 0; e < l.length; e += 1) if (l[e] > -u) {
                t = e;
                break;
              }
              u = Math.abs(l[t] - u) < Math.abs((l[t - 1] ?? l[t]) - u) || "next" === e.swipeDirection ? l[t] : l[t - 1], u = -u;
            }
            if (v && r("transitionEnd", () => {
              e.loopFix();
            }), 0 !== e.velocity) {
              if (t = n ? Math.abs((-u - e.translate) / e.velocity) : Math.abs((u - e.translate) / e.velocity), c.sticky) {
                const s = Math.abs((n ? -u : u) - e.translate),
                  i = e.slidesSizesGrid[e.activeIndex],
                  r = d.speed;
                t = s < i ? r : s < 2 * i ? 1.5 * r : 2.5 * r;
              }
            } else if (c.sticky) return void e.slideToClosest();
            c.momentumBounce && h && void 0 !== m ? (e.updateProgress(m), e.setTransition(t), e.setTranslate(u), e.transitionStart(!0, e.swipeDirection), e.animating = !0, g(a, () => {
              e && !e.destroyed && o.allowMomentumBounce && (i("momentumBounce"), e.setTransition(d.speed), setTimeout(() => {
                e.setTranslate(m), g(a, () => {
                  e && !e.destroyed && e.transitionEnd();
                });
              }, 0));
            })) : e.velocity ? (i("_freeModeNoMomentumRelease"), e.updateProgress(u), e.setTransition(t), e.setTranslate(u), e.transitionStart(!0, e.swipeDirection), e.animating || (e.animating = !0, g(a, () => {
              e && !e.destroyed && e.transitionEnd();
            }))) : e.updateProgress(u), e.updateActiveIndex(), e.updateSlidesClasses();
          } else {
            if (c.sticky) return void e.slideToClosest();
            i("_freeModeNoMomentumRelease");
          }
          (!c.momentum || u >= d.longSwipesMs) && (i("_freeModeStaticRelease"), e.updateProgress(), e.updateActiveIndex(), e.updateSlidesClasses());
        }
      }
    };
  }, ({
    swiper: e,
    extendParams: t,
    on: s
  }) => {
    function i() {
      return e.params.grid;
    }
    let r, a, n, l;
    t({
      grid: {
        rows: 1,
        fill: "column"
      }
    });
    const o = () => {
        let t = e.params.spaceBetween ?? 0;
        return "string" == typeof t && t.indexOf("%") >= 0 ? t = parseFloat(t.replace("%", "")) / 100 * e.size : "string" == typeof t && (t = parseFloat(t)), t;
      },
      d = () => {
        const t = e.params.virtual;
        return !!e.virtual && "object" == typeof t && null !== t && !!t.enabled;
      };
    s("init", () => {
      const t = e.params.grid;
      l = !!(t && (t.rows ?? 1) > 1);
    }), s("update", () => {
      const {
          params: t,
          el: s
        } = e,
        i = t.grid,
        r = !!(i && (i.rows ?? 1) > 1);
      l && !r ? (s.classList.remove(`${t.containerModifierClass}grid`, `${t.containerModifierClass}grid-column`), n = 1, e.emitContainerClasses()) : !l && r && (s.classList.add(`${t.containerModifierClass}grid`), "column" === i.fill && s.classList.add(`${t.containerModifierClass}grid-column`), e.emitContainerClasses()), l = r;
    }), e.grid = {
      initSlides: t => {
        const {
            slidesPerView: s
          } = e.params,
          {
            rows: l,
            fill: o
          } = i(),
          c = d() ? e.virtual.slides.length : t.length;
        n = Math.floor(c / l), r = Math.floor(c / l) === c / l ? c : Math.ceil(c / l) * l, "auto" !== s && "row" === o && (r = Math.max(r, Math.floor(s ?? 1) * l)), a = r / l;
      },
      unsetSlides: () => {
        e.slides && e.slides.forEach(t => {
          t.swiperSlideGridSet && (t.style.height = "", t.style.setProperty(e.getDirectionLabel("margin-top"), ""));
        });
      },
      updateSlide: (t, s, l) => {
        const {
            slidesPerGroup: c
          } = e.params,
          p = o(),
          {
            rows: u,
            fill: m
          } = i(),
          h = d() ? e.virtual.slides.length : l.length;
        let f, g, v;
        if ("row" === m && (c ?? 1) > 1) {
          const e = c ?? 1,
            i = Math.floor(t / (e * u)),
            a = t - u * e * i,
            n = 0 === i ? e : Math.min(Math.ceil((h - i * u * e) / u), e);
          v = Math.floor(a / n), g = a - v * n + i * e, f = g + v * r / u, s.style.order = String(f);
        } else "column" === m ? (g = Math.floor(t / u), v = t - g * u, (g > n || g === n && v === u - 1) && (v += 1, v >= u && (v = 0, g += 1))) : (v = Math.floor(t / a), g = t - v * a);
        const w = s;
        w.row = v, w.column = g, s.style.height = `calc((100% - ${(u - 1) * p}px) / ${u})`, s.style.setProperty(e.getDirectionLabel("margin-top"), 0 !== v && p ? `${p}px` : ""), w.swiperSlideGridSet = !0;
      },
      updateWrapperSize: (t, s) => {
        const {
            centeredSlides: a,
            roundLengths: n
          } = e.params,
          l = o(),
          {
            rows: d
          } = i();
        if (e.virtualSize = (t + l) * r, e.virtualSize = Math.ceil(e.virtualSize / d) - l, e.params.cssMode || e.wrapperEl.style.setProperty(e.getDirectionLabel("width"), `${e.virtualSize + l}px`), a) {
          const t = [];
          for (let i = 0; i < s.length; i += 1) {
            let r = s[i];
            n && (r = Math.floor(r)), s[i] < e.virtualSize + s[0] && t.push(r);
          }
          s.splice(0, s.length), s.push(...t);
        }
      }
    };
  }, ({
    swiper: e
  }) => {
    Object.assign(e, {
      appendSlide: me.bind(e),
      prependSlide: he.bind(e),
      addSlide: ue.bind(e),
      removeSlide: ge.bind(e),
      removeAllSlides: fe.bind(e)
    });
  }, ({
    swiper: e,
    extendParams: t,
    on: s
  }) => {
    t({
      fadeEffect: {
        crossFade: !1,
        mode: "default"
      }
    });
    let i = 0;
    function r() {
      return e.params.fadeEffect;
    }
    function a() {
      const e = r();
      return "default" === e.mode && e.crossFade ? "cross-fade" : e.mode;
    }
    ve({
      effect: "fade",
      swiper: e,
      on: s,
      setTranslate: () => {
        const {
            slides: t
          } = e,
          s = (r(), a()),
          n = "out-in" === s && i > 0,
          l = i;
        i = 0;
        const o = [],
          d = [];
        let c = !1;
        for (let i = 0; i < t.length; i += 1) {
          const r = t[i];
          let a = -(r.swiperSlideOffset ?? 0);
          e.params.virtualTranslate || (a -= e.translate);
          let l = 0;
          e.isHorizontal() || (l = a, a = 0);
          const p = r.progress ?? 0;
          let u;
          u = "cross-fade" === s ? Math.max(1 - Math.abs(p), 0) : "out-in" === s ? Math.max(1 - 2 * Math.abs(p), 0) : 1 + Math.min(Math.max(p, -1), 0);
          const m = we(0, r);
          if (n) {
            const e = parseFloat(m.style.opacity);
            0 === u && e > 0 && (c = !0), u > 0 && d.push(m), o.push(m);
          }
          m.style.opacity = String(u), m.style.transform = `translate3d(${a}px, ${l}px, 0px)`;
        }
        n && (o.forEach(e => {
          const t = c && d.includes(e);
          e.style.transitionDuration = l / 2 + "ms", e.style.transitionDelay = t ? l / 2 + "ms" : "0ms";
        }), be({
          swiper: e,
          duration: l,
          transformElements: d,
          allSlides: !0
        }));
      },
      setTransition: t => {
        const s = a(),
          r = e.slides.map(e => o(e));
        r.forEach(e => {
          e.style.transitionDuration = `${t}ms`, "out-in" === s && 0 === t && (e.style.transitionDelay = "");
        }), "out-in" === s && t > 0 && !e.params.cssMode ? i = t : be({
          swiper: e,
          duration: t,
          transformElements: r,
          allSlides: !0
        });
      },
      overwriteParams: () => ({
        slidesPerView: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: !0,
        spaceBetween: 0,
        virtualTranslate: !e.params.cssMode
      })
    });
  }, ({
    swiper: e,
    extendParams: t,
    on: s
  }) => {
    t({
      cubeEffect: {
        slideShadows: !0,
        shadow: !0,
        shadowOffset: 20,
        shadowScale: .94
      }
    });
    const i = (e, t, s) => {
      let i = s ? e.querySelector(".swiper-slide-shadow-left") : e.querySelector(".swiper-slide-shadow-top"),
        r = s ? e.querySelector(".swiper-slide-shadow-right") : e.querySelector(".swiper-slide-shadow-bottom");
      i || (i = p("div", ("swiper-slide-shadow-cube swiper-slide-shadow-" + (s ? "left" : "top")).split(" ")), e.append(i)), r || (r = p("div", ("swiper-slide-shadow-cube swiper-slide-shadow-" + (s ? "right" : "bottom")).split(" ")), e.append(r)), i && (i.style.opacity = String(Math.max(-t, 0))), r && (r.style.opacity = String(Math.max(t, 0)));
    };
    ve({
      effect: "cube",
      swiper: e,
      on: s,
      setTranslate: () => {
        const {
            el: t,
            wrapperEl: s,
            slides: r,
            width: a,
            height: n,
            rtlTranslate: l,
            size: o
          } = e,
          d = b(e),
          c = e.params.cubeEffect,
          u = e.isHorizontal(),
          m = !(!e.virtual || !e.params.virtual?.enabled);
        let h = 0,
          f = null;
        c.shadow && (u ? (f = e.wrapperEl.querySelector(".swiper-cube-shadow"), f || (f = p("div", "swiper-cube-shadow"), e.wrapperEl.append(f)), f.style.height = `${a}px`) : (f = t.querySelector(".swiper-cube-shadow"), f || (f = p("div", "swiper-cube-shadow"), t.append(f))));
        for (let e = 0; e < r.length; e += 1) {
          const t = r[e];
          let s = e;
          m && (s = parseInt(t.getAttribute("data-swiper-slide-index") ?? "0", 10));
          let a = 90 * s,
            n = Math.floor(a / 360);
          l && (a = -a, n = Math.floor(-a / 360));
          const p = Math.max(Math.min(t.progress ?? 0, 1), -1);
          let f = 0,
            g = 0,
            v = 0;
          s % 4 == 0 ? (f = 4 * -n * o, v = 0) : (s - 1) % 4 == 0 ? (f = 0, v = 4 * -n * o) : (s - 2) % 4 == 0 ? (f = o + 4 * n * o, v = o) : (s - 3) % 4 == 0 && (f = -o, v = 3 * o + 4 * o * n), l && (f = -f), u || (g = f, f = 0);
          const w = `rotateX(${d(u ? 0 : -a)}deg) rotateY(${d(u ? a : 0)}deg) translate3d(${f}px, ${g}px, ${v}px)`;
          p <= 1 && p > -1 && (h = 90 * s + 90 * p, l && (h = 90 * -s - 90 * p)), t.style.transform = w, c.slideShadows && i(t, p, u);
        }
        if (s.style.transformOrigin = `50% 50% -${o / 2}px`, s.style.setProperty("-webkit-transform-origin", `50% 50% -${o / 2}px`), c.shadow && f) if (u) f.style.transform = `translate3d(0px, ${a / 2 + c.shadowOffset}px, ${-a / 2}px) rotateX(89.99deg) rotateZ(0deg) scale(${c.shadowScale})`;else {
          const e = Math.abs(h) - 90 * Math.floor(Math.abs(h) / 90),
            t = 1.5 - (Math.sin(2 * e * Math.PI / 360) / 2 + Math.cos(2 * e * Math.PI / 360) / 2),
            s = c.shadowScale,
            i = c.shadowScale / t,
            r = c.shadowOffset;
          f.style.transform = `scale3d(${s}, 1, ${i}) translate3d(0px, ${n / 2 + r}px, ${-n / 2 / i}px) rotateX(-89.99deg)`;
        }
        s.style.transform = `translate3d(0px,0,0px) rotateX(${d(e.isHorizontal() ? 0 : h)}deg) rotateY(${d(e.isHorizontal() ? -h : 0)}deg)`, s.style.setProperty("--swiper-cube-translate-z", "0px");
      },
      setTransition: t => {
        const {
          el: s,
          slides: i
        } = e;
        if (i.forEach(e => {
          e.style.transitionDuration = `${t}ms`, e.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach(e => {
            e.style.transitionDuration = `${t}ms`;
          });
        }), e.params.cubeEffect?.shadow && !e.isHorizontal()) {
          const e = s.querySelector(".swiper-cube-shadow");
          e && (e.style.transitionDuration = `${t}ms`);
        }
      },
      recreateShadows: () => {
        const t = e.isHorizontal();
        e.slides.forEach(e => {
          const s = Math.max(Math.min(e.progress ?? 0, 1), -1);
          i(e, s, t);
        });
      },
      getEffectParams: () => e.params.cubeEffect,
      perspective: () => !0,
      overwriteParams: () => ({
        slidesPerView: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: !0,
        resistanceRatio: 0,
        spaceBetween: 0,
        centeredSlides: !1,
        virtualTranslate: !0
      })
    });
  }, ({
    swiper: e,
    extendParams: t,
    on: s
  }) => {
    function i() {
      return e.params.flipEffect;
    }
    t({
      flipEffect: {
        slideShadows: !0,
        limitRotation: !0
      }
    });
    const r = (t, s) => {
      let i = e.isHorizontal() ? t.querySelector(".swiper-slide-shadow-left") : t.querySelector(".swiper-slide-shadow-top"),
        r = e.isHorizontal() ? t.querySelector(".swiper-slide-shadow-right") : t.querySelector(".swiper-slide-shadow-bottom");
      i || (i = ye("flip", t, e.isHorizontal() ? "left" : "top")), r || (r = ye("flip", t, e.isHorizontal() ? "right" : "bottom")), i && (i.style.opacity = String(Math.max(-s, 0))), r && (r.style.opacity = String(Math.max(s, 0)));
    };
    ve({
      effect: "flip",
      swiper: e,
      on: s,
      setTranslate: () => {
        const {
            slides: t,
            rtlTranslate: s
          } = e,
          a = i(),
          n = b(e);
        for (let i = 0; i < t.length; i += 1) {
          const l = t[i];
          let o = l.progress ?? 0;
          a.limitRotation && (o = Math.max(Math.min(o, 1), -1));
          const d = l.swiperSlideOffset ?? 0;
          let c = -180 * o,
            p = 0,
            u = e.params.cssMode ? -d - e.translate : -d,
            m = 0;
          e.isHorizontal() ? s && (c = -c) : (m = u, u = 0, p = -c, c = 0), l.style.zIndex = String(-Math.abs(Math.round(o)) + t.length), a.slideShadows && r(l, o);
          const h = `translate3d(${u}px, ${m}px, 0px) rotateX(${n(p)}deg) rotateY(${n(c)}deg)`;
          we(0, l).style.transform = h;
        }
      },
      setTransition: t => {
        const s = e.slides.map(e => o(e));
        s.forEach(e => {
          e.style.transitionDuration = `${t}ms`, e.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach(e => {
            e.style.transitionDuration = `${t}ms`;
          });
        }), be({
          swiper: e,
          duration: t,
          transformElements: s
        });
      },
      recreateShadows: () => {
        const t = i();
        e.slides.forEach(e => {
          let s = e.progress ?? 0;
          t.limitRotation && (s = Math.max(Math.min(s, 1), -1)), r(e, s);
        });
      },
      getEffectParams: () => e.params.flipEffect,
      perspective: () => !0,
      overwriteParams: () => ({
        slidesPerView: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: !0,
        spaceBetween: 0,
        virtualTranslate: !e.params.cssMode
      })
    });
  }, ({
    swiper: e,
    extendParams: t,
    on: s
  }) => {
    t({
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        scale: 1,
        modifier: 1,
        slideShadows: !0
      }
    });
    ve({
      effect: "coverflow",
      swiper: e,
      on: s,
      setTranslate: () => {
        const {
            width: t,
            height: s,
            slides: i,
            slidesSizesGrid: r
          } = e,
          a = e.params.coverflowEffect,
          n = e.isHorizontal(),
          l = e.translate,
          o = n ? t / 2 - l : s / 2 - l,
          d = n ? a.rotate : -a.rotate,
          c = a.depth,
          p = b(e);
        for (let e = 0, t = i.length; e < t; e += 1) {
          const t = i[e],
            s = r[e],
            l = (o - (t.swiperSlideOffset ?? 0) - s / 2) / s,
            u = "function" == typeof a.modifier ? a.modifier(l) : l * a.modifier;
          let m = n ? d * u : 0,
            h = n ? 0 : d * u,
            f = -c * Math.abs(u),
            g = "string" == typeof a.stretch && -1 !== a.stretch.indexOf("%") ? parseFloat(a.stretch) / 100 * s : a.stretch,
            v = n ? 0 : g * u,
            w = n ? g * u : 0,
            b = 1 - (1 - a.scale) * Math.abs(u);
          Math.abs(w) < .001 && (w = 0), Math.abs(v) < .001 && (v = 0), Math.abs(f) < .001 && (f = 0), Math.abs(m) < .001 && (m = 0), Math.abs(h) < .001 && (h = 0), Math.abs(b) < .001 && (b = 0);
          const y = `translate3d(${w}px,${v}px,${f}px)  rotateX(${p(h)}deg) rotateY(${p(m)}deg) scale(${b})`;
          if (we(0, t).style.transform = y, t.style.zIndex = String(1 - Math.abs(Math.round(u))), a.slideShadows) {
            let e = n ? t.querySelector(".swiper-slide-shadow-left") : t.querySelector(".swiper-slide-shadow-top"),
              s = n ? t.querySelector(".swiper-slide-shadow-right") : t.querySelector(".swiper-slide-shadow-bottom");
            e || (e = ye("coverflow", t, n ? "left" : "top")), s || (s = ye("coverflow", t, n ? "right" : "bottom")), e && (e.style.opacity = String(u > 0 ? u : 0)), s && (s.style.opacity = String(-u > 0 ? -u : 0));
          }
        }
      },
      setTransition: t => {
        e.slides.map(e => o(e)).forEach(e => {
          e.style.transitionDuration = `${t}ms`, e.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach(e => {
            e.style.transitionDuration = `${t}ms`;
          });
        });
      },
      perspective: () => !0,
      overwriteParams: () => ({
        watchSlidesProgress: !0
      })
    });
  }, ({
    swiper: e,
    extendParams: t,
    on: s
  }) => {
    function i() {
      return e.params.creativeEffect;
    }
    t({
      creativeEffect: {
        limitProgress: 1,
        shadowPerProgress: !1,
        progressMultiplier: 1,
        perspective: !0,
        prev: {
          translate: [0, 0, 0],
          rotate: [0, 0, 0],
          opacity: 1,
          scale: 1
        },
        next: {
          translate: [0, 0, 0],
          rotate: [0, 0, 0],
          opacity: 1,
          scale: 1
        }
      }
    });
    const r = e => "string" == typeof e ? e : `${e}px`;
    ve({
      effect: "creative",
      swiper: e,
      on: s,
      setTranslate: () => {
        const {
            slides: t,
            wrapperEl: s,
            slidesSizesGrid: a
          } = e,
          n = i(),
          {
            progressMultiplier: l
          } = n,
          o = e.params.centeredSlides,
          d = b(e);
        if (o) {
          const t = a[0] / 2 - (e.params.slidesOffsetBefore ?? 0);
          s.style.transform = `translateX(calc(50% - ${t}px))`;
        }
        for (let s = 0; s < t.length; s += 1) {
          const i = t[s],
            a = i.progress ?? 0,
            c = Math.min(Math.max(a, -n.limitProgress), n.limitProgress);
          let p = c;
          o || (p = Math.min(Math.max(i.originalProgress ?? 0, -n.limitProgress), n.limitProgress));
          const u = i.swiperSlideOffset ?? 0,
            m = [e.params.cssMode ? -u - e.translate : -u, 0, 0],
            h = [0, 0, 0];
          let f = !1;
          e.isHorizontal() || (m[1] = m[0], m[0] = 0);
          let g = {
            translate: [0, 0, 0],
            rotate: [0, 0, 0],
            scale: 1,
            opacity: 1
          };
          c < 0 ? (g = n.next, f = !0) : c > 0 && (g = n.prev, f = !0), m.forEach((e, t) => {
            m[t] = `calc(${e}px + (${r(g.translate[t])} * ${Math.abs(c * l)}))`;
          }), h.forEach((e, t) => {
            h[t] = g.rotate[t] * Math.abs(c * l);
          }), i.style.zIndex = String(-Math.abs(Math.round(a)) + t.length);
          const v = m.join(", "),
            w = `rotateX(${d(h[0])}deg) rotateY(${d(h[1])}deg) rotateZ(${d(h[2])}deg)`,
            b = p < 0 ? `scale(${1 + (1 - g.scale) * p * l})` : `scale(${1 - (1 - g.scale) * p * l})`,
            y = p < 0 ? 1 + (1 - g.opacity) * p * l : 1 - (1 - g.opacity) * p * l,
            E = `translate3d(${v}) ${w} ${b}`;
          if (f && g.shadow || !f) {
            let e = i.querySelector(".swiper-slide-shadow");
            if (!e && g.shadow && (e = ye("creative", i)), e) {
              const t = n.shadowPerProgress ? c * (1 / n.limitProgress) : c;
              e.style.opacity = String(Math.min(Math.max(Math.abs(t), 0), 1));
            }
          }
          const S = we(0, i);
          S.style.transform = E, S.style.opacity = String(y), g.origin && (S.style.transformOrigin = g.origin);
        }
      },
      setTransition: t => {
        const s = e.slides.map(e => o(e));
        s.forEach(e => {
          e.style.transitionDuration = `${t}ms`, e.querySelectorAll(".swiper-slide-shadow").forEach(e => {
            e.style.transitionDuration = `${t}ms`;
          });
        }), be({
          swiper: e,
          duration: t,
          transformElements: s,
          allSlides: !0
        });
      },
      perspective: () => i().perspective,
      overwriteParams: () => ({
        watchSlidesProgress: !0,
        virtualTranslate: !e.params.cssMode
      })
    });
  }, ({
    swiper: e,
    extendParams: t,
    on: s
  }) => {
    function i() {
      return e.params.cardsEffect;
    }
    t({
      cardsEffect: {
        slideShadows: !0,
        rotate: !0,
        perSlideRotate: 2,
        perSlideOffset: 8
      }
    });
    ve({
      effect: "cards",
      swiper: e,
      on: s,
      setTranslate: () => {
        const {
            slides: t,
            activeIndex: s,
            rtlTranslate: r
          } = e,
          a = i(),
          {
            startTranslate: n,
            isTouched: l
          } = e.touchEventsData,
          o = r ? -e.translate : e.translate;
        for (let i = 0; i < t.length; i += 1) {
          const d = t[i],
            c = d.progress ?? 0,
            p = Math.min(Math.max(c, -4), 4);
          let u = d.swiperSlideOffset ?? 0;
          e.params.centeredSlides && !e.params.cssMode && (e.wrapperEl.style.transform = `translateX(${e.minTranslate()}px)`), e.params.centeredSlides && e.params.cssMode && (u -= t[0].swiperSlideOffset ?? 0);
          let m = e.params.cssMode ? -u - e.translate : -u,
            h = 0;
          const f = -100 * Math.abs(p);
          let g = 1,
            v = -a.perSlideRotate * p,
            w = a.perSlideOffset - .75 * Math.abs(p);
          const b = e.virtual && e.params.virtual?.enabled ? e.virtual.from + i : i,
            y = (b === s || b === s - 1) && p > 0 && p < 1 && (l || e.params.cssMode) && (o ?? 0) < (n ?? 0),
            E = (b === s || b === s + 1) && p < 0 && p > -1 && (l || e.params.cssMode) && (o ?? 0) > (n ?? 0);
          if (y || E) {
            const t = (1 - Math.abs((Math.abs(p) - .5) / .5)) ** .5;
            v += -28 * p * t, g += -.5 * t, w += 96 * t, h = (a.rotate || e.isHorizontal() ? -25 : 0) * t * Math.abs(p) + "%";
          }
          if (m = p < 0 ? `calc(${m}px ${r ? "-" : "+"} (${w * Math.abs(p)}%))` : p > 0 ? `calc(${m}px ${r ? "-" : "+"} (${-w * Math.abs(p)}%))` : `${m}px`, !e.isHorizontal()) {
            const e = h;
            h = m, m = e;
          }
          const S = p < 0 ? "" + (1 + (1 - g) * p) : "" + (1 - (1 - g) * p),
            x = `\n        translate3d(${m}, ${h}, ${f}px)\n        rotateZ(${a.rotate ? r ? -v : v : 0}deg)\n        scale(${S})\n      `;
          if (a.slideShadows) {
            let e = d.querySelector(".swiper-slide-shadow");
            e || (e = ye("cards", d)), e && (e.style.opacity = String(Math.min(Math.max((Math.abs(p) - .5) / .5, 0), 1)));
          }
          d.style.zIndex = String(-Math.abs(Math.round(c)) + t.length);
          we(0, d).style.transform = x;
        }
      },
      setTransition: t => {
        const s = e.slides.map(e => o(e));
        s.forEach(e => {
          e.style.transitionDuration = `${t}ms`, e.querySelectorAll(".swiper-slide-shadow").forEach(e => {
            e.style.transitionDuration = `${t}ms`;
          });
        }), be({
          swiper: e,
          duration: t,
          transformElements: s
        });
      },
      perspective: () => !0,
      overwriteParams: () => ({
        _loopSwapReset: !1,
        watchSlidesProgress: !0,
        loopAdditionalSlides: i().rotate ? 3 : 2,
        centeredSlides: !0,
        virtualTranslate: !e.params.cssMode
      })
    });
  }];
  return se.use(Ee), se;
}();
/*(function() {
  window.cookieconsent.initialise({
    "palette": {
      "popup": {
        "background": "#ffffff",
        "text": "#020406"
      },
      "button": {
        "background": "#1870b7",
        "text": "#ffffff"
      }
    },
    "position": "bottom-right",
    "content": {
      "message": "Этот сайт использует файлы cookie в соответствии с <a href='https://www.cookiesandyou.com/'>Политикой использования файлов cookie</a>. Если Вы согласны на использование нами файлов cookie, то нажмите кнопку «Принять».",
      "dismiss": "Принять!",
      "link": "Подробнее"
    }
  });
})();
*/
(function () {
  //const agreementElems = document.querySelectorAll('.contacts__agreement');
  const agreementElems = document.querySelectorAll('[class$="__agreement"]');
  for (let i = 0; i < agreementElems.length; i++) {
    let agreementElem = agreementElems[i];
    //const submitBtn = agreementElem.querySelector('.contacts__submit');
    const submitBtn = agreementElem.querySelector('button[type=submit]');
    const agreementCheckbox = agreementElem.querySelector('input[name=agreement]');
    if (agreementCheckbox) {
      agreementCheckbox.addEventListener('change', function (e) {
        if (!e.target.checked) {
          submitBtn.disabled = true;
        } else {
          submitBtn.disabled = false;
        }
      });
    }
  }
})();

document.addEventListener('DOMContentLoaded', function () {
  objectFitImages();
});
document.addEventListener('DOMContentLoaded', function () {
  var links = document.querySelectorAll('[href^="#"][data-scroll-link]');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function (e) {
      var hash = this.href.replace(/[^#]*(.*)/, '$1');
      if (hash && hash !== '#') {
        e.preventDefault();
        var scroll = window.pageYOffset;
        var targetTop = getOffsetRect(document.querySelector(hash)).top - 10; // С поправкой в 10px
        var scrollDiff = (scroll - targetTop) * -1;
        animate({
          duration: 500,
          timing: function (timeFraction) {
            return Math.pow(timeFraction, 4); // https://learn.javascript.ru/js-animation
          },
          draw: function (progress) {
            var scrollNow = scroll + progress * scrollDiff;
            window.scrollTo(0, scrollNow);
          }
        });
      }
    }, false);
  }
  function animate(_ref) {
    var timing = _ref.timing,
      draw = _ref.draw,
      duration = _ref.duration;
    var start = performance.now();
    requestAnimationFrame(function animate(time) {
      var timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;
      var progress = timing(timeFraction);
      draw(progress);
      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
    });
  }
  function getOffsetRect(elem) {
    var box = elem.getBoundingClientRect();
    var body = document.body;
    var docElem = document.documentElement;
    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
    var clientTop = docElem.clientTop || body.clientTop || 0;
    var clientLeft = docElem.clientLeft || body.clientLeft || 0;
    var top = box.top + scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;
    return {
      top: Math.round(top),
      left: Math.round(left)
    };
  }
});
svg4everybody();
document.querySelectorAll('[data-lang-switcher]').forEach(el => {
  const toggle = el.querySelector('.lang-switcher__toggle');
  const setOpen = open => {
    el.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open);
  };
  toggle.addEventListener('click', () => setOpen(!el.classList.contains('is-open')));
  document.addEventListener('click', e => {
    if (!el.contains(e.target)) setOpen(false);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && el.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });
});
/*(function(){
  const utils = window.fizzyUIUtils;
  //console.log(utils);
  const container = document.querySelector('.hero');
  if (!container) { return; }
  const elem = container.querySelector('.hero__carousel');
  const flkty = new Flickity( elem, {
    // options
    prevNextButtons: false,
    pageDots: false,
    dragThreshold: 30,
    //autoPlay: 1500,
    //wrapAround: true //бесконечная прокрутка
  });

  // elements
  const cellsButtonGroup = container.querySelector('.slider-nav__pagination');
  let cellsButtons = utils.makeArray( cellsButtonGroup.children );

  // update buttons on select
  flkty.on( 'select', function() {
    const previousSelectedButton = cellsButtonGroup.querySelector('.is-selected');
    let selectedButton = cellsButtonGroup.children[ flkty.selectedIndex ];
    previousSelectedButton.classList.remove('is-selected');
    selectedButton.classList.add('is-selected');
  });

  // cell select
  //matchesSelector() заменил на matches()
  cellsButtonGroup.addEventListener( 'click', function( event ) {
    if ( !(event.target).matches( '.button' ) ) {
      return;
    }
    let index = cellsButtons.indexOf( event.target );
    flkty.select( index );
  });
  // previous
  const previousButton = container.querySelector('.slider-nav__btn--prev');
  previousButton.addEventListener( 'click', function() {
    flkty.previous();
  });
  // next
  const nextButton = container.querySelector('.slider-nav__btn--next');
  nextButton.addEventListener( 'click', function() {
    flkty.next();
  });

}());*/

(function () {
  const container = document.querySelector('.hero');
  if (!container) {
    return;
  }
  const elem = container.querySelector('.hero__carousel');

  // Инициализация Swiper
  const swiper = new Swiper(elem, {
    threshold: 30,
    // Аналог dragThreshold: 30
    // Встроенная обработка стрелок (заменяет ручные addEventListener для prev/next)
    navigation: {
      nextEl: container.querySelector('.slider-nav__btn--next'),
      prevEl: container.querySelector('.slider-nav__btn--prev')
    }
  });

  // Элементы кастомной пагинации
  const cellsButtonGroup = container.querySelector('.slider-nav__pagination');
  if (cellsButtonGroup) {
    const cellsButtons = Array.from(cellsButtonGroup.children); // Замена fizzyUIUtils

    // Обновление активного класса при перелистывании (аналог flkty.on('select'))
    swiper.on('slideChange', function () {
      const previousSelectedButton = cellsButtonGroup.querySelector('.is-selected');
      if (previousSelectedButton) {
        previousSelectedButton.classList.remove('is-selected');
      }
      const selectedButton = cellsButtonGroup.children[swiper.activeIndex];
      if (selectedButton) {
        selectedButton.classList.add('is-selected');
      }
    });

    // Клик по кнопкам пагинации
    cellsButtonGroup.addEventListener('click', function (event) {
      if (!event.target.matches('.button')) {
        return;
      }
      const index = cellsButtons.indexOf(event.target);
      swiper.slideTo(index); // Переход к слайду (аналог flkty.select())
    });
  }
})();
/*(function(){
  const utils = window.fizzyUIUtils;
  //console.log(utils);
  const container = document.querySelector('.reviews-slider');
  if (!container) { return; }
  const elem = container.querySelector('.reviews-slider__inner');
  const flkty = new Flickity( elem, {
    // options
    lazyLoad: true,
    adaptiveHeight: true,
    prevNextButtons: false,
    pageDots: false,
    dragThreshold: 30,
    //autoPlay: 1500,
    //wrapAround: true //бесконечная прокрутка
  });

  // elements
  const cellsButtonGroup = container.querySelector('.slider-nav__pagination');
  let cellsButtons = utils.makeArray( cellsButtonGroup.children );

  // update buttons on select
  flkty.on( 'select', function() {
    const previousSelectedButton = cellsButtonGroup.querySelector('.is-selected');
    let selectedButton = cellsButtonGroup.children[ flkty.selectedIndex ];
    previousSelectedButton.classList.remove('is-selected');
    selectedButton.classList.add('is-selected');
  });

  // cell select
  //matchesSelector() заменил на matches()
  cellsButtonGroup.addEventListener( 'click', function( event ) {
    if ( !(event.target).matches( '.button' ) ) {
      return;
    }
    let index = cellsButtons.indexOf( event.target );
    flkty.select( index );
  });
  // previous
  const previousButton = container.querySelector('.slider-nav__btn--prev');
  previousButton.addEventListener( 'click', function() {
    flkty.previous();
  });
  // next
  const nextButton = container.querySelector('.slider-nav__btn--next');
  nextButton.addEventListener( 'click', function() {
    flkty.next();
  });

}());*/

(function () {
  const container = document.querySelector('.reviews-slider');
  if (!container) {
    return;
  }
  const elem = container.querySelector('.reviews-slider__inner');
  const swiper = new Swiper(elem, {
    /*effect: 'fade',
    fadeEffect: {
      crossFade: true // Плавное исчезновение предыдущего слайда
    },*/
    //autoHeight: true, // Аналог adaptiveHeight: true
    threshold: 30,
    // Аналог dragThreshold: 30
    spaceBetween: 24,
    // Межслайдовый отступ
    slidesPerView: '1',
    navigation: {
      nextEl: container.querySelector('.slider-nav-number__btn--next'),
      prevEl: container.querySelector('.slider-nav-number__btn--prev')
    },
    pagination: {
      el: container.querySelector('.slider-nav-number__pagination'),
      clickable: true,
      bulletClass: 'button slider-nav-number__dot',
      bulletActiveClass: 'is-selected',
      renderBullet: function (index, className) {
        return `<button type="button" class="button  ${className}"><span class="visually-hidden">Slide </span>${index + 1}</button>`;
      }
    }
  });
})();
// document.addEventListener('DOMContentLoaded', function(){});
// (function(){
// код
// }());
// document.addEventListener('DOMContentLoaded', function(){});
// (function(){
// код
// }());
(function () {
  const mobNav = document.querySelector('.mob-nav');
  const menuLink = mobNav.querySelector('.mob-nav__link');
  const burger = document.querySelector('.burger');
  const body = document.querySelector('body');
  if (!mobNav || !burger) {
    return;
  }
  const setBlur = function (elem) {
    elem.blur();
  };
  const setFocus = function (elem) {
    elem.focus();
  };
  const addOverflow = function () {
    body.style = 'overflow-y: hidden;';
    // padding-right:6px;
  };
  const deleteOverflow = function () {
    body.style = 'overflow-y: auto;';
  };
  const toggleMobNav = function (e) {
    //console.log(menuLink);
    const btn = e.target;
    if (!mobNav.classList.contains('mob-nav--open')) {
      mobNav.classList.add('mob-nav--open');
      addOverflow();
      setBlur(btn);
      setFocus(menuLink);
      btn.setAttribute('aria-expanded', true);
      btn.classList.add('burger--close');
    } else {
      mobNav.classList.remove('mob-nav--open');
      deleteOverflow();
      setBlur(menuLink);
      setFocus(btn);
      btn.setAttribute('aria-expanded', false);
      btn.classList.remove('burger--close');
    }
  };
  burger.addEventListener('click', toggleMobNav);
})();
/*(function(){
  const elem = document.querySelector('.logo-slider');
  if (!elem) { return; }
  const flkty = new Flickity( elem, {
    // options
    lazyLoad: 10,
    prevNextButtons: false,
    pageDots: false,
    dragThreshold: 30,
    autoPlay: 1500,
    wrapAround: true //бесконечная прокрутка
  });
}());*/

(function () {
  const elem = document.querySelector('.logo-slider');
  if (!elem) {
    return;
  }
  const swiper = new Swiper(elem, {
    loop: true,
    // wrapAround: true
    slidesPerView: 'auto',
    autoplay: {
      delay: 1500,
      disableOnInteraction: false
    },
    threshold: 30 // dragThreshold
  });
})();
document.documentElement.className = document.documentElement.className.replace('no-js', 'js');
function cth(c) {
  document.documentElement.classList.add(c);
}
'ontouchstart' in window ? cth('touch') : cth('no-touch');
if (typeof InstallTrigger !== 'undefined') cth('firefox');
if (/constructor/i.test(window.HTMLElement) || function (p) {
  return p.toString() === "[object SafariRemoteNotification]";
}(!window['safari'] || typeof safari !== 'undefined' && safari.pushNotification)) cth('safari');
if (/*@cc_on!@*/false || !!document.documentMode) cth('ie');
if (!(/*@cc_on!@*/false || !!document.documentMode) && !!window.StyleMedia) cth('edge');
if (!!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime)) cth('chrome');
if (~navigator.appVersion.indexOf("Win")) cth('windows');
if (~navigator.appVersion.indexOf("Mac")) cth('osx');
if (~navigator.appVersion.indexOf("Linux")) cth('linux');
(function () {
  // Поддержка формата webp для background-img
  // 1. Проверяем, можно ли использовать Webp формат
  function canUseWebp() {
    // Создаем элемент canvas
    let elem = document.createElement('canvas');
    // Приводим элемент к булеву типу
    if (!!(elem.getContext && elem.getContext('2d'))) {
      // Создаем изображение в формате webp, возвращаем индекс искомого элемента и сразу же проверяем его
      return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
    }
    // Иначе Webp не используем
    return false;
  }
  // 2. Заменв формата изображений
  window.onload = function () {
    // Получаем все элементы с дата-атрибутом data-bg
    let images = document.querySelectorAll('[data-bg]');
    // Проходимся по каждому
    for (let i = 0; i < images.length; i++) {
      // Получаем значение каждого дата-атрибута
      let image = images[i].getAttribute('data-bg');
      // Каждому найденному элементу задаем свойство background-image с изображение формата jpg
      images[i].style.backgroundImage = 'url(' + image + ')';
    }
    // Проверяем, является ли браузер посетителя сайта Firefox и получаем его версию
    let isitFirefox = window.navigator.userAgent.match(/Firefox\/([0-9]+)\./);
    let firefoxVer = isitFirefox ? parseInt(isitFirefox[1]) : 0;
    // Если есть поддержка Webp или браузер Firefox версии больше или равно 65
    if (canUseWebp() || firefoxVer >= 65) {
      // Делаем все то же самое что и для jpg, но уже для изображений формата Webp
      let imagesWebp = document.querySelectorAll('[data-bg-webp]');
      for (let i = 0; i < imagesWebp.length; i++) {
        let imageWebp = imagesWebp[i].getAttribute('data-bg-webp');
        imagesWebp[i].style.backgroundImage = 'url(' + imageWebp + ')';
      }
    }
  };
  // Разметка:
  //<div style="background-image: url('/images/image.webp')" data-bg="/images/image.jpg" data-bg-webp="/images/image.webp"></div>
})();

// Если на проекте jQuery
// $( document ).ready(function() {
//   // code
// });

// $(document).ready(function(){
//   if(window.matchMedia('(min-width: 1366px)').matches){
//   // do functionality on screens bigger than 1366px
//     $("#sticker").sticky({
//       topSpacing: 100
//     });
//   }
//   return false;
// });

/* (function () {
  const submitBtn = document.querySelector('.partnership__submit');
  const agreementCheckbox = document.querySelector('#agreement');

  const agreementHandler = function (e) {
    if (!this.checked) {
      submitBtn.disabled = true;
    } else {
      submitBtn.disabled = false;
    }
  };

  if (agreementCheckbox) {
    agreementCheckbox.addEventListener('change', agreementHandler);
  }
})(); */

(function () {
  const bLazy = new Blazy({
    // Options
    selector: '.b-lazy'
  });
  const sticky = new Sticky('.page-header');
  sticky.update();
})();