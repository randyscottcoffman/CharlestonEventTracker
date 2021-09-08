import MyTextInputs from "app/common/form/MyTextInputs";
import { useStore } from "app/stores/store";
import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Header, Label } from "semantic-ui-react";

export default observer(function LoginForm() {
  const { userStore } = useStore();
  return (
    <Formik
      initialValues={{ email: "", password: "", error: null}}
      onSubmit={(values, {setErrors}) => userStore.login(values).catch(error => 
            setErrors({error: 'Invalid email or password'}))}
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <Header as='h2' content='Login to Charleston Event Tracker' style={{color: '#002855'}} textAlign='center' />
          <MyTextInputs name="email" placeholder="Email" />
          <MyTextInputs
            name="password"
            placeholder="Password"
            type="password"
          />
          <ErrorMessage 
            name='error' render={() => <Label style={{marginBottom: 10}} basic color='red' content={errors.error} />}
          />
          <Button loading={isSubmitting} positive content="Login" type="submit" fluid />
        </Form>
      )}
    </Formik>
  );
});
