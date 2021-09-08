import MyTextInputs from "app/common/form/MyTextInputs";
import { useStore } from "app/stores/store";
import ValidationErrors from "features/errors/ValidationErrors";
import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Header } from "semantic-ui-react";
import * as Yup from 'yup';

export default observer(function RegisterForm() {
  const { userStore } = useStore();
  return (
    <Formik
      initialValues={{ displayName: '', username: '', email: "", password: "", error: null}}
      onSubmit={(values, {setErrors}) => userStore.register(values).catch(error => 
            setErrors({error}))}
            validationSchema={Yup.object({
                displayName: Yup.string().required(),
                username: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string().required(),
            })}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form className="ui form error" onSubmit={handleSubmit} autoComplete="off">
          <Header as='h2' content='Sign up to Charleston Event Tracker' style={{color: '#002855'}} textAlign='center' />
          <MyTextInputs name="displayName" placeholder="Display Name" />
          <MyTextInputs name="username" placeholder="Username" />
          <MyTextInputs name="email" placeholder="Email" />
          <MyTextInputs
            name="password"
            placeholder="Password"
            type="password"
          />
          <ErrorMessage 
            name='error' render={() => 
            <ValidationErrors errors={errors.error} />}
          />
          <Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} positive content="Register" type="submit" fluid />
        </Form>
      )}
    </Formik>
  );
});
