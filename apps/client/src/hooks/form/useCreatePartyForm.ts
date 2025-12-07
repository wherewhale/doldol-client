import { PartyTheme } from "@/enum/party.enum";
import { PartyRequest } from "@/types/party";
import { useForm } from "react-hook-form";

export const useCreatePartyForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useForm<PartyRequest>({
    mode: "onChange",
    defaultValues: {
      title: "",
      eventDateTime: "",
      location: "",
      locationLink: "",
      content: "",
      sender: "",
      theme: PartyTheme.BIRTHDAY,
      fontStyle: "font-pretendard",
    },
  });

  return {
    register,
    handleSubmit,
    watch,
    setValue,
    errors,
  };
};
