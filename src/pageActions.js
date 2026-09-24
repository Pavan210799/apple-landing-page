export const shop = {
  iphone14: "https://www.apple.com/shop/buy-iphone/iphone-14",
  iphone14pro: "https://www.apple.com/shop/buy-iphone/iphone-14-pro",
  iphone13: "https://www.apple.com/shop/buy-iphone/iphone-13",
  iphoneSe: "https://www.apple.com/shop/buy-iphone/iphone-se",
  iphone12: "https://www.apple.com/iphone-12/",
  airtag: "https://www.apple.com/shop/buy-airtag/airtag",
  gift: "https://www.apple.com/shop/gift-cards",
  magsafe: "https://www.apple.com/shop/accessories/all/magsafe",
  accessories: "https://www.apple.com/shop/iphone/accessories",
  bag: "https://www.apple.com/shop/bag",
  trade: "https://www.apple.com/shop/trade-in",
  deals: "https://www.apple.com/shop/buy-iphone/carrier-offers",
  finance: "https://www.apple.com/shop/browse/finance",
};

export const pages = {
  home: "https://www.apple.com/",
  store: "https://www.apple.com/store",
  mac: "https://www.apple.com/mac/",
  ipad: "https://www.apple.com/ipad/",
  iphone: "https://www.apple.com/iphone/",
  iphone14: "https://www.apple.com/iphone-14/",
  iphone14pro: "https://www.apple.com/iphone-14-pro/",
  iphone13: "https://www.apple.com/iphone-13/",
  iphoneSe: "https://www.apple.com/iphone-se/",
  watch: "https://www.apple.com/watch/",
  airpods: "https://www.apple.com/airpods/",
  airtag: "https://www.apple.com/airtag/",
  tvHome: "https://www.apple.com/tv-home/",
  services: "https://www.apple.com/services/",
  support: "https://support.apple.com/",
  card: "https://www.apple.com/apple-card/",
  ios: "https://www.apple.com/ios/",
  one: "https://www.apple.com/apple-one/",
  tv: "https://www.apple.com/apple-tv-plus/",
  music: "https://www.apple.com/apple-music/",
  news: "https://www.apple.com/apple-news/",
  arcade: "https://www.apple.com/apple-arcade/",
  fitness: "https://www.apple.com/apple-fitness-plus/",
  research: "https://www.apple.com/research/",
  switch: "https://www.apple.com/iphone/switch/",
  today: "https://www.apple.com/today/",
  tvApp: "https://tv.apple.com/",
  wallet: "https://www.apple.com/wallet/",
  pay: "https://www.apple.com/apple-pay/",
  cash: "https://www.apple.com/apple-cash/",
  icloud: "https://www.icloud.com/",
  appleId: "https://appleid.apple.com/",
  account: "https://www.apple.com/shop/account/home",
  privacy: "https://www.apple.com/legal/privacy/",
  terms: "https://www.apple.com/legal/internet-services/terms/site.html",
  sales: "https://www.apple.com/shop/open/salespolicies",
  legal: "https://www.apple.com/legal/",
  sitemap: "https://www.apple.com/sitemap/",
  retail: "https://www.apple.com/retail/",
  stores: "https://www.apple.com/retail/storelist/",
  leadership: "https://www.apple.com/leadership/",
  jobs: "https://www.apple.com/careers/",
  investors: "https://investor.apple.com/",
  ethics: "https://www.apple.com/compliance/",
  events: "https://www.apple.com/apple-events/",
  contact: "https://www.apple.com/contact/",
  environment: "https://www.apple.com/environment/",
  privacyFooter: "https://www.apple.com/privacy/",
};

function link(selector, label, href, kind = "text") {
  return { selector, label, href, kind };
}

function scroll(selector, label, target) {
  return { selector, label, scroll: target, kind: "text" };
}

function panel(selector, label, name, kind = "nav") {
  return { selector, label, panel: name, kind };
}

