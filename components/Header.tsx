import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";

const Header = () => {
  return (
    <header className={"flex items-center justify-between w-full gap-10 py-4"}>
      <Link href={"/"}>
        <Image src={"/icons/logo.svg"} alt={"Logo"} width={120} height={120} />
      </Link>

      <SearchBar />
    </header>
  );
};

export default Header;
