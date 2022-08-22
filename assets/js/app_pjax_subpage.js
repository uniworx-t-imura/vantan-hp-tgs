const OBSERVER = {
  handlers: [],
  observeEvents: function(targets) {
    this.handlers.push(targets);
  },
  clearEvents: function() {
    const _self = this;
    function loop(i) {
      return new Promise(function(resolve, reject) {
        let events = _self.handlers[i];

        for (var j = events.length - 1; j >= 0; j--) {
          let remEv = events[j];
          $(remEv[0]).off(remEv[1]);
        }

        _self.handlers.splice(i, 1);
        resolve(i++);
      }).then(function(count) {
        if (count > _self.handlers.length - 1) {
          loop(count);
        }
      });
    }
    loop(0);
  }
};
/* Events Detail */

window.addEventListener("load", function() {
  _scrollfromTop =
    document.documentElement.scrollTop || document.body.scrollTop;
});
var _MenuButton = document.getElementsByClassName("js-menu-toggle");
var _state = false;
var _dataAsClick;
function menu_init() {
  for (var $i = 0; $i < _MenuButton.length; $i++) {
    _MenuButton[$i].addEventListener(
      "click",
      function() {
        _scrollfromTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        document.body.classList.toggle("js-menu_active");
        if (_state == false) {
          _dataAsClick = _scrollfromTop;
          document.documentElement.style.height = "auto";
          document.body.style.top = -_dataAsClick + "px";
          _state = true;
        } else {
          document.documentElement.style.height = "100%";
          document.body.style.top = "0px";
          window.scrollTo(0, _dataAsClick);
          _state = false;
        }
      },
      false
    );
  }
}

let scroll_event =
  "onwheel" in document
    ? "wheel"
    : "onmousewheel" in document
    ? "mousewheel"
    : "DOMMouseScroll";
function no_scroll() {
  $(document).on(scroll_event, function(e) {
    e.preventDefault();
  });

  $(document).on("touchmove.noScroll", function(e) {
    e.preventDefault();
  });
}

function return_scroll() {
  $(document).off(scroll_event);
  $(document).off(".noScroll");
}
function openingAnimation() {
  window.setTimeout(() => {
    document.body.classList.remove("non-scrollable");
  }, 2600);
  window.setTimeout(() => {
    window.scrollTo(0, -1);
    document.body.classList.add("non-scrollable");
    document.documentElement.scrollTop = 0;
  }, 1000);
  window.setTimeout(() => {}, 2000);
}

function handleTouchMove(event) {
  event.preventDefault();
}

function scroll_reset() {
  $(window).off("scroll");
  document.body.style.top = "";
}

let run_one_func = 0;
let timerID;

