# vantan-hp-tgs
## test 
https://vantan.develop-env.info/www.vantan-game.com/special/tgs

const items = document.querySelectorAll(".js-next_page");
    //.js-next_pageが100％rootないに移ったら
    const options2 = {
      root: null, // ビューポートはウィンドウ全体
      rootMargin: "0px", 
      threshold: 1 // 
    };
    const observer = new IntersectionObserver(IntersectFunction, options2);
    items.forEach(item => {
      observer.observe(item);
    });











      timerID = setTimeout(function () {
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

              setTimeout(function () {
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

            setTimeout(function () {
              $.pjax(options);
              scroll_Top = 0;
              run_one_func = 0;
            }, 1550);
          }