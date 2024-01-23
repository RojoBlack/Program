import "./chunk-HSNDBVJ3.js";

// node_modules/wavesurfer.js/dist/wavesurfer.esm.js
function t(t2, e2, i2, s2) {
  return new (i2 || (i2 = Promise))(function(n2, r2) {
    function o2(t3) {
      try {
        h2(s2.next(t3));
      } catch (t4) {
        r2(t4);
      }
    }
    function a2(t3) {
      try {
        h2(s2.throw(t3));
      } catch (t4) {
        r2(t4);
      }
    }
    function h2(t3) {
      var e3;
      t3.done ? n2(t3.value) : (e3 = t3.value, e3 instanceof i2 ? e3 : new i2(function(t4) {
        t4(e3);
      })).then(o2, a2);
    }
    h2((s2 = s2.apply(t2, e2 || [])).next());
  });
}
var e = { decode: function(e2, i2) {
  return t(this, void 0, void 0, function* () {
    const t2 = new AudioContext({ sampleRate: i2 });
    return t2.decodeAudioData(e2).finally(() => t2.close());
  });
}, createBuffer: function(t2, e2) {
  return "number" == typeof t2[0] && (t2 = [t2]), function(t3) {
    const e3 = t3[0];
    if (e3.some((t4) => t4 > 1 || t4 < -1)) {
      const i2 = e3.length;
      let s2 = 0;
      for (let t4 = 0; t4 < i2; t4++) {
        const i3 = Math.abs(e3[t4]);
        i3 > s2 && (s2 = i3);
      }
      for (const e4 of t3)
        for (let t4 = 0; t4 < i2; t4++)
          e4[t4] /= s2;
    }
  }(t2), { duration: e2, length: t2[0].length, sampleRate: t2[0].length / e2, numberOfChannels: t2.length, getChannelData: (e3) => null == t2 ? void 0 : t2[e3], copyFromChannel: AudioBuffer.prototype.copyFromChannel, copyToChannel: AudioBuffer.prototype.copyToChannel };
} };
var i = { fetchBlob: function(e2, i2, s2) {
  return t(this, void 0, void 0, function* () {
    const n2 = yield fetch(e2, s2);
    if (!n2.ok)
      throw new Error(`Failed to fetch ${e2}: ${n2.status} (${n2.statusText})`);
    return function(e3, i3) {
      t(this, void 0, void 0, function* () {
        if (!e3.body || !e3.headers)
          return;
        const s3 = e3.body.getReader(), n3 = Number(e3.headers.get("Content-Length")) || 0;
        let r2 = 0;
        const o2 = (e4) => t(this, void 0, void 0, function* () {
          r2 += (null == e4 ? void 0 : e4.length) || 0;
          const t2 = Math.round(r2 / n3 * 100);
          i3(t2);
        }), a2 = () => t(this, void 0, void 0, function* () {
          let t2;
          try {
            t2 = yield s3.read();
          } catch (t3) {
            return;
          }
          t2.done || (o2(t2.value), yield a2());
        });
        a2();
      });
    }(n2.clone(), i2), n2.blob();
  });
} };
var s = class {
  constructor() {
    this.listeners = {};
  }
  on(t2, e2, i2) {
    if (this.listeners[t2] || (this.listeners[t2] = /* @__PURE__ */ new Set()), this.listeners[t2].add(e2), null == i2 ? void 0 : i2.once) {
      const i3 = () => {
        this.un(t2, i3), this.un(t2, e2);
      };
      return this.on(t2, i3), i3;
    }
    return () => this.un(t2, e2);
  }
  un(t2, e2) {
    var i2;
    null === (i2 = this.listeners[t2]) || void 0 === i2 || i2.delete(e2);
  }
  once(t2, e2) {
    return this.on(t2, e2, { once: true });
  }
  unAll() {
    this.listeners = {};
  }
  emit(t2, ...e2) {
    this.listeners[t2] && this.listeners[t2].forEach((t3) => t3(...e2));
  }
};
var n = class extends s {
  constructor(t2) {
    super(), this.isExternalMedia = false, t2.media ? (this.media = t2.media, this.isExternalMedia = true) : this.media = document.createElement("audio"), t2.mediaControls && (this.media.controls = true), t2.autoplay && (this.media.autoplay = true), null != t2.playbackRate && this.onceMediaEvent("canplay", () => {
      null != t2.playbackRate && (this.media.playbackRate = t2.playbackRate);
    });
  }
  onMediaEvent(t2, e2, i2) {
    return this.media.addEventListener(t2, e2, i2), () => this.media.removeEventListener(t2, e2);
  }
  onceMediaEvent(t2, e2) {
    return this.onMediaEvent(t2, e2, { once: true });
  }
  getSrc() {
    return this.media.currentSrc || this.media.src || "";
  }
  revokeSrc() {
    const t2 = this.getSrc();
    t2.startsWith("blob:") && URL.revokeObjectURL(t2);
  }
  setSrc(t2, e2) {
    if (this.getSrc() === t2)
      return;
    this.revokeSrc();
    const i2 = e2 instanceof Blob ? URL.createObjectURL(e2) : t2;
    this.media.src = i2;
  }
  destroy() {
    this.media.pause(), this.isExternalMedia || (this.media.remove(), this.revokeSrc(), this.media.src = "", this.media.load());
  }
  setMediaElement(t2) {
    this.media = t2;
  }
  play() {
    return this.media.play();
  }
  pause() {
    this.media.pause();
  }
  isPlaying() {
    return !this.media.paused && !this.media.ended;
  }
  setTime(t2) {
    this.media.currentTime = t2;
  }
  getDuration() {
    return this.media.duration;
  }
  getCurrentTime() {
    return this.media.currentTime;
  }
  getVolume() {
    return this.media.volume;
  }
  setVolume(t2) {
    this.media.volume = t2;
  }
  getMuted() {
    return this.media.muted;
  }
  setMuted(t2) {
    this.media.muted = t2;
  }
  getPlaybackRate() {
    return this.media.playbackRate;
  }
  setPlaybackRate(t2, e2) {
    null != e2 && (this.media.preservesPitch = e2), this.media.playbackRate = t2;
  }
  getMediaElement() {
    return this.media;
  }
  setSinkId(t2) {
    return this.media.setSinkId(t2);
  }
};
var r = class _r extends s {
  constructor(t2, e2) {
    super(), this.timeouts = [], this.isScrollable = false, this.audioData = null, this.resizeObserver = null, this.lastContainerWidth = 0, this.isDragging = false, this.options = t2;
    const i2 = this.parentFromOptionsContainer(t2.container);
    this.parent = i2;
    const [s2, n2] = this.initHtml();
    i2.appendChild(s2), this.container = s2, this.scrollContainer = n2.querySelector(".scroll"), this.wrapper = n2.querySelector(".wrapper"), this.canvasWrapper = n2.querySelector(".canvases"), this.progressWrapper = n2.querySelector(".progress"), this.cursor = n2.querySelector(".cursor"), e2 && n2.appendChild(e2), this.initEvents();
  }
  parentFromOptionsContainer(t2) {
    let e2;
    if ("string" == typeof t2 ? e2 = document.querySelector(t2) : t2 instanceof HTMLElement && (e2 = t2), !e2)
      throw new Error("Container not found");
    return e2;
  }
  initEvents() {
    const t2 = (t3) => {
      const e3 = this.wrapper.getBoundingClientRect(), i2 = t3.clientX - e3.left, s2 = t3.clientX - e3.left;
      return [i2 / e3.width, s2 / e3.height];
    };
    this.wrapper.addEventListener("click", (e3) => {
      const [i2, s2] = t2(e3);
      this.emit("click", i2, s2);
    }), this.wrapper.addEventListener("dblclick", (e3) => {
      const [i2, s2] = t2(e3);
      this.emit("dblclick", i2, s2);
    }), this.options.dragToSeek && this.initDrag(), this.scrollContainer.addEventListener("scroll", () => {
      const { scrollLeft: t3, scrollWidth: e3, clientWidth: i2 } = this.scrollContainer, s2 = t3 / e3, n2 = (t3 + i2) / e3;
      this.emit("scroll", s2, n2);
    });
    const e2 = this.createDelay(100);
    this.resizeObserver = new ResizeObserver(() => {
      e2(() => this.onContainerResize());
    }), this.resizeObserver.observe(this.scrollContainer);
  }
  onContainerResize() {
    const t2 = this.parent.clientWidth;
    t2 === this.lastContainerWidth && "auto" !== this.options.height || (this.lastContainerWidth = t2, this.reRender());
  }
  initDrag() {
    !function(t2, e2, i2, s2, n2 = 3, r2 = 0) {
      if (!t2)
        return () => {
        };
      let o2 = () => {
      };
      const a2 = (a3) => {
        if (a3.button !== r2)
          return;
        a3.preventDefault(), a3.stopPropagation();
        let h2 = a3.clientX, l2 = a3.clientY, d = false;
        const c = (s3) => {
          s3.preventDefault(), s3.stopPropagation();
          const r3 = s3.clientX, o3 = s3.clientY, a4 = r3 - h2, c2 = o3 - l2;
          if (d || Math.abs(a4) > n2 || Math.abs(c2) > n2) {
            const s4 = t2.getBoundingClientRect(), { left: n3, top: u2 } = s4;
            d || (null == i2 || i2(h2 - n3, l2 - u2), d = true), e2(a4, c2, r3 - n3, o3 - u2), h2 = r3, l2 = o3;
          }
        }, u = () => {
          d && (null == s2 || s2()), o2();
        }, p = (t3) => {
          d && (t3.stopPropagation(), t3.preventDefault());
        }, m = (t3) => {
          d && t3.preventDefault();
        };
        document.addEventListener("pointermove", c), document.addEventListener("pointerup", u), document.addEventListener("pointerout", u), document.addEventListener("pointercancel", u), document.addEventListener("touchmove", m, { passive: false }), document.addEventListener("click", p, { capture: true }), o2 = () => {
          document.removeEventListener("pointermove", c), document.removeEventListener("pointerup", u), document.removeEventListener("pointerout", u), document.removeEventListener("pointercancel", u), document.removeEventListener("touchmove", m), setTimeout(() => {
            document.removeEventListener("click", p, { capture: true });
          }, 10);
        };
      };
      t2.addEventListener("pointerdown", a2);
    }(this.wrapper, (t2, e2, i2) => {
      this.emit("drag", Math.max(0, Math.min(1, i2 / this.wrapper.getBoundingClientRect().width)));
    }, () => this.isDragging = true, () => this.isDragging = false);
  }
  getHeight(t2) {
    return null == t2 ? 128 : isNaN(Number(t2)) ? "auto" === t2 && this.parent.clientHeight || 128 : Number(t2);
  }
  initHtml() {
    const t2 = document.createElement("div"), e2 = t2.attachShadow({ mode: "open" });
    return e2.innerHTML = `
      <style>
        :host {
          user-select: none;
          min-width: 1px;
        }
        :host audio {
          display: block;
          width: 100%;
        }
        :host .scroll {
          overflow-x: auto;
          overflow-y: hidden;
          width: 100%;
          position: relative;
        }
        :host .noScrollbar {
          scrollbar-color: transparent;
          scrollbar-width: none;
        }
        :host .noScrollbar::-webkit-scrollbar {
          display: none;
          -webkit-appearance: none;
        }
        :host .wrapper {
          position: relative;
          overflow: visible;
          z-index: 2;
        }
        :host .canvases {
          min-height: ${this.getHeight(this.options.height)}px;
        }
        :host .canvases > div {
          position: relative;
        }
        :host canvas {
          display: block;
          position: absolute;
          top: 0;
          image-rendering: pixelated;
        }
        :host .progress {
          pointer-events: none;
          position: absolute;
          z-index: 2;
          top: 0;
          left: 0;
          width: 0;
          height: 100%;
          overflow: hidden;
        }
        :host .progress > div {
          position: relative;
        }
        :host .cursor {
          pointer-events: none;
          position: absolute;
          z-index: 5;
          top: 0;
          left: 0;
          height: 100%;
          border-radius: 2px;
        }
      </style>

      <div class="scroll" part="scroll">
        <div class="wrapper" part="wrapper">
          <div class="canvases"></div>
          <div class="progress" part="progress"></div>
          <div class="cursor" part="cursor"></div>
        </div>
      </div>
    `, [t2, e2];
  }
  setOptions(t2) {
    if (this.options.container !== t2.container) {
      const e2 = this.parentFromOptionsContainer(t2.container);
      e2.appendChild(this.container), this.parent = e2;
    }
    t2.dragToSeek && !this.options.dragToSeek && this.initDrag(), this.options = t2, this.reRender();
  }
  getWrapper() {
    return this.wrapper;
  }
  getScroll() {
    return this.scrollContainer.scrollLeft;
  }
  destroy() {
    var t2;
    this.container.remove(), null === (t2 = this.resizeObserver) || void 0 === t2 || t2.disconnect();
  }
  createDelay(t2 = 10) {
    const e2 = {};
    return this.timeouts.push(e2), (i2) => {
      e2.timeout && clearTimeout(e2.timeout), e2.timeout = setTimeout(i2, t2);
    };
  }
  convertColorValues(t2) {
    if (!Array.isArray(t2))
      return t2 || "";
    if (t2.length < 2)
      return t2[0] || "";
    const e2 = document.createElement("canvas"), i2 = e2.getContext("2d"), s2 = e2.height * (window.devicePixelRatio || 1), n2 = i2.createLinearGradient(0, 0, 0, s2), r2 = 1 / (t2.length - 1);
    return t2.forEach((t3, e3) => {
      const i3 = e3 * r2;
      n2.addColorStop(i3, t3);
    }), n2;
  }
  renderBarWaveform(t2, e2, i2, s2) {
    const n2 = t2[0], r2 = t2[1] || t2[0], o2 = n2.length, { width: a2, height: h2 } = i2.canvas, l2 = h2 / 2, d = window.devicePixelRatio || 1, c = e2.barWidth ? e2.barWidth * d : 1, u = e2.barGap ? e2.barGap * d : e2.barWidth ? c / 2 : 0, p = e2.barRadius || 0, m = a2 / (c + u) / o2, g = p && "roundRect" in i2 ? "roundRect" : "rect";
    i2.beginPath();
    let v = 0, f = 0, b = 0;
    for (let t3 = 0; t3 <= o2; t3++) {
      const o3 = Math.round(t3 * m);
      if (o3 > v) {
        const t4 = Math.round(f * l2 * s2), n3 = t4 + Math.round(b * l2 * s2) || 1;
        let r3 = l2 - t4;
        "top" === e2.barAlign ? r3 = 0 : "bottom" === e2.barAlign && (r3 = h2 - n3), i2[g](v * (c + u), r3, c, n3, p), v = o3, f = 0, b = 0;
      }
      const a3 = Math.abs(n2[t3] || 0), d2 = Math.abs(r2[t3] || 0);
      a3 > f && (f = a3), d2 > b && (b = d2);
    }
    i2.fill(), i2.closePath();
  }
  renderLineWaveform(t2, e2, i2, s2) {
    const n2 = (e3) => {
      const n3 = t2[e3] || t2[0], r2 = n3.length, { height: o2 } = i2.canvas, a2 = o2 / 2, h2 = i2.canvas.width / r2;
      i2.moveTo(0, a2);
      let l2 = 0, d = 0;
      for (let t3 = 0; t3 <= r2; t3++) {
        const r3 = Math.round(t3 * h2);
        if (r3 > l2) {
          const t4 = a2 + (Math.round(d * a2 * s2) || 1) * (0 === e3 ? -1 : 1);
          i2.lineTo(l2, t4), l2 = r3, d = 0;
        }
        const o3 = Math.abs(n3[t3] || 0);
        o3 > d && (d = o3);
      }
      i2.lineTo(l2, a2);
    };
    i2.beginPath(), n2(0), n2(1), i2.fill(), i2.closePath();
  }
  renderWaveform(t2, e2, i2) {
    if (i2.fillStyle = this.convertColorValues(e2.waveColor), e2.renderFunction)
      return void e2.renderFunction(t2, i2);
    let s2 = e2.barHeight || 1;
    if (e2.normalize) {
      const e3 = Array.from(t2[0]).reduce((t3, e4) => Math.max(t3, Math.abs(e4)), 0);
      s2 = e3 ? 1 / e3 : 1;
    }
    e2.barWidth || e2.barGap || e2.barAlign ? this.renderBarWaveform(t2, e2, i2, s2) : this.renderLineWaveform(t2, e2, i2, s2);
  }
  renderSingleCanvas(t2, e2, i2, s2, n2, r2, o2, a2) {
    const h2 = window.devicePixelRatio || 1, l2 = document.createElement("canvas"), d = t2[0].length;
    l2.width = Math.round(i2 * (r2 - n2) / d), l2.height = s2 * h2, l2.style.width = `${Math.floor(l2.width / h2)}px`, l2.style.height = `${s2}px`, l2.style.left = `${Math.floor(n2 * i2 / h2 / d)}px`, o2.appendChild(l2);
    const c = l2.getContext("2d");
    if (this.renderWaveform(t2.map((t3) => t3.slice(n2, r2)), e2, c), l2.width > 0 && l2.height > 0) {
      const t3 = l2.cloneNode(), i3 = t3.getContext("2d");
      i3.drawImage(l2, 0, 0), i3.globalCompositeOperation = "source-in", i3.fillStyle = this.convertColorValues(e2.progressColor), i3.fillRect(0, 0, l2.width, l2.height), a2.appendChild(t3);
    }
  }
  renderChannel(t2, e2, i2) {
    const s2 = document.createElement("div"), n2 = this.getHeight(e2.height);
    s2.style.height = `${n2}px`, this.canvasWrapper.style.minHeight = `${n2}px`, this.canvasWrapper.appendChild(s2);
    const o2 = s2.cloneNode();
    this.progressWrapper.appendChild(o2);
    const { scrollLeft: a2, scrollWidth: h2, clientWidth: l2 } = this.scrollContainer, d = t2[0].length, c = d / h2;
    let u = Math.min(_r.MAX_CANVAS_WIDTH, l2);
    if (e2.barWidth || e2.barGap) {
      const t3 = e2.barWidth || 0.5, i3 = t3 + (e2.barGap || t3 / 2);
      u % i3 != 0 && (u = Math.floor(u / i3) * i3);
    }
    const p = Math.floor(Math.abs(a2) * c), m = Math.floor(p + u * c), g = m - p, v = (r2, a3) => {
      this.renderSingleCanvas(t2, e2, i2, n2, Math.max(0, r2), Math.min(a3, d), s2, o2);
    }, f = this.createDelay(), b = this.createDelay(), y = (t3, e3) => {
      v(t3, e3), t3 > 0 && f(() => {
        y(t3 - g, e3 - g);
      });
    }, C = (t3, e3) => {
      v(t3, e3), e3 < d && b(() => {
        C(t3 + g, e3 + g);
      });
    };
    y(p, m), m < d && C(m, m + g);
  }
  render(t2) {
    this.timeouts.forEach((t3) => t3.timeout && clearTimeout(t3.timeout)), this.timeouts = [], this.canvasWrapper.innerHTML = "", this.progressWrapper.innerHTML = "", null != this.options.width && (this.scrollContainer.style.width = "number" == typeof this.options.width ? `${this.options.width}px` : this.options.width);
    const e2 = window.devicePixelRatio || 1, i2 = this.scrollContainer.clientWidth, s2 = Math.ceil(t2.duration * (this.options.minPxPerSec || 0));
    this.isScrollable = s2 > i2;
    const n2 = this.options.fillParent && !this.isScrollable, r2 = (n2 ? i2 : s2) * e2;
    if (this.wrapper.style.width = n2 ? "100%" : `${s2}px`, this.scrollContainer.style.overflowX = this.isScrollable ? "auto" : "hidden", this.scrollContainer.classList.toggle("noScrollbar", !!this.options.hideScrollbar), this.cursor.style.backgroundColor = `${this.options.cursorColor || this.options.progressColor}`, this.cursor.style.width = `${this.options.cursorWidth}px`, this.options.splitChannels)
      for (let e3 = 0; e3 < t2.numberOfChannels; e3++) {
        const i3 = Object.assign(Object.assign({}, this.options), this.options.splitChannels[e3]);
        this.renderChannel([t2.getChannelData(e3)], i3, r2);
      }
    else {
      const e3 = [t2.getChannelData(0)];
      t2.numberOfChannels > 1 && e3.push(t2.getChannelData(1)), this.renderChannel(e3, this.options, r2);
    }
    this.audioData = t2, this.emit("render");
  }
  reRender() {
    if (!this.audioData)
      return;
    const { scrollWidth: t2 } = this.scrollContainer, e2 = this.progressWrapper.clientWidth;
    if (this.render(this.audioData), this.isScrollable && t2 !== this.scrollContainer.scrollWidth) {
      const t3 = this.progressWrapper.clientWidth;
      this.scrollContainer.scrollLeft += t3 - e2;
    }
  }
  zoom(t2) {
    this.options.minPxPerSec = t2, this.reRender();
  }
  scrollIntoView(t2, e2 = false) {
    const { scrollLeft: i2, scrollWidth: s2, clientWidth: n2 } = this.scrollContainer, r2 = t2 * s2, o2 = i2, a2 = i2 + n2, h2 = n2 / 2;
    if (this.isDragging) {
      const t3 = 30;
      r2 + t3 > a2 ? this.scrollContainer.scrollLeft += t3 : r2 - t3 < o2 && (this.scrollContainer.scrollLeft -= t3);
    } else {
      (r2 < o2 || r2 > a2) && (this.scrollContainer.scrollLeft = r2 - (this.options.autoCenter ? h2 : 0));
      const t3 = r2 - i2 - h2;
      e2 && this.options.autoCenter && t3 > 0 && (this.scrollContainer.scrollLeft += Math.min(t3, 10));
    }
    {
      const t3 = this.scrollContainer.scrollLeft, e3 = t3 / s2, i3 = (t3 + n2) / s2;
      this.emit("scroll", e3, i3);
    }
  }
  renderProgress(t2, e2) {
    if (isNaN(t2))
      return;
    const i2 = 100 * t2;
    this.canvasWrapper.style.clipPath = `polygon(${i2}% 0, 100% 0, 100% 100%, ${i2}% 100%)`, this.progressWrapper.style.width = `${i2}%`, this.cursor.style.left = `${i2}%`, this.cursor.style.marginLeft = 100 === Math.round(i2) ? `-${this.options.cursorWidth}px` : "", this.isScrollable && this.options.autoScroll && this.scrollIntoView(t2, e2);
  }
  exportImage(e2, i2, s2) {
    return t(this, void 0, void 0, function* () {
      const t2 = this.canvasWrapper.querySelectorAll("canvas");
      if (!t2.length)
        throw new Error("No waveform data");
      if ("dataURL" === s2) {
        const s3 = Array.from(t2).map((t3) => t3.toDataURL(e2, i2));
        return Promise.resolve(s3);
      }
      return Promise.all(Array.from(t2).map((t3) => new Promise((s3, n2) => {
        t3.toBlob((t4) => {
          t4 ? s3(t4) : n2(new Error("Could not export image"));
        }, e2, i2);
      })));
    });
  }
};
r.MAX_CANVAS_WIDTH = 4e3;
var o = class extends s {
  constructor() {
    super(...arguments), this.unsubscribe = () => {
    };
  }
  start() {
    this.unsubscribe = this.on("tick", () => {
      requestAnimationFrame(() => {
        this.emit("tick");
      });
    }), this.emit("tick");
  }
  stop() {
    this.unsubscribe();
  }
  destroy() {
    this.unsubscribe();
  }
};
var a = class extends s {
  constructor(t2 = new AudioContext()) {
    super(), this.bufferNode = null, this.autoplay = false, this.playStartTime = 0, this.playedDuration = 0, this._muted = false, this.buffer = null, this.currentSrc = "", this.paused = true, this.crossOrigin = null, this.addEventListener = this.on, this.removeEventListener = this.un, this.audioContext = t2, this.gainNode = this.audioContext.createGain(), this.gainNode.connect(this.audioContext.destination);
  }
  load() {
    return t(this, void 0, void 0, function* () {
    });
  }
  get src() {
    return this.currentSrc;
  }
  set src(t2) {
    if (this.currentSrc = t2, !t2)
      return this.buffer = null, void this.emit("emptied");
    fetch(t2).then((t3) => t3.arrayBuffer()).then((e2) => this.currentSrc !== t2 ? null : this.audioContext.decodeAudioData(e2)).then((e2) => {
      this.currentSrc === t2 && (this.buffer = e2, this.emit("loadedmetadata"), this.emit("canplay"), this.autoplay && this.play());
    });
  }
  _play() {
    var t2;
    this.paused && (this.paused = false, null === (t2 = this.bufferNode) || void 0 === t2 || t2.disconnect(), this.bufferNode = this.audioContext.createBufferSource(), this.bufferNode.buffer = this.buffer, this.bufferNode.connect(this.gainNode), this.playedDuration >= this.duration && (this.playedDuration = 0), this.bufferNode.start(this.audioContext.currentTime, this.playedDuration), this.playStartTime = this.audioContext.currentTime, this.bufferNode.onended = () => {
      this.currentTime >= this.duration && (this.pause(), this.emit("ended"));
    });
  }
  _pause() {
    var t2;
    this.paused || (this.paused = true, null === (t2 = this.bufferNode) || void 0 === t2 || t2.stop(), this.playedDuration += this.audioContext.currentTime - this.playStartTime);
  }
  play() {
    return t(this, void 0, void 0, function* () {
      this._play(), this.emit("play");
    });
  }
  pause() {
    this._pause(), this.emit("pause");
  }
  stopAt(t2) {
    var e2, i2;
    const s2 = t2 - this.currentTime;
    null === (e2 = this.bufferNode) || void 0 === e2 || e2.stop(this.audioContext.currentTime + s2), null === (i2 = this.bufferNode) || void 0 === i2 || i2.addEventListener("ended", () => {
      this.bufferNode = null, this.pause();
    }, { once: true });
  }
  setSinkId(e2) {
    return t(this, void 0, void 0, function* () {
      return this.audioContext.setSinkId(e2);
    });
  }
  get playbackRate() {
    var t2, e2;
    return null !== (e2 = null === (t2 = this.bufferNode) || void 0 === t2 ? void 0 : t2.playbackRate.value) && void 0 !== e2 ? e2 : 1;
  }
  set playbackRate(t2) {
    this.bufferNode && (this.bufferNode.playbackRate.value = t2);
  }
  get currentTime() {
    return this.paused ? this.playedDuration : this.playedDuration + this.audioContext.currentTime - this.playStartTime;
  }
  set currentTime(t2) {
    this.emit("seeking"), this.paused ? this.playedDuration = t2 : (this._pause(), this.playedDuration = t2, this._play()), this.emit("timeupdate");
  }
  get duration() {
    var t2;
    return (null === (t2 = this.buffer) || void 0 === t2 ? void 0 : t2.duration) || 0;
  }
  get volume() {
    return this.gainNode.gain.value;
  }
  set volume(t2) {
    this.gainNode.gain.value = t2, this.emit("volumechange");
  }
  get muted() {
    return this._muted;
  }
  set muted(t2) {
    this._muted !== t2 && (this._muted = t2, this._muted ? this.gainNode.disconnect() : this.gainNode.connect(this.audioContext.destination));
  }
  getGainNode() {
    return this.gainNode;
  }
  getChannelData() {
    const t2 = [];
    if (!this.buffer)
      return t2;
    const e2 = this.buffer.numberOfChannels;
    for (let i2 = 0; i2 < e2; i2++)
      t2.push(this.buffer.getChannelData(i2));
    return t2;
  }
};
var h = { waveColor: "#999", progressColor: "#555", cursorWidth: 1, minPxPerSec: 0, fillParent: true, interact: true, dragToSeek: false, autoScroll: true, autoCenter: true, sampleRate: 8e3 };
var l = class _l extends n {
  static create(t2) {
    return new _l(t2);
  }
  constructor(t2) {
    const e2 = t2.media || ("WebAudio" === t2.backend ? new a() : void 0);
    super({ media: e2, mediaControls: t2.mediaControls, autoplay: t2.autoplay, playbackRate: t2.audioRate }), this.plugins = [], this.decodedData = null, this.subscriptions = [], this.mediaSubscriptions = [], this.options = Object.assign({}, h, t2), this.timer = new o();
    const i2 = e2 ? void 0 : this.getMediaElement();
    this.renderer = new r(this.options, i2), this.initPlayerEvents(), this.initRendererEvents(), this.initTimerEvents(), this.initPlugins(), Promise.resolve().then(() => {
      this.emit("init");
      const t3 = this.options.url || this.getSrc() || "";
      (t3 || this.options.peaks && this.options.duration) && this.load(t3, this.options.peaks, this.options.duration);
    });
  }
  initTimerEvents() {
    this.subscriptions.push(this.timer.on("tick", () => {
      const t2 = this.getCurrentTime();
      this.renderer.renderProgress(t2 / this.getDuration(), true), this.emit("timeupdate", t2), this.emit("audioprocess", t2);
    }));
  }
  initPlayerEvents() {
    this.isPlaying() && (this.emit("play"), this.timer.start()), this.mediaSubscriptions.push(this.onMediaEvent("timeupdate", () => {
      const t2 = this.getCurrentTime();
      this.renderer.renderProgress(t2 / this.getDuration(), this.isPlaying()), this.emit("timeupdate", t2);
    }), this.onMediaEvent("play", () => {
      this.emit("play"), this.timer.start();
    }), this.onMediaEvent("pause", () => {
      this.emit("pause"), this.timer.stop();
    }), this.onMediaEvent("emptied", () => {
      this.timer.stop();
    }), this.onMediaEvent("ended", () => {
      this.emit("finish");
    }), this.onMediaEvent("seeking", () => {
      this.emit("seeking", this.getCurrentTime());
    }));
  }
  initRendererEvents() {
    this.subscriptions.push(this.renderer.on("click", (t2, e2) => {
      this.options.interact && (this.seekTo(t2), this.emit("interaction", t2 * this.getDuration()), this.emit("click", t2, e2));
    }), this.renderer.on("dblclick", (t2, e2) => {
      this.emit("dblclick", t2, e2);
    }), this.renderer.on("scroll", (t2, e2) => {
      const i2 = this.getDuration();
      this.emit("scroll", t2 * i2, e2 * i2);
    }), this.renderer.on("render", () => {
      this.emit("redraw");
    }));
    {
      let t2;
      this.subscriptions.push(this.renderer.on("drag", (e2) => {
        this.options.interact && (this.renderer.renderProgress(e2), clearTimeout(t2), t2 = setTimeout(() => {
          this.seekTo(e2);
        }, this.isPlaying() ? 0 : 200), this.emit("interaction", e2 * this.getDuration()), this.emit("drag", e2));
      }));
    }
  }
  initPlugins() {
    var t2;
    (null === (t2 = this.options.plugins) || void 0 === t2 ? void 0 : t2.length) && this.options.plugins.forEach((t3) => {
      this.registerPlugin(t3);
    });
  }
  unsubscribePlayerEvents() {
    this.mediaSubscriptions.forEach((t2) => t2()), this.mediaSubscriptions = [];
  }
  setOptions(t2) {
    this.options = Object.assign({}, this.options, t2), this.renderer.setOptions(this.options), t2.audioRate && this.setPlaybackRate(t2.audioRate), null != t2.mediaControls && (this.getMediaElement().controls = t2.mediaControls);
  }
  registerPlugin(t2) {
    return t2._init(this), this.plugins.push(t2), this.subscriptions.push(t2.once("destroy", () => {
      this.plugins = this.plugins.filter((e2) => e2 !== t2);
    })), t2;
  }
  getWrapper() {
    return this.renderer.getWrapper();
  }
  getScroll() {
    return this.renderer.getScroll();
  }
  getActivePlugins() {
    return this.plugins;
  }
  loadAudio(s2, n2, r2, o2) {
    return t(this, void 0, void 0, function* () {
      if (this.emit("load", s2), !this.options.media && this.isPlaying() && this.pause(), this.decodedData = null, !n2 && !r2) {
        const t3 = (t4) => this.emit("loading", t4);
        n2 = yield i.fetchBlob(s2, t3, this.options.fetchParams);
      }
      this.setSrc(s2, n2);
      const t2 = o2 || this.getDuration() || (yield new Promise((t3) => {
        this.onceMediaEvent("loadedmetadata", () => t3(this.getDuration()));
      }));
      if (r2)
        this.decodedData = e.createBuffer(r2, t2 || 0);
      else if (n2) {
        const t3 = yield n2.arrayBuffer();
        this.decodedData = yield e.decode(t3, this.options.sampleRate);
      }
      this.decodedData && (this.emit("decode", this.getDuration()), this.renderer.render(this.decodedData)), this.emit("ready", this.getDuration());
    });
  }
  load(e2, i2, s2) {
    return t(this, void 0, void 0, function* () {
      yield this.loadAudio(e2, void 0, i2, s2);
    });
  }
  loadBlob(e2, i2, s2) {
    return t(this, void 0, void 0, function* () {
      yield this.loadAudio("blob", e2, i2, s2);
    });
  }
  zoom(t2) {
    if (!this.decodedData)
      throw new Error("No audio loaded");
    this.renderer.zoom(t2), this.emit("zoom", t2);
  }
  getDecodedData() {
    return this.decodedData;
  }
  exportPeaks({ channels: t2 = 2, maxLength: e2 = 8e3, precision: i2 = 1e4 } = {}) {
    if (!this.decodedData)
      throw new Error("The audio has not been decoded yet");
    const s2 = Math.min(t2, this.decodedData.numberOfChannels), n2 = [];
    for (let t3 = 0; t3 < s2; t3++) {
      const s3 = this.decodedData.getChannelData(t3), r2 = [], o2 = Math.round(s3.length / e2);
      for (let t4 = 0; t4 < e2; t4++) {
        const e3 = s3.slice(t4 * o2, (t4 + 1) * o2);
        let n3 = 0;
        for (let t5 = 0; t5 < e3.length; t5++) {
          const i3 = e3[t5];
          Math.abs(i3) > Math.abs(n3) && (n3 = i3);
        }
        r2.push(Math.round(n3 * i2) / i2);
      }
      n2.push(r2);
    }
    return n2;
  }
  getDuration() {
    let t2 = super.getDuration() || 0;
    return 0 !== t2 && t2 !== 1 / 0 || !this.decodedData || (t2 = this.decodedData.duration), t2;
  }
  toggleInteraction(t2) {
    this.options.interact = t2;
  }
  seekTo(t2) {
    const e2 = this.getDuration() * t2;
    this.setTime(e2);
  }
  playPause() {
    return t(this, void 0, void 0, function* () {
      return this.isPlaying() ? this.pause() : this.play();
    });
  }
  stop() {
    this.pause(), this.setTime(0);
  }
  skip(t2) {
    this.setTime(this.getCurrentTime() + t2);
  }
  empty() {
    this.load("", [[0]], 1e-3);
  }
  setMediaElement(t2) {
    this.unsubscribePlayerEvents(), super.setMediaElement(t2), this.initPlayerEvents();
  }
  exportImage(e2 = "image/png", i2 = 1, s2 = "dataURL") {
    return t(this, void 0, void 0, function* () {
      return this.renderer.exportImage(e2, i2, s2);
    });
  }
  destroy() {
    this.emit("destroy"), this.plugins.forEach((t2) => t2.destroy()), this.subscriptions.forEach((t2) => t2()), this.unsubscribePlayerEvents(), this.timer.destroy(), this.renderer.destroy(), super.destroy();
  }
};
export {
  l as default
};
/*! Bundled license information:

wavesurfer.js/dist/wavesurfer.esm.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)
*/
//# sourceMappingURL=wavesurfer__js.js.map
