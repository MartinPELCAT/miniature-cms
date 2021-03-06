import { Button } from "../forms/Button";
import { Form } from "../forms/Form";
import { FormRow } from "../forms/form-row";
import { Input } from "../forms/Input";
import { InstallerStepProps } from "./installer-step-props";

export const InstallerAdminConfig = ({ onNextStep }: InstallerStepProps) => {
  console.log(onNextStep);

  return (
    <Form
      onSubmit={(e) => e.preventDefault()}
      method="GET"
      action="/api/installer/setup-admin"
    >
      <h1 className="text-2xl pt-2">Admin account</h1>
      <FormRow>
        <Input.Default label="Username" name="username" required />
      </FormRow>
      <FormRow>
        <Input.Default label="Password" name="password" required />
      </FormRow>

      <FormRow>
        <Button.Default label="Submit" />
      </FormRow>
    </Form>
  );
};
