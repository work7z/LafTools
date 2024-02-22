"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { IStaticMethods } from "preline/preline";
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

export default function PrelineScript() {
  const path = usePathname();


  let [mounted, setMount] = useState(false)
  useEffect(() => {
    setMount(true)
  }, [])



  useEffect(() => {
    import("preline/preline").then(x => {
      setTimeout(() => {
        window.HSStaticMethods.autoInit();
      }, 100);
    })
  }, []);

  // useEffect(() => {
  // }, [path]);
  if (!mounted) {
    return '';
  }

  return '';
}