import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import jsonPlaceholder from '../apis/jsonPlaceholder';
import { Comment } from '../interfaces/postInterfaces';

import CommentComponent from '../components/CommentComponent';

const CommentsScreen = () => {
    const [comments, setComments] = useState<Comment[]>([])

    useEffect(() => {
        jsonPlaceholder.get<Comment[]>('/comments', {
            params: {
                _limit: 30
            }
        }).then((res) => setComments(res.data)).catch(err => console.log('error', err))
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Comments Screen</Text>
            <CommentComponent comments={comments} />
        </View>
    )
}

const styles = StyleSheet.create({})

export default CommentsScreen;