function scrollEv() {
  let scroll_Top = 0;
  $(window).on("touchend scroll", function(e) {
    if (timerID != null) {
      clearTimeout(timerID);
    }
    //旧スクロールイベント用
    var doch = $(document).innerHeight();
    var winh = $(window).innerHeight();
    var bottom = doch - winh;
    var scrollHeight = $(document).height();
    var scrollPosition = $(window).height() + $(window).scrollTop();
    scroll_Top = $(window).scrollTop();



    if (popstateFlag === 1) {
      popstateFlag = 0;
      run_one_func = 0;

      current_data = $(".js-next_page").data("link");

      $("body").removeClass("js-pjax_pop");

      current_link = link_array[current_data].json;
    } else {
      if (
        !$("#page_about").length &&
        run_one_func == 0 &&
        bottom - 150 <= scroll_Top//***
      ) {
        if (!$(".js-pjax_pop").length && run_one_func === 0) {
          run_one_func = 1;
        }
      }

      if (run_one_func === 1) {
        timerID = setTimeout(function() {
          if ($(".sp").length && bottom - 100 <= scroll_Top) {//***
            run_one_func = 2;
            $("body").addClass("js-pjax_anim_02-active");
            $("body").addClass("js-subpage_openring-active");
            $(".ttl_pjax_anim").remove();
            current_data = $(".js-next_page").data("link");
            current_link = link_array[current_data].json;
            let href = $(".js-next_page").data("link");
            let options = {
              url: link_array[href]["url"],
              container: "#pj-container",
              fragment: "#pj-container",
              scrollTo: 0
            };
            pjax_anim_02_flag = 1;
            pjax_anim_02(options);
            if (!$(".article_06").length) {
              ttl_pjax_anim(50);
            }
            setTimeout(() => {
              flag = 1;
            }, 1500);

            setTimeout(function() {
              $.pjax(options);
              scroll_Top = 0;
              run_one_func = 0;
            }, 1550);
          }
        }, 50);

        if (
          $(".tablet").length &&
          run_one_func == 1 &&
          bottom - 100 <= scroll_Top//***
        ) {
          run_one_func = 2;

          $("body").addClass("js-pjax_anim_02-active");
          $("body").addClass("js-subpage_openring-active");
          $(".ttl_pjax_anim").remove();
          current_data = $(".js-next_page").data("link");
          current_link = link_array[current_data].json;
          let href = $(".js-next_page").data("link");
          let options = {
            url: link_array[href]["url"],
            container: "#pj-container",
            fragment: "#pj-container",
            scrollTo: 0
          };
          pjax_anim_02_flag = 1;
          pjax_anim_02(options);
          if (!$(".article_06").length) {
            ttl_pjax_anim(50);
          }
          setTimeout(() => {
            flag = 1;
          }, 1500);

          setTimeout(function() {
            $.pjax(options);
            scroll_Top = 0;
            run_one_func = 0;
          }, 1550);
        }
        if ($(".pc").length && bottom == scroll_Top) {//***
          $(".ttl_pjax_anim").remove();

          $("body").addClass("js-pjax_anim_02-active");
          $("body").addClass("js-subpage_openring-active");
          let href = $(".js-next_page").data("link");
          let options = {
            url: link_array[href]["url"],
            container: "#pj-container",
            fragment: "#pj-container",
            scrollTo: 0
          };
          pjax_anim_02_flag = 1;
          pjax_anim_02(options);
          if (!$(".article_06").length) {
            current_data = $(".js-next_page").data("link");
            current_link = link_array[current_data].json;
            ttl_pjax_anim(50);
          }

          setTimeout(() => {
            flag = 1;
          }, 1500);
          setTimeout(function() {
            $.pjax(options);
            scroll_Top = 0;
            if ($(".article_06").length) {
              if ($(".css-vw_hidden").length) {
                $(".ttl_anim").remove();
              }
              $("body").addClass("js-ttl_hidden");
            }
            run_one_func = 0;
          }, 1550);
        }
      }
    }
  });
}

let article_num_array = {
  1: { src: "sub_ttl_01.svg", srcset: "sub_ttl_01_sp.svg" },
  2: { src: "sub_ttl_02.svg", srcset: "sub_ttl_02_sp.svg" },
  3: { src: "sub_ttl_03.svg", srcset: "sub_ttl_03_sp.svg" },
  4: { src: "sub_ttl_04.svg", srcset: "sub_ttl_04_sp.svg" },
  5: { src: "sub_ttl_05.svg", srcset: "sub_ttl_05_sp.svg" },
  6: { src: "sub_ttl_06.svg", srcset: "sub_ttl_06_sp.svg" },
  7: { src: "sub_ttl_07.svg", srcset: "sub_ttl_07_sp.svg" }
};
const sub_page_ttlEv = () => {
  let article_num = $("#page_sub").attr("data-art-num");
  $(".a-sub_page_ttl.js-article_ttl")
    .children("img")
    .attr("src", "assets/svg/" + article_num_array[article_num].src);
  $(".a-sub_page_ttl.js-article_ttl")
    .children("source")
    .attr("srcset", "assets/svg/" + article_num_array[article_num].srcset);
};

