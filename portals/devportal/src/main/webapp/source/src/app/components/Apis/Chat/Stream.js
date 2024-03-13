// /* eslint-disable no-param-reassign */
// import React, { useEffect, useState, useRef } from 'react';
// import PropTypes from 'prop-types';
// import Api from 'AppData/api';
// import { Container, Box } from '@mui/material';
// import { ResizableBox } from 'react-resizable';
// import 'react-resizable/css/styles.css';
// import ChatMessages from './ChatMessages';
// import Header from './Header';

// /**
//  * Renders Chat Messages view..
//  * @param {JSON} props Parent pros.
//  * @returns {JSX} renders Chat Window view.
//  */
// function ChatWindow(props) {
//     const {
//         toggleChatbot, toggleClearChatbot, messages, setMessages, tenantDomain,
//     } = props;
//     const [loading, setLoading] = useState(false);
//     const [isClicked, setIsClicked] = useState(false);
//     const responseRef = useRef([]);

//     const toggleFullScreen = (e) => {
//         e.preventDefault();
//         setIsClicked(!isClicked);
//     };

//     const apiCall = (query, action) => {
//         console.log(action, query);
//         setLoading(false);
//         const restApi = new Api();
//         return restApi
//             .getAisearchassistant({ query, action, tenantDomain })
//             .then((result) => {
//                 responseRef.current = result.body.messages;
//                 setMessages(result.body.messages);
//                 return result.body.messages;
//             })
//             .catch((error) => {
//                 throw error;
//             })
//             .finally(() => {
//                 setLoading(false);
//             });
//     };

//     const handleClear = () => {
//         apiCall('clear chat history', 'clearChat');
//         toggleClearChatbot();
//     };

//     // eslint-disable-next-line no-unused-vars
//     const sseCall = (message) => {
//         const query = {
//             message: message.content,
//             tenant: 'carbon.super',
//         };
//         // Make a POST request to the FastAPI endpoint
//         fetch('http://localhost:8000/chat/sse', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(query),
//         })
//             .then((response) => {
//             // Check if the response is a streaming response
//                 if (!response.body || !response.body.pipeTo) {
//                     throw new Error('ReadableStream not available');
//                 }

//                 const reader = response.body.getReader();

//                 let stream = '';

//                 const processStream = async () => {
//                     try {
//                         while (true) {
//                             // eslint-disable-next-line no-await-in-loop
//                             const { done, value } = await reader.read();

//                             if (done) {
//                                 // console.log('Stream complete');
//                                 break;
//                             }

//                             const streamData = new TextDecoder().decode(value);
//                             // console.log('streamData', streamData);

//                             const jsonDataFragments = streamData.trim().split('}{');

//                             // eslint-disable-next-line no-loop-func
//                             jsonDataFragments.map((fragment, index) => {
//                                 if ((jsonDataFragments.length) > 1) {
//                                     if (index === 0) {
//                                         fragment += '}';
//                                     } else if (index === jsonDataFragments.length - 1) {
//                                         fragment = '{' + fragment;
//                                     } else {
//                                         fragment = '{' + fragment + '}';
//                                     }
//                                 }
//                                 const jsonData1 = JSON.parse(fragment);
//                                 stream += jsonData1.value;
//                                 return jsonData1;
//                             });

//                             responseRef.current = [...responseRef.current.slice(0, -1), { role: 'assistant', content: stream }];

//                             setMessages(responseRef.current);
//                         }
//                     } catch (error) {
//                         console.error('Error while reading stream:', error);
//                         // eslint-disable-next-line max-len
//                         responseRef.current = [...responseRef.current.slice(0, -1), { role: 'assistant', content: 'Sorry, Something went wrong!' }];
//                     }
//                 };

//                 processStream();
//             })
//             .catch((error) => {
//                 console.error('Error:', error);
//             });
//     };

//     const handleSend = async (message) => {
//         responseRef.current = [...responseRef.current, { role: 'user', content: message.content }, { role: 'assistant', content: ' ' }];
//         setMessages(responseRef.current);
//         sseCall(message);
//     };

//     const handleReset = () => {
//         apiCall('clear chat history', 'clearChat');
//     };

//     useEffect(() => {
//         if (tenantDomain) {
//             apiCall('get chat history', 'getChatHistory');
//         }
//     }, []);

//     useEffect(() => {
//         // console.log('messages', messages);
//         const clearChatHistory = setTimeout(() => {
//             apiCall('clear chat history', 'clearChat');
//         }, 6000000);

//         return () => clearTimeout(clearChatHistory);
//     }, [messages]);

//     return (

//         <ResizableBox
//             width={isClicked ? window.innerWidth : Math.max(window.innerWidth * 0.25, 500)}
//             height={window.innerHeight}
//             minConstraints={[Math.max(window.innerWidth * 0.25, 500), 700]}
//             maxConstraints={[window.innerWidth, window.innerHeight]}
//             resizeHandles={['nw']}
//             // margin={20}
//             style={{
//                 position: 'fixed',
//                 // top: 0,
//                 bottom: 0,
//                 right: 0,
//                 display: 'flex',
//                 justifyContent: 'flex-start',
//                 flexDirection: 'row-reverse',
//                 zIndex: 9999,
//             }}
//             handle={(
//                 <span
//                     style={{
//                         width: '16px',
//                         cursor: 'move',
//                     }}
//                 >
//                     <svg />
//                 </span>
//             )}
//         >
//             <Container
//                 maxWidth={false}
//                 style={{
//                     paddingLeft: '0px',
//                     paddingRight: '0px',
//                     backgroundColor: '#ffffff',
//                     height: '100vh - 120px',
//                     border: '10px',
//                     borderColor: '#1f84a1',
//                     boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
//                     borderRadius: '28px',
//                     marginTop: '8px',
//                     marginBottom: '8px',
//                     marginRight: '8px',
//                 }}
//             >
//                 <Box
//                     display='flex'
//                     flexDirection='column'
//                     justifyContent='flex'
//                     // marginLeft='100px'
//                     style={{
//                         height: '100%',
//                     }}
//                 >
//                     <Header
//                         toggleChatbot={toggleChatbot}
//                         toggleFullScreen={toggleFullScreen}
//                         handleClear={handleClear}
//                         handleReset={handleReset}
//                         isClicked={isClicked}
//                     />

//                     <Box
//                         flexGrow={1}
//                         display='flex'
//                         overflow='auto'
//                         // marginLeft='100px'
//                         flexDirection='column'
//                         justifyContent='flex-end'
//                         marginTop={0}
//                         padding={0}
//                     >
//                         <ChatMessages
//                             messages={messages}
//                             loading={loading}
//                             onSend={handleSend}
//                             onReset={handleReset}
//                         />
//                     </Box>
//                 </Box>
//             </Container>
//         </ResizableBox>
//     );
// }

// ChatWindow.propTypes = {
//     toggleChatbot: PropTypes.func.isRequired,
//     toggleClearChatbot: PropTypes.func.isRequired,
//     messages: PropTypes.instanceOf(Array).isRequired,
//     setMessages: PropTypes.func.isRequired,
// };
// export default ChatWindow;
