import { uploadComment, uploadPost } from "@/actions/post";
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
          return (
            query.queryKey.includes("for-you") || query.queryKey[0] === "post"
          );
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

// export const useDeletePostMutation = (querKey: string[]) => {
//   const queryClient = useQueryClient();
//   const { user } = useGetUserLogin();

//   const mutation = useMutation({
//     mutationFn: deletePost,
//     onSuccess: async (dataId) => {
//       const queryFilter = {
//         queryKey: ["post"],
//         predicate(query) {
//           return (
//             query.queryKey.includes("for-you") ||
//             query.queryKey.some((q) => q === `user-${user?.id}`)
//           );
//         },
//       } satisfies QueryFilters;

//       await queryClient.cancelQueries(queryFilter);

//       queryClient.setQueriesData(
//         queryFilter,
//         (oldData: Array<GetPost> = []) => {
//           return oldData.filter((post) => post.id !== dataId?.id);
//         }
//       );
//     },
//     // onError: (err, newTodo) => {
//     //   toast.error("Failed to delete post");
//     // },
//     // // Always refetch after error or success:
//     // onSettled: () => {
//     //   queryClient.invalidateQueries({ queryKey: queryKey });
//     // },
//   });
// };

export const useUploadCommentMutation = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: uploadComment,
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["post-comment", id],
      });
      const previousPosts = queryClient.getQueryData<{ comment: number }>([
        "post-comment",
        id,
      ]);
      queryClient.setQueryData(["post-comment", id], () => {
        return { comment: previousPosts?.comment ?? 0 + 1 };
      });
      return { previousPosts };
    },
    onError: (
      err,
      newTodo,
      context?: { previousPosts: { comment: number } | undefined }
    ) => {
      if (context) {
        queryClient.setQueryData(["post-comment", id], context.previousPosts);
      }
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["post-comment", id] });
    },
  });

  return mutation;
};
