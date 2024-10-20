// node_modules/any-event/dist/index.es.js
var t = class {
  constructor() {
    this.__map = {};
  }
  beforeEach(t3) {
    this.__interceptor = t3;
  }
  on(t3, i5) {
    const s3 = Array.isArray(t3) ? t3 : [t3];
    for (const t4 of s3) {
      this.__map[t4] = this.__map[t4] || [];
      const s4 = this.__map[t4];
      s4 && s4.push(i5);
    }
    return this;
  }
  emit(t3, i5, s3) {
    void 0 !== this.__interceptor ? this.__interceptor(t3, () => {
      this.__emit(t3, i5), s3 && s3();
    }) : (this.__emit(t3, i5), s3 && s3());
  }
  __emit(t3, i5) {
    const s3 = this.__map[t3];
    if (Array.isArray(s3) && (null == s3 ? void 0 : s3.length)) for (const _ of s3) _(i5, t3);
    this.event = i5;
  }
  off(t3, i5) {
    const s3 = this.__map[t3];
    if (void 0 !== s3) if (void 0 === i5) delete this.__map[t3];
    else {
      const t4 = s3.findIndex((t5) => t5 === i5);
      s3.splice(t4, 1);
    }
  }
  destroy() {
    this.__map = {};
  }
};

// node_modules/@any-touch/shared/dist/index.es.js
var n = "clientX";
var e = "clientY";
var t2 = 16;
var c = "start";
var o = "move";
var s = "cancel";
var u = "end";
var a = "left";
var i = "right";
var r = "up";
var d = "down";
var m = { 4: "start", 5: "move", 1: "end", 3: "cancel" };
function v(n3) {
  return m[n3];
}
function b(n3, e4, t3) {
  const c5 = { 1: { 0: { move: 4 }, 4: { move: 5, end: 1, cancel: 3 }, 5: { move: 5, end: 1, cancel: 3 } }, 0: { 4: { move: 2, end: 1, cancel: 3 }, 5: { start: 2, move: 2, end: 1, cancel: 3 } } }[Number(n3)][e4];
  return void 0 !== c5 && c5[t3] || 0;
}
function g(n3) {
  [1, 3, 2].includes(n3.state) && (n3.state = 0);
}
function h(n3) {
  return [5, 1, 3].includes(n3);
}
function j(n3) {
  if (n3.disabled) return n3.state = 0, true;
}
function O(n3, e4) {
  return Object.assign(Object.assign(Object.assign({}, n3), e4), { state: 0, disabled: false });
}
function p(n3) {
  return Math.round(100 * n3) / 100;
}

