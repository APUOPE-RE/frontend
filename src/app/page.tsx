import React from "react";
import { fetchHello } from "./actions/logInActions";

export default async function Home() {
  const hello = await fetchHello();
  return (
    <div>
      <h2>APUOPE-RE</h2>
      {hello}
    </div>
  );
}
