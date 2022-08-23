# vantan-hp-tgs
## test 
https://vantan.develop-env.info/www.vantan-game.com/special/tgs



## IntersectionObserver memo 
const items = document.querySelectorAll(".js-next_page");
  const options = {
  root: null, // ビューポート設定。nullはウィンドウ全体
  rootMargin: "0px", // rootにさらにマージンを付与する
  threshold: 1 // 対象の閾値。1ですべてroot内に入るまで発火しない。
};
const observer = new IntersectionObserver(IntersectFunction, options);
items.forEach(item => {
  observer.observe(item);
});

function IntersectFunction(elements) {
    // 交差監視をしたもののなかで、isIntersectingがtrueになったとき
    elements.forEach(element => {
         if (element.isIntersecting) {
            //交差したらしたい処理
        }
    });
 }
