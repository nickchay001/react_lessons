import profileReducer, { actions} from "./profile-reducer";

let state = {
    posts: [
        { id: 1, message: 'Hi, how are you', likesCount: 12 },
        { id: 2, message: 'Hi, i am fine', likesCount: 30 },
    ],
    profile: null,
    status: '',
    newPostText: ''
}
it('length of posts shoul be incremented', () => {
    // 1.test data
    let action = actions.addPost("MAY")
    // 2. action
    let newState = profileReducer(state, action);
    // 3. exprctation
    expect(newState.posts.length).toBe(3)
})
it('message of new posts shoul be correct', () => {
    // 1.test data
    let action = actions.addPost("MAY")
    // 2. action
    let newState = profileReducer(state, action);


    // 3. exprctation
    expect(newState.posts[2].message).toBe("MAY")
})
it('after deleting length of message should be decrement', () => {
    // 1.test data
    let action = actions.deletePost(1)
    // 2. action
    let newState = profileReducer(state, action);


    // 3. exprctation
    expect(newState.posts.length).toBe(1)
})
it('after deleting length shouldn`t be decrement if id is incorrect', () => {
    // 1.test data
    let action = actions.deletePost(100)
    // 2. action
    let newState = profileReducer(state, action);


    // 3. exprctation
    expect(newState.posts.length).toBe(2)
})

