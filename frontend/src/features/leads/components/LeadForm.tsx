import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Select } from "../../../components/ui/Select";
import type { LeadPayload } from "../services/leadsApi";

export function LeadForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  onCancel
}: {
  defaultValues?: Partial<LeadPayload>;
  onSubmit: (values: LeadPayload) => void;
  isSubmitting?: boolean;
  onCancel: () => void;
}) {
  const { register, handleSubmit } = useForm<LeadPayload>({
    defaultValues: {
      name: "",
      email: "",
      source: "WEBSITE",
      status: "NEW",
      ...defaultValues
    }
  });

  return (
    <form className="panel grid gap-4 rounded p-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 md:grid-cols-2">
        <label>
          <span className="mb-1 block text-sm font-medium text-sand">Name</span>
          <Input {...register("name", { required: true, minLength: 2 })} />
        </label>
        <label>
          <span className="mb-1 block text-sm font-medium text-sand">Email</span>
          <Input type="email" {...register("email", { required: true })} />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label>
          <span className="mb-1 block text-sm font-medium text-sand">Source</span>
          <Select {...register("source")}>
            {["WEBSITE", "INSTAGRAM", "REFERRAL"].map((value) => (
              <option key={value}>{value}</option>
            ))}
          </Select>
        </label>
        <label>
          <span className="mb-1 block text-sm font-medium text-sand">Status</span>
          <Select {...register("status")}>
            {["NEW", "CONTACTED", "QUALIFIED", "LOST"].map((value) => (
              <option key={value}>{value}</option>
            ))}
          </Select>
        </label>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save lead"}</Button>
      </div>
    </form>
  );
}
