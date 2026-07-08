/* =========================
   多摩劇ホームページ JavaScript
   ========================= */

/*
  このファイルでは主に以下を行う。

  1. 「劇場へ入る」ボタンを押した時の左右カーテン演出
  2. ホーム画面内のページ切り替え
  3. 公演アーカイブの表示
  4. 公演詳細ページの表示
  5. スマホ用メニューの開閉
*/

/* =========================
   公演データ
   ========================= */

/*
  公演アーカイブは、この配列にデータを追加していく形にする。

  新しい公演を追加したい場合は、
  performances の中に同じ形式でオブジェクトを追加すればよい。

  posterの画像パスは、実際のファイル名に変更する。
*/

const performances = [
  {
    id: "26shinkan",
    title: "新歓公演「取り残された館」",
    year: "2026年度",
    date: "2026年4月18日、20日、21日",
    place: "法政大学多摩キャンパス EGG DOME 5階ホール",
    poster: "assets/poster/26kouen/26shinkan.jpg",
    shortStory:
      "",
    story: "",
    youtube:{
      url:"https://www.youtube.com/playlist?list=PLBY2jwhdw9SCPLeXSv2r6Nhqap9v_Xin0",
      label:"新歓公演「取り残された館」(YouTube)"
    }
  },
  {
    id: "25shinkan",
    title: "新歓公演「カリカチュアの少女A」",
    year: "2025年度",
    date: "2025年4月19日、20日、21日",
    place: "法政大学多摩キャンパス EGG DOME 5階ホール",
    poster: "assets/poster/25kouen/25shinkan.jpg",
    shortStory:
      "",
    story:
      "",
    youtube: {
      url:"https://youtube.com/playlist?list=PLBY2jwhdw9SACD5ZpXUE4eyjTYvj9iGGC&si=7Xqml3X0xY-RUwNm",
      label:"新歓公演「カリカチュアの少女A」(YouTube)"
    }
  },
  {
    id: "24shinkan",
    title: "新歓公演「ビー玉たちの夜」",
    year: "2024年度",
    date: "2024年4月20日、22日、23日",
    place: "法政大学多摩キャンパス EGG DOME 5階ホール",
    poster: "assets/poster/24kouen/24shinkan.jpg",
    shortStory:
      "ある日の夜、彼らはいつも通りに仕事を終えてエレベーターに乗った。だが、その日はいつもと違った。エレベーターが止まったのだ。突然止まったエレベーターの中で、彼らはそれぞれの仕事の愚痴をこぼし始めた......",
    story:
      "ある日の夜、彼らはいつも通りに仕事を終えてエレベーターに乗った。だが、その日はいつもと違った。エレベーターが止まったのだ。突然止まったエレベーターの中で、彼らはそれぞれの仕事の愚痴をこぼし始めた......",
    youtube: {
      url:"https://youtu.be/xKxzhovulvw",
      label:"新歓公演「ビー玉たちの夜」(YouTube)"
    }
  },
    {
    id: "23fuyu",
    title: "冬公演「STEP!」",
    year: "2023年度",
    date: "2023年12月20日、21日",
    place: "法政大学多摩キャンパス EGG DOME 5階ホール",
    poster: "assets/poster/23kouen/23fuyu.jpg",
    shortStory:
      "ここは、都内某所にある便利屋<STEP>。若者5人のみの零細企業で、引っ越し、ゴミ屋敷の掃除、浮気調査など、様々な雑務をこなす。しかし、どうやら決して公にすることのできない「裏の仕事」を引き受けているようで......",
    story:
      "ここは、都内某所にある便利屋<STEP>。若者5人のみの零細企業で、引っ越し、ゴミ屋敷の掃除、浮気調査など、様々な雑務をこなす。しかし、どうやら決して公にすることのできない「裏の仕事」を引き受けているようで......",
    youtube: {
      url:"https://www.youtube.com/watch?v=Ay-VZy-OuEY",
      label:"冬公演「STEP!」(YouTube)"
    }
  }
];

