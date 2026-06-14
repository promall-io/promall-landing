import Script from "next/script";

export const metadata = {
  title: "پرومال — مطالعه موردی سیستم طراحی",
  description:
    "مطالعه موردی سیستم طراحی پرومال: زبان بصری یکپارچه و فارسی‌محور برای پنل مدیریت فروشگاه، بازارگاه و وب‌سایت.",
};

const CSS = `
.cs{
  --font-fa: var(--font-estedaad), "SF Pro Display", system-ui, sans-serif;
  --font-mono: "SF Mono", ui-monospace, Menlo, Consolas, monospace;
  --ink:#1b263b; --ink-deep:#11192a; --slate:#415a77; --slate-soft:#778da9; --sky:#aebbd0;
  --gold:#d9d0b8; --gold-deep:#c4b894; --gold-tint:#efe9da;
  --paper:#f6f7f9; --white:#ffffff; --surface-page:#f6f7f9;
  --text-body:#2a3650; --text-muted:#5c6b84;
  --border-subtle:rgba(27,38,59,0.09); --input-border:rgba(27,38,59,0.12);
  --radius-lg:16px; --radius-xl:20px; --radius-2xl:24px; --radius-3xl:32px; --radius-full:9999px;
  --shadow-soft:0 1px 2px rgba(27,38,59,0.05), 0 6px 16px -8px rgba(27,38,59,0.12);
  --shadow-card:0 4px 24px rgba(27,38,59,0.06);
  --shadow-float:0 24px 60px -28px rgba(27,38,59,0.30);
  --fw-medium:500; --fw-semibold:600; --fw-bold:700; --fw-extrabold:800;
  --dur:0.4s; --ease-smooth:cubic-bezier(0.16,1,0.3,1);
  direction:rtl; text-align:right;
}
.cs iconify-icon{ display:inline-block; line-height:0; }
.cs .pm-btn{ display:inline-flex; align-items:center; gap:8px; height:42px; padding:0 18px; border-radius:var(--radius-full);
  font:var(--fw-semibold) 14px/1 var(--font-fa); border:1px solid transparent; cursor:pointer; transition:all var(--dur) var(--ease-smooth); }
.cs .pm-btn iconify-icon{ font-size:17px; }
.cs .pm-btn--primary{ background:var(--slate); color:#fff; }
.cs .pm-btn--gold{ background:var(--gold); color:var(--ink); }
.cs .pm-btn--secondary{ background:#eceef2; color:var(--ink); }
.cs .pm-btn--ghost{ background:transparent; color:var(--text-muted); }
.cs .pm-badge{ display:inline-flex; align-items:center; gap:6px; height:26px; padding:0 11px; border-radius:var(--radius-full);
  font:var(--fw-semibold) 12px/1 var(--font-fa); border:1px solid var(--border-subtle); }
.cs .pm-badge__dot{ width:6px; height:6px; border-radius:50%; background:currentColor; }
.cs .pm-badge iconify-icon{ font-size:14px; }
.cs .pm-badge--success{ color:#14935c; background:rgba(20,147,92,0.1); }
.cs .pm-badge--warning{ color:#b7791f; background:rgba(183,121,31,0.12); }
.cs .pm-badge--info{ color:#2f6ca2; background:rgba(47,108,162,0.1); }
.cs .pm-badge--danger{ color:#c0392b; background:rgba(192,57,43,0.1); }
.cs .pm-badge--gold{ color:var(--gold-deep); background:var(--gold-tint); }
.cs .pm-inputwrap{ position:relative; display:flex; align-items:center; }
.cs .pm-inputwrap__icon{ position:absolute; inset-inline-start:14px; color:var(--text-muted); font-size:18px; display:flex; }
.cs .pm-input{ width:100%; height:42px; border-radius:var(--radius-full); border:1px solid var(--input-border);
  background:var(--surface-page); padding-inline:42px 14px; font:var(--fw-medium) 14px/1 var(--font-fa); color:var(--ink); }
.cs .pm-avatar{ width:40px; height:40px; border-radius:var(--radius-full); display:inline-flex; align-items:center; justify-content:center;
  background:var(--slate); color:#fff; font:var(--fw-bold) 14px/1 var(--font-fa); }
.cs .pm-avatar--ring{ box-shadow:0 0 0 2px var(--white), 0 0 0 4px var(--gold); }
.cs .pm-tag{ display:inline-flex; align-items:center; height:32px; padding:0 14px; border-radius:var(--radius-full);
  font:var(--fw-semibold) 13px/1 var(--font-fa); border:1px solid var(--border-subtle); color:var(--text-muted); background:var(--white); }
.cs .pm-tag--active{ background:var(--ink); color:#fff; border-color:var(--ink); }

.cs{margin: 0; font-family: var(--font-fa); color: var(--text-body);
    background: linear-gradient(180deg, #f8f5ef, #f1ece2);}
.cs .wrap{max-width: 1080px; margin: 0 auto; padding: 0 28px;}
.cs section{padding: 72px 0;}
.cs .eyebrow{display: inline-flex; align-items: center; gap: 7px; font: var(--fw-bold) 13px/1 var(--font-fa);
    color: var(--slate); background: rgba(65,90,119,0.1); padding: 7px 14px; border-radius: var(--radius-full);}
.cs .eyebrow iconify-icon{font-size: 16px; color: var(--gold-deep);}
.cs h2.t{font: var(--fw-extrabold) 38px/1.4 var(--font-fa); color: var(--ink); margin: 16px 0 0; letter-spacing: -0.01em; text-wrap: balance;}
.cs .lead{font: var(--fw-medium) 17px/2 var(--font-fa); color: var(--text-muted); margin: 14px 0 0; max-width: 620px;}
.cs .hero{position: relative; overflow: hidden; padding: 0;}
.cs .hero__bg{position: absolute; inset: 0; z-index: 0;
    background:
      radial-gradient(46% 60% at 84% 8%, rgba(196,184,148,0.5), transparent 60%),
      radial-gradient(50% 60% at 10% 30%, rgba(65,90,119,0.32), transparent 60%),
      radial-gradient(60% 50% at 50% 105%, rgba(174,187,208,0.4), transparent 65%),
      linear-gradient(180deg, #f6f7f9, #eef1f5);}
.cs .hero__in{position: relative; z-index: 2; padding: 96px 0 84px; text-align: center;}
.cs .hero__brand{display: inline-flex; align-items: center; gap: 11px; margin-bottom: 26px;}
.cs .hero__brand .m{width: 40px; height: 40px; border-radius: 12px; background: var(--ink); display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-soft);}
.cs .hero__brand .m img{width: 22px;}
.cs .hero__brand b{font: var(--fw-bold) 22px/1 var(--font-fa); color: var(--ink);}
.cs h1{font: var(--fw-extrabold) 50px/1.5 var(--font-fa); color: var(--ink); margin: 20px auto 0; max-width: 820px; letter-spacing: -0.02em; text-wrap: balance;}
.cs h1 .grad{background: linear-gradient(220deg,#1b263b 20%,#415a77 60%,#aebbd0 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;}
.cs .hero__sub{font: var(--fw-medium) 19px/2 var(--font-fa); color: rgba(27,38,59,0.72); margin: 24px auto 0; max-width: 580px; text-wrap: pretty;}
.cs .chips{display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-top: 30px;}
.cs .chip{display: inline-flex; align-items: center; gap: 7px; background: rgba(255,255,255,0.62); border: 1px solid var(--glass-border);
    -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px); padding: 9px 15px; border-radius: var(--radius-full);
    font: var(--fw-semibold) 13.5px/1 var(--font-fa); color: var(--ink);}
.cs .chip iconify-icon{font-size: 17px; color: var(--slate);}
.cs .meta{display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--border-subtle);
    border: 1px solid var(--border-subtle); border-radius: var(--radius-2xl); overflow: hidden; margin-top: 56px; box-shadow: var(--shadow-card);}
.cs .meta div{background: var(--white); padding: 22px 20px;}
.cs .meta .k{font: var(--fw-semibold) 12px/1 var(--font-fa); color: var(--text-muted);}
.cs .meta .v{font: var(--fw-bold) 16px/1.5 var(--font-fa); color: var(--ink); margin-top: 8px;}
.cs .card{background: var(--white); border: 1px solid var(--border-subtle); border-radius: var(--radius-2xl); box-shadow: var(--shadow-card);}
.cs .two{display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: 40px;}
.cs .pcard{padding: 28px;}
.cs .pcard h3{font: var(--fw-bold) 19px/1.5 var(--font-fa); color: var(--ink); margin: 14px 0 0;}
.cs .pcard p{font: var(--fw-medium) 14px/1.9 var(--font-fa); color: var(--text-muted); margin: 8px 0 0;}
.cs .pcard .ic{width: 48px; height: 48px; border-radius: var(--radius-lg); background: var(--gold-tint); display: flex; align-items: center; justify-content: center;}
.cs .pcard .ic iconify-icon{font-size: 26px; color: var(--gold-deep);}
.cs .logos{display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 40px;}
.cs .logobox{border-radius: var(--radius-2xl); border: 1px solid var(--border-subtle); height: 180px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; box-shadow: var(--shadow-soft);}
.cs .logobox img.lock{height: 46px;}
.cs .logobox .cap{font: var(--fw-semibold) 12px/1 var(--font-fa); color: var(--text-muted);}
.cs .logobox.ink{background: var(--ink);}
.cs .logobox.ink .cap{color: rgba(255,255,255,0.6);}
.cs .logobox .app{width: 84px; height: 84px; border-radius: 20px; box-shadow: var(--shadow-float);}
.cs .swatches{display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px; margin-top: 40px;}
.cs .sw{border-radius: var(--radius-lg); height: 110px; padding: 12px; display: flex; flex-direction: column; justify-content: flex-end; border: 1px solid var(--border-subtle); box-shadow: var(--shadow-soft);}
.cs .sw .n{font: var(--fw-bold) 12px/1.3 var(--font-fa);}
.cs .sw .h{font: var(--fw-medium) 10px/1.4 var(--font-mono); opacity: .7; direction: ltr; text-align: right;}
.cs .sw.d{color: #fff;}
.cs .sw.d .h{color: rgba(255,255,255,0.8); opacity: 1;}
.cs .sw.l{color: var(--ink);}
.cs .type{margin-top: 40px; padding: 36px;}
.cs .type .big{font-weight: 800; font-size: 56px; line-height: 1.3; color: var(--ink); letter-spacing: -0.01em;}
.cs .type .num{font-weight: 700; font-size: 34px; color: var(--slate); margin-top: 6px;}
.cs .type .body{font-weight: 400; font-size: 17px; line-height: 2; color: var(--text-body); margin-top: 16px; max-width: 600px;}
.cs .type .scale{display: flex; gap: 22px; flex-wrap: wrap; margin-top: 22px; padding-top: 22px; border-top: 1px solid var(--border-subtle);}
.cs .type .scale span{font: var(--fw-semibold) 13px/1 var(--font-fa); color: var(--text-muted);}
.cs .type .scale b{color: var(--ink);}
.cs .comp{margin-top: 40px; padding: 32px; display: flex; flex-direction: column; gap: 20px;}
.cs .comp .row{display: flex; gap: 12px; align-items: center; flex-wrap: wrap;}
.cs .comp .rl{width: 100%; font: var(--fw-semibold) 11px/1 var(--font-fa); color: var(--text-muted); margin-bottom: -6px;}
.cs .shot{margin-top: 22px; border-radius: var(--radius-2xl); overflow: hidden; border: 1px solid var(--border-subtle); box-shadow: var(--shadow-float); background: #fff;}
.cs .shot__bar{display: flex; align-items: center; gap: 7px; padding: 11px 15px; background: #f1f3f6; border-bottom: 1px solid var(--border-subtle); direction: ltr;}
.cs .shot__bar i{width: 11px; height: 11px; border-radius: 50%;}
.cs .shot__bar .u{margin: 0 auto; font: var(--fw-medium) 11px/1 var(--font-mono); color: var(--text-muted);}
.cs .shot img{width: 100%; display: block;}
.cs .shotgrid{display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: 22px;}
.cs .princ{display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 40px;}
.cs .pr{padding: 24px;}
.cs .pr .n{font: var(--fw-extrabold) 22px/1 var(--font-fa); color: var(--gold-deep);}
.cs .pr h4{font: var(--fw-bold) 16px/1.5 var(--font-fa); color: var(--ink); margin: 12px 0 0;}
.cs .pr p{font: var(--fw-medium) 13px/1.85 var(--font-fa); color: var(--text-muted); margin: 6px 0 0;}
.cs .persona{display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: 40px;}
.cs .pp{padding: 26px; display: flex; gap: 16px;}
.cs .pp__av{width: 56px; height: 56px; border-radius: var(--radius-full); flex: none; display: flex; align-items: center; justify-content: center; color: #fff; font: var(--fw-bold) 17px/1 var(--font-fa);}
.cs .pp h4{font: var(--fw-bold) 17px/1.5 var(--font-fa); color: var(--ink); margin: 0;}
.cs .pp .role{font: var(--fw-semibold) 12px/1.4 var(--font-fa); color: var(--slate); margin-top: 2px;}
.cs .pp p{font: var(--fw-medium) 13px/1.9 var(--font-fa); color: var(--text-muted); margin: 10px 0 0;}
.cs .pp ul{margin: 12px 0 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 7px;}
.cs .pp li{font: var(--fw-medium) 12.5px/1.6 var(--font-fa); color: var(--text-body); display: flex; gap: 7px;}
.cs .pp li iconify-icon{color: var(--gold-deep); font-size: 15px; margin-top: 2px; flex: none;}
.cs .steps{display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-top: 40px;}
.cs .step{padding: 22px;}
.cs .step .n{width: 34px; height: 34px; border-radius: var(--radius-full); background: var(--ink); color: #fff; display: flex; align-items: center; justify-content: center; font: var(--fw-bold) 14px/1 var(--font-fa);}
.cs .step h4{font: var(--fw-bold) 15px/1.5 var(--font-fa); color: var(--ink); margin: 14px 0 0;}
.cs .step p{font: var(--fw-medium) 12.5px/1.85 var(--font-fa); color: var(--text-muted); margin: 6px 0 0;}
.cs .wf-wrap{display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: 40px;}
.cs .wf{background: #fbfcfd; border: 1px solid var(--border-subtle); border-radius: var(--radius-2xl); padding: 16px; box-shadow: var(--shadow-soft);}
.cs .wf__cap{font: var(--fw-semibold) 12.5px/1 var(--font-fa); color: var(--text-muted); margin-bottom: 12px; display: flex; align-items: center; gap: 6px;}
.cs .wf__cap iconify-icon{font-size: 16px; color: var(--slate);}
.cs .wf__win{display: grid; grid-template-columns: 64px 1fr; gap: 10px; height: 226px; direction: rtl;}
.cs .wf__sb{background: #eef1f5; border: 1px dashed #c3ccd8; border-radius: 12px; padding: 12px 8px; display: flex; flex-direction: column; gap: 9px;}
.cs .wf__sb i{height: 9px; border-radius: 4px; background: #d4dae3; display: block;}
.cs .wf__sb i.on{background: #ffffff; box-shadow: inset 0 0 0 1px #c3ccd8;}
.cs .wf__main{display: flex; flex-direction: column; gap: 10px; min-width: 0;}
.cs .wf__bar{height: 26px; border-radius: 8px; background: #e7ebf1; border: 1px dashed #c3ccd8; flex: none;}
.cs .wf__stats{display: grid; grid-template-columns: repeat(4,1fr); gap: 8px;}
.cs .wf__stats span{height: 42px; border-radius: 8px; background: #e7ebf1; border: 1px dashed #c3ccd8;}
.cs .wf__cols{display: grid; grid-template-columns: 1.6fr 1fr; gap: 8px; flex: 1;}
.cs .wf__cols span{border-radius: 10px; background: #e7ebf1; border: 1px dashed #c3ccd8;}
.cs section.warm{background: linear-gradient(180deg, #faf6ee, #f4eddf);}
.cs .store{margin-top: 40px; border-radius: var(--radius-3xl); overflow: hidden; border: 1px solid var(--border-subtle); box-shadow: var(--shadow-float); background: var(--white);}
.cs .store__cover{height: 120px; background: radial-gradient(70% 150% at 16% 0%, rgba(217,208,184,0.95), transparent 60%), linear-gradient(120deg, #e9dec6, #cbbd97);}
.cs .store__head{display: flex; align-items: flex-end; gap: 16px; padding: 0 26px 18px; margin-top: -36px; position: relative;}
.cs .store__av{width: 78px; height: 78px; border-radius: 22px; background: var(--ink); color: #fff; display: flex; align-items: center; justify-content: center; font: var(--fw-bold) 27px/1 var(--font-fa); border: 4px solid var(--white); box-shadow: var(--shadow-soft); flex: none;}
.cs .store__meta{flex: 1; padding-bottom: 4px; min-width: 0;}
.cs .store__nm{font: var(--fw-extrabold) 22px/1.5 var(--font-fa); color: var(--ink);}
.cs .store__sub{font: var(--fw-medium) 13px/1.5 var(--font-fa); color: var(--text-muted); display: flex; flex-wrap: wrap; gap: 8px 14px; margin-top: 4px;}
.cs .store__sub span{display: inline-flex; align-items: center; gap: 5px;}
.cs .store__sub iconify-icon{font-size: 16px; color: var(--slate-soft);}
.cs .store__body{padding: 4px 26px 26px;}
.cs .store__search{position: relative; margin-bottom: 18px;}
.cs .store__search iconify-icon{position: absolute; inset-inline-start: 14px; top: 50%; transform: translateY(-50%); color: var(--text-muted); font-size: 18px;}
.cs .store__search input{width: 100%; height: 44px; border-radius: var(--radius-full); border: 1px solid var(--input-border); background: var(--surface-page); padding-inline: 42px 14px; font: var(--fw-medium) 14px/1 var(--font-fa); color: var(--ink);}
.cs .store__grid{display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px;}
.cs .pc{border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); overflow: hidden; background: var(--white); box-shadow: var(--shadow-soft); transition: transform var(--dur) var(--ease-smooth), box-shadow var(--dur) var(--ease-smooth);}
.cs .pc:hover{transform: translateY(-3px); box-shadow: var(--shadow-float);}
.cs .pc__img{height: 108px; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.92); font-size: 40px;}
.cs .pc__b{padding: 11px 13px 13px;}
.cs .pc__nm{font: var(--fw-semibold) 13px/1.6 var(--font-fa); color: var(--ink);}
.cs .pc__pr{font: var(--fw-bold) 13px/1 var(--font-fa); color: var(--ink); margin-top: 8px;}
.cs .quote{text-align: center; padding: 70px 0;}
.cs .quote .mk{font: 800 56px/0.6 var(--font-fa); color: var(--gold-deep);}
.cs .quote p{font: var(--fw-bold) 28px/1.8 var(--font-fa); color: var(--ink); max-width: 780px; margin: 12px auto 0; text-wrap: balance;}
.cs footer{background: var(--ink); color: rgba(255,255,255,0.7); padding: 48px 0; margin-top: 24px;}
.cs footer .f{display: flex; align-items: center; gap: 12px;}
.cs footer .f .m{width: 34px; height: 34px; border-radius: 10px; background: rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center;}
.cs footer .f .m img{width: 18px;}
.cs footer .f b{font: var(--fw-bold) 18px/1 var(--font-fa); color: #fff;}
.cs footer .f p{font: var(--fw-medium) 13px/1 var(--font-fa); margin: 5px 0 0;}
.cs footer .meta-line{margin-top: 28px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.12); font: var(--fw-medium) 12.5px/1.8 var(--font-fa);}`;

