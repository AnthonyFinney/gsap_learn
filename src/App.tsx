import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import GSAPTest from "./components/GSAPTest";

gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
    return (
        <>
            <GSAPTest />
        </>
    );
}

export default App;
