import React from 'react';
import withObservables from "@nozbe/with-observables";
import { View ,Text,Button} from 'react-native';

const PostRow = ({ post, onEdit, onDelete }) => (
   
    <View key={post._raw.id}>
        <Text>Hello</Text>
        <Text>{post.title}</Text>
        <Text>{post.content}</Text>
        <Text>{post.likes}</Text>
        <Text>{post.createdAt.toString()}</Text>
        <Text>{post.updatedAt.toString()}</Text>
        <Text>
            <Button onClick={(e) => {onEdit(post)}} title="Edit"></Button>
            <Button onClick={(e) => {onDelete(post)}} title="Delete"></Button>
        </Text>
    </View>
)

export default withObservables(["post"], ({ post }) => ({
    post: post.observe()
}))(PostRow)