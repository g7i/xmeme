export default function ResetScroll(): void {
    if (window.innerWidth <= 768) {
        window.scrollTo({top: 0});
        document.body.classList.remove("list");
    } else {
        window.scrollTo({left: 0});
        document.body.classList.remove("list");
    }
}