import { useRef, useState, type FC } from "react";
import { allCocktails } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Menu: FC = () => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setcurrentIndex] = useState<number>(0);
    const totalCocktails = allCocktails.length;

    useGSAP(() => {
        const parallaxTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#menu",
                start: "top 30%",
                end: "bottom 80%",
                scrub: true,
            },
        });

        parallaxTimeline.to("#m-left-leaf", { y: -100 });
        parallaxTimeline.to("#m-right-leaf", { y: 100 });

        gsap.fromTo("#title", { opacity: 0 }, { opacity: 1, duration: 1 });
        gsap.fromTo(
            ".cocktail img",
            { opacity: 0, xPercent: -100 },
            { xPercent: 0, opacity: 1, duration: 1, ease: "power1.inOut" }
        );
        gsap.fromTo(
            ".details h2",
            { opacity: 0, yPercent: 100 },
            { yPercent: 0, opacity: 1, duration: 1, ease: "power1.inOut" }
        );

        gsap.fromTo(
            ".details p",
            { opacity: 0, yPercent: 100 },
            { yPercent: 0, opacity: 1, duration: 1, ease: "power1.inOut" }
        );
    }, [currentIndex]);

    const goToSlide = (index: number) => {
        const newIndex = (index + totalCocktails) % totalCocktails;

        setcurrentIndex(newIndex);
    };

    const getCocktailAt = (indexOffset: number) => {
        return allCocktails[
            (currentIndex + indexOffset + totalCocktails) % totalCocktails
        ];
    };

    const currentCocktail = getCocktailAt(0);
    const prevCocktail = getCocktailAt(-1);
    const nextCocktail = getCocktailAt(1);

    return (
        <section id="menu" aria-labelledby="menu-heading">
            <img
                src="/images/slider-left-leaf.png"
                alt="left-leaf"
                id="m-left-leaf"
            />
            <img
                src="/images/slider-right-leaf.png"
                alt="right-leaf"
                id="m-right-leaf"
            />

            <h2 id="menu-heading" className="sr-only">
                Cocktail Menu
            </h2>

            <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
                {allCocktails.map((cocktail, index) => {
                    const isActive = index == currentIndex;

                    return (
                        <button
                            key={cocktail.id}
                            className={`${
                                isActive
                                    ? "text-white border-white"
                                    : "text-white/50 border-white/50"
                            }`}
                            onClick={() => goToSlide(index)}
                        >
                            {cocktail.name}
                        </button>
                    );
                })}
            </nav>

            <div className="content">
                <div className="arrows">
                    <button
                        className="text-left"
                        onClick={() => goToSlide(currentIndex - 1)}
                    >
                        <span>{prevCocktail.name}</span>
                        <img
                            src="/images/right-arrow.png"
                            alt="right-arrow"
                            aria-hidden="true"
                        />
                    </button>
                    <button
                        className="text-left"
                        onClick={() => goToSlide(currentIndex + 1)}
                    >
                        <span>{nextCocktail.name}</span>
                        <img
                            src="/images/left-arrow.png"
                            alt="left-arrow"
                            aria-hidden="true"
                        />
                    </button>
                </div>

                <div className="cocktail">
                    <img
                        src={currentCocktail.image}
                        className="object-center"
                    />
                </div>

                <div className="recipe">
                    <div ref={contentRef} className="info">
                        <p>Recipe for:</p>
                        <p id="title">{currentCocktail.name}</p>
                    </div>

                    <div className="details">
                        <h2>{currentCocktail.title}</h2>
                        <p>{currentCocktail.description}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Menu;
