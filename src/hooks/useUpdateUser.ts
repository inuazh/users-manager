import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type UpdateUserDto, updateUser } from '../api/users.api';

interface UpdateUserVariables{
    id: number;
    dto: UpdateUserDto;
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn:({id, dto}: UpdateUserVariables)=>  updateUser(id, dto),
    onSuccess: (data, {id}) => {
    queryClient.setQueryData(['user', id], data)
    queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};