// node_modules/@any-touch/core/dist/index.es.js
function r2() {
  let t3, o3, i5, r6, a4 = 0;
  return function(u5) {
    if (t3 = o3, void 0 !== u5) {
      a4 = Number.MAX_SAFE_INTEGER > a4 ? ++a4 : 1;
      const h5 = function(t4, o4) {
        const { phase: i6, points: r7, changedPoints: a5, nativeEvent: u6 } = t4, h6 = r7.length, p6 = c === i6, g4 = u === i6 && 0 === h6 || s === i6, l3 = Date.now(), { x: d3, y: m4 } = c2(r7) || c2(a5), { currentTarget: v3 } = u6;
        return Object.assign(t4, { id: o4, x: d3, y: m4, timestamp: l3, isStart: p6, isEnd: g4, pointLength: h6, currentTarget: v3, getOffset(t5 = v3) {
          const e4 = t5.getBoundingClientRect();
          return { x: d3 - Math.round(e4.left), y: m4 - Math.round(e4.top) };
        } });
      }(u5, a4);
      o3 = h5;
      const { isStart: p5, pointLength: g3 } = h5;
      return p5 && (i5 = h5, t3 = void 0, r6 = 1 < g3 ? h5 : void 0), Object.assign(Object.assign({}, h5), { prevInput: t3, startMultiInput: r6, startInput: i5 });
    }
  };
}
function c2(t3) {
  const { length: e4 } = t3;
  if (0 < e4) {
    if (1 === e4) {
      const { clientX: e5, clientY: n4 } = t3[0];
      return { x: Math.round(e5), y: Math.round(n4) };
    }
    const n3 = t3.reduce((t4, e5) => (t4.x += e5[n], t4.y += e5[e], t4), { x: 0, y: 0 });
    return { x: Math.round(n3.x / e4), y: Math.round(n3.y / e4) };
  }
}
function a2(t3, e4, n3, s3) {
  const o3 = {};
  for (const t4 in n3) ["target", "currentTarget", "type"].includes(t4) || (o3[t4] = n3[t4]);
  let i5;
  return document.createEvent ? (i5 = document.createEvent("HTMLEvents"), i5.initEvent(t3, null == s3 ? void 0 : s3.bubbles, null == s3 ? void 0 : s3.cancelable)) : i5 = new Event(t3, s3), Object.assign(i5, o3, { match: () => n3.targets && 0 < n3.targets.length && n3.targets.every((t4) => i5.currentTarget.contains(t4)) }), e4.dispatchEvent(i5);
}
function u2(t3, e4) {
  const { preventDefault: n3 } = e4;
  return s3 = n3, "[object Function]" === Object.prototype.toString.call(s3) ? n3(t3) : !!n3;
  var s3;
}
var h2 = ["touchstart", "touchmove", "touchend", "touchcancel", "mousedown"];
var p2 = ["mousemove", "mouseup"];
var g2 = { domEvents: { bubbles: true, cancelable: true }, preventDefault: (t3) => {
  if (t3.target && "tagName" in t3.target) {
    const { tagName: e4 } = t3.target;
    return !/^(?:INPUT|TEXTAREA|BUTTON|SELECT)$/.test(e4);
  }
  return false;
} };
var l = class extends t {
  constructor(t3, e4) {
    super(), this.v = "2.1.3", this.__computeFunctionList = [], this.__computeFunctionCreatorList = [], this.__pluginContexts = [], this.__isIgnoreMouse = false, this.el = t3, this.c = {}, this.__options = Object.assign(Object.assign({}, g2), e4);
    const n3 = function(t4) {
      const e5 = r2();
      return function(n4) {
        const s4 = [], o3 = [];
        Array.from(n4.touches).forEach(({ clientX: e6, clientY: n5, target: i6 }) => {
          (null == t4 ? void 0 : t4.contains(i6)) && (s4.push(i6), o3.push({ clientX: e6, clientY: n5, target: i6 }));
        });
        const i5 = Array.from(n4.changedTouches).map(({ clientX: t5, clientY: e6, target: n5 }) => ({ clientX: t5, clientY: e6, target: n5 }));
        return e5({ phase: n4.type.replace("touch", ""), changedPoints: i5, points: o3, nativeEvent: n4, target: n4.target, targets: s4 });
      };
    }(this.el), s3 = function() {
      let t4, e5 = false, n4 = null;
      const s4 = r2();
      return function(o3) {
        const { clientX: i5, clientY: r6, type: c5, button: a4, target: u5 } = o3;
        let h5, p5 = [{ clientX: i5, clientY: r6, target: u5 }];
        if ("mousedown" === c5 && 0 === a4) n4 = u5, e5 = true, h5 = "start";
        else {
          if (!e5) return;
          "mousemove" === c5 ? h5 = "move" : "mouseup" === c5 && (p5 = [], h5 = "end", e5 = false);
        }
        const g3 = t4 || [{ clientX: i5, clientY: r6, target: u5 }];
        if (t4 = [{ clientX: i5, clientY: r6, target: u5 }], void 0 !== h5) return s4({ phase: h5, changedPoints: g3, points: p5, target: n4, targets: [n4], nativeEvent: o3 });
      };
    }();
    if (this.__inputCreatorMap = { touchstart: n3, touchmove: n3, touchend: n3, touchcancel: n3, mousedown: s3, mousemove: s3, mouseup: s3 }, this.on("at:after", (t4) => {
      const { target: e5, __type: n4 } = t4, { domEvents: s4 } = this.__options;
      s4 && void 0 !== this.el && e5 && (a2(n4, e5, t4, s4), a2("at:after", e5, t4, s4));
    }), void 0 !== t3) {
      t3.style.webkitTapHighlightColor = "rgba(0,0,0,0)";
      let e5 = false;
      try {
        const t4 = {};
        Object.defineProperty(t4, "passive", { get() {
          e5 = true;
        } }), window.addEventListener("_", () => {
        }, t4);
      } catch (t4) {
      }
      this.on("u", function(t4, e6, n4) {
        return h2.forEach((s4) => {
          t4.addEventListener(s4, e6, n4);
        }), p2.forEach((t5) => {
          window.addEventListener(t5, e6, n4);
        }), () => {
          h2.forEach((n5) => {
            t4.removeEventListener(n5, e6);
          }), p2.forEach((t5) => {
            window.removeEventListener(t5, e6);
          });
        };
      }(t3, this.catchEvent.bind(this), false === this.__options.preventDefault && e5 ? { passive: true } : { passive: false }));
    }
  }
  use(t3, e4) {
    this.__pluginContexts.push(t3(this, e4));
  }
  catchEvent(t3) {
    const e4 = this.__inputCreatorMap[t3.type](t3);
    if (void 0 !== e4) {
      const n3 = () => t3.stopPropagation(), s3 = () => t3.stopImmediatePropagation(), o3 = () => t3.preventDefault();
      if (u2(t3, this.__options)) o3();
      else if ("touchstart" === t3.type ? this.__isIgnoreMouse = true : "touchmove" === t3.type && (this.__isIgnoreMouse = false), this.__isIgnoreMouse && t3.type.startsWith("mouse")) return void ("mouseup" === t3.type && (this.__isIgnoreMouse = false));
      this.emit("input", e4), this.emit2(`at:${e4.phase}`, e4, {});
      const i5 = {};
      this.__computeFunctionList.forEach((t4) => {
        const n4 = t4(e4, i5);
        if (void 0 !== n4) for (const t5 in n4) i5[t5] = n4[t5];
      }), this.emit("computed", Object.assign(Object.assign(Object.assign({}, e4), i5), { stopPropagation: n3, stopImmediatePropagation: s3, preventDefault: o3 }));
    }
  }
  compute(t3, e4) {
    for (const e5 of t3) this.__computeFunctionCreatorList.includes(e5) || (this.__computeFunctionCreatorList.push(e5), this.__computeFunctionList.push(e5()));
    this.on("computed", e4);
  }
  beforeEach(t3) {
    super.beforeEach((e4, n3) => {
      var s3;
      (null === (s3 = this.c) || void 0 === s3 ? void 0 : s3.name) ? t3(e4, n3) : n3();
    });
  }
  get(t3) {
    return this.__pluginContexts.find((e4) => t3 === e4.name);
  }
  set(t3) {
    this.__options = Object.assign(Object.assign({}, this.__options), t3);
  }
  emit2(t3, e4, n3) {
    this.c = n3, this.emit(t3, Object.assign(Object.assign({}, e4), { type: t3 }), () => {
      this.emit("at:after", Object.assign(Object.assign({}, e4), { name: t3, __type: t3 }));
    });
  }
  destroy() {
    this.emit("u"), super.destroy();
  }
};

