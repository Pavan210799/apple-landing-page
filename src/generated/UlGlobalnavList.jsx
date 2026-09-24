import "./UlGlobalnavList.css";

function AppleMark() {
  return (
    <svg width="14" height="17" viewBox="0 0 14 17" fill="currentColor" aria-hidden="true">
      <path d="M11.48 9.07c-.02-2.03 1.66-3.01 1.74-3.06-0.95-1.39-2.43-1.58-2.95-1.6-1.25-.13-2.45.74-3.08.74-.64 0-1.62-.72-2.67-.7-1.37.02-2.64.8-3.35 2.03-1.43 2.48-.37 6.14 1.02 8.15.68.99 1.5 2.1 2.56 2.06 1.03-.04 1.42-.67 2.67-.67s1.6.67 2.68.65c1.11-.02 1.81-1 2.49-1.99.78-1.14 1.1-2.25 1.12-2.31-.02-.01-2.15-.82-2.17-3.3zM9.7 2.77c.57-.69.95-1.64.85-2.6-.82.03-1.81.55-2.4 1.24-.52.61-.98 1.59-.86 2.52.91.07 1.84-.46 2.41-1.16z" />
    </svg>
  );
}

function SearchMark() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <circle cx="6.2" cy="6.2" r="5.1" stroke="currentColor" strokeWidth="1.3" />
      <path d="M10.1 10.1L13.6 13.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function BagMark() {
  return (
    <svg width="14" height="17" viewBox="0 0 14 17" fill="none" aria-hidden="true">
      <path
        d="M3.1 5.2h7.8v8.6c0 .7-.5 1.2-1.2 1.2H4.3c-.7 0-1.2-.5-1.2-1.2V5.2z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M4.7 5.1V3.8c0-1.2 1-2.2 2.3-2.2s2.3 1 2.3 2.2v1.3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UlGlobalnavList() {
  return (
    <div className="ul-globalnav-list-ul-globalnav-list-1">
      <div className="ul-globalnav-list-apple-2">
      <span className="ul-globalnav-list-svg-3" aria-hidden="true"><AppleMark /></span>
      <div className="ul-globalnav-list-span-4">
      <span className="ul-globalnav-list-apple-5">{"Apple"}</span>
    </div>
    </div>
      <div className="ul-globalnav-list-div-6">
      <div className="ul-globalnav-list-store-7">
      <span className="ul-globalnav-list-svg-8" aria-hidden="true" />
      <div className="ul-globalnav-list-span-9">
      <span className="ul-globalnav-list-store-10">{"Store"}</span>
    </div>
    </div>
      <div className="ul-globalnav-list-mac-11">
      <span className="ul-globalnav-list-svg-12" aria-hidden="true" />
      <div className="ul-globalnav-list-span-13">
      <span className="ul-globalnav-list-mac-14">{"Mac"}</span>
    </div>
    </div>
      <div className="ul-globalnav-list-ipad-15">
      <span className="ul-globalnav-list-svg-16" aria-hidden="true" />
      <div className="ul-globalnav-list-span-17">
      <span className="ul-globalnav-list-ipad-18">{"iPad"}</span>
    </div>
    </div>
      <div className="ul-globalnav-list-iphone-19">
      <span className="ul-globalnav-list-svg-20" aria-hidden="true" />
      <div className="ul-globalnav-list-span-21">
      <span className="ul-globalnav-list-iphone-22">{"iPhone"}</span>
    </div>
    </div>
      <div className="ul-globalnav-list-watch-23">
      <span className="ul-globalnav-list-svg-24" aria-hidden="true" />
      <div className="ul-globalnav-list-span-25">
      <span className="ul-globalnav-list-watch-26">{"Watch"}</span>
    </div>
    </div>
      <div className="ul-globalnav-list-airpods-27">
      <span className="ul-globalnav-list-svg-28" aria-hidden="true" />
      <div className="ul-globalnav-list-span-29">
      <span className="ul-globalnav-list-airpods-30">{"AirPods"}</span>
    </div>
    </div>
      <div className="ul-globalnav-list-tv-and-home-31">
      <span className="ul-globalnav-list-svg-32" aria-hidden="true" />
      <div className="ul-globalnav-list-span-33">
      <span className="ul-globalnav-list-tv-home-34">{"TV & Home"}</span>
    </div>
    </div>
      <div className="ul-globalnav-list-entertainment-35">
      <span className="ul-globalnav-list-svg-36" aria-hidden="true" />
      <div className="ul-globalnav-list-span-37">
      <span className="ul-globalnav-list-entertainment-38">{"Entertainment"}</span>
    </div>
    </div>
      <div className="ul-globalnav-list-accessories-39">
      <span className="ul-globalnav-list-svg-40" aria-hidden="true" />
      <div className="ul-globalnav-list-span-41">
      <span className="ul-globalnav-list-accessories-42">{"Accessories"}</span>
    </div>
    </div>
      <div className="ul-globalnav-list-support-43">
      <span className="ul-globalnav-list-svg-44" aria-hidden="true" />
      <div className="ul-globalnav-list-span-45">
      <span className="ul-globalnav-list-support-46">{"Support"}</span>
    </div>
    </div>
    </div>
      <span className="ul-globalnav-list-svg-47" aria-hidden="true"><SearchMark /></span>
      <span className="ul-globalnav-list-svg-48" aria-hidden="true"><BagMark /></span>
    </div>
  );
}

export default UlGlobalnavList;
