import React from "react";
import { createRoot } from "react-dom/client";
import BorderGlow from "./BorderGlow";
import SideRays from "./SideRays";
import TargetCursor from "./TargetCursor";
import "./styles.css";

const isLocalPreview =
  window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost";
const assetBase = import.meta.env.BASE_URL;
const siteAsset = (path) => `${assetBase}${path}`;
const ossSiteBaseUrl = "https://yousen-ai-portfolio.oss-cn-hangzhou.aliyuncs.com/site/";
const releaseSiteAsset = (path) =>
  isLocalPreview ? siteAsset(path) : `${ossSiteBaseUrl}${path}`;
const posterUrl = (fileName) => releaseSiteAsset(`posters/${fileName}`);
const ossMediaBaseUrl = "https://yousen-ai-portfolio.oss-cn-hangzhou.aliyuncs.com/videos/";
const releaseMediaUrl = (fileName) =>
  isLocalPreview ? siteAsset(`media/${fileName}`) : `${ossMediaBaseUrl}${fileName}`;
const is360Browser = /(?:360se|360ee|qihoo|qhbrowser|360chrome)/i.test(navigator.userAgent);

const borderGlowTheme = {
  edgeSensitivity: 30,
  glowColor: "43 93 61",
  backgroundColor: "#0f0e0a",
  glowRadius: 30,
  glowIntensity: 0.88,
  coneSpread: 24,
  animated: false,
  colors: ["#f6be25", "#e49c12", "#fff1c7"],
  fillOpacity: 0.34,
};

const profile = {
  name: "有森",
  intro:
    "拥有 5 年商业三维渲染与国际级大展主视觉沉淀，曾任职于国内顶尖 AI 创作团队 niaoniao，长期深度主导商业化 AI 视觉项目落地，并担任 AI 体系化助教与工作流研发。不被工具边界设限，驾驭全栈生成式 AI 工具库，把最前沿的技术转译为具电影感、可预测、高落地的商业美学。",
  email: "584761225@qq.com",
  phone: "13687950156",
  location: "杭州",
};

const stats = [
  { value: "12+", label: "AI 产品与概念项目" },
  { value: "6", label: "端到端设计流程" },
  { value: "3.8x", label: "原型迭代效率提升" },
  { value: "24h", label: "快速验证周期" },
];

const projectGroups = [
  {
    category: "真人",
    label: "Live Action",
    desc: "真人影像、AI MV、虚实结合视觉与可控生成流程。",
    works: [
      {
        title: "《LPL 官方概念  赛事主题 PV》",
        type: "Live Action Edit",
        video: releaseMediaUrl("live-lpl.mp4"),
        poster: posterUrl("live-lpl-lite.jpg"),
        posterTime: 38,
      },
      {
        title: "《失重的海风  风格化影像 MV》",
        type: "Music Video",
        video: releaseMediaUrl("live-mv.mp4"),
        poster: posterUrl("live-mv-lite.jpg"),
        posterTime: 49,
      },
    ],
  },
  {
    category: "卡通 IP",
    label: "Cartoon IP",
    desc: "角色设定、IP 世界观、表情动作延展与系列化视觉资产。",
    works: [
      {
        title: "《泡泡玛特  品牌 PV》",
        type: "Cartoon IP Film",
        video: releaseMediaUrl("cartoon-popmart-pv.mp4"),
        poster: posterUrl("cartoon-popmart-pv-lite.jpg"),
        posterTime: 4,
      },
      {
        title: "《中国海警官方宣传片》",
        type: "Cartoon IP Film",
        video: releaseMediaUrl("cartoon-china-coast-guard.mp4"),
        poster: posterUrl("cartoon-china-coast-guard-lite.jpg"),
        posterTime: 18,
      },
    ],
  },
  {
    category: "恐怖",
    label: "Horror",
    desc: "恐怖氛围、悬疑节奏、暗黑视觉与情绪化镜头语言。",
    works: [
      {
        title: "《诡异降临  我靠铸币买下神明 第一集》",
        type: "Horror Episode",
        video: releaseMediaUrl("horror-mingbi-ep1.mp4"),
        poster: posterUrl("horror-mingbi-ep1-lite.jpg"),
        posterTime: 25,
      },
      {
        title: "《诡异降临  我靠铸币买下神明 第二集》",
        type: "Horror Episode",
        video: releaseMediaUrl("horror-mingbi-ep2.mp4"),
        poster: posterUrl("horror-mingbi-ep2-lite.jpg"),
        posterTime: 51,
      },
    ],
  },
  {
    category: "漫剧",
    label: "Comic Drama",
    desc: "AI 漫剧分镜、角色一致性、动态镜头与批量化内容生产。",
    works: [
      {
        title: "《我的电子剑仙女友 第一集》",
        type: "Comic Drama Episode",
        video: releaseMediaUrl("comic-jianxian-ep1.mp4"),
        poster: posterUrl("comic-jianxian-ep1-lite.jpg"),
        posterTime: 21,
      },
      {
        title: "《我的电子剑仙女友 第二集》",
        type: "Comic Drama Episode",
        video: releaseMediaUrl("comic-jianxian-ep2.mp4"),
        poster: posterUrl("comic-jianxian-ep2-lite.jpg"),
        posterTime: 4,
      },
      {
        title: "《我的电子剑仙女友 第三集》",
        type: "Comic Drama Preview",
        video: releaseMediaUrl("comic-jianxian-ep3-preview.mp4"),
        poster: posterUrl("comic-jianxian-ep3-preview-lite.jpg"),
        posterTime: 16,
      },
      {
        title: "《灰烬之翼  概念视效 PV》",
        type: "Comic Drama Short",
        video: releaseMediaUrl("comic-huolongfei-19s.mp4"),
        poster: posterUrl("comic-huolongfei-19s-lite.jpg"),
      },
    ],
  },
];

