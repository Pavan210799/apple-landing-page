import { useLayoutEffect, useRef, useState } from "react";
import { pages, shop } from "./pageActions";
import "./WebsiteMobileFooter.css";

const FOOTER_TOP_DESKTOP = 15688.14;
const PAGE_HEIGHT = 18663.27;

const footerGroups = [
  ["Shop and Learn", [
    ["Store", pages.store],
    ["Mac", pages.mac],
    ["iPad", pages.ipad],
    ["iPhone", pages.iphone],
    ["Watch", pages.watch],
    ["AirPods", pages.airpods],
    ["TV & Home", pages.tvHome],
    ["AirTag", pages.airtag],
    ["Accessories", shop.accessories],
    ["Gift Cards", shop.gift],
  ]],
  ["Apple Wallet", [
    ["Wallet", pages.wallet],
    ["Apple Card", pages.card],
    ["Apple Pay", pages.pay],
    ["Apple Cash", pages.cash],
  ]],
  ["Account", [
    ["Manage Your Apple ID", pages.appleId],
    ["Apple Store Account", pages.account],
    ["iCloud.com", pages.icloud],
  ]],
  ["Entertainment", [
    ["Apple One", pages.one],
    ["Apple TV+", pages.tv],
    ["Apple Music", pages.music],
    ["Apple Arcade", pages.arcade],
    ["Apple Fitness+", pages.fitness],
    ["Apple News+", pages.news],
  ]],
  ["Apple Store", [
    ["Find a Store", pages.stores],
    ["Today at Apple", pages.today],
    ["Apple Trade In", shop.trade],
    ["Financing", shop.finance],
    ["Carrier Deals", shop.deals],
    ["Order Status", pages.account],
  ]],
  ["About Apple", [
    ["Newsroom", pages.events],
    ["Apple Leadership", pages.leadership],
    ["Career Opportunities", pages.jobs],
    ["Investors", pages.investors],
    ["Ethics & Compliance", pages.ethics],
    ["Events", pages.events],
    ["Contact Apple", pages.contact],
  ]],
];

function pageScale(page) {
  const transform = page?.style?.transform || "";
  const match = transform.match(/scale\(([^)]+)\)/);
  return match ? Number.parseFloat(match[1]) || 1 : 1;
}

function researchBottomInPage() {
  const research = document.querySelector(".main-main-div-309");
  const page = document.querySelector(".apple-04");
  if (!research || !page) return FOOTER_TOP_DESKTOP;
  const scale = pageScale(page);
  const pageRect = page.getBoundingClientRect();
  const researchRect = research.getBoundingClientRect();
  const topInPage = (researchRect.bottom - pageRect.top) / scale;
  return Math.ceil(topInPage + 48);
}

let syncingFooter = false;

export function syncWebsiteMobileFooter() {
  if (syncingFooter) return;
  const host = document.querySelector(".apple-04__footer--mobile");
  const page = document.querySelector(".apple-04");
  const fit = document.querySelector(".apple-04-fit");
  if (!host || !page) return;

  if (!document.documentElement.classList.contains("website-phone-footer")) {
    host.style.top = "";
    host.style.height = "";
    delete document.documentElement.dataset.mobileFooterTop;
    delete document.documentElement.dataset.mobileFooterHeight;
    delete document.documentElement.dataset.mobileFooterDelta;
    return;
  }

  syncingFooter = true;
  try {
    const top = researchBottomInPage();
    const height = Math.max(host.scrollHeight || host.offsetHeight || 900, 900);
    const pageH = top + height + 40;
    const delta = pageH - PAGE_HEIGHT;
    const topValue = `${top}px`;
    const heightValue = `${height}px`;
    const pageValue = `${pageH}px`;
    const fitValue = `${pageH * pageScale(page)}px`;

    if (host.style.top !== topValue) host.style.top = topValue;
    if (host.style.height !== heightValue) host.style.height = heightValue;
    document.documentElement.dataset.mobileFooterTop = String(top);
    document.documentElement.dataset.mobileFooterHeight = String(height);
    document.documentElement.dataset.mobileFooterDelta = String(delta);
    if (page.style.height !== pageValue) page.style.height = pageValue;
    if (fit && fit.style.height !== fitValue) fit.style.height = fitValue;
  } finally {
    syncingFooter = false;
  }
}

export default function WebsiteMobileFooter({ onOpenLegal, onOpenRegion }) {
  const [openGroup, setOpenGroup] = useState(null);
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    let frame = 0;
    const run = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => syncWebsiteMobileFooter());
    };

    run();
    const ro = new ResizeObserver(run);
    ro.observe(root);
    window.addEventListener("resize", run);
    const mo = new MutationObserver(run);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-compare-delta"] });

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("resize", run);
    };
  }, [openGroup]);

  return (
    <div className="website-mobile-footer" ref={rootRef}>
      <button
        type="button"
        className="website-mobile-footer__legal-btn"
        onClick={onOpenLegal}
      >
        View legal footnotes
      </button>

      <div className="website-mobile-footer__directory">
        {footerGroups.map(([title, items]) => {
          const isOpen = openGroup === title;
          return (
            <div key={title} className={`website-mobile-footer__group${isOpen ? " is-open" : ""}`}>
              <button
                type="button"
                className="website-mobile-footer__head"
                aria-expanded={isOpen}
                onClick={() => setOpenGroup(isOpen ? null : title)}
              >
                <span>{title}</span>
                <span className="website-mobile-footer__mark" aria-hidden="true">
                  {isOpen ? "–" : "+"}
                </span>
              </button>
              {isOpen ? (
                <div className="website-mobile-footer__links">
                  {items.map(([label, url]) => (
                    <a key={label} href={url} target="_blank" rel="noreferrer">
                      {label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <p className="website-mobile-footer__shop">
        More ways to shop:{" "}
        <a href={pages.stores} target="_blank" rel="noreferrer">Find an Apple Store</a>
        {" "}or{" "}
        <a href={pages.retail} target="_blank" rel="noreferrer">other retailer</a>
        {" "}near you. Or call 1-800-MY-APPLE.
      </p>

      <p className="website-mobile-footer__copy">Copyright © 2026 Apple Inc. All rights reserved.</p>

      <div className="website-mobile-footer__meta">
        {[
          ["Privacy Policy", pages.privacyFooter],
          ["Terms of Use", pages.terms],
          ["Sales and Refunds", pages.sales],
          ["Legal", pages.legal],
          ["Site Map", pages.sitemap],
        ].map(([label, url]) => (
          <a key={label} href={url} target="_blank" rel="noreferrer">
            {label}
          </a>
        ))}
      </div>

      <button
        type="button"
        className="website-mobile-footer__region"
        onClick={onOpenRegion}
      >
        United States
      </button>
    </div>
  );
}
