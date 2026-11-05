import { jsPDF } from 'jspdf';

// Brand Color Palette (RGB)
const C_IVORY = [244, 241, 234];
const C_OBSIDIAN = [32, 33, 31];
const C_GOLD = [181, 154, 105];
const C_STONE = [216, 210, 199];
const C_GREY = [119, 120, 115];
const C_WHITE = [255, 255, 255];
const C_CARD_BG = [250, 248, 244];

// Helper to safely load images as base64 for jsPDF
async function loadBase64Image(url: string): Promise<string> {
  return new Promise((resolve) => {
    try {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth || img.width;
          canvas.height = img.naturalHeight || img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL('image/jpeg', 0.85));
          } else {
            resolve('');
          }
        } catch {
          resolve('');
        }
      };
      img.onerror = () => resolve('');
      img.src = url;
    } catch {
      resolve('');
    }
  });
}

// Background painter
function applyPageBackground(doc: jsPDF) {
  doc.setFillColor(C_IVORY[0], C_IVORY[1], C_IVORY[2]);
  doc.rect(0, 0, 210, 297, 'F');
}

// Vector Architectural Crest & Monogram Emblem (matching website header)
function drawVectorEmblem(doc: jsPDF, cx: number, cy: number, size: number) {
  const s = size / 2;
  // Outer Diamond
  doc.setDrawColor(C_GOLD[0], C_GOLD[1], C_GOLD[2]);
  doc.setLineWidth(0.7);
  doc.setFillColor(C_IVORY[0], C_IVORY[1], C_IVORY[2]);
  
  // Draw polygon using lines
  doc.lines(
    [
      [s, -s],
      [-s, -s],
      [-s, s],
      [s, s]
    ],
    cx,
    cy - s,
    [1, 1],
    'FD'
  );

  // Inner Diamond
  const is = s * 0.72;
  doc.setDrawColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
  doc.setLineWidth(0.3);
  doc.lines(
    [
      [is, -is],
      [-is, -is],
      [-is, is],
      [is, is]
    ],
    cx,
    cy - is,
    [1, 1],
    'S'
  );

  // Monogram 'A' struts
  doc.setDrawColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
  doc.setLineWidth(0.9);
  doc.line(cx, cy - s * 0.45, cx - s * 0.4, cy + s * 0.45);
  doc.line(cx, cy - s * 0.45, cx + s * 0.4, cy + s * 0.45);

  // Crossbeam
  doc.setDrawColor(C_GOLD[0], C_GOLD[1], C_GOLD[2]);
  doc.setLineWidth(0.7);
  doc.line(cx - s * 0.22, cy + s * 0.12, cx + s * 0.22, cy + s * 0.12);

  // Pinnacle dot
  doc.setFillColor(C_GOLD[0], C_GOLD[1], C_GOLD[2]);
  doc.circle(cx, cy - s * 0.15, 0.8, 'F');
}

// Header & Footer for internal pages (Pages 2-9)
function applyPageDecorations(doc: jsPDF, pageNum: number, totalPages: number, sectionKicker: string) {
  // Top hairline gold rule
  doc.setDrawColor(C_GOLD[0], C_GOLD[1], C_GOLD[2]);
  doc.setLineWidth(0.35);
  doc.line(18, 14, 192, 14);

  // Top header text
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(C_GOLD[0], C_GOLD[1], C_GOLD[2]);
  doc.text('AUREVANT GROUP', 18, 11);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(C_GREY[0], C_GREY[1], C_GREY[2]);
  doc.text(`CORPORATE PROFILE  ·  ${sectionKicker}`, 52, 11);

  doc.text('GLOBAL EDITION 2026', 192, 11, { align: 'right' });

  // Bottom hairline stone rule
  doc.setDrawColor(C_STONE[0], C_STONE[1], C_STONE[2]);
  doc.setLineWidth(0.25);
  doc.line(18, 283, 192, 283);

  // Bottom footer text
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(C_GREY[0], C_GREY[1], C_GREY[2]);
  doc.text('CONFIDENTIAL & PROPRIETARY  ·  AUREVANT GROUP', 18, 288);
  doc.text('info@aurevantgroup.com  ·  www.aurevantgroup.com', 105, 288, { align: 'center' });
  doc.text(`PAGE ${pageNum} OF ${totalPages}`, 192, 288, { align: 'right' });
}

