import { useCreateCommentForm } from "@/hooks/form/useCreateCommentForm";
import { postPartyComment } from "@/services/party";
import { ErrorDTO } from "@/types/error";
import { CreateCommentRequest } from "@/types/party";
import { ERROR_MESSAGES } from "@libs/utils/message";
import { useMutation } from "@tanstack/react-query";
import {
  Button,
  Modal,
  MultilineTextField,
  Notify,
  TextField,
  Typography,
} from "@ui/components";
import { AxiosError, isAxiosError } from "axios";

interface Props {
  code: string;
  isOpen: boolean;
  onClose: () => void;
  refetchComments?: () => void;
}

export const CommentCreateModal: React.FC<Props> = ({
  code,
  isOpen,
  onClose,
  refetchComments,
}) => {
  const { register, watch, handleSubmit, errors } = useCreateCommentForm();

  const {
    mutate: onCreateCommentApi,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (data: CreateCommentRequest) => postPartyComment(code, data),
    mutationKey: ["createComment", watch("author"), watch("content")],
    onSuccess: (res) => {
      if (res) {
        Notify.success("새로운 댓글이 생성되었습니다.");
        refetchComments && refetchComments();
        onClose();
      }
    },
    onError: (error: AxiosError) => {
      if (isAxiosError<ErrorDTO>(error)) {
        Notify.error("댓글 생성에 실패했습니다.");
      }
    },
  });

  const onSubmit = (data: CreateCommentRequest) => {
    onCreateCommentApi(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form className="w-full min-w-[320px]" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="b16" className="mt-10">
          작성자
        </Typography>
        <TextField
          placeholder="작성자 이름을 입력해주세요. (최대 10자)"
          error={errors.author ? true : false}
          errorMessage={errors.author?.message}
          maxLength={10}
          gutterBottom
          {...register("author", {
            required: ERROR_MESSAGES.commentAuthorRequired,
            validate: (value) => {
              if (watch("author") !== value) {
                return ERROR_MESSAGES.commentAuthorRequired;
              }
              if (value.length > 10) {
                return "작성자 이름은 최대 10자까지 입력 가능합니다.";
              }
            },
          })}
        />
        <Typography variant="b16" className="mt-6">
          댓글 내용
        </Typography>
        <MultilineTextField
          placeholder="친구들에게 한 마디 남겨보세요! (최대 200자)"
          error={errors.content ? true : false}
          errorMessage={errors.content?.message}
          {...register("content", {
            required: ERROR_MESSAGES.commentContentRequired,
            validate: (value) => {
              if (watch("content") !== value) {
                return ERROR_MESSAGES.commentContentRequired;
              }
              if (value.length > 200) {
                return "댓글 내용은 최대 200자까지 입력 가능합니다.";
              }
            },
          })}
        />
        <div className="flex justify-end mt-6 mb-10">
          <Button
            variant="primary"
            size="medium"
            type="submit"
            loading={isPending}
            disabled={isPending || isSuccess}
          >
            {isPending ? "댓글 생성 중..." : "댓글 남기기"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
