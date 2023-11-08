import Header from "@/components/header";
import MainBlock from "@/components/main-block";

export default function Home() {

  return (
    <div>
      <Header />
      
      <div className="flex justify-center w-full">
        <MainBlock />
      </div>
    </div>
  );
}
