import {Link} from "react-router-dom";
import React from "react";

export default function Notfound() {
  return (
    <>
      <hgroup>
        <h2>We couldn't find this page</h2>
        <h3>404 - not found</h3>
      </hgroup>
      <Link to='/' role='button'>
        Back to Home
      </Link>
    </>
  )
}