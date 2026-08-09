import { Product } from "@/generated/prisma/client";

const AlertCard = ({ p, index }: { p: Product; index: number }) => {
  return (
    <div
      key={p.id || p.id || index}
      className="flex flex-col justify-between border border-black bg-white p-2 transition-colors hover:bg-zinc-50"
    >
      {/* Top Row: Name, Company & Current Stock */}
      <div className="flex items-start justify-between gap-1">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-black">{p.name}</span>
            <span className="border border-zinc-300 px-1 text-[10px] font-semibold text-zinc-600 uppercase">
              {p.company}
            </span>
          </div>
          <p className="text-xs text-zinc-500">{p.type}</p>
        </div>

        {/* Stock Count vs Alert Badge */}
        <div className="text-right">
          <div className="font-mono text-sm font-bold text-red-600">
            {p.amount}{" "}
            <span className="text-xs font-normal text-zinc-500">left</span>
          </div>
          <span className="font-mono text-[10px] text-zinc-400">
            Threshold: {p.alertValue}
          </span>
        </div>
      </div>

      {/* Bottom Meta Row: Code & Size */}
      <div className="flex items-center justify-between border-t border-zinc-200 pt-2 font-mono text-xs">
        <span className="text-zinc-600">
          Code: <strong className="text-black">{p.code}</strong>
        </span>

        <span className="border border-black bg-black px-1.5 py-0.5 text-[10px] font-bold text-white uppercase">
          Size: {p.size}
        </span>
      </div>
    </div>
  );
};

export default AlertCard;
