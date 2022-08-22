
const OBSERVER = {
  handlers: [],
  observeEvents: function (targets) {
    this.handlers.push(targets);
  },
  clearEvents: function () {
    const _self = this;
    function loop(i) {
      return new Promise(function (resolve, reject) {
        let events = _self.handlers[i];
        //handlers[i]内のイベントを削除
        for (var j = events.length - 1; j >= 0; j--) {
          let remEv = events[j];
          $(remEv[0]).off(remEv[1]);
        }
        //handlers[i]を削除
        _self.handlers.splice(i, 1);
        resolve(i++);
      }).then(function (count) {
        if (count > _self.handlers.length - 1) {
          //handlersのlength分loop()を回す
          loop(count);
        }
      });
    }
    loop(0);
  }
};
/* Events Detail *///関数群一覧をここへ
////////////////////////////////////////////////////////////////////////////////////////////////////
//menu toggle
window.addEventListener("load", function () {
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
      function () {
        _scrollfromTop =
          document.documentElement.scrollTop || document.body.scrollTop;
          document.body.classList.toggle("js-menu_active");
        if (_state == false) {
          //hirakutoki
          _dataAsClick = _scrollfromTop; //else内でも使うためオープンで
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
} //menu_init()
///////////////////////////////////////////////////////////////////////////////////////////////////////
//no-scroll  https://arakaze.ready.jp/archives/3152
//スクロール禁止用関数
let scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
function no_scroll() {
  //PC用
  // var scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
  $(document).on(scroll_event, function (e) { e.preventDefault(); });
  //SP用
  $(document).on('touchmove.noScroll', function (e) { e.preventDefault(); });
}
//スクロール復活用関数
function return_scroll() {
  //PC用
  // var scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
  $(document).off(scroll_event);
  //SP用
  $(document).off('.noScroll');
}
 function  openingAnimation() {
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
///////////////////////////////////////////////////////////////////////////////////////////////////////
//scroll_reset
function scroll_reset() {
  $(window).off('scroll');
 document.body.style.top = "";
}
///////////////////////////////////////////////////////////////////////////////////////////////////////
// scrollEv
let run_one_func = 0;
let timerID;

function scrollEv() {
  let scroll_Top = 0;
  $(window).on("touchend scroll", function (e) {
if (timerID != null) {
  clearTimeout(timerID);
}
    var doch = $(document).innerHeight(); //ページ全体の高さ
    var winh = $(window).innerHeight(); //ウィンドウの高さ
    var bottom = doch - winh; //ページ全体の高さ - ウィンドウの高さ = ページの最下部位置
    var scrollHeight = $(document).height();
	  var scrollPosition = $(window).height() + $(window).scrollTop();
    scroll_Top = $(window).scrollTop();
    if (popstateFlag === 1) {
        // console.log("popopopopopo", bottom);
      popstateFlag = 0;
      run_one_func = 0;
    //  pjax_anim_02();
     current_data = $(".js-next_page").data("link");

      // if (!$(".article_06").length) {
      //   current_link = link_array[current_data].json;
      // }
        // ttl_pjax_anim(50);
     $("body").removeClass("js-pjax_pop");
    //  if ($(".pjax_anim_02").length) {
    //    $(".pjax_anim_02").remove();
    //  }
  current_link = link_array[current_data].json;
    // console.log("current_data current_data 03", current_data);
      // scroll_reset();
      // scrollEv();
    } else {
              //  // console.log("scr", scroll_Top);
        	// if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
            if (!$("#page_about").length && run_one_func == 0 && bottom - 150 <= scroll_Top) {
               // console.log("not page_about", bottom);
              //スクロールでページ最下部で発火する
              // $("html,body").animate({ scrollTop: doch }, 20, "linear");
        if (!$(".js-pjax_pop").length && run_one_func === 0) {
          run_one_func = 1;
          // con // console.log("$(h &&&&&&&&&&&&&&&&&&&&&&&&&&&&& ", run_one_func);
          // window.scrollTo(0, doch);
          // document.addEventListener('touchmove', handleTouchMove, { passive: false });
          // document.addEventListener('scroll_event', handleTouchMove, { passive: false });

  // $("body").addClass("non-scrollable");
          // console.log("bottom mmmmmmmmmmmmmmk", bottom);
          // console.log("scroll_Topscroll_Top", scroll_Top);
        }}

if (run_one_func === 1) {
          // console.log("run_one_func === 1", scroll_Top);
timerID = setTimeout(function() {
  if ($(".sp").length && bottom - 100 <= scroll_Top) {
    run_one_func = 2;
    // con // console.log("$(spppp).length && ", run_one_func);
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
      // con // console.log("not article_06");
      ttl_pjax_anim(50);
    }
    setTimeout(() => {
      flag = 1;
    }, 1500);

    // con // console.log(" $.pjax(options) ddd ", run_one_func);

    setTimeout(function() {
      $.pjax(options);
      scroll_Top = 0;
      run_one_func = 0;
    }, 1550);
  }
}, 50);

  if ($(".tablet").length && run_one_func == 1 && bottom - 100 <= scroll_Top) {
    run_one_func = 2;
    // con // console.log("$(spppp).length && ", run_one_func);
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
      // con // console.log("not article_06");
      ttl_pjax_anim(50);
    }
    setTimeout(() => {
      flag = 1;
    }, 1500);

    // con // console.log(" $.pjax(options) ddd ", run_one_func);

    setTimeout(function() {
      $.pjax(options);
      scroll_Top = 0;
      run_one_func = 0;
    }, 1550);
  }
  if ($(".pc").length && bottom == scroll_Top) {
    // console.log("addClass", scroll_Top);

    //一番下までスクロールした時に実行
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
        // console.log("article_06 to  about");
        if ($(".css-vw_hidden").length) {
          $(".ttl_anim").remove();
        }
        $("body").addClass("js-ttl_hidden");
      }
    run_one_func = 0;
      // $("#ttl_pjax_anim_wrap").remove();
    }, 1550);
  }

    }
    }
  });
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//sub_page_ttl
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
    $('.a-sub_page_ttl.js-article_ttl').children('img').attr('src', 'assets/svg/' + article_num_array[article_num].src);
    $('.a-sub_page_ttl.js-article_ttl').children('source').attr('srcset', 'assets/svg/' + article_num_array[article_num].srcset);
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//card_acc
const card_acc_toggle = () => {
  $(".a-card_acc_toggle").on("click", function () {
    $(this)
      .parents("div")
      .toggleClass("js-acc_active");
    $(this)
      .parents(".a-card_prof")
      .find(".a-card_acc")
      .slideToggle(500);
  });
};
/* Events trigger */// 発火タイミング等
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
let next_url = null;
let ua = navigator.userAgent;
let bodyClass = document.body.classList;
var PageEvents = {
  //各ページ毎の処理用関数 メソッド
  commonFunc: () => {
    //UAごとに振り分けたいもの
    if (ua.indexOf("iPhone") > 0 || (ua.indexOf("Android") > 0 && ua.indexOf("Mobile") > 0)) {
      //スマートフォン
      bodyClass.add("sp");
      if (ua.indexOf("iPhone") > 0) bodyClass.add("iphone"); //iPhone
      if (ua.indexOf("Android") > 0) bodyClass.add("android"); //Android
      card_acc_toggle();
    } else if (ua.indexOf("iPad") > 0 || ua.indexOf("Android") > 0) {
      //タブレット
      bodyClass.add("tablet");
      if (ua.indexOf("iPad") > 0) bodyClass.add("ipad"); //iPad
      if (ua.indexOf("Android") > 0) bodyClass.add("android"); //Android
      card_acc_toggle();
    } else {
      //PC用コード
      bodyClass.add("pc");
    }
    //UAごとに振り分けたいもの ここまで
    menu_init();

  },
  page_top_func: () => {
    //ページ1の時にのみ実行したい処理
    $(window).off('scroll');
    //// con // console.log("top_page");
    ring_anim_01();
    setTimeout(function () {

    }, 1000);
    //jQueryでは[ 'element', event ]のみでOK
    const listeners = [
      ['window', scroll],
    ];
    OBSERVER.observeEvents(listeners);
  },
  page_about_func: () => {
    // if ($("#page_about").length) {
      // }
      scroll_reset();
      about_swiper();
      $(".a-scrolltop img").on("click", function() {
        $("html,body").animate({ scrollTop: 0 }, 1500, "swing");
      });
      slider_anim_toggle = 'off';
                    if ($(".ttl_anim").length) {
                      $(".ttl_anim").remove();
                    }
                    if ($(".ttl_pjax_anim").length) {
                      $(".ttl_pjax_anim").remove();
                    }
    //ページ2の時にのみ実行したい処理
    const listeners = [
       ['.a-scrolltop img',"click"],
    ];
    OBSERVER.observeEvents(listeners);
  },
  elseFunc: () => {
    //それ以外の時にのみ実行したい処理

    slider_anim_toggle = 'off';
    next_url = $(".m-next_mv").data("url");
     // console.log("elseFunck", next_url);
    scroll_reset();
    if ($(".scrollEv_on").length) {
      // con // console.log("pjclddddddddddddick", pjclick);
      scrollEv()
    }
    // current_link = link_array[current_data].json;
    // console.log("pjax:popstatee pagecheck_", current_link);
    const listeners = [];
    OBSERVER.observeEvents(listeners);
  }
};
function pageCheck() {
  if (document.getElementById("page_top")) {
      $('body').addClass("js-opening_anim-active");
    setTimeout(() => {
    }, 120);
    PageEvents.page_top_func();
  } else if (document.getElementById("page_about")) {
    PageEvents.page_about_func();
  } else {
    PageEvents.elseFunc();
  }
  PageEvents.commonFunc();
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// anime
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///一時変数flagでアニメーションの種類によってflag変数へ状態を格納し、遷移完了後に変数の値をリセット
let flag = 0;
function anime1(options) {
    // con // console.log("anime1", pjax_anim_flag);
     if ($("#ttl_anim_wrap").length) {
       slider_ttl_anim(270);
     }
  pjax_anim_01(0);
  setTimeout(function () {
    $.pjax(options);
     if ($(".css-vw_hidden").length) {
    // con // console.log("css-vw_hidden remove", pjax_anim_flag);
        // $(".css-vw_hidden").remove();
        $(".ttl_anim").remove();
     }
      $('body').addClass("js-ttl_hidden");


// about_swiper();
  }, 1000);
}
function anime2(options) {
  // con // console.log("anime2 current_link", current_link);
  // if ($("#ttl_anim_wrap").length) {
  //   slider_ttl_anim(270);
  // }

  pjax_anim_01(0);
  // ttl_pjax_anim(50);
  setTimeout(function () {
    // $("#ttl_anim_wrap").remove();
    $.pjax(options);
    }, 1000);
  //flag = 1;//pjax02 check

setTimeout(() => {
  // console.log("pjax_anim_02() pause", document.getElementById("pjax_anim_wrap"));


    pjax_anim_02();
}, 1500);

$(".ttl_pjax_anim").remove();
ttl_pjax_anim(50);




  // popstateFlag == 1;
}
function anime3(options) {
  pjax_anim_ringOpen(0);
  ttl_pjax_anim(50);
  $('#ttl_anim_wrap').fadeOut(1000, () => {
    setTimeout(function () {
    $("#ttl_anim_wrap").remove();
      $.pjax(options);

    }, 500);
  });

  flag = 1;
  // OBSERVER.clearEvents()
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// init()
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let popstateFlag = 0;
let popstate_scroll_reset = 0;
let pjclick = 0;
function init() {
  //windowやdocumentなどの上位ノードに対して付与したいイベント定義
  //pjaxエリア外の要素に対して付与したいイベント定義など
  pjclick = 0;
// $(document).on({
//   touchstart: function() {
//     this.isTouch = true;
//   },
//   touchmove: function() {
//     this.isTouch = false;
//   },
//   touchend: function() {
//     if (this.isTouch == true) {
//       // popupイベントを発生させる
//     }
//   }
// });


  $(document).on("click", ".pj", function(e) {
    e.preventDefault(); //これないとaタグの時pjaxしない
    // con // console.log("clickclick");
    if ($(".loop_ring").length) {
      setTimeout(() => {
        $(".loop_ring").remove();
        //aboutのアニメーションとの兼ね合い
      }, 500);
    }
    if ($(this).hasClass("to_about")) {
      // con // console.log("to_about");
      if ($(".ttl_anim").length) {
        $(".ttl_anim").remove();
        // con // console.log("ttl_anim remove_02");
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
      // con // console.log("link in menu");
      if ($(".ttl_anim").length) {
        $(".ttl_anim").remove();
      }
      // console.log("link in menu remove pjax_anim_02");

  //     if ($(".pjax_anim_02").length) {
  // }

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
      // con pole.log("current_linkcurrent_link", current_link);
      anime2(options);
    }
  });
  $(document).on("pjax:beforeSend", function () {
      if ($(".a-sub_page_ttl.js-article_ttl").length) {
      $(".js-article_ttl").fadeOut(100);
      }
  });
  $(document).on('pjax:popstate', function () {
    console.log("current_data current_data Option", Option);
    console.log("current_data current_data 02", current_data);
  // current_link = link_array[current_data].json;


    popstateFlag = 1;
    // flag = 1;

  });
  $(document).on("pjax:end", function () {
    //ここにlottieおくと描画のちらつきが出る<= 画像読み込みのせいかも
    innerHeight;
    //  document.body.style.top = "0px";
      $(".css-vw_hidden").css("height", $(window).outerHeight());
      options=0;
    console.log("pjax:enddddddddddddddddddddde", popstate_scroll_reset);
    if ($("#page_top").length) {
      console.log("pjax:page_top 2", popstate_scroll_reset);
      window.location.reload();
    }
    if (popstate_scroll_reset === 1) {
      $(".ttl_pjax_anim").remove();
      if ($("#page_about").length) {
        $("body").addClass("js-ttl_hidden");
        setTimeout(() => {
          // window.scrollTo(0, 0);
          // console.log("current_data current_data 02", $("#page_sub"));
          $(".ttl_anim").remove();//こいつが遅延で読み込まれるので、.top_slider を
          console.log("pjax:page_top 2", popstate_scroll_reset);
        }, 20);
        // window.location.reload();
        console.log("pjax:page_top 2", popstate_scroll_reset);
      } else {
        $(".js-ttl_hidden").remove();
        current_data = $("#page_sub").attr("data-link");
        console.log("current_data current_data 02", current_data);
        setTimeout(() => {
          // window.scrollTo(0, 0);
          console.log("current_data current_data 02", $("#page_sub"));
        }, 600);
        if (current_data == undefined) {
          console.log("pjax:page_top 2", popstate_scroll_reset);
          window.location.reload();
        } else {
          current_link = link_array[current_data].json;
          console.log("current_data current_data 02", current_data);
          ttl_pjax_anim(50);
        }
      }
      window.scrollTo(0, 0);
      popstate_scroll_reset = 0;
    }
    if ($(".js-pjax_pop").length) {
    // console.log("0scrollTo00", run_one_func);
//  window.location.reload();
setTimeout(() => {
      // window.scrollTo(0, 0);
}, 600);
    }else{

window.setTimeout(() => {
  $("body").removeClass("non-scrollable");
    // console.log("setTimeout pjax:enddddddddddddddddddddde", run_one_func);
  $("body").removeClass("js-pjax_anim_02-active");
     $("body").removeClass("js-subpage_openring-active");
}, 2000);
    }
    // con // console.log("pjax:popstateddddddddddddddddddddde", popstateFlag);

      if ($("#page_about").length ) {
         // console.log("pjax:dadddddddwwwwwwwwwwwwwwwwwwwwwww", run_one_func);
        //  $("body").addClass("js-pjax_anim_02-active");
          //  $(".a-sub_page_ttl.js-article_ttl").remove();
     }

    if (!$("#page_top").length) {
         // console.log("pjax:dadddddddwwwwwwwwwwwwwwwwwwwwwww", run_one_func);
      console.log("scroll_icon()_check 1", run_one_func);
      $('.scroll_icon_svg').remove();
      scroll_icon();
      if (!$("#page_about").length) {
      scroll_icon_02();
      }
    if (popstateFlag === 1) {
         // console.log("pop_page_check", run_one_func);


// scroll_icon()重複要因。。。？
//　pageCheck()
// init();


  // con // console.log("ini_reload");
  if ($("#page_about").length) {


    about_swiper()
  }
  //     if (!$("#page_top").length) {
  //       console.log("scroll_icon()_check 2", run_one_func);
  //   scroll_icon();
  //       if (!$("#page_about").length) {
  //         console.log("scroll_icon()_check 1", run_one_func);
  //   scroll_icon_02();
  // }
  // }
  if ($("#page_sub").length) {
  // if ($(".a-sub_page_ttl").length) {
  //     // console.log("sub_page_ttlEv(  article_num", article_num);
  //     // console.log("sub_page_ttlEv(  article_num", popstateFlag);
  //   sub_page_ttlEv();
  // }
    pjax_anim_02();
    // }
    //  if ($("#page_sub").length) {
    //    $(".ttl_pjax_anim").remove();
    //    sub_page_ttlEv();
        // current_data = $("#page_sub").attr("data-link");
        current_link = link_array[current_data].json;
    // console.log("current_data current_data 01", current_data);
      //  ttl_pjax_anim(50);
     }
    }
    }

     if (
       !$("#page_about").length && $(".a-sub_page_ttl.js-article_ttl").length
     ) {
       sub_page_ttlEv();
       $(".js-article_ttl").fadeIn(100);
     }

    if (flag === 1) {

  // if ($(".pjax_anim_02").length) {
  // $(".pjax_anim_02").remove();
  // }
      setTimeout(() => {
        // console.log("document.getElementById", $(".pjax_anim_02").length);

        pjax_anim_02();
        if ($(".pjax_anim_02").length) {
          $(".pjax_anim_02").remove();
        }
      }, 1000);
      if ($(".ttl_anim").length) {
        // con // console.log("ttl_anim remove_0X",pjclick);
      }
      slider_ttl_anim(50);
    } else if (flag === 2) {
      $("#page").animate({ opacity: 1, top: 0 }, function () {
        flag = 0;
      });
    } else {
    }
     if ($(".js-menu_active").length) {
       $("body").removeClass("js-menu_active");
     }
    pageCheck(); ///遷移後にコールバック
  });
}
$(function () {
  $("body").removeClass("preload");
$(".css-vw_hidden").css("height", $(window).outerHeight());
  pageCheck();
  init();
  // con // console.log("ini_reload");
  if ($("#page_about").length) {


    about_swiper()
  }
  if (!$("#page_top").length) {
    console.log("scroll_icon()_check 3", run_one_func);
    scroll_icon();
    if (!$("#page_about").length) {
      console.log("scroll_icon()_check 4", run_one_func);
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  data-link array
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let link_array = [];
let json_array = [];
if (ua.indexOf("iPhone") > 0 || (ua.indexOf("Android") > 0 && ua.indexOf("Mobile") > 0)) {
  //スマートフォン
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
  //タブレット
  if (ua.indexOf("iPad") > 0) bodyClass.add("ipad"); //iPad
  if (ua.indexOf("Android") > 0) bodyClass.add("android"); //Android
  //現段階（8/21）ではtb用のjsonは作らないのでspのを画面幅に合わせる
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
  //PC用コード
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// lottie
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let slider_anim_toggle = 0;
if (popstateFlag === 1) {

  console.log("current_data current_data 01?" );
}
console.log("current_data current_data 31?", );
let current_data = 0;

let current_link = link_array.default_op.json;
let loop_anime_flag = 0;
let thmb_cli_flag = 0;
let pjax_anim_flag = 0;
let pjax_anim_02_flag = 0;
//goToAndStop では complete判定出ない
//同一のlottieを動かすには一旦svgを削除しないとエラー...というより動いてくれない
//pause()は autoplay かませて、settimeout かフレーム計算の option かける必要あり。再生時は play() stop()は要検証
//const 内での lottie_option はだめぽ？
////////////////////////////////////////////////////////////////////////////////
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
        // con // console.log("ttl_anim remove_04");
      }
      current_link = link_array.slider_num_01.json;
      slider_ttl_anim(0);
      slider_anim_01();

    });
  }
};
////////////////////////////////////////////////////////////////////////////////
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
  $(document).on('click', '.pj', function (e) {
      // con // console.log("loop_ring_wrap");
    loop_ring_wrap.pause();
  });
  $(document).on("click", ".m-swiper_pager .swiper-slide", e => {
    loop_anime_flag = 1;
    loop_ring_wrap.goToAndPlay(255, true);
  });
  loop_ring_wrap.addEventListener("config_ready", e => {
    $(".op_anim").remove();
    $('body').removeClass("js-opening_anim-active");
     $('body').addClass("js-slide-visible");
    loop_anime_flag = 0;
    // $('#ttl_anim_wrap').addClass("pj");
     $(".top_slider").addClass("pj");
    set_remove = setTimeout(() => {
      // $("#ttl_anim_wrap").removeClass("pj");
      $(".top_slider").removeClass("pj");
    }, 4450);
    $('.is-first_slide').addClass("sw-slide-active");
    top_swiper()
    $(".swiper_pager-container").css("opacity",1);
    current_data = $('.sw-slide-active').data('link');
    // con // console.log(current_data);
    current_link = link_array[current_data]['json'];
  });
  loop_ring_wrap.addEventListener("complete", e => {
    if (slider_anim_toggle == 0) {
      if ($(".ttl_anim").length) {
        $(".ttl_anim").remove();
      }
      if (thmb_cli_flag == 0) {
        current_data = $('.sw-slide-active').next().data('link');
        if (current_data == undefined) {
          current_data = 'slider_num_01';
        }
        current_link = link_array[current_data]['json'];
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
////////////////////////////////////////////////////////////////////////////////
const slider_ttl_anim = (startF) => {
  if($("#ttl_anim_wrap").length) {
lottie.setQuality(10);
  var lottie_option = {
    container: document.getElementById("ttl_anim_wrap"),
    renderer: "svg",
    // path: "assets/js/json/" + link_array.default_op.json,
    path: "assets/js/json/" + current_link,
    rendererSettings: {
      className: "ttl_anim"
    }
  };
  var ttl_anim_wrap = lottie.loadAnimation(lottie_option);
  ttl_anim_wrap.goToAndPlay(startF, true);
  if (slider_anim_toggle == "off") {
    // con // console.log("tomatotomatotomaddddto");
      ttl_anim_wrap.addEventListener('DOMLoaded', function () {
        ttl_anim_wrap.goToAndStop(startF, true);
      });
    }
if (pjclick == 1) {
    ttl_anim_wrap.addEventListener('DOMLoaded', function () {
        ttl_anim_wrap.goToAndStop(startF, true);
      });
    }
}
};
////////////////////////////////////////////////////////////////////////////////
const ttl_pjax_anim = (startF) => {
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
    // con // console.log("aaaaaaaaaaaaaaaaaaaaaaattl_pjax_anim__");
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
////////////////////////////////////////////////////////////////////////////////////////////////
const pjax_anim_01 = (startF) => {
  $('body').addClass("js-pjax_anim-active");
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
// alert("pjax_anim_01");
       setTimeout(() => {
        pjax_anim.destroy();
    $('body').removeClass("js-pjax_anim-active");
    }, 450);
  });
};
////////////////////////////////////////////////////////////////////////////////
const pjax_anim_ringOpen = (startF) => {
  $('body').addClass("js-pjax_anim-active");
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
    $('body').removeClass("js-pjax_anim-active");
    ringOpen.destroy();
  });
};
////////////////////////////////////////////////////////////////////////////////
let pjax_anim_ = 0;
const pjax_anim_02 = (options) => {
  // console.log("pjax_anim_02_flagpjax_anim_02_flag", pjax_anim_02_flag);
  $("body").removeClass("non-scrollable");
    $('body').removeClass("js-pjax_anim_02-active");
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
      // con // console.log("pjax_anim_02_flagpjax_anim_02_flag=00000 ", lottie_option)
      pjax_anim_ = lottie.loadAnimation(lottie_option);
      pjax_anim_.addEventListener('DOMLoaded', function () {
        // con // console.log("DOMLoaded pause ",pjax_anim_02_flag)

// $(".pjax_anim_02").remove();
  // if ($(".pjax_anim_02").length) {
  // $(".pjax_anim_02").remove();
  // }
        pjax_anim_.pause();
        // pjax_anim_.goToAndStop(0, true);
      });
      // pjax_anim_.addEventListener("complete", e => {
        // });
      }
      if (pjax_anim_02_flag == 1) {
        pjax_anim_.play();
        pjax_anim_02_flag = 0;
        pjax_anim_.addEventListener("complete", e => {
          // con // console.log("pjax_anim_02complete",pjax_anim_02_flag)
          // pjax_anim_.destroy();
          // pjax_anim_.play();
          // console.log("pjax_anim_02 compppp", run_one_func);
          $("body").removeClass("non-scrollable");
          $("body").removeClass("js-pjax_anim_02-active");
          $('body').removeClass("js-subpage_openring-active");
          // $('body').fadeIn(0,function () {
          // $.pjax(options);
          // });
          // pjax_anim_.stop();
      });
    }
  }
}
////////////////////////////////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////
// swiper
//////////////////////////////////////////////////////////////////////////////////////////////////////////
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
    slidesPerView: 5,//数を合わせないといけないっぽい
    slideToClickedSlide: true
  });
  mySwiper.init();
  Swiperthumb.init();

  //サムネイルをクリックした時のイベント
  //$(".m-swiper_pager .swiper-slide").on("click", e =>{
    $(".m-swiper_pager .swiper-slide").on("click", function () {
      if ($(".ttl_anim").length) {
        $(".ttl_anim").remove();
      }
      clearTimeout(set_remove);
      set_remove = setTimeout(() => {
        $(".top_slider").removeClass("pj");
        // $('#ttl_anim_wrap').removeClass("pj");
      }, 4450);
    thmb_cli_flag = 1;
    slider_ttl_anim(270);
    current_data = $(this).attr('data-link');
    current_link = link_array[current_data].json;
    setTimeout(function () {
      if (Swiperthumb) {
        mySwiper.slideToLoop(Swiperthumb.realIndex);
      } else {
        var index = $(".m-swiper_pager .swiper-slide").index(
          e.currentTarget
        );
        mySwiper.slideToLoop(index);
      }

    }, 500);
  });
  //メインスライドが動いた時のイベント
  mySwiper.on("slideChange", () => {
    clearTimeout(set_remove);
    $(".top_slider").addClass("pj");
    // $('#ttl_anim_wrap').addClass("pj");
    set_remove = setTimeout(() => {
      $(".top_slider").removeClass("pj");
      // $('#ttl_anim_wrap').removeClass("pj");
    }, 4450);




    $(".m-swiper_pager .swiper-slide").removeClass(
      "sw-slide-active"
    );
    $(".m-swiper_pager .swiper-slide")
      .eq(mySwiper.realIndex)
      .addClass("sw-slide-active");
  });
  mySwiper.on("transitionEnd", function () {
  });
}
let achiev_slider;
function about_swiper() {
// con // console.log("init vvvvvv", slider.charie);//<= null になるの注意
achiev_slider = new Swiper( document.querySelector(".m-slider_02"), {
  init: false,
  slidesPerView: 1,
  updateOnImagesReady: false,
  loop: true,
  autoplay: { delay: 3000, disableOnInteraction: false },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    type: "bullets"
  },
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
  },
});

  achiev_slider.init();
  achiev_slider02.init();

  $('.m-slider_02').on('mouseenter', function (e) {
    achiev_slider.autoplay.stop();
  });
  $('.m-slider_02').on('mouseleave', function (e) {
    achiev_slider.autoplay.start();
  });
  $('.m-slider_03').on('mouseenter', function (e) {
    achiev_slider02.autoplay.stop();
  });
  $('.m-slider_03').on('mouseleave', function (e) {
    achiev_slider02.autoplay.start();
  });


}