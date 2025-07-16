import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Navbar from "./components/Navbar";
import type { FC } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const App: FC = () => {
    return (
        <main>
            <Navbar />
        </main>
    );
};

export default App;
