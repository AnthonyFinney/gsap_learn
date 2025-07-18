import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import Navbar from "./components/Navbar";
import type { FC } from "react";
import Hero from "./components/Hero";
import Cocktails from "./components/Cocktails";

gsap.registerPlugin(ScrollTrigger, SplitText);

const App: FC = () => {
    return (
        <main>
            <Navbar />
            <Hero />
            <Cocktails />
        </main>
    );
};

export default App;
