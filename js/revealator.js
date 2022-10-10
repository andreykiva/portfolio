const Revealator = {
    timer: null,
    busy: !1,
    scroll_padding: 0,
    effects_padding: 0,
    refresh: function () {},
};

document.body.addClassCustom = (classes) => {
    const classesArr = classes.split(" ");

    for (let i = 0; i < classesArr.length; i++) {
        document.body.classList.add(classesArr[i]);
    }

    return document.body;
};

document.body.removeClassCustom = (classes) => {
    const classesArr = classes.split(" ");

    for (let i = 0; i < classesArr.length; i++) {
        document.body.classList.remove(classesArr[i]);
    }

    return document.body;
};

Revealator.refresh = () => {
    let e = document.documentElement,
        o = document.body,
        l = Revealator.effects_padding,
        r = e.clientHeight - Revealator.effects_padding,
        s = Revealator.scroll_padding,
        v = e.scrollHeight - Revealator.scroll_padding;

    0 === o.scrollTop
        ? o.classList.contains("at-top") ||
          o
              .addClassCustom("at-top")
              .removeClassCustom("at-bottom")
              .removeClassCustom("near-top")
              .removeClassCustom("near-bottom")
        : o.scrollTop + e.clientHeight === e.scrollHeight
        ? o.classList.contains("at-bottom") ||
          o
              .addClassCustom("at-bottom")
              .removeClassCustom("at-top")
              .removeClassCustom("near-top")
              .removeClassCustom("near-bottom")
        : o.scrollTop <= s
        ? o.classList.contains("near-top") ||
          o
              .addClassCustom("near-top")
              .removeClassCustom("near-bottom")
              .removeClassCustom("at-top")
              .removeClassCustom("at-bottom")
        : o.scrollTop + e.clientHeight >= v
        ? o.classList.contains("near-bottom") ||
          o
              .addClassCustom("near-bottom")
              .removeClassCustom("near-top")
              .removeClassCustom("at-top")
              .removeClassCustom("at-bottom")
        : (o.classList.contains("at-top") ||
              o.classList.contains("at-bottom") ||
              o.classList.contains("near-top") ||
              o.classList.contains("near-bottom")) &&
          o
              .removeClassCustom("at-top")
              .removeClassCustom("at-bottom")
              .removeClassCustom("near-top")
              .removeClassCustom("near-bottom");
    document.querySelectorAll("[class*='revealator']").forEach((el) => {
        let o = el.getBoundingClientRect(),
            s = void 0;
        (s =
            o.top > r && o.bottom > r
                ? "revealator-below"
                : o.top < r && o.bottom > r
                ? "revealator-partially-below"
                : o.top < l && o.bottom > l
                ? "revealator-partially-above"
                : o.top < l && o.bottom < l
                ? "revealator-above"
                : "revealator-within"),
            el.classList.contains("revealator-load") &&
                !el.classList.contains("revealator-within") &&
                (el.classList.remove(
                    "revealator-below", "revealator-partially-below", "revealator-within", "revealator-partially-above", "revealator-above"
                ),
                el.classList.add("revealator-within")),
            el.classList.contains(s) ||
                el.classList.contains("revealator-load") ||
                (el.classList.contains("revealator-once")
                    ? (el.classList.contains("revealator-within") ||
                          (el.classList.remove(
                            "revealator-below", "revealator-partially-below", "revealator-within", "revealator-partially-above", "revealator-above"
                          ),
                          el.classList.add(s)),
                      (el.classList.contains("revealator-partially-above") ||
                          el.classList.contains("revealator-above")) &&
                          el.classList.add("revealator-within"))
                    : (el.classList.remove(
                        "revealator-below", "revealator-partially-below", "revealator-within", "revealator-partially-above", "revealator-above"
                      ),
                      el.classList.add(s)));
    });
};

const start = () => {
    Revealator.busy ||
        ((Revealator.busy = !0),
        setTimeout(() => {
            (Revealator.busy = !1), Revealator.refresh();
        }, 150));
};

window.addEventListener("scroll", start);
window.addEventListener("resize", start);
window.addEventListener("load", start);
window.addEventListener("ready", start);
