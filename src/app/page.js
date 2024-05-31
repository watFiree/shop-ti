import { Header } from "@/app/components/header/header";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div>
      <Header />
      <div>Strona głowna</div>
    </div>
  );
}