const card_acc_toggle = () => {
  $(".a-card_acc_toggle").on("click", function() {
    $(this)
      .parents("div")
      .toggleClass("js-acc_active");
    $(this)
      .parents(".a-card_prof")
      .find(".a-card_acc")
      .slideToggle(500);
  });
};
/* Events trigger */

let next_url = null;
let ua = navigator.userAgent;
let bodyClass = document.body.classList;
var PageEvents = {
  commonFunc: () => {
    if (
      ua.indexOf("iPhone") > 0 ||
      (ua.indexOf("Android") > 0 && ua.indexOf("Mobile") > 0)
    ) {
      bodyClass.add("sp");
      if (ua.indexOf("iPhone") > 0) bodyClass.add("iphone");
      if (ua.indexOf("Android") > 0) bodyClass.add("android");
      card_acc_toggle();
    } else if (ua.indexOf("iPad") > 0 || ua.indexOf("Android") > 0) {
      bodyClass.add("tablet");
      if (ua.indexOf("iPad") > 0) bodyClass.add("ipad");
      if (ua.indexOf("Android") > 0) bodyClass.add("android");
      card_acc_toggle();
    } else {
      bodyClass.add("pc");
    }

    menu_init();
  },
  page_top_func: () => {
    $(window).off("scroll");

    ring_anim_01();
    setTimeout(function() {}, 1000);

    const listeners = [["window", scroll]];
    OBSERVER.observeEvents(listeners);
  },
  page_about_func: () => {
    scroll_reset();
    about_swiper();
    $(".a-scrolltop img").on("click", function() {
      $("html,body").animate({ scrollTop: 0 }, 1500, "swing");
    });
    slider_anim_toggle = "off";
    if ($(".ttl_anim").length) {
      $(".ttl_anim").remove();
    }
    if ($(".ttl_pjax_anim").length) {
      $(".ttl_pjax_anim").remove();
    }

    const listeners = [[".a-scrolltop img", "click"]];
    OBSERVER.observeEvents(listeners);
  },
  elseFunc: () => {
    slider_anim_toggle = "off";
    next_url = $(".m-next_mv").data("url");

    scroll_reset();
    if ($(".scrollEv_on").length) {
      scrollEv();
    }

    const listeners = [];
    OBSERVER.observeEvents(listeners);
  }
};
function pageCheck() {
  if (document.getElementById("page_top")) {
    $("body").addClass("js-opening_anim-active");
    setTimeout(() => {}, 120);
    PageEvents.page_top_func();
  } else if (document.getElementById("page_about")) {
    PageEvents.page_about_func();
  } else {
    PageEvents.elseFunc();
  }
  PageEvents.commonFunc();
}

let flag = 0;
function anime1(options) {
  if ($("#ttl_anim_wrap").length) {
    slider_ttl_anim(270);
  }
  pjax_anim_01(0);
  setTimeout(function() {
    $.pjax(options);
    if ($(".css-vw_hidden").length) {
      $(".ttl_anim").remove();
    }
    $("body").addClass("js-ttl_hidden");
  }, 1000);
}
function anime2(options) {
  pjax_anim_01(0);

  setTimeout(function() {
    $.pjax(options);
  }, 1000);

  setTimeout(() => {
    pjax_anim_02();
  }, 1500);

  $(".ttl_pjax_anim").remove();
  ttl_pjax_anim(50);
}
function anime3(options) {
  pjax_anim_ringOpen(0);
  ttl_pjax_anim(50);
  $("#ttl_anim_wrap").fadeOut(1000, () => {
    setTimeout(function() {
      $("#ttl_anim_wrap").remove();
      $.pjax(options);
    }, 500);
  });

  flag = 1;
}