// node_modules/@any-touch/vector/dist/index.es.js
var x = (r6) => Math.sqrt(r6.x * r6.x + r6.y * r6.y);
var y = (r6, a4) => r6.x * a4.x + r6.y * a4.y;
var e2 = (r6, a4) => {
  var t3 = x(r6) * x(a4);
  if (0 === t3) return 0;
  var h5 = y(r6, a4) / t3;
  return h5 > 1 && (h5 = 1), Math.acos(h5);
};
var n2 = (r6, a4) => r6.x * a4.y - a4.x * r6.y;
var o2 = (r6) => r6 / Math.PI * 180;
var s2 = (r6, a4) => {
  var t3 = e2(r6, a4);
  return n2(r6, a4) > 0 && (t3 *= -1), o2(t3);
};
var u3 = (x2, y2) => {
  if (0 !== x2 || 0 !== y2) return Math.abs(x2) >= Math.abs(y2) ? 0 < x2 ? i : a : 0 < y2 ? d : r;
};

// node_modules/@any-touch/compute/dist/index.es.js
function p3() {
  let n3 = 0, e4 = 0;
  return function(o3, r6) {
    const { prevVecotr: i5, startVecotr: a4, activeVecotr: c5 } = r6;
    return c5 && (e4 = Math.round(s2(c5, i5)), n3 = Math.round(s2(c5, a4))), { angle: n3, deltaAngle: e4 };
  };
}
function d2() {
  return function(t3) {
    const { prevInput: e4 } = t3;
    let o3 = 0, r6 = 0, i5 = 0;
    if (void 0 !== e4 && (o3 = t3.x - e4.x, r6 = t3.y - e4.y, 0 !== o3 || 0 !== r6)) {
      const t4 = Math.sqrt(Math.pow(o3, 2) + Math.pow(r6, 2));
      i5 = Math.round(o2(Math.acos(Math.abs(o3) / t4)));
    }
    return { deltaX: o3, deltaY: r6, deltaXYAngle: i5 };
  };
}
function h3() {
  let t3, n3 = 0, u5 = 0, s3 = 0, p5 = 0, d3 = 0;
  return function(h5) {
    const { phase: l3, startInput: f2 } = h5;
    return c === l3 ? (n3 = 0, u5 = 0, s3 = 0, p5 = 0, d3 = 0) : o === l3 && (n3 = Math.round(h5.points[0][n] - f2.points[0][n]), u5 = Math.round(h5.points[0][e] - f2.points[0][e]), s3 = Math.abs(n3), p5 = Math.abs(u5), d3 = Math.round(x({ x: s3, y: p5 })), t3 = u3(n3, u5)), { displacementX: n3, displacementY: u5, distanceX: s3, distanceY: p5, distance: d3, overallDirection: t3 };
  };
}
function l2() {
  let t3 = 1;
  return function(n3, o3) {
    let r6 = 1;
    const { prevVecotr: i5, startVecotr: a4, activeVecotr: c5 } = o3;
    return c5 && (r6 = p(x(c5) / x(i5)), t3 = p(x(c5) / x(a4))), { scale: t3, deltaScale: r6 };
  };
}
function f() {
  let t3, n3, e4 = 0, r6 = 0, i5 = 0, a4 = 0;
  return function(c5) {
    if (void 0 !== c5) {
      n3 = n3 || c5.startInput;
      const u5 = c5.timestamp - n3.timestamp;
      if (t2 < u5) {
        const s3 = c5.x - n3.x, p5 = c5.y - n3.y;
        i5 = Math.round(s3 / u5 * 100) / 100, a4 = Math.round(p5 / u5 * 100) / 100, e4 = Math.abs(i5), r6 = Math.abs(a4), t3 = u3(s3, p5), n3 = c5;
      }
    }
    return { velocityX: e4, velocityY: r6, speedX: i5, speedY: a4, direction: t3 };
  };
}
function M() {
  let t3 = 0;
  return function(n3) {
    const { phase: e4 } = n3;
    return c === e4 && (t3 = n3.pointLength), { maxPointLength: t3 };
  };
}
function v2(t3) {
  return { x: t3.points[1][n] - t3.points[0][n], y: t3.points[1][e] - t3.points[0][e] };
}
function m2() {
  let t3, n3, e4;
  return function(o3) {
    const { prevInput: r6, startMultiInput: i5 } = o3;
    return void 0 !== i5 && void 0 !== r6 && o3.id !== i5.id && 1 < r6.pointLength && 1 < o3.pointLength ? (t3 = v2(i5), n3 = v2(r6), e4 = v2(o3)) : e4 = void 0, { startVecotr: t3, prevVecotr: n3, activeVecotr: e4 };
  };
}

