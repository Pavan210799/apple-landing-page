import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  Linking,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { pages, shop } from "./links";
import { icons, photos } from "./media";

const font = "Helvetica Neue";
const riseEase = Easing.bezier(0.25, 0.1, 0.25, 1);
const riseChecks = new Set();
const riseFrame = { y: 0, height: 0 };
let riseReduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

function runRiseChecks() {
  riseChecks.forEach((check) => check());
}

function Rise({ children, style, onLayout }) {
  const host = useRef(null);
  const shown = useRef(false);
  const opacity = useRef(new Animated.Value(riseReduced ? 1 : 0)).current;
  const shift = useRef(new Animated.Value(riseReduced ? 0 : 18)).current;

  useEffect(() => {
    if (riseReduced) return undefined;
    const check = () => {
      const node = host.current;
      if (!node?.measureInWindow || riseFrame.height <= 0) return;
      node.measureInWindow((x, y, width, height) => {
        if (!height) return;
        const top = Math.max(y, riseFrame.y);
        const bottom = Math.min(y + height, riseFrame.y + riseFrame.height);
        const inView = Math.max(0, bottom - top) / height >= 0.15;
        if (inView === shown.current) return;
        shown.current = inView;
        Animated.parallel([
          Animated.timing(opacity, { toValue: inView ? 1 : 0, duration: 700, easing: riseEase, useNativeDriver: false }),
          Animated.timing(shift, { toValue: inView ? 0 : 18, duration: 700, easing: riseEase, useNativeDriver: false }),
        ]).start();
      });
    };
    riseChecks.add(check);
    check();
    return () => riseChecks.delete(check);
  }, [opacity, shift]);

  return (
    <View ref={host} collapsable={false} onLayout={(event) => { onLayout?.(event); runRiseChecks(); }} style={styles.riseHost}>
      <Animated.View pointerEvents="box-none" style={[style, { opacity, transform: [{ translateY: shift }] }]}>
        {children}
      </Animated.View>
    </View>
  );
}

const chapters = [
  ["pro", "iPhone 14 Pro", icons.pro],
  ["iphone14", "iPhone 14", icons.iphone14],
  ["iphone13", "iPhone 13", icons.iphone13],
  ["se", "iPhone SE", icons.se],
  ["iphone12", "iPhone 12", icons.iphone12],
  ["compare", "Compare", icons.compare],
  ["airpods", "AirPods", icons.airpods],
  ["airtag", "AirTag", icons.airtag],
  ["accessories", "Accessories", icons.accessories],
  ["card", "Apple Card", icons.card],
  ["ios", "iOS 16", icons.ios],
  ["shop", "Shop iPhone", icons.shop],
];

const searchItems = [
  ["iPhone 14", "iphone14"],
  ["iPhone 14 Pro", "pro"],
  ["iPhone SE", "se"],
  ["Compare models", "compare"],
  ["Trade in", "trade"],
  ["Apple Card", "card"],
  ["AirTag", "airtag"],
  ["AirPods", "airpods"],
  ["iOS 16", "ios"],
  ["Apple TV+", "tv"],
  ["Apple Music", "music"],
  ["Apple News+", "news"],
  ["Apple Arcade", "arcade"],
  ["Apple Fitness+", "fitness"],
];

const menuItems = [
  ["Store", pages.store],
  ["Mac", pages.mac],
  ["iPad", pages.ipad],
  ["iPhone", pages.iphone],
  ["Watch", pages.watch],
  ["AirPods", pages.airpods],
  ["TV & Home", pages.tvHome],
  ["Accessories", shop.accessories],
  ["Support", pages.support],
];

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

function open(url) {
  Linking.openURL(url);
}

function AppleMark() {
  return <Text style={styles.apple}>{"\uF8FF"}</Text>;
}

function ServiceHeading({ word }) {
  return (
    <View style={styles.lockup}>
      <Text style={styles.lockupMark}>{"\uF8FF"}</Text>
      <Text style={styles.lockupWord}>{word}</Text>
    </View>
  );
}

function BagMark() {
  return (
    <View style={styles.bag}>
      <View style={styles.bagHandle} />
      <View style={styles.bagBody} />
    </View>
  );
}

function SearchMark() {
  return (
    <View style={styles.searchMark}>
      <View style={styles.searchCircle} />
      <View style={styles.searchHandle} />
    </View>
  );
}

function Pill({ label, onPress, light }) {
  const scale = useRef(new Animated.Value(1)).current;
  const settle = (to) => {
    Animated.spring(scale, { toValue: to, friction: 5, tension: 280, useNativeDriver: false }).start();
  };
  return (
    <Animated.View style={[styles.pillWrap, { transform: [{ scale }] }]}>
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        onPressIn={() => settle(0.94)}
        onPressOut={() => settle(1)}
        style={({ pressed }) => [styles.pill, light && styles.pillLight, pressed && styles.pillPressed]}
      >
        <Text style={[styles.pillText, light && styles.pillTextLight]}>{label}</Text>
      </Pressable>
    </Animated.View>
  );
}

function LinkText({ label, onPress, light }) {
  return (
    <Pressable accessibilityRole="link" onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
      <Text style={[styles.link, light && styles.linkLight]}>{label}</Text>
    </Pressable>
  );
}

function Actions({ buy, learn, light }) {
  return (
    <View style={styles.actions}>
      <Pill label="Buy" onPress={buy} light={light} />
      <LinkText label="Learn more" onPress={learn} light={light} />
    </View>
  );
}

