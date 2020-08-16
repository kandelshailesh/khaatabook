import React, { useState, useEffect } from 'react';
import {View,Text, TextInput,Button, Alert} from 'react-native';
import { useDatabase } from '@nozbe/watermelondb/hooks';
import { uuid} from 'uuidv4';




export default function PostForm({ post, clearPost, createPost, updatePost, syncData }) {
    const database = useDatabase()
    const [title, setTitle] = useState(post ? post.title : "")
    const [content, setContent] = useState(post ? post.content : "")
    const [likes, setLikes] = useState(post ? post.likes : "")
    const postsCollection = database.collections.get("posts");

    useEffect(() => {
        setTitle(post ? post.title : "")
        setContent(post ? post.content : "")
        setLikes(post ? post.likes : "")
    }, [post])

    const onReset = () => {
        // e.preventDefault()
        clearForm()
    }

    const onSync = (e) => {
        e.preventDefault()
        syncData()
    }

    async function updatePost(currentPost, inputtedForm) {
        await database.action(async () => {
            await currentPost.update(post => {
                post.title = inputtedForm.title
                post.content = inputtedForm.content
                post.likes = inputtedForm.likes
            });
        })
    }

    async function createPost(inputtedForm) {
        Alert.alert(inputtedForm);
        await database.action(async () => {
            const newPost = await postsCollection.create(post => {
                post._raw.id = uuid()
                post.title = inputtedForm.title
                post.content = inputtedForm.content
                post.likes = inputtedForm.likes
            });
        })
    }

    const onSubmit = async () => {
        // e.preventDefault()

        const inputtedForm = { title, content, likes: parseInt(likes) }

        if (post) {
            Alert.alert("updated");
            await updatePost(post, inputtedForm)
        } else {
            Alert.alert("created");
            await createPost(inputtedForm)
            clearForm()
        }
    }

    const clearForm = () => {
        setTitle("")
        setContent("")
        setLikes("")
        clearPost()
    }

    return (
       <View>
          
          <Text>Title</Text>
           <TextInput placeholder="Title" onChangeText={msg => setTitle(msg)}></TextInput>
           <Text>Content</Text>
           <TextInput placeholder="Content" onChangeText={msg => setContent(msg)}></TextInput>
           <Text>Likes</Text>
           <TextInput placeholder="Title" onChangeText={msg => setLikes(msg)}></TextInput>
           <Button className="button button-outline" onPress={onReset} title="Add New / Reset"></Button>
            <Button onPress={onSubmit} title="Save"></Button>
            <Button className="button button-clear" title="Sync" onPress={onSync}></Button>
       </View>

    )
}