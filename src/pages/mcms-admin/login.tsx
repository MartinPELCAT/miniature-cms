// import { useRouter } from "next/dist/client/router";
import React, { FormEvent, useEffect } from "react";
import { Button } from "src/components/forms/Button";
import { Form } from "src/components/forms/Form";
import { FormRow } from "src/components/forms/form-row";
import { Input } from "src/components/forms/Input";
import { generateFormDatas } from "src/utils/form-utils";
import { LoginMutationVariables, useLoginMutation } from "src/__generated__";

const Login = () => {
  const [mutation, { data, loading }] = useLoginMutation();
  // const { push } = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const { password, username } = generateFormDatas<LoginMutationVariables>(
        e.currentTarget
      );
      await mutation({ variables: { password, username } });
    } catch (error) {
      //DO NOTHING
    }
  };

  useEffect(() => {
    console.log(data);

    // data && push("/mcms-admin");
  }, [data]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-4 divide-y w-1/4">
        <Form onSubmit={handleSubmit}>
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
            <Button.Default label="Submit" loading={loading} />
          </FormRow>
        </Form>
      </div>
    </div>
  );
};

export default Login;
