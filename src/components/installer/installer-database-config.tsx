import axios, { Method } from "axios";
import { FormEvent } from "react";
import { formData2Object } from "src/utils/form-utils";
import { Button } from "../forms/Button";
import { Form } from "../forms/Form";
import { FormRow } from "../forms/form-row";
import { Input } from "../forms/Input";

export const InstallerDatabaseConfig = () => {
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      action="/api/installer/setupDatabase"
      method="POST"
    >
      <FormRow>
        <h1>Database</h1>
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
        <Button.Default label="Valider" />
      </FormRow>
    </Form>
  );
};
