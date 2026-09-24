import { useLayoutEffect, useRef, useState } from "react";
import figure_c0dd0fbc from "./assets/images/figure-c0dd0fbc.png";
import figure_6abb3607 from "./assets/images/figure-6abb3607.png";
import figure_400b808d from "./assets/images/figure-400b808d.png";
import figure_9de91a0f from "./assets/images/figure-9de91a0f.png";
import colors14Pro from "./assets/images/iphone-14-pro-available-in-deep-purple-gold-silv-c0458682.png";
import colors14 from "./assets/images/iphone-14-available-in-blue-purple-yellow-midnig-3b13a11a.png";
import colors13 from "./assets/images/iphone-13-available-in-green-pink-blue-midnight--a842fc35.png";
import colorsSe from "./assets/images/iphone-se-available-in-midnight-starlight-and-pr-21c3e934.png";
import { pages, shop } from "./pageActions";

const COMPARE_DEFAULT_H = 2313.75;
const COMPARE_TOP = 3540;
const AFTER_TOP = COMPARE_TOP + COMPARE_DEFAULT_H;
const PAGE_HEIGHT = 18663.27;
const MAIN_HEIGHT = 15528.14;
const FOOTER_TOP = 15688.14;

const PHONES = [
  {
    id: "14pro",
    name: "iPhone 14 Pro",
    tagline: "The ultimate iPhone.",
    price: "From $999",
    isNew: true,
    image: figure_c0dd0fbc,
    colors: colors14Pro,
    buyHref: shop.iphone14pro,
    learnHref: pages.iphone14pro,
    details: [
      { label: "Display", text: "6.7″ or 6.1″ Super Retina XDR display. ProMotion technology. Always-On display." },
      { label: "Dynamic Island", text: "A new way to interact with iPhone." },
      { label: "Safety", text: "Emergency SOS via satellite. Emergency SOS. Crash Detection." },
      { label: "Camera", text: "Pro camera system — 48MP Main | Ultra Wide | Telephoto. Photonic Engine. Autofocus on TrueDepth front camera." },
      { label: "Video", text: "Action mode smooths out shaky handheld videos." },
      { label: "Battery", text: "Up to 29 hours video playback." },
      { label: "Chip", text: "A16 Bionic chip." },
      { label: "Security", text: "Face ID." },
      { label: "Cellular", text: "Superfast 5G cellular." },
    ],
  },
  {
    id: "14",
    name: "iPhone 14",
    tagline: "A total powerhouse.",
    price: "From $799*",
    isNew: true,
    image: figure_6abb3607,
    colors: colors14,
    buyHref: shop.iphone14,
    learnHref: pages.iphone14,
    details: [
      { label: "Display", text: "6.7″ or 6.1″ Super Retina XDR display." },
      { label: "Safety", text: "Emergency SOS via satellite. Emergency SOS. Crash Detection." },
      { label: "Camera", text: "Advanced dual-camera system — 12MP Main | Ultra Wide. Photonic Engine. Autofocus on TrueDepth front camera." },
      { label: "Video", text: "Action mode smooths out shaky handheld videos." },
      { label: "Battery", text: "Up to 26 hours video playback." },
      { label: "Chip", text: "A15 Bionic chip with 5-core GPU." },
      { label: "Security", text: "Face ID." },
      { label: "Cellular", text: "Superfast 5G cellular." },
    ],
  },
  {
    id: "13",
    name: "iPhone 13",
    tagline: "As amazing as ever.",
    price: "From $599*",
    isNew: false,
    image: figure_400b808d,
    colors: colors13,
    buyHref: shop.iphone13,
    learnHref: pages.iphone13,
    details: [
      { label: "Display", text: "6.1″ or 5.4″ Super Retina XDR display." },
      { label: "Safety", text: "Emergency SOS." },
      { label: "Camera", text: "Dual-camera system — 12MP Main | Ultra Wide. TrueDepth front camera." },
      { label: "Battery", text: "Up to 19 hours video playback." },
      { label: "Chip", text: "A15 Bionic chip with 4-core GPU." },
      { label: "Security", text: "Face ID." },
      { label: "Cellular", text: "Superfast 5G cellular." },
    ],
  },
  {
    id: "se",
    name: "iPhone SE",
    tagline: "Serious power. Serious value.",
    price: "From $429",
    isNew: false,
    image: figure_9de91a0f,
    colors: colorsSe,
    buyHref: shop.iphoneSe,
    learnHref: pages.iphoneSe,
    details: [
      { label: "Display", text: "4.7″ Retina HD display." },
      { label: "Safety", text: "Emergency SOS." },
      { label: "Camera", text: "Advanced camera system — 12MP Main. Front camera." },
      { label: "Battery", text: "Up to 15 hours video playback." },
      { label: "Chip", text: "A15 Bionic chip with 4-core GPU." },
      { label: "Security", text: "Touch ID." },
      { label: "Cellular", text: "5G cellular." },
    ],
  },
];

function pageScale(page) {
  const match = /scale\(([^)]+)\)/.exec(page.style.transform || "");
  if (match) return parseFloat(match[1]) || 1;
  return Math.min(1, window.innerWidth / 1440);
}