/* =========================
   HTML要素の取得
   ========================= */

const entrance = document.getElementById("entrance");
const enterButton = document.getElementById("enterButton");
const theaterEffect = document.getElementById("theaterEffect");
const blackoutLayer = document.getElementById("blackoutLayer");
const site = document.getElementById("site");

const menuButton = document.getElementById("menuButton");
const globalNav = document.getElementById("globalNav");

const archiveGrid = document.getElementById("archiveGrid");
const backToArchive = document.getElementById("backToArchive");

/* =========================
   劇場へ入る演出
   ========================= */


/*
  enterButton（「劇場へ入る」ボタン）は index.html にしか存在しない。
  存在チェックをせずに addEventListener を呼ぶと、
  performance.html などの他ページでは enterButton が null となり、
  ここでエラーが発生してこれより後ろのスクリプトが
  一切実行されなくなってしまう（公演詳細の表示処理も動かなくなる）。
  そのため、要素が存在するページでのみ処理を行うようにする。
*/
if (enterButton) {
  enterButton.addEventListener("click", () => {

    enterButton.disabled = true;

    // 暗転フェードと緞帳閉を同時開始
    blackoutLayer.classList.add("active");
    theaterEffect.classList.add("active");

    requestAnimationFrame(() => {
      theaterEffect.classList.add("close");
    });

    // 緞帳が閉じたらホーム画面へ切替
    setTimeout(() => {
      document.body.classList.add("entered");
      entrance.style.display = "none";

      site.classList.remove("hidden");
      site.style.display = "block";

      showPage("home");

      sessionStorage.setItem("siteEntered", "1");

      // 明転開始
      blackoutLayer.classList.remove("active");
    }, 1300);

    // 明転が終わったあと、背景が見えている状態で緞帳を開く
    setTimeout(() => {
      theaterEffect.classList.remove("close");
      theaterEffect.classList.add("open");
    }, 2500);

    setTimeout(() => {
      theaterEffect.classList.remove("active");
      theaterEffect.classList.remove("open");
    }, 3800);
  });
}

/* =========================
   ページ切り替え
   ========================= */

function showPage(pageId) {
  /*
    すべてのページを一度非表示にして、
    指定されたページだけを表示する。
  */

  const pages = document.querySelectorAll(".page");

  pages.forEach((page) => {
    page.classList.remove("active");
  });

  const targetPage = document.getElementById(pageId);

  if (targetPage) {
    targetPage.classList.add("active");
  }

  /*
    ページ上部へ移動する。
    スマホでメニューを開いたままにならないように閉じる。
  */

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  globalNav.classList.remove("open");
}

/* data-page属性を持つボタンをすべて取得し、クリック時にページを切り替える */
const pageButtons = document.querySelectorAll("[data-page]");

pageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const pageId = button.dataset.page;
    if (pageId === "blog") {
      window.open("https://tamageki.hatenablog.com/", "_blank");
      return;
    }

    if (pageId === "info") {
    window.location.href = "kouen.html";
    return;
    }

    showPage(pageId);
  });
});

/* =========================
   スマホ用メニュー
   ========================= */

menuButton.addEventListener("click", () => {
  globalNav.classList.toggle("open");
});

/* =========================
   公演アーカイブの表示
   ========================= */

