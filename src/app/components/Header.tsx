import { getSignInUrl, getSignUpUrl, signOut, withAuth } from "@workos-inc/authkit-nextjs";
import Link from "next/link";
import React from "react";
export default async function Header() {
  const  { user }  = await withAuth();
  const signInUrl = await getSignInUrl();
    return (
        <header>
          
        <div className="container flex items-center justify-between mx-auto my-4">
          <Link href={'/'} className="font-bold text-xl">Job Board</Link>
          <nav className="flex gap-4 ">
             {!user ? (<Link className="bg-gray-200 rounded-md py-1 px-2 sm:py-2 sm:px-4" href={signInUrl}>Login</Link>): <></>}
             {user ? (<form action ={async () => {
              'use server';
              await signOut();
             }}>
              Hi, {user.firstName}! &nbsp;
              
              <button type="submit" className="bg-gray-200 py-1 px-2 sm:py-2 sm:px-4 rounded-md">Logout</button>
             </form>): <></>}
            <Link className="bg-blue-600 text-white sm:py-2 py-1 px-2 sm:px-4 rounded-md" href={'/new-listing'}>Post a job</Link>
            {user ? (
              <Link className="bg-blue-600 text-white sm:py-2 py-1 px-2 sm:px-4 rounded-md" href={`/favorites/${user.id}/`}>Favorites</Link>
            ): <></>}
          </nav>
        </div>
      </header>

    );
}