let popstateFlag = 0;
let popstate_scroll_reset = 0;
let pjclick = 0;
function init() {
  pjclick = 0;

  $(document).on("click", ".pj", function(e) {
    e.preventDefault();

    if ($(".loop_ring").length) {
      setTimeout(() => {
        $(".loop_ring").remove();
      }, 500);
    }
    if ($(this).hasClass("to_about")) {
      if ($(".ttl_anim").length) {
        $(".ttl_anim").remove();
      }
      let href = $(this).attr("href");
      let options = {
        url: href,
        container: "#pj-container",
        fragment: "#pj-container"
      };
      anime1(options);
    } else if ($(this).hasClass("to_top")) {
      let options = {
        url: "about.html",
        container: "#pj-container",
        fragment: "#pj-container"
      };
      anime1(options);
    } else if ($(this).hasClass("top_slider")) {
      $(".ttl_anim").fadeOut(500);
      $(".swiper_pager-container").css("opacity", 0);
      $("#ttl_anim_wrap").removeClass("pj");
      pjclick = 1;
      let href = $(".sw-slide-active").data("link");
      let options = {
        url: link_array[href]["url"],
        container: "#pj-container",
        fragment: "#pj-container"
      };
      anime3(options);
    } else if ($(this).hasClass("js_menu_link")) {
      if ($(".ttl_anim").length) {
        $(".ttl_anim").remove();
      }

      $("body").removeClass("js-ttl_hidden");
      pjclick = 1;
      current_data = $(this).attr("data-link");
      current_link = link_array[current_data].json;
      let href = $(this).attr("href");
      let options = {
        url: href,
        container: "#pj-container",
        fragment: "#pj-container"
      };

      anime2(options);
    }
  });
  $(document).on("pjax:beforeSend", function() {
    if ($(".a-sub_page_ttl.js-article_ttl").length) {
      $(".js-article_ttl").fadeOut(100);
    }
  });
  $(document).on("pjax:popstate", function() {

    popstateFlag = 1;
  });
  $(document).on("pjax:end", function() {
    innerHeight;

    $(".css-vw_hidden").css("height", $(window).outerHeight());
    options = 0;
        if ($("#page_top").length) {
            window.location.reload();
    }
    if (popstate_scroll_reset === 1) {
      $(".ttl_pjax_anim").remove();
      if ($("#page_about").length) {
        $("body").addClass("js-ttl_hidden");
        setTimeout(() => {
          $(".ttl_anim").remove();
                  }, 20);

              } else {
        $(".js-ttl_hidden").remove();
        current_data = $("#page_sub").attr("data-link");
                setTimeout(() => {
                  }, 600);
        if (current_data == undefined) {
                    window.location.reload();
        } else {
          current_link = link_array[current_data].json;
                    ttl_pjax_anim(50);
        }
      }
      window.scrollTo(0, 0);
      popstate_scroll_reset = 0;
    }
    if ($(".js-pjax_pop").length) {
      setTimeout(() => {}, 600);
    } else {
      window.setTimeout(() => {
        $("body").removeClass("non-scrollable");

        $("body").removeClass("js-pjax_anim_02-active");
        $("body").removeClass("js-subpage_openring-active");
      }, 2000);
    }

    if ($("#page_about").length) {
    }

    if (!$("#page_top").length) {
            $(".scroll_icon_svg").remove();
      scroll_icon();
      if (!$("#page_about").length) {
        scroll_icon_02();
      }
      if (popstateFlag === 1) {
        if ($("#page_about").length) {
          about_swiper();
        }

        if ($("#page_sub").length) {
          pjax_anim_02();

          current_link = link_array[current_data].json;
        }
      }
    }

    if (
      !$("#page_about").length &&
      $(".a-sub_page_ttl.js-article_ttl").length
    ) {
      sub_page_ttlEv();
      $(".js-article_ttl").fadeIn(50);
    }

    if (flag === 1) {
      setTimeout(() => {
        pjax_anim_02();
        if ($(".pjax_anim_02").length) {
          $(".pjax_anim_02").remove();
        }
      }, 1000);
      if ($(".ttl_anim").length) {
      }
      slider_ttl_anim(50);
    } else if (flag === 2) {
      $("#page").animate({ opacity: 1, top: 0 }, function() {
        flag = 0;
      });
    } else {
    }
    if ($(".js-menu_active").length) {
      $("body").removeClass("js-menu_active");
    }
    pageCheck();
  });
}
$(function() {
  $("body").removeClass("preload");
  $(".css-vw_hidden").css("height", $(window).outerHeight());
  pageCheck();
  init();

  if ($("#page_about").length) {
    about_swiper();
  }
  if (!$("#page_top").length) {
        scroll_icon();
    if (!$("#page_about").length) {
            scroll_icon_02();
    }
  }
  if ($("#page_sub").length) {
    if ($(".a-sub_page_ttl.js-article_ttl").length) {
      sub_page_ttlEv();
    }
    pjax_anim_02();
  }
});