function clearCompareLayout() {
  const section = document.querySelector(".main-main-section-318");
  const page = document.querySelector(".apple-04");
  const fit = document.querySelector(".apple-04-fit");
  const mainRoot = document.querySelector(".main-main-main-main-1");
  const footer = document.querySelector(".apple-04__footer");

  delete document.documentElement.dataset.compareDelta;

  if (section) {
    section.style.height = "";
    section.style.overflow = "";
    section.style.zIndex = "";
  }
  if (mainRoot) {
    mainRoot.style.height = "";
    [...mainRoot.children].forEach((child) => {
      if (child.dataset.compareOriginalTop != null) {
        child.style.top = "";
        delete child.dataset.compareOriginalTop;
      }
    });
  }
  if (footer) footer.style.top = "";
  if (page) page.style.height = "";
  if (fit && page) {
    fit.style.height = `${PAGE_HEIGHT * pageScale(page)}px`;
  }
}

let syncingCompare = false;

function syncCompareLayout(rootEl) {
  if (syncingCompare) return;
  const section = rootEl?.closest(".main-main-section-318");
  const page = document.querySelector(".apple-04");
  const fit = document.querySelector(".apple-04-fit");
  const mainRoot = document.querySelector(".main-main-main-main-1");
  const footer = document.querySelector(".apple-04__footer");
  if (!section || !page || !mainRoot || !rootEl) return;

  if (!document.documentElement.classList.contains("website-mobile")) {
    clearCompareLayout();
    return;
  }

  syncingCompare = true;
  try {
    const compareTop = Number.parseFloat(getComputedStyle(rootEl).top) || 64;
    const needed = Math.ceil(compareTop + rootEl.offsetHeight + 24);
    const delta = needed - COMPARE_DEFAULT_H;
    const heightValue = `${needed}px`;
    const deltaValue = String(delta);

    if (section.style.height !== heightValue) {
      section.style.height = heightValue;
    }
    section.style.overflow = "visible";
    section.style.zIndex = "2";
    if (document.documentElement.dataset.compareDelta !== deltaValue) {
      document.documentElement.dataset.compareDelta = deltaValue;
    }

    [...mainRoot.children].forEach((child) => {
      if (child === section) return;
      if (child.dataset.compareOriginalTop == null) {
        child.dataset.compareOriginalTop = String(Number.parseFloat(getComputedStyle(child).top) || 0);
      }
      const original = Number.parseFloat(child.dataset.compareOriginalTop);
      if (original >= AFTER_TOP - 1) {
        const nextTop = `${original + delta}px`;
        if (child.style.top !== nextTop) child.style.top = nextTop;
      }
    });

    const mainH = `${MAIN_HEIGHT + delta}px`;
    const pageH = `${PAGE_HEIGHT + delta}px`;
    const footerTop = `${FOOTER_TOP + delta}px`;
    const fitH = `${(PAGE_HEIGHT + delta) * pageScale(page)}px`;
    if (mainRoot.style.height !== mainH) mainRoot.style.height = mainH;
    if (page.style.height !== pageH) page.style.height = pageH;
    if (footer && footer.style.top !== footerTop) footer.style.top = footerTop;
    if (fit && fit.style.height !== fitH) fit.style.height = fitH;
  } finally {
    syncingCompare = false;
  }
}

function MobileCompareCards() {
  const [openId, setOpenId] = useState(null);
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    let frame = 0;
    const run = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => syncCompareLayout(root));
    };
    run();
    // App toggles website-mobile in useEffect (after layout); re-sync when class appears.
    const mo = new MutationObserver(run);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    window.addEventListener("resize", run);
    window.visualViewport?.addEventListener("resize", run);
    const soft = window.setTimeout(run, 0);
    return () => {
      window.clearTimeout(soft);
      cancelAnimationFrame(frame);
      mo.disconnect();
      window.removeEventListener("resize", run);
      window.visualViewport?.removeEventListener("resize", run);
      clearCompareLayout();
    };
  }, [openId]);

  return (
    <div
      ref={rootRef}
      className="mobile-compare"
      aria-label="Which iPhone is right for you"
    >
      <h2 className="mobile-compare__title">Which iPhone is right for you?</h2>
      <div className="mobile-compare__list">
        {PHONES.map((phone) => {
          const open = openId === phone.id;
          return (
            <article
              key={phone.id}
              className={`mobile-compare__card${open ? " is-open" : ""}`}
            >
              <button
                type="button"
                className="mobile-compare__header"
                aria-expanded={open}
                onClick={() => setOpenId(open ? null : phone.id)}
              >
                <img className="mobile-compare__phone" src={phone.image} alt="" />
                <div className="mobile-compare__summary">
                  {phone.isNew ? <span className="mobile-compare__new">New</span> : null}
                  <span className="mobile-compare__name">{phone.name}</span>
                  <span className="mobile-compare__tagline">{phone.tagline}</span>
                  <span className="mobile-compare__price">{phone.price}</span>
                </div>
                <span className="mobile-compare__chevron" aria-hidden="true" />
              </button>
              {open ? (
                <div className="mobile-compare__details">
                  <img className="mobile-compare__colors" src={phone.colors} alt="" />
                  <ul className="mobile-compare__specs">
                    {phone.details.map((row) => (
                      <li key={row.label}>
                        <strong>{row.label}</strong>
                        <span>{row.text}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mobile-compare__actions">
                    <a className="mobile-compare__buy" href={phone.buyHref} target="_blank" rel="noreferrer">
                      Buy
                    </a>
                    <a className="mobile-compare__learn" href={phone.learnHref} target="_blank" rel="noreferrer">
                      Learn more
                    </a>
                  </div>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
      <div className="mobile-compare__links">
        <a href="https://www.apple.com/iphone/compare/" target="_blank" rel="noreferrer">
          Compare all iPhone models
        </a>
        <a href={shop.iphone14} target="_blank" rel="noreferrer">
          Shop iPhone
        </a>
      </div>
    </div>
  );
}

export default MobileCompareCards;
