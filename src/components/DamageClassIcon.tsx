import { DamageClass } from "@/models/MoveInfo";
import Image from "next/image";
import movePhysical from "@/assets/movePhysical.png";
import moveSpecial from "@/assets/moveSpecial.png";
import moveStatus from "@/assets/moveStatus.png";

interface DamageClassIconProps {
  damageClass: DamageClass;
}

export default function DamageClassIcon({ damageClass }: DamageClassIconProps) {
  switch (damageClass) {
    case "physical":
      return (
        <Image src={movePhysical} alt={damageClass} width={30} height={30} />
      );

    case "special":
      return (
        <Image src={moveSpecial} alt={damageClass} width={30} height={30} />
      );

    case "status":
      return (
        <Image src={moveStatus} alt={damageClass} width={30} height={30} />
      );

    default:
      return null;
  }
}
