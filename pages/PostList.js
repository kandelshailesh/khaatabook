import React from 'react';
import withObservables from "@nozbe/with-observables";
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider'
// import PostRow from './PostRow'
import { Table, Row, Rows } from 'react-native-table-component';
import { View,Text,Button } from 'react-native';

const PostList = ({ posts, onEdit, onDelete }) => (

    <View>
    <Table>
        <Row data={['Title','Content','Likes','Created At','Updated At','Actions']}></Row>
  
    </Table>
    {posts.map(post =>  <View key={post._raw.id}>
        <Text>{post._raw.id}</Text>
        <Text>{post.title}</Text>
        <Text>{post.content}</Text>
        <Text>{post.likes}</Text>
        <Text>{post.createdAt.toString()}</Text>
        <Text>{post.updatedAt.toString()}</Text>
      
            <Button onPress={() => {onEdit(post)}} title="Edit"></Button>
            <Button onPress={() => {onDelete(post)}} title="Delete"></Button>
      
    </View>)}
    
            {/* {posts.map(post =>  <View key={post._raw.id}>
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
    </View>)} */}
    </View>
)

export default withDatabase(withObservables([], ({ database }) => ({
    posts: database.collections.get('posts').query().observe(),
}))(PostList))