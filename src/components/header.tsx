import Image from "next/image";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 w-full h-[100lvh]">
      <div className="h-full ">
        <div className="absolute z-20 bg-heroGradient w-full h-full"></div>
        <div className="absolute top-0 left-0 z-10 w-full h-full">
          <Image
            src="/hero-for-light.jpg"
            alt="hero background"
            fill
            priority
            className="object-cover select-none"
          />
        </div>
        <div className="absolute inset-0 w-full h-full z-30 grid place-content-center">
          <h2 className="font-kaushan font-extrabold text-4xl sm:text-7xl lg:text-8xl text-foreground leading-normal mx-auto text-center">
            Read, Relax, Repeat<br/>Your Online Book<br/>Haven!
          </h2>
        </div>
      </div>
    </header>
  );
}
