fetch('nav.html')
.then(res => res.text())
.then(text => {
    let oldelem = document.querySelector("script#replace_with_navbar");
    let newelem = document.createElement("div");
    newelem.className = "nav_section";
    newelem.id = "nav_section";
    newelem.innerHTML = text;
    oldelem.parentNode.replaceChild(newelem, oldelem);
})