let link_array = [];
let json_array = [];
if (
  ua.indexOf("iPhone") > 0 ||
  (ua.indexOf("Android") > 0 && ua.indexOf("Mobile") > 0)
) {
  link_array = {
    default_op: { json: "op_title_sp.json", url: "" },
    about: { json: "op_title_sp.json", url: "about.html" },
    slider_num_01: { json: "loop_title01_sp.json", url: "sub_page_01.html" },
    slider_num_02: { json: "loop_title02_sp.json", url: "sub_page_02.html" },
    slider_num_03: { json: "loop_title03_sp.json", url: "sub_page_03.html" },
    slider_num_04: { json: "loop_title04_sp.json", url: "sub_page_04.html" },
    slider_num_05: { json: "loop_title05_sp.json", url: "sub_page_05.html" },
    slider_num_06: { json: "loop_title06_sp.json", url: "sub_page_06.html" }
  };
  json_array = {
    ring_anim_01: "op_ring_sp.json",
    slider_anim_01: "loop_ring_sp.json",
    pjax_anim_01: "next_page_sp.json",
    pjax_anim_02: "ring_open_sp.json",
    pjax_anim_ringOpen: "ring_open_sp.json",
    scroll_icon: "scroll_icon.json"
  };
} else if (ua.indexOf("iPad") > 0 || ua.indexOf("Android") > 0) {
  if (ua.indexOf("iPad") > 0) bodyClass.add("ipad");
  if (ua.indexOf("Android") > 0) bodyClass.add("android");

  link_array = {
    default_op: { json: "op_title.json", url: "" },
    about: { json: "op_title_sp.json", url: "about.html" },
    slider_num_01: { json: "loop_title01_sp.json", url: "sub_page_01.html" },
    slider_num_02: { json: "loop_title02_sp.json", url: "sub_page_02.html" },
    slider_num_03: { json: "loop_title03_sp.json", url: "sub_page_03.html" },
    slider_num_04: { json: "loop_title04_sp.json", url: "sub_page_04.html" },
    slider_num_05: { json: "loop_title05_sp.json", url: "sub_page_05.html" },
    slider_num_06: { json: "loop_title06_sp.json", url: "sub_page_06.html" }
  };
  json_array = {
    ring_anim_01: "op_ring_sp.json",
    slider_anim_01: "loop_ring_sp.json",
    pjax_anim_01: "next_page_sp.json",
    pjax_anim_02: "ring_open_sp.json",
    pjax_anim_ringOpen: "ring_open_sp.json",
    scroll_icon: "scroll_icon.json"
  };
} else {
  link_array = {
    default_op: { json: "op_title.json", url: "" },
    about: { json: "", url: "about.html" },
    slider_num_01: { json: "loop_title01.json", url: "sub_page_01.html" },
    slider_num_02: { json: "loop_title02.json", url: "sub_page_02.html" },
    slider_num_03: { json: "loop_title03.json", url: "sub_page_03.html" },
    slider_num_04: { json: "loop_title04.json", url: "sub_page_04.html" },
    slider_num_05: { json: "loop_title05.json", url: "sub_page_05.html" },
    slider_num_06: { json: "loop_title06.json", url: "sub_page_06.html" }
  };
  json_array = {
    ring_anim_01: "op_ring.json",
    slider_anim_01: "loop_ring.json",
    pjax_anim_01: "next_page.json",
    pjax_anim_02: "ring_open.json",
    pjax_anim_ringOpen: "ring_open.json",
    scroll_icon: "scroll_icon.json"
  };
}