// node_modules/@any-touch/tap/dist/index.es.js
var m3 = { name: "tap", pointLength: 1, tapTimes: 1, waitNextTapTime: 300, maxDistance: 2, maxDistanceFromPrevTap: 9, maxPressTime: 250 };
function r3(r6, s3) {
  const c5 = O(m3, s3);
  let p5, u5, x2, T = 0;
  function f2() {
    T = 0, p5 = void 0, u5 = void 0;
  }
  return r6.compute([h3, M], (t3) => {
    if (j(c5)) return;
    const { phase: i5, x: o3, y: m4 } = t3;
    u === i5 && (c5.state = 0, !function() {
      const { startInput: e4, pointLength: n3, timestamp: a4 } = t3, i6 = a4 - e4.timestamp, { distance: o4, maxPointLength: m5 } = t3;
      return m5 === c5.pointLength && 0 === n3 && c5.maxDistance >= o4 && c5.maxPressTime > i6;
    }() ? (f2(), c5.state = 2) : (clearTimeout(x2), function(t4, e4) {
      if (void 0 !== p5) {
        const n3 = x({ x: t4.x - p5.x, y: t4.y - p5.y });
        return p5 = t4, e4.maxDistanceFromPrevTap >= n3;
      }
      return p5 = t4, true;
    }({ x: o3, y: m4 }, c5) && function(t4) {
      const e4 = performance.now();
      if (void 0 === u5) return u5 = e4, true;
      {
        const n3 = e4 - u5;
        return u5 = e4, n3 < t4;
      }
    }(c5.waitNextTapTime) ? T++ : T = 1, 0 == T % c5.tapTimes ? (c5.state = 1, r6.emit2(c5.name, t3, c5), f2()) : x2 = setTimeout(() => {
      c5.state = 2, f2();
    }, c5.waitNextTapTime)));
  }), c5;
}

