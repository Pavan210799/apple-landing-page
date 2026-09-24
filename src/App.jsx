import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import UlGlobalnavList from "./generated/UlGlobalnavList";
import NavChapternav from "./generated/NavChapternav";
import MainMain from "./generated/MainMain";
import FooterAcGlobalfooter from "./generated/FooterAcGlobalfooter";
import { findAction, prepareActions, releaseScrollContainers, scrollToSelector, searchJumps } from "./pageActions";
import "./website-responsive.css";

const PAGE_WIDTH = 1440;
const PAGE_HEIGHT = 18663.27;
const WEBSITE_COMPACT_MAX = 1024;
const WEBSITE_MOBILE_MAX = 767;
/** Tablet: mild zoom for readability. Phone uses exact fit-to-width. */
const TABLET_SCALE_WIDTH = 1240;

const riseSelectors = [
  ".main-main-div-3",
  ".main-main-div-18",
  ".main-main-div-32",
  ".main-main-section-47",
  ".main-main-section-318",
  ".main-main-ways-to-save-on-iphone-60",
  ".main-main-div-62",
  ".main-main-div-72",
  ".main-main-div-92",
  ".main-main-div-101",
  ".main-main-h2-109",
  ".main-main-div-111",
  ".main-main-div-119",
  ".main-main-div-131",
  ".main-main-section-141",
  ".main-main-div-168",
  ".main-main-div-175",
  ".main-main-get-more-out-of-your-iphone-186",
  ".main-main-div-188",
  ".main-main-div-200",
  ".main-main-div-music-gallery-244",
  ".main-main-div-263",
  ".main-main-div-270",
  ".main-main-div-284",
  ".main-main-div-298",
  ".main-main-div-309",
  ".footer-ac-globalfooter-footer-ac-globalfooter-1",
];

function openHref(href) {
  if (href.startsWith("tel:")) {
    window.location.href = href;
    return;
  }
  window.open(href, "_blank", "noopener,noreferrer");
}

