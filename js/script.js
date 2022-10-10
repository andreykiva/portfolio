window.addEventListener("DOMContentLoaded", () => {
	/*--------------------------------------------------------------------------------------Variables */
	const $navItems = document.querySelectorAll(".js_nav_item"),
		$menuCircle = document.querySelector(".js_menu_circle"),
		$workLink = document.querySelector(".js_work_link"),
		$aboutLink = document.querySelector(".js_about_link"),
		$bgCirclesWork = document.querySelector(".js_bg_circles_work"),
		$bgCirclesAbout = document.querySelector(".js_bg_circles_about"),
		$pageAbout = document.querySelector(".js_page_about"),
		$pageWork = document.querySelector(".js_page_work");

	/*--------------------------------------------------------------------------------------Supports */
	const changeClass = (el, added, removed) => {
		el.classList.remove(removed);
		el.classList.add(added);
	};

	/*--------------------------------------------------------------------------------------Header */
	$navItems.forEach((navItem) => {
		navItem.addEventListener("click", () => {
			$navItems.forEach((item) => {
				item.classList.remove("active");
			});
			navItem.classList.add("active");

			if (+navItem.dataset.index) {
				
				changeClass(document.body, "about", "work");

				$menuCircle.classList.add("rotated");
				$bgCirclesAbout.classList.remove("active", "show");
				$bgCirclesAbout.classList.add("hide");
				$pageAbout.classList.add("hide");
				$pageWork.classList.remove("hide");

				changeClass($bgCirclesWork, "show", "hide");
			} else {
				changeClass(document.body, "work", "about");

				$menuCircle.classList.remove("rotated");
				$bgCirclesWork.classList.remove("active", "show");
				$bgCirclesWork.classList.add("hide");
				$pageWork.classList.add("hide");
				$pageAbout.classList.remove("hide");

				changeClass($bgCirclesAbout, "show", "hide");
			}
		});
	});

	$pageAbout.classList.remove("hide");

	/*--------------------------------------------------------------------------------------Background */
	$workLink.addEventListener("mouseenter", () => {
		if (!$bgCirclesWork.classList.contains("active")) {
			changeClass($bgCirclesWork, "active", "hide");
		}
	});

	$workLink.addEventListener("mouseleave", () => {
		$bgCirclesWork.classList.remove("active");
	});

	$aboutLink.addEventListener("mouseenter", () => {
		if (!$bgCirclesAbout.classList.contains("active")) {
			changeClass($bgCirclesAbout, "active", "hide");
		}
	});

	$aboutLink.addEventListener("mouseleave", () => {
		$bgCirclesAbout.classList.remove("active");
	});

	/*--------------------------------------------------------------------------------------Slider */
	const $slides = document.querySelectorAll(".js_work__slide"),
		$slider = document.querySelector(".js_work__slider"),
		$prevBtn = document.querySelector(".js_work__slider-prev"),
		$nextBtn = document.querySelector(".js_work__slider-next"),
		$totalSlides = document.getElementById("total"),
		$currentSlide = document.getElementById("current"),
		$slidesWrapper = document.querySelector(".js_work__slider-wrapper"),
		$slidesField = document.querySelector(".js_work__slider-inner"),
		width = window.getComputedStyle($slidesWrapper).width;

	let slideIndex = 1;
	let offset = 0;

	$slidesField.style.width = 100 * $slides.length + "%";
	$slidesField.style.display = "flex";
	$slidesField.style.transition = "0.5s all";

	$slidesWrapper.style.overflow = "hidden";

	$slides.forEach((slide) => {
		slide.style.width = width;
	});

	if ($slides.length < 10) {
		$totalSlides.textContent = "0" + $slides.length;
		$currentSlide.textContent = "0" + slideIndex;
	} else {
		$totalSlides.textContent = $slides.length;
		$currentSlide.textContent = slideIndex;
	}

	$slider.style.position = "relative";

	const indicators = document.createElement("ol"),
		dots = [];
	indicators.classList.add("carousel-indicators");

	$slider.append(indicators);

	for (let i = 0; i < $slides.length; i++) {
		const dot = document.createElement("li");
		dot.classList.add("dot");
		dot.setAttribute("data-slide-to", i + 1);

		if (i === 0) {
			dot.style.opacity = 1;
		}

		indicators.append(dot);
		dots.push(dot);
	}

	const deleteNotDigits = (str) => +str.replace(/\D/g, "");

	const transformSlidesField = (offset) => {
		$slidesField.style.transform = `translateX(-${offset}px)`;
	};

	const showActiveDot = () => {
		dots.forEach((dot) => {
			dot.style.opacity = ".5";
		});
		dots[slideIndex - 1].style.opacity = 1;
	};

	const showCurrentIndex = (slideIndex) => {
		if (slideIndex < 10) {
			$currentSlide.textContent = "0" + slideIndex;
		} else {
			$currentSlide.textContent = slideIndex;
		}
	};

	$nextBtn.addEventListener("click", () => {
		if (offset == deleteNotDigits(width) * ($slides.length - 1)) {
			offset = 0;
		} else {
			offset += deleteNotDigits(width);
		}

		transformSlidesField(offset);

		if (slideIndex === $slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		showCurrentIndex(slideIndex);
		showActiveDot();
	});

	$prevBtn.addEventListener("click", () => {
		if (offset == 0) {
			offset = deleteNotDigits(width) * ($slides.length - 1);
		} else {
			offset -= deleteNotDigits(width);
		}

		transformSlidesField(offset);

		if (slideIndex === 1) {
			slideIndex = $slides.length;
		} else {
			slideIndex--;
		}

		showCurrentIndex(slideIndex);
		showActiveDot();
	});

	dots.forEach((dot) => {
		dot.addEventListener("click", (e) => {
			const slideTo = e.target.getAttribute("data-slide-to");

			slideIndex = +slideTo;
			offset = deleteNotDigits(width) * (slideTo - 1);

			transformSlidesField(offset);

			showCurrentIndex(slideIndex);
			showActiveDot();
		});
	});
});