function Hero({ id, mark, kicker, word, title, titleStyle, price, photo, photoStyle, dark, buy, learn }) {
  return (
    <Rise onLayout={mark(id)} style={[styles.hero, dark && styles.heroDark]}>
      {kicker ? <Text style={[styles.kicker, dark && styles.onDark]}>{kicker}</Text> : null}
      {word ? <Image source={word} style={styles.wordmark} resizeMode="contain" /> : null}
      {title ? <Text style={[styles.heroTitle, dark && styles.onDark, titleStyle]}>{title}</Text> : null}
      <Text style={[styles.price, dark && styles.priceDark]}>{price}</Text>
      <Actions buy={buy} learn={learn} light={dark} />
      <Image source={photo} style={photoStyle || styles.heroPhoto} resizeMode="contain" />
    </Rise>
  );
}

function FullImage({ source, ratio, style }) {
  return <Image source={source} resizeMode="contain" style={[styles.fullImage, { aspectRatio: ratio }, style]} />;
}

function CompareCard({ phone, title, price, buy, learn, specs }) {
  const [windowHeight, setWindowHeight] = useState(0);
  const [atEnd, setAtEnd] = useState(false);
  const canScroll = specs.length > 10;
  return (
    <View style={styles.compareCard}>
      <Image source={phone} style={styles.comparePhone} resizeMode="contain" />
      <Text style={styles.compareTitle}>{title}</Text>
      <Text style={styles.comparePrice}>{price}</Text>
      <Actions buy={buy} learn={learn} />
      <View style={[styles.specWindow, windowHeight ? { height: windowHeight } : null]}>
        <ScrollView
          nestedScrollEnabled
          scrollEnabled={canScroll}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={(event) => {
            if (!canScroll) return;
            const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
            const end = contentOffset.y + layoutMeasurement.height >= contentSize.height - 6;
            setAtEnd((current) => (current === end ? current : end));
          }}
        >
          {specs.map(([icon, label], index) => (
            <View
              key={`${index}-${label}`}
              style={styles.specRow}
              onLayout={index === 9 ? (event) => {
                const next = Math.ceil(event.nativeEvent.layout.y + event.nativeEvent.layout.height);
                setWindowHeight((current) => (current === next ? current : next));
              } : undefined}
            >
              {icon ? <Image source={icon} style={styles.specIcon} resizeMode="contain" /> : null}
              <Text style={styles.specLabel}>{label}</Text>
            </View>
          ))}
        </ScrollView>
        {canScroll && !atEnd ? (
          <View pointerEvents="none" style={styles.specFade}>
            {[0, 0.35, 0.7, 0.95].map((opacity) => (
              <View key={opacity} style={[styles.specFadeBand, { backgroundColor: `rgba(255,255,255,${opacity})` }]} />
            ))}
          </View>
        ) : null}
      </View>
    </View>
  );
}

