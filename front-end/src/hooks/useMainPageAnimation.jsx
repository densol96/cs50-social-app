import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useMainPageAnimation(formElement) {
  const navigate = useNavigate();

  useEffect(() => {
    if (formElement.current) {
      setTimeout(() => {
        formElement.current.classList.add("show");
      }, 300);
    }
  }, [formElement]);

  function animation(path) {
    if (formElement.current) {
      formElement.current.classList.remove("show");
    }

    setTimeout(() => {
      navigate(path);
    }, 600);
  }

  return animation;
}

export default useMainPageAnimation;
