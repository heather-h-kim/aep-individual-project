import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSeason } from '../services/seasonApi';

export const DeleteSeasonModal = ({
  showDeleteModal,
  setShowDeleteModal,
  dates,
}) => {
  const queryClient = useQueryClient();
  const [isUpdating, setIsUpdating] = useState(false);

  const deleteSeasonMutation = useMutation({
    mutationFn: seasonId => deleteSeason(seasonId),
    onMutate: seasonId => {
      console.log('mutate', seasonId);
      setIsUpdating(true);
    },
    onError: (error, variables, context) => {
      console.log('Something went wrong...', error, variables, context);
      setIsUpdating(false);
    },
    onSuccess: data => {
      console.log('Success', data);
      queryClient.invalidateQueries({ queryKey: ['Seasons'] });
      setShowDeleteModal(!showDeleteModal);
    },
    onSettled: data => {
      console.log('Complete', data);
      setIsUpdating(false);
    },
  });

  const handleClick = e => {
    e.preventDefault();
    deleteSeasonMutation.mutate(dates.seasonId);
  };

  if (showDeleteModal) {
    return (
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform  rounded-lg bg-white text-center shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="h-1/3 bg-white px-4 pb-4 pt-5 lg:p-6 lg:pb-4">
                <div className="flex flex-col ">
                  <h1>Are you sure?</h1>
                  {isUpdating ? (
                    <div className="flex flex-row items-center justify-center">
                      <button
                        disabled
                        className="mx-6 mb-1 mt-4 rounded bg-neutral-600 px-2 py-1 text-sm font-bold text-white hover:bg-neutral-700"
                        onClick={() => {
                          setShowDeleteModal(!showDeleteModal);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        disabled
                        onClick={handleClick}
                        className="mx-6 mb-1 mt-4  inline-flex items-center rounded bg-neutral-600 px-2 py-1 text-center text-sm font-medium text-white hover:bg-neutral-700 focus:ring-4 focus:ring-blue-300"
                      >
                        <svg
                          aria-hidden="true"
                          role="status"
                          className="mr-3 inline h-4 w-4 animate-spin text-white"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="#E5E7EB"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentColor"
                          />
                        </svg>
                        Deleting...
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-row items-center justify-center">
                      <button
                        className="mx-6 mb-1 mt-4 rounded bg-neutral-600 px-2 py-1 text-sm font-bold text-white hover:bg-neutral-700"
                        onClick={() => {
                          setShowDeleteModal(!showDeleteModal);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="mx-6 mb-1 mt-4 rounded bg-neutral-600 px-2 py-1 text-sm font-bold text-white hover:bg-neutral-700"
                        onClick={handleClick}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
