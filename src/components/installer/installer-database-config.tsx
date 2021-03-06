import axios, { Method } from "axios";
import { FormEvent, useEffect } from "react";
import { formData2Object } from "src/utils/form-utils";
import { Button } from "../forms/Button";
import { Form } from "../forms/Form";
import { FormRow } from "../forms/form-row";
import { Input } from "../forms/Input";
import { InstallerStepProps } from "./installer-step-props";

export const InstallerDatabaseConfig = ({ onNextStep }: InstallerStepProps) => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = formData2Object(new FormData(e.currentTarget));
    const method = e.currentTarget.method as Method;
    try {
      await axios({
        method,
        url: e.currentTarget.action,
        data,
      });
      onNextStep();
    } catch (error) {
      console.log(error);
    }
  };

  const checkDatabase = async () => {
    const { data } = await axios.get("/api/installer/check-database");
    if (data.installed) {
      onNextStep();
    }
  };

  useEffect(() => {
    checkDatabase();
  }, []);

  return (
    <Form
      onSubmit={handleSubmit}
      action="/api/installer/setup-database"
      method="POST"
    >
      <FormRow>
        <h1 className="text-2xl">Step 1: Database</h1>
      </FormRow>
      <FormRow>
        <Input.Default
          label="Name"
          name="database"
          placeholder="ex: 'mcms-database'"
          required
          defaultValue="miniature-cms"
        />
      </FormRow>
      <FormRow>
        <Input.Default
          label="Username"
          name="username"
          required
          defaultValue="postgres"
        />
      </FormRow>
      <FormRow>
        <Input.Default
          label="Password"
          name="password"
          type="password"
          defaultValue="postgres"
        />
      </FormRow>
      <FormRow>
        <Input.Default
          label="Host"
          name="host"
          required
          defaultValue="localhost"
        />
      </FormRow>
      <FormRow>
        <Input.Default
          label="Port"
          type="number"
          name="port"
          required
          defaultValue={5432}
        />
      </FormRow>
      <FormRow>
        <Button.Default label="Submit" />
      </FormRow>
    </Form>
  );
};