const strengths = [
  {
    title: "电影感视觉叙事",
    text: "不仅追求画面的极佳精度，更专注镜头语言、光影审美与情绪共鸣，让每一帧都有影视故事感。",
  },
  {
    title: "AI 动态影像工作流",
    text: "精通最新的生成式视频技术，掌控从概念美术、动态分镜到超高清视效表达的全流程。",
  },
  {
    title: "风格化概念设定",
    text: "擅长突破现实物理限制，打造充满想象力的超现实生物、科幻空间与先锋视觉符号。",
  },
  {
    title: "商业化高精落地",
    text: "以正规成熟的设计审美为底座，确保 AI 产出的每一帧画质、比例与材质都经得起商业视界审视。",
  },
];

const heroCategories = [
  { name: "真人", target: "live-action" },
  { name: "卡通 IP", target: "cartoon-ip" },
  { name: "恐怖", target: "horror" },
  { name: "漫剧", target: "comic-drama" },
];

function CursorGlow() {
  React.useEffect(() => {
    if (is360Browser) return undefined;

    const root = document.documentElement;
    let frameId = 0;
    let pointerX = 0;
    let pointerY = 0;

    const handlePointerMove = (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (frameId) return;
      frameId = window.requestAnimationFrame(() => {
        root.style.setProperty("--cursor-x", `${pointerX}px`);
        root.style.setProperty("--cursor-y", `${pointerY}px`);
        root.classList.add("has-cursor");
        frameId = 0;
      });
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
    let cleanupProjectTitleScroll = () => {};
    let cleanupProjectReveals = () => {};
    let disposed = false;
    let hasUserScrolled = false;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
      .then(([gsapModule, scrollTriggerModule]) => {
        if (disposed) return;

        const gsap = gsapModule.default;
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
        const scrollContainer = document.querySelector(".siteScroll");
        if (!scrollContainer) return;

        gsap.registerPlugin(ScrollTrigger);

        context = gsap.context(() => {
          const ease = "power3.out";
          const revealEase = "power3.out";

          gsap
            .timeline({
              defaults: { ease },
              scrollTrigger: {
                trigger: ".hero",
                start: "top 85%",
                scroller: scrollContainer,
                once: true,
              },
            })
            .from(".nav", { y: -24, autoAlpha: 0, duration: 0.9, force3D: true })
            .from(".hero .eyebrow", { y: 24, autoAlpha: 0, filter: "blur(8px)", duration: 0.8, force3D: true }, "-=0.5")
            .from(
              ".heroTitleLine",
              {
                y: 44,
                autoAlpha: 0,
                filter: "blur(12px)",
                duration: 1.05,
                stagger: 0.14,
                force3D: true,
              },
              "-=0.5",
            )
            .addLabel("heroVideoIn", "-=0.9")
            .from(
              ".heroVideoStage",
              {
                y: 46,
                autoAlpha: 0,
                duration: 1.05,
                force3D: true,
              },
              "heroVideoIn",
            )
            .from(".heroStatement", { y: 26, autoAlpha: 0, duration: 0.9, force3D: true }, "-=0.72")
            .fromTo(
              ".heroCategoryCard",
              {
                autoAlpha: 0,
                filter: "blur(10px)",
              },
              {
                autoAlpha: 1,
                filter: "blur(0px)",
                duration: 0.49,
                stagger: 0.055,
                ease: "power3.out",
                force3D: true,
              },
              "heroVideoIn",
            )
            .from(
              ".heroCategoryCard > .border-glow-inner",
              {
                autoAlpha: 0,
                filter: "blur(10px)",
                duration: 0.49,
                stagger: 0.055,
                ease: "power3.out",
                force3D: true,
              },
              "<",
            )
            .set(".heroCategoryCard", {
              clearProps: "filter,opacity,visibility,transform",
            })
            .set(".heroCategoryCard > .border-glow-inner", {
              clearProps: "filter,opacity,visibility,transform",
            });

          gsap.utils.toArray(".motionSection").forEach((section) => {
            const title = section.querySelector(".motionTitle");
            const cards = section.querySelectorAll(".motionCard, .experienceInfo, .experienceVisual");

            if (title) {
              gsap.from(title, {
                scrollTrigger: {
                  trigger: section,
                  start: "top 72%",
                  scroller: scrollContainer,
                },
                y: 48,
                autoAlpha: 0,
                filter: "blur(10px)",
                duration: 0.95,
                ease: revealEase,
                force3D: true,
              });
            }

            if (cards.length) {
              gsap.from(cards, {
                scrollTrigger: {
                  trigger: section,
                  start: "top 64%",
                  scroller: scrollContainer,
                },
                y: 42,
                autoAlpha: 0,
                duration: 0.9,
                stagger: 0.1,
                ease: revealEase,
                force3D: true,
              });
            }
          });

          const aboutSection = document.querySelector(".creatorAbout");
          if (aboutSection) {
            const aboutTimeline = gsap.timeline({
              defaults: { ease: "expo.out" },
              scrollTrigger: {
                trigger: aboutSection,
                start: "top 80%",
                scroller: scrollContainer,
                once: true,
              },
            });

            aboutTimeline
              .from(".creatorAboutTitleReveal .char", {
                x: -30,
                autoAlpha: 0,
                filter: "blur(12px)",
                duration: 1.09,
                stagger: 0.036,
                ease: "power3.out",
                force3D: true,
              })
              .from(".creatorAboutReplacement > .creatorAboutLead", {
                y: 30,
                autoAlpha: 0,
                duration: 1.14,
                ease: "power4.out",
                force3D: true,
              }, "-=0.73")
              .from(".creatorAboutReplacement .creatorAboutMatrix article, .creatorAboutReplacement .creatorAboutTags, .creatorAboutReplacement > .creatorGradientPill", {
                y: 40,
                autoAlpha: 0,
                duration: 1.09,
                stagger: 0.136,
                ease: "power4.out",
                force3D: true,
              }, "-=0.55")
              .from(".creatorAboutPortrait", {
                y: 26,
                scale: 0.965,
                autoAlpha: 0,
                duration: 1.2,
                ease: "power4.out",
                force3D: true,
              }, 0.28);
          }

          gsap.utils
            .toArray(
              ".creatorSectionKicker, .creatorServices h3, .creatorContactCard",
            )
            .forEach((element) => {
              const isTitle = element.matches("h1, h2, h3, .creatorSectionKicker, .motionTitle");
              gsap.from(element, {
                scrollTrigger: {
                  trigger: element,
                  start: "top 86%",
                  scroller: scrollContainer,
                  once: true,
                },
                y: 44,
                autoAlpha: 0,
                ...(isTitle ? { filter: "blur(12px)" } : {}),
                duration: isTitle ? 1.05 : 0.9,
                ease: isTitle ? "power3.out" : revealEase,
                force3D: true,
              });
            });

          const projectPanels = gsap.utils.toArray(".creatorProjectPanel");
          const projectRevealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              entry.target.__projectReveal?.();
              projectRevealObserver.unobserve(entry.target);
            });
          }, {
            root: scrollContainer,
            rootMargin: "0px 0px -8% 0px",
            threshold: 0.08,
          });

          projectPanels.forEach((panel) => {
            const headerItems = panel.querySelectorAll(
              ".creatorProjectNumber, .creatorProjectPanelHeader > div, .creatorGhostButton",
            );
            const previews = panel.querySelectorAll(".creatorProjectPreview");
            const previewImages = panel.querySelectorAll(".creatorProjectPreview img");
            const previewOverlays = panel.querySelectorAll(
              ".creatorProjectPlay, .creatorProjectTitle",
            );

            gsap.set(panel, { y: 36, autoAlpha: 0, filter: "blur(10px)" });
            gsap.set(headerItems, { y: 18, autoAlpha: 0, filter: "blur(8px)" });
            gsap.set(previews, {
              y: 28,
              autoAlpha: 0,
              filter: "blur(10px)",
              clipPath: "inset(5% 0% 0% 0% round 46px)",
            });
            gsap.set(previewImages, { scale: 1.04, yPercent: 1, filter: "blur(4px)" });
            gsap.set(previewOverlays, { y: 12, autoAlpha: 0, filter: "blur(6px)" });

            const projectTimeline = gsap.timeline({
              paused: true,
              defaults: { ease: "power3.out", force3D: true },
            });

            projectTimeline
              .to(panel, {
                y: 0,
                autoAlpha: 1,
                filter: "blur(0px)",
                duration: 0.7,
              })
              .to(headerItems, {
                y: 0,
                autoAlpha: 1,
                filter: "blur(0px)",
                duration: 0.58,
                stagger: 0.05,
              }, "-=0.34")
              .to(previews, {
                y: 0,
                autoAlpha: 1,
                filter: "blur(0px)",
                clipPath: "inset(0% 0% 0% 0% round 46px)",
                duration: 0.8,
                stagger: 0.08,
              }, "-=0.26")
              .to(previewImages, {
                scale: 1.01,
                yPercent: 0,
                filter: "blur(0px)",
                duration: 0.9,
                stagger: 0.08,
              }, "<")
              .to(previewOverlays, {
                y: 0,
                autoAlpha: 1,
                filter: "blur(0px)",
                duration: 0.5,
                stagger: 0.04,
              }, "-=0.5")
              .set([panel, ...headerItems, ...previews, ...previewImages, ...previewOverlays], {
                clearProps: "transform,opacity,visibility,filter,clipPath",
              });

            let hasRevealed = false;
            panel.__projectReveal = () => {
              if (hasRevealed) return;
              hasRevealed = true;
              projectTimeline.play(0);
            };
            projectRevealObserver.observe(panel);
          });
          cleanupProjectReveals = () => {
            projectRevealObserver.disconnect();
            projectPanels.forEach((panel) => {
              delete panel.__projectReveal;
            });
          };

          const sectionTitles = gsap.utils.toArray(
            ".creatorProjects h2, .creatorServices h2, .creatorContact h2, .creatorServicesList",
          );
          if (sectionTitles.length) {
            const titleReveals = sectionTitles.map((title) => gsap.fromTo(title, {
              y: 44,
              autoAlpha: 0,
              filter: "blur(12px)",
            }, {
              y: 0,
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: 1.05,
              ease: "power3.out",
              force3D: true,
              paused: true,
            }));

            let hasRevealed = sectionTitles.map(() => false);
            let lastScrollTop = scrollContainer.scrollTop;
            const markUserScroll = () => {
              hasUserScrolled = true;
            };
            const revealOnScroll = () => {
              const currentScrollTop = scrollContainer.scrollTop;
              if (currentScrollTop === lastScrollTop || !hasUserScrolled) return;
              lastScrollTop = currentScrollTop;
              const containerRect = scrollContainer.getBoundingClientRect();
              const triggerLine = containerRect.top + containerRect.height * 0.78;

              sectionTitles.forEach((title, index) => {
                if (hasRevealed[index]) return;
                const titleRect = title.getBoundingClientRect();
                if (titleRect.top > triggerLine || titleRect.bottom < containerRect.top) return;
                hasRevealed[index] = true;
                titleReveals[index].play(0);
              });

              if (hasRevealed.every(Boolean)) {
                scrollContainer.removeEventListener("scroll", revealOnScroll);
                scrollContainer.removeEventListener("wheel", markUserScroll);
                scrollContainer.removeEventListener("touchmove", markUserScroll);
                scrollContainer.removeEventListener("keydown", markUserScroll);
              }
            };

            scrollContainer.addEventListener("scroll", revealOnScroll, { passive: true });
            scrollContainer.addEventListener("wheel", markUserScroll, { passive: true });
            scrollContainer.addEventListener("touchmove", markUserScroll, { passive: true });
            scrollContainer.addEventListener("keydown", markUserScroll);
            cleanupProjectTitleScroll = () => {
              scrollContainer.removeEventListener("scroll", revealOnScroll);
              scrollContainer.removeEventListener("wheel", markUserScroll);
              scrollContainer.removeEventListener("touchmove", markUserScroll);
              scrollContainer.removeEventListener("keydown", markUserScroll);
            };
          }

          gsap.utils.toArray(".revealImage").forEach((image) => {
            const parent = image.parentElement;
            gsap.fromTo(
              image,
              { scale: 1.06, yPercent: -2 },
              {
                scale: 1.02,
                yPercent: 2,
                ease: "none",
                scrollTrigger: {
                  trigger: parent,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.8,
                  scroller: scrollContainer,
                },
              },
            );
          });

          ScrollTrigger.refresh();
        });
      })
      .catch(() => {});

    return () => {
      window.cancelAnimationFrame(frameId);
      disposed = true;
      cleanupProjectTitleScroll();
      cleanupProjectReveals();
      if (context) context.revert();
    };
  }, []);

  return null;
}

