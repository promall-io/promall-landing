export const metadata = {
  title: "پرومال — مطالعه موردی سیستم طراحی",
  description:
    "مطالعه موردی سیستم طراحی پرومال: زبان بصری یکپارچه و فارسی‌محور برای پنل مدیریت فروشگاه، بازارگاه و وب‌سایت.",
  robots: { index: false, follow: true },
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
.cs .ic{ display:inline-flex; align-items:center; justify-content:center; line-height:0; }
.cs .ic svg{ width:1em; height:1em; }
.cs .pm-btn{ display:inline-flex; align-items:center; gap:8px; height:42px; padding:0 18px; border-radius:var(--radius-full);
  font:var(--fw-semibold) 14px/1 var(--font-fa); border:1px solid transparent; cursor:pointer; transition:all var(--dur) var(--ease-smooth); }
.cs .pm-btn .ic{ font-size:17px; }
.cs .pm-btn--primary{ background:var(--slate); color:#fff; }
.cs .pm-btn--gold{ background:var(--gold); color:var(--ink); }
.cs .pm-btn--secondary{ background:#eceef2; color:var(--ink); }
.cs .pm-btn--ghost{ background:transparent; color:var(--text-muted); }
.cs .pm-badge{ display:inline-flex; align-items:center; gap:6px; height:26px; padding:0 11px; border-radius:var(--radius-full);
  font:var(--fw-semibold) 12px/1 var(--font-fa); border:1px solid var(--border-subtle); }
.cs .pm-badge__dot{ width:6px; height:6px; border-radius:50%; background:currentColor; }
.cs .pm-badge .ic{ font-size:14px; }
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
    background: #f4efe5;}
.cs .wrap{max-width: 1080px; margin: 0 auto; padding: 0 28px;}
.cs section{padding: 72px 0;}
.cs .eyebrow{display: inline-flex; align-items: center; gap: 7px; font: var(--fw-bold) 13px/1 var(--font-fa);
    color: var(--slate); background: rgba(65,90,119,0.1); padding: 7px 14px; border-radius: var(--radius-full);}
.cs .eyebrow .ic{font-size: 16px; color: var(--gold-deep);}
.cs h2.t{font: var(--fw-extrabold) 38px/1.4 var(--font-fa); color: var(--ink); margin: 16px 0 0; letter-spacing: -0.01em; text-wrap: balance;}
.cs .lead{font: var(--fw-medium) 17px/2 var(--font-fa); color: var(--text-muted); margin: 14px 0 0; max-width: 620px;}
.cs .hero{position: relative; overflow: hidden; padding: 0;}
.cs .hero__bg{position: absolute; inset: 0; z-index: 0;
    background: var(--paper);}
.cs .hero__in{position: relative; z-index: 2; padding: 96px 0 84px; text-align: center;}
.cs .hero__brand{display: inline-flex; align-items: center; gap: 11px; margin-bottom: 26px;}
.cs .hero__brand .m{width: 40px; height: 40px; border-radius: 12px; background: var(--ink); display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-soft);}
.cs .hero__brand .m img{width: 22px;}
.cs .hero__brand b{font: var(--fw-bold) 22px/1 var(--font-fa); color: var(--ink);}
.cs h1{font: var(--fw-extrabold) 50px/1.5 var(--font-fa); color: var(--ink); margin: 20px auto 0; max-width: 820px; letter-spacing: -0.02em; text-wrap: balance;}
.cs h1 .grad{color: var(--slate);}
.cs .hero__sub{font: var(--fw-medium) 19px/2 var(--font-fa); color: rgba(27,38,59,0.72); margin: 24px auto 0; max-width: 580px; text-wrap: pretty;}
.cs .chips{display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-top: 30px;}
.cs .chip{display: inline-flex; align-items: center; gap: 7px; background: rgba(255,255,255,0.6); border: 1px solid var(--border-subtle);
    -webkit-backdrop-filter: blur(20px) saturate(180%); backdrop-filter: blur(20px) saturate(180%); padding: 9px 15px; border-radius: var(--radius-full);
    font: var(--fw-semibold) 13.5px/1 var(--font-fa); color: var(--ink);}
.cs .chip .ic{font-size: 17px; color: var(--slate);}
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
.cs .pcard .ic .ic{font-size: 26px; color: var(--gold-deep);}
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
.cs .pp li .ic{color: var(--gold-deep); font-size: 15px; margin-top: 2px; flex: none;}
.cs .steps{display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-top: 40px;}
.cs .step{padding: 22px;}
.cs .step .n{width: 34px; height: 34px; border-radius: var(--radius-full); background: var(--ink); color: #fff; display: flex; align-items: center; justify-content: center; font: var(--fw-bold) 14px/1 var(--font-fa);}
.cs .step h4{font: var(--fw-bold) 15px/1.5 var(--font-fa); color: var(--ink); margin: 14px 0 0;}
.cs .step p{font: var(--fw-medium) 12.5px/1.85 var(--font-fa); color: var(--text-muted); margin: 6px 0 0;}
.cs .wf-wrap{display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: 40px;}
.cs .wf{background: #fbfcfd; border: 1px solid var(--border-subtle); border-radius: var(--radius-2xl); padding: 16px; box-shadow: var(--shadow-soft);}
.cs .wf__cap{font: var(--fw-semibold) 12.5px/1 var(--font-fa); color: var(--text-muted); margin-bottom: 12px; display: flex; align-items: center; gap: 6px;}
.cs .wf__cap .ic{font-size: 16px; color: var(--slate);}
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
.cs section.warm{background: var(--gold-tint);}
.cs .store{margin-top: 40px; border-radius: var(--radius-3xl); overflow: hidden; border: 1px solid var(--border-subtle); box-shadow: var(--shadow-float); background: var(--white);}
.cs .store__cover{height: 120px; background: var(--gold);}
.cs .store__head{display: flex; align-items: flex-end; gap: 16px; padding: 0 26px 18px; margin-top: -36px; position: relative;}
.cs .store__av{width: 78px; height: 78px; border-radius: 22px; background: var(--ink); color: #fff; display: flex; align-items: center; justify-content: center; font: var(--fw-bold) 27px/1 var(--font-fa); border: 4px solid var(--white); box-shadow: var(--shadow-soft); flex: none;}
.cs .store__meta{flex: 1; padding-bottom: 4px; min-width: 0;}
.cs .store__nm{font: var(--fw-extrabold) 22px/1.5 var(--font-fa); color: var(--ink);}
.cs .store__sub{font: var(--fw-medium) 13px/1.5 var(--font-fa); color: var(--text-muted); display: flex; flex-wrap: wrap; gap: 8px 14px; margin-top: 4px;}
.cs .store__sub span{display: inline-flex; align-items: center; gap: 5px;}
.cs .store__sub .ic{font-size: 16px; color: var(--slate-soft);}
.cs .store__body{padding: 4px 26px 26px;}
.cs .store__search{position: relative; margin-bottom: 18px;}
.cs .store__search .ic{position: absolute; inset-inline-start: 14px; top: 50%; transform: translateY(-50%); color: var(--text-muted); font-size: 18px;}
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
    <div><span class="eyebrow"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M14.25 4.48v3.057c0 .111 0 .27.021.406a.94.94 0 0 0 .444.683a.96.96 0 0 0 .783.072c.13-.04.272-.108.378-.159L17 8.005l1.124.534c.106.05.248.119.378.16a.96.96 0 0 0 .783-.073a.94.94 0 0 0 .444-.683c.022-.136.021-.295.021-.406V3.031q.17-.008.332-.013C21.154 2.98 22 3.86 22 4.933v11.21c0 1.112-.906 2.01-2.015 2.08c-.97.06-2.108.179-2.985.41c-1.082.286-2.373.904-3.372 1.436q-.422.224-.878.323V5.174a3.6 3.6 0 0 0 .924-.371q.277-.162.576-.323m5.478 8.338a.75.75 0 0 1-.546.91l-4 1a.75.75 0 1 1-.364-1.456l4-1a.75.75 0 0 1 .91.546M11.25 5.214a3.4 3.4 0 0 1-.968-.339C9.296 4.354 8.05 3.765 7 3.487c-.887-.233-2.041-.352-3.018-.412C2.886 3.008 2 3.9 2 4.998v11.146c0 1.11.906 2.01 2.015 2.079c.97.06 2.108.179 2.985.41c1.081.286 2.373.904 3.372 1.436q.422.224.878.324zM4.273 8.818a.75.75 0 0 1 .91-.546l4 1a.75.75 0 1 1-.365 1.456l-4-1a.75.75 0 0 1-.545-.91m.91 3.454a.75.75 0 1 0-.365 1.456l4 1a.75.75 0 0 0 .364-1.456z" clip-rule="evenodd"/><path fill="currentColor" d="M18.25 3.151c-.62.073-1.23.18-1.75.336a8 8 0 0 0-.75.27v3.182l.75-.356l.008-.005a1.1 1.1 0 0 1 .492-.13q.072 0 .138.01c.175.029.315.1.354.12l.009.005l.75.356V3.15"/></svg></span>مطالعه موردی · سیستم طراحی</span></div>
    <h1>طراحی یک تجربه‌ی <span class="grad">آرام و فارسی‌محور</span> برای فروشگاه‌داران</h1>
    <p class="hero__sub">سیستم طراحی پرومال؛ زبان بصری یکپارچه برای پنل مدیریت فروشگاه، بازارگاه و وب‌سایت — گرم، گرد، و الهام‌گرفته از تجربه‌ی iOS و macOS.</p>
    <div class="chips">
      <span class="chip"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M2.028 11.25A10 10 0 0 1 12 2c-.83 0-1.57.364-2.18.921c-.605.554-1.116 1.328-1.53 2.242c-.416.92-.74 1.996-.959 3.163a20 20 0 0 0-.318 2.924zm0 1.5h4.985c.036 1.002.143 1.988.318 2.924c.22 1.167.543 2.243.959 3.163c.414.914.925 1.688 1.53 2.242c.61.557 1.35.921 2.18.921c-5.27 0-9.589-4.077-9.972-9.25" clip-rule="evenodd"/><path fill="currentColor" d="M12 3.395c-.275 0-.63.117-1.043.495c-.416.381-.833.978-1.201 1.791c-.366.808-.663 1.783-.867 2.873c-.16.858-.26 1.768-.296 2.696h6.814a18.5 18.5 0 0 0-.296-2.696c-.204-1.09-.5-2.065-.867-2.873c-.368-.813-.784-1.41-1.2-1.79c-.414-.379-.769-.496-1.044-.496M8.889 15.446c.204 1.09.501 2.065.867 2.873c.368.813.785 1.41 1.2 1.79c.414.379.77.496 1.044.496c.275 0 .63-.117 1.043-.495c.417-.381.833-.978 1.201-1.791c.366-.808.663-1.783.867-2.873c.161-.858.261-1.768.296-2.696H8.593c.035.928.135 1.838.296 2.696"/><path fill="currentColor" d="M12 2c.831 0 1.57.364 2.18.921c.605.554 1.117 1.328 1.53 2.242c.417.92.74 1.996.959 3.163c.175.936.282 1.922.318 2.924h4.985A10 10 0 0 0 12 2m4.669 13.674c-.219 1.167-.542 2.243-.959 3.163c-.413.914-.925 1.688-1.53 2.242c-.61.557-1.349.921-2.18.921c5.27 0 9.589-4.077 9.972-9.25h-4.985a20 20 0 0 1-.318 2.924"/></svg></span>فارسی‌محور · راست‌چین</span>
      <span class="chip"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M22 12c0 5.523-4.477 10-10 10c-1.6 0-3.112-.376-4.452-1.044a1.63 1.63 0 0 0-1.149-.133l-2.226.596a1.3 1.3 0 0 1-1.591-1.592l.595-2.226a1.63 1.63 0 0 0-.134-1.148A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10M12 7.25a.75.75 0 0 1 .75.75v.01c1.089.275 2 1.133 2 2.323a.75.75 0 0 1-1.5 0c0-.384-.426-.916-1.25-.916s-1.25.532-1.25.916s.426.917 1.25.917c1.385 0 2.75.96 2.75 2.417c0 1.19-.911 2.049-2 2.323V16a.75.75 0 0 1-1.5 0v-.01c-1.089-.274-2-1.133-2-2.323a.75.75 0 0 1 1.5 0c0 .384.426.916 1.25.916s1.25-.532 1.25-.916s-.426-.917-1.25-.917c-1.385 0-2.75-.96-2.75-2.417c0-1.19.911-2.048 2-2.323V8a.75.75 0 0 1 .75-.75" clip-rule="evenodd"/></svg></span>تجارت اینستاگرامی</span>
      <span class="chip"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M16.528 2H7.472c-1.203 0-1.804 0-2.288.299c-.483.298-.752.836-1.29 1.912L2.491 7.76c-.325.82-.608 1.786-.062 2.479A2 2 0 0 0 6 9a2 2 0 1 0 4 0a2 2 0 1 0 4 0a2 2 0 1 0 4 0a2 2 0 0 0 3.571 1.238c.546-.693.262-1.659-.062-2.479l-1.404-3.548c-.538-1.076-.806-1.614-1.29-1.912C18.332 2 17.73 2 16.528 2"/><path fill="currentColor" fill-rule="evenodd" d="M20 21.25h2a.75.75 0 0 1 0 1.5H2a.75.75 0 0 1 0-1.5h2V12.5c.744 0 1.433-.232 2-.627a3.5 3.5 0 0 0 2 .627c.744 0 1.433-.232 2-.627a3.5 3.5 0 0 0 2 .627c.744 0 1.433-.232 2-.627a3.5 3.5 0 0 0 2 .627c.744 0 1.433-.232 2-.627a3.5 3.5 0 0 0 2 .627zm-10.5 0h5V18.5c0-.935 0-1.402-.201-1.75a1.5 1.5 0 0 0-.549-.55c-.348-.2-.815-.2-1.75-.2s-1.402 0-1.75.2a1.5 1.5 0 0 0-.549.55c-.201.348-.201.815-.201 1.75z" clip-rule="evenodd"/></svg></span>بازارگاه آنلاین</span>
      <span class="chip"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 22c5.523 0 10-4.477 10-10c0-.463-.694-.54-.933-.143a6.5 6.5 0 1 1-8.924-8.924C12.54 2.693 12.463 2 12 2C6.477 2 2 6.477 2 12s4.477 10 10 10"/></svg></span>روشن و تیره</span>
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
    <span class="eyebrow"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M11.248 2A10.03 10.03 0 0 0 2 11.248h2.98a.752.752 0 1 1 0 1.504H2A10.03 10.03 0 0 0 11.248 22v-2.98a.752.752 0 0 1 1.504 0V22A10.03 10.03 0 0 0 22 12.752h-2.98a.752.752 0 0 1 0-1.504H22A10.03 10.03 0 0 0 12.752 2v2.98a.752.752 0 1 1-1.504 0zM9.242 12c0-.415.337-.752.752-.752h1.254V9.994a.752.752 0 1 1 1.504 0v1.254h1.254a.752.752 0 0 1 0 1.504h-1.254v1.254a.752.752 0 0 1-1.504 0v-1.254H9.994A.75.75 0 0 1 9.242 12" clip-rule="evenodd"/></svg></span>چالش و رویکرد</span>
    <h2 class="t">یک پنل که به‌جای شلوغی، آرامش بدهد</h2>
    <p class="lead">فروشنده‌ی ایرانی هر روز ده‌ها سفارش و دایرکت را میان چند اپ جابه‌جا می‌کند. هدف، یک‌کاسه‌کردن همه‌چیز در فضایی بود که هم حرفه‌ای باشد و هم دوست‌داشتنی.</p>
    <div class="two">
      <div class="card pcard">
        <div class="ic"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3c-2.31 0-3.77 2.587-6.688 7.762l-.364.644c-2.425 4.3-3.638 6.45-2.542 8.022S6.214 21 11.636 21h.728c5.422 0 8.134 0 9.23-1.572s-.117-3.722-2.542-8.022l-.364-.645C15.77 5.587 14.311 3 12 3" opacity=".5"/><path fill="currentColor" d="M12 7.25a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75M12 17a1 1 0 1 0 0-2a1 1 0 0 0 0 2"/></svg></span></div>
        <h3>چالش</h3>
        <p>تجربه‌ای پراکنده میان دایرکت، اکسل و پیام‌رسان‌ها؛ نبود زبان بصری یکپارچه، و کم‌توجهی به راست‌چینی و تایپ فارسی در ابزارهای موجود.</p>
      </div>
      <div class="card pcard">
        <div class="ic"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M3.845 3.845a2.883 2.883 0 0 0 0 4.077L5.432 9.51c.012-.014.555.503.568.49l4-4c.013-.013-.504-.556-.49-.568L7.922 3.845a2.883 2.883 0 0 0-4.077 0m1.288 11.462a.483.483 0 0 1 .9 0l.157.4a.48.48 0 0 0 .272.273l.398.157a.486.486 0 0 1 0 .903l-.398.158a.48.48 0 0 0-.272.273l-.157.4a.483.483 0 0 1-.9 0l-.157-.4a.48.48 0 0 0-.272-.273l-.398-.158a.486.486 0 0 1 0-.903l.398-.157a.48.48 0 0 0 .272-.274z" opacity=".5"/><path fill="currentColor" d="M19.967 9.13a.483.483 0 0 1 .9 0l.156.399c.05.125.148.224.273.273l.398.158a.486.486 0 0 1 0 .902l-.398.158a.5.5 0 0 0-.273.273l-.156.4a.483.483 0 0 1-.9 0l-.157-.4a.5.5 0 0 0-.272-.273l-.398-.158a.486.486 0 0 1 0-.902l.398-.158a.5.5 0 0 0 .272-.273z" opacity=".2"/><path fill="currentColor" d="M16.1 2.307a.483.483 0 0 1 .9 0l.43 1.095a.48.48 0 0 0 .272.274l1.091.432a.486.486 0 0 1 0 .903l-1.09.432a.5.5 0 0 0-.273.273L17 6.81a.483.483 0 0 1-.9 0l-.43-1.095a.5.5 0 0 0-.273-.273l-1.09-.432a.486.486 0 0 1 0-.903l1.09-.432a.5.5 0 0 0 .273-.274z" opacity=".7"/><path fill="currentColor" d="M10.568 6.49c-.012.014-.555-.503-.568-.49l-4 4c-.013.013.504.556.49.568l9.588 9.587a2.883 2.883 0 1 0 4.078-4.077z"/></svg></span></div>
        <h3>رویکرد</h3>
        <p>یک سیستم توکن‌محور با گردی سخاوتمندانه، سایه‌های نرم، یک ایزِ نرم و یکدست، و تایپ Estedad — ساخته‌شده از پایه برای فارسی و راست‌چین.</p>
      </div>
    </div>
  </div>
</section>

<!-- Personas -->
<section>
  <div class="wrap">
    <span class="eyebrow"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 7.5a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0m2.5 9c0 1.933-2.686 3.5-6 3.5s-6-1.567-6-3.5S8.686 13 12 13s6 1.567 6 3.5M7.122 5q.267 0 .518.05A5 5 0 0 0 7 7.5c0 .868.221 1.685.61 2.396q-.237.045-.488.045c-1.414 0-2.561-1.106-2.561-2.47S5.708 5 7.122 5M5.447 18.986C4.88 18.307 4.5 17.474 4.5 16.5c0-.944.357-1.756.896-2.423C3.49 14.225 2 15.267 2 16.529c0 1.275 1.517 2.325 3.447 2.457M17 7.5c0 .868-.221 1.685-.61 2.396q.236.045.488.045c1.414 0 2.56-1.106 2.56-2.47S18.293 5 16.879 5q-.267 0-.518.05c.407.724.64 1.56.64 2.45m1.552 11.486c1.93-.132 3.447-1.182 3.447-2.457c0-1.263-1.491-2.304-3.396-2.452c.54.667.896 1.479.896 2.423c0 .974-.38 1.807-.947 2.486"/></svg></span>کاربران</span>
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
            <li><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10m-5.97-3.03a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06l1.47 1.47l2.235-2.235L14.97 8.97a.75.75 0 0 1 1.06 0" clip-rule="evenodd"/></svg></span>پاسخ خودکار به دایرکت‌های اینستاگرام</li>
            <li><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10m-5.97-3.03a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06l1.47 1.47l2.235-2.235L14.97 8.97a.75.75 0 0 1 1.06 0" clip-rule="evenodd"/></svg></span>مدیریت سفارش، انبار و پرداخت در یک پنل</li>
            <li><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10m-5.97-3.03a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06l1.47 1.47l2.235-2.235L14.97 8.97a.75.75 0 0 1 1.06 0" clip-rule="evenodd"/></svg></span>گزارش فروش و سود زنده</li>
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
            <li><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10m-5.97-3.03a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06l1.47 1.47l2.235-2.235L14.97 8.97a.75.75 0 0 1 1.06 0" clip-rule="evenodd"/></svg></span>پیگیری سفارش و خرید دوباره</li>
            <li><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10m-5.97-3.03a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06l1.47 1.47l2.235-2.235L14.97 8.97a.75.75 0 0 1 1.06 0" clip-rule="evenodd"/></svg></span>علاقه‌مندی و فروشگاه‌های دنبال‌شده</li>
            <li><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10m-5.97-3.03a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06l1.47 1.47l2.235-2.235L14.97 8.97a.75.75 0 0 1 1.06 0" clip-rule="evenodd"/></svg></span>تبدیل حساب به فروشگاه</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Process -->
<section>
  <div class="wrap">
    <span class="eyebrow"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M18.5 14c-1.933 0-3.5 1.458-3.5 3.257c0 1.785 1.117 3.868 2.86 4.613c.406.173.874.173 1.28 0c1.743-.745 2.86-2.828 2.86-4.613C22 15.458 20.433 14 18.5 14m0 4.5a1 1 0 1 0 0-2a1 1 0 0 0 0 2M5.5 2C3.567 2 2 3.458 2 5.257C2 7.042 3.117 9.125 4.86 9.87c.406.173.874.173 1.28 0C7.883 9.125 9 7.042 9 5.257C9 3.458 7.433 2 5.5 2m0 4.5a1 1 0 1 0 0-2a1 1 0 0 0 0 2M11.25 5a.75.75 0 0 1 .75-.75h4.132c2.751 0 3.797 3.593 1.476 5.07l-10.41 6.625c-1.056.672-.58 2.305.67 2.305h2.321l-.22-.22a.75.75 0 1 1 1.061-1.06l1.5 1.5a.75.75 0 0 1 0 1.06l-1.5 1.5a.75.75 0 1 1-1.06-1.06l.22-.22H7.867c-2.751 0-3.797-3.593-1.476-5.07l10.411-6.625c1.055-.672.58-2.305-.671-2.305H12a.75.75 0 0 1-.75-.75" clip-rule="evenodd"/></svg></span>جریان کار</span>
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
    <span class="eyebrow"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M21.194 2.806a2.753 2.753 0 0 1 0 3.893l-.496.496a5 5 0 0 1-.533-.151a5.2 5.2 0 0 1-1.968-1.241a5.2 5.2 0 0 1-1.241-1.968a5 5 0 0 1-.15-.533l.495-.496a2.753 2.753 0 0 1 3.893 0M14.58 13.313c-.404.404-.606.606-.829.78a4.6 4.6 0 0 1-.848.524c-.255.121-.526.211-1.068.392l-2.858.953a.742.742 0 0 1-.939-.94l.953-2.857c.18-.542.27-.813.392-1.068q.217-.453.524-.848c.174-.223.376-.425.78-.83l4.916-4.915a6.7 6.7 0 0 0 1.533 2.36a6.7 6.7 0 0 0 2.36 1.533z"/><path fill="currentColor" d="M20.536 20.536C22 19.07 22 16.714 22 12c0-1.548 0-2.842-.052-3.934l-6.362 6.362c-.351.352-.615.616-.912.847a6 6 0 0 1-1.125.696c-.34.162-.694.28-1.166.437l-2.932.977a2.242 2.242 0 0 1-2.836-2.836l.977-2.932c.157-.472.275-.826.437-1.166q.287-.6.696-1.125c.231-.297.495-.56.847-.912l6.362-6.362C14.842 2 13.548 2 12 2C7.286 2 4.929 2 3.464 3.464C2 4.93 2 7.286 2 12s0 7.071 1.464 8.535C4.93 22 7.286 22 12 22s7.071 0 8.535-1.465"/></svg></span>وایرفریم و معماری</span>
    <h2 class="t">از اسکلت ساده تا رابط نهایی</h2>
    <p class="lead">پیش از رنگ و جزئیات، ساختار هر صفحه با وایرفریم‌های کم‌جزئیات چیده شد: نوار کناری جدا، نوار بالا و شبکه‌ی کارت‌ها.</p>
    <div class="wf-wrap">
      <div class="wf">
        <div class="wf__cap"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" d="M13.5 15.5c0-1.886 0-2.828.586-3.414s1.528-.586 3.414-.586s2.828 0 3.414.586s.586 1.528.586 3.414v2c0 1.886 0 2.828-.586 3.414s-1.528.586-3.414.586s-2.828 0-3.414-.586s-.586-1.528-.586-3.414zM2 8.5c0 1.886 0 2.828.586 3.414S4.114 12.5 6 12.5s2.828 0 3.414-.586S10 10.386 10 8.5v-2c0-1.886 0-2.828-.586-3.414S7.886 2.5 6 2.5s-2.828 0-3.414.586S2 4.614 2 6.5zm11.5-3c0-.932 0-1.398.152-1.765a2 2 0 0 1 1.083-1.083c.367-.152.833-.152 1.765-.152h2c.932 0 1.398 0 1.765.152a2 2 0 0 1 1.083 1.083c.152.367.152.833.152 1.765s0 1.398-.152 1.765a2 2 0 0 1-1.083 1.083c-.367.152-.833.152-1.765.152h-2c-.932 0-1.398 0-1.765-.152a2 2 0 0 1-1.083-1.083C13.5 6.898 13.5 6.432 13.5 5.5ZM2 18.5c0 .932 0 1.398.152 1.765a2 2 0 0 0 1.083 1.083c.367.152.833.152 1.765.152h2c.932 0 1.398 0 1.765-.152a2 2 0 0 0 1.083-1.083C10 19.898 10 19.432 10 18.5s0-1.398-.152-1.765a2 2 0 0 0-1.083-1.083C8.398 15.5 7.932 15.5 7 15.5H5c-.932 0-1.398 0-1.765.152a2 2 0 0 0-1.083 1.083C2 17.102 2 17.568 2 18.5Z"/></svg></span>وایرفریم پیشخوان فروشگاه</div>
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
        <div class="wf__cap"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="9" r="3"/><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" d="M17.97 20c-.16-2.892-1.045-5-5.97-5s-5.81 2.108-5.97 5"/></g></svg></span>وایرفریم حساب خریدار</div>
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
    <span class="eyebrow"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="m21.838 11.126l-.229 2.436c-.378 4.012-.567 6.019-1.75 7.228C18.678 22 16.906 22 13.36 22h-2.72c-3.545 0-5.317 0-6.5-1.21s-1.371-3.216-1.749-7.228l-.23-2.436c-.18-1.912-.27-2.869.058-3.264a1 1 0 0 1 .675-.367c.476-.042 1.073.638 2.268 1.998c.618.704.927 1.055 1.271 1.11a.92.92 0 0 0 .562-.09c.319-.16.53-.595.955-1.464l2.237-4.584C10.989 2.822 11.39 2 12 2s1.011.822 1.813 2.465l2.237 4.584c.424.87.636 1.304.955 1.464c.176.089.37.12.562.09c.344-.055.653-.406 1.271-1.11c1.195-1.36 1.792-2.04 2.268-1.998a1 1 0 0 1 .675.367c.327.395.237 1.352.057 3.264M12.952 12.7l-.098-.176c-.38-.682-.57-1.023-.854-1.023s-.474.341-.854 1.023l-.098.176c-.108.194-.162.29-.246.354c-.085.064-.19.088-.4.136l-.19.043c-.738.167-1.107.25-1.195.533c-.088.282.164.576.667 1.164l.13.152c.143.168.215.251.247.354c.032.104.021.215 0 .438l-.02.204c-.076.784-.114 1.177.115 1.351c.23.175.576.016 1.267-.303l.178-.082c.197-.09.295-.135.399-.135s.202.045.399.135l.178.082c.691.319 1.037.478 1.267.303c.23-.174.191-.567.115-1.352l-.02-.203c-.021-.223-.032-.334 0-.437c.032-.104.104-.187.247-.355l.13-.152c.503-.588.755-.882.667-1.165c-.088-.282-.457-.365-1.195-.532l-.19-.043c-.21-.048-.315-.072-.4-.136c-.084-.063-.138-.16-.246-.354" clip-rule="evenodd"/></svg></span>هویت بصری</span>
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
    <span class="eyebrow"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M10.847 21.934C5.867 21.362 2 17.133 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.157-3.283 4.733-6.086 4.37c-1.618-.209-3.075-.397-3.652.518c-.395.626.032 1.406.555 1.929a1.673 1.673 0 0 1 0 2.366c-.523.523-1.235.836-1.97.751M11.085 7a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0M6.5 13a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m11 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m-3-4.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3" clip-rule="evenodd"/></svg></span>رنگ</span>
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
    <span class="eyebrow"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none"><path fill="currentColor" fill-rule="evenodd" d="M7.934 2h8.132c.886 0 1.65 0 2.262.082c.655.088 1.284.287 1.793.797c.51.51.709 1.138.797 1.793C21 5.284 21 6.048 21 6.934V7.95a1 1 0 1 1-2 0V7c0-.971-.002-1.599-.064-2.061c-.059-.434-.153-.57-.229-.646s-.212-.17-.646-.229C17.6 4.002 16.971 4 16 4h-3v17a1 1 0 1 1-2 0V4H8c-.971 0-1.599.002-2.061.064c-.434.059-.57.153-.646.229s-.17.212-.229.646C5.002 5.4 5 6.029 5 7v.95a1 1 0 1 1-2 0V6.934c0-.886 0-1.65.082-2.262c.088-.655.287-1.284.797-1.793c.51-.51 1.138-.709 1.793-.797C6.284 2 7.048 2 7.934 2" clip-rule="evenodd"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10"/></g></svg></span>تایپوگرافی</span>
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
    <span class="eyebrow"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M13 15.4c0-2.074 0-3.111.659-3.756S15.379 11 17.5 11s3.182 0 3.841.644C22 12.29 22 13.326 22 15.4v2.2c0 2.074 0 3.111-.659 3.756S19.621 22 17.5 22s-3.182 0-3.841-.644C13 20.71 13 19.674 13 17.6zM2 8.6c0 2.074 0 3.111.659 3.756S4.379 13 6.5 13s3.182 0 3.841-.644C11 11.71 11 10.674 11 8.6V6.4c0-2.074 0-3.111-.659-3.756S8.621 2 6.5 2s-3.182 0-3.841.644C2 3.29 2 4.326 2 6.4zm11-3.1c0-1.087 0-1.63.171-2.06a2.3 2.3 0 0 1 1.218-1.262C14.802 2 15.327 2 16.375 2h2.25c1.048 0 1.573 0 1.986.178c.551.236.99.69 1.218 1.262c.171.43.171.973.171 2.06s0 1.63-.171 2.06a2.3 2.3 0 0 1-1.218 1.262C20.198 9 19.673 9 18.625 9h-2.25c-1.048 0-1.573 0-1.986-.178a2.3 2.3 0 0 1-1.218-1.262C13 7.13 13 6.587 13 5.5m-11 13c0 1.087 0 1.63.171 2.06a2.3 2.3 0 0 0 1.218 1.262c.413.178.938.178 1.986.178h2.25c1.048 0 1.573 0 1.986-.178c.551-.236.99-.69 1.218-1.262c.171-.43.171-.973.171-2.06s0-1.63-.171-2.06a2.3 2.3 0 0 0-1.218-1.262C9.198 15 8.673 15 7.625 15h-2.25c-1.048 0-1.573 0-1.986.178c-.551.236-.99.69-1.218 1.262C2 16.87 2 17.413 2 18.5"/></svg></span>اجزای رابط</span>
    <h2 class="t">کتابخانه‌ای از اجزای هماهنگ</h2>
    <p class="lead">دکمه‌ها، نشان‌های وضعیت، فیلدها و کارت‌ها — همه از روی توکن‌ها ساخته شده‌اند تا در همه‌جا یکدست بمانند.</p>
    <div class="card comp">
      <div class="row"><span class="rl">دکمه‌ها</span>
        <button class="pm-btn pm-btn--primary pm-btn--md">افزودن محصول</button>
        <button class="pm-btn pm-btn--gold pm-btn--md"><span>ارتقا</span><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 18L6 6m0 0h9M6 6v9"/></svg></span></button>
        <button class="pm-btn pm-btn--secondary pm-btn--md">انصراف</button>
        <button class="pm-btn pm-btn--ghost pm-btn--md">حذف</button>
      </div>
      <div class="row"><span class="rl">نشان‌های وضعیت</span>
        <span class="pm-badge pm-badge--success"><span class="pm-badge__dot"></span>پرداخت‌شده</span>
        <span class="pm-badge pm-badge--warning"><span class="pm-badge__dot"></span>آماده‌سازی</span>
        <span class="pm-badge pm-badge--info"><span class="pm-badge__dot"></span>ارسال‌شده</span>
        <span class="pm-badge pm-badge--danger"><span class="pm-badge__dot"></span>ناموفق</span>
        <span class="pm-badge pm-badge--gold"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m21.609 13.562l.23-2.436c.18-1.912.27-2.869-.058-3.264a1 1 0 0 0-.675-.367c-.476-.042-1.073.638-2.268 1.998c-.618.704-.927 1.055-1.271 1.11a.92.92 0 0 1-.562-.09c-.319-.16-.53-.595-.955-1.464l-2.237-4.584C13.011 2.822 12.61 2 12 2s-1.011.822-1.813 2.465L7.95 9.049c-.424.87-.636 1.304-.955 1.464a.93.93 0 0 1-.562.09c-.344-.055-.653-.406-1.271-1.11c-1.195-1.36-1.792-2.04-2.268-1.998a1 1 0 0 0-.675.367c-.327.395-.237 1.352-.057 3.264l.229 2.436c.378 4.012.566 6.019 1.75 7.228C5.322 22 7.094 22 10.64 22h2.719c3.545 0 5.317 0 6.5-1.21s1.371-3.216 1.749-7.228"/></svg></span>ویژه</span>
      </div>
      <div class="row"><span class="rl">فیلد و آواتار</span>
        <div class="pm-inputwrap" style="max-width:280px;flex:1"><span class="pm-inputwrap__icon"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11.5" cy="11.5" r="9.5"/><path stroke-linecap="round" d="M18.5 18.5L22 22"/></g></svg></span></span><input class="pm-input" placeholder="جست‌وجوی سفارش…" /></div>
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
    <span class="eyebrow"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M14 2h-4C6.229 2 4.343 2 3.172 3.172S2 6.229 2 10v1q-.002.827.007 1.5h10.595c.103-.68.336-1.387.923-1.975c.618-.618 1.37-.843 2.08-.938c.646-.087 1.44-.087 2.305-.087h.18c.865 0 1.659 0 2.304.087c.538.072 1.098.218 1.606.551V10c0-3.771 0-5.657-1.172-6.828S17.771 2 14 2M2.879 16.121C3.757 17 5.172 17 8 17h3.25v4H8a.75.75 0 0 0 0 1.5h5.55l-.025-.025c-.618-.618-.843-1.37-.938-2.08c-.087-.646-.087-1.44-.087-2.305v-3.18c0-.498 0-.973.017-1.41H2.038c.07 1.258.271 2.052.84 2.621"/><path fill="currentColor" fill-rule="evenodd" d="M22 15v3c0 1.886 0 2.828-.586 3.414S19.886 22 18 22s-2.828 0-3.414-.586S14 19.886 14 18v-3c0-1.886 0-2.828.586-3.414S16.114 11 18 11s2.828 0 3.414.586S22 13.114 22 15m-5.75 5a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1-.75-.75" clip-rule="evenodd"/></svg></span>محصول</span>
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
    <span class="eyebrow"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M16.528 2H7.472c-1.203 0-1.804 0-2.288.299c-.483.298-.752.836-1.29 1.912L2.491 7.76c-.325.82-.608 1.786-.062 2.479A2 2 0 0 0 6 9a2 2 0 1 0 4 0a2 2 0 1 0 4 0a2 2 0 1 0 4 0a2 2 0 0 0 3.571 1.238c.546-.693.262-1.659-.062-2.479l-1.404-3.548c-.538-1.076-.806-1.614-1.29-1.912C18.332 2 17.73 2 16.528 2"/><path fill="currentColor" fill-rule="evenodd" d="M20 21.25h2a.75.75 0 0 1 0 1.5H2a.75.75 0 0 1 0-1.5h2V12.5c.744 0 1.433-.232 2-.627a3.5 3.5 0 0 0 2 .627c.744 0 1.433-.232 2-.627a3.5 3.5 0 0 0 2 .627c.744 0 1.433-.232 2-.627a3.5 3.5 0 0 0 2 .627c.744 0 1.433-.232 2-.627a3.5 3.5 0 0 0 2 .627zm-10.5 0h5V18.5c0-.935 0-1.402-.201-1.75a1.5 1.5 0 0 0-.549-.55c-.348-.2-.815-.2-1.75-.2s-1.402 0-1.75.2a1.5 1.5 0 0 0-.549.55c-.201.348-.201.815-.201 1.75z" clip-rule="evenodd"/></svg></span>تجربه‌ی خریدار · بازارگاه</span>
    <h2 class="t">دنبال یک فروشگاه می‌گردی؟ راحت پیدایش کن</h2>
    <p class="lead">خیلی از کاربران پرومال خریدارند؛ دنبال یک فروشگاه خاص یا یک محصول می‌گردند. هر فروشگاه ویترین گرم خودش را روی promall.io دارد — ساده، بی‌نیاز از ورود، و آماده‌ی خرید.</p>
    <div class="store">
      <div class="store__cover"></div>
      <div class="store__head">
        <span class="store__av">ت</span>
        <div class="store__meta">
          <div class="store__nm">بوتیک ترمه</div>
          <div class="store__sub">
            <span><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" d="M9.536 3.91c0-1.055.95-1.91 2.124-1.91c1.173 0 2.124.855 2.124 1.91c0 .495-.18.947-.492 1.287c-.597.65-1.49 1.305-1.49 2.148v.285m0 0a3.66 3.66 0 0 1 2.082.61l7.433 5.01c1.306.882.613 2.75-1.02 2.75H18m-6.198-8.37a3.64 3.64 0 0 0-2.051.649L2.655 13.27C1.383 14.165 2.087 16 3.703 16H6"/><path d="M6 18c0-1.886 0-2.828.586-3.414S8.114 14 10 14h4c1.886 0 2.828 0 3.414.586S18 16.114 18 18s0 2.828-.586 3.414S15.886 22 14 22h-4c-1.886 0-2.828 0-3.414-.586S6 19.886 6 18Z"/></g></svg></span>پوشاک زنانه</span>
            <span><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 10.143C4 5.646 7.582 2 12 2s8 3.646 8 8.143c0 4.462-2.553 9.67-6.537 11.531a3.45 3.45 0 0 1-2.926 0C6.553 19.812 4 14.606 4 10.144Z"/><circle cx="12" cy="10" r="3"/></g></svg></span>تهران</span>
            <span><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="6" r="4"/><path stroke-linecap="round" d="M15 9a3 3 0 1 0 0-6"/><ellipse cx="9" cy="17" rx="7" ry="4"/><path stroke-linecap="round" d="M18 14c1.754.385 3 1.359 3 2.5c0 1.03-1.014 1.923-2.5 2.37"/></g></svg></span>۳٬۲۴۰ دنبال‌کننده</span>
            <span><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M9.153 5.408C10.42 3.136 11.053 2 12 2s1.58 1.136 2.847 3.408l.328.588c.36.646.54.969.82 1.182s.63.292 1.33.45l.636.144c2.46.557 3.689.835 3.982 1.776c.292.94-.546 1.921-2.223 3.882l-.434.507c-.476.557-.715.836-.822 1.18c-.107.345-.071.717.001 1.46l.066.677c.253 2.617.38 3.925-.386 4.506s-1.918.051-4.22-1.009l-.597-.274c-.654-.302-.981-.452-1.328-.452s-.674.15-1.328.452l-.596.274c-2.303 1.06-3.455 1.59-4.22 1.01c-.767-.582-.64-1.89-.387-4.507l.066-.676c.072-.744.108-1.116 0-1.46c-.106-.345-.345-.624-.821-1.18l-.434-.508c-1.677-1.96-2.515-2.941-2.223-3.882S3.58 8.328 6.04 7.772l.636-.144c.699-.158 1.048-.237 1.329-.45s.46-.536.82-1.182z"/></svg></span>۴٫۸ از ۵</span>
          </div>
        </div>
        <button class="pm-btn pm-btn--primary pm-btn--md"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m8.962 18.91l.464-.588zM12 5.5l-.54.52a.75.75 0 0 0 1.08 0zm3.038 13.41l.465.59zm-5.612-.588C7.91 17.127 6.253 15.96 4.938 14.48C3.65 13.028 2.75 11.335 2.75 9.137h-1.5c0 2.666 1.11 4.7 2.567 6.339c1.43 1.61 3.254 2.9 4.68 4.024zM2.75 9.137c0-2.15 1.215-3.954 2.874-4.713c1.612-.737 3.778-.541 5.836 1.597l1.08-1.04C10.1 2.444 7.264 2.025 5 3.06C2.786 4.073 1.25 6.425 1.25 9.137zM8.497 19.5c.513.404 1.063.834 1.62 1.16s1.193.59 1.883.59v-1.5c-.31 0-.674-.12-1.126-.385c-.453-.264-.922-.628-1.448-1.043zm7.006 0c1.426-1.125 3.25-2.413 4.68-4.024c1.457-1.64 2.567-3.673 2.567-6.339h-1.5c0 2.198-.9 3.891-2.188 5.343c-1.315 1.48-2.972 2.647-4.488 3.842zM22.75 9.137c0-2.712-1.535-5.064-3.75-6.077c-2.264-1.035-5.098-.616-7.54 1.92l1.08 1.04c2.058-2.137 4.224-2.333 5.836-1.596c1.659.759 2.874 2.562 2.874 4.713zm-8.176 9.185c-.526.415-.995.779-1.448 1.043s-.816.385-1.126.385v1.5c.69 0 1.326-.265 1.883-.59c.558-.326 1.107-.756 1.62-1.16z"/></svg></span><span>دنبال‌کردن</span></button>
      </div>
      <div class="store__body">
        <div class="store__search"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11.5" cy="11.5" r="9.5"/><path stroke-linecap="round" d="M18.5 18.5L22 22"/></g></svg></span><input placeholder="جست‌وجو در این فروشگاه…" /></div>
        <div class="store__grid">
          <div class="pc"><div class="pc__img" style="background:#415a77"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M10.286 3.91c0-.568.538-1.16 1.374-1.16s1.374.592 1.374 1.16c0 .311-.112.581-.294.78a11 11 0 0 1-.38.385l-.08.08a9 9 0 0 0-.529.558c-.265.312-.553.723-.658 1.23a4.3 4.3 0 0 0-1.774.722l-7.095 4.992c-.927.652-1.166 1.702-.828 2.582c.332.866 1.194 1.511 2.306 1.511H6.01C6 17.113 6 17.527 6 18c0 1.886 0 2.828.587 3.414C7.17 22 8.114 22 10 22h4c1.885 0 2.828 0 3.414-.586S18 19.886 18 18c0-.473 0-.887-.01-1.25h2.307c1.125 0 1.99-.657 2.316-1.533c.33-.891.073-1.948-.877-2.588l-7.433-5.01a4.3 4.3 0 0 0-1.614-.66q.075-.121.205-.274c.126-.149.274-.298.44-.464l.075-.072c.14-.14.295-.292.435-.445c.443-.48.69-1.115.69-1.795c0-1.542-1.364-2.659-2.874-2.659S8.786 2.367 8.786 3.91a.75.75 0 0 0 1.5 0m7.521 11.34h2.49c.509 0 .806-.277.91-.555c.097-.264.047-.582-.31-.822l-7.432-5.01a2.9 2.9 0 0 0-1.655-.483a2.9 2.9 0 0 0-1.628.512l-7.095 4.991c-.346.243-.391.558-.29.819c.105.275.403.548.905.548h2.49c.087-.267.212-.483.394-.664C7.17 14 8.114 14 10 14h4c1.885 0 2.828 0 3.414.586c.181.181.307.397.393.664" clip-rule="evenodd"/></svg></span></div><div class="pc__b"><div class="pc__nm">مانتو نخی کرم</div><div class="pc__pr">۱٬۲۸۰٬۰۰۰ تومان</div></div></div>
          <div class="pc"><div class="pc__img" style="background:#1b263b"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5.777 10.296v7.969c0 1.323 0 1.985.449 2.547c.448.562.985.66 2.058.858c.992.182 2.249.33 3.716.33s2.724-.148 3.716-.33c1.073-.198 1.61-.296 2.059-.858c.448-.562.448-1.224.448-2.547v-7.97c0-.683 0-1.025.132-1.326c.131-.3.378-.523.871-.968l.186-.167c1.056-.952 1.584-1.429 1.588-2.118c.004-.69-.465-1.122-1.401-1.988a8 8 0 0 0-.418-.362c-.472-.378-1.138-.792-1.648-1.09a2.05 2.05 0 0 0-1.567-.205l-.49.129a1.6 1.6 0 0 0-.949.703c-1.202 1.897-3.852 1.897-5.054 0a1.6 1.6 0 0 0-.948-.703l-.49-.129a2.05 2.05 0 0 0-1.568.205c-.51.298-1.176.712-1.648 1.09a8 8 0 0 0-.418.362C3.464 4.594 2.996 5.027 3 5.716s.532 1.166 1.588 2.118l.186.167c.493.445.74.668.871.968c.132.3.132.643.132 1.327"/></svg></span></div><div class="pc__b"><div class="pc__nm">شومیز ساتن مشکی</div><div class="pc__pr">۸۹۰٬۰۰۰ تومان</div></div></div>
          <div class="pc"><div class="pc__img" style="background:#c4b894"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M8.25 7.013V6a3.75 3.75 0 1 1 7.5 0v1.013c1.297.037 2.087.17 2.692.667c.83.68 1.06 1.834 1.523 4.143l.6 3c.664 3.32.996 4.98.096 6.079S18.067 22 14.68 22H9.32c-3.386 0-5.08 0-5.98-1.098s-.568-2.758.096-6.079l.6-3c.462-2.309.693-3.463 1.522-4.143c.606-.496 1.396-.63 2.693-.667M9.75 6a2.25 2.25 0 0 1 4.5 0v1h-4.5zM15 11a1 1 0 1 0 0-2a1 1 0 0 0 0 2m-5-1a1 1 0 1 1-2 0a1 1 0 0 1 2 0" clip-rule="evenodd"/></svg></span></div><div class="pc__b"><div class="pc__nm">روسری ابریشمی</div><div class="pc__pr">۴۲۰٬۰۰۰ تومان</div></div></div>
          <div class="pc"><div class="pc__img" style="background:#778da9"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M11.66 5.75c-.836 0-1.374.592-1.374 1.16a.75.75 0 0 1-1.5 0c0-1.543 1.364-2.66 2.874-2.66s2.874 1.117 2.874 2.66c0 .68-.248 1.314-.69 1.794c-.14.153-.294.305-.435.445l-.074.072a8 8 0 0 0-.441.464a2.4 2.4 0 0 0-.205.274a4.3 4.3 0 0 1 1.614.66l7.433 5.01c.95.64 1.207 1.697.877 2.588c-.325.876-1.191 1.533-2.316 1.533H3.702c-1.112 0-1.974-.645-2.306-1.51c-.338-.88-.1-1.931.828-2.583l7.095-4.992a4.3 4.3 0 0 1 1.774-.722c.105-.507.393-.918.658-1.23c.172-.202.36-.391.529-.558l.08-.08c.143-.14.267-.263.38-.386c.182-.198.294-.468.294-.78c0-.567-.538-1.159-1.374-1.159m1.805 6.112a2.9 2.9 0 0 0-1.655-.482a2.9 2.9 0 0 0-1.628.512l-7.095 4.991c-.346.243-.391.558-.29.819c.105.275.403.548.905.548h16.595c.509 0 .806-.277.91-.555c.097-.264.047-.582-.31-.822z" clip-rule="evenodd"/></svg></span></div><div class="pc__b"><div class="pc__nm">پیراهن ابریشمی</div><div class="pc__pr">۱٬۴۵۰٬۰۰۰ تومان</div></div></div>
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
    <span class="eyebrow"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M9.153 5.408C10.42 3.136 11.053 2 12 2s1.58 1.136 2.847 3.408l.328.588c.36.646.54.969.82 1.182s.63.292 1.33.45l.636.144c2.46.557 3.689.835 3.982 1.776c.292.94-.546 1.921-2.223 3.882l-.434.507c-.476.557-.715.836-.822 1.18c-.107.345-.071.717.001 1.46l.066.677c.253 2.617.38 3.925-.386 4.506s-1.918.051-4.22-1.009l-.597-.274c-.654-.302-.981-.452-1.328-.452s-.674.15-1.328.452l-.596.274c-2.303 1.06-3.455 1.59-4.22 1.01c-.767-.582-.64-1.89-.387-4.507l.066-.676c.072-.744.108-1.116 0-1.46c-.106-.345-.345-.624-.821-1.18l-.434-.508c-1.677-1.96-2.515-2.941-2.223-3.882S3.58 8.328 6.04 7.772l.636-.144c.699-.158 1.048-.237 1.329-.45s.46-.536.82-1.182z"/></svg></span>اصول طراحی</span>
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
    </>
  );
}
