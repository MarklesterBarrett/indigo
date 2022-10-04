/*
 * Ensures menu elements are not focusable when aria hidden
 */

$(function () {
  const container = $(".container-navigation");
  const button = $(".nav-toggle");

  const debounce = function (func, wait) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }
  }

  const toggle = function () {
    // Container
    if (container.attr("aria-hidden") === "true") {
      container.find("a").attr("tabindex", "-1");
    }
    else {
      container.find("a").removeAttr("tabindex");
    }
    // Button
    if (button.attr("aria-hidden") === "true") {
      button.attr("tabindex", "-1");
    }
    else {
      button.removeAttr("tabindex");
    }
  }

  // Update on open/close
  button.on("click", function (e) {
    toggle();
  });

  // Update on resize
  $(window).on("resize", debounce(toggle, 250));

  // Update on page load
  toggle();
});