// node_modules/@any-touch/pan/dist/index.es.js
var p4 = { name: "pan", threshold: 10, pointLength: 1 };
function u4(u5, d3) {
  const f2 = O(p4, d3);
  return u5.compute([f, h3, d2], (t3) => {
    if (g(f2), j(f2)) return;
    const c5 = function() {
      const { pointLength: e4, distance: n3 } = t3;
      return f2.pointLength === e4 && f2.threshold <= n3;
    }();
    if (f2.state = b(c5, f2.state, t3.phase), c5 || h(f2.state)) {
      const { name: e4 } = f2;
      u5.emit2(e4, t3, f2), u5.emit2(e4 + v(f2.state), t3, f2), ![u, s].includes(t3.phase) && t3.direction && u5.emit2(e4 + t3.direction, t3, f2);
    }
  }), f2;
}

// node_modules/@any-touch/swipe/dist/index.es.js
var c3 = { name: "swipe", threshold: 10, velocity: 0.3, pointLength: 1 };
function a3(a4, r6) {
  const s3 = O(c3, r6);
  return a4.compute([h3, f, M], (t3) => {
    if (s3.state = 0, !s3.disabled && function() {
      if (u !== t3.phase) return false;
      const { velocityX: o3, velocityY: n3, distance: i5, maxPointLength: c5 } = t3;
      return c5 === s3.pointLength && 0 === t3.points.length && s3.threshold < i5 && s3.velocity < Math.max(o3, n3);
    }()) {
      const { name: e4 } = s3;
      s3.state = 1, a4.emit2(e4, t3, s3), a4.emit2(e4 + t3.direction, t3, s3);
    }
  }), s3;
}

