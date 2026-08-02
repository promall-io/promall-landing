import type { Article } from '@/types/blog';

const CTA_TITLE = 'Hand your online shop to ProMall';
const CTA_DESCRIPTION =
  'See a free demo built on your own products. Setup takes under ten minutes and the first 10 days are free.';
const CTA_LABEL = 'Get a free demo';
const TOC_LABEL = 'What you will read';
const FAQ_LABEL = 'Frequently asked questions';

export const EN_ARTICLES: Article[] = [
  {
    slug: 'modiriat-online-shop',
    title: 'Online shop management: the complete guide from first order to inventory',
    metaTitle: 'Online Shop Management: The Complete Guide',
    description:
      'What online shop management actually covers, the daily routine, how to choose an online shop management panel, and how to keep orders, inventory, DMs and sales reports in one place.',
    excerpt:
      'Orders, invoices, inventory, DMs and sales reports — everything running an online shop actually takes.',
    keywords: [
      'online shop management',
      'online shop management panel',
      'ecommerce management software',
      'instagram shop management',
      'inventory management',
      'sales reporting',
    ],
    category: 'Complete guide',
    displayDate: 'July 31, 2026',
    publishedIso: '2026-07-31',
    modifiedIso: '2026-07-31',
    image: '/blog/post-1.jpg',
    imageAlt: 'ProMall online shop management panel showing orders, products, stock and sales',
    tocLabel: TOC_LABEL,
    faqLabel: FAQ_LABEL,
    blocks: [
      {
        kind: 'paragraph',
        text: 'Starting an online shop is easy. Running one is not. The hard part is the moment three people ask for prices at once, someone wants a tracking code, and you genuinely do not know whether the cream coat in size 38 is still in stock.',
      },
      { kind: 'heading', id: 'what-is', text: 'What online shop management means' },
      {
        kind: 'paragraph',
        text: 'It means everything between "a customer messages you" and "the money landed and the parcel shipped" is repeatable instead of improvised. In practice that is five pillars: products and inventory, orders and invoices, customer conversations, shipping and tracking, and reporting.',
      },
      {
        kind: 'paragraph',
        text: 'If those five live in five different places — a notebook, a spreadsheet, your DMs and your memory — you do not have management. You have firefighting.',
      },
      { kind: 'heading', id: 'daily-jobs', text: 'The daily routine' },
      {
        kind: 'steps',
        items: [
          'Clear unanswered DMs and comments — response speed maps directly to revenue.',
          'Check stock on your best sellers and reorder anything below its alert threshold.',
          'Follow up unpaid orders; most abandoned carts come back with one message.',
          'Finalize today invoices and hand the parcels to the courier.',
          'Send tracking codes — one message that removes half of tomorrow follow-ups.',
          'Personally handle unhappy customers and unanswered questions.',
          'Look at revenue, order count and top product before you close the day.',
        ],
      },
      { kind: 'heading', id: 'inventory', text: 'Products and inventory' },
      {
        kind: 'paragraph',
        text: 'Inventory is the heart of it. Every answer you give a customer — price, size, colour, availability — should be read from one source, never from memory.',
      },
      {
        kind: 'list',
        items: [
          'Each variant (size, colour) carries its own stock count, not one number for the whole product.',
          'Low-stock thresholds warn you before you hit zero.',
          'Cost and sale price are both stored so you know real margin.',
          'Stock decrements automatically when an order is placed.',
        ],
      },
      { kind: 'heading', id: 'reports', text: 'The numbers that matter' },
      {
        kind: 'table',
        head: ['Metric', 'What it tells you', 'Cadence'],
        rows: [
          ['Net revenue', 'What you actually sold after discounts and returns', 'Daily'],
          ['Order count', 'Real workload of the shop', 'Daily'],
          ['Average order value', 'How much each customer spends', 'Weekly'],
          ['Top product', 'Where to focus and advertise', 'Weekly'],
          ['DM conversion rate', 'Orders per ten inbound messages', 'Weekly'],
          ['Inventory value', 'How much cash is sitting on shelves', 'Monthly'],
        ],
      },
      { kind: 'heading', id: 'choose-panel', text: 'How to choose a panel' },
      {
        kind: 'steps',
        items: [
          'Does it connect through the official Instagram API?',
          'Does it read real stock and price when answering customers, or send canned text?',
          'Does it cover orders, invoices and payment, or only chat?',
          'Does it report sales, or do you still export spreadsheets?',
          'Is it genuinely Persian and RTL, or a half-translated foreign tool?',
          'Where is the data hosted, and does using it require a VPN?',
          'Can you test it on your own products before paying?',
        ],
      },
      {
        kind: 'callout',
        title: 'Watch out',
        text: 'A tool that is only an auto-reply bot does not solve online shop management. It speeds up replies while orders, inventory and reporting stay manual.',
      },
      { kind: 'heading', id: 'conclusion', text: 'In short' },
      {
        kind: 'paragraph',
        text: 'ProMall is an online shop management panel built for this: it answers your Instagram DMs with AI grounded in your own catalogue, closes orders and invoices, and keeps inventory, customers and sales reports in one place.',
      },
    ],
    faq: [
      {
        question: 'Do I need a website to run an online shop?',
        answer:
          'No. You can keep a product catalogue with prices and stock in a management panel and sell through Instagram DMs, then connect a custom domain later if you want one.',
      },
      {
        question: 'How is an AI assistant different from an auto-reply bot?',
        answer:
          'A bot sends fixed text. An assistant grounded in your catalogue answers with real prices and stock, hands the conversation to you when it is unsure, and can create the order and payment link on the spot.',
      },
      {
        question: 'How long does setup take?',
        answer:
          'Under ten minutes with ProMall: connect your Instagram page, import your products, done. No code, and the first 10 days are free.',
      },
    ],
    relatedSlugs: [
      'modiriat-forushgah-instagrami',
      'anbardari-online-shop',
      'dargah-pardakht-instagram',
      'bashgah-moshtarian-online-shop',
    ],
    ctaTitle: CTA_TITLE,
    ctaDescription: CTA_DESCRIPTION,
    ctaLabel: CTA_LABEL,
  },
  {
    slug: 'modiriat-forushgah-instagrami',
    title: 'Running an Instagram shop without hiring a DM operator',
    metaTitle: 'Instagram Shop Management Without a DM Operator',
    description:
      'The real cost of a DM operator, why canned-reply bots fail, and how an assistant grounded in your own inventory replaces both.',
    excerpt:
      'Operators are expensive, work shifts and get tired. Here is the actual math, and the alternative.',
    keywords: [
      'instagram shop management',
      'dm operator',
      'instagram auto reply',
      'instagram dm automation',
    ],
    category: 'Guide',
    displayDate: 'July 23, 2026',
    publishedIso: '2026-07-23',
    modifiedIso: '2026-07-31',
    image: '/blog/post-1.jpg',
    imageAlt: 'Automated Instagram DM replies inside the ProMall management panel',
    tocLabel: TOC_LABEL,
    faqLabel: FAQ_LABEL,
    blocks: [
      {
        kind: 'paragraph',
        text: 'When your page takes off, the first thing you run out of is not time — it is focus. A hundred DMs a day is a hundred interruptions. Most shops respond by hiring a DM operator. Run the numbers first.',
      },
      { kind: 'heading', id: 'real-cost', text: 'What an operator actually costs' },
      {
        kind: 'list',
        items: [
          'Salary and insurance.',
          'Two to three weeks of training on products and prices.',
          'Night and holiday shifts — usually the busiest hours for an Instagram shop.',
          'Their mistakes: wrong prices, promising stock that is gone, wrong tone.',
          'Replacement: every departure restarts the cycle.',
        ],
      },
      {
        kind: 'paragraph',
        text: 'And the line that never shows up on an invoice: between midnight and 9am nobody answers at all — often the heaviest inbound window.',
      },
      { kind: 'heading', id: 'why-bots-fail', text: 'Why canned-reply bots fail' },
      {
        kind: 'list',
        items: [
          'They do not know real prices or stock, so they cannot answer the actual question.',
          'They match keywords; phrase it differently and they stall.',
          'They never create an order — the best they manage is "please wait".',
          'Many use unofficial connections that put your page at risk.',
        ],
      },
      { kind: 'heading', id: 'smart-alternative', text: 'The alternative' },
      {
        kind: 'steps',
        items: [
          'The customer asks a question in the DM.',
          'The assistant finds the right product in your catalogue.',
          'It answers with live price and stock, in your tone.',
          'If the customer is in, it closes the cart and builds the invoice.',
          'It sends a payment link; the paid order lands in your panel.',
          'Whenever it is unsure, it hands the conversation to you.',
        ],
      },
      {
        kind: 'callout',
        title: 'Important',
        text: 'An assistant that cannot say "I do not know" is dangerous. Whatever you pick must have a handover path to a human.',
      },
      { kind: 'heading', id: 'comparison', text: 'Three options compared' },
      {
        kind: 'table',
        head: ['', 'You', 'Operator', 'Grounded assistant'],
        rows: [
          ['24/7 coverage', 'No', 'Only with shifts', 'Yes'],
          ['Correct price and stock', 'Yes', 'After training', 'Yes'],
          ['Order and invoice', 'Manual', 'Manual', 'Automatic'],
          ['Monthly cost', 'Your time', 'Salary', 'Software subscription'],
          ['Scales without extra cost', 'No', 'No', 'Yes'],
        ],
      },
    ],
    faq: [
      {
        question: 'Can automated replies get my page banned?',
        answer:
          'Not when they run through the official Meta API. The risk comes from unofficial bots that log into your account directly. ProMall uses the official Instagram connection.',
      },
      {
        question: 'Can I take over a conversation myself?',
        answer:
          'At any moment. The assistant also hands over on its own whenever it is not confident, instead of guessing.',
      },
    ],
    relatedSlugs: ['modiriat-online-shop', 'az-payam-ta-code-rahgiri'],
    ctaTitle: CTA_TITLE,
    ctaDescription: CTA_DESCRIPTION,
    ctaLabel: CTA_LABEL,
  },
  {
    slug: 'gheymat-eshtebah-dar-direct',
    title: 'What a wrong price in the DMs really costs you',
    metaTitle: 'The Cost of Wrong Prices in Instagram DMs',
    description:
      'Wrong prices and false stock promises quietly drain an online shop. Why it happens, what it costs, and how one source of truth stops it.',
    excerpt:
      'A missing digit or a wrong "yes, in stock" costs more than you think. Let us add it up.',
    keywords: ['pricing errors', 'inventory accuracy', 'online shop management', 'stock control'],
    category: 'Sales',
    displayDate: 'July 11, 2026',
    publishedIso: '2026-07-11',
    modifiedIso: '2026-07-31',
    image: '/blog/post-2.jpg',
    imageAlt: 'Product price and stock control in the ProMall panel',
    tocLabel: TOC_LABEL,
    faqLabel: FAQ_LABEL,
    blocks: [
      {
        kind: 'paragraph',
        text: 'Everyone knows the screenshot: "but you told me 490." The real price was 590. Now you either eat the loss or lose the customer. Both are expensive.',
      },
      { kind: 'heading', id: 'why', text: 'Why it happens' },
      {
        kind: 'list',
        items: [
          'Prices are quoted from memory instead of a current list.',
          'A seasonal discount was applied and not everyone knows.',
          'Several people answer DMs, each holding a different version of the price.',
          'Stock is updated manually at night, so you promise wrong all day.',
        ],
      },
      { kind: 'heading', id: 'math', text: 'The math' },
      {
        kind: 'table',
        head: ['Cost type', 'What you lose'],
        rows: [
          ['Direct loss', 'The price gap, or return and reshipping costs'],
          ['Time cost', 'Several messages back and forth to fix it'],
          ['Trust cost', 'A customer who never returns and tells others'],
        ],
      },
      {
        kind: 'callout',
        title: 'Worst case',
        text: 'The customer paid and then you tell them it is out of stock. That is not a lost order, it is a negative review that stays.',
      },
      { kind: 'heading', id: 'fix', text: 'One source of truth' },
      {
        kind: 'steps',
        items: [
          'Store every variant with its own price and stock.',
          'Decrement stock automatically on every order.',
          'Set low-stock thresholds so you hear about it before zero.',
          'Wire DM replies to that same catalogue so nobody quotes from memory.',
          'Define discounts inside the system, not in a personal note.',
        ],
      },
    ],
    faq: [
      {
        question: 'How often should I update stock?',
        answer:
          'Never manually. It should decrement with each order — the gap between manual updates is exactly when you make wrong promises.',
      },
      {
        question: 'What does the assistant say when something is sold out?',
        answer:
          'The truth. ProMall reads stock from your panel, so it tells the customer it is unavailable and can suggest an alternative.',
      },
    ],
    relatedSlugs: ['modiriat-online-shop', 'modiriat-forushgah-instagrami'],
    ctaTitle: CTA_TITLE,
    ctaDescription: CTA_DESCRIPTION,
    ctaLabel: CTA_LABEL,
  },
  {
    slug: 'az-payam-ta-code-rahgiri',
    title: 'From customer message to tracking code in under two minutes',
    metaTitle: 'Order Management: From DM to Tracking Code',
    description:
      'The full path of an online shop order from the first DM to the tracking code, where the time leaks, and how to compress it to under two minutes.',
    excerpt: 'We walk one order through every step and see how much of it can disappear.',
    keywords: ['order management', 'invoicing', 'payment link', 'shipping tracking'],
    category: 'Product',
    displayDate: 'June 26, 2026',
    publishedIso: '2026-06-26',
    modifiedIso: '2026-07-31',
    image: '/blog/post-3.jpg',
    imageAlt: 'Order flow from DM to shipping and tracking inside ProMall',
    tocLabel: TOC_LABEL,
    faqLabel: FAQ_LABEL,
    blocks: [
      {
        kind: 'paragraph',
        text: 'Every order follows a fixed path. Write that path down once and you can see exactly where your day is burning.',
      },
      { kind: 'heading', id: 'manual-path', text: 'The manual path: 15 to 25 minutes' },
      {
        kind: 'steps',
        items: [
          'Customer asks whether it is in stock.',
          'You go check the shelf or the spreadsheet.',
          'You come back and quote a price.',
          'They want it; you collect address and details.',
          'You send bank details and wait for a receipt.',
          'You verify the receipt against your account.',
          'You write the order into a notebook or spreadsheet.',
          'You pack the parcel and take it to the courier.',
          'You send the tracking code by hand.',
        ],
      },
      { kind: 'heading', id: 'leaks', text: 'Where it leaks' },
      {
        kind: 'list',
        items: [
          'Between question and answer — every minute of delay costs conversion.',
          'Manual transfers — fake receipts, wrong amounts, manual chasing.',
          'Orders not recorded in one shared place.',
          'Forgotten tracking codes, which become three "where is it?" messages tomorrow.',
        ],
      },
      { kind: 'heading', id: 'fast-path', text: 'The connected path: under two minutes' },
      {
        kind: 'steps',
        items: [
          'The question is answered from live stock and price, instantly.',
          'The customer confirms and the cart closes inside the DM.',
          'An invoice is generated and a payment link is sent.',
          'Payment lands, the order is recorded and stock decrements.',
          'You pack the parcel and enter the tracking code.',
          'The shipping notification goes out automatically.',
        ],
      },
      {
        kind: 'table',
        head: ['Step', 'Manual', 'Connected'],
        rows: [
          ['First reply', 'Minutes to hours', 'Under 10 seconds'],
          ['Cart and invoice', 'Manual', 'Automatic'],
          ['Payment confirmation', 'Checking receipts', 'Payment gateway'],
          ['Order record', 'Notebook or spreadsheet', 'Automatic in the panel'],
          ['Tracking code', 'Manual and forgettable', 'Attached to the order'],
        ],
      },
    ],
    faq: [
      {
        question: 'Can I take payments without a website?',
        answer:
          'Yes. The invoice is created in the panel and its payment link is sent straight into the DM.',
      },
      {
        question: 'What happens if the customer backs out?',
        answer:
          'The order stays unpaid and the stock is released. You can follow it up later — most abandoned carts come back with one message.',
      },
    ],
    relatedSlugs: ['modiriat-online-shop', 'gheymat-eshtebah-dar-direct'],
    ctaTitle: CTA_TITLE,
    ctaDescription: CTA_DESCRIPTION,
    ctaLabel: CTA_LABEL,
  },
  {
    slug: 'anbardari-online-shop',
    title: 'Inventory management for an online shop: from counting by hand to stock you can trust',
    metaTitle: 'Online Shop Inventory Management',
    description:
      'How online shop inventory actually works: variants, low-stock thresholds, automatic decrements on every order, and knowing your real margin.',
    excerpt:
      'Good inventory means every answer you give a customer is read from something real. Here is how to get there.',
    keywords: [
      'inventory management',
      'stock control',
      'ecommerce inventory',
      'low stock alerts',
      'online shop management',
    ],
    category: 'Inventory',
    displayDate: 'July 20, 2026',
    publishedIso: '2026-07-20',
    modifiedIso: '2026-07-31',
    image: '/blog/post-2.jpg',
    imageAlt: 'Online shop inventory in the ProMall panel showing per-product stock and total value',
    tocLabel: TOC_LABEL,
    faqLabel: FAQ_LABEL,
    blocks: [
      {
        kind: 'paragraph',
        text: 'Inventory is where most online shops quietly lose money. Not to theft — to nobody knowing exactly how many of anything is left. That produces two expensive errors: selling what you do not have, and failing to reorder what is running out.',
      },
      { kind: 'heading', id: 'variants', text: 'Start by modelling variants properly' },
      {
        kind: 'paragraph',
        text: 'The biggest mistake is holding one stock number per product. "Linen coat: 12" means nothing when the customer wants a cream size 38.',
      },
      {
        kind: 'list',
        items: [
          'Every size/colour combination carries its own independent stock count.',
          'Variants can differ in price — a larger size may cost more.',
          'Give each variant a unique code so packing does not go wrong.',
          'Keep a photo per colour; it removes half your inbound questions.',
        ],
      },
      { kind: 'heading', id: 'auto-deduct', text: 'Automatic decrements are the whole point' },
      {
        kind: 'steps',
        items: [
          'The customer orders and the stock is reserved at that moment.',
          'On payment, the reservation becomes a permanent decrement.',
          'If the order is cancelled or never paid, the reservation is released.',
          'A recorded return adds the item back to stock.',
        ],
      },
      {
        kind: 'callout',
        title: 'Why reservation matters',
        text: 'Without it, two people can order the last size 38 at the same time. One of them ends up unhappy.',
      },
      { kind: 'heading', id: 'alerts', text: 'Thresholds: hear about it before zero' },
      {
        kind: 'table',
        head: ['Product type', 'Weekly sales', 'Lead time', 'Suggested threshold'],
        rows: [
          ['Consistent best seller', '20 units', '2 weeks', '50 units'],
          ['Average mover', '5 units', '2 weeks', '15 units'],
          ['Seasonal', '10 per season', '4 weeks', '40 before the season'],
          ['One-off / bespoke', 'Under 1', 'Made to order', '1 unit'],
        ],
      },
      {
        kind: 'paragraph',
        text: 'The formula is weekly sales × weeks of lead time, plus a safety margin. If the goods are imported, be generous with the margin.',
      },
      { kind: 'heading', id: 'profit', text: 'Record cost price, or you do not know your margin' },
      {
        kind: 'list',
        items: [
          'Store the cost price per variant — different purchase batches cost differently.',
          'Account for packaging and shipping costs too.',
          'With both, you see the real margin on every product.',
          'You will often find your best seller is not your most profitable item.',
        ],
      },
      { kind: 'heading', id: 'dead-stock', text: 'Dead stock is cash sitting on a shelf' },
      {
        kind: 'steps',
        items: [
          'Each month, isolate products with no sales in 90 days.',
          'Total their value to see how much capital is tied up.',
          'Decide how to clear them: discount, bundle with best sellers, or seasonal sale.',
          'Order fewer of that category next time.',
        ],
      },
      { kind: 'heading', id: 'connect-direct', text: 'Wire inventory to where selling happens' },
      {
        kind: 'paragraph',
        text: 'Accurate inventory only pays off once it is connected to the DM. In ProMall, products, variants, price and stock are defined once, and DM replies are read from exactly that — not from canned text, and not from memory.',
      },
    ],
    faq: [
      {
        question: 'Do I need software for inventory management?',
        answer:
          'A spreadsheet works up to a few orders a day. It breaks when sales grow but manual updates lag — at that point the cost of errors exceeds the cost of software.',
      },
      {
        question: 'Where should I set the low-stock threshold?',
        answer:
          'Multiply weekly sales by the weeks it takes to restock, then add a safety margin. Widen the margin for imported goods.',
      },
      {
        question: 'What happens to stock if a customer never pays?',
        answer:
          'It stays reserved and is released when the order is cancelled or the payment window expires, making the product sellable again.',
      },
    ],
    relatedSlugs: ['modiriat-online-shop', 'gheymat-eshtebah-dar-direct'],
    ctaTitle: CTA_TITLE,
    ctaDescription: CTA_DESCRIPTION,
    ctaLabel: CTA_LABEL,
  },
  {
    slug: 'dargah-pardakht-instagram',
    title: 'Payment links for an Instagram shop: replacing manual bank transfers',
    metaTitle: 'Payment Links for Instagram Shops',
    description:
      'Why manual bank transfers get expensive, how a payment gateway works without a website, and how to send a payment link straight into the DM.',
    excerpt:
      'Manual transfers mean checking receipts, wrong amounts and chasing people. Here is the better path.',
    keywords: [
      'instagram payment gateway',
      'payment link',
      'selling without a website',
      'invoicing',
      'online shop management',
    ],
    category: 'Payments',
    displayDate: 'July 13, 2026',
    publishedIso: '2026-07-13',
    modifiedIso: '2026-07-31',
    image: '/blog/post-3.jpg',
    imageAlt: 'Invoice and payment link for an online shop order in the ProMall panel',
    tocLabel: TOC_LABEL,
    faqLabel: FAQ_LABEL,
    blocks: [
      {
        kind: 'paragraph',
        text: 'Most Instagram shops start with manual bank transfers because it is the simplest thing that works. As sales grow, that same simplicity becomes the biggest bottleneck in your day.',
      },
      { kind: 'heading', id: 'card-cost', text: 'What manual transfers actually cost' },
      {
        kind: 'list',
        items: [
          'Every order needs a receipt checked by eye and matched against your account.',
          'Wrong amounts and duplicate receipts happen often and take time to resolve.',
          'Forged receipts are a real risk, especially on larger orders.',
          'You get no structured record — at month end you cannot tell who paid for what.',
          'The customer has to leave for their banking app and come back. Many do not.',
        ],
      },
      {
        kind: 'paragraph',
        text: 'That last one is the most expensive. Every extra step between "I want it" and "paid" burns a share of your orders.',
      },
      { kind: 'heading', id: 'how-it-works', text: 'How a gateway works without a website' },
      {
        kind: 'steps',
        items: [
          'You close the cart in the panel, or the assistant closes it in the DM.',
          'An invoice is created with the total, discount and shipping.',
          'A payment link is generated for that specific invoice.',
          'You send the link into the DM.',
          'The customer pays and the order flips to paid automatically.',
          'Stock decrements and the order enters the fulfilment queue.',
        ],
      },
      { kind: 'heading', id: 'comparison', text: 'The two methods compared' },
      {
        kind: 'table',
        head: ['', 'Manual transfer', 'Payment link'],
        rows: [
          ['Payment confirmation', 'By eye', 'Automatic'],
          ['Forged-receipt risk', 'Yes', 'No'],
          ['Order recorded automatically', 'No', 'Yes'],
          ['Customer experience', 'Leaves chat and returns', 'One link, in place'],
          ['Financial record', 'Scattered', 'Attached to each order'],
        ],
      },
      { kind: 'heading', id: 'abandoned', text: 'Abandoned carts are one message away' },
      {
        kind: 'list',
        items: [
          'Review unpaid invoices once a day.',
          'Send one short, low-pressure message — usually they simply forgot.',
          'If you sold the item to someone else, say so plainly.',
          'After a few days with no reply, cancel so the stock is released.',
        ],
      },
    ],
    faq: [
      {
        question: 'Can I take payments without a website?',
        answer:
          'Yes. The invoice is created in the panel and its payment link is sent straight into the DM. No website required.',
      },
      {
        question: 'Is the order recorded automatically after payment?',
        answer:
          'Yes. On confirmation the order moves to paid, stock decrements, and it enters the fulfilment queue.',
      },
      {
        question: 'Should I drop manual transfers entirely?',
        answer:
          'Not necessarily. You can keep both, though in practice most customers pick the link once it is available.',
      },
    ],
    relatedSlugs: ['az-payam-ta-code-rahgiri', 'modiriat-online-shop'],
    ctaTitle: CTA_TITLE,
    ctaDescription: CTA_DESCRIPTION,
    ctaLabel: CTA_LABEL,
  },
  {
    slug: 'bashgah-moshtarian-online-shop',
    title: 'Customer retention for an online shop: the second sale from your first customer',
    metaTitle: 'Customer Retention for Online Shops',
    description:
      'How to bring past customers back: spotting loyal and lapsing buyers, what to say to each group, and the numbers worth tracking.',
    excerpt:
      'Acquiring a new customer costs several times more than keeping an existing one. Here is how to earn the second sale.',
    keywords: [
      'customer retention',
      'repeat purchase',
      'loyalty',
      'ecommerce marketing',
      'online shop management',
    ],
    category: 'Customers',
    displayDate: 'July 6, 2026',
    publishedIso: '2026-07-06',
    modifiedIso: '2026-07-31',
    image: '/blog/post-1.jpg',
    imageAlt: 'Online shop customer list in ProMall with order count and lifetime spend',
    tocLabel: TOC_LABEL,
    faqLabel: FAQ_LABEL,
    blocks: [
      {
        kind: 'paragraph',
        text: 'Most ad budget goes toward finding new people, while the people who already bought from you and liked it sit there and hear nothing.',
      },
      { kind: 'heading', id: 'why', text: 'Why a returning customer is worth more' },
      {
        kind: 'list',
        items: [
          'Acquisition cost is zero — you already paid it.',
          'They trust you, so the decision cycle is shorter.',
          'They usually build a bigger basket because they have seen your quality.',
          'If they are happy, they bring you customers for free.',
        ],
      },
      {
        kind: 'callout',
        title: 'The plain truth',
        text: 'If you do not know which customers bought twice, you have no retention plan at all.',
      },
      { kind: 'heading', id: 'segments', text: 'Split customers into four groups' },
      {
        kind: 'table',
        head: ['Group', 'Signal', 'What to do'],
        rows: [
          ['Loyal', 'Several orders, recent', 'Early access to new products'],
          ['New', 'One order, recent', 'Check satisfaction, suggest a complement'],
          ['Lapsing', 'Several orders, none lately', 'A personal message and a reason to return'],
          ['Lost', 'One order, long ago', 'One last attempt, then let go'],
        ],
      },
      {
        kind: 'paragraph',
        text: 'The lapsing group matters most. They have bought repeatedly, so they are valuable, and they have not fully gone. One well-judged message here has the highest return.',
      },
      { kind: 'heading', id: 'messages', text: 'How to write something that is not an ad' },
      {
        kind: 'steps',
        items: [
          'Open with their name, not "Dear customer".',
          'Reference their last purchase so they know you remember.',
          'Suggest something that fits that purchase, not a random list.',
          'If you discount, give a reason so it does not read as desperation.',
          'Make replying trivial — the DM is enough.',
        ],
      },
      { kind: 'heading', id: 'metrics', text: 'The numbers worth tracking' },
      {
        kind: 'table',
        head: ['Metric', 'What it means', 'Goal'],
        rows: [
          ['Repeat purchase rate', 'Share of customers who bought twice', 'Raise it over time'],
          ['Gap between purchases', 'How often they typically return', 'Time your messages'],
          ['Lifetime value', 'Total spend to date', 'Identify valuable customers'],
          ['Average order value', 'Spend per order', 'Suggest the right complement'],
        ],
      },
      {
        kind: 'paragraph',
        text: 'The gap between purchases is the most actionable: if your customers typically return every 45 days, a message on day 60 is late and one on day 10 is early.',
      },
      { kind: 'heading', id: 'in-panel', text: 'None of this works without connected records' },
      {
        kind: 'paragraph',
        text: 'All of it depends on orders being attached to customers. In ProMall each order links to a customer profile, so order count, lifetime spend and last purchase sit in one place — and you know exactly who to message.',
      },
    ],
    faq: [
      {
        question: 'Does retention matter for a small shop?',
        answer:
          'Even more. With fewer customers, each returning one is a larger share of monthly revenue and losing them is more noticeable.',
      },
      {
        question: 'How often should I message past customers?',
        answer:
          'Base it on the typical gap between purchases for your own customers. If they usually return every 45 days, message around that window.',
      },
      {
        question: 'Do I have to offer a discount?',
        answer:
          'No. Early access, free shipping or a relevant complementary suggestion often outperforms a discount and does not eat your margin.',
      },
    ],
    relatedSlugs: ['modiriat-online-shop', 'anbardari-online-shop'],
    ctaTitle: CTA_TITLE,
    ctaDescription: CTA_DESCRIPTION,
    ctaLabel: CTA_LABEL,
  },
];
