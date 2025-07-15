import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type TweenTarget = Parameters<typeof gsap.to>[0];

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function GSAPTest() {
    const container = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // const timeLine = gsap.timeline({ repeat: -1, repeatDelay: 1, yoyo: true });

    const { contextSafe } = useGSAP(
        () => {
            // const ti = gsap.timeline();
            // ti.to(".blue", { rotation: 360, x: 100, y: 100, duration: 1 })
            //     .add("blueSpin", "0.5")
            //     .to(
            //         ".green",
            //         { rotation: 360, x: -100, y: -100, duration: 1 },
            //         "blueSpin+=1.5"
            //     )
            //     .to(
            //         ".red",
            //         { rotation: 360, x: -100, y: 100, duration: 1 },
            //         "blueSpin+=0.5"
            //     );
            // gsap.registerEffect({
            //     name: "fade",
            //     effect: (
            //         targets: TweenTarget,
            //         config: { duration: number }
            //     ): gsap.core.Tween => {
            //         return gsap.to(targets, {
            //             duration: config.duration,
            //             opacity: 0,
            //         });
            //     },
            //     default: { duration: 2 },
            //     extendTimeline: true,
            // });
            // gsap.effects.fade(".blue", { duration: 3 });
            // gsap.fromTo(
            //     ".box",
            //     {
            //         x: 0,
            //         borderRadius: "0%",
            //         rotation: 0,
            //     },
            //     {
            //         x: 250,
            //         borderRadius: "100%",
            //         rotation: 360,
            //         repeat: -1,
            //         yoyo: true,
            //         duration: 3,
            //         ease: "elastic.inOut",
            //     }
            // );
            // gsap.from(".box", {
            //     x: 250,
            //     borderRadius: "100%",
            //     rotation: 360,
            //     repeat: 0,
            //     yoyo: true,
            //     duration: 3,
            //     ease: "elastic.inOut",
            // });
            // timeLine.to(".box", {
            //     x: 250,
            //     borderRadius: "100%",
            //     rotation: 360,
            //     duration: 1,
            //     ease: "power1.inOut",
            // });
            // timeLine.to(".box", {
            //     y: 100,
            //     scale: 2,
            //     rotation: 0,
            //     ease: "back.inOut",
            // });
            // timeLine.to(".box", {
            //     x: -250,
            //     borderRadius: "0%",
            //     rotation: 360,
            //     duration: 1,
            //     ease: "power1.inOut",
            // });
            // gsap.to(".box", {
            //     y: 250,
            //     rotation: 360,
            //     repeat: -1,
            //     yoyo: true,
            //     stagger: {
            //         amount: 1.5,
            //         grid: [2, 1],
            //         axis: "y",
            //         ease: "power1.inOut",
            //         from: "center",
            //     },
            // });

            const boxes = gsap.utils.toArray<HTMLElement>(
                scrollRef.current!.children
            );

            boxes.forEach((box) => {
                gsap.to(box, {
                    x: 150,
                    rotation: 360,
                    borderRadius: "100%",
                    scale: 1.5,
                });
            });
        },
        { scope: container }
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onClickBtn = contextSafe(() => {
        gsap.to(".btn", { rotation: "+=180", duration: 1 });
    });

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div ref={container}>
                {/* <div className="blue m-5 p-2 bg-blue-500">Spin me!</div>
                <div className="green m-5 p-2 bg-green-500">Spin me!</div>
                <div className="red m-5 p-2 bg-red-500">Spin me!</div>
                <div className="blue m-5 p-5 bg-blue-600">Fade!!</div>
                <div className="box m-10 p-10 bg-red-500">Box !</div>*/}
                <div className="flex flex-row flex-wrap" ref={scrollRef}>
                    <div className="box m-5 p-5 bg-red-500">Box !</div>
                    <div className="box m-5 p-5 bg-red-500">Box !</div>
                    <div className="box m-5 p-5 bg-red-500">Box !</div>
                    <div className="box m-5 p-5 bg-red-500">Box !</div>
                    <div className="box m-5 p-5 bg-red-500">Box !</div>
                </div>
            </div>
        </div>
    );
}
