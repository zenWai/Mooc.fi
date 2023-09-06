import {View, Image, StyleSheet} from 'react-native';

import Subheading from "./theme/Subheading";
import Caption from "./theme/Caption";
import BodyText from "./theme/BodyText";
import Title from "./theme/Title";
import SpecialText from "./theme/SpecialText";

const cardHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    padding: 24,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 8
  },
  avatarContainer: {
    flexGrow: 0,
    paddingRight: 15,
  },
  infoContainer: {
    flexGrow: 1,
  },
});

const CardHeader = ({ imageSource, name, description, language }) => {
  return (
    <View style={cardHeaderStyles.container}>
      <View style={cardHeaderStyles.avatarContainer}>
        <Image style={cardHeaderStyles.avatar} source={{ uri: imageSource } }/>
      </View>
      <View style={cardHeaderStyles.infoContainer}>
        <Title>{name}</Title>
        <Caption style={{paddingTop: 5}}>{description}</Caption>
        <SpecialText>{language}</SpecialText>
      </View>
    </View>
  );
};

const cardFooterStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-around',
  },
  actionTouchable: {
    flexGrow: 0,
  },
  actionText: {
    textDecorationLine: 'underline',
  },
});

const formatNumber = (num) => {
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

const CardFooter = ({ stars, forks, reviews, rating }) => {
  return (
    <View style={cardFooterStyles.container}>
      <View style={cardFooterStyles.actionTouchable}>
        <BodyText style={{paddingBottom: 5}}>{formatNumber(stars)}</BodyText>
        <Subheading color="textSecondary" style={cardFooterStyles.actionText}>Stars</Subheading>
      </View>
      <View style={cardFooterStyles.actionTouchable}>
        <BodyText style={{paddingBottom: 5}}>{formatNumber(forks)}</BodyText>
        <Subheading color="textSecondary" style={cardFooterStyles.actionText}>Forks</Subheading>
      </View>
      <View style={cardFooterStyles.actionTouchable}>
        <BodyText style={{paddingBottom: 5}}>{formatNumber(reviews)}</BodyText>
        <Subheading color="textSecondary" style={cardFooterStyles.actionText}>Reviews</Subheading>
      </View>
      <View style={cardFooterStyles.actionTouchable}>
        <BodyText style={{paddingBottom: 5}}>{rating}</BodyText>
        <Subheading color="textSecondary" style={cardFooterStyles.actionText}>Rating</Subheading>
      </View>
    </View>
  );
};

const cardStyles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
  },
});

const Card = ({stars, forks, reviews, rating, imageSource, name, description, language}) => {
  return (
    <View style={cardStyles.container}>
      <CardHeader name={name} description={description} imageSource={imageSource } language={language}/>
      <CardFooter reviews={reviews} stars={stars} forks={forks} rating={rating}/>
    </View>
  );
};

export default Card;