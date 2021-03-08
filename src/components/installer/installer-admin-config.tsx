import { useEffect } from "react";
import { useForm } from "src/hooks/useForm";
import { Button } from "../forms/Button";
import { Form } from "../forms/Form";
import { FormRow } from "../forms/form-row";
import { Input } from "../forms/Input";
import { InstallerStepProps } from "./installer-step-props";

export const InstallerAdminConfig = ({}: InstallerStepProps) => {
  const { datas, handleSubmit } = useForm({
    action: "/api/installer/setup-admin",
    method: "POST",
  });

  useEffect(() => {
    console.log(datas);
    // datas && onNextStep();
  }, [datas]);

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="text-2xl pt-2">Admin account</h1>
      <FormRow>
        <Input.Default label="Username" name="username" required />
      </FormRow>
      <FormRow>
        <Input.Default
          type="password"
          label="Password"
          name="password"
          required
        />
      </FormRow>

      <FormRow>
        <Button.Default label="Submit" />
      </FormRow>
    </Form>
  );
};
