import { useEffect, useState } from "react";
import { Keyboard } from "@capacitor/keyboard";
import { Capacitor } from "@capacitor/core";

// TODO: delete this now that using a different method?
export const useHideOnKeyboardOpen = () => {
  const [shouldHide, setShouldHide] = useState<boolean>(false);
  console.debug(
    "🚀 ~ file: useHideOnKeyboardOpen.ts:7 ~ useHideOnKeyboardOpen ~ shouldHide:",
    shouldHide
  );

  useEffect(() => {
    if (Capacitor.isPluginAvailable("Keyboard")) {
      //* testing
      console.debug("useEffect in useHideOnKeyboardOpen called!");
      //* testing

      //* testing
      console.debug("Capacitor Keyboard plugin is available!");
      //* testing
      Keyboard.addListener("keyboardWillShow", () => {
        //* testing
        console.debug("keyboardWillShow called!");
        //* testing
        setShouldHide(true);
      });

      Keyboard.addListener("keyboardDidHide", () => {
        //* testing
        console.debug("keyboardDidHide called!");
        //* testing
        setShouldHide(false);
      });
    }
    return () => {
      //* testing
      console.debug("Removing listeners in useHideOnKeyboardOpen useEffect...");
      //* testing
      setShouldHide(false);
      if (Capacitor.isPluginAvailable("Keyboard")) {
        Keyboard.removeAllListeners();
      }
    };
  }, []);

  return { shouldHide };
};
