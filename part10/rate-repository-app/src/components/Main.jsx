import {StyleSheet, View} from 'react-native';
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import {Route, Routes, Navigate} from 'react-router-native';
import SignIn from "./SignIn";
import RepositoryItemDetails from "./RepositoryItemDetails";
import CreateReview from "./CreateReview";
import SignUp from "./SignUp";
import MyReviews from "./MyReviews";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8',
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar/>
      <Routes>
        <Route path="/" element={<RepositoryList/>} exact/>
        <Route path="/signIn" element={<SignIn/>} exact/>
        <Route path="/repository/:id" element={<RepositoryItemDetails/>} exact/>
        <Route path="/createreview" element={<CreateReview/>} exact/>
        <Route path="/signUp" element={<SignUp/>} exact/>
        <Route path="/myReviews" element={<MyReviews/>} exact/>
        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Routes>
    </View>
  );
};

export default Main;