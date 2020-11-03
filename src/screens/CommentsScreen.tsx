import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, SafeAreaView } from 'react-native'

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
        <SafeAreaView style={styles.container}>
            <Text style={{ alignSelf: "center" }}>Comments Screen</Text>
            <CommentComponent comments={comments} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1 }
})

export default CommentsScreen;