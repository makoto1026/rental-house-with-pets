// スクロールイベントリスナーを追加
window.addEventListener('scroll', fadeIn);


// ふわっとアニメーション start
function fadeIn()
{
  const elements = document.querySelectorAll('.animation');
  elements.forEach(el =>
  {
    const elementTop = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight * 0.9)
    {
      el.classList.add('visible');
    }
  });
}

// ページ読み込み時にも一度実行しておく
fadeIn();
// ふわっとアニメーション end


// スライダー start
let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length - 1; // 実際のスライド数から繰り返される最初のスライドを除外

function updateSlider()
{
  if (currentIndex >= totalSlides)
  {
    currentIndex = 0; // 最初のスライドに戻る
    slides[0].parentNode.style.transition = 'none';
    slides[0].parentNode.style.transform = 'translateX(0)';
    setTimeout(() =>
    {
      slides[0].parentNode.style.transition = 'transform 0.5s ease';
      moveSlider();
    }, 10);
  } else
  {
    moveSlider();
  }
}

function moveSlider()
{
  slides[0].parentNode.style.transform = `translateX(-${100 * currentIndex}%)`;
  updateDots();
}

function updateDots()
{
  dots.forEach((dot, index) =>
  {
    if (index === currentIndex)
    {
      dot.classList.add('active');
    } else
    {
      dot.classList.remove('active');
    }
  });
}

setInterval(() =>
{
  currentIndex++;
  updateSlider();
}, 3000); // 3秒ごとにスライドを更新

document.addEventListener('DOMContentLoaded', updateSlider);
// スライダー end

// ラインアイコンをクリックしたときの処理 start
document.getElementById('line_top').addEventListener('click', function ()
{
  fetch('/track-click', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        buttonId: 'line_top',
        clickedDate: new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
      },
    )
  });
});

document.getElementById('line_bottom').addEventListener('click', function ()
{
  fetch('/track-click', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        buttonId: 'line_bottom',
        clickedDate: new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
      },
    )
  });
});
// ラインアイコンをクリックしたときの処理 end