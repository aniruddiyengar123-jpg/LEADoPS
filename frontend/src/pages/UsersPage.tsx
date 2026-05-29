import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { PageHeader } from "../components/common/PageHeader";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { createUser, getUsers, updateUser } from "../features/users/services/usersApi";
import type { UserRole } from "../types/api";

type UserForm = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

export function UsersPage() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<UserForm>({
    defaultValues: { name: "", email: "", password: "", role: "SALES_USER" }
  });

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers
  });

  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["users"] });
    }
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) => updateUser(id, { isActive }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] })
  });

  return (
    <>
      <PageHeader title="Users" description="Create sales users and control account access." />
      <section className="grid gap-6 p-6 xl:grid-cols-[380px_1fr]">
        <form
          className="panel rounded p-5"
          onSubmit={handleSubmit((values) => createMutation.mutate(values))}
        >
          <h2 className="mb-4 text-base font-semibold text-warning">Add user</h2>
          <div className="space-y-4">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-sand">Name</span>
              <Input {...register("name", { required: true })} />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-sand">Email</span>
              <Input type="email" {...register("email", { required: true })} />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-sand">Password</span>
              <Input type="password" {...register("password", { required: true, minLength: 8 })} />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-sand">Role</span>
              <Select {...register("role")}>
                <option value="SALES">Sales User</option>
                <option value="ADMIN">Admin</option>
              </Select>
            </label>
            <Button className="w-full" disabled={createMutation.isPending}>
              {createMutation.isPending ? "Creating..." : "Create user"}
            </Button>
          </div>
        </form>

        <div className="panel overflow-hidden rounded">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="bg-[#101211] text-xs uppercase text-sand/65">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-copper/25">
                {isLoading ? (
                  <tr>
                    <td className="px-4 py-8 text-center text-sand/65" colSpan={5}>
                      Loading users...
                    </td>
                  </tr>
                ) : (
                  data?.map((user) => (
                    <tr key={user.id}>
                      <td className="px-4 py-3 font-medium text-ink">{user.name}</td>
                      <td className="px-4 py-3">{user.email}</td>
                      <td className="px-4 py-3">{user.role}</td>
                      <td className="px-4 py-3">{user.isActive ? "Active" : "Inactive"}</td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          variant="secondary"
                          onClick={() => toggleMutation.mutate({ id: user.id, isActive: !user.isActive })}
                        >
                          {user.isActive ? "Deactivate" : "Activate"}
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
