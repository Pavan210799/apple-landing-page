import { useEffect, useRef } from "react";

export default function LegalFootnotesSheet() {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    const source = document.querySelector(".footer-ac-globalfooter-footnotes-3");
    if (!source) {
      host.textContent = "Legal footnotes are unavailable.";
      return undefined;
    }
    const clone = source.cloneNode(true);
    clone.classList.add("legal-footnotes-clone");
    clone.removeAttribute("aria-hidden");
    host.replaceChildren(clone);
    return undefined;
  }, []);

  return <div className="legal-footnotes-sheet" ref={hostRef} />;
}
