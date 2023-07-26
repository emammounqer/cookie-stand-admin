import { Arima } from "next/font/google";
import { useState } from "react";
import CookieStandAdmin from "@/components/CookieStandAdmin";
import LoginForm from "@/components/LoginForm";

const arima = Arima({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <CookieStandAdmin />
      {/* <LoginForm /> */}
    </>
  );
}