// node_modules/@any-touch/press/dist/index.es.js
var r4 = { name: "press", pointLength: 1, maxDistance: 9, minPressTime: 251 };
function c4(c5, u5) {
  const p5 = O(r4, u5);
  let f2 = 0;
  return c5.compute([h3], (t3) => {
    if (j(p5)) return;
    const { phase: o3, startInput: r6, pointLength: u6 } = t3;
    if (c === o3 && p5.pointLength === u6) g(p5), clearTimeout(f2), f2 = setTimeout(() => {
      p5.state = 1, c5.emit2(p5.name, t3, p5);
    }, p5.minPressTime);
    else if (u === o3 && 1 === p5.state) c5.emit2(`${p5.name}${r}`, t3, p5);
    else if (1 !== p5.state) {
      const e4 = t3.timestamp - r6.timestamp;
      (!function() {
        const { distance: e5 } = t3;
        return e5 && p5.maxDistance > e5;
      }() || p5.minPressTime > e4 && [u, s].includes(o3)) && (clearTimeout(f2), p5.state = 2);
    }
  }), p5;
}

// node_modules/@any-touch/pinch/dist/index.es.js
var i2 = { name: "pinch", threshold: 0, pointLength: 2 };
function r5(r6, m4) {
  const p5 = O(i2, m4);
  return r6.compute([m2, l2], (t3) => {
    if (g(p5), j(p5)) return;
    const c5 = function() {
      const { pointLength: e4, scale: n3, deltaScale: o3, phase: a4 } = t3;
      return p5.pointLength === e4 && p5.threshold < Math.abs(n3 - 1);
    }();
    p5.state = b(c5, p5.state, t3.phase);
    const { name: h5 } = p5;
    if (c5 || h(p5.state)) {
      r6.emit2(h5, t3, p5);
      const { deltaScale: e4 } = t3;
      1 !== e4 && r6.emit2(h5 + (1 < e4 ? "in" : "out"), t3, p5);
    }
    const i5 = v(p5.state);
    i5 && r6.emit2(h5 + i5, t3, p5);
  }), p5;
}

// node_modules/@any-touch/rotate/dist/index.es.js
var h4 = { name: "rotate", threshold: 0, pointLength: 2 };
function i3(i5, m4) {
  const u5 = O(h4, m4);
  return i5.compute([m2, p3], (t3) => {
    if (j(u5)) return;
    g(u5);
    const r6 = function() {
      const { pointLength: e4, angle: n3 } = t3;
      return u5.pointLength === e4 && u5.threshold < Math.abs(n3);
    }();
    u5.state = b(r6, u5.state, t3.phase);
    const { name: c5 } = u5;
    (r6 || h(u5.state)) && i5.emit2(c5, t3, u5);
    const h5 = v(u5.state);
    h5 && i5.emit2(c5 + h5, t3, u5);
  }), u5;
}

// node_modules/@any-touch/doubletap/dist/index.es.js
function e3(e4) {
  e4.use(r3, { name: "doubletap", tapTimes: 2 });
  const a4 = e4.get("doubletap");
  let o3;
  return e4.beforeEach((t3, e5) => {
    "tap" === t3 ? (clearTimeout(o3), o3 = setTimeout(() => {
      [0, 2].includes(a4.state) && e5();
    }, 300)) : e5();
  }), a4;
}

// node_modules/any-touch/dist/index.es.js
var i4 = class extends l {
  constructor(t3, u5) {
    super(t3, u5), this.use(r3), this.use(u4), this.use(a3), this.use(c4), this.use(r5), this.use(i3);
  }
};
i4.STATE_POSSIBLE = 0, i4.STATE_START = 4, i4.STATE_MOVE = 5, i4.STATE_END = 1, i4.STATE_CANCELLED = 3, i4.STATE_FAILED = 2, i4.STATE_RECOGNIZED = 1, i4.tap = r3, i4.pan = u4, i4.swipe = a3, i4.press = c4, i4.rotate = i3, i4.pinch = r5, i4.doubletap = e3;
export {
  i4 as default
};
//# sourceMappingURL=any-touch.js.map
