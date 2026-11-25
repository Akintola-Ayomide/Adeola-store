const measurements = [
  { size: "UK 8", bust: "82", waist: "64", hip: "89" },
  { size: "UK 10", bust: "87", waist: "69", hip: "94" },
  { size: "UK 12", bust: "92", waist: "74", hip: "99" },
  { size: "UK 14", bust: "97", waist: "79", hip: "104" },
  { size: "UK 16", bust: "102", waist: "84", hip: "109" },
  { size: "UK 18", bust: "107", waist: "89", hip: "114" },
];

export function SizeGuide({ compact = false }: { compact?: boolean }) {
  return (
    <div>
      <div className="overflow-x-auto border border-line">
        <table className="w-full min-w-[26rem] border-collapse text-left text-[12px]">
          <caption className="sr-only">
            Approximate body measurements in centimetres
          </caption>
          <thead>
            <tr className="border-b border-line bg-sand/60 text-[10px] uppercase tracking-[0.12em] text-ink-soft">
              <th scope="col" className="px-3 py-2.5 font-semibold">
                Size
              </th>
              <th scope="col" className="px-3 py-2.5 font-semibold">
                Bust (cm)
              </th>
              <th scope="col" className="px-3 py-2.5 font-semibold">
                Waist (cm)
              </th>
              <th scope="col" className="px-3 py-2.5 font-semibold">
                Hip (cm)
              </th>
            </tr>
          </thead>
          <tbody>
            {measurements.map((row) => (
              <tr
                key={row.size}
                className="border-b border-line last:border-0"
              >
                <th scope="row" className="px-3 py-2.5 font-medium">
                  {row.size}
                </th>
                <td className="px-3 py-2.5 text-ink-soft">{row.bust}</td>
                <td className="px-3 py-2.5 text-ink-soft">{row.waist}</td>
                <td className="px-3 py-2.5 text-ink-soft">{row.hip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[11.5px] leading-relaxed text-ink-soft">
        Approximate body measurements, not garment measurements.{" "}
        {compact
          ? "Made-to-measure is available on request."
          : "Made-to-measure is available on most pieces; the studio will confirm the closest fit and any adjustments on WhatsApp."}
      </p>
    </div>
  );
}
