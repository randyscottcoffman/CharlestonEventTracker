import MyDateInput from "app/common/form/MyDateInput";
import MySelectInputs from "app/common/form/MySelectInputs";
import MyTextArea from "app/common/form/MyTextArea";
import MyTextInputs from "app/common/form/MyTextInputs";
import { categoryOptions } from "app/common/options/categoryOptions";
import LoadingComponent from "app/layout/LoadingComponent";
import { ActivityFormValues } from "app/models/activity";
import { useStore } from "app/stores/store";
import { Formik, Form } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import { v4 as uuid } from 'uuid';
import * as Yup from 'yup';

export default observer(function ActivityForm() {

    const history = useHistory();
    const {activityStore} = useStore();
    const {createActivity, updateActivity,
            loadActivity, loadingInitial} = activityStore;
    const {id} = useParams<{id: string}>();

    const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity description is required'),
        date: Yup.string().required().nullable(),
        category: Yup.string().required(),
        venue: Yup.string().required(),
        city: Yup.string().required()
    })

    useEffect(() => {
      if (id) loadActivity(id).then(activity => setActivity(new ActivityFormValues(activity)))
    }, [id, loadActivity]);

    function handleFormSubmit(activity: ActivityFormValues) {
        if (!activity.id) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity).then(() => {
                history.push(`/activities/${newActivity.id}`);
            });
        } else {
            updateActivity(activity).then(() => 
                history.push(`/activities/${activity.id}`))
        }

    }

    if (loadingInitial) return <LoadingComponent content='Loading Activity'/>

    return (
        <Segment clearing>
            <Header content='Activity Details' sub style={{color: '#002855'}} />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={activity} 
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInputs placeholder='Title' name='title' />
                        <MyTextArea placeholder='Description' name='description' rows={3} />
                        <MySelectInputs placeholder='Category' name='category' options={categoryOptions} />
                        <MyDateInput 
                            placeholderText='Date' 
                            name='date'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa' 
                        />
                        <Header content='Location Details' sub style={{color: '#002855'}} />
                        <MyTextInputs placeholder='City' name='city' />
                        <MyTextInputs placeholder='Venue' name='venue' />
                        <Button 
                        disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting} 
                            floated='right' 
                            positive 
                            type='submit' 
                            content='Submit' 
                        />
                        <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})