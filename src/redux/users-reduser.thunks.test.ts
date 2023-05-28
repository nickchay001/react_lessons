import { type } from "@testing-library/user-event/dist/type"
import { ResponseType, ResultCodeEnum } from "../api/api"
import { usersAPI } from '../api/user-api'
import { actions, follow, unfollow } from "./users-reduser"

jest.mock('../api/user-api')
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const result: ResponseType = {
    resultCode: ResultCodeEnum.Success,
    messages: [],
    data: {}
}

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    userAPIMock.follow.mockClear()
    userAPIMock.unfollow.mockClear()
})


userAPIMock.follow.mockReturnValue(Promise.resolve(result))

userAPIMock.unfollow.mockReturnValue(Promise.resolve(result))

test('success follow thunck', async () => {
    const thunk = follow(1)


    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)

    expect(dispatchMock).toHaveBeenCalledWith(1, actions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenCalledWith(2, actions.followSuccess(1))
    expect(dispatchMock).toHaveBeenCalledWith(3, actions.toggleFollowingProgress(false, 1))

})


test('success unfollow thunck', async () => {
    const thunk = unfollow(1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)

    expect(dispatchMock).toHaveBeenCalledWith(1, actions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenCalledWith(2, actions.unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenCalledWith(3, actions.toggleFollowingProgress(false, 1))

})