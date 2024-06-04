import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";

const Header = () => {
  return (
    <header
      className={
        "flex items-center justify-between w-full gap-4 py-4 container"
      }
    >
      <Link href={"/"}>
        <Image src={"/icons/logo.svg"} alt={"Logo"} width={100} height={100} />
      </Link>

      <SearchBar />
    </header>
  );
};

export default Header;
