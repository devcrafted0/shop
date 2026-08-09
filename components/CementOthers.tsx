import { Product } from "@/generated/prisma/client";
import AlertCard from "./ui/AlertCard";

export const Cement = ({ lowCement }: { lowCement: Product[] }) => {
  return (
    <div className="p-4 grid grid-cols-2 gap-2">
      {lowCement?.map((c, index) => (
        <AlertCard p={c} index={index} />
      ))}
    </div>
  );
};

export const Others = ({ lowOthers }: { lowOthers: Product[] }) => {
  return (
    <div className="p-4 grid grid-cols-2 gap-2">
      {lowOthers?.map((c, index) => (
        <AlertCard p={c} index={index} />
      ))}
    </div>
  );
};
