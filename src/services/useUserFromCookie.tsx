import {useEffect} from 'react'
import useSWR from 'swr';
import {User} from '../../model/User'
import axios from 'axios';
import {useNavigate} from "react-router-dom";

// async function fetcher() {
//   const response = await axios.get("//localhost:3001/api/auth/user");
//
//   return response.data;
// }

// export default function useUser(
//   {
//     redirectTo = '',
//     redirectIfFound = false,
//   } = {}
// ) {
//   const {data: user, mutate: mutateUser} = useSWR<User>('/api/auth/user', fetcher)
//   const navigate = useNavigate();
//
//   useEffect(() => {
//     // if no redirect needed, just return (example: already on /dashboard)
//     // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
//     if (!redirectTo || !user) return
//
//     if (
//       // If redirectTo is set, redirect if the user was not found.
//       (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
//       // If redirectIfFound is also set, redirect if the user was found
//       (redirectIfFound && user?.isLoggedIn)
//     ) {
//       navigate(redirectTo, {replace: true})
//     }
//   }, [user, redirectIfFound, redirectTo])
//
//   return {user, mutateUser}
// }
import * as cookie from 'cookie';

export default function useUserFromCookie(): User | null {
  const userCookie = cookie.parse(document.cookie).user as string | undefined;
  if (!userCookie) {
    return null;
  }
  try {
    const user = JSON.parse(userCookie);
    return user;
  } catch (error: any) {
    return null;
  }
}

// import * as cookie from 'cookie';
//
// // interface User {
// //   id: number;
// //   userId: number;
// // }
//
// export default function useUser(
//   {
//     redirectTo = '',
//     redirectIfFound = false,
//   } = {}
// ) {
//
//   const navigate = useNavigate();
//
//   const userCookie = cookie.parse(document.cookie).user as string | undefined;
//   if (!userCookie) {
//     return null;
//   }
//   let user: User | undefined;
//   try {
//     user = JSON.parse(userCookie);
//   } catch (error: any) {
//
//   }
//
//   useEffect(() => {
//     // if no redirect needed, just return (example: already on /dashboard)
//     // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
//     if (!redirectTo || !user) return
//
//     if (
//       // If redirectTo is set, redirect if the user was not found.
//       (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
//       // If redirectIfFound is also set, redirect if the user was found
//       (redirectIfFound && user?.isLoggedIn)
//     ) {
//       navigate(redirectTo, {replace: true})
//     }
//   }, [user, redirectIfFound, redirectTo]);
//
//   return {user}
// }
//