function renderArchive(yearFilter) {
  /*
    performances のデータをもとに、
    公演ポスター一覧を自動生成する。
  */

  archiveGrid.innerHTML = "";

  const filtered = (yearFilter && yearFilter !== "all")
    ? performances.filter((p) => p.year === yearFilter)
    : performances;

  if (filtered.length === 0) {
    const empty = document.createElement("p");
    empty.className = "archive-empty";
    empty.textContent = "この年度の公演記録はまだありません";
    archiveGrid.appendChild(empty);
    return;
  }

  filtered.forEach((performance) => {
    const card = document.createElement("article");
    card.className = "poster-card";

    /*
      ポスター画像がある場合はimgを表示。
      ない場合は仮のポスター表示を出す。
    */

    if (performance.poster) {
      const img = document.createElement("img");
      img.src = performance.poster;
      img.alt = `${performance.title}のポスター`;

      /*
        画像ファイルが見つからない時に、仮表示へ切り替える。
      */
      img.onerror = () => {
        img.remove();

        const placeholder = document.createElement("div");
        placeholder.className = "poster-placeholder";
        placeholder.textContent = performance.title;
        card.prepend(placeholder);
      };

      card.appendChild(img);
    } else {
      const placeholder = document.createElement("div");
      placeholder.className = "poster-placeholder";
      placeholder.textContent = performance.title;
      card.appendChild(placeholder);
    }

    const info = document.createElement("div");
    info.className = "poster-info";

    info.innerHTML = `
      <h3>${performance.title}</h3>
      <p>${performance.shortStory}</p>
    `;

    card.appendChild(info);

    /*
      カードをクリックすると公演詳細ページへ移動する。
    */

    card.addEventListener("click", () => {
    location.href = `performance.html?id=${performance.id}`;
});

    archiveGrid.appendChild(card);
  });
}

/* 年度タブの切り替え */
document.querySelectorAll(".year-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".year-tab").forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    renderArchive(tab.dataset.year);
  });
});

/* =========================
   公演詳細ページの表示
   ========================= */

function showPerformanceDetail(performanceId) {
  /*
    idが一致する公演データを探す。
  */

  const performance = performances.find((item) => item.id === performanceId);

  if (!performance) {
    return;
  }

  document.getElementById("detailTitle").textContent = performance.title;
  document.getElementById("detailYear").textContent = performance.year;
  const detailPoster = document.getElementById("detailPoster");
const detailPosterWrap = document.getElementById("detailPosterWrap");

if (performance.poster) {
  detailPoster.src = performance.poster;
  detailPoster.alt = `${performance.title}の公演ポスター`;
  detailPosterWrap.style.display = "block";
} else {
  detailPoster.src = "";
  detailPoster.alt = "";
  detailPosterWrap.style.display = "none";
}
  document.getElementById("detailDate").textContent = performance.date;
  document.getElementById("detailPlace").textContent = performance.place;
  document.getElementById("detailStory").textContent = performance.story;


  /*
    YouTubeを表示する。
  */

 const youtube = document.getElementById("detailYoutube");

if (performance.youtube && performance.youtube.url) {
  youtube.href = performance.youtube.url;
  youtube.textContent = performance.youtube.label || "YouTubeで見る";
  youtube.style.display = "inline";
} else {
  youtube.style.display = "none";
}

}

/* 公演詳細ページからアーカイブへ戻る */
if (backToArchive) {
  backToArchive.addEventListener(() => {
    
  });
}

/* =========================
   初期化
   ========================= */

/*
  ページを読み込んだ時点で、公演アーカイブを作っておく。
*/

if (archiveGrid) {
    renderArchive("all");
}

if (sessionStorage.getItem("siteEntered") === "1") {
  const params = new URLSearchParams(window.location.search);
  const goTo = params.get("page") || "home";
  showPage(goTo);
}

// v6: entrance page is permanently hidden after enter button is clicked.

const roleImages={actor:['']};document.querySelectorAll('.role-slideshow').forEach(b=>{const arr=roleImages[b.dataset.role]||[];let i=0;const f=()=>{if(arr.length)b.style.backgroundImage=`url('${arr[i++%arr.length]}')`;};f();if(arr.length>1)setInterval(f,3000);});

if (window.location.pathname.endsWith("performance.html")) {

    const params = new URLSearchParams(location.search);

    const id = params.get("id");

    if (id) {
        showPerformanceDetail(id);
    }

}