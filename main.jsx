import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const mediaUrl = (fileName) =>
  `https://github.com/13687950156a-arch/ai-/releases/download/media-v1/${fileName}`;

const profile = {
  name: "有森",
  intro:
    "我专注于 AI 产品体验、生成式视觉系统与人机协作流程设计，把复杂模型能力转译成清晰、可信、可落地的用户体验。",
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
        title: "LPL比赛",
        type: "Live Action Edit",
        video: mediaUrl("live-lpl.mp4"),
        posterTime: 38,
      },
      {
        title: "真人MV",
        type: "Music Video",
        video: mediaUrl("live-mv.mp4"),
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
        title: "泡泡玛特 PV",
        type: "Cartoon IP Film",
        video: mediaUrl("cartoon-popmart-pv.mp4"),
        posterTime: 4,
      },
    ],
  },
  {
    category: "恐怖",
    label: "Horror",
    desc: "恐怖氛围、悬疑节奏、暗黑视觉与情绪化镜头语言。",
    works: [
      {
        title: "冥币时代 第一集",
        type: "Horror Episode",
        video: mediaUrl("horror-mingbi-ep1.mp4"),
        posterTime: 25,
      },
      {
        title: "诡异降临 第二集",
        type: "Horror Episode",
        video: mediaUrl("horror-mingbi-ep2.mp4"),
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
        title: "剑仙女友 第一集",
        type: "Comic Drama Episode",
        video: mediaUrl("comic-jianxian-ep1.mp4"),
        posterTime: 21,
      },
      {
        title: "剑仙女友 第二集",
        type: "Comic Drama Episode",
        video: mediaUrl("comic-jianxian-ep2.mp4"),
        posterTime: 4,
      },
      {
        title: "剑仙女友 第三集",
        type: "Comic Drama Preview",
        video: mediaUrl("comic-jianxian-ep3-preview.mp4"),
        posterTime: 16,
      },
      {
        title: "火龙飞",
        type: "Comic Drama Short",
        video: mediaUrl("comic-huolongfei-19s.mp4"),
      },
    ],
  },
];

const strengths = [
  {
    title: "AI 产品理解",
    text: "理解模型能力边界、上下文结构与用户信任机制，能把技术机会转成体验方案。",
  },
  {
    title: "流程与原型",
    text: "擅长从需求拆解、用户路径、交互原型到可验证 demo 的快速闭环。",
  },
  {
    title: "视觉系统",
    text: "建立克制而有识别度的界面语言，让 AI 产品不只强大，也清晰、稳定、可信。",
  },
  {
    title: "跨团队协作",
    text: "能与产品、算法、前端协同，把抽象体验决策落到组件、状态与交付规范。",
  },
];

const heroCategories = ["真人", "卡通 IP", "恐怖", "漫剧"];

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
  const [activeProject, setActiveProject] = React.useState("LPL比赛");
  const [modalProject, setModalProject] = React.useState(null);

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

  return (
    <main>
      <CursorGlow />
      <PortfolioMotion />

      <section className="hero" id="home">
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

        <div className="heroInner shell">
          <div className="heroTitleBlock">
            <div className="eyebrow">AI DESIGNER / CREATIVE TECHNOLOGY</div>
            <h1>
              <span className="heroTitleLine">Designing Calm Interfaces</span>
              <span className="heroTitleLine">for Intelligent Systems</span>
            </h1>
          </div>

          <div className="heroVideoStage">
            <video className="heroVideo" autoPlay muted loop playsInline>
              <source src={mediaUrl("hero-video.mp4")} type="video/mp4" />
            </video>
          </div>

          <div className="heroStatement">
            <p>
              以产品体验为核心，连接生成式 AI、视觉设计与可执行原型，构建高级、克制且真正可用的智能产品体验。
            </p>
            <div className="heroContactBar">
              <a href={`mailto:${profile.email}`}>预约沟通</a>
            </div>
          </div>

          <div className="heroCategoryGrid" aria-label="作品类型">
            {heroCategories.map((item, index) => (
              <a className="heroCategoryCard motionCard" href="#projects" key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="experience section motionSection" id="experience">
        <div className="shell experienceShowcase">
          <div className="experienceInfo motionCard">
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
          </div>

          <div className="experienceVisual motionCard imageReveal">
            <div className="experienceVisualMeta">体验策略 / 视觉系统 / AI 产品落地</div>
            <img className="revealImage" src="/media/avatar-yousen.jpg" alt="有森头像" />
            <div className="experienceCopyright">Copyright 2026 © 有森</div>
          </div>
        </div>
      </section>

      <section className="section projects motionSection" id="projects">
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
                        <video
                          className="revealImage projectVideo"
                          src={project.video}
                          muted
                          preload="none"
                          playsInline
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
              <h2>个人优势</h2>
            </div>
            <p>从策略、交互、视觉到原型验证，围绕 AI 产品的真实使用场景建立完整设计链路。</p>
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
          <h2>Let’s build the next intelligent experience.</h2>
          <p>欢迎发送简历补充、项目截图或参考网站，我会继续把这个基础版本打磨成更贴近你个人风格的作品集。</p>
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
              controls
              autoPlay
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