let slider_anim_toggle = 0;
if (popstateFlag === 1) {
  }
let current_data = 0;

let current_link = link_array.default_op.json;
let loop_anime_flag = 0;
let thmb_cli_flag = 0;
let pjax_anim_flag = 0;
let pjax_anim_02_flag = 0;

const ring_anim_01 = () => {
  lottie.setQuality("low");
  if ($("#page_top").length) {
    slider_ttl_anim(0);
    var lottie_option = {
      container: document.getElementById("anim_wrap"),
      renderer: "svg",
      path: "assets/js/json/" + json_array.ring_anim_01,
      rendererSettings: {
        className: "op_anim"
      }
    };
    var topOp_ring_01 = lottie.loadAnimation(lottie_option);
    topOp_ring_01.addEventListener("complete", e => {
      if ($(".ttl_anim").length) {
        $(".ttl_anim").remove();
      }
      current_link = link_array.slider_num_01.json;
      slider_ttl_anim(0);
      slider_anim_01();
    });
  }
};

const slider_anim_01 = () => {
  var lottie_option = {
    container: document.getElementById("loop_ring_wrap"),
    renderer: "svg",
    path: "assets/js/json/" + json_array.slider_anim_01,
    rendererSettings: {
      className: "loop_ring"
    }
  };
  lottie.setQuality(10);
  var loop_ring_wrap = lottie.loadAnimation(lottie_option);
  $(document).on("click", ".pj", function(e) {
    loop_ring_wrap.pause();
  });
  $(document).on("click", ".m-swiper_pager .swiper-slide", e => {
    loop_anime_flag = 1;
    loop_ring_wrap.goToAndPlay(255, true);
  });
  loop_ring_wrap.addEventListener("config_ready", e => {
    $(".op_anim").remove();
    $("body").removeClass("js-opening_anim-active");
    $("body").addClass("js-slide-visible");
    loop_anime_flag = 0;

    $(".top_slider").addClass("pj");
    set_remove = setTimeout(() => {
      $(".top_slider").removeClass("pj");
    }, 4450);
    $(".is-first_slide").addClass("sw-slide-active");
    top_swiper();
    $(".swiper_pager-container").css("opacity", 1);
    current_data = $(".sw-slide-active").data("link");

    current_link = link_array[current_data]["json"];
  });
  loop_ring_wrap.addEventListener("complete", e => {
    if (slider_anim_toggle == 0) {
      if ($(".ttl_anim").length) {
        $(".ttl_anim").remove();
      }
      if (thmb_cli_flag == 0) {
        current_data = $(".sw-slide-active")
          .next()
          .data("link");
        if (current_data == undefined) {
          current_data = "slider_num_01";
        }
        current_link = link_array[current_data]["json"];
      }
      slider_ttl_anim(0);
      loop_ring_wrap.goToAndPlay(0, 1);
      if (loop_anime_flag == 0) {
        mySwiper.slideNext();
      }
    }
    if (thmb_cli_flag == 1) {
      thmb_cli_flag = 0;
    }
    if (loop_anime_flag == 1) {
      loop_anime_flag = 0;
    }
  });
};

const slider_ttl_anim = startF => {
  if ($("#ttl_anim_wrap").length) {
    lottie.setQuality(10);
    var lottie_option = {
      container: document.getElementById("ttl_anim_wrap"),
      renderer: "svg",

      path: "assets/js/json/" + current_link,
      rendererSettings: {
        className: "ttl_anim"
      }
    };
    var ttl_anim_wrap = lottie.loadAnimation(lottie_option);
    ttl_anim_wrap.goToAndPlay(startF, true);
    if (slider_anim_toggle == "off") {
      ttl_anim_wrap.addEventListener("DOMLoaded", function() {
        ttl_anim_wrap.goToAndStop(startF, true);
      });
    }
    if (pjclick == 1) {
      ttl_anim_wrap.addEventListener("DOMLoaded", function() {
        ttl_anim_wrap.goToAndStop(startF, true);
      });
    }
  }
};

