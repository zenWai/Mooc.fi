import {useMutation, useQuery} from "@apollo/client";
import {ME} from "../graphql/queries";
import {ActivityIndicator, FlatList, Text} from "react-native";
import ReviewItem from "./ReviewItem";
import {DELETE_REVIEW} from "../graphql/mutations";
import {useNavigate} from "react-router-native";

const MyReviews = () => {
  const navigate = useNavigate();
  const { data, loading, error, refetch} = useQuery(ME, {
    variables: { includeReviews: true }
  });
  const [deleteReviewMutation] = useMutation(DELETE_REVIEW);

  const handleDelete = async (id) => {
    try {
      await deleteReviewMutation({ variables: { id } });
      refetch(); // Refetch the reviews after deletion
    } catch (err) {
      console.error("Failed to delete review:", err.message);
    }
  };

  const handleView = (repositoryId) => {
    navigate(`/repository/${repositoryId}`)
    // Navigate to the single repository review with the given ID.
    // You need to replace this with your own navigation logic.
    console.log(`Viewing repository with ID: ${repositoryId}`);
  };

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error loading reviews</Text>;

  const reviews = data.me.reviews.edges;
  console.log(reviews)

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item.node} onDelete={handleDelete} onView={handleView}/>}
      keyExtractor={item => item.node.id}
    />
  );
};

export default MyReviews;