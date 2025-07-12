import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger, ScrollSmoother, Observer } from "gsap/all";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, Observer);

/**
 * ScrollDragDemo Component
 * GSAP ScrollSmoother & Observer CodePen → Next.js React component (Tailwind CSS)
 */
const ScrollDragDemo: React.FC = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const sectionsRef = useRef<HTMLDivElement>(null);
    const section1Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const wrapper = wrapperRef.current!;
        const content = contentRef.current!;
        const sections = sectionsRef.current!;
        const section1 = section1Ref.current!;

        // Create smoother (desktop only)
        let smoother: ScrollSmoother | undefined;
        if (!ScrollTrigger.isTouch) {
            smoother = ScrollSmoother.create({
                wrapper,
                content,
                smooth: 0.8,
                effects: true,
            }).paused(true);
        }

        // Observer for drag interactions
        const observer = Observer.create({
            target: document.body,
            ignore: "[data-ignore]",
            type: "pointer",
            onToggleY: (self) => updateDirection(self),
            onPress: (self) => {
                gsap.set(content, { cursor: "grabbing" });
                updateDirection(self, true);
                gsap.to("body", { backgroundColor: "#111", duration: 0.5 });
                gsap.to(section1, { scale: 0.97, duration: 0.5 });
            },
            onRelease: () => {
                gsap.set(content, { cursor: "grab" });
                gsap.to(section1, { rotateX: "0deg" });
                gsap.to("body", { backgroundColor: "#222", duration: 0.5 });
                gsap.to(section1, { scale: 1, duration: 0.5 });
            },
            tolerance: 10,
        });

        // Update perspective origin and tilt
        function updateDirection(dirObs: any, immediate = false) {
            const winWidth = window.innerWidth;
            const pX = Math.floor(100 - (dirObs.startX / winWidth) * 100);
            const progress =
                smoother?.scrollTrigger?.animation?.progress() ?? 0;
            const pY = Math.floor(progress * 100);
            const props = { perspectiveOrigin: `${pX}% ${pY}%` };
            immediate
                ? gsap.set(sections, props)
                : gsap.to(sections, { ...props, duration: 0.5 });
            const tilt = dirObs.deltaY < 0 ? "3deg" : "-3deg";
            gsap.to(section1, { rotateX: tilt, duration: 0.5 });
        }

        // Intro timeline
        const introTl = gsap.timeline();
        introTl
            .fromTo(
                section1,
                {
                    transformOrigin: "center bottom",
                    autoAlpha: 0,
                    yPercent: 50,
                },
                {
                    autoAlpha: 1,
                    yPercent: 0,
                    duration: 1,
                    delay: 1,
                    ease: "expo",
                }
            )
            .from(
                ".title-1 .title-text",
                { yPercent: 100, duration: 1, ease: "power3" },
                1.5
            )
            .from(".title-2 .title-text", { autoAlpha: 0, duration: 1.5 }, 2)
            .from(
                ".sub-title-1",
                { autoAlpha: 0, x: 30, duration: 0.5, ease: "power3" },
                "-=1"
            )
            .from(
                ".sub-title-2",
                { autoAlpha: 0, x: -30, duration: 0.5, ease: "power3" },
                "-=1"
            )
            .from(
                ".credit",
                { autoAlpha: 0, duration: 0.3, onComplete: initPage },
                "-=1"
            );

        // Section 2 fade in
        gsap.fromTo(
            ".section-2 .info",
            { autoAlpha: 0 },
            {
                autoAlpha: 1,
                duration: 2,
                scrollTrigger: {
                    scrub: true,
                    trigger: ".section-2 .info",
                    start: "center 80%",
                    end: "center center",
                },
            }
        );

        function initPage() {
            if (smoother) {
                ScrollTrigger.normalizeScroll({
                    ignore: "[data-ignore]",
                    type: "pointer,wheel",
                });
                smoother.paused(false);
                observer.enable();
            }
            gsap.set(content, { cursor: "grab" });
            gsap.to(".indicator", {
                autoAlpha: 1,
                duration: 1,
                onComplete: () => {
                    gsap.fromTo(
                        ".indicator",
                        { autoAlpha: 1 },
                        {
                            autoAlpha: 0,
                            duration: 1,
                            scrollTrigger: {
                                scrub: true,
                                trigger: ".indicator",
                                start: "center 80%",
                                end: "center 70%",
                            },
                        }
                    );
                },
            });
        }

        window.addEventListener("resize", () => ScrollTrigger.refresh());

        return () => {
            observer.kill();
            smoother?.kill();
            ScrollTrigger.killAll();
        };
    }, []);

    return (
        <div ref={wrapperRef} className="w-full h-screen overflow-hidden">
            <div
                ref={contentRef}
                className="flex justify-center h-[197vh]"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(255,255,255,0.07) 2px, transparent 2px),
            linear-gradient(90deg, rgba(255,255,255,0.07) 2px, transparent 2px),
            linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`,
                    backgroundSize:
                        "100px 100px,100px 100px,20px 20px,20px 20px",
                    backgroundPosition:
                        "-2px -2px,-2px -2px,-1px -1px,-1px -1px",
                }}
            >
                <div
                    ref={sectionsRef}
                    className="[perspective:1000px] preserve-3d"
                >
                    {/* Section 1 */}
                    <section
                        ref={section1Ref}
                        className="relative z-10 w-[90vw] min-h-[calc(100vh+5vw)] mt-[5vw] bg-[#88CE02] rounded-[12px]"
                    >
                        <div className="absolute inset-0 flex items-center justify-center text-center text-[#121212] tracking-tight">
                            <div className="flex flex-wrap items-center justify-center transform -translate-y-full">
                                <div className="mt-[3.6vw] text-[2vw] font-light italic sub-title sub-title-1">
                                    <em>GSAP</em>
                                </div>
                                <div className="overflow-hidden leading-none px-[0.5ch] text-[clamp(36px,6.6vw,154px)] tracking-[-0.05em] font-bold italic title title-1">
                                    <div className="title-text">Drag Demo</div>
                                </div>
                                <div className="mt-[3.6vw] text-[2vw] font-light italic sub-title sub-title-2">
                                    <em>v3.10</em>
                                </div>
                                <div className="w-full -mt-[1.5vw] text-[clamp(30px,5.5vw,129px)] tracking-[-0.04em] font-medium italic title title-2">
                                    <div className="title-text">
                                        <span className="font-light">with</span>{" "}
                                        ScrollSmoother
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-[80vh] transform -translate-y-full text-[clamp(48px,5.5vw,129px)] opacity-0 invisible indicator">
                            <div className="pointer animate-[pointDown_2.5s_infinite]">
                                ☟
                            </div>
                        </div>
                        <div className="absolute bottom-[5vw] w-full text-[#121212] text-base flex justify-center credit">
                            By:&nbsp;
                            <a
                                href="https://vanholtz.co"
                                target="_blank"
                                rel="noopener"
                                data-ignore
                                className="font-medium"
                            >
                                Eric Van Holtz
                            </a>
                        </div>
                    </section>
                    {/* Section 2 */}
                    <section
                        className="flex flex-wrap justify-center items-center w-[90vw] min-h-screen font-light text-[clamp(24px,4.4vw,103px)] tracking-[-0.04em] text-white text-center section-2"
                        data-speed="0.75"
                    >
                        <div className="transform -translate-y-1/2 info">
                            <div className="w-full mb-1 text-base">
                                For more information visit:
                            </div>
                            <a
                                href="https://greensock.com/docs/v3/Plugins/ScrollSmoother"
                                target="_blank"
                                rel="noopener"
                                className="font-medium text-[#88CE02]"
                            >
                                The Greensock Docs
                            </a>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ScrollDragDemo;
