//nav
const main = document.querySelector("main")
const nav__burger = document.querySelector(".js__nav__burger");
const nav__inner = document.querySelector(".js__nav__inner");
const nav__link = document.querySelectorAll(".js__nav__link")

let show__nav__inner = false;

nav__burger.addEventListener("click", () => {
    if(!show__nav__inner){
        nav__burger.classList.add("js__nav--close");
        nav__inner.classList.add("js__nav__inner--close");
        main.style.visibility = "hidden";
        show__nav__inner = true;
    }
    else {
        nav__burger.classList.remove("js__nav--close");
        nav__inner.classList.remove("js__nav__inner--close");
        main.style.visibility = "visible";
        show__nav__inner = false;
    }
});

nav__link.forEach( item => {
    item.addEventListener("click", () => {
        nav__burger.classList.remove("js__nav--close");
        nav__inner.classList.remove("js__nav__inner--close");
        main.style.visibility = "visible";
        show__nav__inner = false;
    });

})

//hero
const cta__hero = document.querySelector(".js__cta__hero");
const section__hero = document.querySelector(".js__hero");

const sectionOneOptions = {
    rootMargin: "-600px 0px 0px 0px"
};

const sectionObserver = new IntersectionObserver(function(
    entries, sectionOneOptions) {
        entries.forEach(entry =>{
            if(!entry.isIntersecting) {
                cta__hero.classList.add("js__cta--scrolled");
                cta__hero.classList.remove("all__cta");
                cta__hero.innerHTML = "";
            } else {
                cta__hero.classList.remove("js__cta--scrolled");
                cta__hero.classList.add("all__cta");
                cta__hero.innerHTML = "schreib mir";
            }
        })
    }, sectionOneOptions);

sectionObserver.observe(section__hero)

