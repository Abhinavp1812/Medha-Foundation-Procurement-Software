"use client";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const PO     = [8500,12400, 9800,3200,4100,11200,9500,8700,6900,10600,9800,8700];
const NON_PO = [6200, 4800, 6900,2500,2900, 8100,7400,5600,4800, 7600,5900,4900];

const W=620, H=185, ML=46, MR=8, MT=8, MB=26;
const CW=W-ML-MR, CH=H-MT-MB, MAX=15000;
const Y_LINES=[0,3000,6000,9000,12000,15000];
const slotW=CW/12, bW=10, GAP=3, gW=bW*2+GAP, off=(slotW-gW)/2;

export function SpendChart() {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
      {Y_LINES.map((v) => {
        const y = MT + CH - (v / MAX) * CH;
        return (
          <g key={v}>
            <line x1={ML} y1={y} x2={W - MR} y2={y} stroke="#F3F4F6" strokeWidth={1} />
            <text x={ML - 6} y={y + 4} textAnchor="end" fontSize={10} fill="#9CA3AF">
              {v === 0 ? "0" : `${v / 1000}K`}
            </text>
          </g>
        );
      })}
      {MONTHS.map((m, i) => {
        const x1 = ML + i * slotW + off;
        const x2 = x1 + bW + GAP;
        const h1 = (PO[i] / MAX) * CH;
        const h2 = (NON_PO[i] / MAX) * CH;
        return (
          <g key={m}>
            <rect x={x1} y={MT + CH - h1} width={bW} height={h1} fill="#E05A4E" rx={2} />
            <rect x={x2} y={MT + CH - h2} width={bW} height={h2} fill="#D1D5DB" rx={2} />
            <text x={ML + i * slotW + slotW / 2} y={H - 4} textAnchor="middle" fontSize={10} fill="#9CA3AF">
              {m}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