export async function exportCorporateProfilePDF(filename = 'AUREVANT_GROUP_Corporate_Profile') {
  // Initialize PDF (A4 portrait, units: mm)
  const doc = new jsPDF('p', 'mm', 'a4');
  const TOTAL_PAGES = 9;

  // Pre-load key imagery in parallel
  const [
    imgLogo,
    imgHero,
    imgArch,
    imgProp,
    imgEng,
    imgSust,
    imgUrban,
    imgLondon,
    imgDhaka,
  ] = await Promise.all([
    loadBase64Image('/src/assets/images/aurevant_logo_emblem_1793878003468.jpg'),
    loadBase64Image('/src/assets/images/hero_architecture_1793877173606.jpg'),
    loadBase64Image('/src/assets/images/expertise_architecture_1793877172956.jpg'),
    loadBase64Image('/src/assets/images/expertise_property_1793877340956.jpg'),
    loadBase64Image('/src/assets/images/expertise_engineering_1793877176099.jpg'),
    loadBase64Image('/src/assets/images/expertise_sustainability_1793877175100.jpg'),
    loadBase64Image('/src/assets/images/expertise_urban_1793877340632.jpg'),
    loadBase64Image('/src/assets/images/city_london_1793877342803.jpg'),
    loadBase64Image('/src/assets/images/city_dhaka_1793877341121.jpg'),
  ]);

  // =========================================================================
  // PAGE 1: COVER
  // =========================================================================
  applyPageBackground(doc);

  // Outer elegant double border
  doc.setDrawColor(C_GOLD[0], C_GOLD[1], C_GOLD[2]);
  doc.setLineWidth(0.6);
  doc.rect(10, 10, 190, 277);
  doc.setLineWidth(0.2);
  doc.rect(12, 12, 186, 273);

  // Top Emblem (Transparent Vector Emblem matching website header)
  drawVectorEmblem(doc, 105, 38, 22);

  // Wordmark
  doc.setFont('times', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
  doc.text('A U R E V A N T   G R O U P', 105, 65, { align: 'center' });

  // Tagline
  doc.setFont('times', 'italic');
  doc.setFontSize(11);
  doc.setTextColor(C_GOLD[0], C_GOLD[1], C_GOLD[2]);
  doc.text('Built on Vision. Defined by Excellence.', 105, 72, { align: 'center' });

  // Divider
  doc.setDrawColor(C_GOLD[0], C_GOLD[1], C_GOLD[2]);
  doc.setLineWidth(0.4);
  doc.line(75, 76, 135, 76);

  // Hero Architectural Photography
  if (imgHero) {
    doc.addImage(imgHero, 'JPEG', 18, 83, 174, 98);
    doc.setDrawColor(C_GOLD[0], C_GOLD[1], C_GOLD[2]);
    doc.setLineWidth(0.3);
    doc.rect(18, 83, 174, 98);
  }

  // Main Document Title
  doc.setFont('times', 'bold');
  doc.setFontSize(17);
  doc.setTextColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
  doc.text('CORPORATE PROFILE & STRATEGIC OVERVIEW', 105, 196, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(C_GREY[0], C_GREY[1], C_GREY[2]);
  doc.text('Architecture  ·  Property Markets  ·  Civil Engineering  ·  Sustainable Urbanism', 105, 203, { align: 'center' });

  // Summary Card at Base of Cover
  doc.setFillColor(C_WHITE[0], C_WHITE[1], C_WHITE[2]);
  doc.rect(24, 214, 162, 54, 'F');
  doc.setDrawColor(C_STONE[0], C_STONE[1], C_STONE[2]);
  doc.setLineWidth(0.3);
  doc.rect(24, 214, 162, 54);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(C_GOLD[0], C_GOLD[1], C_GOLD[2]);
  doc.text('OFFICIAL CORPORATE BRIEFING DOCUMENT', 105, 223, { align: 'center' });

  doc.setFont('times', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
  const coverIntro = 'A comprehensive briefing on the governance, international operations, strategic disciplines, and editorial perspectives of AUREVANT GROUP.';
  doc.text(doc.splitTextToSize(coverIntro, 146), 105, 230, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(C_GREY[0], C_GREY[1], C_GREY[2]);
  doc.text('PROPOSED MARKETS: BANGLADESH  ·  UAE  ·  UNITED KINGDOM  ·  SINGAPORE  ·  GERMANY', 105, 248, { align: 'center' });
  doc.text('HEADQUARTERS: DHAKA, BANGLADESH  ·  ESTABLISHED GOVERNANCE BOARD', 105, 255, { align: 'center' });
  doc.text('DOCUMENT VERSION 2026.1  ·  PUBLISHED FOR STRATEGIC ENGAGEMENT', 105, 262, { align: 'center' });

  // =========================================================================
  // PAGE 2: EXECUTIVE SUMMARY & TABLE OF CONTENTS
  // =========================================================================
  doc.addPage();
  applyPageBackground(doc);
  applyPageDecorations(doc, 2, TOTAL_PAGES, 'EXECUTIVE SUMMARY');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(C_GOLD[0], C_GOLD[1], C_GOLD[2]);
  doc.text('01 / CORPORATE OVERVIEW', 18, 25);

  doc.setFont('times', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
  doc.text('A Broader Perspective on the Built Environment', 18, 34);

  // Left Column: Corporate Narrative
  doc.setFont('times', 'italic');
  doc.setFontSize(11);
  doc.setTextColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
  const execQuote = '“The built environment influences how we live, work, move, and connect. At AUREVANT GROUP, we bring together perspectives on property, architecture, engineering, and development to help partners better understand the forces shaping our cities and communities.”';
  doc.text(doc.splitTextToSize(execQuote, 85), 18, 44);

  doc.setFont('times', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
  const execP1 = 'AUREVANT GROUP is a developing corporate and editorial platform focused on the built environment. Our interests span architecture, property markets, civil and structural engineering, construction oversight, and sustainable urban development.';
  const execP2 = 'We believe that informed decisions begin with clear information. Our aim is to make complex industry topics easier to understand through considered writing, useful empirical analysis, and an unwavering commitment to clarity.';
  const execP3 = 'As an international entity, AUREVANT GROUP monitors structural trends across mature and emerging markets, fostering constructive dialogues between architectural creativity and technical rigor.';
  doc.text(doc.splitTextToSize(execP1, 85), 18, 80);
  doc.text(doc.splitTextToSize(execP2, 85), 18, 108);
  doc.text(doc.splitTextToSize(execP3, 85), 18, 134);

  // Right Column: Table of Contents Box
  doc.setFillColor(C_WHITE[0], C_WHITE[1], C_WHITE[2]);
  doc.rect(110, 42, 82, 118, 'F');
  doc.setDrawColor(C_STONE[0], C_STONE[1], C_STONE[2]);
  doc.setLineWidth(0.3);
  doc.rect(110, 42, 82, 118);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(C_GOLD[0], C_GOLD[1], C_GOLD[2]);
  doc.text('TABLE OF CONTENTS', 116, 52);

  const tocItems = [
    { num: '01', title: 'Corporate Overview & Executive Summary', page: '02' },
    { num: '02', title: 'Vision, Mission & Guiding Values', page: '03' },
    { num: '03', title: 'Architecture, Design & Property Markets', page: '04' },
    { num: '04', title: 'Engineering Precision & Sustainability', page: '05' },
    { num: '05', title: 'Urban Planning & Community Futures', page: '06' },
    { num: '06', title: 'International Footprint & Regional Markets', page: '07' },
    { num: '07', title: 'Corporate Governance & Board of Directors', page: '08' },
    { num: '08', title: 'Executive Management & Contact Directory', page: '09' },
  ];

  let tocY = 63;
  tocItems.forEach((item) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(C_GOLD[0], C_GOLD[1], C_GOLD[2]);
    doc.text(item.num, 116, tocY);

    doc.setFont('times', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
    doc.text(item.title, 123, tocY);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(C_GREY[0], C_GREY[1], C_GREY[2]);
    doc.text(item.page, 186, tocY, { align: 'right' });

    doc.setDrawColor(C_STONE[0], C_STONE[1], C_STONE[2]);
    doc.setLineWidth(0.15);
    doc.line(116, tocY + 3, 186, tocY + 3);
    tocY += 12;
  });

  // Lower Section: Photo & Pillars Strip
  if (imgArch) {
    doc.addImage(imgArch, 'JPEG', 18, 172, 85, 50);
    doc.setDrawColor(C_GOLD[0], C_GOLD[1], C_GOLD[2]);
    doc.setLineWidth(0.3);
    doc.rect(18, 172, 85, 50);
  }

  // Right Pillar Strip
  doc.setFillColor(C_CARD_BG[0], C_CARD_BG[1], C_CARD_BG[2]);
  doc.rect(110, 172, 82, 50, 'F');
  doc.setDrawColor(C_STONE[0], C_STONE[1], C_STONE[2]);
  doc.setLineWidth(0.3);
  doc.rect(110, 172, 82, 50);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(C_GOLD[0], C_GOLD[1], C_GOLD[2]);
  doc.text('ORGANISATIONAL PILLARS', 116, 180);

  const pillars = [
    '• Interdisciplinary Built-Environment Synthesis',
    '• Educational Research & Thought Leadership',
    '• Rigorous Engineering Standards & Compliance',
    '• High-Impact Sustainable Development Insights',
  ];
  let pillY = 188;
  pillars.forEach((p) => {
    doc.setFont('times', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
    doc.text(p, 116, pillY);
    pillY += 8;
  });

  // Four Bottom KPI Metric Cards
  const kpis = [
    { label: 'Strategic Practices', val: '5 Disciplines' },
    { label: 'Target Markets', val: '5 Hubs' },
    { label: 'Governance Officers', val: '13 Leaders' },
    { label: 'Editorial Output', val: 'Active Journal' },
  ];

  kpis.forEach((kpi, i) => {
    const x = 18 + i * 44.5;
    doc.setFillColor(C_WHITE[0], C_WHITE[1], C_WHITE[2]);
    doc.rect(x, 230, 40, 36, 'F');
    doc.setDrawColor(C_STONE[0], C_STONE[1], C_STONE[2]);
    doc.setLineWidth(0.25);
    doc.rect(x, 230, 40, 36);

    doc.setFont('times', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(C_GOLD[0], C_GOLD[1], C_GOLD[2]);
    doc.text(kpi.val, x + 20, 246, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(C_GREY[0], C_GREY[1], C_GREY[2]);
    doc.text(kpi.label, x + 20, 254, { align: 'center' });
  });

  // =========================================================================
  // PAGE 3: VISION, MISSION & GUIDING VALUES
  // =========================================================================
  doc.addPage();
  applyPageBackground(doc);
  applyPageDecorations(doc, 3, TOTAL_PAGES, 'STRATEGIC FOUNDATIONS');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(C_GOLD[0], C_GOLD[1], C_GOLD[2]);
  doc.text('02 / STRATEGIC FOUNDATIONS', 18, 25);

  doc.setFont('times', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
  doc.text('Mission, Vision & Guiding Principles', 18, 34);

  // Mission Box
  doc.setFillColor(C_WHITE[0], C_WHITE[1], C_WHITE[2]);
  doc.rect(18, 42, 84, 48, 'F');
  doc.setDrawColor(C_STONE[0], C_STONE[1], C_STONE[2]);
  doc.setLineWidth(0.3);
  doc.rect(18, 42, 84, 48);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(C_GOLD[0], C_GOLD[1], C_GOLD[2]);
  doc.text('OUR MISSION', 24, 52);

  doc.setFont('times', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
  const missionText = 'To make knowledge about the built environment more accessible through thoughtful analysis, responsible publishing, and an international perspective, empowering stakeholders to navigate complex urban transitions.';
  doc.text(doc.splitTextToSize(missionText, 72), 24, 60);

  // Vision Box
  doc.setFillColor(C_WHITE[0], C_WHITE[1], C_WHITE[2]);
  doc.rect(108, 42, 84, 48, 'F');
  doc.setDrawColor(C_STONE[0], C_STONE[1], C_STONE[2]);
  doc.setLineWidth(0.3);
  doc.rect(108, 42, 84, 48);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(C_GOLD[0], C_GOLD[1], C_GOLD[2]);
  doc.text('OUR VISION', 114, 52);

  doc.setFont('times', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
  const visionText = 'To develop AUREVANT GROUP into an internationally respected name for insight, technical communication, and collaborative excellence across the built-environment sector, fostering enduring standards.';
  doc.text(doc.splitTextToSize(visionText, 72), 114, 60);

  // Values Section Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(C_GOLD[0], C_GOLD[1], C_GOLD[2]);
  doc.text('THE SIX CORE VALUES', 18, 102);

  const valuesData = [
    { title: 'Integrity', desc: 'Communicate clearly and responsibly. Adhere strictly to truth in research, transparency in corporate discourse, and fidelity in reporting without unsubstantiated claims.' },
    { title: 'Clarity', desc: 'Make complex technical and economic subjects accessible. Demystify structural engineering, architectural nuance, and capital market dynamics through lucid analysis.' },
    { title: 'Quality', desc: 'Apply meticulous care to every published article, technical coordinate, and professional engagement. Excellence is our defining structural benchmark.' },
    { title: 'Curiosity', desc: 'Actively explore emerging design paradigms, carbon-neutral construction techniques, generative modeling, and the future evolution of our cities.' },
    { title: 'Responsibility', desc: 'Recognise the profound environmental and social impact of the built environment. Champion sustainable practices, circular lifecycles, and social equity.' },
    { title: 'Collaboration', desc: 'Welcome informed discussion, multidisciplinary research, and diverse international perspectives to address shared challenges across global communities.' },
  ];

  let valY = 110;
  valuesData.forEach((val, i) => {
    const isCol2 = i % 2 === 1;
    const x = isCol2 ? 108 : 18;
    const y = valY;

    doc.setFillColor(C_WHITE[0], C_WHITE[1], C_WHITE[2]);
    doc.rect(x, y, 84, 38, 'F');
    doc.setDrawColor(C_STONE[0], C_STONE[1], C_STONE[2]);
    doc.setLineWidth(0.25);
    doc.rect(x, y, 84, 38);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(C_GOLD[0], C_GOLD[1], C_GOLD[2]);
    doc.text(`0${i + 1} / VALUE`, x + 6, y + 8);

    doc.setFont('times', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
    doc.text(val.title, x + 6, y + 16);

    doc.setFont('times', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(C_GREY[0], C_GREY[1], C_GREY[2]);
    doc.text(doc.splitTextToSize(val.desc, 72), x + 6, y + 22);

    if (isCol2) valY += 43;
  });

  // Callout Quote Banner
  doc.setFillColor(C_CARD_BG[0], C_CARD_BG[1], C_CARD_BG[2]);
  doc.rect(18, 245, 174, 25, 'F');
  doc.setDrawColor(C_GOLD[0], C_GOLD[1], C_GOLD[2]);
  doc.setLineWidth(0.35);
  doc.rect(18, 245, 174, 25);

  doc.setFont('times', 'italic');
  doc.setFontSize(9.5);
  doc.setTextColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
  const bannerQuote = '“Built on Vision. Defined by Excellence. We believe that thoughtful development and responsible business practices must be guided by enduring principles rather than fleeting industry novelties.”';
  doc.text(doc.splitTextToSize(bannerQuote, 162), 105, 254, { align: 'center' });

  // =========================================================================
  // PAGE 4: PRACTICE AREAS — ARCHITECTURE & PROPERTY MARKETS
  // =========================================================================
  doc.addPage();
  applyPageBackground(doc);
  applyPageDecorations(doc, 4, TOTAL_PAGES, 'SPECIALISATIONS: PART I');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(C_GOLD[0], C_GOLD[1], C_GOLD[2]);
  doc.text('03 / CORE PRACTICE AREAS', 18, 25);

  doc.setFont('times', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
  doc.text('Architecture, Design & Property Markets', 18, 34);

  // Section 1: Architecture & Design
  doc.setFont('times', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
  doc.text('Architecture & Spatial Design', 18, 48);

  const archBody = [
    'Architecture at AUREVANT GROUP is explored as an intellectual and operational discipline shaping human experience. We examine how spatial quality, material selection, proportion, and building functionality converge to create structures of timeless dignity.',
    'Our perspectives dissect contemporary architectural trends—from high-density commercial towers to delicate cultural pavilions. We prioritize design thinking that elevates occupant well-being, optimizes natural illumination, and establishes a harmonious relationship with surrounding urban landscapes.',
  ];

  doc.setFont('times', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
  doc.text(doc.splitTextToSize(archBody[0], 102), 18, 56);
  doc.text(doc.splitTextToSize(archBody[1], 102), 18, 80);

  if (imgArch) {
    doc.addImage(imgArch, 'JPEG', 126, 46, 66, 48);
    doc.setDrawColor(C_STONE[0], C_STONE[1], C_STONE[2]);
    doc.setLineWidth(0.3);
    doc.rect(126, 46, 66, 48);
  }

  // Key architectural study points box
  doc.setFillColor(C_CARD_BG[0], C_CARD_BG[1], C_CARD_BG[2]);
  doc.rect(18, 104, 174, 30, 'F');
  doc.setDrawColor(C_STONE[0], C_STONE[1], C_STONE[2]);
  doc.setLineWidth(0.25);
  doc.rect(18, 104, 174, 30);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(C_GOLD[0], C_GOLD[1], C_GOLD[2]);
  doc.text('CORE ARCHITECTURAL PERSPECTIVES', 24, 112);

  doc.setFont('times', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
  doc.text('• Material Authenticity: Evaluating tactile performance, acoustic mass, and durability across changing climates.', 24, 118);
  doc.text('• Façade Performance: Balancing architectural expression with thermal efficiency and daylight penetration.', 24, 124);
  doc.text('• Spatial Ergonomics: Structuring internal circulation to enhance productivity, focus, and social connection.', 24, 130);

  // Section 2: Property & Markets
  doc.setFont('times', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
  doc.text('Property & Real Estate Markets', 18, 150);

  const propBody = [
    'Real estate is governed by complex macroeconomic forces, demographic shifts, regulatory environments, and capital allocation strategies. AUREVANT GROUP provides considered, educational research into property markets.',
    'We analyze the fundamental factors behind property valuation—avoiding speculative promises—and examine how changing workplace dynamics, urban migration, and interest rates shape international real estate.',
  ];

  doc.setFont('times', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
  doc.text(doc.splitTextToSize(propBody[0], 102), 18, 158);
  doc.text(doc.splitTextToSize(propBody[1], 102), 18, 182);

  if (imgProp) {
    doc.addImage(imgProp, 'JPEG', 126, 148, 66, 48);
    doc.setDrawColor(C_STONE[0], C_STONE[1], C_STONE[2]);
    doc.setLineWidth(0.3);
    doc.rect(126, 148, 66, 48);
  }

  // Key property research box
  doc.setFillColor(C_CARD_BG[0], C_CARD_BG[1], C_CARD_BG[2]);
  doc.rect(18, 206, 174, 30, 'F');
  doc.setDrawColor(C_STONE[0], C_STONE[1], C_STONE[2]);
  doc.setLineWidth(0.25);
  doc.rect(18, 206, 174, 30);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(C_GOLD[0], C_GOLD[1], C_GOLD[2]);
  doc.text('MARKET RESEARCH DOMAINS', 24, 214);

  doc.setFont('times', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
  doc.text('• Commercial Yield Analysis: Long-term viability across Grade-A commercial office, retail, and mixed-use complexes.', 24, 220);
  doc.text('• Demographic Drivers: How urbanization, family size evolution, and flexible working redefine housing demand.', 24, 226);
  doc.text('• Risk Mitigation & Transparency: Establishing empirical valuation models free of speculative exaggeration.', 24, 232);

  // Footer Disclaimer
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7);
  doc.setTextColor(C_GREY[0], C_GREY[1], C_GREY[2]);
  doc.text('* AUREVANT GROUP provides editorial and research insights. We do not operate as an investment brokerage or licensed transaction agency.', 18, 260);

  // =========================================================================
  // PAGE 5: PRACTICE AREAS — ENGINEERING & SUSTAINABLE DEVELOPMENT
  // =========================================================================
  doc.addPage();
  applyPageBackground(doc);
  applyPageDecorations(doc, 5, TOTAL_PAGES, 'SPECIALISATIONS: PART II');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(C_GOLD[0], C_GOLD[1], C_GOLD[2]);
  doc.text('04 / CORE PRACTICE AREAS (CONT.)', 18, 25);

  doc.setFont('times', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
  doc.text('Engineering Precision & Sustainability', 18, 34);

  // Section 1: Civil & Structural Engineering
  doc.setFont('times', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
  doc.text('Civil & Structural Engineering', 18, 48);

  const engBody = [
    'Construction excellence begins long before ground is broken. AUREVANT GROUP examines the technical coordination, material specifications, and quality controls that guarantee structural longevity.',
    'We cover modern engineering principles: composite steel-concrete frames, high-tolerance curtain walls, seismic damping, and deep foundation engineering in complex soil conditions.',
  ];

  doc.setFont('times', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
  doc.text(doc.splitTextToSize(engBody[0], 102), 18, 56);
  doc.text(doc.splitTextToSize(engBody[1], 102), 18, 80);

  if (imgEng) {
    doc.addImage(imgEng, 'JPEG', 126, 46, 66, 48);
    doc.setDrawColor(C_STONE[0], C_STONE[1], C_STONE[2]);
    doc.setLineWidth(0.3);
    doc.rect(126, 46, 66, 48);
  }

  // Engineering callout box
  doc.setFillColor(C_CARD_BG[0], C_CARD_BG[1], C_CARD_BG[2]);
  doc.rect(18, 104, 174, 30, 'F');
  doc.setDrawColor(C_STONE[0], C_STONE[1], C_STONE[2]);
  doc.setLineWidth(0.25);
  doc.rect(18, 104, 174, 30);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(C_GOLD[0], C_GOLD[1], C_GOLD[2]);
  doc.text('TECHNICAL STANDARDS & OVERSIGHT', 24, 112);

  doc.setFont('times', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
  doc.text('• Pre-Construction Planning: Building Information Modeling (BIM) coordination and clash detection protocols.', 24, 118);
  doc.text('• Material Testing: Compressive strength, ductility, and longevity metrics for concrete and structural steel.', 24, 124);
  doc.text('• Safety Systems: Proactive site safety management, international OSHA harmonization, and structural risk audits.', 24, 130);

  // Section 2: Sustainable Development
  doc.setFont('times', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
  doc.text('Sustainable Development & Ecological Design', 18, 150);

  const sustBody = [
    'The urgent challenge of the 21st century is decoupling urban growth from environmental degradation. We champion climate-aware architecture, energy-efficient building skins, and sustainable materials.',
    'Our editorial investigations spotlight passive thermal regulation, integrated solar photovoltaics, greywater harvesting, and embodied carbon accounting—proving that responsible design enhances asset value.',
  ];

  doc.setFont('times', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
  doc.text(doc.splitTextToSize(sustBody[0], 102), 18, 158);
  doc.text(doc.splitTextToSize(sustBody[1], 102), 18, 182);

  if (imgSust) {
    doc.addImage(imgSust, 'JPEG', 126, 148, 66, 48);
    doc.setDrawColor(C_STONE[0], C_STONE[1], C_STONE[2]);
    doc.setLineWidth(0.3);
    doc.rect(126, 148, 66, 48);
  }

  // Sustainability callout box
  doc.setFillColor(C_CARD_BG[0], C_CARD_BG[1], C_CARD_BG[2]);
  doc.rect(18, 206, 174, 30, 'F');
  doc.setDrawColor(C_STONE[0], C_STONE[1], C_STONE[2]);
  doc.setLineWidth(0.25);
  doc.rect(18, 206, 174, 30);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(C_GOLD[0], C_GOLD[1], C_GOLD[2]);
  doc.text('ECOLOGICAL COMMITMENT & BENCHMARKS', 24, 214);

  doc.setFont('times', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
  doc.text('• Embodied Carbon Auditing: Tracking lifecycle emissions from extraction and fabrication through demolition.', 24, 220);
  doc.text('• Energy Efficiency: Net-zero operational modeling, passive shading, and smart HVAC automation.', 24, 226);
  doc.text('• Circular Construction: Prefabrication, timber engineering, and recyclable building assemblies.', 24, 232);

  // Footer Disclaimer
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7);
  doc.setTextColor(C_GREY[0], C_GREY[1], C_GREY[2]);
  doc.text('* AUREVANT GROUP highlights global engineering best practices. Technical projects must be executed by locally licensed engineering authorities.', 18, 260);

  // =========================================================================
  // PAGE 6: URBAN PLANNING & THE AUREVANT JOURNAL
  // =========================================================================
  doc.addPage();
  applyPageBackground(doc);
  applyPageDecorations(doc, 6, TOTAL_PAGES, 'URBAN PLANNING & RESEARCH');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(C_GOLD[0], C_GOLD[1], C_GOLD[2]);
  doc.text('05 / URBAN FUTURES & THOUGHT LEADERSHIP', 18, 25);

  doc.setFont('times', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
  doc.text('Urban Planning, Mobility & The Journal', 18, 34);

  // Urban Masterplan Image
  if (imgUrban) {
    doc.addImage(imgUrban, 'JPEG', 18, 44, 174, 60);
    doc.setDrawColor(C_STONE[0], C_STONE[1], C_STONE[2]);
    doc.setLineWidth(0.3);
    doc.rect(18, 44, 174, 60);
  }

  // Narrative below image
  doc.setFont('times', 'bold');
  doc.setFontSize(12.5);
  doc.setTextColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
  doc.text('The Relationship Between Cities and Communities', 18, 114);

  const urbanText = 'Cities succeed when infrastructure, housing, public spaces, and mobility are integrated into a coherent civic fabric. AUREVANT GROUP explores how urban planning shapes everyday human life. We examine transit-oriented development (TOD), pedestrian connectivity, green municipal corridors, and adaptive zoning to address housing density while safeguarding public health.';

  doc.setFont('times', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
  doc.text(doc.splitTextToSize(urbanText, 174), 18, 122);

  // The AUREVANT Journal Box
  doc.setFillColor(C_WHITE[0], C_WHITE[1], C_WHITE[2]);
  doc.rect(18, 145, 174, 116, 'F');
  doc.setDrawColor(C_GOLD[0], C_GOLD[1], C_GOLD[2]);
  doc.setLineWidth(0.35);
  doc.rect(18, 145, 174, 116);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(C_GOLD[0], C_GOLD[1], C_GOLD[2]);
  doc.text('THE AUREVANT JOURNAL — PUBLISHED RESEARCH STUDIES', 26, 156);

  doc.setFont('times', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(C_GREY[0], C_GREY[1], C_GREY[2]);
  doc.text('Our ongoing editorial publications deliver rigorous analysis across five primary categories:', 26, 163);

  const articles = [
    { title: 'Designing Buildings for a Changing World', cat: 'Architecture & Design', author: 'Sophia Williams' },
    { title: 'Understanding the Factors Behind Property Values', cat: 'Property & Markets', author: 'Arif Hasan Chowdhury' },
    { title: 'Why Construction Quality Begins Before Work Starts', cat: 'Engineering & Construction', author: 'Engr. Tanvir Mahmud' },
    { title: 'The Growing Importance of Energy-Efficient Buildings', cat: 'Sustainable Development', author: 'Evelyn Chen' },
    { title: 'How Urban Planning Influences Everyday Life', cat: 'Urban Planning', author: 'Nadia Karim' },
  ];

  let artY = 173;
  articles.forEach((art, idx) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(C_GOLD[0], C_GOLD[1], C_GOLD[2]);
    doc.text(`PAPER 0${idx + 1}`, 26, artY);

    doc.setFont('times', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
    doc.text(art.title, 52, artY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(C_GREY[0], C_GREY[1], C_GREY[2]);
    doc.text(`${art.cat}  ·  By ${art.author}`, 52, artY + 5);

    doc.setDrawColor(C_STONE[0], C_STONE[1], C_STONE[2]);
    doc.setLineWidth(0.15);
    doc.line(26, artY + 9, 184, artY + 9);

    artY += 15;
  });

  // Journal access note
  doc.setFont('times', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
  doc.text('Full research monographs and editorial essays are accessible via the digital journal at aurevantgroup.com/journal', 26, 252);

  // =========================================================================
  // PAGE 7: GLOBAL PRESENCE & REGIONAL MARKETS
  // =========================================================================
  doc.addPage();
  applyPageBackground(doc);
  applyPageDecorations(doc, 7, TOTAL_PAGES, 'GLOBAL PRESENCE');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(C_GOLD[0], C_GOLD[1], C_GOLD[2]);
  doc.text('06 / INTERNATIONAL FOOTPRINT', 18, 25);

  doc.setFont('times', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
  doc.text('Regional Markets & Coverage Directory', 18, 34);

  doc.setFont('times', 'italic');
  doc.setFontSize(9.5);
  doc.setTextColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
  const globalIntro = '“Local Understanding. International Perspective. Built-environment challenges differ from place to place, yet many questions they raise are shared. AUREVANT GROUP brings together international perspectives on infrastructure, design, and municipal evolution.”';
  doc.text(doc.splitTextToSize(globalIntro, 174), 18, 44);

  // 5 Regional Offices / Markets
  const offices = [
    {
      city: 'Dhaka, Bangladesh',
      status: 'Proposed Global Headquarters',
      phone: '+880 2 5831 7642  |  Hotline: +880 1712 583 641',
      email: 'dhaka@aurevantgroup.com  |  office@aurevantgroup.com',
      scope: 'Central Executive Coordination, South Asian Research Hub, Corporate Governance',
    },
    {
      city: 'Dubai, United Arab Emirates',
      status: 'Proposed Regional Hub — Middle East',
      phone: '+971 4 583 1762  |  Mobile: +971 52 681 4739',
      email: 'dubai@aurevantgroup.com  |  international@aurevantgroup.com',
      scope: 'High-Density Commercial Developments, Super-Tall Engineering, Gulf Strategic Partnerships',
    },
    {
      city: 'London, United Kingdom',
      status: 'Proposed Regional Hub — Europe & UK',
      phone: '+44 20 7946 0123  |  Inquiries: +44 20 7946 0124',
      email: 'london@aurevantgroup.com  |  partnerships@aurevantgroup.com',
      scope: 'European Capital Markets, Historic Preservation, Architectural Research Exchange',
    },
    {
      city: 'Singapore',
      status: 'Proposed Regional Hub — Southeast Asia',
      phone: '+65 6817 4293  |  Support: +65 6128 5734',
      email: 'singapore@aurevantgroup.com  |  projects@aurevantgroup.com',
      scope: 'Sustainable Tropical Urbanism, Transit Infrastructure, High-Density Greening Models',
    },
    {
      city: 'Berlin, Germany',
      status: 'Proposed Regional Hub — Central Europe',
      phone: '+49 30 5831 7642  |  Engineering: +49 30 6817 4295',
      email: 'berlin@aurevantgroup.com  |  engineering@aurevantgroup.com',
      scope: 'Technical Standardization, Building Physics, Energy Efficiency & Passive House Analytics',
    },
  ];

  let offY = 60;
  offices.forEach((off) => {
    doc.setFillColor(C_WHITE[0], C_WHITE[1], C_WHITE[2]);
    doc.rect(18, offY, 174, 25, 'F');
    doc.setDrawColor(C_STONE[0], C_STONE[1], C_STONE[2]);
    doc.setLineWidth(0.25);
    doc.rect(18, offY, 174, 25);

    doc.setFont('times', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
    doc.text(off.city, 24, offY + 7);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(C_GOLD[0], C_GOLD[1], C_GOLD[2]);
    doc.text(off.status.toUpperCase(), 186, offY + 7, { align: 'right' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(C_GREY[0], C_GREY[1], C_GREY[2]);
    doc.text(`Phone: ${off.phone}`, 24, offY + 13);
    doc.text(`Email: ${off.email}`, 24, offY + 18);
    doc.text(`Focus: ${off.scope}`, 24, offY + 23);

    offY += 28;
  });

  // Dual City Photos
  if (imgLondon) {
    doc.addImage(imgLondon, 'JPEG', 18, 203, 84, 48);
    doc.setDrawColor(C_STONE[0], C_STONE[1], C_STONE[2]);
    doc.setLineWidth(0.3);
    doc.rect(18, 203, 84, 48);
  }
  if (imgDhaka) {
    doc.addImage(imgDhaka, 'JPEG', 108, 203, 84, 48);
    doc.setDrawColor(C_STONE[0], C_STONE[1], C_STONE[2]);
    doc.setLineWidth(0.3);
    doc.rect(108, 203, 84, 48);
  }

  // Bottom Notice
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7);
  doc.setTextColor(C_GREY[0], C_GREY[1], C_GREY[2]);
  doc.text('Important Compliance Notice: Regional contact telephone sequences are proposed design illustrative entries pending telecom carrier commissioning.', 18, 260);

  // =========================================================================
  // PAGE 8: CORPORATE GOVERNANCE — BOARD OF DIRECTORS
  // =========================================================================
  doc.addPage();
  applyPageBackground(doc);
  applyPageDecorations(doc, 8, TOTAL_PAGES, 'CORPORATE GOVERNANCE');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(C_GOLD[0], C_GOLD[1], C_GOLD[2]);
  doc.text('07 / CORPORATE GOVERNANCE', 18, 25);

  doc.setFont('times', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
  doc.text('Board of Directors', 18, 34);

  doc.setFont('times', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
  doc.text('The governance of AUREVANT GROUP is guided by a commitment to long-term fiduciary stability, rigorous technical standards, and responsible international collaboration.', 18, 42);

  const boardMembers = [
    { name: 'Mahir Rahman', title: 'Chairman of the Board', email: 'mahir.rahman@aurevantgroup.com', bio: 'Focused on long-term direction, responsible governance, and the development of a clear organisational vision.' },
    { name: 'Arif Hasan Chowdhury', title: 'Managing Director', email: 'arif.chowdhury@aurevantgroup.com', bio: 'Interested in organisational strategy, operational development, and building effective professional relationships.' },
    { name: 'Samira Nawar', title: 'Finance Director', email: 'samira.nawar@aurevantgroup.com', bio: 'Focused on financial planning, accountability, and disciplined resource management.' },
    { name: 'Engr. Tanvir Mahmud', title: 'Director of Engineering', email: 'tanvir.mahmud@aurevantgroup.com', bio: 'Interested in engineering standards, technical coordination, and practical approaches to construction quality.' },
    { name: 'Alexander Bennett', title: 'International Strategy Director', email: 'alexander.bennett@aurevantgroup.com', bio: 'Focused on international strategy, market understanding, and cross-border collaboration.' },
    { name: 'Omar Al-Farsi', title: 'Director of Regional Partnerships', email: 'omar.alfarsi@aurevantgroup.com', bio: 'Interested in building professional partnerships and encouraging constructive regional cooperation.' },
    { name: 'Evelyn Chen', title: 'Director of Strategy & Sustainability', email: 'evelyn.chen@aurevantgroup.com', bio: 'Focused on sustainability, strategic thinking, and the long-term impact of development.' },
    { name: 'Lukas Schneider', title: 'Director of Technical Standards', email: 'lukas.schneider@aurevantgroup.com', bio: 'Interested in technical consistency, engineering processes, and quality-focused practices.' },
  ];

  let boardY = 52;
  boardMembers.forEach((m, idx) => {
    const isCol2 = idx % 2 === 1;
    const x = isCol2 ? 108 : 18;
    const y = boardY;

    doc.setFillColor(C_WHITE[0], C_WHITE[1], C_WHITE[2]);
    doc.rect(x, y, 84, 45, 'F');
    doc.setDrawColor(C_STONE[0], C_STONE[1], C_STONE[2]);
    doc.setLineWidth(0.25);
    doc.rect(x, y, 84, 45);

    doc.setFont('times', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
    doc.text(m.name, x + 6, y + 8);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(C_GOLD[0], C_GOLD[1], C_GOLD[2]);
    doc.text(m.title.toUpperCase(), x + 6, y + 14);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(C_GREY[0], C_GREY[1], C_GREY[2]);
    doc.text(m.email, x + 6, y + 20);

    doc.setDrawColor(C_STONE[0], C_STONE[1], C_STONE[2]);
    doc.setLineWidth(0.15);
    doc.line(x + 6, y + 23, x + 78, y + 23);

    doc.setFont('times', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
    doc.text(doc.splitTextToSize(`“${m.bio}”`, 72), x + 6, y + 29);

    if (isCol2) boardY += 51;
  });

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7);
  doc.setTextColor(C_GREY[0], C_GREY[1], C_GREY[2]);
  doc.text('* Leadership profiles represent proposed strategic appointments and corporate governance nominees pending general assembly ratifications.', 18, 264);

  // =========================================================================
  // PAGE 9: EXECUTIVE MANAGEMENT & COMPLETE DIRECTORY
  // =========================================================================
  doc.addPage();
  applyPageBackground(doc);
  applyPageDecorations(doc, 9, TOTAL_PAGES, 'EXECUTIVE & CONTACT DIRECTORY');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(C_GOLD[0], C_GOLD[1], C_GOLD[2]);
  doc.text('08 / LEADERSHIP & DIRECTORY', 18, 25);

  doc.setFont('times', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
  doc.text('Executive Management & Communications', 18, 34);

  // Executive Management Row (5 officers)
  const execMembers = [
    { name: 'Nadia Karim', title: 'Chief Executive Officer', email: 'nadia.karim@aurevantgroup.com' },
    { name: 'Farhan Kabir', title: 'Chief Operating Officer', email: 'farhan.kabir@aurevantgroup.com' },
    { name: 'Imran Sayeed', title: 'Chief Financial Officer', email: 'imran.sayeed@aurevantgroup.com' },
    { name: 'Sophia Williams', title: 'Head of Communications', email: 'sophia.williams@aurevantgroup.com' },
    { name: 'Daniel Weber', title: 'Head of International Projects', email: 'daniel.weber@aurevantgroup.com' },
  ];

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(C_GOLD[0], C_GOLD[1], C_GOLD[2]);
  doc.text('EXECUTIVE MANAGEMENT TEAM', 18, 45);

  let execX = 18;
  const execWidth = 33;
  execMembers.forEach((em) => {
    doc.setFillColor(C_WHITE[0], C_WHITE[1], C_WHITE[2]);
    doc.rect(execX, 48, execWidth, 38, 'F');
    doc.setDrawColor(C_STONE[0], C_STONE[1], C_STONE[2]);
    doc.setLineWidth(0.25);
    doc.rect(execX, 48, execWidth, 38);

    doc.setFont('times', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
    doc.text(em.name, execX + 3, 56);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(C_GOLD[0], C_GOLD[1], C_GOLD[2]);
    doc.text(doc.splitTextToSize(em.title, 27), execX + 3, 62);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(5.5);
    doc.setTextColor(C_GREY[0], C_GREY[1], C_GREY[2]);
    doc.text(doc.splitTextToSize(em.email, 27), execX + 3, 76);

    execX += 35.2;
  });

  // Departmental Email Directory Grid
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(C_GOLD[0], C_GOLD[1], C_GOLD[2]);
  doc.text('CORPORATE DEPARTMENTAL DIRECTORY', 18, 97);

  const deptEmails = [
    { dept: 'General Enquiries', email: 'info@aurevantgroup.com' },
    { dept: 'Board Secretariat', email: 'board@aurevantgroup.com' },
    { dept: "Chairman's Office", email: 'chairman@aurevantgroup.com' },
    { dept: 'Managing Director', email: 'md@aurevantgroup.com' },
    { dept: 'CEO Executive Office', email: 'ceo@aurevantgroup.com' },
    { dept: 'Finance & Accounts', email: 'finance@aurevantgroup.com' },
    { dept: 'Careers & Talent', email: 'careers@aurevantgroup.com' },
    { dept: 'Media Relations', email: 'media@aurevantgroup.com' },
    { dept: 'Press & Broadcast', email: 'press@aurevantgroup.com' },
    { dept: 'Editorial Bureau', email: 'editorial@aurevantgroup.com' },
    { dept: 'Article Submissions', email: 'submissions@aurevantgroup.com' },
    { dept: 'Business Partnerships', email: 'partnerships@aurevantgroup.com' },
    { dept: 'Legal Affairs', email: 'legal@aurevantgroup.com' },
    { dept: 'Data Privacy Office', email: 'privacy@aurevantgroup.com' },
    { dept: 'Technical Support', email: 'technical@aurevantgroup.com' },
    { dept: 'Customer Support Desk', email: 'support@aurevantgroup.com' },
    { dept: 'Investor Relations', email: 'investors@aurevantgroup.com' },
    { dept: 'Dhaka Headquarters', email: 'dhaka@aurevantgroup.com' },
  ];

  doc.setFillColor(C_WHITE[0], C_WHITE[1], C_WHITE[2]);
  doc.rect(18, 102, 174, 110, 'F');
  doc.setDrawColor(C_STONE[0], C_STONE[1], C_STONE[2]);
  doc.setLineWidth(0.3);
  doc.rect(18, 102, 174, 110);

  let gridRow = 0;
  let gridCol = 0;
  deptEmails.forEach((d) => {
    const dx = 24 + gridCol * 56;
    const dy = 112 + gridRow * 16;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(C_GOLD[0], C_GOLD[1], C_GOLD[2]);
    doc.text(d.dept.toUpperCase(), dx, dy);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
    doc.text(d.email, dx, dy + 5);

    gridRow++;
    if (gridRow >= 6) {
      gridRow = 0;
      gridCol++;
    }
  });

  // Final Closing Statement Card
  doc.setFillColor(C_OBSIDIAN[0], C_OBSIDIAN[1], C_OBSIDIAN[2]);
  doc.rect(18, 220, 174, 48, 'F');

  doc.setFont('times', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(C_IVORY[0], C_IVORY[1], C_IVORY[2]);
  doc.text('AUREVANT GROUP — BUILT ON VISION. DEFINED BY EXCELLENCE.', 105, 232, { align: 'center' });

  doc.setFont('times', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(C_GOLD[0], C_GOLD[1], C_GOLD[2]);
  doc.text('“We welcome thoughtful enquiries, editorial contributions, and opportunities for collaboration.”', 105, 240, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(C_STONE[0], C_STONE[1], C_STONE[2]);
  doc.text('Headquarters: Dhaka, Bangladesh  ·  Regional Representations: Dubai  ·  London  ·  Singapore  ·  Berlin', 105, 252, { align: 'center' });
  doc.text('© 2026 AUREVANT GROUP. All rights reserved. Registered for international editorial and corporate disclosure.', 105, 258, { align: 'center' });

  // Save the document
  doc.save(`${filename}.pdf`);
}

// Backwards-compatible alias for existing calls
export async function exportToPDF(_elementId?: string, filename = 'AUREVANT_GROUP_Corporate_Profile') {
  return exportCorporateProfilePDF(filename);
}
