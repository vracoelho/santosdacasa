window.addEventListener("load", async () => {
    document.querySelector("body").classList.remove("preload")
    const container = document.getElementsByTagName("body")[0];
    const response = await fetch('/header.html');
    container.innerHTML = await response.text() + container.innerHTML;
});