function PageSheet({ title, children, onClose }) {
  return (
    <div
      className="page-overlay"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="page-sheet" role="dialog" aria-modal="true" aria-label={title}>
        <div className="page-sheet-bar">
          <h2>{title}</h2>
          <button className="page-sheet-close" type="button" onClick={onClose}>
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function App() {
  const fitRef = useRef(null);
  const pageRef = useRef(null);
  const scaleRef = useRef(1);
  const [panel, setPanel] = useState(null);
  const [query, setQuery] = useState("");
  const [globalNavOpen, setGlobalNavOpen] = useState(false);

  const jumps = useMemo(() => {
    const text = query.trim().toLowerCase();
    if (!text) return searchJumps;
    return searchJumps.filter((item) => item.label.toLowerCase().includes(text));
  }, [query]);

  useEffect(() => {
    const fit = fitRef.current;
    const page = pageRef.current;

    const apply = () => {
      const viewport = Math.min(
        window.innerWidth,
        document.documentElement.clientWidth,
        window.visualViewport?.width ?? window.innerWidth,
      );
      const compact = viewport <= WEBSITE_COMPACT_MAX;
      const mobile = viewport <= WEBSITE_MOBILE_MAX;
      document.documentElement.classList.toggle("website-compact", compact);
      document.documentElement.classList.toggle("website-mobile", mobile);
      if (!compact) setGlobalNavOpen(false);
      const scaleWidth = !mobile && compact ? TABLET_SCALE_WIDTH : PAGE_WIDTH;
      const scale = Math.min(1, viewport / scaleWidth);
      scaleRef.current = scale;
      const compareDelta = mobile
        ? Number.parseFloat(document.documentElement.dataset.compareDelta || "0") || 0
        : 0;
      if (!mobile) delete document.documentElement.dataset.compareDelta;
      page.style.transform = `scale(${scale})`;
      page.style.height = `${PAGE_HEIGHT + compareDelta}px`;
      fit.style.height = `${(PAGE_HEIGHT + compareDelta) * scale}px`;
      fit.style.width = "100%";
      fit.style.maxWidth = "none";
      fit.style.margin = "0";

      const nav = page.querySelector(".apple-04__globalnav");
      if (nav) {
        if (compact) nav.style.top = "";
        else nav.style.top = `${window.scrollY / scale}px`;
      }
    };

    apply();
    window.addEventListener("resize", apply);
    window.visualViewport?.addEventListener("resize", apply);
    const observer = new ResizeObserver(apply);
    observer.observe(document.documentElement);
    return () => {
      window.removeEventListener("resize", apply);
      window.visualViewport?.removeEventListener("resize", apply);
      observer.disconnect();
    };
  }, []);

  /* Desktop: pin top navbar while scrolling (sticky fails under transform: scale). */
  useEffect(() => {
    const page = pageRef.current;
    if (!page) return undefined;

    const pinNav = () => {
      const nav = page.querySelector(".apple-04__globalnav");
      if (!nav) return;
      if (document.documentElement.classList.contains("website-compact")) {
        nav.style.top = "";
        return;
      }
      const scale = scaleRef.current || 1;
      nav.style.top = `${window.scrollY / scale}px`;
    };

    pinNav();
    window.addEventListener("scroll", pinNav, { passive: true });
    return () => {
      window.removeEventListener("scroll", pinNav);
      const nav = page.querySelector(".apple-04__globalnav");
      if (nav) nav.style.top = "";
    };
  }, []);

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const nodes = riseSelectors.flatMap((selector) => [...page.querySelectorAll(selector)]);
    nodes.forEach((node) => node.classList.add("scroll-rise"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-in", entry.isIntersecting);
        });
      },
      { threshold: 0.15 },
    );
    nodes.forEach((node) => observer.observe(node));

    return () => {
      observer.disconnect();
      nodes.forEach((node) => node.classList.remove("scroll-rise", "is-in"));
    };
  }, []);

  useEffect(() => {
    const page = pageRef.current;
    prepareActions(page);

    const run = (action) => {
      if (action.panel) {
        setQuery("");
        setPanel(action.panel);
        return;
      }
      if (action.scroll) {
        scrollToSelector(action.scroll);
        return;
      }
      if (action.href) openHref(action.href);
    };

    const onMouseDown = (event) => {
      if (!findAction(event.target)) return;
      event.preventDefault();
    };

    const onClick = (event) => {
      const action = findAction(event.target);
      if (!action) return;
      event.preventDefault();
      releaseScrollContainers(event.target);
      run(action);
    };

    const onKeyDown = (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      if (event.target.closest("button")) return;
      const action = findAction(event.target);
      if (!action) return;
      event.preventDefault();
      releaseScrollContainers(event.target);
      run(action);
    };

    page.addEventListener("mousedown", onMouseDown);
    page.addEventListener("click", onClick);
    page.addEventListener("keydown", onKeyDown);
    return () => {
      page.removeEventListener("mousedown", onMouseDown);
      page.removeEventListener("click", onClick);
      page.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!panel) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => {
      if (event.key === "Escape") setPanel(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [panel]);

  useEffect(() => {
    if (!globalNavOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setGlobalNavOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [globalNavOpen]);

  return (
    <>
    <div
      className={`apple-04-fit${globalNavOpen ? " is-globalnav-open" : ""}`}
      ref={fitRef}
    >
    <div className="apple-04" ref={pageRef}>
      <div className="apple-04__globalnav">
        <button
          type="button"
          className="website-globalnav-toggle"
          aria-label={globalNavOpen ? "Close menu" : "Open menu"}
          aria-expanded={globalNavOpen}
          onClick={() => setGlobalNavOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <UlGlobalnavList />
      </div>
      <div className="apple-04__chapternav">
        <NavChapternav />
      </div>
      <div className="apple-04__main">
        <MainMain />
      </div>
      <div className="apple-04__footer">
        <FooterAcGlobalfooter />
      </div>
    </div>
    </div>
    {panel === "search" && (
      <PageSheet title="Search" onClose={() => setPanel(null)}>
        <p>Jump to a section on this page.</p>
        <input
          autoFocus
          value={query}
          placeholder="iPhone, AirPods, Card…"
          onChange={(event) => setQuery(event.target.value)}
        />
        <ul>
          {jumps.map((item) => (
            <li key={item.label}>
              <button
                className="page-sheet-jump"
                type="button"
                onClick={() => {
                  setPanel(null);
                  scrollToSelector(item.scroll);
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
          {jumps.length === 0 && <li>No matching sections.</li>}
        </ul>
      </PageSheet>
    )}
    {panel === "bag" && (
      <PageSheet title="Bag" onClose={() => setPanel(null)}>
        <p>Your bag is empty.</p>
        <a className="page-sheet-link" href="https://www.apple.com/shop/bag" target="_blank" rel="noreferrer">
          Review bag on apple.com
        </a>
      </PageSheet>
    )}
    {panel === "film" && (
      <PageSheet title="Watch the film" onClose={() => setPanel(null)}>
        <p>The guided tour plays on Apple’s iPhone 14 Pro page.</p>
        <a className="page-sheet-primary" href="https://www.apple.com/iphone-14-pro/" target="_blank" rel="noreferrer">
          Open film page
        </a>
      </PageSheet>
    )}
    {panel === "region" && (
      <PageSheet title="United States" onClose={() => setPanel(null)}>
        <p>You’re viewing the United States store.</p>
      </PageSheet>
    )}
    </>
  );
}

export default App;
