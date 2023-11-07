import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { CardList } from "../components/CardList/CardList";
import { Featured } from "~/components/featuredpost/Featured";

export default function Home() {

  return (
    <main className="">
      <Head>
        <title>Adrians Blog</title>
        <meta name="description" content="Blog by Adrian about random stuff" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" flex flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-10 ">
          <div className="flex flex-col items-center gap-2">
            <p className="text-3xl text-white">
              Welcome to da Blog!
            </p>
            <AuthShowcase />
            <Featured />
          </div>
        </div>
        <CardList />
      </main>
    </main>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  // const categories = api.categories.get.useQuery();
  // console.log(categories)

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