function WorkMarquee({ works, reverse = false }) {
  const displayedWorks = [...works, ...works];

  return (
    <div className={`creatorMarqueeViewport ${reverse ? "isReverse" : ""}`} aria-hidden="true">
      <div className="creatorMarqueeTrack">
        {displayedWorks.map((work, index) => (
          <figure className="creatorMarqueeCard" key={`${work.title}-${index}`}>
            <img src={work.poster} alt="" loading="lazy" />
            <figcaption>
              <span>{work.title}</span>
              <small>{work.type}</small>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

function SplitTitle({ children }) {
  return String(children).split("").map((character, index) => (
    <span className="char" key={`${character}-${index}`}>
      {character === " " ? "\u00a0" : character}
    </span>
  ));
}

function ViewportPerformance() {
  React.useEffect(() => {
    const scrollRoot = document.querySelector(".siteScroll");
    if (!scrollRoot || !("IntersectionObserver" in window)) return undefined;

    const sections = Array.from(
      scrollRoot.querySelectorAll(
        ".hero, .creatorMarqueeSection, .creatorAbout, .creatorProjects, .creatorServices, .creatorContact",
      ),
    );

    const updateVideo = (section, isOffscreen) => {
      const video = section.querySelector(".heroVideo");
      if (!video) return;

      if (isOffscreen) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isOffscreen = !entry.isIntersecting;
          entry.target.classList.toggle("isOffscreen", isOffscreen);
          updateVideo(entry.target, isOffscreen);
        });
      },
      { root: scrollRoot, rootMargin: "180px 0px", threshold: 0.01 },
    );

    sections.forEach((section) => {
      section.classList.add("viewportManaged");
      observer.observe(section);
    });

    const videoObserver = new MutationObserver(() => {
      sections.forEach((section) => {
        if (section.classList.contains("isOffscreen")) updateVideo(section, true);
      });
    });
    videoObserver.observe(scrollRoot, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      videoObserver.disconnect();
      sections.forEach((section) => {
        section.classList.remove("viewportManaged", "isOffscreen");
      });
    };
  }, []);

  return null;
}

function App() {
  const [modalProject, setModalProject] = React.useState(null);
  const [loadHeroVideo, setLoadHeroVideo] = React.useState(false);
  const [heroVideoLoaded, setHeroVideoLoaded] = React.useState(false);

  React.useEffect(() => {
    if (!is360Browser) return undefined;

    document.documentElement.classList.add("is360Browser");
    return () => document.documentElement.classList.remove("is360Browser");
  }, []);

  const handleCategoryNavigate = React.useCallback((event, target) => {
    event.preventDefault();

    const destination = document.getElementById(target);
    if (!destination) return;

    window.history.replaceState(null, "", `#${target}`);
    destination.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  React.useEffect(() => {
    if (window.location.hash) return undefined;

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    let delayedReset;
    const resetScroll = () => {
      const scrollContainer = document.querySelector(".siteScroll");
      scrollContainer?.scrollTo(0, 0);
      delayedReset = window.setTimeout(() => scrollContainer?.scrollTo(0, 0), 120);
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

  const reelWorks = projectGroups.flatMap((group) => group.works);
  const heroReel = {
    title: "AI VISUAL SHOWREEL",
    type: "SELECTED FRAMES",
    video: releaseMediaUrl("hero-video.mp4"),
    poster: posterUrl("hero-video-lite.jpg"),
  };

  return (
    <>
    {!is360Browser && <TargetCursor />}
    <div className="siteFrame">
      <header className="siteHeader">
        <nav className="nav shell" aria-label="主导航">
          <a className="brand" href="#home">
            <span className="brandMark" />
            AI Designer
          </a>
          <div className="navLinks">
            <a href="#experience">经历</a>
            <a href="#projects">项目</a>
            <a href="#strengths">优势</a>
            <a href="#contact">联系</a>
          </div>
          <a className="contactBtn" href={`mailto:${profile.email}`}>
            联系我
          </a>
        </nav>
      </header>

      <main className="siteScroll">
        <CursorGlow />
        <PortfolioMotion />
        <ViewportPerformance />

        <section className="hero" id="home">
        {!is360Browser && <SideRays
          className="heroSideRays"
          speed={0.42}
          rayColor1="#f6be25"
          rayColor2="#e7d6a2"
          intensity={0.78}
          spread={1.2}
          origin="top-right"
          tilt={-12}
          saturation={0.72}
          blend={0.32}
          falloff={2.15}
          opacity={0.34}
        />}

        <div className="heroInner shell">
          <div className="heroTitleBlock">
            <div className="eyebrow">AI VISUAL ARTIST / FILM &amp; MOTION</div>
            <h1>
              <span className="heroTitleLine">Crafting Cinematic Worlds</span>
              <span className="heroTitleLine">Through Generative AI</span>
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
            <button
              className="heroPlayButton"
              type="button"
              onClick={() => setModalProject(heroReel)}
              aria-label="播放 AI Visual Showreel"
            >
              <span className="heroPlayIcon">▶</span>
              <span>PLAY SHOWREEL</span>
            </button>
          </div>

          <div className="heroStatement">
            <p>
              AI Visual Artist &amp; Director.
              <br />
              Exploring cinematic storytelling through generative AI workflows.
            </p>
          </div>

          <div
            className="heroCategoryGrid"
            aria-label="作品类型"
          >
            {heroCategories.map((item, index) => (
              <BorderGlow
                {...borderGlowTheme}
                as="a"
                className="heroCategoryCard motionCard"
                backgroundColor="#0c0d0e"
                glowColor="210 12 88"
                colors={["#eef3f4", "#aab8bc", "#dce5e7"]}
                href={`#${item.target}`}
                onClick={(event) => handleCategoryNavigate(event, item.target)}
                key={item.target}
                borderRadius={18}
                glowRadius={24}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.name}</strong>
              </BorderGlow>
            ))}
          </div>
        </div>
        </section>

      <div className="creatorPage">
        <section className="creatorMarqueeSection" aria-label="Selected work preview">
          <div className="creatorMarqueeIntro shell">
            <span>SELECTED FRAMES / 01</span>
          </div>
          <WorkMarquee works={reelWorks.slice(0, 5)} />
          <WorkMarquee works={reelWorks.slice(5)} reverse />
        </section>

        <section className="creatorAbout" id="experience">
          <div className="creatorAboutCopy">
            <span className="creatorSectionKicker">ABOUT ME / 02</span>
            <div className="creatorAboutTitleReveal">
              <h2><SplitTitle>5 YEARS 3D &amp; AI VISUAL DIRECTOR</SplitTitle></h2>
            </div>
            <div className="creatorAboutGrid">
              <div className="creatorAboutText">
                <div className="creatorAboutReplacement">
                  <p className="creatorAboutLead">
                    融合 <strong>5年</strong>商业三维美学沉淀，历经 <strong>阿里巴巴</strong> 与顶尖团队 <mark>niaoniao</mark> 核心操盘。精通 <mark>全栈 Gen-AI 视效</mark>，曾主导 <mark>POP MART、LPL、CES 与广交会</mark> 等头部 IP 与国际大展主视觉。
                  </p>
                  <div className="creatorAboutMatrix" aria-label="核心能力">
                    <article>
                      <span>01</span>
                      <div>
                        <strong>全栈 AI 导演与视觉叙事</strong>
                        <p>精通 C4D+OC 渲染与后期视效，具备从三维到动态渲染的完整链路制片能力</p>
                      </div>
                    </article>
                    <article>
                      <span>02</span>
                      <div>
                        <strong>AI 动态影像工作流 SOP</strong>
                        <p>打通 3D 资产与多模态生成，将尖端生成式 AI 技术转化为商业可落地的标准化出片流</p>
                      </div>
                    </article>
                    <article>
                      <span>03</span>
                      <div>
                        <strong>大厂与头部 IP 视觉操盘</strong>
                        <p>深谙头部品牌诉求，成功主导阿里巴巴、泡泡玛特、LPL 等核心主视觉落地</p>
                      </div>
                    </article>
                  </div>
                  <div className="creatorAboutTags" aria-label="核心能力">
                    <span>阿里 &amp; niaoniao 背景</span>
                    <span>5年 3D/AI 商业视效</span>
                    <span>泡泡玛特/LPL 大片</span>
                    <span>CES/广交会主视觉</span>
                  </div>
                  <a className="creatorGradientPill" href={`mailto:${profile.email}`}>
                    START A CONVERSATION <span>&rarr;</span>
                  </a>
                </div>
                <p className="creatorAboutLead">
                  <strong>5年</strong>商业三维美学沉淀，前顶尖 AI 团队 <mark>niaoniao</mark> 核心成员/AI 助教。
                  精通<mark>全流程 Gen-AI 视频与影视视效</mark>，主导 <mark>CES、广交会</mark> 等国际大展主视觉。
                </p>
                <div className="creatorAboutMatrix" aria-label="三大核心赋能矩阵">
                  <article>
                    <span>01</span>
                    <div>
                      <strong>全栈 AI 视频与动态影像</strong>
                      <p>精通 Gen-AI 视效与 CG 级镜头落地</p>
                    </div>
                  </article>
                  <article>
                    <span>02</span>
                    <div>
                      <strong>前 niaoniao 核心成员 &amp; AI 助教</strong>
                      <p>SOP 流程沉淀与团队赋能经验</p>
                    </div>
                  </article>
                  <article>
                    <span>03</span>
                    <div>
                      <strong>国际大展与商业高精视觉</strong>
                      <p>5年 3D 渲染美学保障</p>
                    </div>
                  </article>
                </div>
                <div className="creatorAboutTags" aria-label="核心能力">
                  <span>前 niaoniao AI 助教</span>
                  <span>5年 3D/AI 经验</span>
                  <span>全流程 AI 视频</span>
                  <span>CES/广交会项目</span>
                </div>
                <a className="creatorGradientPill" href={`mailto:${profile.email}`}>
                  START A CONVERSATION <span>&rarr;</span>
                </a>
              </div>
              <div className="creatorAboutPortrait">
                <img src={releaseSiteAsset("media/avatar-yousen.jpg")} alt="" loading="lazy" />
                <span>Yousen / 2026</span>
              </div>
            </div>
          </div>
        </section>

        <section className="creatorProjects" id="projects">
          <div className="creatorProjectsHeader shell">
            <span className="creatorSectionKicker">SELECTED WORKS / 04</span>
            <h2>PROJECTS</h2>
          </div>
          <div className="creatorProjectStack shell">
            {projectGroups.map((group, index) => {
              const featuredProject = group.works[0];

              return (
                <article
                  className="creatorProjectPanel"
                  key={group.category}
                >
                    <header className="creatorProjectPanelHeader">
                      <span className="creatorProjectNumber">{String(index + 1).padStart(2, "0")}</span>
                      <div>
                        <span>{group.label}</span>
                        <h3>{group.category}</h3>
                      </div>
                      <button
                        className="creatorGhostButton"
                        type="button"
                        onClick={() => {
                          setModalProject(featuredProject);
                        }}
                      >
                        WATCH WORK
                      </button>
                    </header>

                    <div className="creatorProjectGallery">
                      {group.works.map((project) => (
                        <button
                          className="creatorProjectPreview"
                          type="button"
                          key={`${project.title}-${project.type}`}
                          onClick={() => {
                            setModalProject(project);
                          }}
                        >
                          <img src={project.poster} alt={project.title} loading="lazy" />
                          <span className="creatorProjectPlay" aria-hidden="true">
                            <i>▶</i>
                            <b>PLAY SHOWREEL</b>
                          </span>
                          <span className="creatorProjectTitle">{project.title}</span>
                        </button>
                      ))}
                    </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="creatorServices" id="strengths">
          <div className="creatorServicesHeader shell">
            <span className="creatorSectionKicker">CAPABILITIES / 03</span>
            <h2>SERVICES</h2>
          </div>
          <div className="creatorServicesList shell">
            {strengths.map((item, index) => (
              <article className="creatorServiceItem" key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="creatorContact" id="contact">
          <div className="creatorContactInner shell">
            <span className="creatorSectionKicker">CONTACT / 05</span>
            <h2>LET&apos;S MAKE<br />SOMETHING<br />REMARKABLE.</h2>
            <div className="creatorContactCard">
              <a className="creatorGradientPill" href={`weixin://dl/add?yousen1104`}>
                ADD WECHAT: yousen1104 <span>&rarr;</span>
              </a>
              <div className="creatorWechatCard">
                <img src={releaseSiteAsset("media/wechat-qr.jpg")} alt="微信二维码" loading="lazy" />
                <span>扫一扫，直接添加好友。</span>
              </div>
              <a className="creatorContactPhone" href={`tel:${profile.phone}`}>
                WECHAT: yousen1104 <span>|</span> TEL: {profile.phone}
              </a>
              <a className="creatorContactEmail" href={`mailto:${profile.email}`}>
                E-MAIL: {profile.email}
              </a>
            </div>
          </div>
        </section>

        {false && <div className="legacyLowerContent" aria-hidden="true">
      <section className="experience section motionSection" id="legacy-experience">
        <div className="shell experienceShowcase">
          <BorderGlow
            {...borderGlowTheme}
            as="article"
            className="experienceInfo motionCard"
            backgroundColor="#050505"
            borderRadius="30px 8px 8px 30px"
            glowRadius={38}
          >
            <div className="experienceTopline">
              <span>●○ Lucky 2026</span>
              <span>{profile.email}</span>
            </div>

            <div className="experienceHeadline">
              <span>【</span>
              <strong>{profile.name}</strong>
              <span>】</span>
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
                <span>AI 产品与概念项目</span>
              </div>
              <div>
                <strong>3.8x</strong>
                <span>原型迭代效率提升</span>
              </div>
            </div>

            <div className="experienceFootnote">Case 2024 - 2026</div>
          </BorderGlow>

          <BorderGlow
            {...borderGlowTheme}
            as="article"
            className="experienceVisual motionCard imageReveal"
            backgroundColor="#070505"
            borderRadius="8px 30px 30px 8px"
            glowRadius={38}
          >
            <div className="experienceVisualMeta">体验策略 / 视觉系统 / AI 产品落地</div>
            <img className="revealImage" src={releaseSiteAsset("media/avatar-yousen.jpg")} alt="有森头像" />
            <div className="experienceCopyright">Copyright 2026 © 有森</div>
          </BorderGlow>
        </div>
      </section>

      <section className="section projects motionSection" id="legacy-projects">
        <div className="shell">
          <div className="sectionHeader">
            <div>
              <span className="sectionLabel">SELECTED WORKS</span>
              <div className="motionTitle">SELECTED WORKS</div>
              <h2>精选项目</h2>
            </div>
          </div>
          <div className="projectStack">
            {projectGroups.map((group, groupIndex) => (
              <BorderGlow
                {...borderGlowTheme}
                as="section"
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
                borderRadius={28}
                glowRadius={36}
              >
                <div className="projectModuleInfo">
                  <span>{String(groupIndex + 1).padStart(2, "0")}</span>
                  <h3>{group.category}</h3>
                  <p>{group.desc}</p>
                  <em>{group.label}</em>
                </div>
                <div className="projectModuleWorks">
                  {group.works.map((project) => (
                    <BorderGlow
                      {...borderGlowTheme}
                      as="article"
                      className={`projectCard imageReveal ${
                        project.video && activeProject === project.title ? "isActive" : ""
                      }`}
                      key={project.title}
                      backgroundColor="#0a0d0c"
                      borderRadius={20}
                      glowRadius={26}
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
                    </BorderGlow>
                  ))}
                </div>
              </BorderGlow>
            ))}
          </div>
        </div>
      </section>

      <section className="section strengths motionSection" id="legacy-strengths">
        <div className="shell">
          <div className="sectionHeader split">
            <div>
              <span className="sectionLabel">CAPABILITIES</span>
              <div className="motionTitle">CAPABILITIES</div>
              <h2>个人优势</h2>
            </div>
            <p>从策略、交互、视觉到原型验证，围绕 AI 产品的真实使用场景建立完整设计链路。</p>
          </div>

          <div className="strengthGrid">
            {strengths.map((item) => (
              <BorderGlow
                {...borderGlowTheme}
                as="article"
                className="strengthCard motionCard"
                key={item.title}
                backgroundColor="#101210"
                borderRadius={22}
                glowRadius={26}
              >
                <div className="iconBox" />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </BorderGlow>
            ))}
          </div>
        </div>
      </section>

      <section className="contactSection motionSection" id="legacy-contact">
        <BorderGlow
          {...borderGlowTheme}
          className="shell contactInner motionCard"
          backgroundColor="#050a0c"
          borderRadius={28}
          glowRadius={40}
        >
          <span className="sectionLabel">CONTACT</span>
          <div className="motionTitle">CONTACT</div>
          <h2>Let’s build the next intelligent experience.</h2>
          <p>欢迎发送简历补充、项目截图或参考网站，我会继续把这个基础版本打磨成更贴近你个人风格的作品集。</p>
          <a className="primaryAction" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </BorderGlow>
      </section>
        </div>}
      </div>

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
    </div>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
