import MemesList from "./MemesList";
import {useEffect, useRef} from "react";
import ResetScroll from "../utils/ResetScroll";

const handleScrollEvents = (e): void => {
    // @ts-ignore
    if (window.innerWidth <= 768) {
        window.scrollTo({top: window.innerHeight});
        document.body.classList.add("list");
    } else {
        if ((e.deltaY > 0 || e.deltaX > 0) && window.scrollX === 0) {
            window.scrollTo({left: window.innerWidth});
            document.body.classList.add("list");
        }
    }
}

export default function Hero(): JSX.Element {
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.onmousewheel = handleScrollEvents;
        window.ontouchmove = handleScrollEvents;
        window.onresize = ResetScroll;
        if (window.screenLeft > 0) {
            document.body.classList.add("list");
        }
    }, [])

    return (
        <div className="hero_container" ref={heroRef}>
            <div className="hero_cover">
                <div className="head_text">
                    <h1><span>X</span>Meme</h1>
                    <p>Get all your memes in one place.</p>
                </div>
                <div className="img">
                    <img
                        src="/cover.png"
                        alt=""/>
                </div>
                <div className="scroll_arr">
                    <img src="http://image.flaticon.com/icons/svg/3/3907.svg" id="arrow" className="animated bounce"/>
                </div>
            </div>
            <MemesList/>
        </div>
    );
}