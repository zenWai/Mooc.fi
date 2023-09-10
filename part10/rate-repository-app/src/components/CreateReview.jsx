import * as yup from "yup";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import FormikTextInput from "./FormikTextInput";
import Text from './theme/Text';
import {Formik} from "formik";
import {CREATEREVIEW} from "../graphql/mutations";
import {useMutation} from "@apollo/client";
import {useNavigate} from 'react-router-native';
import {useState} from "react";

const reviewValidationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Owner name is required'),
  rating: yup
    .number()
    .min(0)
    .max(100)
    .required('Rating is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  text: yup
    .string()
});

const ReviewForm = ({ onSubmit, onError }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="ownerName" placeholder="Owner Name" testID="ownerNameInput"/>
      <FormikTextInput name="rating" placeholder="Rating (0-100)" keyboardType="numeric" testID="ratingInput"/>
      <FormikTextInput name="repositoryName" placeholder="Repository Name" testID="repositoryNameInput"/>
      <FormikTextInput name="text" placeholder="Review Text" multiline={true} numberOfLines={4} testID="textInput"/>
      <TouchableOpacity style={styles.button} onPress={onSubmit} testID="submitButton">
        <Text style={styles.buttonText}>Submit Review</Text>
      </TouchableOpacity>
      {onError &&
        <View>
          <Text>{onError}</Text>
        </View>
      }
    </View>
  );
};
const CreateReview = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [createReview] = useMutation(CREATEREVIEW);

  const onSubmit = async values => {
    const { ownerName, rating, repositoryName, text } = values;
    setError(null);
      const { data, errors } = await createReview({
        variables: { ownerName, rating: parseInt(rating), repositoryName, text },
        fetchPolicy: 'no-cache'
      });
      console.log('Review creation success: ', data);
      if (data && data.createReview && data.createReview.repositoryId) {
        // If mutation was successful, navigate to the repository's view.
        navigate(`/repository/${data.createReview.repositoryId}`);
      }
      if(errors) {
        console.log(errors)
        setError(errors[0].message);
      }
  };

  return (
    <Formik
      initialValues={{ ownerName: '', rating: '', repositoryName: '', text: '' }}
      onSubmit={onSubmit}
      validationSchema={reviewValidationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} onError={error}/>}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'blue',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CreateReview;