function Sheet({ title, onClose, children }) {
  return (
    <Modal animationType="fade" transparent visible onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={() => {}}>
          <View style={styles.sheetHead}>
            <Text style={styles.sheetTitle}>{title}</Text>
            <Pressable accessibilityRole="button" onPress={onClose} hitSlop={12}>
              <Text style={styles.close}>Close</Text>
            </Pressable>
          </View>
          <ScrollView style={styles.sheetBody} contentContainerStyle={styles.sheetContent}>
            {children}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function SearchModal({ onClose, children }) {
  return (
    <Modal animationType="fade" transparent visible onRequestClose={onClose}>
      <Pressable style={styles.searchOverlay} onPress={onClose}>
        <Pressable style={styles.searchModal} onPress={() => {}}>
          <View style={styles.sheetHead}>
            <Text style={styles.sheetTitle}>Search</Text>
            <Pressable accessibilityRole="button" onPress={onClose} hitSlop={12}>
              <Text style={styles.close}>Close</Text>
            </Pressable>
          </View>
          <ScrollView
            style={styles.searchModalBody}
            contentContainerStyle={styles.searchModalContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator
          >
            {children}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export default function IPhoneScreen() {
  const scrollRef = useRef(null);
  const spots = useRef({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [panel, setPanel] = useState(null);
  const [query, setQuery] = useState("");
  const [footerOpen, setFooterOpen] = useState(null);

  function mark(id) {
    return (event) => {
      spots.current[id] = event.nativeEvent.layout.y;
    };
  }

  function syncRise() {
    scrollRef.current?.measureInWindow((x, y, width, height) => {
      if (!height) return;
      riseFrame.y = y;
      riseFrame.height = height;
      runRiseChecks();
    });
  }

  function jump(id) {
    const y = spots.current[id];
    if (y == null) return;
    scrollRef.current?.scrollTo({ y: Math.max(0, y - 8), animated: true });
    setMenuOpen(false);
    setPanel(null);
    setQuery("");
  }

  const jumps = searchItems.filter(([label]) => label.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.nav}>
        <Pressable accessibilityRole="button" accessibilityLabel="Menu" onPress={() => setMenuOpen(true)} hitSlop={8}>
          <Text style={styles.navIcon}>☰</Text>
        </Pressable>
        <Pressable accessibilityRole="link" accessibilityLabel="Apple" onPress={() => open(pages.home)}>
          <AppleMark />
        </Pressable>
        <View style={styles.navSide}>
          <Pressable accessibilityRole="button" accessibilityLabel="Search" onPress={() => setPanel("search")} hitSlop={8} style={styles.navAction}>
            <SearchMark />
          </Pressable>
          <Pressable accessibilityRole="button" accessibilityLabel="Bag" onPress={() => setPanel("bag")} hitSlop={8} style={styles.navAction}>
            <BagMark />
          </Pressable>
        </View>
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.mainScroll}
        contentContainerStyle={styles.page}
        scrollEventThrottle={16}
        onLayout={syncRise}
        onScroll={syncRise}
        onContentSizeChange={syncRise}
      >
        <View style={styles.chapterClip}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chapterBar} contentContainerStyle={styles.chapterRow}>
            {chapters.map(([id, label, icon]) => (
              <Pressable
                key={id}
                accessibilityRole="button"
                onPress={() => {
                  if (id === "iphone12") open(shop.iphone12);
                  else if (id === "iphone13") jump("compare");
                  else jump(id);
                }}
                style={styles.chapter}
              >
                <Image source={icon} style={styles.chapterIcon} resizeMode="contain" />
                <Text numberOfLines={2} style={styles.chapterLabel}>{label}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
        <Hero
          id="iphone14"
          mark={mark}
          kicker="New"
          word={photos.word14}
          title="Two great sizes. Now with a splash of yellow."
          price="From $799 or $33.29/mo. for 24 mo. before trade-in"
          photo={photos.hero14}
          buy={() => open(shop.iphone14)}
          learn={() => open(pages.iphone14)}
        />
        <Hero
          id="pro"
          mark={mark}
          word={photos.wordPro}
          title="Pro. Beyond."
          price="From $999 or $41.62/mo. for 24 mo. before trade-in"
          photo={photos.heroPro}
          photoStyle={styles.heroPhotoPro}
          dark
          buy={() => open(shop.iphone14pro)}
          learn={() => open(pages.iphone14pro)}
        />
        <Hero
          id="se"
          mark={mark}
          word={photos.wordSe}
          title="Love the power. Love the price."
          titleStyle={styles.seTitle}
          price="From $429 or $17.87/mo. for 24 mo. before trade-in"
          photo={photos.heroSe}
          buy={() => open(shop.iphoneSe)}
          learn={() => open(pages.iphoneSe)}
        />

        <Rise onLayout={mark("tour")} style={[styles.bleedCard, styles.tourCard]}>
          <FullImage source={photos.tour} ratio={1412 / 814} />
          <View style={styles.bleedCopy}>
            <Text style={styles.tourKicker}>A Guided Tour of</Text>
            <Text style={styles.tourTitle}>iPhone 14 & iPhone 14 Pro</Text>
            <Pressable accessibilityRole="button" onPress={() => setPanel("film")} style={styles.filmButton}>
              <Text style={styles.filmLabel}>Watch the film</Text>
            </Pressable>
          </View>
        </Rise>

        <Rise onLayout={mark("compare")} style={styles.block}>
          <Text style={styles.sectionTitle}>Which iPhone is right for you?</Text>
          <View style={styles.hClip}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.compareRow}>
            <CompareCard
              phone={photos.proPhone}
              title="The ultimate iPhone."
              price="From $999"
              buy={() => open(shop.iphone14pro)}
              learn={() => open(pages.iphone14pro)}
              specs={[
                [null, "6.7″ or 6.1″"],
                [null, "Super Retina XDR display"],
                [null, "ProMotion technology"],
                [null, "Always-On display"],
                [photos.specIsland, "Dynamic Island"],
                [photos.specIsland, "A new way to interact with iPhone"],
                [photos.specSos, "Emergency SOS via satellite"],
                [photos.specSos, "Emergency SOS"],
                [photos.specSos, "Crash Detection"],
                [photos.specCamera, "Pro camera system"],
                [photos.specCamera, "48MP Main · Ultra Wide · Telephoto"],
                [photos.specCamera, "Photonic Engine for incredible detail and color"],
                [photos.specCamera, "Autofocus on TrueDepth front camera"],
                [photos.specAction, "Action mode smooths out shaky handheld videos"],
                [photos.specBattery, "Up to 29 hours video playback"],
                [photos.specChip, "A16 Bionic chip"],
                [photos.specFace, "Face ID"],
                [photos.spec5g, "Superfast 5G cellular"],
              ]}
            />
            <CompareCard
              phone={photos.phone14}
              title="A total powerhouse."
              price="From $799"
              buy={() => open(shop.iphone14)}
              learn={() => open(pages.iphone14)}
              specs={[
                [null, "6.7″ or 6.1″"],
                [null, "Super Retina XDR display"],
                [photos.specSos, "Emergency SOS via satellite"],
                [photos.specSos, "Emergency SOS"],
                [photos.specSos, "Crash Detection"],
                [photos.spec14a, "Advanced dual-camera system"],
                [photos.spec14a, "12MP Main · Ultra Wide"],
                [photos.spec14a, "Photonic Engine for incredible detail and color"],
                [photos.spec14a, "Autofocus on TrueDepth front camera"],
                [photos.specAction, "Action mode smooths out shaky handheld videos"],
                [photos.specBattery, "Up to 26 hours video playback"],
                [photos.spec14b, "A15 Bionic chip with 5-core GPU"],
                [photos.specFace, "Face ID"],
                [photos.spec5g, "Superfast 5G cellular"],
              ]}
            />
            <CompareCard
              phone={photos.phone13}
              title="As amazing as ever."
              price="From $599"
              buy={() => open(shop.iphone13)}
              learn={() => open(pages.iphone13)}
              specs={[
                [null, "6.1″ or 5.4″"],
                [null, "Super Retina XDR display"],
                [photos.specSos, "Emergency SOS"],
                [photos.spec13, "Dual-camera system"],
                [photos.spec13, "12MP Main · Ultra Wide"],
                [photos.spec13, "TrueDepth front camera"],
                [photos.specBattery, "Up to 19 hours video playback"],
                [photos.spec14b, "A15 Bionic chip with 4-core GPU"],
                [photos.specFace, "Face ID"],
                [photos.spec5g, "Superfast 5G cellular"],
              ]}
            />
            <CompareCard
              phone={photos.phoneSe}
              title="Serious power. Serious value."
              price="From $429"
              buy={() => open(shop.iphoneSe)}
              learn={() => open(pages.iphoneSe)}
              specs={[
                [null, "4.7″"],
                [null, "Retina HD display"],
                [photos.specSos, "Emergency SOS"],
                [photos.specSeA, "Advanced camera system"],
                [photos.specSeA, "12MP Main"],
                [photos.specSeA, "Front camera"],
                [photos.specBattery, "Up to 15 hours video playback"],
                [photos.spec14b, "A15 Bionic chip with 4-core GPU"],
                [photos.specSeB, "Touch ID"],
                [photos.spec5g, "5G cellular"],
              ]}
            />
          </ScrollView>
          </View>
        </Rise>

        <Rise onLayout={mark("trade")} style={styles.block}>
          <Text style={styles.sectionTitle}>Ways to save on iPhone</Text>
          <View style={styles.bleedCard}>
            <FullImage source={photos.trade} ratio={1380 / 410} style={styles.photoTop} />
            <View style={styles.bleedCopy}>
              <Text style={styles.cardTitle}>Trade in your current phone for credit toward a new one.</Text>
              <Text style={styles.body}>Get $200–$600 in credit when you trade in iPhone 11 or higher and upgrade to iPhone 14 or iPhone 14 Pro.</Text>
              <LinkText label="Learn more" onPress={() => open(shop.trade)} />
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Save up to $800 with select carrier deals at Apple.</Text>
            <Text style={styles.body}>Get the carrier deals you love and save on a new iPhone when you trade in and purchase right here at Apple.</Text>
            <View style={styles.logoRow}>
              <Image source={photos.att} style={styles.carrier} resizeMode="contain" />
              <Image source={photos.tmo} style={styles.carrier} resizeMode="contain" />
              <Image source={photos.verizon} style={styles.carrier} resizeMode="contain" />
            </View>
            <LinkText label="Find your deal" onPress={() => open(shop.deals)} />
          </View>
          <View onLayout={mark("card")} style={styles.bleedCard}>
            <FullImage source={photos.card} ratio={675 / 357} style={styles.photoTop} />
            <View style={styles.bleedCopy}>
              <Text style={styles.cardTitle}>Get 3% Daily Cash back with Apple Card.</Text>
              <Text style={styles.body}>And pay for your new iPhone over 24 months, interest-free when you choose to check out with Apple Card Monthly Installments.</Text>
              <LinkText label="Learn more" onPress={() => open(pages.card)} />
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Why Apple is the best place to buy iPhone.</Text>
            <Text style={styles.body}>You can choose a payment option that works for you, pay less with a trade-in, connect your new iPhone to your carrier, and get set up quickly. You can also chat with a Specialist anytime.</Text>
            <LinkText label="Learn more" onPress={() => open(pages.iphone)} />
          </View>
        </Rise>

        <Rise onLayout={mark("accessories")} style={styles.block}>
          <Text style={styles.sectionTitle}>Featured accessories</Text>
          <View style={styles.bleedCard}>
            <FullImage source={photos.magsafe} ratio={633 / 463} style={styles.photoTop} />
            <View style={styles.bleedCopy}>
              <Text style={[styles.cardTitle, styles.centerTitle]}>MagSafe</Text>
              <Text style={styles.body}>Snap on a magnetic case, wallet, or both. And get faster wireless charging.</Text>
              <LinkText label="Shop MagSafe accessories" onPress={() => open(shop.magsafe)} />
            </View>
          </View>
          <View onLayout={mark("airtag")} style={styles.bleedCard}>
            <FullImage source={photos.airtag} ratio={806 / 531} />
            <View style={styles.bleedCopy}>
              <Text style={[styles.cardTitle, styles.centerTitle]}>AirTag</Text>
              <Text style={styles.body}>Attach one to your keys. Put another in your backpack. If they’re misplaced, just use the Find My app.</Text>
              <View style={styles.actions}>
                <Pill label="Buy" onPress={() => open(shop.airtag)} />
                <LinkText label="Learn more" onPress={() => open(pages.airtag)} />
              </View>
            </View>
          </View>
          <View onLayout={mark("airpods")} style={styles.bleedCard}>
            <FullImage source={photos.airpods} ratio={1063 / 498} />
            <View style={styles.bleedCopy}>
              <Text style={[styles.cardTitle, styles.centerTitle]}>Magic runs in the family.</Text>
              <Text style={styles.body}>Explore all AirPods models and find the best ones for you.</Text>
              <LinkText label="Learn more" onPress={() => open(pages.airpods)} />
            </View>
          </View>
        </Rise>

        <Rise style={styles.perkRow}>
          {[
            [photos.delivery, "Free delivery"],
            [photos.payments, "Flexible payments"],
            [photos.sessions, "Guided sessions"],
          ].map(([source, label]) => (
            <View key={label} style={styles.perk}>
              <Image source={source} style={styles.perkIcon} resizeMode="contain" />
              <Text style={styles.perkLabel}>{label}</Text>
            </View>
          ))}
        </Rise>

        <Rise onLayout={mark("ios")} style={styles.card}>
          <Text style={styles.cardTitle}>iOS 16</Text>
          <Text style={styles.body}>Personal is powerful.</Text>
          <LinkText label="Learn more" onPress={() => open(pages.ios)} />
        </Rise>

        <Rise style={styles.block}>
          <Text style={styles.sectionTitle}>Get more out of your iPhone.</Text>
          <View style={styles.bleedCard}>
            <View style={styles.oneFrame}>
              <FullImage source={photos.one} ratio={542 / 329} style={styles.oneImage} />
            </View>
            <View style={styles.centeredCopy}>
              <ServiceHeading word="One" />
              <Text style={styles.body}>Bundle up to six Apple services. And enjoy more for less.</Text>
              <View style={styles.actions}>
                <Pill label="Try it free" onPress={() => open(pages.one)} />
                <LinkText label="Learn more" onPress={() => open(pages.one)} />
              </View>
            </View>
          </View>
          <View onLayout={mark("tv")} style={styles.bleedCard}>
            <FullImage source={photos.tvPoster} ratio={475 / 267} />
            <View style={styles.centeredCopy}>
              <ServiceHeading word="TV+" />
              <Text style={styles.body}>Get 3 months of Apple TV+ free when you buy an iPhone.</Text>
              <View style={styles.actions}>
                <Pill label="Try it free" onPress={() => open(pages.tv)} />
                <LinkText label="Learn more" onPress={() => open(pages.tv)} />
              </View>
            </View>
          </View>
          <View onLayout={mark("music")} style={styles.bleedCard}>
            <View style={styles.albums}>
              <Image source={photos.albumLeft} style={styles.album} resizeMode="cover" />
              <Image source={photos.albumMiddle} style={styles.album} resizeMode="cover" />
              <Image source={photos.albumRight} style={styles.album} resizeMode="cover" />
            </View>
            <View style={styles.centeredCopy}>
              <ServiceHeading word="Music" />
              <Text style={styles.body}>Over 100 million songs. Start listening for free today.</Text>
              <View style={styles.actions}>
                <Pill label="Try it free" onPress={() => open(pages.music)} />
                <LinkText label="Learn more" onPress={() => open(pages.music)} />
              </View>
            </View>
          </View>
          <View onLayout={mark("news")} style={styles.bleedCard}>
            <View style={styles.newsFrame}>
              <Image source={photos.newsPhoto} resizeMode="cover" style={styles.newsImage} />
            </View>
            <View style={styles.centeredCopy}>
              <ServiceHeading word="News+" />
              <Text style={styles.body}>Get 3 months of Apple News+ free when you buy an iPhone.</Text>
              <LinkText label="Learn more" onPress={() => open(pages.news)} />
            </View>
          </View>
          <View onLayout={mark("arcade")} style={styles.bleedCard}>
            <Image source={photos.arcadeMark} style={styles.arcadeMark} resizeMode="contain" />
            <View style={styles.centeredCopy}>
              <ServiceHeading word="Arcade" />
              <Text style={styles.body}>Get 3 months of Apple Arcade free when you buy an iPhone.</Text>
              <View style={styles.actions}>
                <Pill label="Try it free" onPress={() => open(pages.arcade)} />
                <LinkText label="Learn more" onPress={() => open(pages.arcade)} />
              </View>
            </View>
          </View>
          <View onLayout={mark("fitness")} style={styles.bleedCard}>
            <FullImage source={photos.fitnessMark} ratio={602 / 299} />
            <View style={styles.centeredCopy}>
              <ServiceHeading word="Fitness+" />
              <Text style={styles.body}>Fitness for everyone. Now all you need is iPhone.</Text>
              <View style={styles.actions}>
                <Pill label="Try it free" onPress={() => open(pages.fitness)} />
                <LinkText label="Learn more" onPress={() => open(pages.fitness)} />
              </View>
            </View>
          </View>
          <View style={styles.bleedCard}>
            <FullImage source={photos.research} ratio={675 / 319} />
            <View style={styles.centeredCopy}>
              <ServiceHeading word="Gift Card" />
              <Text style={styles.body}>For everything and everyone.</Text>
              <View style={styles.actions}>
                <Pill label="Buy" onPress={() => open(shop.gift)} />
                <LinkText label="Learn more" onPress={() => open(shop.gift)} />
              </View>
            </View>
          </View>
          <View style={styles.bleedCard}>
            <FullImage source={photos.shopBanner} ratio={766 / 388} />
            <View style={styles.bleedCopy}>
              <Text style={styles.cardTitle}>Introducing the Apple Research app.</Text>
              <Text style={styles.body}>The future of health research is you.</Text>
              <LinkText label="Learn more" onPress={() => open(pages.research)} />
            </View>
          </View>
        </Rise>

        <Rise onLayout={mark("shop")} style={styles.card}>
          <Text style={styles.cardTitle}>Shop iPhone</Text>
          <Text style={styles.body}>
            <Text>Find an </Text>
            <Text style={styles.link} onPress={() => open(pages.stores)}>Apple Store</Text>
            <Text> or </Text>
            <Text style={styles.link} onPress={() => open(pages.retail)}>other retailer</Text>
            <Text> near you. Or call 1-800-MY-APPLE.</Text>
          </Text>
          <LinkText label="Shop all iPhone accessories" onPress={() => open(shop.accessories)} />
        </Rise>

        <Rise style={styles.footer}>
          {footerGroups.map(([title, items]) => {
            const openGroup = footerOpen === title;
            return (
              <View key={title}>
                <Pressable accessibilityRole="button" onPress={() => setFooterOpen(openGroup ? null : title)} style={styles.footerHead}>
                  <Text style={styles.footerTitle}>{title}</Text>
                  <Text style={styles.footerMark}>{openGroup ? "–" : "+"}</Text>
                </Pressable>
                {openGroup && items.map(([label, url]) => (
                  <Pressable key={label} onPress={() => open(url)} style={styles.footerLink}>
                    <Text style={styles.footerLinkText}>{label}</Text>
                  </Pressable>
                ))}
              </View>
            );
          })}
          <Text style={styles.legal}>
            Apple Card Monthly Installments is subject to credit approval and credit limit. Taxes and shipping are not included in the monthly installment amount. See the Apple Card Customer Agreement for more information. Valid for qualifying purchases in the Apple Store and Apple Store app when you choose to check out with Apple Card Monthly Installments. Subject to credit approval and credit limit. Variable APRs for Apple Card other than Apple Card Monthly Installments range from 13.24% to 24.24% based on creditworthiness. Rates as of August 2022. Existing customers can view their variable APR in the Wallet app or at{" "}
            <Text style={styles.legalLink} onPress={() => open(pages.card)}>apple.com/apple-card</Text>
            .
          </Text>
          <Text style={styles.legal}>
            To access and use all Apple Card features and products available only to Apple Card users, you must add Apple Card to Wallet on an iPhone or iPad that supports and has the latest version of iOS or iPadOS. Apple Card is subject to credit approval, available only for qualifying applicants in the United States, and issued by Goldman Sachs Bank USA, Salt Lake City Branch. Apple Card Monthly Installments are subject to the{" "}
            <Text style={styles.underline} onPress={() => open(pages.terms)}>terms</Text>
            {" "}of the Apple Card Customer Agreement.
          </Text>
          <Text style={styles.legal}>
            Apple TV+ is $6.99/month after a free trial. One subscription per Family Sharing group. Offer good for 3 months after eligible device activation. Plan automatically renews until cancelled. Restrictions and other{" "}
            <Text style={styles.underline} onPress={() => open(pages.terms)}>terms</Text>
            {" "}apply.
          </Text>
          <Text style={styles.legal}>
            New subscribers only. $10.99/month after trial. Plan automatically renews until cancelled. Restrictions and other{" "}
            <Text style={styles.underline} onPress={() => open(pages.terms)}>terms</Text>
            {" "}apply.
          </Text>
          <Text style={styles.legal}>
            Apple Fitness+ requires a subscription and Apple Watch.{" "}
            <Text style={styles.underline} onPress={() => open(pages.terms)}>Terms</Text>
            {" "}apply.
          </Text>
          <View style={styles.footerMeta}>
            <AppleMark />
            <Text style={styles.meta}>United States</Text>
            <Pressable onPress={() => setPanel("region")}>
              <Text style={styles.metaLink}>Choose region</Text>
            </Pressable>
          </View>
          <Text style={styles.meta}>Copyright © 2026 Apple Inc. All rights reserved.</Text>
          <View style={styles.metaLinks}>
            {[
              ["Privacy Policy", pages.privacyFooter],
              ["Terms of Use", pages.terms],
              ["Sales and Refunds", pages.sales],
              ["Legal", pages.legal],
              ["Site Map", pages.sitemap],
            ].map(([label, url]) => (
              <Pressable key={label} onPress={() => open(url)}>
                <Text style={styles.metaLink}>{label}</Text>
              </Pressable>
            ))}
          </View>
        </Rise>
      </ScrollView>

      {menuOpen && (
        <Sheet title="Menu" onClose={() => setMenuOpen(false)}>
          {menuItems.map(([label, url]) => (
            <Pressable key={label} onPress={() => open(url)} style={styles.menuRow}>
              <Text style={styles.menuLabel}>{label}</Text>
            </Pressable>
          ))}
        </Sheet>
      )}
      {panel === "search" && (
        <SearchModal
          onClose={() => {
            setPanel(null);
            setQuery("");
          }}
        >
          <View style={styles.searchField}>
            <TextInput
              autoFocus
              value={query}
              onChangeText={setQuery}
              placeholder="Search this page"
              placeholderTextColor="#6e6e73"
              underlineColorAndroid="transparent"
              style={styles.search}
            />
            {query.length > 0 ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Clear search"
                onPress={() => setQuery("")}
                hitSlop={8}
                style={styles.searchClear}
              >
                <Text style={styles.searchClearMark}>×</Text>
              </Pressable>
            ) : null}
          </View>
          {jumps.map(([label, id]) => (
            <Pressable key={label} onPress={() => jump(id)} style={styles.menuRow}>
              <Text style={styles.menuLabel}>{label}</Text>
            </Pressable>
          ))}
          {jumps.length === 0 && <Text style={styles.body}>No matching sections.</Text>}
        </SearchModal>
      )}
      {panel === "bag" && (
        <Sheet title="Bag" onClose={() => setPanel(null)}>
          <Text style={styles.body}>Your bag is empty.</Text>
          <LinkText label="Review bag on apple.com" onPress={() => open(shop.bag)} />
        </Sheet>
      )}
      {panel === "film" && (
        <Sheet title="Watch the film" onClose={() => setPanel(null)}>
          <Text style={styles.body}>The guided tour plays on Apple’s iPhone 14 Pro page.</Text>
          <Pill label="Open film page" onPress={() => open(pages.iphone14pro)} />
        </Sheet>
      )}
      {panel === "region" && (
        <Sheet title="United States" onClose={() => setPanel(null)}>
          <Text style={styles.body}>You’re viewing the United States store.</Text>
        </Sheet>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, width: "100%", minWidth: 0, overflow: "hidden", backgroundColor: "#f5f5f7" },
  riseHost: { width: "100%", alignSelf: "stretch" },
  nav: {
    height: 48,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(251,251,253,0.94)",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#d2d2d7",
  },
  navSide: { flexDirection: "row", alignItems: "center", gap: 14 },
  navAction: { width: 28, height: 28, alignItems: "center", justifyContent: "center" },
  navIcon: { fontFamily: font, fontSize: 20, color: "#1d1d1f", lineHeight: 20 },
  apple: { fontFamily: font, fontSize: 20, color: "#1d1d1f" },
  chapterClip: {
    width: "100%",
    maxWidth: "100%",
    minWidth: 0,
    overflow: "hidden",
    backgroundColor: "#fbfbfd",
    paddingBottom: 16,
  },
  chapterBar: { width: "100%", maxHeight: 96 },
  chapterRow: { paddingHorizontal: 8, alignItems: "center" },
  chapter: { width: 84, overflow: "hidden", alignItems: "center", justifyContent: "flex-start", paddingTop: 8, paddingHorizontal: 4, gap: 4 },
  chapterIcon: { width: 28, height: 40 },
  bag: { width: 16, height: 18, alignItems: "center", justifyContent: "center" },
  bagHandle: {
    width: 8,
    height: 5,
    borderWidth: 1.2,
    borderColor: "#1d1d1f",
    borderBottomWidth: 0,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  bagBody: { width: 14, height: 11, marginTop: -1, borderWidth: 1.2, borderColor: "#1d1d1f", borderRadius: 2 },
  searchMark: { width: 18, height: 18, alignItems: "center", justifyContent: "center" },
  searchCircle: {
    width: 12,
    height: 12,
    marginTop: -2,
    marginLeft: -2,
    borderRadius: 6,
    borderWidth: 1.4,
    borderColor: "#1d1d1f",
  },
  searchHandle: {
    position: "absolute",
    width: 7,
    height: 1.5,
    right: 0,
    bottom: 2,
    backgroundColor: "#1d1d1f",
    borderRadius: 1,
    transform: [{ rotate: "45deg" }],
  },
  chapterLabel: { fontFamily: font, width: "100%", fontSize: 10, lineHeight: 12, color: "#1d1d1f", textAlign: "center" },
  mainScroll: { flex: 1, width: "100%", minWidth: 0 },
  page: { width: "100%", paddingBottom: 48, gap: 12 },
  hero: { width: "100%", overflow: "hidden", backgroundColor: "#fff", paddingTop: 28, paddingHorizontal: 20, alignItems: "center" },
  heroDark: { backgroundColor: "#000" },
  kicker: { fontFamily: font, fontSize: 17, color: "#bf4800", marginBottom: 6 },
  wordmark: { width: "70%", maxWidth: 180, height: 28, marginBottom: 8 },
  heroTitle: { fontFamily: font, width: "100%", fontSize: 22, lineHeight: 26, fontWeight: "600", color: "#1d1d1f", textAlign: "center", letterSpacing: -0.2 },
  seTitle: { color: "rgb(49, 83, 198)" },
  onDark: { color: "#f5f5f7" },
  price: { fontFamily: font, width: "100%", fontSize: 14, lineHeight: 20, color: "#1d1d1f", textAlign: "center", marginTop: 8 },
  priceDark: { color: "#f5f5f7" },
  actions: { flexDirection: "row", alignItems: "center", alignSelf: "center", gap: 18, marginVertical: 16 },
  pillWrap: {
    borderRadius: 980,
    shadowColor: "#0071e3",
    shadowOpacity: 0.28,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  pill: { backgroundColor: "#0071e3", borderRadius: 980, paddingHorizontal: 16, paddingVertical: 8 },
  pillPressed: { backgroundColor: "#0077ed" },
  pillLight: { backgroundColor: "#0071e3" },
  pillText: { fontFamily: font, color: "#fff", fontSize: 15 },
  pillTextLight: { color: "#fff" },
  link: { fontFamily: font, color: "#0066cc", fontSize: 15 },
  linkLight: { color: "#2997ff" },
  pressed: { opacity: 0.7 },
  heroPhoto: { width: "100%", maxWidth: "100%", height: 280 },
  heroPhotoPro: { width: "100%", aspectRatio: 961 / 393 },
  card: { alignSelf: "stretch", marginHorizontal: 12, overflow: "hidden", backgroundColor: "#fff", borderRadius: 18, padding: 18, gap: 12 },
  tourCard: { alignItems: "center" },
  tourKicker: { fontFamily: font, width: "100%", fontSize: 14, lineHeight: 18, fontWeight: "600", color: "#1d1d1f", textAlign: "center" },
  tourTitle: { fontFamily: font, width: "100%", fontSize: 22, lineHeight: 26, fontWeight: "600", color: "#1d1d1f", textAlign: "center" },
  filmButton: { backgroundColor: "#0071e3", borderRadius: 980, paddingHorizontal: 18, paddingVertical: 8, alignSelf: "center" },
  filmLabel: { fontFamily: font, fontSize: 17, lineHeight: 20, color: "#fff", textAlign: "center" },
  bleedCard: { alignSelf: "stretch", marginHorizontal: 12, overflow: "hidden", backgroundColor: "#fff", borderRadius: 18 },
  fullImage: { width: "100%" },
  oneFrame: { width: "100%", alignItems: "center", paddingTop: 20, paddingBottom: 8, paddingLeft: 34, paddingRight: 14 },
  oneImage: { transform: [{ translateX: 8 }] },
  photoTop: { marginTop: 16 },
  newsFrame: { width: "100%", overflow: "hidden", aspectRatio: 675 / 330 },
  newsImage: { position: "absolute", width: "100%", aspectRatio: 675 / 600, top: "-82%" },
  bleedPhoto: { width: "100%", height: 240 },
  bleedCopy: { paddingHorizontal: 18, paddingTop: 16, paddingBottom: 18, gap: 12 },
  centeredCopy: { width: "100%", paddingHorizontal: 18, paddingTop: 16, paddingBottom: 18, gap: 12, alignItems: "center" },
  arcadeMark: { width: 132, height: 122, alignSelf: "center", marginTop: 22 },
  lockup: { flexDirection: "row", alignItems: "center", alignSelf: "center", gap: 6 },
  lockupMark: { fontFamily: font, fontSize: 22, color: "#1d1d1f" },
  lockupWord: { fontFamily: font, fontSize: 22, fontWeight: "600", color: "#1d1d1f" },
  block: { gap: 12, paddingTop: 8 },
  widePhoto: { width: "100%", height: 180, borderRadius: 12 },
  sectionTitle: { fontFamily: font, width: "100%", fontSize: 22, lineHeight: 26, fontWeight: "600", color: "#1d1d1f", letterSpacing: -0.2, paddingHorizontal: 20 },
  cardTitle: { fontFamily: font, width: "100%", fontSize: 18, lineHeight: 22, fontWeight: "600", color: "#1d1d1f", letterSpacing: -0.2 },
  centerTitle: { textAlign: "center" },
  body: { fontFamily: font, width: "100%", fontSize: 15, lineHeight: 21, color: "#6e6e73" },
  hClip: { width: "100%", maxWidth: "100%", minWidth: 0, overflow: "hidden" },
  compareRow: { paddingHorizontal: 12, gap: 12 },
  compareCard: { width: 260, overflow: "hidden", backgroundColor: "#fff", borderRadius: 18, padding: 16, gap: 8 },
  comparePhone: { width: "100%", height: 188 },
  compareColors: { width: "100%", height: 36 },
  swatch: { width: 72, height: 16 },
  compareTitle: { fontFamily: font, width: "100%", fontSize: 15, lineHeight: 18, fontWeight: "600", color: "#1d1d1f", textAlign: "center" },
  comparePrice: { fontFamily: font, width: "100%", fontSize: 12, lineHeight: 16, color: "#6e6e73", textAlign: "center" },
  specWindow: { width: "100%", overflow: "hidden" },
  specFade: { position: "absolute", left: 0, right: 0, bottom: 0, height: 22 },
  specFadeBand: { flex: 1 },
  specRow: { flexDirection: "row", alignItems: "flex-start", gap: 8, marginTop: 2 },
  specIcon: { width: 16, height: 16, marginTop: 1 },
  specLabel: { fontFamily: font, flex: 1, fontSize: 11, lineHeight: 14, color: "#6e6e73" },
  logoRow: { width: "100%", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 8 },
  carrier: { width: 88, maxWidth: "30%", height: 28 },
  perkRow: { flexDirection: "row", gap: 8, paddingHorizontal: 12 },
  perk: { flex: 1, backgroundColor: "#fff", borderRadius: 18, padding: 12, alignItems: "center", gap: 8 },
  perkIcon: { width: 48, height: 48 },
  perkLabel: { fontFamily: font, fontSize: 12, lineHeight: 16, color: "#1d1d1f", textAlign: "center" },
  serviceMark: { width: 140, height: 28 },
  albums: { width: "100%", flexDirection: "row" },
  album: { flex: 1, height: 118 },
  footer: { marginTop: 12, paddingHorizontal: 20, paddingBottom: 24, backgroundColor: "#f5f5f7", gap: 4 },
  footerHead: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: "#d2d2d7" },
  footerTitle: { fontFamily: font, fontSize: 12, fontWeight: "600", color: "#1d1d1f" },
  footerMark: { fontFamily: font, fontSize: 16, color: "#6e6e73" },
  footerLink: { paddingVertical: 8, paddingLeft: 8 },
  footerLinkText: { fontFamily: font, fontSize: 12, color: "#424245" },
  legal: { fontFamily: font, fontSize: 11, lineHeight: 15, color: "#6e6e73", marginTop: 10 },
  legalLink: { fontFamily: font, color: "#424245" },
  underline: { fontFamily: font, textDecorationLine: "underline", color: "#6e6e73" },
  footerMeta: { flexDirection: "row", alignItems: "center", gap: 12, marginTop: 16 },
  meta: { fontFamily: font, fontSize: 11, color: "#6e6e73" },
  metaLinks: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 8 },
  metaLink: { fontFamily: font, fontSize: 11, color: "#424245" },
  overlay: { flex: 1, backgroundColor: "rgba(29,29,31,0.4)", justifyContent: "flex-end" },
  sheet: { backgroundColor: "#fbfbfd", borderTopLeftRadius: 18, borderTopRightRadius: 18, padding: 20, gap: 12, maxHeight: "80%", width: "100%" },
  sheetBody: { flexGrow: 0 },
  sheetContent: { gap: 12, paddingBottom: 12 },
  sheetHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 },
  sheetTitle: { fontFamily: font, fontSize: 22, fontWeight: "600", color: "#1d1d1f", letterSpacing: -0.2 },
  close: { fontFamily: font, fontSize: 15, color: "#0066cc" },
  searchOverlay: {
    flex: 1,
    backgroundColor: "rgba(29,29,31,0.45)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  searchModal: {
    width: "100%",
    maxWidth: 350,
    height: 520,
    backgroundColor: "#fbfbfd",
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 12,
    overflow: "hidden",
  },
  searchModalBody: { flex: 1, marginTop: 8 },
  searchModalContent: { gap: 4, paddingBottom: 16 },
  searchField: {
    position: "relative",
    justifyContent: "center",
    marginBottom: 8,
  },
  menuRow: { paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: "#d2d2d7" },
  menuLabel: { fontFamily: font, fontSize: 20, color: "#1d1d1f" },
  search: {
    fontFamily: font,
    fontSize: 17,
    color: "#1d1d1f",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingRight: 42,
    paddingVertical: 12,
    borderWidth: 0,
    outlineStyle: "none",
    outlineWidth: 0,
    boxShadow: "none",
  },
  searchClear: {
    position: "absolute",
    right: 10,
    top: 0,
    bottom: 0,
    width: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  searchClearMark: {
    fontFamily: font,
    fontSize: 22,
    lineHeight: 24,
    color: "#6e6e73",
  },
});
