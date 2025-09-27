// DeleteButton.tsx
import type { UseMutationResult } from "@tanstack/react-query";
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";

interface DeleteButtonProps {
  productId: string;
  deleteMutation: UseMutationResult<void, unknown, string>
}

export const DeleteButton = ({ productId, deleteMutation }: DeleteButtonProps) => {
  const handleClick = () => {
    toast.custom((t) => (
      <div className="flex flex-col gap-2 p-3 bg-white rounded shadow">
        <span>⚠️ Esta acción es destructiva.</span>
        <div className="flex justify-end gap-2">
          <button
            className="bg-red-500 text-white px-2 py-1 rounded flex items-center justify-center"
            onClick={() => {
              deleteMutation.mutate(productId);
              toast.dismiss(t);
            }}
          >
            Aceptar
          </button>
          <button
            className="bg-gray-300 px-2 py-1 rounded"
            onClick={() => toast.dismiss(t)}
          >
            Cancelar
          </button>
        </div>
      </div>
    ));
  };

  return (
    <button type="button" className="cursor-pointer" onClick={handleClick}>
      <TrashIcon className="w-4 h-4 text-red-500" />
    </button>
  );
};