export const actions = [
  link(".ul-globalnav-list-apple-2", "Apple logo", pages.home, "nav"),
  link(".ul-globalnav-list-store-7", "Store", pages.store, "nav"),
  link(".ul-globalnav-list-mac-11", "Mac", pages.mac, "nav"),
  link(".ul-globalnav-list-ipad-15", "iPad", pages.ipad, "nav"),
  link(".ul-globalnav-list-iphone-19", "iPhone", pages.iphone, "nav"),
  link(".ul-globalnav-list-watch-23", "Watch", pages.watch, "nav"),
  link(".ul-globalnav-list-airpods-27", "AirPods", pages.airpods, "nav"),
  link(".ul-globalnav-list-tv-and-home-31", "TV & Home", pages.tvHome, "nav"),
  link(".ul-globalnav-list-entertainment-35", "Entertainment", pages.services, "nav"),
  link(".ul-globalnav-list-accessories-39", "Accessories", pages.accessories, "nav"),
  link(".ul-globalnav-list-support-43", "Support", pages.support, "nav"),
  panel(".ul-globalnav-list-svg-47", "Search", "search", "nav"),
  panel(".ul-globalnav-list-svg-48", "Bag", "bag", "nav"),

  scroll(".nav-chapternav-a-3", "iPhone 14 Pro", ".main-main-pro-beyond-23"),
  scroll(".nav-chapternav-a-7", "iPhone 14", ".main-main-two-great-sizes-now-with-a-splash-of-yellow-9"),
  scroll(".nav-chapternav-a-11", "iPhone 13", ".main-main-buy-iphone-13-444"),
  scroll(".nav-chapternav-a-14", "iPhone SE", ".main-main-buy-iphone-se-41"),
  link(".nav-chapternav-a-17", "iPhone 12", shop.iphone12, "chapter"),
  scroll(".nav-chapternav-a-20", "Compare", ".main-main-buy-iphone-14-pro-331"),
  scroll(".nav-chapternav-a-23", "AirPods", ".main-main-magic-runs-in-the-family-134"),
  scroll(".nav-chapternav-a-26", "AirTag", ".main-main-buy-airtag-126"),
  scroll(".nav-chapternav-a-29", "Accessories", ".main-main-shop-magsafe-accessories-116"),
  scroll(".nav-chapternav-a-32", "Apple Card", ".main-main-get-3-daily-cash-back-with-apple-card-95"),
  scroll(".nav-chapternav-a-35", "iOS 16", ".main-main-learn-more-about-ios-16-173"),
  scroll(".nav-chapternav-a-38", "Shop iPhone", ".main-main-shop-all-iphone-accessories-140"),

  link(".main-main-buy-iphone-14-13", "Buy iPhone 14", shop.iphone14, "pill"),
  link(".main-main-buy-iphone-14-388", "Buy iPhone 14 (compare)", shop.iphone14, "pill"),
  link(".main-main-buy-iphone-14-pro-27", "Buy iPhone 14 Pro", shop.iphone14pro, "pill"),
  link(".main-main-buy-iphone-14-pro-331", "Buy iPhone 14 Pro (compare)", shop.iphone14pro, "pill"),
  link(".main-main-buy-iphone-13-444", "Buy iPhone 13", shop.iphone13, "pill"),
  link(".main-main-buy-iphone-se-41", "Buy iPhone SE", shop.iphoneSe, "pill"),
  link(".main-main-buy-iphone-se-497", "Buy iPhone SE (compare)", shop.iphoneSe, "pill"),
  link(".main-main-buy-airtag-126", "Buy AirTag", shop.airtag, "text"),
  link(".main-main-buy-apple-gift-card-304", "Buy Apple Gift Card", shop.gift, "text"),
  panel(".main-main-watch-the-guided-tour-film-57", "Watch the film", "film", "pill"),

  link(".main-main-learn-more-about-iphone-14-15", "Learn more, iPhone 14", pages.iphone14),
  link(".main-main-learn-more-about-iphone-14-390", "Learn more, iPhone 14 compare", pages.iphone14),
  link(".main-main-learn-more-about-iphone-14-pro-29", "Learn more, iPhone 14 Pro", pages.iphone14pro),
  link(".main-main-learn-more-about-iphone-14-pro-333", "Learn more, iPhone 14 Pro compare", pages.iphone14pro),
  link(".main-main-learn-more-about-iphone-13-448", "Learn more, iPhone 13", pages.iphone13),
  link(".main-main-learn-more-about-iphone-se-43", "Learn more, iPhone SE", pages.iphoneSe),
  link(".main-main-learn-more-about-iphone-se-499", "Learn more, iPhone SE compare", pages.iphoneSe),
  link(".main-main-learn-more-about-apple-trade-in-70", "Learn more, Trade In", shop.trade),
  link(".main-main-find-your-offer-explore-carrier-deals-77", "Find your deal", shop.deals),
  link(".main-main-learn-more-about-daily-cash-back-with-apple-card-98", "Learn more, Apple Card", pages.card),
  link(".main-main-learn-more-about-buying-iphone-from-apple-106", "Learn more, buying iPhone", pages.store),
  link(".main-main-shop-magsafe-accessories-116", "Shop MagSafe accessories", shop.magsafe),
  link(".main-main-learn-more-about-airtag-128", "Learn more, AirTag", pages.airtag),
  link(".main-main-learn-more-about-airpods-136", "Learn more, AirPods", pages.airpods),
  link(".main-main-shop-all-iphone-accessories-140", "Shop all iPhone accessories", shop.accessories),
  link(".main-main-learn-more-about-delivery-147", "Learn more, delivery", pages.store),
  link(".main-main-learn-more-about-payment-plans-156", "Learn more, payment plans", shop.finance),
  link(".main-main-learn-more-about-online-personal-sessions-163", "Learn more, personal sessions", pages.today),
  link(".main-main-learn-more-about-ios-16-173", "Learn more, iOS 16", pages.ios),
  link(".main-main-learn-more-about-switching-to-iphone-180", "Learn more, switching", pages.switch),
  link(".main-main-a-194", "Try Apple One free", pages.one),
  link(".main-main-learn-more-about-apple-one-198", "Learn more, Apple One", pages.one),
  link(".main-main-try-apple-tv-for-free-206", "Try Apple TV+ free", pages.tv),
  link(".main-main-a-208", "Learn more, Apple TV+", pages.tv),
  link(".main-main-try-apple-music-free-250", "Try Apple Music free", pages.music),
  link(".main-main-learn-more-about-apple-music-254", "Learn more, Apple Music", pages.music),
  link(".main-main-learn-more-about-apple-news-268", "Learn more, Apple News+", pages.news),
  link(".main-main-try-apple-arcade-free-278", "Try Apple Arcade free", pages.arcade),
  link(".main-main-learn-more-about-apple-arcade-282", "Learn more, Apple Arcade", pages.arcade),
  link(".main-main-learn-more-about-apple-fitness-291", "Learn more, Apple Fitness+", pages.fitness),
  link(".main-main-try-apple-fitness-plus-for-free-293", "Try Apple Fitness+ free", pages.fitness),
  link(".main-main-learn-more-about-apple-gift-card-302", "Learn more, Gift Card", shop.gift),
  link(".main-main-learn-more-about-the-apple-research-app-315", "Learn more, Research app", pages.research),
  link(".main-main-span-216, .main-main-span-221, .main-main-span-226, .main-main-span-231, .main-main-span-236, .main-main-span-241", "Stream now", pages.tvApp, "pill"),
  scroll(".main-main-compare-all-iphone-models-540", "Compare all iPhone models", ".main-main-buy-iphone-14-pro-331"),
  link(".main-main-shop-iphone-542, .main-main-shop-iphone-550", "Shop iPhone", shop.iphone14),

  link(".footer-ac-globalfooter-link", "Find an Apple Store / other retailer", pages.retail, "footer"),
  link(".footer-ac-globalfooter-or-call-1-800-my-apple-145", "1-800-MY-APPLE", "tel:18006927753", "footer"),
  link(".footer-ac-globalfooter-store-48", "Footer Store", pages.store, "footer"),
  link(".footer-ac-globalfooter-mac-49", "Footer Mac", pages.mac, "footer"),
  link(".footer-ac-globalfooter-ipad-50", "Footer iPad", pages.ipad, "footer"),
  link(".footer-ac-globalfooter-iphone-51", "Footer iPhone", pages.iphone, "footer"),
  link(".footer-ac-globalfooter-watch-52", "Footer Watch", pages.watch, "footer"),
  link(".footer-ac-globalfooter-airpods-53", "Footer AirPods", pages.airpods, "footer"),
  link(".footer-ac-globalfooter-tv-home-54", "Footer TV & Home", pages.tvHome, "footer"),
  link(".footer-ac-globalfooter-airtag-55", "Footer AirTag", pages.airtag, "footer"),
  link(".footer-ac-globalfooter-accessories-56", "Footer Accessories", pages.accessories, "footer"),
  link(".footer-ac-globalfooter-gift-cards-57", "Footer Gift Cards", shop.gift, "footer"),
  link(".footer-ac-globalfooter-wallet-61", "Wallet", pages.wallet, "footer"),
  link(".footer-ac-globalfooter-apple-card-62", "Apple Card", pages.card, "footer"),
  link(".footer-ac-globalfooter-apple-pay-63", "Apple Pay", pages.pay, "footer"),
  link(".footer-ac-globalfooter-apple-cash-64", "Apple Cash", pages.cash, "footer"),
  link(".footer-ac-globalfooter-manage-your-apple-id-69", "Manage Your Apple ID", pages.appleId, "footer"),
  link(".footer-ac-globalfooter-apple-store-account-70", "Apple Store Account", pages.account, "footer"),
  link(".footer-ac-globalfooter-icloud-com-71", "iCloud.com", pages.icloud, "footer"),
  link(".footer-ac-globalfooter-apple-one-75", "Apple One", pages.one, "footer"),
  link(".footer-ac-globalfooter-apple-tv-76", "Apple TV+", pages.tv, "footer"),
  link(".footer-ac-globalfooter-apple-music-77", "Apple Music", pages.music, "footer"),
  link(".footer-ac-globalfooter-apple-arcade-78", "Apple Arcade", pages.arcade, "footer"),
  link(".footer-ac-globalfooter-apple-fitness-79", "Apple Fitness+", pages.fitness, "footer"),
  link(".footer-ac-globalfooter-apple-news-80", "Apple News+", pages.news, "footer"),
  link(".footer-ac-globalfooter-privacy-policy-150", "Privacy Policy", pages.privacy, "footer"),
  link(".footer-ac-globalfooter-terms-of-use-152", "Terms of Use", pages.terms, "footer"),
  link(".footer-ac-globalfooter-sales-and-refunds-154", "Sales and Refunds", pages.sales, "footer"),
  link(".footer-ac-globalfooter-legal-156", "Legal", pages.legal, "footer"),
  link(".footer-ac-globalfooter-site-map-157", "Site Map", pages.sitemap, "footer"),
  panel(".footer-ac-globalfooter-united-states-158", "United States", "region", "footer"),
  scroll(".footer-ac-globalfooter-iphone-162", "Breadcrumb iPhone", ".main-main-two-great-sizes-now-with-a-splash-of-yellow-9"),
  link(".footer-ac-globalfooter-apple-leadership-136", "Apple Leadership", pages.leadership, "footer"),
  link(".footer-ac-globalfooter-career-opportunities-137", "Career Opportunities", pages.jobs, "footer"),
  link(".footer-ac-globalfooter-investors-138", "Investors", pages.investors, "footer"),
  link(".footer-ac-globalfooter-ethics-compliance-139", "Ethics & Compliance", pages.ethics, "footer"),
  link(".footer-ac-globalfooter-events-140", "Events", pages.events, "footer"),
  link(".footer-ac-globalfooter-contact-apple-141", "Contact Apple", pages.contact, "footer"),
  link(".footer-ac-globalfooter-apple-podcasts-81", "Apple Podcasts", "https://www.apple.com/apple-podcasts/", "footer"),
  link(".footer-ac-globalfooter-apple-books-82", "Apple Books", "https://www.apple.com/apple-books/", "footer"),
  link(".footer-ac-globalfooter-app-store-83", "App Store", "https://www.apple.com/app-store/", "footer"),
  link(".footer-ac-globalfooter-find-a-store-87", "Find a Store", pages.stores, "footer"),
  link(".footer-ac-globalfooter-genius-bar-88", "Genius Bar", "https://www.apple.com/retail/geniusbar/", "footer"),
  link(".footer-ac-globalfooter-today-at-apple-89", "Today at Apple", pages.today, "footer"),
  link(".footer-ac-globalfooter-apple-camp-90", "Apple Camp", "https://www.apple.com/today/camp/", "footer"),
  link(".footer-ac-globalfooter-apple-store-app-91", "Apple Store App", "https://apps.apple.com/app/apple-store/id375380948", "footer"),
  link(".footer-ac-globalfooter-certified-refurbished-92", "Certified Refurbished", "https://www.apple.com/shop/refurbished", "footer"),
  link(".footer-ac-globalfooter-apple-trade-in-93", "Apple Trade In", shop.trade, "footer"),
  link(".footer-ac-globalfooter-financing-94", "Financing", shop.finance, "footer"),
  link(".footer-ac-globalfooter-carrier-deals-at-apple-95", "Carrier Deals at Apple", shop.deals, "footer"),
  link(".footer-ac-globalfooter-order-status-96", "Order Status", "https://www.apple.com/shop/order/list", "footer"),
  link(".footer-ac-globalfooter-shopping-help-97", "Shopping Help", "https://www.apple.com/shop/help", "footer"),
  link(".footer-ac-globalfooter-apple-and-business-102", "Apple and Business", "https://www.apple.com/business/", "footer"),
  link(".footer-ac-globalfooter-shop-for-business-103", "Shop for Business", "https://www.apple.com/retail/business/", "footer"),
  link(".footer-ac-globalfooter-apple-and-education-107", "Apple and Education", "https://www.apple.com/education/", "footer"),
  link(".footer-ac-globalfooter-shop-for-k-12-108", "Shop for K-12", "https://www.apple.com/education/k12/", "footer"),
  link(".footer-ac-globalfooter-shop-for-college-109", "Shop for College", "https://www.apple.com/us-edu/store", "footer"),
  link(".footer-ac-globalfooter-apple-in-healthcare-113", "Apple in Healthcare", "https://www.apple.com/healthcare/", "footer"),
  link(".footer-ac-globalfooter-health-on-apple-watch-114", "Health on Apple Watch", "https://www.apple.com/healthcare/apple-watch/", "footer"),
  link(".footer-ac-globalfooter-health-records-on-iphone-115", "Health Records on iPhone", "https://www.apple.com/healthcare/health-records/", "footer"),
  link(".footer-ac-globalfooter-shop-for-government-119", "Shop for Government", "https://www.apple.com/r/store/government/", "footer"),
  link(".footer-ac-globalfooter-shop-for-veterans-and-military-120", "Shop for Veterans and Military", "https://www.apple.com/shop/browse/home/veterans_military", "footer"),
  link(".footer-ac-globalfooter-accessibility-125", "Accessibility", "https://www.apple.com/accessibility/", "footer"),
  link(".footer-ac-globalfooter-education-126", "Education", "https://www.apple.com/education-initiative/", "footer"),
  link(".footer-ac-globalfooter-environment-127", "Environment", pages.environment, "footer"),
  link(".footer-ac-globalfooter-inclusion-and-diversity-128", "Inclusion and Diversity", "https://www.apple.com/diversity/", "footer"),
  link(".footer-ac-globalfooter-privacy-129", "Privacy", pages.privacyFooter, "footer"),
  link(".footer-ac-globalfooter-racial-equity-and-justice-130", "Racial Equity and Justice", "https://www.apple.com/racial-equity/", "footer"),
  link(".footer-ac-globalfooter-legal-underline", "Underlined terms", pages.terms, "footer"),
  link(".footer-ac-globalfooter-supplier-responsibility-131", "Supplier Responsibility", "https://www.apple.com/supplier-responsibility/", "footer"),
];

