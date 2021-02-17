// The scroll event callback
export function handleScrollEvents(e: Event): void {
    // @ts-ignore
    if (window.innerWidth <= 768) {
        window.scrollTo({top: window.innerHeight});
        document.body.classList.add("list");
    } else {
        // @ts-ignore
        if (((e.detail? e.detail*(120) > 0 : (e.deltaY > 0 || e.deltaX > 0)) && window.scrollX === 0) && window.scrollX === 0) {
            window.scrollTo({left: window.innerWidth});
            document.body.classList.add("list");
        }
    }
}

// Reset the scroll position
export function ResetScroll(): void {
    if (window.innerWidth <= 768) {
        window.scrollTo({top: 0});
        document.body.classList.remove("list");
    } else {
        window.scrollTo({left: 0});
        document.body.classList.remove("list");
    }
}