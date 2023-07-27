import { Arima } from "next/font/google";
import { useState } from "react";
import CookieStandAdmin from "@/components/CookieStandAdmin";
import LoginForm from "@/components/LoginForm";
import { useUser } from "@/context/authCtx";

export default function Home() {
  const user = useUser();

  if (!user) {
    return <LoginForm />;
  }

  return <CookieStandAdmin />;
}
