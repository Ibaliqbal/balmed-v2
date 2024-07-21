import { uploadPost } from "@/actions/post";
import { GetPost } from "@/types/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUploadPostMutation = (queryKey: string[]) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: uploadPost,
    onSuccess: async (newPost) => {
      await queryClient.cancelQueries({
        queryKey: queryKey,
        predicate(query) {
          return query.queryKey.includes("for-you");
        },
      });

      const previousPosts = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (oldData: Array<GetPost>) => {
        return [...oldData, newPost];
      });
      return { previousPosts };
    },
    onError: (err, newTodo, context?: { previousPosts: Array<GetPost> }) => {
      if (context) {
        queryClient.setQueryData(queryKey, context.previousPosts);
      }
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
  });

  return mutation;
};
