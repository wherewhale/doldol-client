import { CreateCommentRequest } from "@/types/party";
import { useForm } from "react-hook-form";

export const useCreateCommentForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useForm<CreateCommentRequest>({
    mode: "onChange",
    defaultValues: {
      author: "",
      content: "",
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
