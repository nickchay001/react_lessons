import React, { FC, useEffect, useRef, useState } from 'react'
import { ChatMessageAPIType } from '../../api/chat-api'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchTypes, sendMessage, startMessagesListening, stopMessagesListening } from '../../redux/chat-reducer'
import { AppStateType } from '../../redux/redux-store'





const ChatPage: FC = () => {
    return (
        <div>
            <Chat />
        </div>
    )
}

const Chat: FC = () => {
    const dispatch: DispatchTypes = useDispatch()

    const status = useSelector((state: AppStateType) => state.chat.status)

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [dispatch])

    return (
        <div>
            {status === 'error' && <div>Some error occured.Please refresh the page</div>}
            <>
                <Messages />
                <AddMessageForm />
            </>
        </div>
    )

}


const Messages: FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)

    const messageAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(false)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messageAnchorRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [isAutoScroll])

    return (
        <div style={{ height: '400px', overflow: 'auto' }} onScroll={scrollHandler}>
            {messages.map((m, index) => <Message key={m.id} message={m} />)}
            <div ref={messageAnchorRef}></div>
        </div>
    )
}

const Message: FC<{ message: ChatMessageAPIType }> = React.memo(({ message }) => {
    return (
        <div>
            <img alt='#' width={'50px'} src={message.photo} /> <b>{message.userName}</b>
            <br />
            {message.message}
            <hr />
        </div>
    )
})

const AddMessageForm: FC = () => {
    const [message, setMessage] = useState('')
    //const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    const dispatch = useDispatch<DispatchTypes>()

    const status = useSelector((state: AppStateType) => state.chat.status)
    console.log(status)
    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }
    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
            </div>
            <div>
                <button disabled={false /*status !== 'ready'*/} onClick={sendMessageHandler}>send</button>
            </div>
        </div>
    )
}


export default ChatPage