const ttl_pjax_anim = startF => {
  if ($("#ttl_pjax_anim_wrap").length) {
    var ttl_anim_option = {
      container: document.getElementById("ttl_pjax_anim_wrap"),
      renderer: "svg",
      path: "assets/js/json/" + current_link,
      rendererSettings: {
        className: "ttl_pjax_anim"
      }
    };
    lottie.setQuality(10);
    var ttl_pjax_anim__ = lottie.loadAnimation(ttl_anim_option);

    if (pjclick == 1) {
      ttl_pjax_anim__.addEventListener("DOMLoaded", function() {
        ttl_pjax_anim__.goToAndStop(startF, true);
        setTimeout(() => {
          $(".ttl_anim").remove();
        }, 500);
      });
    }
  }
};

const pjax_anim_01 = startF => {
  $("body").addClass("js-pjax_anim-active");
  var lottie_option = {
    container: document.getElementById("next_page_wrap"),
    renderer: "svg",
    autoplay: false,
    path: "assets/js/json/" + json_array.pjax_anim_01,
    rendererSettings: {
      className: "next_page"
    }
  };
  lottie.setQuality(10);
  var pjax_anim = lottie.loadAnimation(lottie_option);
  if (pjax_anim_flag == 1) {
    pjax_anim.goToAndPlay(30, true);
    pjax_anim.addEventListener("complete", e => {
      pjax_anim_flag = 0;
    });
  }
  if (pjax_anim_flag == 0) {
    pjax_anim.goToAndPlay(startF, true);
  }
  pjax_anim.addEventListener("complete", e => {
    setTimeout(() => {
      pjax_anim.destroy();
      $("body").removeClass("js-pjax_anim-active");
    }, 450);
  });
};

const pjax_anim_ringOpen = startF => {
  $("body").addClass("js-pjax_anim-active");
  var lottie_option = {
    container: document.getElementById("pjax_anim_wrap"),
    renderer: "svg",
    autoplay: false,
    path: "assets/js/json/" + json_array.pjax_anim_ringOpen,
    rendererSettings: {
      className: "pjax_anim"
    }
  };
  lottie.setQuality(10);
  var ringOpen = lottie.loadAnimation(lottie_option);
  if (pjax_anim_flag == 1) {
    ringOpen.goToAndPlay(30, true);
    ringOpen.addEventListener("complete", e => {
      pjax_anim_flag = 0;
    });
  }
  if (pjax_anim_flag == 0) {
    ringOpen.goToAndPlay(startF, true);
  }
  ringOpen.addEventListener("complete", e => {
    $("body").removeClass("js-pjax_anim-active");
    ringOpen.destroy();
  });
};

let pjax_anim_ = 0;
const pjax_anim_02 = options => {
  $("body").removeClass("non-scrollable");
  $("body").removeClass("js-pjax_anim_02-active");
  if ($("#page_sub").length) {
    var lottie_option = {
      container: document.getElementById("pjax_anim_02_wrap"),
      renderer: "svg",
      autoplay: true,
      path: "assets/js/json/" + json_array.pjax_anim_02,
      rendererSettings: {
        className: "pjax_anim_02"
      }
    };
    lottie.setQuality(10);
    if (pjax_anim_02_flag == 0) {
      pjax_anim_ = lottie.loadAnimation(lottie_option);
      pjax_anim_.addEventListener("DOMLoaded", function() {
        pjax_anim_.pause();
      });
    }
    if (pjax_anim_02_flag == 1) {
      pjax_anim_.play();
      pjax_anim_02_flag = 0;
      pjax_anim_.addEventListener("complete", e => {
        $("body").removeClass("non-scrollable");
        $("body").removeClass("js-pjax_anim_02-active");
        $("body").removeClass("js-subpage_openring-active");
      });
    }
  }
};

