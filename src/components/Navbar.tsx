import { useRef, type FC } from "react";
import { navLinks } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Navbar: FC = () => {
    const container = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const navTween = gsap.timeline({
                scrollTrigger: {
                    trigger: container.current,
                    start: "bottom top",
                },
            });

            navTween.fromTo(
                container.current,
                {
                    backgroundColor: "transparent",
                },
                {
                    backgroundColor: "#00000050",
                    backdropFilter: "blur(10px)",
                    duration: 1,
                    ease: "power1.inOut",
                }
            );
        },
        { scope: container }
    );

    return (
        <nav ref={container}>
            <div>
                <a href="#home" className="flex items-center gap-2">
                    <img src="/images/logo.png" alt="logo" />
                    <p>Velvet Pour</p>
                </a>

                <ul>
                    {navLinks.map((link) => (
                        <li key={link.id}>
                            <a href={`#${link.id}`}>{link.title}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