const BODY = `

<!-- Hero -->
<header class="hero">
  <div class="hero__bg"></div>
  <div class="wrap hero__in">
    <div class="hero__brand"><span class="m"><img src="/case-study/logo-mark-white.png" alt="" /></span><b>پرومال</b></div>
    <div><span class="eyebrow"><iconify-icon icon="solar:notebook-bookmark-bold"></iconify-icon>مطالعه موردی · سیستم طراحی</span></div>
    <h1>طراحی یک تجربه‌ی <span class="grad">آرام و فارسی‌محور</span> برای فروشگاه‌داران</h1>
    <p class="hero__sub">سیستم طراحی پرومال؛ زبان بصری یکپارچه برای پنل مدیریت فروشگاه، بازارگاه و وب‌سایت — گرم، گرد، و الهام‌گرفته از تجربه‌ی iOS و macOS.</p>
    <div class="chips">
      <span class="chip"><iconify-icon icon="solar:global-bold"></iconify-icon>فارسی‌محور · راست‌چین</span>
      <span class="chip"><iconify-icon icon="solar:chat-round-money-bold"></iconify-icon>تجارت اینستاگرامی</span>
      <span class="chip"><iconify-icon icon="solar:shop-2-bold"></iconify-icon>بازارگاه آنلاین</span>
      <span class="chip"><iconify-icon icon="solar:moon-bold"></iconify-icon>روشن و تیره</span>
    </div>
  </div>
</header>

<div class="wrap">
  <div class="meta">
    <div><div class="k">محصول</div><div class="v">پرومال</div></div>
    <div><div class="k">نقش</div><div class="v">سیستم طراحی و رابط کاربری</div></div>
    <div><div class="k">پلتفرم</div><div class="v">وب · ریسپانسیو</div></div>
    <div><div class="k">زبان</div><div class="v">فارسی (RTL) + انگلیسی</div></div>
  </div>
</div>

<!-- Challenge / Approach -->
<section>
  <div class="wrap">
    <span class="eyebrow"><iconify-icon icon="solar:target-bold"></iconify-icon>چالش و رویکرد</span>
    <h2 class="t">یک پنل که به‌جای شلوغی، آرامش بدهد</h2>
    <p class="lead">فروشنده‌ی ایرانی هر روز ده‌ها سفارش و دایرکت را میان چند اپ جابه‌جا می‌کند. هدف، یک‌کاسه‌کردن همه‌چیز در فضایی بود که هم حرفه‌ای باشد و هم دوست‌داشتنی.</p>
    <div class="two">
      <div class="card pcard">
        <div class="ic"><iconify-icon icon="solar:danger-triangle-bold-duotone"></iconify-icon></div>
        <h3>چالش</h3>
        <p>تجربه‌ای پراکنده میان دایرکت، اکسل و پیام‌رسان‌ها؛ نبود زبان بصری یکپارچه، و کم‌توجهی به راست‌چینی و تایپ فارسی در ابزارهای موجود.</p>
      </div>
      <div class="card pcard">
        <div class="ic"><iconify-icon icon="solar:magic-stick-3-bold-duotone"></iconify-icon></div>
        <h3>رویکرد</h3>
        <p>یک سیستم توکن‌محور با گردی سخاوتمندانه، سایه‌های نرم، یک ایزِ نرم و یکدست، و تایپ Estedad — ساخته‌شده از پایه برای فارسی و راست‌چین.</p>
      </div>
    </div>
  </div>
</section>

<!-- Personas -->
<section>
  <div class="wrap">
    <span class="eyebrow"><iconify-icon icon="solar:users-group-two-rounded-bold"></iconify-icon>کاربران</span>
    <h2 class="t">دو نقش، یک تجربه‌ی یکپارچه</h2>
    <p class="lead">پرومال دو نوع کاربر دارد که با یک پل به هم می‌رسند؛ هر خریدار می‌تواند با یک کلیک فروشنده شود.</p>
    <div class="persona">
      <div class="card pp">
        <span class="pp__av" style="background:#415a77">م‌ا</span>
        <div>
          <h4>مریم — فروشنده</h4>
          <div class="role">مدیر بوتیک ترمه · تهران</div>
          <p>روزی ده‌ها دایرکت و سفارش دارد و دنبال آرامش، سرعت و یک‌جا بودن همه‌چیز است.</p>
          <ul>
            <li><iconify-icon icon="solar:check-circle-bold"></iconify-icon>پاسخ خودکار به دایرکت‌های اینستاگرام</li>
            <li><iconify-icon icon="solar:check-circle-bold"></iconify-icon>مدیریت سفارش، انبار و پرداخت در یک پنل</li>
            <li><iconify-icon icon="solar:check-circle-bold"></iconify-icon>گزارش فروش و سود زنده</li>
          </ul>
        </div>
      </div>
      <div class="card pp">
        <span class="pp__av" style="background:#c4b894">س‌م</span>
        <div>
          <h4>سارا — خریدار</h4>
          <div class="role">کاربر بازارگاه پرومال</div>
          <p>از فروشگاه‌های اینستاگرامی خرید می‌کند و می‌خواهد سفارش‌هایش را راحت پیگیری کند.</p>
          <ul>
            <li><iconify-icon icon="solar:check-circle-bold"></iconify-icon>پیگیری سفارش و خرید دوباره</li>
            <li><iconify-icon icon="solar:check-circle-bold"></iconify-icon>علاقه‌مندی و فروشگاه‌های دنبال‌شده</li>
            <li><iconify-icon icon="solar:check-circle-bold"></iconify-icon>تبدیل حساب به فروشگاه</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Process -->
<section>
  <div class="wrap">
    <span class="eyebrow"><iconify-icon icon="solar:routing-2-bold"></iconify-icon>جریان کار</span>
    <h2 class="t">از ثبت‌نام تا اولین فروش، در چند دقیقه</h2>
    <p class="lead">از ساختن فروشگاه تا دیدن گزارش فروش؛ مسیری ساده که در هر مرحله کنار فروشنده است.</p>
    <div class="steps">
      <div class="card step"><div class="n">۱</div><h4>ساختن فروشگاه</h4><p>ثبت‌نام کن و آدرس فروشگاهت را روی promall.io انتخاب کن؛ بدون دانش فنی و کاملاً فارسی.</p></div>
      <div class="card step"><div class="n">۲</div><h4>اضافه‌کردن محصول</h4><p>محصول، قیمت و موجودی را وارد کن؛ رنگ و سایزها خودشان دسته‌بندی می‌شوند.</p></div>
      <div class="card step"><div class="n">۳</div><h4>فروش دستی یا با هوش مصنوعی</h4><p>یا خودت سفارش را می‌سازی و لینک پرداخت می‌فرستی، یا جواب دایرکت‌ها را به هوش مصنوعی می‌سپاری.</p></div>
      <div class="card step"><div class="n">۴</div><h4>ارسال و گزارش</h4><p>فاکتور و برچسب پستی با یک لمس آماده می‌شود و فروش و سودت را زنده می‌بینی.</p></div>
    </div>
  </div>
</section>

<!-- Wireframes -->
<section>
  <div class="wrap">
    <span class="eyebrow"><iconify-icon icon="solar:pen-new-square-bold"></iconify-icon>وایرفریم و معماری</span>
    <h2 class="t">از اسکلت ساده تا رابط نهایی</h2>
    <p class="lead">پیش از رنگ و جزئیات، ساختار هر صفحه با وایرفریم‌های کم‌جزئیات چیده شد: نوار کناری جدا، نوار بالا و شبکه‌ی کارت‌ها.</p>
    <div class="wf-wrap">
      <div class="wf">
        <div class="wf__cap"><iconify-icon icon="solar:widget-5-linear"></iconify-icon>وایرفریم پیشخوان فروشگاه</div>
        <div class="wf__win">
          <div class="wf__sb"><i></i><i class="on"></i><i></i><i></i><i></i><i></i></div>
          <div class="wf__main">
            <div class="wf__bar"></div>
            <div class="wf__stats"><span></span><span></span><span></span><span></span></div>
            <div class="wf__cols"><span></span><span></span></div>
          </div>
        </div>
      </div>
      <div class="wf">
        <div class="wf__cap"><iconify-icon icon="solar:user-circle-linear"></iconify-icon>وایرفریم حساب خریدار</div>
        <div class="wf__win">
          <div class="wf__sb"><i></i><i class="on"></i><i></i><i></i><i></i><i></i></div>
          <div class="wf__main">
            <div class="wf__bar"></div>
            <div class="wf__stats"><span></span><span></span><span></span><span></span></div>
            <div class="wf__cols" style="grid-template-columns:1fr"><span></span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Identity -->
<section>
  <div class="wrap">
    <span class="eyebrow"><iconify-icon icon="solar:crown-star-bold"></iconify-icon>هویت بصری</span>
    <h2 class="t">نشان پرومال — هندسی، گرم، ماندگار</h2>
    <p class="lead">یک مونوگرام برگرفته از حرف P که روی سطح روشن، روی جوهرِ تیره، و به‌عنوان آیکون اپ کار می‌کند.</p>
    <div class="logos">
      <div class="logobox" style="background:var(--paper)"><img class="lock" src="/case-study/logo-mark-ink.png" alt="نشان پرومال" /><span class="cap">روی سطح روشن</span></div>
      <div class="logobox ink"><img class="lock" src="/case-study/logo-mark-white.png" alt="نشان پرومال" /><span class="cap">روی جوهر تیره</span></div>
      <div class="logobox" style="background:var(--paper)"><img class="app" src="/case-study/favicon.png" alt="آیکون اپ" /><span class="cap">آیکون اپلیکیشن</span></div>
    </div>
  </div>
</section>

<!-- Color -->
<section>
  <div class="wrap">
    <span class="eyebrow"><iconify-icon icon="solar:pallete-2-bold"></iconify-icon>رنگ</span>
    <h2 class="t">جوهر آبی، گرم‌شده با طلایی</h2>
    <p class="lead">پالت اصلی از زبان بصری پرومال؛ آبیِ جوهری برای متن و سطوح تیره، اسلیت به‌عنوان رنگ برند، و طلاییِ کرمی برای گرما و تأکید.</p>
    <div class="swatches">
      <div class="sw d" style="background:#11192a"><span class="n">جوهر تیره</span><span class="h">#11192A</span></div>
      <div class="sw d" style="background:#1b263b"><span class="n">جوهر</span><span class="h">#1B263B</span></div>
      <div class="sw d" style="background:#415a77"><span class="n">اسلیت</span><span class="h">#415A77</span></div>
      <div class="sw l" style="background:#aebbd0"><span class="n">آسمانی</span><span class="h">#AEBBD0</span></div>
      <div class="sw l" style="background:#d9d0b8"><span class="n">طلایی</span><span class="h">#D9D0B8</span></div>
      <div class="sw l" style="background:#f6f7f9"><span class="n">کاغذی</span><span class="h">#F6F7F9</span></div>
    </div>
  </div>
</section>

<!-- Type -->
<section>
  <div class="wrap">
    <span class="eyebrow"><iconify-icon icon="solar:text-bold"></iconify-icon>تایپوگرافی</span>
    <h2 class="t">استعداد — قلمِ کاریِ فارسی</h2>
    <div class="card type">
      <div class="big">مدیریت هوشمند فروشگاه</div>
      <div class="num">۱۲۳۴۵۶۷۸۹۰ — ۲۸٬۵۴۰٬۰۰۰ تومان</div>
      <div class="body">سفارش‌ها، پیام‌ها و پرداخت‌ها را از یک پنل آرام مدیریت کنید؛ تایپ راحت برای داشبورد و متن‌های طولانی، با وزن‌های لایت تا بولد.</div>
      <div class="scale">
        <span><b>نمایش</b> ۴۸ / ۸۰۰</span>
        <span><b>عنوان</b> ۳۰ / ۷۰۰</span>
        <span><b>متن</b> ۱۶ / ۴۰۰</span>
        <span><b>ایز</b> cubic-bezier(0.16, 1, 0.3, 1)</span>
      </div>
    </div>
  </div>
</section>

<!-- Components -->
<section>
  <div class="wrap">
    <span class="eyebrow"><iconify-icon icon="solar:widget-5-bold"></iconify-icon>اجزای رابط</span>
    <h2 class="t">کتابخانه‌ای از اجزای هماهنگ</h2>
    <p class="lead">دکمه‌ها، نشان‌های وضعیت، فیلدها و کارت‌ها — همه از روی توکن‌ها ساخته شده‌اند تا در همه‌جا یکدست بمانند.</p>
    <div class="card comp">
      <div class="row"><span class="rl">دکمه‌ها</span>
        <button class="pm-btn pm-btn--primary pm-btn--md">افزودن محصول</button>
        <button class="pm-btn pm-btn--gold pm-btn--md"><span>ارتقا</span><iconify-icon icon="solar:arrow-left-up-linear"></iconify-icon></button>
        <button class="pm-btn pm-btn--secondary pm-btn--md">انصراف</button>
        <button class="pm-btn pm-btn--ghost pm-btn--md">حذف</button>
      </div>
      <div class="row"><span class="rl">نشان‌های وضعیت</span>
        <span class="pm-badge pm-badge--success"><span class="pm-badge__dot"></span>پرداخت‌شده</span>
        <span class="pm-badge pm-badge--warning"><span class="pm-badge__dot"></span>آماده‌سازی</span>
        <span class="pm-badge pm-badge--info"><span class="pm-badge__dot"></span>ارسال‌شده</span>
        <span class="pm-badge pm-badge--danger"><span class="pm-badge__dot"></span>ناموفق</span>
        <span class="pm-badge pm-badge--gold"><iconify-icon icon="solar:crown-minimalistic-bold"></iconify-icon>ویژه</span>
      </div>
      <div class="row"><span class="rl">فیلد و آواتار</span>
        <div class="pm-inputwrap" style="max-width:280px;flex:1"><span class="pm-inputwrap__icon"><iconify-icon icon="solar:magnifer-linear"></iconify-icon></span><input class="pm-input" placeholder="جست‌وجوی سفارش…" /></div>
        <span class="pm-avatar pm-avatar--md">م‌ا</span>
        <span class="pm-avatar pm-avatar--md pm-avatar--ring">س‌م</span>
        <span class="pm-tag pm-tag--active">همه</span>
        <span class="pm-tag">پوشاک</span>
      </div>
    </div>
  </div>
</section>

<!-- Product -->
<section>
  <div class="wrap">
    <span class="eyebrow"><iconify-icon icon="solar:monitor-smartphone-bold"></iconify-icon>محصول</span>
    <h2 class="t">یک پنجره‌ی شناور، آرام و کامل</h2>
    <p class="lead">داشبورد فروشگاه در قالب یک پنجره‌ی گرد و شناور روی پس‌زمینه‌ای روشن — با نوار کناری جدا، در دو حالت روشن و تیره.</p>
    <div class="shot">
      <div class="shot__bar"><i style="background:#ec6a5e"></i><i style="background:#f4bf4f"></i><i style="background:#61c554"></i><span class="u">app.promall.io / پیشخوان</span></div>
      <img src="/case-study/case/shot-dashboard.png" alt="داشبورد فروشگاه پرومال" />
    </div>
    <div class="shotgrid">
      <div class="shot">
        <div class="shot__bar"><i style="background:#ec6a5e"></i><i style="background:#f4bf4f"></i><i style="background:#61c554"></i><span class="u">حالت تیره</span></div>
        <img src="/case-study/case/shot-dashboard-dark.png" alt="داشبورد در حالت تیره" />
      </div>
      <div class="shot">
        <div class="shot__bar"><i style="background:#ec6a5e"></i><i style="background:#f4bf4f"></i><i style="background:#61c554"></i><span class="u">حساب خریدار</span></div>
        <img src="/case-study/case/shot-account.png" alt="پنل حساب خریدار" />
      </div>
    </div>
  </div>
</section>

<!-- Marketplace / find a shop -->
<section class="warm">
  <div class="wrap">
    <span class="eyebrow"><iconify-icon icon="solar:shop-2-bold"></iconify-icon>تجربه‌ی خریدار · بازارگاه</span>
    <h2 class="t">دنبال یک فروشگاه می‌گردی؟ راحت پیدایش کن</h2>
    <p class="lead">خیلی از کاربران پرومال خریدارند؛ دنبال یک فروشگاه خاص یا یک محصول می‌گردند. هر فروشگاه ویترین گرم خودش را روی promall.io دارد — ساده، بی‌نیاز از ورود، و آماده‌ی خرید.</p>
    <div class="store">
      <div class="store__cover"></div>
      <div class="store__head">
        <span class="store__av">ت</span>
        <div class="store__meta">
          <div class="store__nm">بوتیک ترمه</div>
          <div class="store__sub">
            <span><iconify-icon icon="solar:hanger-2-linear"></iconify-icon>پوشاک زنانه</span>
            <span><iconify-icon icon="solar:map-point-linear"></iconify-icon>تهران</span>
            <span><iconify-icon icon="solar:users-group-rounded-linear"></iconify-icon>۳٬۲۴۰ دنبال‌کننده</span>
            <span><iconify-icon icon="solar:star-bold"></iconify-icon>۴٫۸ از ۵</span>
          </div>
        </div>
        <button class="pm-btn pm-btn--primary pm-btn--md"><iconify-icon icon="solar:heart-linear"></iconify-icon><span>دنبال‌کردن</span></button>
      </div>
      <div class="store__body">
        <div class="store__search"><iconify-icon icon="solar:magnifer-linear"></iconify-icon><input placeholder="جست‌وجو در این فروشگاه…" /></div>
        <div class="store__grid">
          <div class="pc"><div class="pc__img" style="background:#415a77"><iconify-icon icon="solar:hanger-2-bold"></iconify-icon></div><div class="pc__b"><div class="pc__nm">مانتو نخی کرم</div><div class="pc__pr">۱٬۲۸۰٬۰۰۰ تومان</div></div></div>
          <div class="pc"><div class="pc__img" style="background:#1b263b"><iconify-icon icon="solar:t-shirt-bold"></iconify-icon></div><div class="pc__b"><div class="pc__nm">شومیز ساتن مشکی</div><div class="pc__pr">۸۹۰٬۰۰۰ تومان</div></div></div>
          <div class="pc"><div class="pc__img" style="background:#c4b894"><iconify-icon icon="solar:bag-4-bold"></iconify-icon></div><div class="pc__b"><div class="pc__nm">روسری ابریشمی</div><div class="pc__pr">۴۲۰٬۰۰۰ تومان</div></div></div>
          <div class="pc"><div class="pc__img" style="background:#778da9"><iconify-icon icon="solar:hanger-bold"></iconify-icon></div><div class="pc__b"><div class="pc__nm">پیراهن ابریشمی</div><div class="pc__pr">۱٬۴۵۰٬۰۰۰ تومان</div></div></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Quote -->
<section class="warm" style="padding-top:0">
  <div class="wrap quote">
    <div class="mk">”</div>
    <p>هدف ساده بود: کاری کنیم خرید و فروش در اینستاگرام، به‌جای شلوغی و استرس، حسی آرام و دوست‌داشتنی داشته باشد.</p>
  </div>
</section>

<!-- Principles -->
<section>
  <div class="wrap">
    <span class="eyebrow"><iconify-icon icon="solar:star-bold"></iconify-icon>اصول طراحی</span>
    <h2 class="t">چهار اصل که همه‌چیز را یکدست نگه می‌دارد</h2>
    <div class="princ">
      <div class="card pr"><div class="n">۰۱</div><h4>اطلاعات، نه تزئین</h4><p>هر کارت یک کار مشخص دارد؛ عدد، وضعیت و اقدام در یک نگاه خوانده می‌شوند و چیزی فقط برای پر کردن فضا اضافه نمی‌شود.</p></div>
      <div class="card pr"><div class="n">۰۲</div><h4>یک زبان در کل محصول</h4><p>پنل فروشنده و بازارگاه خریدار از یک مجموعه توکن مشترک (رنگ، تایپ، فاصله، سایه) می‌آیند؛ برای همین همه‌جا یکدست‌اند.</p></div>
      <div class="card pr"><div class="n">۰۳</div><h4>حرکت فقط برای راهنمایی</h4><p>انیمیشن کارکرد دارد نه نمایش: یک ایزِ نرم و یکسان و گذرهای کوتاه که چشم را هدایت می‌کنند، نه این‌که حواس را پرت کنند.</p></div>
      <div class="card pr"><div class="n">۰۴</div><h4>برای لمس و دسترس‌پذیری</h4><p>هدف‌های لمسی بزرگ، کنتراست کافی، حالت تیره و راست‌چینی درست؛ کار کردن باهاش روی موبایل و دسکتاپ یک‌اندازه راحت است.</p></div>
    </div>
  </div>
</section>

<footer>
  <div class="wrap">
    <div class="f"><span class="m"><img src="/case-study/logo-mark-white.png" alt="" /></span><div><b>پرومال</b><p>مدیریت کن. خودکار کن. رشد کن.</p></div></div>
    <div class="meta-line">سیستم طراحی پرومال · ساخته‌شده برای کسب‌وکارهای ایرانی · promall.io</div>
  </div>
</footer>

`;

export default function CaseStudyPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="cs" dir="rtl" lang="fa" dangerouslySetInnerHTML={{ __html: BODY }} />
      <Script
        src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"
        strategy="afterInteractive"
      />
    </>
  );
}
