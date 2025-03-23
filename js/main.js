document.addEventListener("DOMContentLoaded", () => {
  // URLから名前と生年月日を取得
  const name = getQueryParam("name");
  const birthdate = getQueryParam("birthdate");

  if (!name || !birthdate) {
    alert("名前と生年月日をURLから正しく取得できませんでした。");
    return;
  }

  // 生年月日を解析
  const [year, month, day] = birthdate.split("-").map(Number);
  if (isNaN(month) || isNaN(day)) {
    document.getElementById("personality-header").textContent = "無効な生年月日です。";
    return;
  }

  // 句読点ごとに改行する関数（HTML用）
  function formatTextForHTML(text) {
    return text.replace(/。/g, "。<br><br>⋄")
    .replace(/<br>⋄$/, "");
  }

  // 各天珠のサブタイトル
  const subtitles = {
    "一眼天珠": "- 目標達成と自己実現へ -",
    "二眼天珠": "- 良い出会い、人間関係の円満をもたらす -",
    "三眼天珠": "- 幸福、財運、長寿の三位一体 -",
    "四眼天珠": "- 安定と基盤を築く力 -",
    "五眼天珠": "- 商売繁盛、事業成功と幸運を引き寄せる -",
    "六眼天珠": "- 六感の力を身につけ、あらゆる願いを叶える -",
    "七眼天珠": "- 成功と勝利をもたらした七つの眼 -",
    "八眼天珠": "- 無限の可能性を広げる -",
    "九眼天珠": "- 最高の守護力と運気上昇 -",
    "十眼天珠": "- 変革と新たな扉を開く力 -",
    "十一眼天珠": "- 障害を乗り越え、開運へ導く -",
    "十二眼天珠": "- 宇宙のエネルギーを宿す -",
    "十三眼天珠": "- 大きな幸運や利益を引き寄せる -",
    "十五眼天珠": "- 大いなる加護と最高の成功 -",
    "二十一眼天珠": "- 事業 蓄財 結婚 健康 名声の獲得 -",
    "観音天珠": "- 観音菩薩のパワーを授ける守護石 -",
    "亀甲天珠": "- 長寿や健康、安定、繁栄、財運の向上 -",
    "白黒天珠": "- 運気や環境を好転させる -",
    "如意天珠": "- 願望成就と成功への道を開く -",
    "如意釣天珠": "- 願いを思いのままに釣り上げる -",
    "如意樹天珠": "- 豊かで実り多い未来へと導く -",
    "閃電五眼天珠": "- 強力な守護と運気向上する雷の力 -",
    "チョンジー（線天珠）": "- 富と利益をもたらし財運最強 -",
    "財神天珠": "- 財運と富の神「ザンバラ（財神）」の力 -",
    "息増懐天珠（息増懐誅）": "- 財運、健康、良縁、知恵など人生を豊かにする -",
    "大人天珠": "- 財運、健康、良縁、知恵など人生を豊かにする -",
    "菩提天珠": "- 病気や災難から守ってくれる -",
    "万字天珠（卍天珠）": "- 幸運、繁栄、平穏をもたらす -",
    "蓮師法器天珠": "- 強力な守護力と知恵を授かる -",
    "法相仏眼天珠": "- 無病息災や幸福成就のご利益 -",
    "宝瓶天珠": "- 豊穣と恩恵をもたらす命の壺 -",
    "山形天珠": "- 困難を乗り越え、運気を上昇させる -",
    "虎牙天珠": "- 勇猛果敢な力と勝負運を授ける -",
    "蓮華天珠": "- 浄化の作用が優れている -",
    "龍眼天珠": "- 威厳と守護の力を宿す -",
    "白蛇天珠": "- 財福の神である弁財天の使い -",
    "金剛杵天珠": "- 邪気や災いを断ち切る力 -",
    "流水紋天珠（水紋天珠）": "- 絶え間なく流れる財運と浄化の力 -",
    "蓮師法帽天珠": "- 知恵と名声を授ける蓮師の加護 -",
    "大鵬鳥天珠": "- 災厄を払い幸福へ導く天空の守護者 -",
    "日月星天珠": "- 天体のエネルギーを宿し、幸運を呼ぶ -",
    "天地天珠": "- 「天と地」の力が融合した神聖なもの -",
  };

  // 各天珠の写真
  const tenjuImages = {
    "一眼天珠": "../img/one.jpg",
    "二眼天珠": "../img/two.jpg",
    "三眼天珠": "../img/three.jpg",
    "四眼天珠": "../img/four.jpg",
    "五眼天珠": "../img/five.jpg",
    "六眼天珠": "../img/six.jpg",
    "七眼天珠": "../img/seven.jpg",
    "八眼天珠": "../img/eight.jpg",
    "九眼天珠": "../img/nine.jpg",
    "十眼天珠": "../img/ten.jpg",
    "十一眼天珠": "../img/eleven.jpg",
    "十二眼天珠": "../img/twelve.jpg",
    "十三眼天珠": "../img/thirteen.jpg",
    "十五眼天珠": "../img/fifteen.jpg",
    "二十一眼天珠": "../img/twenty one.jpg",
    "観音天珠": "../img/kannon.jpg",
    "亀甲天珠": "../img/kikko.jpg",
    "白黒天珠": "../img/shiroku.jpg",
    "如意天珠": "../img/nyoi.jpg",
    "如意釣天珠": "../img/nyoitsuri.jpg",
    "如意樹天珠": "../img/nyoiju.jpg",
    "閃電五眼天珠": "../img/senden.jpg",
    "チョンジー（線天珠）": "../img/chonji.jpg",
    "財神天珠": "../img/zaishin.jpg",
    "息増懐天珠（息増懐誅）": "../img/sokuzokai.jpg",
    "大人天珠": "../img/taijin.jpg",
    "菩提天珠": "../img/bodai.jpg",
    "万字天珠（卍天珠）": "../img/manji.jpg",
    "蓮師法器天珠": "../img/renshihoki.jpg",
    "法相仏眼天珠": "../img/hosobutsugan.jpg"
  };

   // サブタイトルを追加する関数（ヘッダー用）
  function addSubtitle(headerId, tenjuName) {
    const headerElement = document.getElementById(headerId);
    if (headerElement) {
      if (headerElement.nextElementSibling && headerElement.nextElementSibling.classList.contains("subtitle")) return;

      const subtitleText = subtitles[tenjuName] || "";
      if (subtitleText) {
        const subtitleElement = document.createElement("span");
        subtitleElement.className = "custom-subtitle ms-2";
        subtitleElement.innerText = subtitleText;
        headerElement.after(subtitleElement);
      }
    }
  }

  // 性格と天珠の説明を取得・表示
  const result = getResultData(month, day);
  if (result) {
    document.getElementById("personality-header").innerHTML = result.name + "眼人の<br>性質や注意することは…";
    document.getElementById("personality-description").innerHTML = formatTextForHTML(result.personality);

     // 文章の最後に「詳しくはこちら」のリンクを追加
     const moreInfoLink = ' <a href="詳細ページのURL" target="_blank" class="detail">詳しくはこちら</a>';
     document.getElementById("personality-description").innerHTML = formatTextForHTML(result.personality) + moreInfoLink;

    updateTenjuSection("tenju-1", result.name + "眼天珠", result.tenju16);
  }

  // タイトル部分を更新
  const titleElement = document.getElementById("title");
  if (titleElement) {
    titleElement.innerText = `${name}さんは` + result.name + "眼人です！";
  }

  // 各天珠の説明を取得・表示（tenju2〜tenju5）
  const tenjuResults = [
    { id: "tenju-2", result: getTenju2(year) },
    { id: "tenju-3", result: getTenju3(month, day) },
    { id: "tenju-4", result: getTenju4(month, day) },
    { id: "tenju-5", result: getTenju5(year) },
  ];

  tenjuResults.forEach(({ id, result }) => {
    if (result) {
      updateTenjuSection(id, result.name, result.description);
    }
  });

  // 天珠6の言葉を取得・表示
  const tenju6Result = getTenju6(month, day);
  if (tenju6Result) {
    updateTenjuSection("tenju-6", tenju6Result.name + "眼天珠", tenju6Result.description);
  }

  /**
  * 天珠のヘッダー部分とリスト部分を更新する関数
  * @param {string} id - 天珠のID (tenju-1 〜 tenju-6)
  * @param {string} name - 天珠の名前
  * @param {string} description - 天珠の説明
  */
  function updateTenjuSection(id, name, description) {
    const headerElement = document.getElementById(`${id}-header`);
    const descriptionElement = document.getElementById(`${id}-description`);

    // 画像を取得
    const imageSrc = tenjuImages[name] || "";

    // ヘッダーを更新（名前 + サブタイトル）
    const subtitleText = subtitles[name] || "";
    headerElement.innerHTML = `<strong class="tenju-name">${name}</strong><div class="custom-subtitle">${subtitleText}</div>`;
    

     // 説明文を更新（画像 + テキスト）
     descriptionElement.innerHTML = imageSrc
     ? `<img src="${imageSrc}" alt="${name}" class="tenju-image-body">${formatTextForHTML(description)}`
     : formatTextForHTML(description);
  }
});