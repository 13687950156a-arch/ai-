Exit code: 0
Wall time: 4.1 seconds
Output:
import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const isLocalPreview =
  window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost";
const assetBase = import.meta.env.BASE_URL;
const siteAsset = (path) => `${assetBase}${path}`;
const posterUrl = (fileName) => siteAsset(`posters/${fileName}`);
const ossMediaBaseUrl = "https://yousen-ai-portfolio.oss-cn-hangzhou.aliyuncs.com/videos/";
const releaseMediaUrl = (fileName) =>
  isLocalPreview ? siteAsset(`media/${fileName}`) : `${ossMediaBaseUrl}${fileName}`;

const profile = {
  name: "鏈夋．",
  intro:
    "鎴戜笓娉ㄤ簬 AI 浜у搧浣撻獙銆佺敓鎴愬紡瑙嗚绯荤粺涓庝汉鏈哄崗浣滄祦绋嬭璁★紝鎶婂鏉傛ā鍨嬭兘鍔涜浆璇戞垚娓呮櫚銆佸彲淇°€佸彲钀藉湴鐨勭敤鎴蜂綋楠屻€?,
  email: "584761225@qq.com",
  phone: "13687950156",
  location: "鏉窞",
};

const stats = [
  { value: "12+", label: "AI 浜у搧涓庢蹇甸」鐩? },
  { value: "6", label: "绔埌绔璁℃祦绋? },
  { value: "3.8x", label: "鍘熷瀷杩唬鏁堢巼鎻愬崌" },
  { value: "24h", label: "蹇€熼獙璇佸懆鏈? },
];

const projectGroups = [
  {
    category: "鐪熶汉",
    label: "Live Action",
    desc: "鐪熶汉褰卞儚銆丄I MV銆佽櫄瀹炵粨鍚堣瑙変笌鍙帶鐢熸垚娴佺▼銆?,
    works: [
      {
        title: "LPL姣旇禌",
        type: "Live Action Edit",
        video: releaseMediaUrl("live-lpl.mp4"),
        poster: posterUrl("live-lpl-lite.jpg"),
        posterTime: 38,
      },
      {
        title: "鐪熶汉MV",
        type: "Music Video",
        video: releaseMediaUrl("live-mv.mp4"),
        poster: posterUrl("live-mv-lite.jpg"),
        posterTime: 49,
      },
    ],
  },
  {
    category: "鍗￠€?IP",
    label: "Cartoon IP",
    desc: "瑙掕壊璁惧畾銆両P 涓栫晫瑙傘€佽〃鎯呭姩浣滃欢灞曚笌绯诲垪鍖栬瑙夎祫浜с€?,
    works: [
      {
        title: "娉℃场鐜涚壒 PV",
        type: "Cartoon IP Film",
        video: releaseMediaUrl("cartoon-popmart-pv.mp4"),
        poster: posterUrl("cartoon-popmart-pv-lite.jpg"),
        posterTime: 4,
      },
    ],
  },
  {
    category: "鎭愭€?,
    label: "Horror",
    desc: "鎭愭€栨皼鍥淬€佹偓鐤戣妭濂忋€佹殫榛戣瑙変笌鎯呯华鍖栭暅澶磋瑷€銆?,
    works: [
      {
        title: "鍐ュ竵鏃朵唬 绗竴闆?,
        type: "Horror Episode",
        video: releaseMediaUrl("horror-mingbi-ep1.mp4"),
        poster: posterUrl("horror-mingbi-ep1-lite.jpg"),
        posterTime: 25,
      },
      {
        title: "璇″紓闄嶄复 绗簩闆?,
        type: "Horror Episode",
        video: releaseMediaUrl("horror-mingbi-ep2.mp4"),
        poster: posterUrl("horror-mingbi-ep2-lite.jpg"),
        posterTime: 51,
      },
    ],
  },
  {
    category: "婕墽",
    label: "Comic Drama",
    desc: "AI 婕墽鍒嗛暅銆佽鑹蹭竴鑷存€с€佸姩鎬侀暅澶翠笌鎵归噺鍖栧唴瀹圭敓浜с€?,
    works: [
      {
        title: "鍓戜粰濂冲弸 绗竴闆?,
        type: "Comic Drama Episode",
        video: releaseMediaUrl("comic-jianxian-ep1.mp4"),
        poster: posterUrl("comic-jianxian-ep1-lite.jpg"),
        posterTime: 21,
      },
      {
        title: "鍓戜粰濂冲弸 绗簩闆?,
        type: "Comic Drama Episode",
        video: releaseMediaUrl("comic-jianxian-ep2.mp4"),
        poster: posterUrl("comic-jianxian-ep2-lite.jpg"),
        posterTime: 4,
      },
      {
        title: "鍓戜粰濂冲弸 绗笁闆?,
        type: "Comic Drama Preview",
        video: releaseMediaUrl("comic-jianxian-ep3-preview.mp4"),
        poster: posterUrl("comic-jianxian-ep3-preview-lite.jpg"),
        posterTime: 16,
      },
      {
        title: "鐏緳椋?,
        type: "Comic Drama Short",
        video: releaseMediaUrl("comic-huolongfei-19s.mp4"),
        poster: posterUrl("comic-huolongfei-19s-lite.jpg"),
      },
    ],
  },
];

const strengths = [
  {
    title: "AI 浜у搧鐞嗚В",
    text: "鐞嗚В妯″瀷鑳藉姏杈圭晫銆佷笂涓嬫枃缁撴瀯涓庣敤鎴蜂俊浠绘満鍒讹紝鑳芥妸鎶€鏈満浼氳浆鎴愪綋楠屾柟妗堛€?,
  },
  {
    title: "娴佺▼涓庡師鍨?,
    text: "鎿呴暱浠庨渶姹傛媶瑙ｃ€佺敤鎴疯矾寰勩€佷氦浜掑師鍨嬪埌鍙獙璇?demo 鐨勫揩閫熼棴鐜€?,
  },
  {
    title: "瑙嗚绯荤粺",
    text: "寤虹珛鍏嬪埗鑰屾湁璇嗗埆搴︾殑鐣岄潰璇█锛岃 AI 浜у搧涓嶅彧寮哄ぇ锛屼篃娓呮櫚銆佺ǔ瀹氥€佸彲淇°€?,
  },
  {
    title: "璺ㄥ洟闃熷崗浣?,
    text: "鑳戒笌浜у搧銆佺畻娉曘€佸墠绔崗鍚岋紝鎶婃娊璞′綋楠屽喅绛栬惤鍒扮粍浠躲€佺姸鎬佷笌浜や粯瑙勮寖銆?,
  },
];

const heroCategories = [
  { name: "鐪熶汉", target: "live-action" },
  { name: "鍗￠€?IP", target: "cartoon-ip" },
  { name: "鎭愭€?, target: "horror" },
  { name: "婕墽", target: "comic-drama" },
];

function CursorGlow() {
  React.useEffect(() => {
    const root = document.documentElement;

    const handlePointerMove = (event) => {
      root.style.setProperty("--cursor-x", `${event.clientX}px`);
      root.style.setProperty("--cursor-y", `${event.clientY}px`);
      root.classList.add("has-cursor");
    };

    const handlePointerLeave = () => {
      root.classList.remove("has-cursor");
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return <div className="cursorGlow" aria-hidden="true" />;
}

function PortfolioMotion() {
  React.useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return undefined;

    let context;
    let disposed = false;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
      .then(([gsapModule, scrollTriggerModule]) => {
        if (disposed) return;

        const gsap = gsapModule.default;
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        context = gsap.context(() => {
          const ease = "expo.out";

          gsap
            .timeline({ defaults: { ease } })
            .from(".nav", { y: -28, autoAlpha: 0, duration: 1.0 })
            .from(".hero .eyebrow", { y: 32, autoAlpha: 0, duration: 0.9 }, "-=0.55")
            .from(
              ".heroTitleLine",
              {
                yPercent: 120,
                scaleY: 0.62,
                clipPath: "inset(100% 0 0 0)",
                transformOrigin: "50% 100%",
                duration: 1.35,
                stagger: 0.14,
              },
              "-=0.5",
            )
            .from(
              ".heroVideoStage",
              {
                y: 70,
                autoAlpha: 0,
                scale: 0.96,
                clipPath: "inset(14% 0 14% 0 round 24px)",
                duration: 1.35,
              },
              "-=0.9",
            )
            .from(".heroStatement", { y: 42, autoAlpha: 0, duration: 1.05 }, "-=0.78")
            .from(
              ".heroCategoryCard",
              {
                y: 64,
                autoAlpha: 0,
                clipPath: "inset(0 0 100% 0 round 18px)",
                duration: 1,
                stagger: 0.09,
              },
              "-=0.64",
            );

          gsap.utils.toArray(".motionSection").forEach((section) => {
            const title = section.querySelector(".motionTitle");
            const cards = section.querySelectorAll(".motionCard, .experienceInfo, .experienceVisual");

            if (title) {
              gsap.from(title, {
                scrollTrigger: { trigger: section, start: "top 72%" },
                y: 150,
                autoAlpha: 0,
                scaleY: 0.66,
                clipPath: "inset(100% 0 0 0)",
                transformOrigin: "50% 100%",
                duration: 1.25,
                ease,
              });
            }

            if (cards.length) {
              gsap.from(cards, {
                scrollTrigger: { trigger: section, start: "top 64%" },
                y: 86,
                autoAlpha: 0,
                clipPath: "inset(0 0 22% 0 round 28px)",
                duration: 1.1,
                stagger: 0.13,
                ease: "power4.out",
              });
            }
          });

          gsap.utils.toArray(".revealImage").forEach((image) => {
            const parent = image.parentElement;
            gsap.fromTo(
              image,
              { scale: 1.12, yPercent: -5 },
              {
                scale: 1.02,
                yPercent: 5,
                ease: "none",
                scrollTrigger: {
                  trigger: parent,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.8,
                },
              },
            );
          });
        });
      })
      .catch(() => {});

    return () => {
      disposed = true;
      if (context) context.revert();
    };
  }, []);

  return null;
}

function App() {
  const [activeProject, setActiveProject] = React.useState("LPL姣旇禌");
  const [modalProject, setModalProject] = React.useState(null);
  const [loadHeroVideo, setLoadHeroVideo] = React.useState(false);
  const [heroVideoLoaded, setHeroVideoLoaded] = React.useState(false);
  const [isNavPinned, setIsNavPinned] = React.useState(false);

  React.useEffect(() => {
    if (window.location.hash) return undefined;

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    let delayedReset;
    const resetScroll = () => {
      window.scrollTo(0, 0);
      delayedReset = window.setTimeout(() => window.scrollTo(0, 0), 120);
    };

    const frame = window.requestAnimationFrame(resetScroll);
    window.addEventListener("pageshow", resetScroll);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(delayedReset);
      window.removeEventListener("pageshow", resetScroll);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  React.useEffect(() => {
    let timer;
    const loadVideo = () => {
      timer = window.setTimeout(() => setLoadHeroVideo(true), 1600);
    };

    if (document.readyState === "complete") {
      loadVideo();
    } else {
      window.addEventListener("load", loadVideo, { once: true });
    }

    return () => {
      window.removeEventListener("load", loadVideo);
      window.clearTimeout(timer);
    };
  }, []);

  React.useEffect(() => {
    if (!modalProject) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setModalProject(null);
    };

    document.body.classList.add("hasVideoModal");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("hasVideoModal");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalProject]);

  React.useEffect(() => {
    const updateNavPinned = () => {
      const experienceSection = document.getElementById("experience");
      if (!experienceSection) return;

      setIsNavPinned(experienceSection.getBoundingClientRect().top <= 92);
    };

    updateNavPinned();
    window.addEventListener("scroll", updateNavPinned, { passive: true });
    window.addEventListener("resize", updateNavPinned);

    return () => {
      window.removeEventListener("scroll", updateNavPinned);
      window.removeEventListener("resize", updateNavPinned);
    };
  }, []);

  return (
    <main>
      <CursorGlow />
      <PortfolioMotion />

      <section className="hero" id="home">
        <nav className={`nav shell ${isNavPinned ? "isPinned" : ""}`} aria-label="涓诲鑸?>
          <a className="brand" href="#home">
            <span className="brandMark" />
            AI Designer
          </a>
          <div className="navLinks">
            <a href="#experience">缁忓巻</a>
            <a href="#projects">椤圭洰</a>
            <a href="#strengths">浼樺娍</a>
            <a href="#contact">鑱旂郴</a>
          </div>
          <a className="contactBtn" href={`mailto:${profile.email}`}>
            鑱旂郴鎴?
          </a>
        </nav>

        <div className="heroInner shell">
          <div className="heroTitleBlock">
            <div className="eyebrow">AI DESIGNER / CREATIVE TECHNOLOGY</div>
            <h1>
              <span className="heroTitleLine">Designing Calm Interfaces</span>
              <span className="heroTitleLine">for Intelligent Systems</span>
            </h1>
          </div>

          <div className="heroVideoStage">
            <img
              className={`heroPoster ${heroVideoLoaded ? "isHidden" : ""}`}
              src={posterUrl("hero-video-lite.jpg")}
              alt=""
              fetchPriority="high"
            />
            {loadHeroVideo ? (
              <video
                className={`heroVideo ${heroVideoLoaded ? "isLoaded" : ""}`}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={posterUrl("hero-video-lite.jpg")}
                onCanPlay={() => setHeroVideoLoaded(true)}
              >
                <source src={releaseMediaUrl("hero-video.mp4")} type="video/mp4" />
              </video>
            ) : null}
          </div>

          <div className="heroStatement">
            <p>
              浠ヤ骇鍝佷綋楠屼负鏍稿績锛岃繛鎺ョ敓鎴愬紡 AI銆佽瑙夎璁′笌鍙墽琛屽師鍨嬶紝鏋勫缓楂樼骇銆佸厠鍒朵笖鐪熸鍙敤鐨勬櫤鑳戒骇鍝佷綋楠屻€?
            </p>
            <div className="heroContactBar">
              <a href={`mailto:${profile.email}`}>棰勭害娌熼€?/a>
            </div>
          </div>

          <div className="heroCategoryGrid" aria-label="浣滃搧绫诲瀷">
            {heroCategories.map((item, index) => (
              <a
                className="heroCategoryCard motionCard"
                href={`#${item.target}`}
                key={item.target}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.name}</strong>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="experience section motionSection" id="experience">
        <div className="shell experienceShowcase">
          <div className="experienceInfo motionCard">
            <div className="experienceTopline">
              <span>鈼忊棆 Lucky 2026</span>
              <span>{profile.email}</span>
            </div>

            <div className="experienceHeadline">
              <span>銆?/span>
              <strong>{profile.name}</strong>
              <span>銆?/span>
            </div>

            <p className="experienceLead">{profile.intro}</p>

            <div className="experienceBadges">
              <span>AI Product Designer</span>
              <span>Creative Technology</span>
            </div>

            <div className="experienceContactPill">
              <a href={`tel:${profile.phone}`}>{profile.phone}</a>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <span>{profile.location}</span>
            </div>

            <div className="experienceMetrics">
              <div>
                <strong>12+</strong>
                <span>AI 浜у搧涓庢蹇甸」鐩?/span>
              </div>
              <div>
                <strong>3.8x</strong>
                <span>鍘熷瀷杩唬鏁堢巼鎻愬崌</span>
              </div>
            </div>

            <div className="experienceFootnote">Case 2024 - 2026</div>
          </div>

          <div className="experienceVisual motionCard imageReveal">
            <div className="experienceVisualMeta">浣撻獙绛栫暐 / 瑙嗚绯荤粺 / AI 浜у搧钀藉湴</div>
            <img className="revealImage" src={siteAsset("media/avatar-yousen.jpg")} alt="鏈夋．澶村儚" />
            <div className="experienceCopyright">Copyright 2026 漏 鏈夋．</div>
          </div>
        </div>
      </section>

      <section className="section projects motionSection" id="projects">
        <div className="shell">
          <div className="sectionHeader">
            <div>
              <span className="sectionLabel">SELECTED WORKS</span>
              <div className="motionTitle">SELECTED WORKS</div>
              <h2>绮鹃€夐」鐩?/h2>
            </div>
          </div>
          <div className="projectStack">
            {projectGroups.map((group, groupIndex) => (
              <section
                className={`projectModule motionCard ${
                  group.works.some((project) => project.video) ? "projectModuleVideo" : ""
                } ${
                  group.works.filter((project) => project.video).length === 1
                    ? "projectModuleVideoSingle"
                    : ""
                } ${
                  group.works.filter((project) => project.video).length > 1
                    ? "projectModuleVideoStack"
                    : ""
                }`}
                key={group.category}
                id={heroCategories[groupIndex]?.target}
              >
                <div className="projectModuleInfo">
                  <span>{String(groupIndex + 1).padStart(2, "0")}</span>
                  <h3>{group.category}</h3>
                  <p>{group.desc}</p>
                  <em>{group.label}</em>
                </div>
                <div className="projectModuleWorks">
                  {group.works.map((project) => (
                    <article
                      className={`projectCard imageReveal ${
                        project.video && activeProject === project.title ? "isActive" : ""
                      }`}
                      key={project.title}
                      onClick={() => {
                        if (project.video) {
                          setActiveProject(project.title);
                          setModalProject(project);
                        }
                      }}
                    >
                      {project.video ? (
                        <img
                          className="revealImage projectPoster"
                          src={project.poster}
                          alt={project.title}
                          loading="lazy"
                        />
                      ) : (
                        <img className="revealImage" src={project.image} alt={project.title} />
                      )}
                      <div className="projectInfo">
                        <span>{project.type}</span>
                        <h3>{project.title}</h3>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="section strengths motionSection" id="strengths">
        <div className="shell">
          <div className="sectionHeader split">
            <div>
              <span className="sectionLabel">CAPABILITIES</span>
              <div className="motionTitle">CAPABILITIES</div>
              <h2>涓汉浼樺娍</h2>
            </div>
            <p>浠庣瓥鐣ャ€佷氦浜掋€佽瑙夊埌鍘熷瀷楠岃瘉锛屽洿缁?AI 浜у搧鐨勭湡瀹炰娇鐢ㄥ満鏅缓绔嬪畬鏁磋璁￠摼璺€?/p>
          </div>

          <div className="strengthGrid">
            {strengths.map((item) => (
              <article className="strengthCard motionCard" key={item.title}>
                <div className="iconBox" />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contactSection motionSection" id="contact">
        <div className="shell contactInner motionCard">
          <span className="sectionLabel">CONTACT</span>
          <div className="motionTitle">CONTACT</div>
          <h2>Let鈥檚 build the next intelligent experience.</h2>
          <p>娆㈣繋鍙戦€佺畝鍘嗚ˉ鍏呫€侀」鐩埅鍥炬垨鍙傝€冪綉绔欙紝鎴戜細缁х画鎶婅繖涓熀纭€鐗堟湰鎵撶（鎴愭洿璐磋繎浣犱釜浜洪鏍肩殑浣滃搧闆嗐€?/p>
          <a className="primaryAction" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </div>
      </section>

      {modalProject ? (
        <div
          className="videoModal"
          role="dialog"
          aria-modal="true"
          aria-label={modalProject.title}
          onClick={() => setModalProject(null)}
        >
          <button
            className="videoModalClose"
            type="button"
            aria-label="Close video"
            onClick={() => setModalProject(null)}
          >
            Close
          </button>
          <div className="videoModalInner" onClick={(event) => event.stopPropagation()}>
            <video
              className="videoModalPlayer"
              src={modalProject.video}
              poster={modalProject.poster}
              controls
              autoPlay
              preload="metadata"
              playsInline
            />
            <div className="videoModalCaption">
              <span>{modalProject.type}</span>
              <strong>{modalProject.title}</strong>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);