const scroll_icon = () => {
  var lottie_option = {
    name: scroll,
    container: document.getElementById("scroll_icon"),
    renderer: "svg",
    loop: true,
    path: "assets/js/json/" + json_array.scroll_icon,
    rendererSettings: {
      className: "scroll_icon_svg"
    }
  };
  lottie.setQuality(10);
  let scroll_icon_anim = lottie.loadAnimation(lottie_option);
};
const scroll_icon_02 = () => {
  var lottie_option = {
    name: scroll,
    container: document.getElementById("scroll_icon_02"),
    renderer: "svg",
    loop: true,
    path: "assets/js/json/" + json_array.scroll_icon,
    rendererSettings: {
      className: "scroll_icon_svg"
    }
  };
  lottie.setQuality(10);
  let scroll_icon_anim = lottie.loadAnimation(lottie_option);
};

const slider = {
  alpha: document.querySelector(".m-slider_01"),
  bravo: document.querySelector(".m-swiper_pager"),
  charie: document.querySelector(".m-slider_02"),
  delta: document.querySelector(".m-slider_03")
};
let mySwiper;
let set_remove;

function top_swiper() {
  mySwiper = new Swiper(slider.alpha, {
    init: false,
    effect: "fade",
    direction: "vertical",
    slidesPerView: 1,
    mousewheel: true,
    updateOnImagesReady: false,
    loop: true,
    virtualTranslate: true
  });
  var Swiperthumb = new Swiper(slider.bravo, {
    init: false,
    mousewheel: true,
    direction: "vertical",
    centeredSlides: true,
    slidesPerView: 5,
    slideToClickedSlide: true
  });
  mySwiper.init();
  Swiperthumb.init();

  $(".m-swiper_pager .swiper-slide").on("click", function() {
    if ($(".ttl_anim").length) {
      $(".ttl_anim").remove();
    }
    clearTimeout(set_remove);
    set_remove = setTimeout(() => {
      $(".top_slider").removeClass("pj");
    }, 4450);
    thmb_cli_flag = 1;
    slider_ttl_anim(270);
    current_data = $(this).attr("data-link");
    current_link = link_array[current_data].json;
    setTimeout(function() {
      if (Swiperthumb) {
        mySwiper.slideToLoop(Swiperthumb.realIndex);
      } else {
        var index = $(".m-swiper_pager .swiper-slide").index(e.currentTarget);
        mySwiper.slideToLoop(index);
      }
    }, 500);
  });

  mySwiper.on("slideChange", () => {
    clearTimeout(set_remove);
    $(".top_slider").addClass("pj");

    set_remove = setTimeout(() => {
      $(".top_slider").removeClass("pj");
    }, 4450);

    $(".m-swiper_pager .swiper-slide").removeClass("sw-slide-active");
    $(".m-swiper_pager .swiper-slide")
      .eq(mySwiper.realIndex)
      .addClass("sw-slide-active");
  });
  mySwiper.on("transitionEnd", function() {});
}
let achiev_slider;
function about_swiper() {
  achiev_slider = new Swiper(document.querySelector(".m-slider_02"), {
    init: false,
    slidesPerView: 1,
    updateOnImagesReady: false,
    loop: true,
    autoplay: { delay: 3000, disableOnInteraction: false },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      type: "bullets"
    }
  });

  let achiev_slider02 = new Swiper(document.querySelector(".m-slider_03"), {
    init: false,
    slidesPerView: 1,
    updateOnImagesReady: false,
    loop: true,
    autoplay: { delay: 3000, disableOnInteraction: false },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      type: "bullets"
    }
  });

  achiev_slider.init();
  achiev_slider02.init();

  $(".m-slider_02").on("mouseenter", function(e) {
    achiev_slider.autoplay.stop();
  });
  $(".m-slider_02").on("mouseleave", function(e) {
    achiev_slider.autoplay.start();
  });
  $(".m-slider_03").on("mouseenter", function(e) {
    achiev_slider02.autoplay.stop();
  });
  $(".m-slider_03").on("mouseleave", function(e) {
    achiev_slider02.autoplay.start();
  });
}
