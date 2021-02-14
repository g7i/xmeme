import MemesList from "./MemesList";
import {useEffect, useRef} from "react";
import {handleScrollEvents, ResetScroll} from "../utils/HandleScroll";

// Entry container
export default function Hero(): JSX.Element {
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.onmousewheel = handleScrollEvents;
        window.ontouchmove = handleScrollEvents;
        window.onresize = ResetScroll;
        console.log(window.screenLeft)
        if (window.screenLeft > window.innerWidth - 60) {
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