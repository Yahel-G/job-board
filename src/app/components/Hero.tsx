import SearchForm from "@/app/components/SearchForm";

export default async function Hero() {
  return (
    <section className="container my-16 mx-auto">
      <h1 className="text-4xl font-bold text-center">
        Find your next<br />dream job
      </h1>
      <SearchForm />
    </section>
  );
}