export const searchJumps = [
  { label: "iPhone 14", scroll: ".main-main-two-great-sizes-now-with-a-splash-of-yellow-9" },
  { label: "iPhone 14 Pro", scroll: ".main-main-pro-beyond-23" },
  { label: "iPhone SE", scroll: ".main-main-buy-iphone-se-41" },
  { label: "Compare models", scroll: ".main-main-buy-iphone-14-pro-331" },
  { label: "Trade in", scroll: ".main-main-learn-more-about-apple-trade-in-70" },
  { label: "Apple Card", scroll: ".main-main-get-3-daily-cash-back-with-apple-card-95" },
  { label: "AirTag", scroll: ".main-main-buy-airtag-126" },
  { label: "AirPods", scroll: ".main-main-magic-runs-in-the-family-134" },
  { label: "iOS 16", scroll: ".main-main-learn-more-about-ios-16-173" },
  { label: "Apple TV+", scroll: ".main-main-try-apple-tv-for-free-206" },
  { label: "Apple Music", scroll: ".main-main-try-apple-music-free-250" },
  { label: "Apple News+", scroll: ".main-main-learn-more-about-apple-news-268" },
  { label: "Apple Arcade", scroll: ".main-main-try-apple-arcade-free-278" },
  { label: "Apple Fitness+", scroll: ".main-main-learn-more-about-apple-fitness-291" },
];

