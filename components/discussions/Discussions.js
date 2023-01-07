import { discussions, removeDiscussion } from "@/services/users.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, message, Skeleton } from "antd";
import { useRouter } from "next/router";
import DiscussionCreate from "./DiscussionCreate";

const Discussion = ({ data, documentId }) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation((data) => removeDiscussion(data), {
    onSuccess: () => {
      message.success("Discussion deleted");
      queryClient.invalidateQueries(["discussions", documentId]);
    },
    onError: () => message.error("Failed to delete discussion"),
    onSettled: () => queryClient.invalidateQueries(["discussions", documentId]),
  });

  const handleRemove = () => {
    const currentData = {
      documentId,
      discussionId: data.id,
    };
    mutate(currentData);
  };

  return (
    <div>
      {data?.message}
      <Button onClick={handleRemove} loading={isLoading} disabled={isLoading}>
        Hapus
      </Button>
    </div>
  );
};

const DisccussionList = () => {
  const router = useRouter();

  const { data, isLoading } = useQuery(
    ["discussions", router.query.id],
    () => discussions(router.query.id),
    {
      enabled: !!router.query.id,
    }
  );

  return (
    <Skeleton loading={isLoading}>
      <DiscussionCreate />
      {data?.map((discussion) => (
        <Discussion
          key={discussion.id}
          documentId={router?.query?.id}
          data={discussion}
        />
      ))}
    </Skeleton>
  );
};

export default DisccussionList;