const shopLinkText = {
  "Find an Apple Store": pages.stores,
  "other retailer": pages.retail,
};

export function findAction(target) {
  if (target.closest("[class*='pseudo']")) return null;
  const shopLink = target.closest(".footer-ac-globalfooter-link");
  if (shopLink && shopLinkText[shopLink.textContent]) {
    return {
      selector: ".footer-ac-globalfooter-link",
      label: shopLink.textContent,
      href: shopLinkText[shopLink.textContent],
      kind: "footer",
    };
  }
  return actions.find((action) => target.closest(action.selector)) ?? null;
}

export function prepareActions(root) {
  const seen = new Set();
  actions.forEach((action) => {
    root.querySelectorAll(action.selector).forEach((element) => {
      if (seen.has(element)) return;
      seen.add(element);
      element.classList.add("page-action", `page-action-${action.kind}`);
      if (!element.hasAttribute("tabindex") && element.tagName !== "BUTTON") {
        element.tabIndex = 0;
      }
      if (action.panel === "search" || action.panel === "bag") {
        element.setAttribute("aria-hidden", "false");
        element.setAttribute("aria-label", action.label);
      }
      element.setAttribute("role", action.href ? "link" : "button");
    });
  });
}

export function releaseScrollContainers(from) {
  let node = from?.parentElement ?? null;
  while (node && node !== document.body && node !== document.documentElement) {
    if (node.scrollTop) node.scrollTop = 0;
    if (node.scrollLeft) node.scrollLeft = 0;
    node = node.parentElement;
  }
}

export function scrollToSelector(selector) {
  const element = document.querySelector(selector);
  if (!element) return;
  releaseScrollContainers(element);
  const top = window.scrollY + element.getBoundingClientRect().top - 12;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}
